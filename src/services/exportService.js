import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

import { domainLabels } from "./reportMetadata";

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

function formatDuration(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${pad(remainingSeconds)}s`;
}

function safeFilePart(value) {
  return String(value || "registro").replace(/[^a-zA-Z0-9_-]/g, "-");
}

function reportBaseName(user, match) {
  const date = new Date(match.finishedAt || match.startedAt);
  const stamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
  return `neurovium-${safeFilePart(user.registration)}-${stamp}`;
}

function userReportBaseName(user) {
  const date = new Date();
  const stamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
  return `neurovium-usuario-${safeFilePart(user.registration)}-${stamp}`;
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function historyStats(history = []) {
  const completed = history.filter((match) => match.cognitiveAnalysis);
  const points = completed
    .slice()
    .reverse()
    .map((match, index) => ({
      accuracy: match.cognitiveAnalysis.summary.accuracy,
      durationSeconds: match.cognitiveAnalysis.summary.durationSeconds,
      index: index + 1,
      progress: match.cognitiveAnalysis.summary.progress
    }));

  return {
    averageAccuracy: average(points.map((point) => point.accuracy)),
    averageDurationSeconds: average(points.map((point) => point.durationSeconds)),
    averageProgress: average(points.map((point) => point.progress)),
    totalMatches: completed.length,
    evolution: points
  };
}

function chartPolyline(points, key, height = 120, width = 320) {
  if (points.length <= 1) {
    return "";
  }

  const maxValue = Math.max(...points.map((point) => point[key]), 1);
  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - (point[key] / maxValue) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function domainDetails(match) {
  const analysis = match.cognitiveAnalysis;
  if (!analysis) {
    return [];
  }

  return Object.entries(analysis.domains).map(([key, domain]) => ({
    id: key,
    title: domainLabels[key] || key,
    value: domain.value,
    interpretation: domain.interpretation
  }));
}

function userDomainAverages(history = []) {
  const matches = history.filter((match) => match.cognitiveAnalysis);
  const bucket = {};

  matches.forEach((match) => {
    Object.entries(match.cognitiveAnalysis.domains).forEach(([key, domain]) => {
      if (!bucket[key]) {
        bucket[key] = [];
      }
      bucket[key].push(domain.value);
    });
  });

  return Object.entries(bucket).map(([key, values]) => ({
    id: key,
    title: domainLabels[key] || key,
    average: average(values),
    samples: values.length
  }));
}

export function buildUserReportPayload({ history = [], user }) {
  const completed = history.filter((match) => match.cognitiveAnalysis);
  const stats = historyStats(history);

  return {
    generatedAt: new Date().toISOString(),
    observation:
      "Relatório geral observacional para leitura clínica contextual. Não representa diagnóstico médico e deve ser interpretado por profissional qualificado.",
    user: {
      id: user.id,
      name: user.name,
      registration: user.registration,
      status: user.status,
      updatedAt: user.updatedAt || null
    },
    history: stats,
    domains: userDomainAverages(history),
    matches: completed.map((match) => ({
      id: match.id,
      difficulty: match.difficulty,
      durationSeconds: match.durationSeconds,
      finishedAt: match.finishedAt,
      status: match.status,
      summary: match.cognitiveAnalysis.summary
    }))
  };
}

export function buildReportPayload({ history = [], match, user }) {
  const analysis = match.cognitiveAnalysis;

  return {
    generatedAt: new Date().toISOString(),
    observation:
      "Relatório observacional do comportamento durante o Sudoku. Não representa diagnóstico clínico. Em caso de suspeita clínica, recomenda-se avaliação profissional qualificada.",
    user: {
      id: user.id,
      name: user.name,
      registration: user.registration,
      status: user.status,
      updatedAt: user.updatedAt || null
    },
    match: {
      id: match.id,
      difficulty: match.difficulty,
      difficultyId: match.difficultyId,
      endedAt: match.finishedAt || null,
      startedAt: match.startedAt,
      status: match.status,
      durationSeconds: match.durationSeconds || 0,
      helpCount: match.helpCount || 0,
      pauseCount: match.pauseLog?.length || 0,
      abandoned: match.status === "abandoned"
    },
    performance: analysis
      ? {
          accuracy: analysis.summary.accuracy,
          averageDecisionTime: analysis.summary.averageDecisionTime,
          averageMoveTime: analysis.summary.averageMoveTime,
          correctMoves: analysis.summary.correctMoves,
          incorrectMoves: analysis.summary.incorrectMoves,
          progress: analysis.summary.progress,
          raw: analysis.raw
        }
      : null,
    cognitiveMetrics: domainDetails(match),
    qualitative: {
      reasoningExplanation: match.reasoningExplanation || "",
      assessment:
        match.reasoningExplanationAssessment || "Resposta qualitativa não informada."
    },
    history: historyStats(history),
    events: match.events || []
  };
}

function reportHtml(payload) {
  const chartPoints = chartPolyline(payload.history.evolution, "accuracy");
  const domains = payload.cognitiveMetrics
    .map(
      (domain) => `
        <section>
          <h3>${domain.title}</h3>
          <p><strong>Pontuação observacional:</strong> ${domain.value}%</p>
          <p>${domain.interpretation}</p>
        </section>`
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { color: #161223; font-family: Arial, sans-serif; margin: 32px; }
          h1 { color: #6D28D9; margin-bottom: 4px; }
          h2 { border-bottom: 1px solid #DDD6FE; color: #332A46; padding-bottom: 6px; }
          h3 { color: #6D28D9; margin-bottom: 4px; }
          p, li { font-size: 13px; line-height: 1.45; }
          .note { background: #F5F3FF; border: 1px solid #DDD6FE; border-radius: 8px; padding: 12px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px; }
          .metric { background: #F8F7FF; border-radius: 6px; padding: 8px; }
          section { margin-bottom: 14px; }
          svg { background: #F8F7FF; border: 1px solid #DDD6FE; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>Neurovium</h1>
        <p>Relatório de Sudoku com análise cognitiva observacional</p>
        <p class="note">${payload.observation}</p>

        <h2>Participante</h2>
        <div class="grid">
          <div class="metric"><strong>Nome:</strong> ${payload.user.name}</div>
          <div class="metric"><strong>Registro:</strong> ${payload.user.registration}</div>
          <div class="metric"><strong>Status:</strong> ${payload.user.status}</div>
          <div class="metric"><strong>Atividade:</strong> ${formatDateTime(payload.match.startedAt)}</div>
        </div>

        <h2>Partida</h2>
        <div class="grid">
          <div class="metric"><strong>Dificuldade:</strong> ${payload.match.difficulty}</div>
          <div class="metric"><strong>Status:</strong> ${payload.match.status}</div>
          <div class="metric"><strong>Tempo total:</strong> ${formatDuration(payload.match.durationSeconds)}</div>
          <div class="metric"><strong>Conclusão:</strong> ${payload.performance?.progress || 0}%</div>
          <div class="metric"><strong>Acertos:</strong> ${payload.performance?.correctMoves || 0}</div>
          <div class="metric"><strong>Erros:</strong> ${payload.performance?.incorrectMoves || 0}</div>
          <div class="metric"><strong>Dicas:</strong> ${payload.match.helpCount}</div>
          <div class="metric"><strong>Pausas:</strong> ${payload.match.pauseCount}</div>
        </div>

        <h2>Média de todas as partidas</h2>
        <div class="grid">
          <div class="metric"><strong>Total:</strong> ${payload.history.totalMatches}</div>
          <div class="metric"><strong>Precisão média:</strong> ${payload.history.averageAccuracy}%</div>
          <div class="metric"><strong>Conclusão média:</strong> ${payload.history.averageProgress}%</div>
          <div class="metric"><strong>Tempo médio:</strong> ${formatDuration(payload.history.averageDurationSeconds)}</div>
        </div>
        <p>Evolução de precisão por partida:</p>
        <svg width="320" height="120" viewBox="0 0 320 120">
          <polyline fill="none" points="${chartPoints}" stroke="#8B5CF6" stroke-width="3" />
        </svg>

        <h2>Seções cognitivas</h2>
        ${domains}

        <h2>Linguagem e explicação do raciocínio</h2>
        <p><strong>Texto:</strong> ${payload.qualitative.reasoningExplanation || "Não informado."}</p>
        <p><strong>Observação:</strong> ${payload.qualitative.assessment}</p>
      </body>
    </html>
  `;
}

function userReportHtml(payload) {
  const chartPoints = chartPolyline(payload.history.evolution, "accuracy");
  const domainRows = payload.domains
    .map(
      (domain) => `
        <tr>
          <td>${domain.title}</td>
          <td>${domain.average}%</td>
          <td>${domain.samples}</td>
        </tr>`
    )
    .join("");
  const matchRows = payload.matches
    .map(
      (match) => `
        <tr>
          <td>${formatDateTime(match.finishedAt)}</td>
          <td>${match.difficulty}</td>
          <td>${match.status}</td>
          <td>${formatDuration(match.durationSeconds)}</td>
          <td>${match.summary.accuracy}%</td>
          <td>${match.summary.progress}%</td>
        </tr>`
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { background: #08070D; color: #F8FAFC; font-family: Arial, sans-serif; margin: 32px; }
          h1 { color: #C4B5FD; margin-bottom: 4px; }
          h2 { border-bottom: 1px solid #332A46; color: #F8FAFC; padding-bottom: 6px; }
          p, td, th { font-size: 13px; line-height: 1.45; }
          .note { background: #15111F; border: 1px solid #332A46; border-radius: 8px; color: #A8A4B8; padding: 12px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px; }
          .metric { background: #15111F; border: 1px solid #332A46; border-radius: 6px; padding: 8px; }
          table { border-collapse: collapse; margin-top: 10px; width: 100%; }
          th { color: #C4B5FD; text-align: left; }
          td, th { border-bottom: 1px solid #332A46; padding: 8px; }
          svg { background: #15111F; border: 1px solid #332A46; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>Neurovium</h1>
        <p>Relatório geral do usuário</p>
        <p class="note">${payload.observation}</p>

        <h2>Identificação</h2>
        <div class="grid">
          <div class="metric"><strong>Nome:</strong> ${payload.user.name}</div>
          <div class="metric"><strong>Registro:</strong> ${payload.user.registration}</div>
          <div class="metric"><strong>Status:</strong> ${payload.user.status}</div>
          <div class="metric"><strong>Gerado em:</strong> ${formatDateTime(payload.generatedAt)}</div>
        </div>

        <h2>Resumo longitudinal</h2>
        <div class="grid">
          <div class="metric"><strong>Partidas analisadas:</strong> ${payload.history.totalMatches}</div>
          <div class="metric"><strong>Precisão média:</strong> ${payload.history.averageAccuracy}%</div>
          <div class="metric"><strong>Conclusão média:</strong> ${payload.history.averageProgress}%</div>
          <div class="metric"><strong>Tempo médio:</strong> ${formatDuration(payload.history.averageDurationSeconds)}</div>
        </div>
        <p>Evolução de precisão:</p>
        <svg width="360" height="130" viewBox="0 0 320 120">
          <polyline fill="none" points="${chartPoints}" stroke="#8B5CF6" stroke-width="3" />
        </svg>

        <h2>Médias por domínio cognitivo</h2>
        <table>
          <thead><tr><th>Domínio</th><th>Média</th><th>Amostras</th></tr></thead>
          <tbody>${domainRows}</tbody>
        </table>

        <h2>Partidas</h2>
        <table>
          <thead><tr><th>Data</th><th>Dificuldade</th><th>Status</th><th>Tempo</th><th>Precisão</th><th>Conclusão</th></tr></thead>
          <tbody>${matchRows}</tbody>
        </table>
      </body>
    </html>
  `;
}

async function deliverWebFile(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });

  if (navigator.share && typeof File !== "undefined") {
    const file = new File([blob], fileName, { type: mimeType });
    if (!navigator.canShare || navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Relatório Neurovium"
        });
        return "Arquivo gerado e compartilhamento aberto.";
      } catch {
        // Fall back to a direct download when the browser blocks or cancels sharing.
      }
    }
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
  return "Arquivo gerado para download.";
}

async function shareFile(uri, message) {
  if (await Sharing.isAvailableAsync()) {
    try {
      await Sharing.shareAsync(uri, {
        dialogTitle: message
      });
      return "Arquivo gerado e compartilhamento aberto.";
    } catch {
      return "Arquivo gerado, mas o compartilhamento foi cancelado.";
    }
  }

  return "Arquivo gerado, mas o compartilhamento não está disponível neste dispositivo.";
}

export async function exportReportJson({ history, match, user }) {
  const payload = buildReportPayload({ history, match, user });
  const fileName = `${reportBaseName(user, match)}.json`;
  const json = JSON.stringify(payload, null, 2);

  if (Platform.OS === "web") {
    return deliverWebFile(fileName, json, "application/json");
  }

  const uri = `${FileSystem.documentDirectory}${fileName}`;
  await FileSystem.writeAsStringAsync(uri, json);
  return shareFile(uri, "Compartilhar JSON Neurovium");
}

export async function exportReportPdf({ history, match, user }) {
  const payload = buildReportPayload({ history, match, user });
  const fileName = `${reportBaseName(user, match)}.pdf`;
  const html = reportHtml(payload);

  if (Platform.OS === "web") {
    return deliverWebFile(fileName.replace(".pdf", ".html"), html, "text/html");
  }

  const { uri } = await Print.printToFileAsync({ html });
  const targetUri = `${FileSystem.documentDirectory}${fileName}`;
  await FileSystem.copyAsync({ from: uri, to: targetUri });
  return shareFile(targetUri, "Compartilhar PDF Neurovium");
}

export async function exportUserGeneralReport({ history, user }) {
  const payload = buildUserReportPayload({ history, user });
  const fileName = `${userReportBaseName(user)}.pdf`;
  const html = userReportHtml(payload);

  if (Platform.OS === "web") {
    return deliverWebFile(fileName.replace(".pdf", ".html"), html, "text/html");
  }

  const jsonFileName = fileName.replace(".pdf", ".json");
  const jsonUri = `${FileSystem.documentDirectory}${jsonFileName}`;
  await FileSystem.writeAsStringAsync(jsonUri, JSON.stringify(payload, null, 2));

  try {
    const { uri } = await Print.printToFileAsync({ html });
    const targetUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: targetUri });
    return shareFile(targetUri, "Compartilhar relatório geral Neurovium");
  } catch {
    return shareFile(jsonUri, "Compartilhar dados Neurovium");
  }
}
