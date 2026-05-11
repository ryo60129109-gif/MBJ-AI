const seedData = {
  clinic: {
    name: "表参道クリニック",
    period: "2026年5月 月次",
    previous: { spend: 1680000, cpa: 14237, bookingRate: 57, roas: 284 },
    channels: [
      { name: "Google広告", spend: 920000, inquiries: 86, bookings: 54, visits: 41, contracts: 18, revenue: 2240000 },
      { name: "Meta広告", spend: 480000, inquiries: 52, bookings: 28, visits: 19, contracts: 8, revenue: 920000 },
      { name: "MEO", spend: 180000, inquiries: 38, bookings: 25, visits: 21, contracts: 9, revenue: 1180000 },
      { name: "Instagram", spend: 160000, inquiries: 24, bookings: 14, visits: 9, contracts: 4, revenue: 520000 },
      { name: "紹介/指名", spend: 0, inquiries: 31, bookings: 24, visits: 22, contracts: 13, revenue: 1510000 }
    ],
    ops: { mapRank: 3, reviews: 428, rating: 4.7, instaPosts: 18, followers: 12840, reach: 86400 }
  },
  salon: {
    name: "銀座美容サロン",
    period: "2026年5月 月次",
    previous: { spend: 940000, cpa: 10850, bookingRate: 62, roas: 332 },
    channels: [
      { name: "Google広告", spend: 420000, inquiries: 42, bookings: 31, visits: 27, contracts: 17, revenue: 1160000 },
      { name: "Meta広告", spend: 360000, inquiries: 51, bookings: 34, visits: 25, contracts: 14, revenue: 910000 },
      { name: "MEO", spend: 120000, inquiries: 29, bookings: 22, visits: 20, contracts: 12, revenue: 760000 },
      { name: "Instagram", spend: 80000, inquiries: 36, bookings: 24, visits: 18, contracts: 10, revenue: 680000 }
    ],
    ops: { mapRank: 5, reviews: 216, rating: 4.6, instaPosts: 26, followers: 24800, reach: 148000 }
  },
  dental: {
    name: "横浜デンタル",
    period: "2026年5月 月次",
    previous: { spend: 760000, cpa: 9240, bookingRate: 68, roas: 241 },
    channels: [
      { name: "Google広告", spend: 520000, inquiries: 61, bookings: 47, visits: 39, contracts: 15, revenue: 1450000 },
      { name: "Yahoo広告", spend: 140000, inquiries: 15, bookings: 10, visits: 8, contracts: 3, revenue: 270000 },
      { name: "MEO", spend: 90000, inquiries: 28, bookings: 22, visits: 19, contracts: 8, revenue: 640000 },
      { name: "紹介/指名", spend: 0, inquiries: 19, bookings: 16, visits: 15, contracts: 9, revenue: 720000 }
    ],
    ops: { mapRank: 2, reviews: 302, rating: 4.8, instaPosts: 8, followers: 6400, reach: 38200 }
  }
};

let state = loadState();
let activeClient = "clinic";
let activeChart = "cv";
let activeView = "dashboard";

const appMeta = {
  adsTasks: [
    { id: "task-1", status: "確認", title: "Google広告: 指名KWのCPA上昇を確認", channel: "Google広告", due: "今日", done: false },
    { id: "task-2", status: "改善", title: "Meta広告: 来院率の高いLPへ配信比率を移動", channel: "Meta広告", due: "明日", done: false },
    { id: "task-3", status: "制作", title: "Instagram広告: 症例訴求のクリエイティブ追加", channel: "Instagram", due: "5/14", done: false },
    { id: "task-4", status: "完了", title: "MEO: 口コミ返信テンプレート更新", channel: "MEO", due: "済", done: true }
  ],
  ranks: [
    { keyword: "表参道 美容クリニック", rank: 3, change: "+2" },
    { keyword: "医療脱毛 表参道", rank: 5, change: "-1" },
    { keyword: "シミ取り 表参道", rank: 7, change: "+4" },
    { keyword: "美容皮膚科 口コミ", rank: 4, change: "0" }
  ],
  meoTodos: [
    "星3以下の口コミに24時間以内で返信",
    "施術メニュー写真を3枚追加",
    "今週の空き枠投稿をGBPに反映"
  ],
  ideas: [
    { title: "症例ビフォーアフター", detail: "保存率狙い。初回相談への導線を固定コメントに置く。" },
    { title: "よくある不安Q&A", detail: "問い合わせ前の離脱を減らす。予約LPに同じ回答を展開。" },
    { title: "医師・スタッフ紹介", detail: "来院前の安心感を作る。MEO写真にも転用。" }
  ],
  integrations: [
    { name: "Google Ads", status: "API予定" },
    { name: "Meta Ads", status: "API予定" },
    { name: "Google Business Profile", status: "API予定" },
    { name: "Instagram", status: "API予定" },
    { name: "予約/CRM", status: "CSV対応" },
    { name: "入金データ", status: "CSV対応" }
  ],
  leads: [
    { id: "lead-1", name: "山田様", stage: "問い合わせ", source: "Google広告", value: 0 },
    { id: "lead-2", name: "佐藤様", stage: "予約", source: "Instagram", value: 0 },
    { id: "lead-3", name: "田中様", stage: "来院", source: "MEO", value: 0 },
    { id: "lead-4", name: "鈴木様", stage: "申込", source: "Meta広告", value: 120000 },
    { id: "lead-5", name: "高橋様", stage: "入金", source: "紹介/指名", value: 280000 },
    { id: "lead-6", name: "伊藤様", stage: "予約", source: "Google広告", value: 0 },
    { id: "lead-7", name: "小林様", stage: "来院", source: "Google広告", value: 0 }
  ]
};

const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("ja-JP");

const els = {
  clientName: document.querySelector("#clientName"),
  periodLabel: document.querySelector("#periodLabel"),
  clientSelect: document.querySelector("#clientSelect"),
  periodSelect: document.querySelector("#periodSelect"),
  adSpend: document.querySelector("#adSpend"),
  adSpendDelta: document.querySelector("#adSpendDelta"),
  cpa: document.querySelector("#cpa"),
  cpaDelta: document.querySelector("#cpaDelta"),
  bookingRate: document.querySelector("#bookingRate"),
  bookingDelta: document.querySelector("#bookingDelta"),
  roas: document.querySelector("#roas"),
  roasDelta: document.querySelector("#roasDelta"),
  chart: document.querySelector("#channelChart"),
  funnelList: document.querySelector("#funnelList"),
  channelTable: document.querySelector("#channelTable"),
  editor: document.querySelector("#editor"),
  saveButton: document.querySelector("#saveButton"),
  resetButton: document.querySelector("#resetButton"),
  importButton: document.querySelector("#importButton"),
  reportButton: document.querySelector("#reportButton"),
  importModal: document.querySelector("#importModal"),
  closeImport: document.querySelector("#closeImport"),
  cancelImport: document.querySelector("#cancelImport"),
  runImport: document.querySelector("#runImport"),
  csvInput: document.querySelector("#csvInput"),
  leadModal: document.querySelector("#leadModal"),
  addLeadButton: document.querySelector("#addLeadButton"),
  closeLead: document.querySelector("#closeLead"),
  cancelLead: document.querySelector("#cancelLead"),
  createLead: document.querySelector("#createLead"),
  leadNameInput: document.querySelector("#leadNameInput"),
  leadSourceInput: document.querySelector("#leadSourceInput"),
  leadValueInput: document.querySelector("#leadValueInput"),
  loginScreen: document.querySelector("#loginScreen"),
  demoLogin: document.querySelector("#demoLogin"),
  previewLogin: document.querySelector("#previewLogin"),
  panelLogin: document.querySelector("#panelLogin"),
  serviceNameInput: document.querySelector("#serviceNameInput"),
  agencyNameInput: document.querySelector("#agencyNameInput"),
  brandColorInput: document.querySelector("#brandColorInput"),
  domainInput: document.querySelector("#domainInput"),
  saveSettingsButton: document.querySelector("#saveSettingsButton"),
  toast: document.querySelector("#toast"),
  adsBoard: document.querySelector("#adsBoard"),
  rankList: document.querySelector("#rankList"),
  reviewScore: document.querySelector("#reviewScore"),
  reviewMeter: document.querySelector("#reviewMeter"),
  meoTodos: document.querySelector("#meoTodos"),
  contentCalendar: document.querySelector("#contentCalendar"),
  ideaList: document.querySelector("#ideaList"),
  pipeline: document.querySelector("#pipeline"),
  integrationList: document.querySelector("#integrationList")
};

function loadState() {
  const saved = localStorage.getItem("clinic-growth-os");
  return saved ? JSON.parse(saved) : structuredClone(seedData);
}
function persist() { localStorage.setItem("clinic-growth-os", JSON.stringify(state)); }
function totals(data) {
  return data.channels.reduce((acc, item) => {
    acc.spend += item.spend; acc.inquiries += item.inquiries; acc.bookings += item.bookings;
    acc.visits += item.visits; acc.contracts += item.contracts; acc.revenue += item.revenue;
    return acc;
  }, { spend: 0, inquiries: 0, bookings: 0, visits: 0, contracts: 0, revenue: 0 });
}
function pct(value) { return `${Math.round(value)}%`; }
function rate(part, whole) { return whole ? (part / whole) * 100 : 0; }
function delta(current, previous, lowerIsBetter = false) {
  if (!previous) return "-";
  const raw = ((current - previous) / previous) * 100;
  const good = lowerIsBetter ? raw <= 0 : raw >= 0;
  const sign = raw > 0 ? "+" : "";
  return `${good ? "改善" : "悪化"} ${sign}${raw.toFixed(1)}%`;
}
function render(updateEditor = true) {
  const data = state[activeClient];
  const total = totals(data);
  const cpa = total.inquiries ? total.spend / total.inquiries : 0;
  const bookingRate = rate(total.bookings, total.inquiries);
  const roas = rate(total.revenue, total.spend);
  els.clientName.textContent = data.name;
  els.periodLabel.textContent = data.period;
  els.adSpend.textContent = yen.format(total.spend);
  els.cpa.textContent = yen.format(cpa);
  els.bookingRate.textContent = pct(bookingRate);
  els.roas.textContent = pct(roas);
  els.adSpendDelta.textContent = delta(total.spend, data.previous.spend, true);
  els.cpaDelta.textContent = delta(cpa, data.previous.cpa, true);
  els.bookingDelta.textContent = delta(bookingRate, data.previous.bookingRate);
  els.roasDelta.textContent = delta(roas, data.previous.roas);
  renderFunnel(total); renderTable(data); renderOps(data.ops);
  if (updateEditor) renderEditor(data);
  drawChart(data); renderAppViews(data);
}
function renderFunnel(total) {
  const rows = [["問い合わせ", total.inquiries], ["予約", total.bookings], ["来院", total.visits], ["申込CV", total.contracts], ["入金CV", total.revenue]];
  const max = Math.max(total.inquiries, 1);
  els.funnelList.innerHTML = rows.map(([label, value]) => {
    const isRevenue = label === "入金CV";
    const visible = isRevenue ? yen.format(value) : `${num.format(value)}件`;
    const width = isRevenue ? 100 : Math.max(6, (value / max) * 100);
    return `<div class="funnel-row"><div class="funnel-meta"><span>${label}</span><strong>${visible}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div></div>`;
  }).join("");
}
function renderTable(data) {
  els.channelTable.innerHTML = data.channels.map((item) => {
    const cpa = item.inquiries ? item.spend / item.inquiries : 0;
    const roas = rate(item.revenue, item.spend);
    return `<tr><td>${item.name}</td><td>${yen.format(item.spend)}</td><td>${num.format(item.inquiries)}</td><td>${num.format(item.bookings)}</td><td>${num.format(item.visits)}</td><td>${yen.format(item.revenue)}</td><td>${yen.format(cpa)}</td><td>${item.spend ? pct(roas) : "-"}</td></tr>`;
  }).join("");
}
function renderOps(ops) {
  document.querySelector("#mapRank").textContent = `${ops.mapRank}位`;
  document.querySelector("#reviews").textContent = num.format(ops.reviews);
  document.querySelector("#rating").textContent = ops.rating.toFixed(1);
  document.querySelector("#instaPosts").textContent = `${num.format(ops.instaPosts)}件`;
  document.querySelector("#followers").textContent = num.format(ops.followers);
  document.querySelector("#reach").textContent = num.format(ops.reach);
}
function renderEditor(data) {
  els.editor.innerHTML = data.channels.map((channel, index) => `<div class="editor-row" data-index="${index}"><strong>${channel.name}</strong>${field("spend", "広告費", channel.spend)}${field("inquiries", "問合せ", channel.inquiries)}${field("bookings", "予約", channel.bookings)}${field("visits", "来院", channel.visits)}${field("revenue", "入金", channel.revenue)}</div>`).join("");
}
function renderAppViews(data) { renderAdsBoard(data); renderMEO(data); renderSNS(); renderPipeline(); renderIntegrations(); }
function renderAdsBoard(data) {
  const columns = ["確認", "改善", "制作", "完了"];
  els.adsBoard.innerHTML = columns.map((column) => {
    const items = appMeta.adsTasks.filter((task) => task.status === column);
    return `<div class="kanban-col"><h3>${column}</h3>${items.map((task) => {
      const channel = data.channels.find((item) => item.name === task.channel);
      const channelCpa = channel && channel.inquiries ? channel.spend / channel.inquiries : 0;
      return `<article class="task-card ${task.done ? "done" : ""}" data-task-id="${task.id}"><span class="status-pill">${task.channel}</span><strong>${task.title}</strong><div class="task-meta"><span>${task.done ? "完了" : `期限 ${task.due}`}</span><span>CPA ${channelCpa ? yen.format(channelCpa) : "-"}</span></div></article>`;
    }).join("")}</div>`;
  }).join("");
}
function renderMEO(data) {
  els.rankList.innerHTML = appMeta.ranks.map((rank) => `<div class="rank-row"><div><strong>${rank.keyword}</strong><span>前月比 ${rank.change}</span></div><div class="rank-value">${rank.rank}位</div></div>`).join("");
  els.reviewScore.textContent = data.ops.rating.toFixed(1);
  els.reviewMeter.style.width = `${(data.ops.rating / 5) * 100}%`;
  els.meoTodos.innerHTML = appMeta.meoTodos.map((todo) => `<div class="todo-item"><strong>${todo}</strong><span>未対応</span></div>`).join("");
}
function renderSNS() {
  const posts = { 2: "症例", 5: "Q&A", 9: "空き枠", 13: "医師紹介", 18: "口コミ", 24: "キャンペーン", 29: "症例" };
  els.contentCalendar.innerHTML = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    return `<div class="calendar-day"><small>5/${day}</small>${posts[day] ? `<span class="calendar-post">${posts[day]}</span>` : ""}</div>`;
  }).join("");
  els.ideaList.innerHTML = appMeta.ideas.map((idea) => `<article class="idea-card"><strong>${idea.title}</strong><span>${idea.detail}</span></article>`).join("");
}
function renderPipeline() {
  const stages = ["問い合わせ", "予約", "来院", "申込", "入金"];
  els.pipeline.innerHTML = stages.map((stage) => {
    const leads = appMeta.leads.filter((lead) => lead.stage === stage);
    return `<div class="pipeline-col"><h3>${stage} ${leads.length}件</h3>${leads.map((lead) => `<article class="lead-card" data-lead-id="${lead.id}"><strong>${lead.name}</strong><span>${lead.source}</span><b>${lead.value ? yen.format(lead.value) : "未確定"}</b></article>`).join("")}</div>`;
  }).join("");
}
function renderIntegrations() {
  els.integrationList.innerHTML = appMeta.integrations.map((item) => `<div class="integration-item"><div><strong>${item.name}</strong><span>データ同期</span></div><span class="integration-status">${item.status}</span></div>`).join("");
}
function setView(view) {
  activeView = view;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.classList.contains(`view-${view}`)));
  drawChart(state[activeClient]);
}
function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { els.toast.hidden = true; }, 1800);
}
function openApp(view = "dashboard") { els.loginScreen.classList.add("hidden"); setView(view); }
function parseCsvRows(text) {
  return text.trim().split(/\r?\n/).slice(1).map((line) => line.split(",").map((cell) => cell.trim())).filter((cells) => cells.length >= 7).map(([name, spend, inquiries, bookings, visits, contracts, revenue]) => ({
    name,
    spend: Number(spend.replace(/[^\d]/g, "")),
    inquiries: Number(inquiries.replace(/[^\d]/g, "")),
    bookings: Number(bookings.replace(/[^\d]/g, "")),
    visits: Number(visits.replace(/[^\d]/g, "")),
    contracts: Number(contracts.replace(/[^\d]/g, "")),
    revenue: Number(revenue.replace(/[^\d]/g, ""))
  }));
}
function nextStage(stage) {
  const stages = ["問い合わせ", "予約", "来院", "申込", "入金"];
  const index = stages.indexOf(stage);
  return stages[Math.min(index + 1, stages.length - 1)];
}
function field(key, label, value) { return `<div class="field"><label>${label}</label><input data-key="${key}" inputmode="numeric" type="text" value="${value}"></div>`; }
function drawChart(data) {
  const canvas = els.chart;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(320 * dpr);
  ctx.scale(dpr, dpr);
  const width = rect.width;
  const height = 320;
  const padding = { top: 20, right: 24, bottom: 46, left: 54 };
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  const values = data.channels.map((item) => (activeChart === "cv" ? item.inquiries : item.spend));
  const max = Math.max(...values, 1);
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const slot = plotWidth / values.length;
  const barWidth = Math.min(68, slot * 0.55);
  ctx.strokeStyle = "#dde4e8";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#65717a";
  ctx.font = "12px sans-serif";
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (plotHeight / 4) * i;
    ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(width - padding.right, y); ctx.stroke();
    const label = activeChart === "cv" ? Math.round(max - (max / 4) * i) : yen.format(max - (max / 4) * i);
    ctx.fillText(label, 8, y + 4);
  }
  data.channels.forEach((item, index) => {
    const value = values[index];
    const x = padding.left + slot * index + (slot - barWidth) / 2;
    const barHeight = (value / max) * plotHeight;
    const y = padding.top + plotHeight - barHeight;
    ctx.fillStyle = ["#2f8f72", "#2f6fbd", "#bd4b72", "#a6781a", "#167b86"][index % 5];
    roundRect(ctx, x, y, barWidth, barHeight, 6); ctx.fill();
    ctx.fillStyle = "#172026"; ctx.textAlign = "center";
    ctx.fillText(activeChart === "cv" ? `${value}` : compactYen(value), x + barWidth / 2, y - 8);
    ctx.fillStyle = "#65717a"; ctx.fillText(item.name, x + barWidth / 2, height - 16);
  });
  ctx.textAlign = "left";
}
function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + width, y, x + width, y + height, r); ctx.arcTo(x + width, y + height, x, y + height, r); ctx.arcTo(x, y + height, x, y, r); ctx.arcTo(x, y, x + width, y, r); ctx.closePath();
}
function compactYen(value) {
  if (value >= 1000000) return `¥${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `¥${Math.round(value / 1000)}K`;
  return yen.format(value);
}

els.clientSelect.addEventListener("change", (event) => { activeClient = event.target.value; render(); });
els.periodSelect.addEventListener("change", (event) => {
  const labels = { month: "2026年5月 月次", lastMonth: "2026年4月 月次", quarter: "2026年4月-6月 四半期" };
  state[activeClient].period = labels[event.target.value]; render();
});
document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => { document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active")); button.classList.add("active"); activeChart = button.dataset.chart; drawChart(state[activeClient]); });
});
els.editor.addEventListener("input", (event) => {
  const input = event.target;
  if (!input.matches("input")) return;
  const row = input.closest(".editor-row");
  const index = Number(row.dataset.index);
  const key = input.dataset.key;
  state[activeClient].channels[index][key] = Number(input.value.replace(/[^\d]/g, "") || 0);
  render(false);
});
els.saveButton.addEventListener("click", () => { persist(); els.saveButton.textContent = "保存済み"; setTimeout(() => { els.saveButton.textContent = "保存"; }, 1200); });
els.resetButton.addEventListener("click", () => { localStorage.removeItem("clinic-growth-os"); state = structuredClone(seedData); render(); });
els.importButton.addEventListener("click", () => { els.importModal.hidden = false; });
els.reportButton.addEventListener("click", () => { window.print(); });
els.closeImport.addEventListener("click", () => { els.importModal.hidden = true; });
els.cancelImport.addEventListener("click", () => { els.importModal.hidden = true; });
els.importModal.addEventListener("click", (event) => { if (event.target === els.importModal) els.importModal.hidden = true; });
els.runImport.addEventListener("click", () => {
  const rows = parseCsvRows(els.csvInput.value);
  if (!rows.length) { showToast("CSVを確認してください"); return; }
  state[activeClient].channels = rows; persist(); render(); els.importModal.hidden = true; showToast("CSVを取り込みました");
});
els.demoLogin.addEventListener("click", () => openApp("dashboard"));
els.previewLogin.addEventListener("click", () => openApp("dashboard"));
els.panelLogin.addEventListener("click", () => openApp("dashboard"));
els.addLeadButton.addEventListener("click", () => { els.leadModal.hidden = false; });
els.closeLead.addEventListener("click", () => { els.leadModal.hidden = true; });
els.cancelLead.addEventListener("click", () => { els.leadModal.hidden = true; });
els.leadModal.addEventListener("click", (event) => { if (event.target === els.leadModal) els.leadModal.hidden = true; });
els.createLead.addEventListener("click", () => {
  appMeta.leads.unshift({ id: `lead-${Date.now()}`, name: els.leadNameInput.value || "新規リード様", stage: "問い合わせ", source: els.leadSourceInput.value || "Web", value: Number(els.leadValueInput.value.replace(/[^\d]/g, "") || 0) });
  renderPipeline(); els.leadModal.hidden = true; showToast("リードを追加しました");
});
els.adsBoard.addEventListener("click", (event) => {
  const card = event.target.closest(".task-card"); if (!card) return;
  const task = appMeta.adsTasks.find((item) => item.id === card.dataset.taskId); if (!task) return;
  task.done = !task.done; task.status = task.done ? "完了" : "改善"; renderAdsBoard(state[activeClient]); showToast(task.done ? "タスクを完了しました" : "タスクを戻しました");
});
els.pipeline.addEventListener("click", (event) => {
  const card = event.target.closest(".lead-card"); if (!card) return;
  const lead = appMeta.leads.find((item) => item.id === card.dataset.leadId); if (!lead) return;
  lead.stage = nextStage(lead.stage); renderPipeline(); showToast(`${lead.name}を${lead.stage}へ進めました`);
});
els.saveSettingsButton.addEventListener("click", () => {
  document.querySelectorAll(".brand strong").forEach((brand) => { brand.textContent = els.serviceNameInput.value || "Clinic Growth"; });
  document.documentElement.style.setProperty("--green", els.brandColorInput.value || "#2f8f72");
  showToast(`${els.agencyNameInput.value || "Agency"} の設定を反映しました`);
});
document.querySelectorAll(".nav-item").forEach((button) => { button.addEventListener("click", () => setView(button.dataset.view)); });
window.addEventListener("resize", () => drawChart(state[activeClient]));

render();
setView(activeView);
