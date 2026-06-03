function secondsBetween(startIso, endIso) {
  return Math.max(0, Math.round((new Date(endIso) - new Date(startIso)) / 1000));
}

function countBy(items, keyFor) {
  return items.reduce((accumulator, item) => {
    const key = keyFor(item);
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});
}

function distanceBetweenCells(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return 0;
  }

  const rowA = Math.floor(a / 9);
  const columnA = a % 9;
  const rowB = Math.floor(b / 9);
  const columnB = b % 9;
  return Math.abs(rowA - rowB) + Math.abs(columnA - columnB);
}

function segmentMoves(moves, segmentIndex, segmentCount) {
  if (!moves.length) {
    return [];
  }

  const segmentSize = Math.ceil(moves.length / segmentCount);
  return moves.slice(segmentIndex * segmentSize, (segmentIndex + 1) * segmentSize);
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function analyzeCognitiveData(match) {
  const events = match.events || [];
  const moves = events.filter((event) => event.type === "move");
  const selections = events.filter((event) => event.type === "select_cell");
  const pauses = events.filter((event) => event.type === "pause");
  const helps = events.filter((event) => event.type === "help");
  const candidateEvents = events.filter((event) => event.type === "candidate");
  const eraseEvents = events.filter((event) => event.type === "erase");
  const correctMoves = moves.filter((move) => move.isCorrect);
  const incorrectMoves = moves.filter((move) => !move.isCorrect);
  const conflictMoves = moves.filter((move) => move.hasConflict);
  const repeatedErrorsByCell = countBy(incorrectMoves, (move) => String(move.cellIndex));
  const repeatedErrorCount = Object.values(repeatedErrorsByCell).filter(
    (count) => count > 1
  ).length;
  const moveIntervals = moves.map((move) => move.secondsSinceLastMove || 0);
  const decisionTimes = moves.map((move) => move.secondsSinceSelection || 0);
  const quickWrongMoves = incorrectMoves.filter(
    (move) => (move.secondsSinceSelection || 0) <= 2
  );
  const longInactiveEvents = events.filter((event) => event.longInactivity);
  const touchOnlyCount = selections.filter((selection) => selection.touchWithoutMove).length;
  const distantSwitches = selections.filter((selection, index) => {
    if (index === 0) {
      return false;
    }

    return distanceBetweenCells(selections[index - 1].cellIndex, selection.cellIndex) >= 7;
  });
  const correctedErrorCount = incorrectMoves.filter((move) => move.correctedAt).length;
  const unresolvedErrorCount = incorrectMoves.length - correctedErrorCount;
  const firstSegment = segmentMoves(moves, 0, 3);
  const middleSegment = segmentMoves(moves, 1, 3);
  const lastSegment = segmentMoves(moves, 2, 3);
  const accuracy = moves.length ? Math.round((correctMoves.length / moves.length) * 100) : 0;
  const progress = match.emptyCells
    ? Math.round((correctMoves.length / match.emptyCells) * 100)
    : 0;
  const averageMoveTime = Math.round(average(moveIntervals));
  const averageDecisionTime = Math.round(average(decisionTimes));
  const durationSeconds = match.durationSeconds || secondsBetween(match.startedAt, match.finishedAt || new Date().toISOString());

  return {
    summary: {
      accuracy,
      averageDecisionTime,
      averageMoveTime,
      correctMoves: correctMoves.length,
      durationSeconds,
      incorrectMoves: incorrectMoves.length,
      pauses: pauses.length,
      progress
    },
    domains: {
      workingMemory: {
        value: Math.max(
          0,
          100 - repeatedErrorCount * 12 - longInactiveEvents.length * 6 - candidateEvents.length
        ),
        interpretation:
          candidateEvents.length > 0
            ? "Uso de candidatos indica manutenção de hipóteses durante a resolução."
            : repeatedErrorCount > 1
            ? "Mudanças e erros repetidos sugerem maior carga de memória de trabalho."
            : "Pouca repetição de erros observada nas células trabalhadas."
      },
      recentMemory: {
        value: Math.max(0, 100 - repeatedErrorCount * 18),
        interpretation:
          repeatedErrorCount > 0
            ? "Houve repetição recente de erros em uma ou mais células."
            : "Não houve padrão forte de repetição recente de erro."
      },
      attention: {
        value: Math.max(0, 100 - longInactiveEvents.length * 10 - touchOnlyCount * 3),
        interpretation:
          longInactiveEvents.length > 0
            ? "Foram detectados períodos longos sem ação."
            : "Ritmo de interação estável durante a partida."
      },
      executiveFunction: {
        value: Math.max(0, accuracy - quickWrongMoves.length * 5),
        interpretation:
          correctedErrorCount > 0
            ? "O usuário corrigiu erros de forma autônoma, indicando automonitoramento."
            : "Ainda não há correções suficientes para inferir estratégia executiva forte."
      },
      planning: {
        value: Math.max(0, 100 - distantSwitches.length * 5 + Math.min(candidateEvents.length, 10)),
        interpretation:
          distantSwitches.length > 4
            ? "A sequência alternou bastante entre regiões distantes."
            : "A navegação pelo tabuleiro manteve regiões relativamente próximas."
      },
      logicalReasoning: {
        value: accuracy,
        interpretation:
          conflictMoves.length > 0
            ? "Ocorreram conflitos visíveis contra regras básicas do Sudoku."
            : "As jogadas registradas evitaram conflitos visíveis."
      },
      problemSolving: {
        value: Math.min(100, progress),
        interpretation:
          match.status === "completed"
            ? "A partida foi concluída corretamente."
            : "O progresso será mais informativo após conclusão da partida."
      },
      cognitiveFlexibility: {
        value: Math.max(0, 100 - Math.max(0, distantSwitches.length - 5) * 4),
        interpretation:
          distantSwitches.length > 0
            ? "Houve alternância entre áreas do tabuleiro durante a tarefa."
            : "Pouca alternância de região foi observada."
      },
      inhibitoryControl: {
        value: Math.max(0, 100 - quickWrongMoves.length * 16),
        interpretation:
          quickWrongMoves.length > 0
            ? "Algumas decisões incorretas ocorreram logo após seleção da célula."
            : "Não foram observadas jogadas impulsivas relevantes."
      },
      errorMonitoring: {
        value: incorrectMoves.length
          ? Math.round((correctedErrorCount / incorrectMoves.length) * 100)
          : 100,
        interpretation:
          correctedErrorCount > 0
            ? "Erros foram revisados e corrigidos durante a partida."
            : "Ainda não há evidência de autocorreção registrada."
      },
      processingSpeed: {
        value: Math.max(0, 100 - averageMoveTime * 2),
        interpretation: `Tempo médio por jogada: ${averageMoveTime}s.`
      },
      visuospatial: {
        value: Math.max(0, 100 - conflictMoves.length * 12),
        interpretation:
          conflictMoves.length > 0
            ? "Conflitos por linha, coluna ou bloco indicam pontos de confusão espacial."
            : "Não foram registrados conflitos espaciais visíveis."
      },
      taskOrganization: {
        value: Math.max(0, 100 - distantSwitches.length * 5),
        interpretation: "Indicador baseado na sequência de células selecionadas."
      },
      decisionMaking: {
        value: Math.max(0, accuracy - quickWrongMoves.length * 4),
        interpretation:
          averageDecisionTime > 8
            ? "Decisões mais demoradas foram frequentes."
            : "Decisões ocorreram em ritmo curto a moderado."
      },
      strategyLearning: {
        value: Math.max(
          0,
          Math.round(
            accuracy +
              (average(firstSegment.map((move) => move.hasConflict ? 1 : 0)) -
                average(lastSegment.map((move) => move.hasConflict ? 1 : 0))) *
                20
          )
        ),
        interpretation:
          lastSegment.length && middleSegment.length
            ? "O app comparou início, meio e fim para estimar ajuste de estratégia."
            : "São necessárias mais jogadas para avaliar aprendizagem de estratégia."
      },
      instructionRetention: {
        value: Math.max(0, 100 - conflictMoves.length * 10),
        interpretation:
          match.instructionsConfirmedAt
            ? "Instruções foram confirmadas antes do início da atividade."
            : "Instruções ainda não foram confirmadas nesta partida."
      },
      patternPerception: {
        value: Math.max(0, 80 - helps.length * 5),
        interpretation: "Indicador inicial baseado em sequências e uso de destaque numérico."
      },
      persistence: {
        value: match.status === "abandoned" ? 35 : Math.min(100, 60 + progress),
        interpretation:
          match.status === "abandoned"
            ? "A partida foi abandonada antes da conclusão."
            : "Persistência estimada pelo progresso e continuidade após erros."
      },
      autonomy: {
        value: Math.max(0, 100 - helps.length * 20),
        interpretation:
          helps.length > 0
            ? "Houve uso de ajuda durante a partida."
            : "Nenhum pedido de ajuda foi registrado."
      }
    },
    raw: {
      candidateEvents: candidateEvents.length,
      conflictMoves: conflictMoves.length,
      correctedErrorCount,
      distantSwitches: distantSwitches.length,
      eraseEvents: eraseEvents.length,
      helpCount: helps.length,
      longInactiveEvents: longInactiveEvents.length,
      totalMoves: moves.length,
      quickWrongMoves: quickWrongMoves.length,
      repeatedErrorCount,
      unresolvedErrorCount
    }
  };
}
