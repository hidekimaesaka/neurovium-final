import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import AppButton from "../components/AppButton";
import { colors, radii, spacing } from "../styles/theme";

function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

function cellRow(index) {
  return Math.floor(index / 9);
}

function cellColumn(index) {
  return index % 9;
}

function cellBlock(index) {
  return Math.floor(cellRow(index) / 3) * 3 + Math.floor(cellColumn(index) / 3);
}

function nowIso() {
  return new Date().toISOString();
}

function secondsFrom(iso) {
  if (!iso) {
    return 0;
  }

  return Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
}

function isSolved(match, grid) {
  const filled = grid.every((row) => row.every((value) => Boolean(value)));

  return filled && grid.every((row, rowIndex) =>
    row.every((value, columnIndex) => value === match.solution[rowIndex][columnIndex])
  );
}

function firstEditableCell(match) {
  if (!match?.fixedCells) {
    return null;
  }

  const grid = match.userGrid || match.puzzle || [];
  const flatGrid = grid.flat();
  const index = flatGrid.findIndex((value, currentIndex) => (
    !value && !match.fixedCells[currentIndex]
  ));

  return index >= 0 ? index : null;
}

function conflictTypesFor(grid, index, value) {
  const types = [];
  if (!value) {
    return types;
  }

  const row = cellRow(index);
  const column = cellColumn(index);
  const block = cellBlock(index);

  for (let current = 0; current < 81; current += 1) {
    if (current === index) {
      continue;
    }

    const currentRow = cellRow(current);
    const currentColumn = cellColumn(current);
    const sameValue = grid[currentRow][currentColumn] === value;

    if (!sameValue) {
      continue;
    }

    if (currentRow === row && !types.includes("row")) {
      types.push("row");
    }
    if (currentColumn === column && !types.includes("column")) {
      types.push("column");
    }
    if (cellBlock(current) === block && !types.includes("block")) {
      types.push("block");
    }
  }

  return types;
}

export default function GameScreen({
  goBack,
  match,
  onMatchEnd,
  onMatchUpdate
}) {
  const [localMatch, setLocalMatch] = useState(match);
  const [selectedCell, setSelectedCell] = useState(firstEditableCell(match));
  const [selectionStartedAt, setSelectionStartedAt] = useState(null);

  const grid = localMatch?.userGrid || localMatch?.puzzle || [];
  const flatGrid = grid.flat();

  async function updateMatch(nextMatch) {
    setLocalMatch(nextMatch);
    await onMatchUpdate(nextMatch);
  }

  async function selectCell(index) {
    if (!localMatch || localMatch.fixedCells[index]) {
      return;
    }

    const at = nowIso();
    const event = {
      at,
      cellIndex: index,
      longInactivity: secondsFrom(localMatch.lastInteractionAt) >= 20,
      selectedValue: grid[cellRow(index)]?.[cellColumn(index)] || 0,
      secondsSinceLastAction: secondsFrom(localMatch.lastActionAt || localMatch.startedAt),
      secondsSinceStart: secondsFrom(localMatch.startedAt),
      touchWithoutMove: true,
      type: "select_cell"
    };

    setSelectedCell(index);
    setSelectionStartedAt(at);
    await updateMatch({
      ...localMatch,
      events: [...(localMatch.events || []), event],
      lastActionAt: at,
      lastInteractionAt: at
    });
  }

  function markLastSelectionAsUsed(events) {
    const nextEvents = [...events];
    for (let index = nextEvents.length - 1; index >= 0; index -= 1) {
      if (nextEvents[index].type === "select_cell" && nextEvents[index].touchWithoutMove) {
        nextEvents[index] = { ...nextEvents[index], touchWithoutMove: false };
        break;
      }
    }
    return nextEvents;
  }

  async function inputValue(value) {
    if (!localMatch || selectedCell === null || localMatch.fixedCells[selectedCell]) {
      return;
    }

    const row = cellRow(selectedCell);
    const column = cellColumn(selectedCell);
    const nextGrid = cloneGrid(grid);
    const previousValue = nextGrid[row][column];
    nextGrid[row][column] = value;

    const correctValue = localMatch.solution[row][column];
    const isCorrect = value === correctValue;
    const at = nowIso();
    const previousIncorrectMove = [...(localMatch.events || [])]
      .reverse()
      .find(
        (event) =>
          event.type === "move" &&
          !event.isCorrect &&
          event.cellIndex === selectedCell &&
          !event.correctedAt
      );

    let events = markLastSelectionAsUsed(localMatch.events || []);
    events = events.map((event) => {
      if (isCorrect && event.id === previousIncorrectMove?.id) {
        return { ...event, correctedAt: at };
      }
      return event;
    });

    const repeatedErrors = events.filter(
      (event) =>
        event.type === "move" &&
        !event.isCorrect &&
        event.cellIndex === selectedCell
    ).length;

    events.push({
      at,
      cellIndex: selectedCell,
      column,
      block: cellBlock(selectedCell),
      conflictTypes: conflictTypesFor(nextGrid, selectedCell, value),
      correctValue,
      difficulty: localMatch.difficulty,
      id: `event-${Date.now()}`,
      isCorrect,
      previousValue,
      repeatedErrors,
      row,
      secondsSinceLastAction: secondsFrom(localMatch.lastActionAt || localMatch.startedAt),
      secondsSinceLastMove: secondsFrom(localMatch.lastMoveAt || localMatch.startedAt),
      secondsSinceSelection: secondsFrom(selectionStartedAt),
      secondsSinceStart: secondsFrom(localMatch.startedAt),
      type: "move",
      value
    });

    const nextMatch = {
      ...localMatch,
      events,
      candidates: {
        ...(localMatch.candidates || {}),
        [selectedCell]: []
      },
      lastActionAt: at,
      lastInteractionAt: at,
      lastMoveAt: at,
      userGrid: nextGrid
    };

    if (isSolved(localMatch, nextGrid)) {
      await onMatchEnd(nextMatch, "completed");
      return;
    }

    await updateMatch(nextMatch);
  }

  async function clearSelectedCell() {
    if (!localMatch || selectedCell === null || localMatch.fixedCells[selectedCell]) {
      return;
    }

    const row = cellRow(selectedCell);
    const column = cellColumn(selectedCell);
    if (!grid[row][column]) {
      return;
    }

    const nextGrid = cloneGrid(grid);
    const previousValue = nextGrid[row][column];
    nextGrid[row][column] = 0;

    const at = nowIso();
    await updateMatch({
      ...localMatch,
      candidates: {
        ...(localMatch.candidates || {}),
        [selectedCell]: []
      },
      events: [
        ...(localMatch.events || []),
        {
          at,
          cellIndex: selectedCell,
          previousValue,
          secondsSinceLastAction: secondsFrom(localMatch.lastActionAt || localMatch.startedAt),
          secondsSinceStart: secondsFrom(localMatch.startedAt),
          type: "erase"
        }
      ],
      lastActionAt: at,
      lastInteractionAt: at,
      userGrid: nextGrid
    });
  }

  async function finishEarly() {
    if (!localMatch) {
      return;
    }

    const filledCells = grid.flat().filter(Boolean).length;
    const progress = Math.round((filledCells / 81) * 100);
    const event = {
      at: nowIso(),
      progress,
      type: "abandon"
    };

    await onMatchEnd(
      {
        ...localMatch,
        events: [...(localMatch.events || []), event]
      },
      "abandoned",
      { progress }
    );
  }

  if (!localMatch) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhuma partida ativa.</Text>
          <AppButton onPress={goBack} title="Voltar" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.board}>
          {flatGrid.map((value, index) => {
            const fixed = localMatch.fixedCells[index];
            const selected = selectedCell === index;

            return (
              <TouchableOpacity
                accessibilityRole="button"
                key={index}
                onPress={() => selectCell(index)}
                style={[
                  styles.cell,
                  fixed && styles.fixedCell,
                  selected && styles.selectedCell,
                  index % 3 === 2 && index % 9 !== 8 && styles.blockRight,
                  Math.floor(index / 9) % 3 === 2 && index < 54 && styles.blockBottom
                ]}
              >
                <Text style={[styles.cellText, fixed && styles.fixedText]}>
                  {value || ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.keypad}>
          {Array.from({ length: 9 }, (_, index) => index + 1).map((value) => (
            <TouchableOpacity
              accessibilityRole="button"
              key={value}
              onPress={() => inputValue(value)}
              style={styles.key}
            >
              <Text style={styles.keyText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actions}>
          <AppButton onPress={clearSelectedCell} title="Apagar" variant="ghost" />
          <AppButton onPress={finishEarly} title="Sair" variant="ghost" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    maxWidth: 360,
    width: "100%"
  },
  blockBottom: {
    borderBottomColor: "#111827",
    borderBottomWidth: 3
  },
  blockRight: {
    borderRightColor: "#111827",
    borderRightWidth: 3
  },
  board: {
    alignSelf: "center",
    aspectRatio: 1,
    backgroundColor: "#111827",
    borderColor: "#111827",
    borderRadius: radii.md,
    borderWidth: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 520,
    overflow: "hidden",
    width: "100%"
  },
  cell: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    height: "11.111%",
    justifyContent: "center",
    width: "11.111%"
  },
  cellText: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "900"
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    gap: spacing.lg,
    justifyContent: "center",
    padding: spacing.md
  },
  emptyState: {
    flex: 1,
    gap: spacing.lg,
    justifyContent: "center",
    padding: spacing.lg
  },
  emptyText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  },
  fixedCell: {
    backgroundColor: "#F3F4F6"
  },
  fixedText: {
    color: "#111827"
  },
  key: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#111827",
    borderRadius: radii.md,
    borderWidth: 2,
    height: 68,
    justifyContent: "center",
    width: 92
  },
  keypad: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
    maxWidth: 300,
    width: "100%"
  },
  keyText: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "900"
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1
  },
  selectedCell: {
    backgroundColor: "#BFDBFE"
  }
});
