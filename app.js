const state = {
  role: "admin",
  authenticated: false,
  user: null,
  section: "schedule",
  view: "day",
  selectedDate: getTodayIsoDate(),
  branchId: "branch-podil",
  branches: [
    { id: "branch-podil", name: "Поділ", city: "Київ", address: "вул. Нижній Вал, 17", phone: "+38 044 555 01 01", hoursStart: "09:00", hoursEnd: "19:00", status: "open", closedAt: "", isClosed: false },
    { id: "branch-pechersk", name: "Печерськ", city: "Київ", address: "вул. Басейна, 4", phone: "+38 044 555 01 02", hoursStart: "09:00", hoursEnd: "20:00", status: "open", closedAt: "", isClosed: false }
  ],
  filterMaster: "all",
  filterRoom: "all",
  unavailableSlots: [
    { id: "unavailable-001", date: "2026-09-04", master: "Ірина Мельник", start: "12:00", end: "12:30", reason: "Перерва", createdBy: "admin" }
  ],
  bookings: [
    {
      id: "visit-001",
      date: "2026-09-04",
      clientId: "client-001",
      client: "Марина Соколова",
      phone: "+38 067 420 18 64",
      service: "Glow Reset",
      kind: "complex",
      start: "09:30",
      end: "11:30",
      price: 6800,
      status: "confirmed",
      stages: [
        { name: "Лімфодренаж", start: "09:30", end: "10:15", master: "Анна Левченко", room: "Каб. 1", equipment: "Pressotherapy P-02" },
        { name: "LED-відновлення", start: "10:20", end: "11:30", master: "Ірина Мельник", room: "Каб. 3", equipment: "LED-маска Luma" }
      ]
    },
    {
      id: "visit-002",
      date: "2026-09-04",
      clientId: "client-002",
      client: "Софія Кравець",
      phone: "+38 050 718 40 29",
      service: "Архітектура брів",
      kind: "single",
      start: "11:00",
      end: "12:00",
      price: 1200,
      status: "booked",
      stages: [{ name: "Архітектура брів", start: "11:00", end: "12:00", master: "Дар'я Пархоменко", room: "Каб. 2", equipment: "Brow station" }]
    },
    {
      id: "visit-003",
      date: "2026-09-04",
      clientId: "client-003",
      client: "Олександра Поліщук",
      phone: "+38 063 290 51 11",
      service: "Кератиновий догляд",
      kind: "single",
      start: "13:00",
      end: "14:30",
      price: 2400,
      status: "confirmed",
      stages: [{ name: "Кератиновий догляд", start: "13:00", end: "14:30", master: "Ірина Мельник", room: "Каб. 3", equipment: "Luma Pro" }]
    },
    {
      id: "visit-004",
      date: "2026-09-04",
      clientId: "client-004",
      client: "Олена Романенко",
      phone: "+38 093 151 03 27",
      service: "Манікюр + догляд",
      kind: "single",
      start: "15:30",
      end: "17:00",
      price: 1900,
      status: "confirmed",
      stages: [{ name: "Манікюр + догляд", start: "15:30", end: "17:00", master: "Дар'я Пархоменко", room: "Каб. 2", equipment: "Nail desk 02" }]
    },
    {
      id: "visit-005",
      date: "2026-09-04",
      clientId: "client-005",
      client: "Марія Бондар",
      phone: "+38 097 806 42 91",
      service: "Консультація щодо шкіри",
      kind: "single",
      start: "18:00",
      end: "18:45",
      price: 850,
      status: "booked",
      stages: [{ name: "Консультація щодо шкіри", start: "18:00", end: "18:45", master: "Анна Левченко", room: "Каб. 1", equipment: "SkinScope" }]
    }
  ],
  clients: [
    { id: "client-001", name: "Марина Соколова", phone: "+38 067 420 18 64", initials: "МС", visits: 8, total: 41200, note: "Чутлива шкіра. Надає перевагу ранковим візитам.", masterNames: ["Анна Левченко", "Ірина Мельник"] },
    { id: "client-002", name: "Софія Кравець", phone: "+38 050 718 40 29", initials: "СК", visits: 3, total: 6400, note: "", masterNames: ["Дар'я Пархоменко"] },
    { id: "client-003", name: "Олександра Поліщук", phone: "+38 063 290 51 11", initials: "ОП", visits: 5, total: 15900, note: "", masterNames: ["Ірина Мельник"] },
    { id: "client-004", name: "Олена Романенко", phone: "+38 093 151 03 27", initials: "ОР", visits: 12, total: 28600, note: "", masterNames: ["Дар'я Пархоменко"] },
    { id: "client-005", name: "Марія Бондар", phone: "+38 097 806 42 91", initials: "МБ", visits: 2, total: 1700, note: "Новий клієнт", masterNames: ["Анна Левченко"] }
  ],
  procedures: [
    { id: "glow", name: "Glow Reset", category: "Апаратна косметологія", duration: "2 год 00 хв", price: 6800, stages: 2, relation: "2 майстри · 2 кабінети", resourcePlan: [{ name: "Лімфодренаж", duration: 45, master: "Анна Левченко", room: "Каб. 1", equipment: "Pressotherapy P-02", gapAfter: 5 }, { name: "LED-відновлення", duration: 70, master: "Ірина Мельник", room: "Каб. 3", equipment: "LED-маска Luma" }] },
    { id: "brows", name: "Архітектура брів", category: "Естетична косметологія", duration: "1 год 00 хв", price: 1200, stages: 1, relation: "1 майстер · 1 кабінет", resourcePlan: [{ name: "Архітектура брів", duration: 60, master: "Дар'я Пархоменко", room: "Каб. 2", equipment: "Brow station" }] },
    { id: "keratin", name: "Кератиновий догляд", category: "Доглядові процедури", duration: "1 год 30 хв", price: 2400, stages: 1, relation: "1 майстер · 1 кабінет", resourcePlan: [{ name: "Кератиновий догляд", duration: 90, master: "Ірина Мельник", room: "Каб. 3", equipment: "Luma Pro" }] },
    { id: "nails", name: "Манікюр + догляд", category: "Доглядові процедури", duration: "1 год 30 хв", price: 1900, stages: 1, relation: "1 майстер · 1 кабінет", resourcePlan: [{ name: "Манікюр + догляд", duration: 90, master: "Дар'я Пархоменко", room: "Каб. 2", equipment: "Nail desk 02" }] }
  ],
  rooms: [
    { name: "Каб. 1", type: "Апаратна косметологія", status: "Вільний", detail: "Pressotherapy P-02 · SkinScope" },
    { name: "Каб. 2", type: "Естетика й нігті", status: "Вільний", detail: "Brow station · Nail desk 02" },
    { name: "Каб. 3", type: "LED і догляд", status: "До 10:20", detail: "LED-маска Luma · Luma Pro" },
    { name: "VIP-кімната", type: "Комплексні сеанси", status: "Вільний", detail: "Масажна кушетка · тиха зона" }
  ],
  equipment: [
    { name: "Pressotherapy P-02", type: "Пресотерапія", room: "Каб. 1", status: "Готове" },
    { name: "LED-маска Luma", type: "LED-терапія", room: "Каб. 3", status: "Готове" },
    { name: "Brow station", type: "Брови", room: "Каб. 2", status: "Готове" },
    { name: "SkinScope", type: "Діагностика", room: "Каб. 1", status: "Готове" }
  ],
  masters: [
    { name: "Анна Левченко", role: "Косметологиня", initials: "АЛ", color: "peach", schedule: "09:00–18:00", focus: "Апаратна косметологія", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=82" },
    { name: "Ірина Мельник", role: "Косметологиня-естетистка", initials: "ІМ", color: "lilac", schedule: "10:00–19:00", focus: "LED і доглядові процедури", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&h=160&q=82" },
    { name: "Дар'я Пархоменко", role: "Естетистка", initials: "ДП", color: "sage", schedule: "09:00–17:00", focus: "Брови й нігті", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=82" }
  ]
};

// The standalone demo has no API response to scope directory data by branch,
// so mark its seed resources explicitly. The backend returns the same field.
["masters", "rooms", "equipment", "procedures"].forEach((key) => {
  state[key] = state[key].map((item) => ({ branchId: "branch-podil", ...item }));
});
state.bookings = state.bookings.map((item) => ({ branchId: "branch-podil", ...item }));
state.unavailableSlots = state.unavailableSlots.map((item) => ({ branchId: "branch-podil", ...item }));

const salonHours = { start: "09:00", end: "19:00" };
const scheduleHourHeight = 72;
function getCurrentMasterName() {
  return state.user?.masterName || (state.role === "master" ? state.user?.name : "Ірина Мельник");
}
const API_BASE = "/api";
let apiReady = false;
let apiAvailable = false;
let authRoleDraft = "admin";
let timelineDrag = null;
let bookingDraftProcedures = [];
let bookingDraftOffsets = {};

const demoUsers = {
  admin: [{ id: "admin-001", name: "Ольга Чернова", role: "admin", initials: "ОЧ", email: "olga@krasunya.local" }],
  master: [{ id: "master-001", name: "Ірина Мельник", role: "master", initials: "ІМ", email: "iryna@krasunya.local", masterName: "Ірина Мельник", branchId: "branch-podil" }],
  client: [{ id: "client-001-user", name: "Марина Соколова", role: "client", initials: "МС", email: "marina@krasunya.local" }]
};
const demoPasswords = { "admin-001": "demo123", "master-001": "demo123", "client-001-user": "demo123" };
const BRANCHES_STORAGE_KEY = "krasunya-branches-cache";
const AUTH_STORAGE_KEY = "krasunya-auth-session";

function readCachedBranches() {
  try {
    const cached = JSON.parse(localStorage.getItem(BRANCHES_STORAGE_KEY) || "[]");
    return Array.isArray(cached) ? cached : [];
  } catch {
    return [];
  }
}

function cacheBranches(branches) {
  try {
    localStorage.setItem(BRANCHES_STORAGE_KEY, JSON.stringify(branches));
  } catch {
    // Storage may be unavailable in private browsing or embedded previews.
  }
}

function readCachedSession() {
  try {
    const cached = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
    return cached?.user ? cached : null;
  } catch {
    return null;
  }
}

function cacheSession(user) {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Storage may be unavailable in private browsing or embedded previews.
  }
}

function apiErrorMessage(error) {
  if (error?.details?.length) return error.details[0];
  return error?.error || error?.message || "Невідома помилка сервера.";
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw payload;
  return payload;
}

async function loadPersistentState() {
  try {
    const session = await apiRequest("/auth/session");
    apiAvailable = true;
    if (Array.isArray(session.branches)) {
      state.branches = session.branches;
      cacheBranches(state.branches);
    }
    if (session.users) Object.assign(demoUsers, session.users);
    if (!session.authenticated) {
      state.authenticated = false;
      state.user = null;
      cacheSession(null);
      render();
      return;
    }
    applySessionUser(session.user);
    const payload = await apiRequest("/bootstrap");
    ["clients", "masters", "rooms", "equipment", "procedures", "bookings", "unavailableSlots", "branches"].forEach((key) => {
      if (Array.isArray(payload[key])) state[key] = payload[key];
    });
    cacheBranches(state.branches);
    apiReady = true;
    if (payload.session) applySessionUser(payload.session);
    render();
  } catch (error) {
    apiAvailable = false;
    apiReady = false;
    if (!state.user) state.authenticated = false;
    render();
    console.warn("Backend недоступний, вхід працює в локальному демо-режимі.", error);
  }
}

async function refreshLoginUsers() {
  if (!apiAvailable) return;
  const session = await apiRequest("/auth/session");
  if (session.users) Object.assign(demoUsers, session.users);
  if (Array.isArray(session.branches)) {
    state.branches = session.branches;
    cacheBranches(state.branches);
  }
}

async function reloadBootstrap() {
  if (!apiReady) return;
  const payload = await apiRequest("/bootstrap");
  ["clients", "masters", "rooms", "equipment", "procedures", "bookings", "unavailableSlots", "branches"].forEach((key) => {
    if (Array.isArray(payload[key])) state[key] = payload[key];
  });
  cacheBranches(state.branches);
  if (payload.session && state.user) {
    state.user = { ...state.user, ...payload.session };
    state.role = state.user.role;
    state.branchId = state.user.branchId || state.branchId;
    cacheSession(state.user);
  }
}

function applySessionUser(user) {
  state.user = user;
  state.authenticated = Boolean(user);
  cacheSession(user);
  if (!user) return;
  state.role = user.role;
  state.branchId = user.branchId || state.branchId;
  state.section = user.role === "client" ? "client" : "schedule";
  state.filterMaster = "all";
  state.filterRoom = "all";
}

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function dateObject(isoDate) {
  return new Date(`${isoDate}T12:00:00`);
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayIsoDate() {
  return toIsoDate(new Date());
}

function addDays(isoDate, amount) {
  const date = dateObject(isoDate);
  date.setDate(date.getDate() + amount);
  return toIsoDate(date);
}

function addMonths(isoDate, amount) {
  const source = dateObject(isoDate);
  const target = new Date(source.getFullYear(), source.getMonth() + amount, 1, 12);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0, 12).getDate();
  target.setDate(Math.min(source.getDate(), lastDay));
  return toIsoDate(target);
}

function shiftScheduleDate(isoDate, amount) {
  if (state.view === "week") return addDays(isoDate, amount * 7);
  if (state.view === "month") return addMonths(isoDate, amount);
  if (state.view === "year") {
    const date = dateObject(isoDate);
    date.setFullYear(date.getFullYear() + amount);
    return toIsoDate(date);
  }
  return addDays(isoDate, amount);
}

function startOfWeek(isoDate) {
  const date = dateObject(isoDate);
  const weekday = date.getDay() || 7;
  date.setDate(date.getDate() - weekday + 1);
  return toIsoDate(date);
}

function bookingsInDateRange(bookings, fromIso, toIso) {
  return bookings.filter((booking) => booking.date >= fromIso && booking.date <= toIso);
}

function bookingWorkMinutes(booking) {
  const stages = Array.isArray(booking.stages) ? booking.stages : [];
  if (stages.length) {
    return stages.reduce((total, stage) => total + Math.max(0, parseMinutes(stage.end) - parseMinutes(stage.start)), 0);
  }
  return Math.max(0, parseMinutes(booking.end) - parseMinutes(booking.start));
}

function branchCapacityMinutes(dayCount) {
  const minutesPerDay = getBranchItems("masters").reduce((total, master) => {
    const [start, end] = String(master.schedule || "").split("–");
    if (!start || !end) return total;
    return total + Math.max(0, parseMinutes(end) - parseMinutes(start));
  }, 0);
  return minutesPerDay * dayCount;
}

function utilizationPercent(bookings, dayCount) {
  const capacity = branchCapacityMinutes(dayCount);
  if (!capacity) return 0;
  const busyMinutes = bookings.reduce((total, booking) => total + bookingWorkMinutes(booking), 0);
  return Math.min(100, Math.round((busyMinutes / capacity) * 100));
}

function adminUtilization(activeBookings) {
  const currentWeekStart = startOfWeek(state.selectedDate);
  const previousWeekStart = addDays(currentWeekStart, -7);
  const currentWeekBookings = bookingsInDateRange(activeBookings, currentWeekStart, addDays(currentWeekStart, 6));
  const previousWeekBookings = bookingsInDateRange(activeBookings, previousWeekStart, addDays(previousWeekStart, 6));
  const current = utilizationPercent(currentWeekBookings, 7);

  if (!previousWeekBookings.length) {
    return { value: `${current}%`, note: "немає записів за минулий тиждень" };
  }

  const previous = utilizationPercent(previousWeekBookings, 7);
  const delta = current - previous;
  return {
    value: `${current}%`,
    note: delta === 0 ? "без змін до минулого тижня" : `${delta > 0 ? "↑" : "↓"} ${Math.abs(delta)}% до минулого тижня`,
    trend: delta > 0,
    trendDown: delta < 0,
  };
}

function newClientsInRange(activeBookings, fromIso, toIso) {
  const firstBookingByClient = new Map();
  activeBookings.forEach((booking) => {
    const clientId = booking.clientId || booking.client;
    const firstBooking = firstBookingByClient.get(clientId);
    if (!firstBooking || booking.date < firstBooking) firstBookingByClient.set(clientId, booking.date);
  });
  return [...firstBookingByClient.values()].filter((date) => date >= fromIso && date <= toIso).length;
}

function getBranchItems(key) {
  return (state[key] || []).filter((item) => isInCurrentBranch(item) && !item.archived);
}

function isCalendarBookingVisible(booking) {
  return !booking.archived && isActiveBooking(booking) && (state.role !== "master" || bookingBelongsToCurrentMaster(booking));
}

function calendarBookingsForDate(isoDate) {
  return state.bookings.filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && booking.date === isoDate && isCalendarBookingVisible(booking));
}

function calendarUnavailableForDate(isoDate) {
  return state.unavailableSlots.filter((slot) => !slot.archived && (!slot.branchId || slot.branchId === state.branchId) && slot.date === isoDate && (state.role !== "master" || slot.master === getCurrentMasterName()));
}

function formatMonthTitle(isoDate) {
  return new Intl.DateTimeFormat("uk-UA", { month: "long", year: "numeric" }).format(dateObject(isoDate));
}

function formatYearTitle(isoDate) {
  return new Intl.DateTimeFormat("uk-UA", { year: "numeric" }).format(dateObject(isoDate));
}

function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split("-");
  return `${day}.${month}`;
}

function formatLongDate(isoDate) {
  return new Intl.DateTimeFormat("uk-UA", { day: "2-digit", month: "long" }).format(dateObject(isoDate));
}

function formatWeekday(isoDate) {
  return new Intl.DateTimeFormat("uk-UA", { weekday: "long" }).format(dateObject(isoDate));
}

function formatScheduleDate(isoDate) {
  const date = dateObject(isoDate);
  const day = new Intl.DateTimeFormat("uk-UA", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("uk-UA", { month: "short" }).format(date).replaceAll(".", "");
  const weekday = new Intl.DateTimeFormat("uk-UA", { weekday: "short" }).format(date).replaceAll(".", "");
  return `${day} ${month} · ${weekday}`;
}

function formatDateEyebrow(isoDate) {
  return new Intl.DateTimeFormat("uk-UA", { weekday: "short", day: "2-digit", month: "long", year: "numeric" }).format(dateObject(isoDate)).replaceAll(".", "").toUpperCase();
}

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU").format(value).replaceAll(" ", " ") + " ₴";
}

function roleLabel(role) {
  return { admin: "Адміністратор", master: "Майстер", client: "Клієнт" }[role] || "Користувач";
}

function getCurrentBranch() {
  return state.branches.find((branch) => branch.id === state.branchId) || state.branches[0] || { id: "", name: "Філія", city: "" };
}

function isBranchClosed(branch = getCurrentBranch()) {
  return branch?.status === "closed" || branch?.isClosed === true;
}

function isInCurrentBranch(item) {
  return !item.branchId || item.branchId === state.branchId;
}

function getArchivedBranchItems(key) {
  return (state[key] || []).filter((item) => isInCurrentBranch(item) && item.archived);
}

function renderLoginScreen(errorMessage = "") {
  const users = demoUsers[authRoleDraft] || demoUsers.admin;
  const selectedUser = users[0];
  const loginBranches = state.branches.filter((branch) => !isBranchClosed(branch));
  const userOptions = users.map((user) => `<option value="${escapeHtml(user.id)}" data-branch-id="${escapeHtml(user.branchId || "branch-podil")}" ${user.id === selectedUser?.id ? "selected" : ""}>${escapeHtml(user.name)}</option>`).join("");
  const branchField = authRoleDraft === "master"
    ? `<div class="auth-field"><label>Філія майстра</label><div class="settings-detail" style="margin-top:0;padding:11px 12px;background:var(--cream);border-radius:10px;border:0"><span>Основна локація</span><strong id="login-master-branch">${escapeHtml(state.branches.find((branch) => branch.id === (selectedUser?.branchId || "branch-podil"))?.name || "Поділ")}</strong></div><input id="login-master-branch-id" type="hidden" name="branchId" value="${escapeHtml(selectedUser?.branchId || "branch-podil")}" /></div>`
    : `<div class="auth-field"><label for="login-branch">Філія для роботи</label><select id="login-branch" name="branchId" required>${loginBranches.map((branch) => `<option value="${escapeHtml(branch.id)}" ${branch.id === state.branchId ? "selected" : ""}>${escapeHtml(branch.name)} · ${escapeHtml(branch.city)}</option>`).join("")}</select></div>`;
  const roles = ["admin", "master", "client"];
  $("#auth-modal").innerHTML = `
    <div class="auth-brand"><img class="auth-brand-logo" src="assets/krasunya-logo-cropped.png" alt="Красуня" /></div>
    <h1 id="auth-title">Вхід у систему</h1>
    <p>Оберіть свою роль, щоб відкрити персональний робочий простір.</p>
    <div class="auth-role-tabs" role="tablist" aria-label="Тип користувача">
      ${roles.map((role) => `<button class="auth-role-tab ${authRoleDraft === role ? "active" : ""}" data-auth-role="${role}" type="button" role="tab" aria-selected="${authRoleDraft === role}">${roleLabel(role)}</button>`).join("")}
    </div>
    <form class="auth-form" id="login-form">
      <div class="auth-field"><label for="login-user">Користувач</label><select id="login-user" name="userId" required>${userOptions}</select></div>
      ${branchField}
      <div class="auth-field"><label for="login-password">Пароль</label><input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Введіть пароль" required /></div>
      ${errorMessage ? `<div class="auth-error" role="alert">${escapeHtml(errorMessage)}</div>` : ""}
      <button class="primary-button auth-submit" type="submit">Увійти в Красуня <span>→</span></button>
    </form>
    <p class="auth-footer">Доступ до розкладу, клієнтів і ресурсів залежить від вашої ролі.</p>
  `;
  $("#auth-backdrop").hidden = false;
  setTimeout(() => $("#login-user")?.focus(), 0);
}

function closeAuthScreen() {
  $("#auth-backdrop").hidden = true;
}

async function loginFromForm(form) {
  const data = new FormData(form);
  const payload = { role: authRoleDraft, userId: data.get("userId"), password: data.get("password"), branchId: data.get("branchId") || "branch-podil" };
  try {
    if (apiAvailable) {
      const response = await apiRequest("/auth/login", { method: "POST", body: JSON.stringify(payload) });
      if (Array.isArray(response.branches)) {
        state.branches = response.branches;
        cacheBranches(state.branches);
      }
      applySessionUser(response.user);
      const bootstrap = await apiRequest("/bootstrap");
      ["clients", "masters", "rooms", "equipment", "procedures", "bookings", "unavailableSlots", "branches"].forEach((key) => {
        if (Array.isArray(bootstrap[key])) state[key] = bootstrap[key];
      });
      cacheBranches(state.branches);
      if (bootstrap.session) applySessionUser(bootstrap.session);
      apiReady = true;
    } else {
      const user = (demoUsers[authRoleDraft] || []).find((item) => item.id === payload.userId);
      if (!user || payload.password !== demoPasswords[user.id]) throw { error: "Невірний користувач або пароль." };
      applySessionUser({ ...user, branchId: authRoleDraft === "master" ? (user.branchId || "branch-podil") : payload.branchId, masterName: authRoleDraft === "master" ? (user.masterName || user.name) : "", clientId: authRoleDraft === "client" ? "client-001" : "" });
    }
    closeAuthScreen();
    render();
    showToast(`Вітаємо, ${state.user.name.split(" ")[0]}!`);
  } catch (error) {
    renderLoginScreen(apiErrorMessage(error));
  }
}

function openBranchSwitcher() {
  if (!state.authenticated || !["admin", "client"].includes(state.role)) return;
  const currentBranch = getCurrentBranch();
  const branchRows = state.branches.map((branch, index) => `
    <div class="branch-option-row">
      <button class="branch-option ${branch.id === currentBranch.id ? "active" : ""}" data-branch-select="${escapeHtml(branch.id)}" type="button">
        <span class="branch-option-mark">${String(index + 1).padStart(2, "0")}</span>
        <span class="branch-option-copy"><strong>${escapeHtml(branch.name)} · ${escapeHtml(branch.city)}</strong><span>${escapeHtml(branch.address)} · ${escapeHtml(branch.phone || "Контакти не вказані")}</span></span>
        ${branch.id === currentBranch.id ? `<span class="branch-current">Обрано</span>` : ""}
        ${isBranchClosed(branch) ? `<span class="branch-closed-label">Закрито</span>` : ""}
      </button>
        ${state.role === "admin" && !isBranchClosed(branch) ? `<button class="branch-close-button" data-branch-close="${escapeHtml(branch.id)}" type="button">Закрити</button><button class="icon-button branch-delete" data-branch-delete="${escapeHtml(branch.id)}" type="button" aria-label="Видалити філію">×</button>` : ""}
    </div>`).join("");
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Локація роботи</div><h2 id="modal-title">Оберіть філію</h2><p>${state.role === "admin" ? "Адміністратор може перемикати робочі локації, додавати й видаляти філії." : "Оберіть салон, до якого хочете записатися."}</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><div class="modal-form"><div class="branch-list">${branchRows || `<div class="empty-directory">Поки немає філій.</div>`}</div>${state.role === "admin" ? `<div class="branch-create"><div class="branch-create-head"><strong>Додати нову філію</strong><span class="tag">для адміністратора</span></div><form id="branch-create-form" class="form-grid"><div class="form-field"><label for="branch-create-name">Назва</label><input id="branch-create-name" name="name" placeholder="Наприклад, Центр" required /></div><div class="form-field"><label for="branch-create-city">Місто</label><input id="branch-create-city" name="city" placeholder="Київ" required /></div><div class="form-field full"><label for="branch-create-address">Адреса</label><input id="branch-create-address" name="address" placeholder="вул. ..." required /></div><div class="form-field"><label for="branch-create-phone">Телефон</label><input id="branch-create-phone" name="phone" placeholder="+38 ..." /></div><div class="form-field"><label for="branch-create-hours">Години</label><input id="branch-create-hours" name="hours" value="09:00–19:00" placeholder="09:00–19:00" /></div><div class="modal-actions full"><button class="primary-button" type="submit"><span>＋</span> Створити філію</button></div></form></div>` : ""}</div>`;
  showModal();
}

async function closeBranch(branchId) {
  if (state.role !== "admin") return;
  const branch = state.branches.find((item) => item.id === branchId);
  if (!branch || isBranchClosed(branch)) return;
  if (!window.confirm(`Закрити філію «${branch.name}»? Усі її записи, кабінети, обладнання та неробочий час будуть перенесені в архів.`)) return;
  try {
    if (apiReady) {
      const response = await apiRequest(`/branches/${encodeURIComponent(branchId)}/close`, { method: "POST" });
      if (response.branch) {
        state.branches = state.branches.map((item) => item.id === branchId ? response.branch : item);
        cacheBranches(state.branches);
      }
      await reloadBootstrap();
      await refreshLoginUsers();
    } else {
      const closedAt = new Date().toISOString();
      state.branches = state.branches.map((item) => item.id === branchId ? { ...item, status: "closed", closedAt, isClosed: true } : item);
      cacheBranches(state.branches);
      for (const key of ["bookings", "rooms", "equipment", "unavailableSlots"]) {
        state[key] = state[key].map((item) => item.branchId === branchId ? { ...item, archived: true } : item);
      }
    }
    closeModal();
    render();
    openBranchSwitcher();
    showToast(`Філію «${branch.name}» закрито й перенесено в архів.`);
  } catch (error) {
    showToast(`Не вдалося закрити філію: ${apiErrorMessage(error)}`);
  }
}

async function deleteBranch(branchId) {
  if (state.role !== "admin") return;
  const branch = state.branches.find((item) => item.id === branchId);
  if (!branch) return;
  const fallbackBranch = state.branches.find((item) => item.id !== branchId);
  if (!fallbackBranch) {
    showToast("У системі має залишитися щонайменше одна філія.");
    return;
  }
  if (!window.confirm(`Видалити філію «${branch.name}»? Дію не можна скасувати.`)) return;
  try {
    if (apiReady) await apiRequest(`/branches/${encodeURIComponent(branchId)}`, { method: "DELETE" });
    state.branches = state.branches.filter((item) => item.id !== branchId);
    cacheBranches(state.branches);
    if (branch.id === state.branchId) {
      state.branchId = fallbackBranch.id;
      if (state.user) state.user.branchId = fallbackBranch.id;
    }
    await refreshLoginUsers().catch(() => {});
    await reloadBootstrap().catch(() => {});
    closeModal();
    render();
    openBranchSwitcher();
    showToast(`Філію «${branch.name}» видалено.`);
  } catch (error) {
    showToast(`Не вдалося видалити філію: ${apiErrorMessage(error)}`);
  }
}

async function switchBranch(branchId) {
  const branch = state.branches.find((item) => item.id === branchId);
  if (!branch) return;
  if (isBranchClosed(branch) && state.role !== "admin") {
    showToast("Ця філія закрита й недоступна для вибору.");
    return;
  }
  try {
    if (apiReady) {
      const response = await apiRequest("/auth/branch", { method: "POST", body: JSON.stringify({ branchId }) });
      applySessionUser({ ...state.user, ...response.user });
      const bootstrap = await apiRequest("/bootstrap");
      ["clients", "masters", "rooms", "equipment", "procedures", "bookings", "unavailableSlots", "branches"].forEach((key) => {
        if (Array.isArray(bootstrap[key])) state[key] = bootstrap[key];
      });
      cacheBranches(state.branches);
      if (bootstrap.session) applySessionUser(bootstrap.session);
    } else {
      state.branchId = branchId;
      if (state.user) state.user.branchId = branchId;
      cacheSession(state.user);
    }
    closeModal();
    render();
    showToast(`Філію змінено: ${branch.name}, ${branch.city}.`);
  } catch (error) {
    showToast(`Не вдалося змінити філію: ${apiErrorMessage(error)}`);
  }
}

async function logoutFromSystem() {
  try {
    if (apiReady) await apiRequest("/auth/logout", { method: "POST" });
  } catch (error) {
    console.warn("Не вдалося завершити серверний сеанс.", error);
  }
  apiReady = false;
  state.authenticated = false;
  state.user = null;
  cacheSession(null);
  state.role = "admin";
  state.section = "schedule";
  closeModal();
  render();
}

function renderUserSettings() {
  const user = state.user || { name: "Користувач", email: "", phone: "", role: state.role, initials: "К" };
  const branch = getCurrentBranch();
  return `<section class="settings-view"><section class="settings-card"><div class="panel-kicker">Особистий профіль</div><h2>Налаштування користувача</h2><p>Оновіть контактні дані та перевірте поточний доступ до системи.</p><form class="settings-form" id="profile-form"><div class="form-grid"><div class="form-field"><label for="profile-name">Ім'я та прізвище</label><input id="profile-name" name="name" value="${escapeHtml(user.name)}" required /></div><div class="form-field"><label for="profile-phone">Телефон</label><input id="profile-phone" name="phone" value="${escapeHtml(user.phone || "")}" /></div><div class="form-field"><label for="profile-email">Email</label><input id="profile-email" value="${escapeHtml(user.email || "")}" readonly /></div><div class="form-field"><label for="profile-role">Роль у системі</label><input id="profile-role" value="${roleLabel(user.role)}" readonly /></div></div><div class="modal-actions"><button class="primary-button" type="submit">Зберегти зміни</button></div></form><div class="settings-divider"></div><div class="panel-kicker">Безпека</div><h3 class="settings-section-title">Змінити пароль</h3><p>Новий пароль буде потрібен під час наступного входу.</p><form class="settings-form" id="password-form"><div class="form-grid"><div class="form-field full"><label for="current-password">Поточний пароль</label><input id="current-password" name="currentPassword" type="password" autocomplete="current-password" required /></div><div class="form-field"><label for="new-password">Новий пароль</label><input id="new-password" name="newPassword" type="password" minlength="6" autocomplete="new-password" required /></div><div class="form-field"><label for="confirm-password">Підтвердження</label><input id="confirm-password" name="confirmPassword" type="password" minlength="6" autocomplete="new-password" required /></div></div><div class="modal-actions"><button class="primary-button" type="submit"><span>✓</span> Оновити пароль</button></div></form></section><aside class="settings-card"><div class="settings-summary"><div class="avatar avatar-${user.role === "master" ? "lilac" : user.role === "client" ? "sage" : "peach"}">${escapeHtml(user.initials || user.name.split(" ").map((part) => part[0]).join("").slice(0, 2))}</div><div class="settings-summary-copy"><strong>${escapeHtml(user.name)}</strong><span>${escapeHtml(roleLabel(user.role))}</span></div></div><div class="settings-detail-list"><div class="settings-detail"><span>Поточна філія</span><strong>${escapeHtml(branch.name)} · ${escapeHtml(branch.city)}</strong></div><div class="settings-detail"><span>Адреса</span><strong>${escapeHtml(branch.address || "Не вказано")}</strong></div><div class="settings-detail"><span>Статус сеансу</span><strong style="color:var(--sage-deep)">Активний</strong></div></div><button class="ghost-button" data-action="open-branch-switcher" type="button" style="width:100%;justify-content:center;margin-top:20px">Змінити філію</button><div class="settings-danger"><button class="danger-button" data-action="logout" type="button">Вийти з системи</button></div></aside></section>`;
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

function getClient(clientId) {
  return state.clients.find((client) => client.id === clientId) || state.clients[0];
}

function getMaster(masterName) {
  return getBranchItems("masters").find((master) => master.name === masterName);
}

function renderMasterAvatar(masterOrName, sizeClass = "") {
  const master = typeof masterOrName === "string" ? getMaster(masterOrName) : masterOrName;
  if (!master) return "";
  const alt = `Фото майстра ${escapeHtml(master.name)}`;
  return `<span class="master-avatar avatar-${escapeHtml(master.color)} ${sizeClass}" title="${alt}"><img src="${escapeHtml(master.photo)}" alt="${alt}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false" /><span class="master-avatar-fallback" hidden>${escapeHtml(master.initials)}</span></span>`;
}

function bookingBelongsToCurrentMaster(booking) {
  return booking.stages.some((stage) => stage.master === getCurrentMasterName());
}

function isActiveBooking(booking) {
  return booking.status !== "cancelled";
}

function getVisibleClients() {
  if (state.role !== "master") return state.clients;
  const masterClientIds = new Set(
    state.clients
      .filter((client) => client.masterNames?.includes(getCurrentMasterName()))
      .map((client) => client.id)
  );
  state.bookings.filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && !booking.archived && isActiveBooking(booking) && bookingBelongsToCurrentMaster(booking)).forEach((booking) => masterClientIds.add(booking.clientId));
  return state.clients.filter((client) => masterClientIds.has(client.id));
}

function getBookingMasters(booking) {
  return [...new Set(booking.stages.map((stage) => stage.master))]
    .map(getMaster)
    .filter(Boolean);
}

function timeOverlaps(startA, endA, startB, endB) {
  return parseMinutes(startA) < parseMinutes(endB) && parseMinutes(endA) > parseMinutes(startB);
}

function getVisibleUnavailableSlots() {
  return state.unavailableSlots.filter((slot) => {
    if (slot.archived) return false;
    if (slot.branchId && slot.branchId !== state.branchId) return false;
    if (slot.date !== state.selectedDate) return false;
    if (state.role === "master" && slot.master !== getCurrentMasterName()) return false;
    if (state.filterMaster !== "all" && slot.master !== state.filterMaster) return false;
    return true;
  });
}

function getEditableUnavailableSlots() {
  return state.unavailableSlots.filter((slot) => !slot.archived && (!slot.branchId || slot.branchId === state.branchId) && (state.role !== "master" || slot.master === getCurrentMasterName()));
}

function getVisibleBookings() {
  return state.bookings.filter((booking) => {
    if (booking.branchId && booking.branchId !== state.branchId) return false;
    if (booking.archived) return false;
    if (!isActiveBooking(booking)) return false;
    if (booking.date !== state.selectedDate) return false;
    if (state.filterMaster !== "all" && !booking.stages.some((stage) => stage.master === state.filterMaster)) return false;
    if (state.filterRoom !== "all" && !booking.stages.some((stage) => stage.room === state.filterRoom)) return false;
    if (state.role === "master" && !booking.stages.some((stage) => stage.master === getCurrentMasterName())) return false;
    return true;
  });
}

function getProcedure(procedureId) {
  const procedures = getBranchItems("procedures");
  return procedures.find((procedure) => procedure.id === procedureId) || procedures[0];
}

function getProcedureMasters(procedureId) {
  return [...new Set((getProcedure(procedureId)?.resourcePlan || []).flatMap((stage) => {
    const options = Array.isArray(stage.masterOptions) && stage.masterOptions.length ? stage.masterOptions : [stage.master];
    return options.filter(Boolean);
  }))];
}

function getClientProcedureMasters(clientId, procedureId) {
  const client = getClient(clientId);
  const procedureMasters = new Set(getProcedureMasters(procedureId));
  const historyMasters = new Set([
    ...(client?.masterNames || []),
    ...state.bookings
      .filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && isActiveBooking(booking) && booking.clientId === clientId)
      .flatMap((booking) => booking.stages.map((stage) => stage.master))
  ]);
  return [...historyMasters].filter((masterName) => procedureMasters.has(masterName));
}

function getNewProcedureMasters(clientId, procedureId) {
  const familiarMasters = getClientProcedureMasters(clientId, procedureId);
  return getProcedureMasters(procedureId).filter((masterName) => !familiarMasters.includes(masterName));
}

function getDraftNewProcedureMasters(clientId, procedureIds = bookingDraftProcedures) {
  return [...new Set(procedureIds.flatMap((procedureId) => getNewProcedureMasters(clientId, procedureId)))];
}

function getProcedureResourceUsage(date, resourceStage) {
  const bookings = state.bookings
    .filter((booking) => isActiveBooking(booking) && !booking.archived && booking.date === date && (!booking.branchId || booking.branchId === state.branchId))
    .flatMap((booking) => booking.stages
      .filter((stage) => ["master", "room", "equipment"].some((key) => stage[key] === resourceStage[key]))
      .map((stage) => ({
        ...stage,
        bookingId: booking.id,
        client: booking.client,
        service: booking.service
      })));
  const unavailable = state.unavailableSlots
    .filter((slot) => !slot.archived && slot.date === date && (!slot.branchId || slot.branchId === state.branchId) && slot.master === resourceStage.master)
    .map((slot) => ({ ...slot, unavailable: true }));
  return { bookings, unavailable };
}

function getTimelineBlockStyle(start, end) {
  const dayStart = parseMinutes(salonHours.start);
  const dayEnd = parseMinutes(salonHours.end);
  const clippedStart = Math.max(parseMinutes(start), dayStart);
  const clippedEnd = Math.min(parseMinutes(end), dayEnd);
  if (clippedEnd <= clippedStart) return null;
  const dayDuration = dayEnd - dayStart;
  return `left:${((clippedStart - dayStart) / dayDuration) * 100}%;width:${((clippedEnd - clippedStart) / dayDuration) * 100}%`;
}

function clampProcedureStart(start, procedureId, deltaMinutes = 0) {
  const dayStart = parseMinutes(salonHours.start);
  const dayEnd = parseMinutes(salonHours.end);
  const requestedStart = parseMinutes(start) + deltaMinutes;
  const requestedCandidate = buildCandidate(toTime(requestedStart), procedureId);
  const duration = parseMinutes(requestedCandidate.end) - parseMinutes(requestedCandidate.start);
  const clampedMinutes = Math.min(Math.max(requestedStart, dayStart), dayEnd - duration);
  const nextStart = toTime(clampedMinutes);
  return {
    start: nextStart,
    candidate: buildCandidate(nextStart, procedureId),
    offsetMinutes: clampedMinutes - parseMinutes(start)
  };
}

function getDraftProcedureDuration(procedureId) {
  const candidate = buildCandidate(salonHours.start, procedureId);
  return parseMinutes(candidate.end) - parseMinutes(candidate.start);
}

function getDraftProcedureOffset(procedureId) {
  const storedOffset = bookingDraftOffsets[procedureId];
  if (Number.isFinite(storedOffset)) return storedOffset;
  const procedureIndex = bookingDraftProcedures.indexOf(procedureId);
  if (procedureIndex <= 0) return 0;
  return bookingDraftProcedures
    .slice(0, procedureIndex)
    .reduce((offset, previousProcedureId) => offset + getDraftProcedureDuration(previousProcedureId) + 5, 0);
}

function getDraftProcedureStart(routeStart, procedureId) {
  return toTime(parseMinutes(routeStart) + getDraftProcedureOffset(procedureId));
}

function getNextDraftProcedureOffset(routeStart) {
  if (!bookingDraftProcedures.length) return 0;
  const candidate = buildDraftCandidate(routeStart);
  const latestEnd = Math.max(...candidate.stages.map((stage) => parseMinutes(stage.end)));
  return latestEnd - parseMinutes(routeStart) + 5;
}

function renderProcedurePreference(clientId, procedureId, procedureIds = []) {
  const client = getClient(clientId);
  const selectedProcedureIds = procedureIds.length ? procedureIds : [procedureId];
  const selectedProcedures = selectedProcedureIds.map(getProcedure);
  const procedureMasters = [...new Set(selectedProcedureIds.flatMap(getProcedureMasters))];
  const familiarMasters = [...new Set(selectedProcedureIds.flatMap((selectedId) => getClientProcedureMasters(clientId, selectedId)))];
  const unfamiliarMasters = getDraftNewProcedureMasters(clientId, selectedProcedureIds);

  if (familiarMasters.length && !unfamiliarMasters.length) {
    const familiarCopy = familiarMasters.length === 1
      ? `Клієнт уже був у ${familiarMasters[0]}.`
      : `Клієнт уже був у майстрів: ${familiarMasters.join(", ")}.`;
    return `<div class="master-preference-note"><span class="preference-mark">↗</span><div><strong>Радимо знайомого майстра</strong><p>${escapeHtml(familiarCopy)} Увесь маршрут знайомий клієнту.</p></div><span class="preference-tag">Історія</span></div>`;
  }

  const familiarCopy = familiarMasters.length === 1
    ? `Знайомий майстер у маршруті: ${familiarMasters[0]}.`
    : familiarMasters.length > 1
      ? `Знайомі майстри у маршруті: ${familiarMasters.join(", ")}.`
      : client?.masterNames?.length
        ? "Попередній майстер клієнта не виконує цю процедуру."
        : "У клієнта ще немає історії роботи з майстрами.";
  const newMasterCopy = unfamiliarMasters.length
    ? `Новий для клієнта етап виконують: ${unfamiliarMasters.join(", ")}.`
    : "";
  const routeCopy = selectedProcedures.length > 1
    ? `Додані процедури: ${selectedProcedures.map((procedure) => procedure.name).join(" + ")}.`
    : procedureMasters.length > 1
      ? `Доступний маршрут: ${procedureMasters.join(" → ")}.`
      : `Процедуру виконує ${procedureMasters[0]}.`;
  return `<div class="master-preference-note warning"><span class="preference-mark">!</span><div><strong>${familiarMasters.length ? "Знайомий і новий етап маршруту" : "Новий для клієнта майстер"}</strong><p>${escapeHtml(familiarCopy)} ${escapeHtml(newMasterCopy)} ${escapeHtml(routeCopy)}</p><label class="preference-confirm"><input id="booking-new-master-confirm" type="checkbox" /> Підтвердити запис до нового майстра</label></div><span class="preference-tag">Потрібне підтвердження</span></div>`;
}

function renderProcedureTimeline(date, candidate, clientId) {
  const container = $("#booking-procedure-timeline");
  if (!container) return;

  const selectedProcedures = bookingDraftProcedures.map(getProcedure);
  if (!selectedProcedures.length) {
    container.innerHTML = `<div class="procedure-timeline-head"><div><div class="panel-kicker">Доступність процедури</div><strong id="procedure-timeline-title">Таблиця доступності</strong><p>Додайте процедуру вище — її етапи та зайнятість ресурсів з’являться тут.</p></div><span class="procedure-timeline-empty-mark">＋</span></div><div class="procedure-timeline-empty">Оберіть процедуру, щоб побачити вільні вікна майстрів, кабінетів і обладнання.</div>`;
    return;
  }

  const procedureMasters = [...new Set(bookingDraftProcedures.flatMap(getProcedureMasters))];
  const familiarMasters = [...new Set(bookingDraftProcedures.flatMap((procedureId) => getClientProcedureMasters(clientId, procedureId)))];
  const timeLabels = Array.from({ length: 11 }, (_, index) => toTime(parseMinutes(salonHours.start) + index * 60));
  const stageRows = selectedProcedures.flatMap((procedure, procedureIndex) => procedure.resourcePlan.map((resourceStage, stageIndex) => {
    const { bookings, unavailable } = getProcedureResourceUsage(date, resourceStage);
    const candidateStage = candidate?.stages.find((stage) => stage.procedureId === procedure.id && stage.stageIndex === stageIndex);
    const actualBlocks = [...bookings, ...unavailable];
    const status = actualBlocks.length ? "Є зайняті інтервали" : "Вільно весь день";
    const statusClass = actualBlocks.length ? "busy" : "free";
    const familiarMaster = familiarMasters.includes(resourceStage.master);
    const bookedBlocks = bookings.map((stage) => {
      const style = getTimelineBlockStyle(stage.start, stage.end);
      if (!style) return "";
      const label = parseMinutes(stage.end) - parseMinutes(stage.start) >= 55 ? stage.client.split(" ")[0] : "Зайнято";
      return `<span class="procedure-block booked" style="${style}" title="${escapeHtml(`${stage.client} · ${stage.service} · ${stage.start}—${stage.end}`)}"><strong>${escapeHtml(label)}</strong></span>`;
    }).join("");
    const unavailableBlocks = unavailable.map((slot) => {
      const style = getTimelineBlockStyle(slot.start, slot.end);
      if (!style) return "";
      return `<span class="procedure-block unavailable" style="${style}" title="${escapeHtml(`${slot.reason} · ${slot.start}—${slot.end}`)}"><strong>Недоступно</strong></span>`;
    }).join("");
    const pendingBlock = candidateStage ? (() => {
      const style = getTimelineBlockStyle(candidateStage.start, candidateStage.end);
      return style ? `<span class="procedure-block pending" data-pending-block="true" data-pending-procedure="${escapeHtml(procedure.id)}" role="button" tabindex="0" aria-label="Перетягніть, щоб змінити час процедури ${escapeHtml(procedure.name)}" style="${style}" title="Новий запис · ${escapeHtml(procedure.name)} · ${escapeHtml(`${candidateStage.start}—${candidateStage.end}`)}"><strong>Новий</strong></span>` : "";
    })() : "";
    const procedureLabel = `<span class="procedure-resource-procedure">${procedureIndex + 1}. ${escapeHtml(procedure.name)}</span>`;
    const removeButton = stageIndex === 0 ? `<button class="timeline-remove-button" data-remove-visit-procedure="${escapeHtml(procedure.id)}" type="button" aria-label="Видалити процедуру ${escapeHtml(procedure.name)}">×</button>` : "";
    return `<div class="procedure-timeline-row ${familiarMaster ? "familiar" : ""} ${stageIndex === 0 ? "procedure-group-start" : ""}"><div class="procedure-timeline-resource"><div class="procedure-resource-head">${procedureLabel}${removeButton}</div><strong>${stageIndex + 1}. ${escapeHtml(resourceStage.name)}</strong><span>${escapeHtml(resourceStage.master)} · ${escapeHtml(resourceStage.room)}</span><small>${escapeHtml(resourceStage.equipment)}</small>${familiarMaster ? `<span class="procedure-master-badge">Знайомий майстер</span>` : ""}<em class="procedure-status ${statusClass}"><span class="legend-dot"></span>${status}</em></div><div class="procedure-timeline-track" aria-label="${escapeHtml(`${procedure.name}, ${resourceStage.name}: ${status}`)}">${bookedBlocks}${unavailableBlocks}${pendingBlock}${!bookedBlocks && !unavailableBlocks && !pendingBlock ? `<span class="procedure-free-label">Вільно весь день</span>` : ""}</div></div>`;
  })).join("");
  const totalStages = selectedProcedures.reduce((sum, procedure) => sum + procedure.resourcePlan.length, 0);
  container.innerHTML = `<div class="procedure-timeline-head"><div><div class="panel-kicker">Доступність процедур</div><strong id="procedure-timeline-title">${bookingDraftProcedures.length === 1 ? escapeHtml(selectedProcedures[0].name) : `${bookingDraftProcedures.length} процедури в маршруті`} · ${escapeHtml(formatLongDate(date))}</strong><p>Порожні ділянки на шкалі — доступні вікна. Кожну додану процедуру можна рухати окремо, а зайнятість враховує майстра, кабінет і обладнання.</p></div><div class="procedure-timeline-legend"><span class="legend-dot legend-dot-booked"></span>Зайнято<span class="legend-dot legend-dot-unavailable"></span>Неробочий час<span class="legend-dot legend-dot-pending"></span>Новий запис<span class="procedure-drag-hint" id="procedure-drag-hint">↔ Перетягніть «Новий»</span></div></div><div class="procedure-timeline-summary"><span><strong>${bookingDraftProcedures.length}</strong> ${bookingDraftProcedures.length === 1 ? "процедура" : "процедури"}</span><span><strong>${totalStages}</strong> ${totalStages === 1 ? "етап" : "етапи"} маршруту</span><span><strong>${procedureMasters.length}</strong> ${procedureMasters.length === 1 ? "майстер" : "майстри"}</span><span class="summary-free"><span class="legend-dot"></span>доступно між записами</span></div><div class="timeline-scroll-hint" role="note"><span class="timeline-scroll-hint-icon" aria-hidden="true">↔</span><span>Проведіть по шкалі вліво або вправо, щоб побачити весь день</span><span class="timeline-scroll-hint-arrow" aria-hidden="true">→</span></div><div class="procedure-timeline-scroll"><div class="procedure-timeline-grid"><div class="procedure-timeline-axis"><span>Процедура, етап і ресурси</span><div class="procedure-time-axis">${timeLabels.map((time) => `<span>${time}</span>`).join("")}</div></div>${stageRows}</div></div>`;
}

function resetTimelineDragStyles(drag) {
  $$('[data-pending-block]').forEach((block) => {
    block.classList.remove("is-dragging");
    block.style.transform = "";
  });
  document.body.style.userSelect = drag?.previousUserSelect || "";
  document.body.style.cursor = drag?.previousCursor || "";
}

function startTimelineDrag(event, block) {
  if (timelineDrag || (event.pointerType === "mouse" && event.button !== 0)) return;
  const startInput = $("#booking-start");
  const track = block.closest(".procedure-timeline-track");
  const procedureId = block.dataset.pendingProcedure;
  if (!startInput || !procedureId || !track) return;

  const trackWidth = track.getBoundingClientRect().width;
  if (!trackWidth) return;
  const routeStart = startInput.value;
  const procedureStart = getDraftProcedureStart(routeStart, procedureId);
  timelineDrag = {
    pointerId: event.pointerId,
    originClientX: event.clientX,
    trackWidth,
    dayDuration: parseMinutes(salonHours.end) - parseMinutes(salonHours.start),
    originStart: procedureStart,
    routeStart,
    procedureId,
    previewStart: procedureStart,
    block,
    previousUserSelect: document.body.style.userSelect,
    previousCursor: document.body.style.cursor
  };
  $$(`[data-pending-procedure="${procedureId}"]`).forEach((pendingBlock) => pendingBlock.classList.add("is-dragging"));
  document.body.style.userSelect = "none";
  document.body.style.cursor = "grabbing";
  try {
    block.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture is optional; document-level listeners keep the drag working.
  }
  event.preventDefault();
}

function updateTimelineDrag(clientX) {
  if (!timelineDrag) return;
  const drag = timelineDrag;
  const minutesPerPixel = drag.dayDuration / drag.trackWidth;
  const deltaMinutes = Math.round(((clientX - drag.originClientX) * minutesPerPixel) / 15) * 15;
  const preview = clampProcedureStart(drag.originStart, drag.procedureId, deltaMinutes);
  drag.previewStart = preview.start;
  const offsetPx = ((parseMinutes(preview.start) - parseMinutes(drag.originStart)) / drag.dayDuration) * drag.trackWidth;
  $$(`[data-pending-procedure="${drag.procedureId}"]`).forEach((block) => {
    block.style.transform = `translate3d(${offsetPx}px, 0, 0)`;
  });
  const hint = $("#procedure-drag-hint");
  if (hint) hint.textContent = `↔ ${getProcedure(drag.procedureId).name}: ${preview.start}`;
}

function finishTimelineDrag(commit = true) {
  if (!timelineDrag) return;
  const drag = timelineDrag;
  try {
    if (drag.block.hasPointerCapture?.(drag.pointerId)) drag.block.releasePointerCapture(drag.pointerId);
  } catch {
    // The block can already be detached when the modal is closed during a drag.
  }
  if (commit) {
    const startInput = $("#booking-start");
    if (startInput && bookingDraftProcedures[0] === drag.procedureId) {
      startInput.value = drag.previewStart;
      bookingDraftOffsets[drag.procedureId] = 0;
    } else {
      bookingDraftOffsets[drag.procedureId] = parseMinutes(drag.previewStart) - parseMinutes(drag.routeStart);
    }
  }
  timelineDrag = null;
  resetTimelineDragStyles(drag);
  if (commit) syncBookingBuilder();
}

function renderBranchStatus() {
  const branch = getCurrentBranch();
  if (!isBranchClosed(branch)) return "";
  const archivedBookings = getArchivedBranchItems("bookings").length;
  const archivedRooms = getArchivedBranchItems("rooms").length;
  const archivedEquipment = getArchivedBranchItems("equipment").length;
  const closedDate = branch.closedAt ? formatLongDate(branch.closedAt.slice(0, 10)) : "дата не вказана";
  return `<section class="branch-closed-banner" role="status"><div class="branch-closed-mark">⌁</div><div class="branch-closed-copy"><strong>Філія «${escapeHtml(branch.name)}» закрита</strong><span>Операційні дані перенесені в архів · ${escapeHtml(closedDate)}. Нові записи та зміни ресурсів недоступні.</span></div><div class="branch-archive-summary"><span><strong>${archivedBookings}</strong> записів</span><span><strong>${archivedRooms}</strong> кабінетів</span><span><strong>${archivedEquipment}</strong> одиниць обладнання</span></div></section>`;
}

function render() {
  if (!state.authenticated) {
    renderLoginScreen();
    return;
  }
  updateChrome();
  renderStats();
  $("#stats-grid").hidden = state.section === "settings";
  const view = $("#app-view");
  const branchStatus = renderBranchStatus();
  if (state.section === "settings") {
    view.innerHTML = branchStatus + renderUserSettings();
  } else if (state.role === "client") {
    view.innerHTML = branchStatus + renderClientPortal();
  } else if (state.section === "schedule") {
    view.innerHTML = branchStatus + renderSchedule();
  } else {
    view.innerHTML = branchStatus + renderDirectory(state.section);
  }
}

function updateChrome() {
  const current = {
    schedule: "Розклад",
    clients: "Клієнти",
    history: "Історія візитів",
    procedures: "Процедури",
    resources: "Кабінети й обладнання",
    team: "Команда",
    settings: "Налаштування профілю"
  }[state.section] || (state.role === "client" ? "Мій запис" : "Розклад");
  const firstName = state.user?.name?.split(" ")[0] || (state.role === "client" ? "Марино" : state.role === "master" ? "Ірино" : "Ольго");
  const roleData = {
    admin: { title: `Доброго ранку, ${firstName}`, subtitle: "У студії спокійний ритм — записи, команда й ресурси під контролем." },
    master: { title: "Сьогодні у вас 2 сеанси", subtitle: `${firstName}, розклад готовий. Історія клієнта доступна в один клік.` },
    client: { title: `Вітаємо, ${firstName}`, subtitle: "Ваш наступний запис зібрано й підтверджено. Усі деталі — нижче." }
  }[state.role];
  document.body.classList.toggle("client-mode", state.role === "client");
  $("#breadcrumb-current").textContent = current;
  $("#mobile-section-label").textContent = current === "Налаштування профілю" ? "Профіль" : current;
  $("#page-title").innerHTML = `${roleData.title} <span class="wave">✳</span>`;
  $("#page-subtitle").textContent = roleData.subtitle;
  $("#new-booking-button").style.display = state.role === "client" || isBranchClosed() ? "none" : "inline-flex";
  $("#date-eyebrow").textContent = state.role === "client" ? "ОСОБИСТИЙ КАБІНЕТ · KRASUNYA" : formatDateEyebrow(state.selectedDate);
  const branch = getCurrentBranch();
  $("#branch-name").textContent = branch.name;
  $("#branch-city").textContent = branch.city;
  $("#branch-switcher").disabled = !["admin", "client"].includes(state.role);
  $("#session-label").textContent = state.user ? roleLabel(state.user.role) : "Сеанс активний";
  $("#account-name").textContent = state.user?.name || "Користувач";
  $("#account-role").textContent = roleLabel(state.role);
  $("#account-avatar").textContent = state.user?.initials || "К";
  $(".nav-count").textContent = state.role === "client" ? "" : String(getVisibleClients().length);
  $$(`[data-section]`).forEach((item) => item.classList.toggle("active", state.role !== "client" && item.dataset.section === state.section));
  $$(`[data-section]`).forEach((item) => {
    item.style.opacity = state.role === "master" && ["procedures", "resources"].includes(item.dataset.section) ? "0.4" : "1";
  });
}

function renderStats() {
  const activeBookings = state.bookings.filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && !booking.archived && isActiveBooking(booking));
  const activeBookingsToday = activeBookings.filter((booking) => booking.date === state.selectedDate);
  const total = activeBookingsToday.reduce((sum, booking) => sum + booking.price, 0);
  const utilization = adminUtilization(activeBookings);
  const recentBookingsStart = addDays(state.selectedDate, -6);
  const newClients = newClientsInRange(activeBookings, recentBookingsStart, state.selectedDate);
  const complexBookingsToday = activeBookingsToday.filter((booking) => booking.kind === "complex" || booking.stages.length > 1).length;
  const todayNote = complexBookingsToday ? `${complexBookingsToday} складні сеанси` : activeBookingsToday.length ? "усі записи прості" : "немає записів";
  const stats = state.role === "client" ? [
    { icon: "◷", label: "Найближчий запис", value: "04.09", note: "сьогодні · 09:30" },
    { icon: "↻", label: "Усього візитів", value: "8", note: "за весь час" },
    { icon: "₴", label: "Інвестиції в догляд", value: "41 200 ₴", note: "за 8 процедур" },
    { icon: "✦", label: "Статус клієнта", value: "Постійний", note: "доступний пріоритет" }
  ] : state.role === "master" ? [
    { icon: "◷", label: "Ваші записи", value: "2", note: "09:30 та 18:00" },
    { icon: "◒", label: "Завантаження", value: "38%", note: "є вільні вікна" },
    { icon: "₴", label: "Ваш оборот", value: "7 650 ₴", note: "за поточними записами" },
    { icon: "♧", label: "Клієнтів сьогодні", value: "2", note: "1 новий клієнт" }
  ] : [
    { icon: "◷", label: "Записи сьогодні", value: String(activeBookingsToday.length), note: todayNote },
    { icon: "◒", label: "Завантаження студії", value: utilization.value, note: utilization.note, trend: utilization.trend, trendDown: utilization.trendDown },
    { icon: "₴", label: "Очікувана виручка", value: formatMoney(total), note: `із ${activeBookingsToday.length} записів` },
    { icon: "✦", label: "Нові клієнти", value: String(newClients), note: "за останні 7 днів" }
  ];
  $("#stats-grid").innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <div class="stat-topline"><span>${escapeHtml(stat.label)}</span><span class="stat-icon" aria-hidden="true">${stat.icon}</span></div>
      <strong class="stat-value">${escapeHtml(stat.value)}</strong>
      <span class="stat-note ${stat.trend ? "up" : ""} ${stat.trendDown ? "down" : ""}">${escapeHtml(stat.note)}</span>
    </article>
  `).join("");
}

function renderSchedule() {
  const viewTitle = state.view === "day"
    ? `Розклад на ${state.selectedDate === getTodayIsoDate() ? "сьогодні" : formatLongDate(state.selectedDate)}`
    : state.view === "week" ? "Розклад на тиждень"
      : state.view === "month" ? `Розклад · ${formatMonthTitle(state.selectedDate)}`
        : `Розклад · ${formatYearTitle(state.selectedDate)}`;
  const mobileViewHint = state.view === "day"
    ? "Проведіть по розкладу вліво, щоб побачити всіх майстрів"
    : state.view === "week"
      ? "Проведіть по тижню вліво або вправо, щоб побачити всі дні"
      : state.view === "month"
        ? "Проведіть по календарю вліво або вправо, щоб побачити всі дні"
        : "Оберіть потрібний день у календарі року";
  return `
    <section class="panel calendar-panel" aria-labelledby="schedule-title">
      <div class="panel-head">
        <div>
          <div class="panel-kicker">Головна сцена</div>
          <h2 class="panel-title" id="schedule-title">${viewTitle}</h2>
          <p class="panel-subtitle">${state.role === "master" ? "Ваші етапи підсвічені в загальній сітці." : "Виберіть будь-яку дату або період — дані відкриваються одразу."}</p>
        </div>
        <div class="toolbar-actions">
          <div class="date-nav" aria-label="Навігація за датами">
            <button class="date-button" data-date-shift="-1" type="button" aria-label="Попередній період">‹</button>
            <label class="date-picker-label"><span class="date-chip">${formatScheduleDate(state.selectedDate)}</span><input class="date-picker" id="schedule-date" type="date" value="${escapeHtml(state.selectedDate)}" aria-label="Вибрати дату" /></label>
            <button class="date-button" data-date-shift="1" type="button" aria-label="Наступний період">›</button>
            ${state.selectedDate !== getTodayIsoDate() ? `<button class="today-button" data-action="go-to-today" type="button">Сьогодні</button>` : ""}
          </div>
          <div class="view-toggle" aria-label="Вигляд розкладу">
            <button class="${state.view === "day" ? "active" : ""}" data-view="day" type="button">День</button>
            <button class="${state.view === "week" ? "active" : ""}" data-view="week" type="button">Тиждень</button>
            <button class="${state.view === "month" ? "active" : ""}" data-view="month" type="button">Місяць</button>
            <button class="${state.view === "year" ? "active" : ""}" data-view="year" type="button">Рік</button>
          </div>
        </div>
      </div>
      <div class="mobile-calendar-hint" role="note"><span class="mobile-calendar-hint-icon" aria-hidden="true">↔</span><span>${mobileViewHint}</span></div>
      ${state.view === "day" ? renderDayView() : state.view === "week" ? renderWeekView() : state.view === "month" ? renderMonthView() : renderYearView()}
    </section>
    <aside class="right-rail" aria-label="Фокус дня">
      ${renderFocusCard()}
      ${renderAttentionPanel()}
      ${renderResourcesPanel()}
    </aside>
  `;
}

function renderDayView() {
  const visible = getVisibleBookings();
  const scheduleMasters = getScheduleMasters();
  const masterOptions = ["all", ...getBranchItems("masters").map((master) => master.name)];
  const roomOptions = ["all", ...getBranchItems("rooms").map((room) => room.name)];
  const timeLabels = Array.from({ length: 10 }, (_, index) => toTime(parseMinutes(salonHours.start) + index * 60));
  const hourHeight = scheduleHourHeight;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowTop = ((nowMinutes - parseMinutes(salonHours.start)) / 60) * hourHeight;
  const showNowLine = state.selectedDate === getTodayIsoDate() && nowMinutes >= parseMinutes(salonHours.start) && nowMinutes <= parseMinutes(salonHours.end);
  return `
    <div class="filter-row">
      <select class="filter-select" id="master-filter" aria-label="Фільтр за майстром">
        ${masterOptions.map((master) => `<option value="${escapeHtml(master)}" ${state.filterMaster === master ? "selected" : ""}>${master === "all" ? "Усі майстри" : escapeHtml(master)}</option>`).join("")}
      </select>
      <select class="filter-select" id="room-filter" aria-label="Фільтр за кабінетом">
        ${roomOptions.map((room) => `<option value="${escapeHtml(room)}" ${state.filterRoom === room ? "selected" : ""}>${room === "all" ? "Усі кабінети" : escapeHtml(room)}</option>`).join("")}
      </select>
      ${!isBranchClosed() ? `<button class="ghost-button availability-button" data-action="add-availability" type="button"><span>＋</span> Неробочий час</button>` : ""}
      <span class="availability-note">Конфлікти ресурсів перевіряються автоматично</span>
    </div>
    <div class="timeline-wrap">
      <div class="timeline-header schedule-grid" style="--master-count:${scheduleMasters.length}">
        <div class="schedule-corner"><span>ЧАС</span><strong>Майстри</strong></div>
        ${scheduleMasters.map((master) => renderMasterColumnHeader(master)).join("")}
      </div>
      <div class="timeline-body schedule-grid" style="--master-count:${scheduleMasters.length}">
        <div class="time-labels">${timeLabels.map((time) => `<div class="time-label">${time}</div>`).join("")}<div class="time-label time-label-end">${escapeHtml(salonHours.end)}</div></div>
        ${scheduleMasters.map((master) => renderMasterColumn(master, visible)).join("")}
        ${showNowLine ? `<div class="schedule-now-line" style="top:${nowTop}px"><span class="now-line-label">зараз</span></div>` : ""}
      </div>
    </div>
  `;
}

function getScheduleMasters() {
  const masters = getBranchItems("masters");
  if (state.role === "master") return masters.filter((master) => master.name === getCurrentMasterName());
  if (state.filterMaster !== "all") return masters.filter((master) => master.name === state.filterMaster);
  return masters;
}

function renderMasterColumnHeader(master) {
  return `<div class="master-header master-header-${escapeHtml(master.color)}">${renderMasterAvatar(master, "master-avatar-sm")}<div class="master-header-copy"><strong>${escapeHtml(master.name)}</strong><span>${escapeHtml(master.role)}</span></div><span class="master-shift">${escapeHtml(master.schedule)}</span></div>`;
}

function renderMasterColumn(master, visibleBookings) {
  const unavailable = getVisibleUnavailableSlots().filter((slot) => slot.master === master.name);
  const stages = visibleBookings.flatMap((booking) => booking.stages
    .filter((stage) => stage.master === master.name)
    .filter((stage) => state.filterRoom === "all" || stage.room === state.filterRoom)
    .map((stage) => ({ booking, stage })));
  const blocks = stages.map(({ booking, stage }) => renderAppointment(booking, stage, master.color)).join("");
  const unavailableBlocks = unavailable.map((slot) => renderUnavailableSlot(slot)).join("");
  return `<div class="master-track" role="group" aria-label="Розклад майстра ${escapeHtml(master.name)}"><div class="master-track-grid"></div>${unavailableBlocks}${blocks}${!blocks && !unavailableBlocks ? `<div class="master-empty"><span>Вільно</span><small>немає записів</small></div>` : ""}</div>`;
}

function renderAppointment(booking, stage, masterColor) {
  const top = ((parseMinutes(stage.start) - parseMinutes(salonHours.start)) / 60) * scheduleHourHeight;
  const height = Math.max(((parseMinutes(stage.end) - parseMinutes(stage.start)) / 60) * scheduleHourHeight, 56);
  const toneClass = masterColor === "lilac" ? "appointment--lilac" : masterColor === "sage" ? "appointment--sage" : "appointment--coral";
  return `
    <button class="appointment ${toneClass} ${height < 80 ? "compact" : ""}" style="top:${top}px;height:${height}px" data-booking="${booking.id}" type="button" aria-label="Запис ${escapeHtml(booking.client)} на ${escapeHtml(stage.name)}">
      <span class="appointment-time">${escapeHtml(stage.start)}—${escapeHtml(stage.end)} <span class="appointment-status" aria-label="${booking.status === "confirmed" ? "Підтверджено" : "Очікує підтвердження"}"></span></span>
      <strong class="appointment-name">${escapeHtml(booking.client)}</strong>
      <span class="appointment-service">${escapeHtml(stage.name)}</span>
      <span class="appointment-resource"><span class="resource-pip"></span>${escapeHtml(stage.room)}${booking.stages.length > 1 ? ` · ${escapeHtml(booking.service)}` : ""}</span>
    </button>
  `;
}

function renderUnavailableSlot(slot) {
  const top = ((parseMinutes(slot.start) - parseMinutes(salonHours.start)) / 60) * scheduleHourHeight;
  const height = Math.max(((parseMinutes(slot.end) - parseMinutes(slot.start)) / 60) * scheduleHourHeight, 36);
  return `<button class="unavailable-slot" style="top:${top}px;height:${height}px" data-availability="${slot.id}" type="button" aria-label="Неробочий час ${escapeHtml(slot.master)}, ${escapeHtml(slot.start)}—${escapeHtml(slot.end)}"><span class="unavailable-slot-time">${escapeHtml(slot.start)}—${escapeHtml(slot.end)}</span><strong>${escapeHtml(slot.reason)}</strong><small>Неробочий час</small><span class="unavailable-slot-edit">Змінити</span></button>`;
}

function renderWeekView() {
  const weekStart = startOfWeek(state.selectedDate);
  const days = Array.from({ length: 7 }, (_, index) => {
    const iso = addDays(weekStart, index);
    const date = dateObject(iso);
    return {
      day: new Intl.DateTimeFormat("uk-UA", { weekday: "short" }).format(date).replaceAll(".", "").toUpperCase(),
      date: new Intl.DateTimeFormat("uk-UA", { day: "2-digit" }).format(date),
      label: new Intl.DateTimeFormat("uk-UA", { month: "short" }).format(date).replaceAll(".", ""),
      iso
    };
  });
  return `<div class="week-grid">${days.map((day) => {
    const dayBookings = calendarBookingsForDate(day.iso);
    const dayUnavailable = calendarUnavailableForDate(day.iso);
    return `<div class="week-day ${day.iso === state.selectedDate ? "selected" : ""} ${day.iso === getTodayIsoDate() ? "today" : ""}" data-calendar-date="${day.iso}" role="button" tabindex="0">
      <div class="week-day-top"><span>${day.day} · ${day.label}</span><strong>${day.date}</strong></div>
      ${dayUnavailable.map((slot) => `<button class="week-unavailable" data-availability="${slot.id}" type="button"><strong>${escapeHtml(slot.start)}—${escapeHtml(slot.end)}</strong><span>${escapeHtml(slot.reason)} · ${escapeHtml(slot.master)}</span></button>`).join("")}
      ${dayBookings.length ? dayBookings.slice(0, 3).map((booking) => `<button class="week-booking" data-booking="${booking.id}" type="button"><strong>${escapeHtml(booking.client)}</strong><span>${booking.start} · ${escapeHtml(booking.service)}</span></button>`).join("") : `<span class="empty-week">—</span>`}
    </div>`;
  }).join("")}</div>`;
}

function renderMonthView() {
  const monthDate = dateObject(state.selectedDate);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1, 12);
  const offset = (firstDay.getDay() || 7) - 1;
  const daysInMonth = new Date(year, month + 1, 0, 12).getDate();
  const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;
  const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(year, month, index - offset + 1, 12);
    const iso = toIsoDate(date);
    const inMonth = date.getMonth() === month;
    const bookings = inMonth ? calendarBookingsForDate(iso) : [];
    const unavailable = inMonth ? calendarUnavailableForDate(iso) : [];
    return `<div class="month-day-cell ${inMonth ? "" : "outside-month"} ${iso === state.selectedDate ? "selected" : ""} ${iso === getTodayIsoDate() ? "today" : ""}" data-calendar-date="${iso}" role="button" tabindex="0"><div class="month-day-head"><strong>${date.getDate()}</strong>${bookings.length || unavailable.length ? `<span>${bookings.length + unavailable.length}</span>` : ""}</div>${bookings.slice(0, 3).map((booking) => `<button class="month-event" data-booking="${escapeHtml(booking.id)}" type="button"><strong>${escapeHtml(booking.start)}</strong><span>${escapeHtml(booking.client)}</span></button>`).join("")}${unavailable.slice(0, 2).map((slot) => `<button class="month-event unavailable" data-availability="${escapeHtml(slot.id)}" type="button"><strong>${escapeHtml(slot.start)}</strong><span>${escapeHtml(slot.reason)}</span></button>`).join("")}${bookings.length + unavailable.length > 5 ? `<small class="month-more">+ ще ${bookings.length + unavailable.length - 5}</small>` : ""}</div>`;
  });
  return `<div class="calendar-month"><div class="calendar-weekdays">${weekdays.map((day) => `<span>${day}</span>`).join("")}</div><div class="month-grid">${cells.join("")}</div></div>`;
}

function renderYearView() {
  const year = dateObject(state.selectedDate).getFullYear();
  const monthNames = Array.from({ length: 12 }, (_, month) => new Intl.DateTimeFormat("uk-UA", { month: "long" }).format(new Date(year, month, 1, 12)));
  const months = monthNames.map((name, month) => {
    const firstDay = new Date(year, month, 1, 12);
    const offset = (firstDay.getDay() || 7) - 1;
    const daysInMonth = new Date(year, month + 1, 0, 12).getDate();
    const cells = Array.from({ length: offset + daysInMonth }, (_, index) => {
      if (index < offset) return `<span class="year-day empty"></span>`;
      const day = index - offset + 1;
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasActivity = calendarBookingsForDate(iso).length || calendarUnavailableForDate(iso).length;
      return `<button class="year-day ${iso === state.selectedDate ? "selected" : ""} ${iso === getTodayIsoDate() ? "today" : ""} ${hasActivity ? "has-activity" : ""}" data-calendar-date="${iso}" type="button">${day}</button>`;
    });
    return `<section class="year-month"><h3>${name}</h3><div class="year-weekdays">Пн Вт Ср Чт Пт Сб Нд</div><div class="year-month-grid">${cells.join("")}</div></section>`;
  }).join("");
  return `<div class="year-grid">${months}</div>`;
}

function renderFocusCard() {
  const booking = state.bookings.find((item) => (!item.branchId || item.branchId === state.branchId) && !item.archived && isActiveBooking(item) && item.date === state.selectedDate && (state.role !== "master" || bookingBelongsToCurrentMaster(item)));
  if (!booking) {
    return `<section class="focus-card"><div class="focus-head"><div><div class="panel-kicker">Ваш простір</div><h2 class="panel-title">Розклад вільний</h2></div><span class="focus-mark">✦</span></div><div class="availability-empty" style="margin-top:22px;color:#bdaab9"><strong style="color:#fff6f0">Поки немає записів</strong><span>Нові візити з’являться тут після створення.</span></div></section>`;
  }
  return `
    <section class="focus-card">
      <div class="focus-head"><div><div class="panel-kicker">Складений сеанс</div><h2 class="panel-title">Зібрано без конфліктів</h2></div><span class="focus-mark">✦</span></div>
      <div class="focus-client"><div class="avatar avatar-marina">МС</div><div class="focus-client-copy"><strong>${booking.client}</strong><span>${booking.start}—${booking.end} · ${booking.service}</span></div><span class="verified">підтверджено</span></div>
      <div class="stage-list">
        ${booking.stages.map((stage, index) => `<div class="stage"><div class="stage-name">${index + 1}. ${escapeHtml(stage.name)}</div><div class="stage-time">${stage.start}—${stage.end}</div><div class="stage-meta stage-master-meta">${renderMasterAvatar(stage.master, "master-avatar-xs")}<span>${escapeHtml(stage.master)} · ${escapeHtml(stage.room)} · ${escapeHtml(stage.equipment)}</span></div></div>`).join("")}
      </div>
      <div class="focus-footer"><div class="focus-total"><span>Вартість візиту</span><strong>${formatMoney(booking.price)}</strong></div><button class="light-button" data-client-history="${booking.clientId}" type="button">Історія клієнта</button></div>
    </section>
  `;
}

function renderAttentionPanel() {
  const attentionBookings = state.bookings.filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && !booking.archived && isActiveBooking(booking) && booking.date === state.selectedDate && booking.status !== "confirmed" && (state.role !== "master" || bookingBelongsToCurrentMaster(booking)));
  return `
    <section class="panel side-panel">
      <div class="side-panel-head"><h2 class="side-panel-title">Потрібна увага</h2><button class="side-panel-link" data-action="show-pending" type="button">Усі ${attentionBookings.length}</button></div>
      <div class="attention-list">
        ${attentionBookings.length ? attentionBookings.map((booking) => `<button class="attention-item" data-booking="${escapeHtml(booking.id)}" type="button"><span class="small-status ${booking.status === "booked" ? "gold" : "coral"}"></span><span class="attention-copy"><strong>${escapeHtml(booking.client)}</strong><span>${booking.status === "booked" ? "Очікує підтвердження" : "Новий клієнт"} · ${escapeHtml(booking.start)}</span></span><span class="attention-arrow">›</span></button>`).join("") : `<div class="availability-empty"><strong>Усе спокійно</strong><span>Немає записів, що потребують уваги.</span></div>`}
      </div>
    </section>
  `;
}

function renderResourcesPanel() {
  const rooms = getBranchItems("rooms");
  const equipment = getBranchItems("equipment");
  const masters = getBranchItems("masters");
  return `
    <section class="panel side-panel">
      <div class="side-panel-head"><h2 class="side-panel-title">Ресурси сьогодні</h2><button class="side-panel-link" data-section-link="resources" type="button">Відкрити</button></div>
      <div class="resource-summary">
        <div class="resource-line"><div class="resource-line-copy"><span>⌂</span>Кабінети</div><span class="resource-line-status">${rooms.length} доступно</span></div>
        <div class="resource-line"><div class="resource-line-copy"><span>⌘</span>Обладнання</div><span class="resource-line-status">${equipment.length} позицій</span></div>
        <div class="resource-line"><div class="resource-line-copy"><span>◌</span>Майстри</div><span class="resource-line-status">${masters.length} у філії</span></div>
      </div>
    </section>
  `;
}

let directoryDraftStages = [];
let directoryDraftMeta = null;

function directoryApiPath(entity, id = "") {
  const collection = { master: "masters", room: "rooms", equipment: "equipment", procedure: "procedures" }[entity];
  return `/${collection}${id ? `/${encodeURIComponent(id)}` : ""}`;
}

function directoryEntityLabel(entity) {
  return { master: "майстра", room: "кабінет", equipment: "обладнання", procedure: "процедуру" }[entity];
}

function openAdminModal() {
  if (state.role !== "admin") return;
  const branchOptions = state.branches.filter((branch) => !isBranchClosed(branch)).map((branch) => `<option value="${escapeHtml(branch.id)}" ${branch.id === state.branchId ? "selected" : ""}>${escapeHtml(branch.name)} · ${escapeHtml(branch.city)}</option>`).join("");
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Доступ до системи</div><h2 id="modal-title">Додати адміністратора</h2><p>Новий адміністратор отримає окремий вхід і зможе керувати всіма філіями.</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><form class="modal-form" id="admin-form"><div class="form-grid"><div class="form-field"><label for="admin-name">Ім’я та прізвище</label><input id="admin-name" name="name" placeholder="Наприклад, Марія Бондар" required /></div><div class="form-field"><label for="admin-email">Email для входу</label><input id="admin-email" name="email" type="email" placeholder="name@salon.ua" autocomplete="username" required /></div><div class="form-field"><label for="admin-phone">Телефон</label><input id="admin-phone" name="phone" placeholder="+38 ..." /></div><div class="form-field"><label for="admin-branch">Основна філія</label><select id="admin-branch" name="branchId" required>${branchOptions}</select></div><div class="form-field full"><label for="admin-password">Пароль</label><input id="admin-password" name="password" type="password" minlength="6" autocomplete="new-password" placeholder="Мінімум 6 символів" required /></div></div><div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Скасувати</button><button class="primary-button" type="submit"><span>＋</span> Додати адміністратора</button></div></form>`;
  showModal();
}

async function deleteAdmin(adminId) {
  if (state.role !== "admin") return;
  const admin = (demoUsers.admin || []).find((item) => item.id === adminId);
  if (!admin || admin.id === state.user?.id) {
    showToast("Не можна видалити власний обліковий запис.");
    return;
  }
  if (!window.confirm(`Видалити адміністратора «${admin.name}»? Дію не можна скасувати.`)) return;
  try {
    if (apiReady) await apiRequest(`/admins/${encodeURIComponent(adminId)}`, { method: "DELETE" });
    demoUsers.admin = (demoUsers.admin || []).filter((item) => item.id !== adminId);
    await refreshLoginUsers().catch(() => {});
    render();
    showToast(`Адміністратора «${admin.name}» видалено.`);
  } catch (error) {
    showToast(`Не вдалося видалити адміністратора: ${apiErrorMessage(error)}`);
  }
}

async function fileToPhotoData(file) {
  if (!file || !file.size) return "";
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
    throw { error: "Оберіть JPEG, PNG, WebP або GIF." };
  }
  if (file.size > 8 * 1024 * 1024) throw { error: "Фото завелике. Оберіть файл до 8 МБ." };
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Не вдалося прочитати фото."));
      element.src = objectUrl;
    });
    const maxEdge = 480;
    const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    let quality = 0.82;
    let result = canvas.toDataURL("image/jpeg", quality);
    while (result.length > 700_000 && quality > 0.5) {
      quality -= 0.08;
      result = canvas.toDataURL("image/jpeg", quality);
    }
    if (result.length > 700_000) throw { error: "Не вдалося стиснути фото до допустимого розміру." };
    return result;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function selectOptions(items, selected, label = (item) => item.name) {
  return items.map((item) => `<option value="${escapeHtml(item.name)}" ${item.name === selected ? "selected" : ""}>${escapeHtml(label(item))}</option>`).join("");
}

function renderProcedureStageFields() {
  return `<div class="directory-stage-list" id="procedure-stage-list">${directoryDraftStages.map((stage, index) => `
    <div class="directory-stage-row">
      <div class="directory-stage-heading"><span class="builder-stage-number">${String(index + 1).padStart(2, "0")}</span><strong>Етап ${index + 1}</strong>${directoryDraftStages.length > 1 ? `<button class="icon-button directory-remove-stage" data-action="remove-procedure-stage" data-stage-index="${index}" type="button" aria-label="Видалити етап">×</button>` : ""}</div>
      <div class="form-grid directory-stage-fields">
        <div class="form-field"><label>Назва етапу</label><input name="stageName" value="${escapeHtml(stage.name || "")}" placeholder="Наприклад, Догляд" required /></div>
        <div class="form-field"><label>Тривалість, хв</label><input name="stageDuration" type="number" min="1" step="5" value="${escapeHtml(stage.duration || 60)}" required /></div>
        <div class="form-field"><label>Майстер</label><select name="stageMaster" required>${selectOptions(getBranchItems("masters"), stage.master, (item) => `${item.name} · ${item.role}`)}</select></div>
        <div class="form-field"><label>Кабінет</label><select name="stageRoom" required>${selectOptions(getBranchItems("rooms"), stage.room, (item) => `${item.name} · ${item.type}`)}</select></div>
        <div class="form-field"><label>Обладнання</label><select name="stageEquipment" required>${selectOptions(getBranchItems("equipment"), stage.equipment, (item) => `${item.name} · ${item.room}`)}</select></div>
        <div class="form-field"><label>Пауза після, хв</label><input name="stageGap" type="number" min="0" step="5" value="${escapeHtml(stage.gapAfter || 0)}" /></div>
      </div>
    </div>`).join("")}</div><button class="ghost-button directory-add-stage" data-action="add-procedure-stage" type="button"><span>＋</span> Додати етап</button>`;
}

function openDirectoryModal(entity, id = "", preserveProcedureDraft = false) {
  if (state.role !== "admin" || isBranchClosed()) return;
  const existing = entity === "master" ? getBranchItems("masters").find((item) => item.name === id)
    : entity === "room" ? getBranchItems("rooms").find((item) => item.name === id)
      : entity === "equipment" ? getBranchItems("equipment").find((item) => item.name === id)
        : getBranchItems("procedures").find((item) => item.id === id);
  const editing = Boolean(existing);
  if (!preserveProcedureDraft) directoryDraftMeta = null;
  if (entity === "procedure" && !preserveProcedureDraft) {
    directoryDraftStages = existing?.resourcePlan?.map((stage) => ({ ...stage })) || [{ name: "", duration: 60, master: getBranchItems("masters")[0]?.name || "", room: getBranchItems("rooms")[0]?.name || "", equipment: getBranchItems("equipment")[0]?.name || "", gapAfter: 0 }];
  }
  const heading = editing ? `Змінити ${directoryEntityLabel(entity)}` : `Додати ${directoryEntityLabel(entity)}`;
  const subheading = { master: "Після створення майстер отримає окремий вхід у систему.", room: "Кабінет буде доступний у маршрутах процедур та розкладі.", equipment: "Обладнання можна прив’язати до будь-якого наявного кабінету.", procedure: "Налаштуйте послідовність етапів, майстрів, кабінетів і обладнання." }[entity];
  let body = "";
  if (entity === "master") {
    const currentPhoto = existing?.photo ? `<img src="${escapeHtml(existing.photo)}" alt="Поточне фото" onerror="this.hidden=true;this.nextElementSibling.hidden=false" /><span hidden>Без фото</span>` : `<span>Без фото</span>`;
    body = `<div class="form-grid"><div class="form-field"><label for="directory-name">Ім’я та прізвище</label><input id="directory-name" name="name" value="${escapeHtml(existing?.name || "")}" ${editing ? "readonly" : ""} required /></div><div class="form-field"><label for="directory-role">Спеціалізація</label><input id="directory-role" name="role" value="${escapeHtml(existing?.role || "Косметологиня")}" required /></div><div class="form-field"><label for="directory-email">Email для входу</label><input id="directory-email" name="email" type="email" value="${escapeHtml(existing?.email || "")}" ${editing ? "" : "required"} autocomplete="username" /></div><div class="form-field"><label for="directory-phone">Телефон</label><input id="directory-phone" name="phone" value="${escapeHtml(existing?.phone || "")}" /></div><div class="form-field"><label for="directory-schedule">Графік</label><input id="directory-schedule" name="schedule" value="${escapeHtml(existing?.schedule || "09:00–18:00")}" placeholder="09:00–18:00" required /></div><div class="form-field"><label for="directory-color">Колір у розкладі</label><select id="directory-color" name="color"><option value="peach" ${existing?.color === "peach" ? "selected" : ""}>Теплий</option><option value="lilac" ${existing?.color === "lilac" ? "selected" : ""}>Ліловий</option><option value="sage" ${existing?.color === "sage" ? "selected" : ""}>Шавлія</option></select></div><div class="form-field full"><label for="directory-focus">Фокус роботи</label><input id="directory-focus" name="focus" value="${escapeHtml(existing?.focus || "")}" placeholder="Наприклад, LED і доглядові процедури" required /></div><div class="form-field full photo-upload-field"><div class="photo-upload-preview" id="directory-photo-preview">${currentPhoto}</div><div><label for="directory-photo-file">Фото співробітника</label><input id="directory-photo-file" name="photoFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" /><small>Завантажте фото з пристрою — воно автоматично стиснеться перед збереженням.</small></div></div><div class="form-field full"><label for="directory-password">Пароль ${editing ? "(залиште порожнім, щоб не змінювати)" : "для входу"}</label><input id="directory-password" name="password" type="password" minlength="6" ${editing ? "" : "required"} autocomplete="new-password" placeholder="Мінімум 6 символів" /></div></div>`;
  } else if (entity === "room") {
    body = `<div class="form-grid"><div class="form-field"><label for="directory-name">Назва кабінету</label><input id="directory-name" name="name" value="${escapeHtml(existing?.name || "")}" ${editing ? "readonly" : ""} placeholder="Каб. 4" required /></div><div class="form-field"><label for="directory-type">Призначення</label><input id="directory-type" name="type" value="${escapeHtml(existing?.type || "")}" placeholder="Естетика" required /></div><div class="form-field"><label for="directory-status">Статус</label><select id="directory-status" name="status">${["Вільний", "До 10:20", "На обслуговуванні"].map((status) => `<option ${status === (existing?.status || "Вільний") ? "selected" : ""}>${status}</option>`).join("")}</select></div><div class="form-field full"><label for="directory-detail">Оснащення / примітка</label><input id="directory-detail" name="detail" value="${escapeHtml(existing?.detail || "")}" placeholder="Кушетка · лампа" /></div></div>`;
  } else if (entity === "equipment") {
    body = `<div class="form-grid"><div class="form-field"><label for="directory-name">Назва обладнання</label><input id="directory-name" name="name" value="${escapeHtml(existing?.name || "")}" ${editing ? "readonly" : ""} placeholder="LED-маска Pro" required /></div><div class="form-field"><label for="directory-type">Тип</label><input id="directory-type" name="type" value="${escapeHtml(existing?.type || "")}" placeholder="LED-терапія" required /></div><div class="form-field"><label for="directory-room">Кабінет</label><select id="directory-room" name="room" required>${selectOptions(getBranchItems("rooms"), existing?.room, (item) => `${item.name} · ${item.type}`)}</select></div><div class="form-field"><label for="directory-status">Статус</label><select id="directory-status" name="status">${["Готове", "На обслуговуванні", "Недоступне"].map((status) => `<option ${status === (existing?.status || "Готове") ? "selected" : ""}>${status}</option>`).join("")}</select></div></div>`;
  } else {
    body = `<div class="form-grid"><div class="form-field"><label for="directory-name">Назва процедури</label><input id="directory-name" name="name" value="${escapeHtml((preserveProcedureDraft ? directoryDraftMeta?.name : existing?.name) || "")}" required /></div><div class="form-field"><label for="directory-category">Категорія</label><input id="directory-category" name="category" value="${escapeHtml((preserveProcedureDraft ? directoryDraftMeta?.category : existing?.category) || "")}" placeholder="Доглядові процедури" required /></div><div class="form-field"><label for="directory-price">Вартість, ₴</label><input id="directory-price" name="price" type="number" min="0" step="50" value="${escapeHtml((preserveProcedureDraft ? directoryDraftMeta?.price : existing?.price) ?? 0)}" required /></div><div class="form-field"><label>Тривалість</label><div class="settings-detail directory-derived-value"><span>Розраховується з етапів</span><strong>${escapeHtml(existing?.duration || "—")}</strong></div></div></div><div class="directory-stage-editor"><div class="directory-stage-editor-head"><div><div class="panel-kicker">Маршрут процедури</div><strong>Етапи та ресурси</strong></div><span class="tag">${directoryDraftStages.length} ${directoryDraftStages.length === 1 ? "етап" : "етапи"}</span></div>${renderProcedureStageFields()}</div>`;
  }
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Довідник студії</div><h2 id="modal-title">${heading}</h2><p>${subheading}</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><form class="modal-form directory-form" id="directory-form" data-entity="${entity}" data-directory-id="${escapeHtml(id)}">${body}<div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Скасувати</button><button class="primary-button" type="submit"><span>✓</span> ${editing ? "Зберегти зміни" : "Створити"}</button></div></form>`;
  showModal();
}

function readProcedureStages(form) {
  const data = new FormData(form);
  const names = data.getAll("stageName");
  const durations = data.getAll("stageDuration");
  const masters = data.getAll("stageMaster");
  const rooms = data.getAll("stageRoom");
  const equipment = data.getAll("stageEquipment");
  const gaps = data.getAll("stageGap");
  return names.map((name, index) => ({
    name: String(name).trim(),
    duration: Number(durations[index] || 0),
    master: masters[index],
    room: rooms[index],
    equipment: equipment[index],
    gapAfter: Number(gaps[index] || 0),
    ...(directoryDraftStages[index]?.masterOptions?.length ? { masterOptions: [...directoryDraftStages[index].masterOptions] } : {}),
    ...(directoryDraftStages[index]?.roomOptions?.length ? { roomOptions: [...directoryDraftStages[index].roomOptions] } : {}),
    ...(directoryDraftStages[index]?.equipmentOptions?.length ? { equipmentOptions: [...directoryDraftStages[index].equipmentOptions] } : {})
  }));
}

function syncProcedureDraft() {
  const form = $("#directory-form");
  if (!form || form.dataset.entity !== "procedure") return;
  const data = new FormData(form);
  directoryDraftMeta = { name: data.get("name"), category: data.get("category"), price: data.get("price") };
  directoryDraftStages = readProcedureStages(form);
}

async function deleteDirectoryEntity(entity, id) {
  if (state.role !== "admin" || isBranchClosed()) return;
  const label = directoryEntityLabel(entity);
  if (!window.confirm(`Видалити ${label} «${id}»?`)) return;
  try {
    if (apiReady) await apiRequest(directoryApiPath(entity, id), { method: "DELETE" });
    const collections = { master: "masters", room: "rooms", equipment: "equipment", procedure: "procedures" };
    const key = collections[entity];
    state[key] = state[key].filter((item) => (entity === "procedure" ? item.id !== id : item.name !== id));
    if (entity === "master") {
      demoUsers.master = demoUsers.master.filter((user) => user.masterName !== id && user.name !== id);
      await refreshLoginUsers().catch(() => {});
    }
    closeModal();
    render();
    showToast(`${label[0].toUpperCase()}${label.slice(1)} видалено.`);
  } catch (error) {
    showToast(`Не вдалося видалити ${label}: ${apiErrorMessage(error)}`);
  }
}

function renderDirectory(section) {
  const titles = {
    clients: ["Клієнти", state.role === "master" ? "Ваші клієнти: ті, хто вже записувався до вас, і нові записи до вас." : "Усі клієнти салону, їхня історія та нотатки."],
    history: ["Історія візитів", state.role === "master" ? "Історія клієнтів, які записувалися до вас." : "Усі процедури, майстри й суми по клієнтах."],
    procedures: ["Процедури", "Зв’язки між етапами та ресурсами живуть тут."],
    resources: ["Кабінети й обладнання", "Стан простору й техніки на сьогодні."],
    team: ["Команда", "Графіки майстрів визначають доступні вікна запису."]
  }[section];
  const branchOpen = !isBranchClosed();
  const action = section === "team"
    ? `${state.role === "admin" && branchOpen ? `<button class="ghost-button" data-action="add-master" type="button"><span>＋</span> Додати майстра</button><button class="ghost-button" data-action="add-admin" type="button"><span>＋</span> Додати адміністратора</button>` : ""}${branchOpen ? `<button class="primary-button" data-action="add-availability" type="button"><span>＋</span> Неробочий час</button>` : ""}`
      : section === "resources" ? (state.role === "admin" && branchOpen ? `<button class="primary-button" data-action="add-room" type="button"><span>＋</span> Додати кабінет</button>` : "")
        : ["procedures"].includes(section) && state.role !== "admin" ? "" : state.role === "admin" && branchOpen ? `<button class="primary-button" data-action="add-${section === "procedures" ? "procedure" : section}" type="button"><span>＋</span> Додати</button>` : "";
  return `<section class="directory-view"><div class="management-head"><div><div class="panel-kicker">Довідник студії</div><h2 class="panel-title">${titles[0]}</h2><p class="panel-subtitle">${titles[1]}</p></div>${action}</div>${section === "procedures" ? renderProcedures() : section === "resources" ? renderResources() : section === "team" ? renderTeam() : section === "clients" ? renderClients() : renderHistory()}</section>`;
}

function renderProcedures() {
  const procedures = getBranchItems("procedures");
  return `<div class="directory-grid"><section class="panel directory-table"><div class="table-row header"><span>Назва процедури</span><span>Нормогодини</span><span>Вартість</span><span>Керування</span></div>${procedures.length ? procedures.map((procedure) => `<div class="table-row directory-data-row"><strong>${escapeHtml(procedure.name)}<small>${escapeHtml(procedure.category)}</small></strong><span>${escapeHtml(procedure.duration)}</span><span class="price-cell">${formatMoney(procedure.price)}<small>${procedure.stages} ${procedure.stages === 1 ? "етап" : "етапи"}</small></span><span class="directory-actions">${!isBranchClosed() && state.role === "admin" ? `<button class="icon-button" data-directory-edit="procedure" data-directory-id="${escapeHtml(procedure.id)}" type="button" aria-label="Змінити процедуру">✎</button><button class="icon-button directory-delete" data-directory-delete="procedure" data-directory-id="${escapeHtml(procedure.id)}" type="button" aria-label="Видалити процедуру">×</button>` : ""}</span></div>`).join("") : `<div class="empty-directory">Поки немає процедур.</div>`}</section><section class="panel side-panel"><div class="side-panel-head"><h2 class="side-panel-title">Зв’язок етапів</h2><span class="verified">${procedures.length} налаштовано</span></div><p class="panel-subtitle" style="margin-bottom:15px">Оберіть процедуру, щоб змінити її маршрут і ресурси.</p><div class="mini-list">${procedures.slice(0, 3).map((procedure) => `<div class="mini-list-item"><span class="builder-stage-number">${String(procedure.stages).padStart(2, "0")}</span><span class="mini-list-copy"><strong>${escapeHtml(procedure.name)}</strong><span>${escapeHtml(procedure.relation)}</span></span><span class="mini-count">${formatMoney(procedure.price)}</span></div>`).join("") || `<div class="availability-empty"><strong>Додайте першу процедуру</strong><span>Маршрут з’явиться тут.</span></div>`}</div><div class="conflict-check" style="margin-top:19px">Послідовність і ресурси перевіряються сервером</div></section></div>`;
}

function renderResources() {
  const rooms = getBranchItems("rooms");
  const equipment = getBranchItems("equipment");
  return `<div class="directory-grid"><section class="panel directory-table"><div class="side-panel-head directory-inner-head"><div><h2 class="side-panel-title">Кабінети</h2><p class="panel-subtitle">Простір, у якому проходять етапи процедур.</p></div>${state.role === "admin" && !isBranchClosed() ? `<button class="side-panel-link" data-action="add-room" type="button">＋ Додати</button>` : ""}</div><div class="table-row header"><span>Кабінет</span><span>Призначення</span><span>Статус</span><span>Керування</span></div>${rooms.length ? rooms.map((room) => `<div class="table-row directory-data-row"><strong>${escapeHtml(room.name)}<small>${escapeHtml(room.detail || "Без примітки")}</small></strong><span>${escapeHtml(room.type)}</span><span class="tag">${escapeHtml(room.status)}</span><span class="directory-actions">${state.role === "admin" && !isBranchClosed() ? `<button class="icon-button" data-directory-edit="room" data-directory-id="${escapeHtml(room.name)}" type="button" aria-label="Змінити кабінет">✎</button><button class="icon-button directory-delete" data-directory-delete="room" data-directory-id="${escapeHtml(room.name)}" type="button" aria-label="Видалити кабінет">×</button>` : ""}</span></div>`).join("") : `<div class="empty-directory">Поки немає кабінетів.</div>`}</section><section class="panel resource-card"><div class="side-panel-head"><div><h2 class="side-panel-title">Обладнання</h2><p class="panel-subtitle">${equipment.length} позицій у довіднику</p></div>${state.role === "admin" && !isBranchClosed() ? `<button class="side-panel-link" data-action="add-equipment" type="button">＋ Додати</button>` : ""}</div><div class="mini-list">${equipment.length ? equipment.map((item) => `<div class="mini-list-item directory-mini-row"><span class="resource-line-copy"><span>⌘</span></span><span class="mini-list-copy"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.type)} · ${escapeHtml(item.room)}</span></span><span class="resource-line-status">${escapeHtml(item.status)}</span>${state.role === "admin" && !isBranchClosed() ? `<span class="directory-actions"><button class="icon-button" data-directory-edit="equipment" data-directory-id="${escapeHtml(item.name)}" type="button" aria-label="Змінити обладнання">✎</button><button class="icon-button directory-delete" data-directory-delete="equipment" data-directory-id="${escapeHtml(item.name)}" type="button" aria-label="Видалити обладнання">×</button></span>` : ""}</div>`).join("") : `<div class="availability-empty"><strong>Поки немає обладнання</strong><span>Додайте першу позицію.</span></div>`}</div></section></div>`;
}

function renderTeam() {
  const branchOpen = !isBranchClosed();
  const visibleSlots = getEditableUnavailableSlots().filter((slot) => slot.date === state.selectedDate);
  const branchMasters = getBranchItems("masters");
  const masterRows = state.role === "master" ? branchMasters.filter((master) => master.name === getCurrentMasterName()) : branchMasters;
  const admins = demoUsers.admin || [];
  const adminPanel = state.role === "admin" ? `<section class="panel resource-card admin-panel"><div class="side-panel-head"><div><h2 class="side-panel-title">Адміністратори</h2><p class="panel-subtitle">${admins.length} ${admins.length === 1 ? "адміністратор" : "адміністратори"} мають доступ до системи</p></div><button class="side-panel-link" data-action="add-admin" type="button">＋ Додати</button></div><div class="mini-list">${admins.length ? admins.map((admin) => `<div class="mini-list-item directory-admin-row"><div class="avatar avatar-peach">${escapeHtml(admin.initials || initials(admin.name))}</div><span class="mini-list-copy"><strong>${escapeHtml(admin.name)}${admin.id === state.user?.id ? " · ви" : ""}</strong><span>${escapeHtml(admin.email)}${admin.phone ? ` · ${escapeHtml(admin.phone)}` : ""}</span></span><span class="tag">${escapeHtml(state.branches.find((branch) => branch.id === admin.branchId)?.name || "Філія")}</span><span class="directory-actions"><button class="icon-button directory-delete" data-admin-delete="${escapeHtml(admin.id)}" type="button" aria-label="Видалити адміністратора" ${admin.id === state.user?.id ? "disabled" : ""}>×</button></span></div>`).join("") : `<div class="availability-empty"><strong>Поки немає адміністраторів</strong><span>Додайте першого адміністратора.</span></div>`}</div></section>` : "";
  return `<div class="directory-grid team-grid"><section class="panel resource-card"><div class="side-panel-head"><div><h2 class="side-panel-title">Майстри</h2><p class="panel-subtitle">${masterRows.length} ${masterRows.length === 1 ? "майстер" : "майстри"} у команді</p></div></div><div class="mini-list">${masterRows.length ? masterRows.map((master) => `<div class="mini-list-item directory-master-row"><div class="master-profile-photo">${renderMasterAvatar(master, "master-avatar-md")}</div><span class="mini-list-copy"><strong>${escapeHtml(master.name)}</strong><span>${escapeHtml(master.role)} · ${escapeHtml(master.focus)}</span></span><span class="tag">${escapeHtml(master.schedule)}</span>${state.role === "admin" && branchOpen ? `<span class="directory-actions"><button class="icon-button" data-directory-edit="master" data-directory-id="${escapeHtml(master.name)}" type="button" aria-label="Змінити майстра">✎</button><button class="icon-button directory-delete" data-directory-delete="master" data-directory-id="${escapeHtml(master.name)}" type="button" aria-label="Видалити майстра">×</button></span>` : ""}</div>`).join("") : `<div class="availability-empty"><strong>Поки немає майстрів</strong><span>Додайте першого майстра.</span></div>`}</div></section>${adminPanel}<section class="panel side-panel availability-panel"><div class="side-panel-head"><div><h2 class="side-panel-title">Неробочий час</h2><p class="panel-subtitle">${state.selectedDate === getTodayIsoDate() ? `${formatShortDate(state.selectedDate)} · сьогодні` : escapeHtml(state.selectedDate)}</p></div><span class="tag">${visibleSlots.length} ${visibleSlots.length === 1 ? "інтервал" : "інтервали"}</span></div>${visibleSlots.length ? `<div class="availability-list">${visibleSlots.map((slot) => `<div class="availability-row"><div class="availability-row-time">${escapeHtml(slot.start)}—${escapeHtml(slot.end)}</div><div class="availability-row-copy"><strong>${escapeHtml(slot.reason)}</strong><span>${renderMasterAvatar(slot.master, "master-avatar-xs")} ${escapeHtml(slot.master)}</span></div>${branchOpen ? `<button class="icon-button availability-edit" data-availability="${slot.id}" type="button" aria-label="Змінити неробочий час">✎</button>` : ""}</div>`).join("")}</div>` : `<div class="availability-empty"><strong>Немає заблокованих інтервалів</strong><span>Додайте перерву або час для відлучки.</span></div>`}${branchOpen ? `<button class="ghost-button availability-add-secondary" data-action="add-availability" type="button"><span>＋</span> Додати інтервал</button>` : ""}</section><section class="panel side-panel"><div class="side-panel-head"><h2 class="side-panel-title">Графік сьогодні</h2><span class="verified">${masterRows.length} на зміні</span></div><div class="mini-list">${masterRows.map((master) => `<div class="mini-list-item">${renderMasterAvatar(master, "master-avatar-xs")}<span class="mini-list-copy"><strong>${escapeHtml(master.name)}</strong><span>${escapeHtml(master.schedule)} · ${state.bookings.filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && !booking.archived && isActiveBooking(booking) && booking.date === state.selectedDate && booking.stages.some((stage) => stage.master === master.name)).length} записів</span></span></div>`).join("")}</div></section></div>`;
}

function renderClients() {
  const clients = getVisibleClients();
  const accessNote = state.role === "master" ? `<div class="access-note"><span>◌</span><p>Майстер бачить лише клієнтів зі своїми записами — попередніми або новими.</p></div>` : `<div class="access-note"><span>✓</span><p>Адміністратор має доступ до всіх клієнтів салону.</p></div>`;
  return `${accessNote}<section class="panel directory-table"><div class="table-row header"><span>Клієнт</span><span>Телефон</span><span>Візити</span><span>Усього</span></div>${clients.length ? clients.map((client, index) => `<button class="table-row" data-client-history="${client.id}" type="button"><strong><span class="client-table-person"><span class="avatar avatar-${["peach", "lilac", "sage"][index % 3]}">${client.initials}</span>${escapeHtml(client.name)}</span><small>${client.note ? escapeHtml(client.note) : "Постійний клієнт"}</small></strong><span>${escapeHtml(client.phone)}</span><span>${client.visits}</span><span class="price-cell">${formatMoney(client.total)}</span></button>`).join("") : `<div class="empty-directory">Поки немає клієнтів із записами до вас.</div>`}</section>`;
}

function renderHistory() {
  const history = [
    { date: "04.09", client: "Марина Соколова", service: "Glow Reset", master: "Анна Левченко + Ірина Мельник", price: 6800, status: "Підтверджено" },
    { date: "03.09", client: "Олена Романенко", service: "Манікюр + догляд", master: "Дар’я Пархоменко", price: 1900, status: "Завершено" },
    { date: "02.09", client: "Софія Кравець", service: "Архітектура брів", master: "Дар’я Пархоменко", price: 1200, status: "Завершено" },
    { date: "29.08", client: "Олександра Поліщук", service: "Кератиновий догляд", master: "Ірина Мельник", price: 2400, status: "Завершено" },
    { date: "27.08", client: "Марина Соколова", service: "LED-відновлення", master: "Ірина Мельник", price: 3200, status: "Завершено" }
  ];
  const visibleHistory = state.role === "master" ? history.filter((item) => item.master.includes(getCurrentMasterName())) : history;
  return `<section class="panel directory-table"><div class="table-row header"><span>Дата й клієнт</span><span>Процедура</span><span>Майстер</span><span>Вартість</span></div>${visibleHistory.map((item) => `<button class="table-row" data-client-history="${state.clients.find((client) => client.name === item.client)?.id || "client-001"}" type="button"><strong>${item.date}<small>${escapeHtml(item.client)}</small></strong><span>${escapeHtml(item.service)}<small>${escapeHtml(item.status)}</small></span><span>${escapeHtml(item.master)}</span><span class="price-cell">${formatMoney(item.price)}</span></button>`).join("")}</section>`;
}

function renderClientPortal() {
  const client = state.clients[0] || {
    id: state.user?.clientId || "",
    name: state.user?.name || "Клієнт",
    initials: state.user?.initials || "К",
    phone: state.user?.phone || ""
  };
  const upcoming = state.bookings.find((booking) => (!booking.branchId || booking.branchId === state.branchId) && !booking.archived && isActiveBooking(booking));
  if (!upcoming) {
    return `<section class="client-view"><section class="panel client-hero"><div class="avatar">${escapeHtml(client.initials)}</div><div class="client-hero-copy"><h2>${escapeHtml(client.name)}</h2><p>${escapeHtml(client.phone || "Ваш особистий кабінет")}</p></div><div class="client-hero-actions"><button class="ghost-button" data-action="open-settings" type="button">Мій профіль</button></div></section><section class="panel client-empty-state"><div class="portal-label">Філія · ${escapeHtml(getCurrentBranch().name)}</div><h2>У цій філії ще немає записів</h2><p>Оберіть іншу філію або зв’яжіться із салоном, щоб підібрати зручний час.</p><div class="client-empty-actions"><button class="ghost-button" data-action="open-branch-switcher" type="button">Обрати іншу філію</button><button class="primary-button" data-action="contact" type="button">Зв’язатися із салоном</button></div></section><section class="panel side-panel"><div class="portal-label">Історія</div><h2 class="side-panel-title" style="margin-top:7px">Візити з’являться тут</h2><p class="panel-subtitle" style="margin-top:7px">Після створення запису в обраній філії тут будуть доступні деталі маршруту та підтвердження.</p></section></section>`;
  }
  const bookingMasters = getBookingMasters(upcoming);
  return `<section class="client-view"><section class="panel client-hero"><div class="avatar">${escapeHtml(client.initials)}</div><div class="client-hero-copy"><h2>${escapeHtml(client.name)}</h2><p>${escapeHtml(client.phone)} · Постійний клієнт із 2024 року</p></div><div class="client-hero-actions"><button class="ghost-button" data-client-history="${client.id}" type="button">Історія візитів</button><button class="primary-button" data-action="verify" type="button"><span>✓</span> Перевірити запис</button></div></section><section class="panel upcoming-card"><div class="portal-label">Найближчий візит</div><div class="upcoming-date"><strong>${formatLongDate(upcoming.date)}</strong><span>${formatWeekday(upcoming.date)} · ${upcoming.start}</span></div><div class="master-strip"><div><div class="portal-label">Майстри вашого візиту</div><p class="master-strip-hint">Ви будете у цих майстрів за маршрутом процедури</p></div><div class="master-strip-list">${bookingMasters.map((master) => `<div class="master-strip-person">${renderMasterAvatar(master, "master-avatar-sm")}<span><strong>${escapeHtml(master.name)}</strong><small>${escapeHtml(master.role)}</small></span></div>`).join("")}</div></div><div class="booking-overview"><div class="booking-overview-top"><strong>${escapeHtml(upcoming.service)}</strong><span class="price-cell">${formatMoney(upcoming.price)}</span></div><p>Комплекс із ${upcoming.stages.length} етапів · загальна тривалість 2 години</p></div><div class="stage-list client-stage-list" style="color:var(--ink);margin-top:17px;padding-left:17px">${upcoming.stages.map((stage, index) => `<div class="stage"><div class="stage-name" style="color:var(--ink-soft)">${index + 1}. ${escapeHtml(stage.name)}</div><div class="stage-time" style="color:var(--coral-deep)">${escapeHtml(stage.start)}—${escapeHtml(stage.end)}</div><div class="stage-meta stage-master-meta" style="color:var(--muted)">${renderMasterAvatar(stage.master, "master-avatar-xs")}<span>${escapeHtml(stage.master)} · ${escapeHtml(stage.room)}</span></div></div>`).join("")}</div><div class="conflict-check">Запис підтверджено, усі ресурси зарезервовано</div></section><section class="panel client-history"><div class="side-panel-head"><div><div class="portal-label">Ваші візити</div><h2 class="side-panel-title">Історія процедур</h2></div><span class="tag">8 візитів</span></div><div class="history-list"><div class="history-row"><span class="history-date">27.08</span><span class="history-copy"><strong>LED-відновлення</strong><span>Ірина Мельник</span></span><span class="history-price">3 200 ₴</span></div><div class="history-row"><span class="history-date">14.08</span><span class="history-copy"><strong>Glow Reset</strong><span>Анна Левченко + Ірина Мельник</span></span><span class="history-price">6 800 ₴</span></div><div class="history-row"><span class="history-date">31.07</span><span class="history-copy"><strong>Кератиновий догляд</strong><span>Ірина Мельник</span></span><span class="history-price">2 400 ₴</span></div></div></section><section class="panel side-panel"><div class="portal-label">Для вас</div><h2 class="side-panel-title" style="margin-top:7px">Усе під контролем</h2><p class="panel-subtitle" style="margin-top:7px">Ми зібрали майстрів, кабінети та обладнання в один зрозумілий маршрут — вам залишається лише прийти.</p><button class="ghost-button" style="margin-top:17px" data-action="contact" type="button">Зв’язатися із салоном →</button></section></section>`;
}

function buildVisitCandidate(start, procedureIds = ["glow"]) {
  const firstStart = parseMinutes(start);
  let cursor = firstStart;
  let price = 0;
  const procedureNames = [];
  const stages = [];
  procedureIds.forEach((procedureId, procedureIndex) => {
    const procedure = getProcedure(procedureId);
    price += procedure.price;
    procedureNames.push(procedure.name);
    procedure.resourcePlan.forEach((resourceStage, stageIndex) => {
      const stageStart = cursor;
      const stageEnd = stageStart + resourceStage.duration;
      const isLastStage = stageIndex === procedure.resourcePlan.length - 1;
      cursor = stageEnd + (isLastStage ? (procedureIndex < procedureIds.length - 1 ? 5 : 0) : (resourceStage.gapAfter || 0));
      stages.push({
        name: resourceStage.name,
        start: toTime(stageStart),
        end: toTime(stageEnd),
        master: resourceStage.master,
        room: resourceStage.room,
        equipment: resourceStage.equipment,
        procedureId,
        procedureName: procedure.name,
        stageIndex
      });
    });
  });
  return {
    start,
    end: toTime(cursor),
    price,
    service: procedureNames.join(" + "),
    procedureIds: [...procedureIds],
    stages
  };
}

function buildCandidate(start, procedureId = "glow") {
  return buildVisitCandidate(start, [procedureId]);
}

function buildDraftCandidate(routeStart) {
  const stages = [];
  let price = 0;
  const procedureNames = [];
  bookingDraftProcedures.forEach((procedureId) => {
    const procedure = getProcedure(procedureId);
    const procedureCandidate = buildCandidate(getDraftProcedureStart(routeStart, procedureId), procedureId);
    price += procedure.price;
    procedureNames.push(procedure.name);
    stages.push(...procedureCandidate.stages);
  });
  const stageStarts = stages.map((stage) => parseMinutes(stage.start));
  const stageEnds = stages.map((stage) => parseMinutes(stage.end));
  return {
    start: stages.length ? toTime(Math.min(...stageStarts)) : routeStart,
    end: stages.length ? toTime(Math.max(...stageEnds)) : routeStart,
    price,
    service: procedureNames.join(" + "),
    procedureIds: [...bookingDraftProcedures],
    stages
  };
}

function conflictsFor(candidate, date, excludedBookingId = "") {
  const conflicts = [];
  candidate.stages.forEach((stage, stageIndex) => {
    candidate.stages.slice(stageIndex + 1).forEach((otherStage) => {
      if (stage.procedureId === otherStage.procedureId || !timeOverlaps(stage.start, stage.end, otherStage.start, otherStage.end)) return;
      if (stage.procedureName === otherStage.procedureName) return;
      conflicts.push(`Процедури «${stage.procedureName}» та «${otherStage.procedureName}» перетинаються`);
    });
  });
  if (parseMinutes(candidate.start) < parseMinutes(salonHours.start) || parseMinutes(candidate.end) > parseMinutes(salonHours.end)) {
    conflicts.push(`Студія працює з ${salonHours.start} до ${salonHours.end}`);
  }
  candidate.stages.forEach((stage) => {
    const master = getBranchItems("masters").find((item) => item.name === stage.master);
    if (!master) return;
    const [scheduleStart, scheduleEnd] = master.schedule.split("–");
    if (parseMinutes(stage.start) < parseMinutes(scheduleStart) || parseMinutes(stage.end) > parseMinutes(scheduleEnd)) {
      conflicts.push(`${stage.master}: робочі години ${master.schedule}`);
    }
    state.unavailableSlots.filter((slot) => (!slot.branchId || slot.branchId === state.branchId) && !slot.archived && slot.date === date && slot.master === stage.master).forEach((slot) => {
      if (timeOverlaps(stage.start, stage.end, slot.start, slot.end)) {
        conflicts.push(`${stage.master}: неробочий час ${slot.start}—${slot.end}${slot.reason ? ` (${slot.reason.toLowerCase()})` : ""}`);
      }
    });
  });
  state.bookings.filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && !booking.archived && isActiveBooking(booking) && booking.date === date && booking.id !== excludedBookingId).forEach((booking) => {
    candidate.stages.forEach((newStage) => {
      booking.stages.forEach((oldStage) => {
        const timeOverlap = parseMinutes(newStage.start) < parseMinutes(oldStage.end) && parseMinutes(newStage.end) > parseMinutes(oldStage.start);
        const sharedResource = ["master", "room", "equipment"].find((key) => newStage[key] === oldStage[key]);
        if (timeOverlap && sharedResource) conflicts.push(`${newStage.name}: ${oldStage[sharedResource]} зайнятий у ${oldStage.start}—${oldStage.end}`);
      });
    });
  });
  return [...new Set(conflicts)];
}

function buildRescheduledBooking(booking, date, start) {
  const shift = parseMinutes(start) - parseMinutes(booking.start);
  return {
    ...booking,
    date,
    start,
    end: toTime(parseMinutes(booking.end) + shift),
    stages: booking.stages.map((stage) => ({
      ...stage,
      start: toTime(parseMinutes(stage.start) + shift),
      end: toTime(parseMinutes(stage.end) + shift)
    }))
  };
}

function openRescheduleModal(bookingId) {
  if (state.role === "client" || isBranchClosed()) return;
  const booking = state.bookings.find((item) => item.id === bookingId);
  if (!booking || booking.archived || !isInCurrentBranch(booking) || (state.role === "master" && !bookingBelongsToCurrentMaster(booking))) return;
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Зміна часу візиту</div><h2 id="modal-title">Перенести запис</h2><p>${escapeHtml(booking.client)} · ${escapeHtml(booking.service)}. Усі етапи зсунуться на однаковий час.</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><form class="modal-form" id="reschedule-form" data-booking-id="${escapeHtml(booking.id)}"><div class="form-grid"><div class="form-field"><label for="reschedule-date">Нова дата</label><input id="reschedule-date" name="date" type="date" value="${escapeHtml(booking.date)}" required /></div><div class="form-field"><label for="reschedule-start">Новий початок</label><input id="reschedule-start" name="start" type="time" value="${escapeHtml(booking.start)}" step="900" required /></div></div><div class="booking-builder reschedule-builder"><div class="builder-head"><strong>Оновлений маршрут</strong><span class="builder-total" id="reschedule-total">${escapeHtml(booking.start)}—${escapeHtml(booking.end)}</span></div><div id="reschedule-stage-list"></div><div class="conflict-check" id="reschedule-check">Перевіряємо доступність ресурсів…</div></div><div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Скасувати</button><button class="primary-button" id="submit-reschedule" type="submit"><span>↗</span> Зберегти новий час</button></div></form>`;
  showModal();
  syncReschedulePreview();
}

function syncReschedulePreview() {
  const form = $("#reschedule-form");
  if (!form) return;
  const booking = state.bookings.find((item) => item.id === form.dataset.bookingId);
  if (!booking) return;
  const date = $("#reschedule-date").value;
  const start = $("#reschedule-start").value;
  const candidate = buildRescheduledBooking(booking, date, start);
  $("#reschedule-total").textContent = `${candidate.start}—${candidate.end}`;
  $("#reschedule-stage-list").innerHTML = candidate.stages.map((stage, index) => `<div class="builder-stage"><span class="builder-stage-number">0${index + 1}</span><span class="builder-stage-copy"><strong>${escapeHtml(stage.name)}</strong><span class="stage-master-line">${renderMasterAvatar(stage.master, "master-avatar-xs")} ${escapeHtml(stage.master)} · ${escapeHtml(stage.room)}</span></span><span class="builder-stage-time">${escapeHtml(stage.start)}—${escapeHtml(stage.end)}</span></div>`).join("");
  const conflicts = conflictsFor(candidate, date, booking.id);
  const check = $("#reschedule-check");
  const submit = $("#submit-reschedule");
  if (conflicts.length) {
    check.className = "conflict-check warning";
    check.textContent = `Є конфлікт: ${conflicts[0]}`;
    submit.disabled = true;
    submit.style.opacity = "0.45";
    submit.style.cursor = "not-allowed";
  } else {
    check.className = "conflict-check";
    check.textContent = "Новий час вільний для всіх ресурсів";
    submit.disabled = false;
    submit.style.opacity = "1";
    submit.style.cursor = "pointer";
  }
}

function bookingConflictsForUnavailable(slot) {
  return state.bookings
    .filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && !booking.archived && booking.date === slot.date)
    .flatMap((booking) => booking.stages
      .filter((stage) => stage.master === slot.master && timeOverlaps(slot.start, slot.end, stage.start, stage.end))
      .map((stage) => `${booking.client} має запис ${stage.start}—${stage.end}`));
}

function openBookingModal() {
  if (state.role === "client" || isBranchClosed()) return;
  bookingDraftProcedures = [];
  bookingDraftOffsets = {};
  const availableClients = getVisibleClients();
  const clientOptions = availableClients.map((client) => `<option value="${escapeHtml(client.id)}">${escapeHtml(client.name)}${client.note === "Новий клієнт" ? " · новий клієнт" : ""}</option>`).join("");
  const procedures = getBranchItems("procedures");
  const procedureOptions = procedures.map((procedure) => `<option value="${escapeHtml(procedure.id)}">${escapeHtml(procedure.name)} · ${procedure.stages} ${procedure.stages === 1 ? "етап" : "етапи"}</option>`).join("");
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Новий запис</div><h2 id="modal-title">Зібрати візит</h2><p>Оберіть процедуру, перевірте доступність і додайте її до візиту.</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><form class="modal-form" id="booking-form"><div class="form-grid"><div class="form-field full"><label for="booking-client">Клієнт</label><select id="booking-client" name="client" ${clientOptions ? "" : "disabled"}>${clientOptions || "<option>Немає доступних клієнтів</option>"}</select>${state.role === "master" ? `<small class="field-hint">Ви бачите лише клієнтів зі своїми записами.</small>` : ""}</div><div class="form-field full"><label for="booking-procedure">Процедура для додавання</label><div class="procedure-picker"><select id="booking-procedure" name="procedure" ${procedures.length ? "" : "disabled"}>${procedureOptions || "<option>У цій філії ще немає процедур</option>"}</select><button class="ghost-button add-procedure-button" data-action="add-procedure-to-visit" type="button" ${procedures.length ? "" : "disabled"}><span>＋</span> Додати до візиту</button></div><small class="field-hint">Після додавання процедура з’явиться в таймлайні нижче. Там її можна видалити або перемістити.</small><div id="booking-master-preference"></div></div><div class="form-field"><label for="booking-date">Дата</label><input id="booking-date" name="date" type="date" value="${escapeHtml(state.selectedDate)}" required /></div><div class="form-field"><label for="booking-start">Початок маршруту</label><input id="booking-start" name="start" type="time" value="12:00" step="900" required /></div></div><section class="procedure-timeline-panel" id="booking-procedure-timeline" aria-live="polite" aria-labelledby="procedure-timeline-title"></section><div class="booking-builder"><div class="builder-head"><strong>Маршрут доданих процедур</strong><span class="builder-total" id="builder-total">Додайте процедуру</span></div><div id="builder-stage-list"></div><div class="conflict-check warning" id="booking-check">Додайте хоча б одну процедуру до візиту</div></div><div class="form-field full" style="margin-top:14px"><label for="booking-note">Нотатка для команди</label><textarea id="booking-note" name="note" placeholder="Наприклад: повторити минулий протокол догляду"></textarea></div><div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Скасувати</button><button class="primary-button" id="submit-booking" type="submit" ${clientOptions && procedures.length ? "" : "disabled"}><span>＋</span> Зберегти запис</button></div></form>`;
  showModal();
  syncBookingBuilder();
}

function openAvailabilityModal(slotId = "") {
  if (state.role === "client" || isBranchClosed()) return;
  const slot = getEditableUnavailableSlots().find((item) => item.id === slotId);
  if (slotId && !slot) return;
  const isEditing = Boolean(slot);
  const masterOptions = state.role === "master" ? getBranchItems("masters").filter((master) => master.name === getCurrentMasterName()) : getBranchItems("masters");
  const selectedMaster = slot?.master || masterOptions[0]?.name || getCurrentMasterName();
  const reasons = ["Перерва", "Відлучка", "Особиста справа", "Інше"];
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Розклад майстра</div><h2 id="modal-title">${isEditing ? "Змінити неробочий час" : "Додати неробочий час"}</h2><p>Цей інтервал буде виключено з доступного часу для нових записів.</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><form class="modal-form" id="availability-form" data-availability-id="${slot?.id || ""}"><div class="form-grid"><div class="form-field full"><label for="availability-master">Майстер</label><select id="availability-master" name="master" ${state.role === "master" ? "disabled" : ""}>${masterOptions.map((master) => `<option value="${escapeHtml(master.name)}" ${master.name === selectedMaster ? "selected" : ""}>${escapeHtml(master.name)} · ${escapeHtml(master.role)}</option>`).join("")}</select>${state.role === "master" ? `<input type="hidden" name="master" value="${escapeHtml(getCurrentMasterName())}" />` : ""}</div><div class="form-field"><label for="availability-date">Дата</label><input id="availability-date" name="date" type="date" value="${escapeHtml(slot?.date || state.selectedDate)}" required /></div><div class="form-field"><label for="availability-reason">Причина</label><select id="availability-reason" name="reason">${reasons.map((reason) => `<option value="${escapeHtml(reason)}" ${reason === (slot?.reason || "Перерва") ? "selected" : ""}>${escapeHtml(reason)}</option>`).join("")}</select></div><div class="form-field"><label for="availability-start">Початок</label><input id="availability-start" name="start" type="time" value="${escapeHtml(slot?.start || "12:00")}" step="900" required /></div><div class="form-field"><label for="availability-end">Завершення</label><input id="availability-end" name="end" type="time" value="${escapeHtml(slot?.end || "12:30")}" step="900" required /></div></div><div class="availability-form-note"><span>i</span><p>Години студії: ${salonHours.start}—${salonHours.end}. Запис поверх цього часу система не дозволить.</p></div><div class="modal-actions">${isEditing ? `<button class="danger-button" data-availability-delete="${slot.id}" type="button">Видалити</button>` : ""}<button class="ghost-button" data-close-modal type="button">Скасувати</button><button class="primary-button" type="submit"><span>✓</span> ${isEditing ? "Зберегти зміни" : "Заблокувати час"}</button></div></form>`;
  showModal();
}

function syncBookingBuilder() {
  const start = $("#booking-start")?.value || "12:00";
  const date = $("#booking-date")?.value || state.selectedDate;
  const procedureId = $("#booking-procedure")?.value || "glow";
  const clientId = $("#booking-client")?.value || state.clients[0]?.id;
  const confirmedNewMaster = $("#booking-new-master-confirm")?.checked || false;
  const candidate = bookingDraftProcedures.length ? buildDraftCandidate(start) : null;
  $("#booking-master-preference").innerHTML = bookingDraftProcedures.length ? renderProcedurePreference(clientId, procedureId, bookingDraftProcedures) : "";
  const confirmationInput = $("#booking-new-master-confirm");
  if (confirmationInput) confirmationInput.checked = confirmedNewMaster;
  renderProcedureTimeline(date, candidate, clientId);
  $("#builder-stage-list").innerHTML = candidate
    ? candidate.stages.map((stage, index) => `<div class="builder-stage"><span class="builder-stage-number">${String(index + 1).padStart(2, "0")}</span><span class="builder-stage-copy">${candidate.procedureIds.length > 1 ? `<small class="builder-stage-procedure">${escapeHtml(stage.procedureName)}</small>` : ""}<strong>${escapeHtml(stage.name)}</strong><span>${escapeHtml(stage.master)} · ${escapeHtml(stage.room)} · ${escapeHtml(stage.equipment)}</span></span><span class="builder-stage-time">${stage.start}—${stage.end}</span></div>`).join("")
    : `<div class="builder-empty">Додайте процедуру — тут з’явиться її маршрут, майстер, кабінет і обладнання.</div>`;
  if (candidate) {
    const duration = parseMinutes(candidate.end) - parseMinutes(candidate.start);
    $("#builder-total").textContent = `${Math.floor(duration / 60)} год ${String(duration % 60).padStart(2, "0")} хв · ${formatMoney(candidate.price)}`;
  } else {
    $("#builder-total").textContent = "Додайте процедуру";
  }
  const conflicts = candidate ? conflictsFor(candidate, date) : [];
  const requiresNewMasterConfirmation = getDraftNewProcedureMasters(clientId).length > 0;
  const check = $("#booking-check");
  const submit = $("#submit-booking");
  if (!candidate) {
    check.className = "conflict-check warning";
    check.textContent = "Додайте хоча б одну процедуру до візиту";
    submit.disabled = true;
    submit.style.opacity = "0.45";
    submit.style.cursor = "not-allowed";
  } else if (conflicts.length) {
    check.className = "conflict-check warning";
    check.textContent = `Є конфлікт: ${conflicts[0]}`;
    submit.disabled = true;
    submit.style.opacity = "0.45";
    submit.style.cursor = "not-allowed";
  } else if (requiresNewMasterConfirmation && !confirmedNewMaster) {
    check.className = "conflict-check warning";
    check.textContent = "Підтвердіть новий для клієнта етап маршруту";
    submit.disabled = true;
    submit.style.opacity = "0.45";
    submit.style.cursor = "not-allowed";
  } else {
    check.className = "conflict-check";
    check.textContent = "Маршрут процедури доступний для запису";
    submit.disabled = false;
    submit.style.opacity = "1";
    submit.style.cursor = "pointer";
  }
}

function openBookingDetails(bookingId) {
  const booking = state.bookings.find((item) => item.id === bookingId);
  if (!booking || booking.archived || !isInCurrentBranch(booking) || (state.role === "master" && !bookingBelongsToCurrentMaster(booking))) return;
  const client = getClient(booking.clientId);
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">${booking.status === "confirmed" ? "Підтверджено" : "Очікує підтвердження"}</div><h2 id="modal-title">${escapeHtml(booking.client)}</h2><p>${escapeHtml(booking.service)} · ${escapeHtml(booking.date)} · ${escapeHtml(booking.start)}—${escapeHtml(booking.end)}</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><div class="modal-form"><div class="booking-builder" style="margin-top:0"><div class="builder-head"><strong>Етапи візиту</strong><span class="builder-total">${formatMoney(booking.price)}</span></div>${booking.stages.map((stage, index) => `<div class="builder-stage"><span class="builder-stage-number">0${index + 1}</span><span class="builder-stage-copy"><strong>${escapeHtml(stage.name)}</strong><span class="stage-master-line">${renderMasterAvatar(stage.master, "master-avatar-xs")} ${escapeHtml(stage.master)} · ${escapeHtml(stage.room)} · ${escapeHtml(stage.equipment)}</span></span><span class="builder-stage-time">${escapeHtml(stage.start)}—${escapeHtml(stage.end)}</span></div>`).join("")}<div class="conflict-check">Ресурси зарезервовано, перетинів немає</div></div><div class="client-hero" style="margin-top:14px;padding:14px;background:var(--cream);border-radius:12px"><div class="avatar">${escapeHtml(client.initials)}</div><div class="client-hero-copy"><h2 style="font-size:19px">Історія клієнта</h2><p>${client.visits} візитів · ${formatMoney(client.total)} за весь час</p></div><button class="ghost-button" data-client-history="${client.id}" type="button">Відкрити</button></div><div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Закрити</button>${state.role !== "client" ? `<button class="primary-button" data-reschedule-booking="${escapeHtml(booking.id)}" type="button"><span>↗</span> Перенести запис</button>` : ""}<button class="primary-button" data-action="confirm-booking" type="button"><span>✓</span> Підтвердити</button></div></div>`;
  showModal();
  if (state.role !== "client" && isActiveBooking(booking)) {
    $(".modal-actions")?.insertAdjacentHTML("afterbegin", `<button class="danger-button" data-cancel-booking="${escapeHtml(booking.id)}" type="button">Скасувати запис</button>`);
  }
}

async function cancelBooking(bookingId) {
  if (state.role === "client" || isBranchClosed()) return;
  const booking = state.bookings.find((item) => item.id === bookingId);
  if (!booking || booking.archived || !isActiveBooking(booking) || !isInCurrentBranch(booking) || (state.role === "master" && !bookingBelongsToCurrentMaster(booking))) return;
  if (!window.confirm(`Скасувати запис для ${booking.client}? Ресурси звільняться для інших записів.`)) return;
  try {
    let savedBooking = { ...booking, status: "cancelled" };
    if (apiReady) {
      const response = await apiRequest(`/bookings/${encodeURIComponent(booking.id)}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "cancelled" })
      });
      savedBooking = response.booking;
    }
    Object.assign(booking, savedBooking);
    closeModal();
    render();
    showToast(`Запис для ${booking.client} скасовано.`);
  } catch (error) {
    showToast(`Не вдалося скасувати запис: ${apiErrorMessage(error)}`);
  }
}

function openClientHistory(clientId) {
  const client = getClient(clientId);
  if (!client || (state.role === "master" && !getVisibleClients().some((item) => item.id === client.id))) return;
  const clientBookings = state.bookings.filter((booking) => (!booking.branchId || booking.branchId === state.branchId) && booking.clientId === client.id && (state.role !== "master" || bookingBelongsToCurrentMaster(booking)));
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Картка клієнта</div><h2 id="modal-title">${escapeHtml(client.name)}</h2><p>${escapeHtml(client.phone)} · ${client.visits} візитів · ${formatMoney(client.total)}</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><div class="modal-form"><div class="client-hero" style="padding:14px;background:var(--cream);border-radius:12px"><div class="avatar">${client.initials}</div><div class="client-hero-copy"><h2 style="font-size:19px">Нотатка команди</h2><p>${escapeHtml(client.note || "Поки немає нотаток про клієнта.")}</p></div></div><div class="history-list">${clientBookings.length ? clientBookings.map((booking) => `<div class="history-row"><span class="history-date">${formatShortDate(booking.date)}</span><span class="history-copy"><strong>${escapeHtml(booking.service)}</strong><span>${booking.stages.map((stage) => escapeHtml(stage.master)).join(" + ")}</span></span><span class="history-price">${formatMoney(booking.price)}</span></div>`).join("") : `<p class="panel-subtitle">Історія з’явиться після першого візиту.</p>`}</div><div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Закрити</button><button class="primary-button" data-action="new-booking-from-history" type="button"><span>＋</span> Новий запис</button></div></div>`;
  showModal();
}

function showModal() {
  $("#modal-backdrop").hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => $(".close-modal")?.focus(), 0);
}

function closeModal() {
  $("#modal-backdrop").hidden = true;
  document.body.style.overflow = "";
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  $("#toast-region").append(toast);
  setTimeout(() => toast.remove(), 3300);
}

function handleSection(section) {
  if (!state.authenticated) return;
  if (state.role === "client" && !["client", "settings"].includes(section)) return;
  document.body.classList.remove("mobile-menu-open");
  state.section = section;
  render();
}

document.addEventListener("pointerdown", (event) => {
  const pendingBlock = event.target.closest?.("[data-pending-block]");
  if (pendingBlock) startTimelineDrag(event, pendingBlock);
}, { passive: false });

document.addEventListener("pointermove", (event) => {
  if (!timelineDrag || event.pointerId !== timelineDrag.pointerId) return;
  event.preventDefault();
  updateTimelineDrag(event.clientX);
}, { passive: false });

document.addEventListener("pointerup", (event) => {
  if (timelineDrag && event.pointerId === timelineDrag.pointerId) finishTimelineDrag();
});

document.addEventListener("pointercancel", (event) => {
  if (timelineDrag && event.pointerId === timelineDrag.pointerId) finishTimelineDrag(false);
});

document.addEventListener("click", async (event) => {
  const authRoleButton = event.target.closest("[data-auth-role]");
  if (authRoleButton) {
    authRoleDraft = authRoleButton.dataset.authRole;
    renderLoginScreen();
    return;
  }
  const branchCloseButton = event.target.closest("[data-branch-close]");
  if (branchCloseButton) {
    await closeBranch(branchCloseButton.dataset.branchClose);
    return;
  }
  const branchDeleteButton = event.target.closest("[data-branch-delete]");
  if (branchDeleteButton) {
    await deleteBranch(branchDeleteButton.dataset.branchDelete);
    return;
  }
  const branchSelectButton = event.target.closest("[data-branch-select]");
  if (branchSelectButton) {
    await switchBranch(branchSelectButton.dataset.branchSelect);
    return;
  }
  const sectionButton = event.target.closest("[data-section]");
  if (sectionButton) {
    handleSection(sectionButton.dataset.section);
    return;
  }
  const sectionLink = event.target.closest("[data-section-link]");
  if (sectionLink) {
    handleSection(sectionLink.dataset.sectionLink);
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "toggle-mobile-menu") {
    document.body.classList.toggle("mobile-menu-open");
    return;
  }
  const directoryEditButton = event.target.closest("[data-directory-edit]");
  if (directoryEditButton) {
    openDirectoryModal(directoryEditButton.dataset.directoryEdit, directoryEditButton.dataset.directoryId);
    return;
  }
  const directoryDeleteButton = event.target.closest("[data-directory-delete]");
  if (directoryDeleteButton) {
    await deleteDirectoryEntity(directoryDeleteButton.dataset.directoryDelete, directoryDeleteButton.dataset.directoryId);
    return;
  }
  const adminDeleteButton = event.target.closest("[data-admin-delete]");
  if (adminDeleteButton) {
    await deleteAdmin(adminDeleteButton.dataset.adminDelete);
    return;
  }
  const availabilityButton = event.target.closest("[data-availability]");
  if (availabilityButton) {
    openAvailabilityModal(availabilityButton.dataset.availability);
    return;
  }
  const availabilityDeleteButton = event.target.closest("[data-availability-delete]");
  if (availabilityDeleteButton) {
    const slot = getEditableUnavailableSlots().find((item) => item.id === availabilityDeleteButton.dataset.availabilityDelete);
    if (!slot) return;
    if (!window.confirm(`Видалити неробочий час ${slot.start}—${slot.end}?`)) return;
    if (apiReady) {
      try {
        await apiRequest(`/availability/${encodeURIComponent(slot.id)}`, { method: "DELETE" });
      } catch (error) {
        showToast(`Не вдалося видалити інтервал: ${apiErrorMessage(error)}`);
        return;
      }
    }
    state.unavailableSlots = state.unavailableSlots.filter((item) => item.id !== slot.id);
    closeModal();
    render();
    showToast("Неробочий інтервал видалено.");
    return;
  }
  const rescheduleButton = event.target.closest("[data-reschedule-booking]");
  if (rescheduleButton) {
    openRescheduleModal(rescheduleButton.dataset.rescheduleBooking);
    return;
  }
  const cancelBookingButton = event.target.closest("[data-cancel-booking]");
  if (cancelBookingButton) {
    await cancelBooking(cancelBookingButton.dataset.cancelBooking);
    return;
  }
  const bookingButton = event.target.closest("[data-booking]");
  if (bookingButton) {
    openBookingDetails(bookingButton.dataset.booking);
    return;
  }
  const calendarDateCell = event.target.closest("[data-calendar-date]");
  if (calendarDateCell) {
    state.selectedDate = calendarDateCell.dataset.calendarDate;
    render();
    return;
  }
  const clientButton = event.target.closest("[data-client-history]");
  if (clientButton) {
    openClientHistory(clientButton.dataset.clientHistory);
    return;
  }
  const removeProcedureButton = event.target.closest("[data-remove-visit-procedure]");
  if (removeProcedureButton) {
    const confirmationInput = $("#booking-new-master-confirm");
    if (confirmationInput) confirmationInput.checked = false;
    const procedureId = removeProcedureButton.dataset.removeVisitProcedure;
    bookingDraftProcedures = bookingDraftProcedures.filter((draftProcedureId) => draftProcedureId !== procedureId);
    bookingDraftOffsets = {};
    syncBookingBuilder();
    return;
  }
  if (event.target.closest("#new-booking-button")) {
    openBookingModal();
    return;
  }
  if (event.target.closest("[data-close-modal]") || event.target.id === "modal-backdrop") {
    closeModal();
    return;
  }
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    state.view = viewButton.dataset.view;
    render();
    return;
  }
  const shiftButton = event.target.closest("[data-date-shift]");
  if (shiftButton) {
    state.selectedDate = shiftScheduleDate(state.selectedDate, Number(shiftButton.dataset.dateShift));
    render();
    return;
  }
  if (action === "open-branch-switcher") {
    openBranchSwitcher();
  } else if (action === "open-settings") {
    state.section = "settings";
    render();
  } else if (action === "logout") {
    await logoutFromSystem();
  } else if (action === "go-to-today") {
    state.selectedDate = getTodayIsoDate();
    render();
  } else if (action === "add-procedure-to-visit") {
    const procedureId = $("#booking-procedure")?.value;
    const procedure = procedureId ? getProcedure(procedureId) : null;
    if (!procedure) return;
    if (bookingDraftProcedures.includes(procedureId)) {
      showToast("Ця процедура вже додана до візиту.");
      return;
    }
    const confirmationInput = $("#booking-new-master-confirm");
    if (confirmationInput) confirmationInput.checked = false;
    const routeStart = $("#booking-start")?.value || "12:00";
    const nextOffset = getNextDraftProcedureOffset(routeStart);
    bookingDraftProcedures.push(procedureId);
    bookingDraftOffsets[procedureId] = nextOffset;
    syncBookingBuilder();
    showToast(`Процедуру «${procedure.name}» додано до візиту.`);
  } else if (action === "add-availability") {
    openAvailabilityModal();
  } else if (action === "add-admin") {
    openAdminModal();
  } else if (["add-master", "add-room", "add-equipment", "add-procedure"].includes(action)) {
    openDirectoryModal({ "add-master": "master", "add-room": "room", "add-equipment": "equipment", "add-procedure": "procedure" }[action]);
  } else if (action === "add-procedure-stage") {
    syncProcedureDraft();
    directoryDraftStages.push({ name: "", duration: 60, master: getBranchItems("masters")[0]?.name || "", room: getBranchItems("rooms")[0]?.name || "", equipment: getBranchItems("equipment")[0]?.name || "", gapAfter: 0 });
    const form = $("#directory-form");
    openDirectoryModal("procedure", form?.dataset.directoryId || "", true);
  } else if (action === "remove-procedure-stage") {
    syncProcedureDraft();
    directoryDraftStages.splice(Number(event.target.closest("[data-stage-index]")?.dataset.stageIndex || 0), 1);
    const form = $("#directory-form");
    openDirectoryModal("procedure", form?.dataset.directoryId || "", true);
  } else if (action === "verify") {
    showToast("Запис підтверджено. Усі ресурси закріплено за вами.");
  } else if (action === "contact") {
    showToast("Адміністратор побачить ваш запит і зв’яжеться з вами.");
  } else if (action === "show-pending") {
    showToast("Два візити очікують підтвердження адміністратора.");
  } else if (action?.startsWith("add-")) {
    showToast("У повній версії тут відкриється форма нового елемента довідника.");
  } else if (action === "confirm-booking") {
    showToast("Запис підтверджено, ресурси зарезервовано.");
    closeModal();
  } else if (action === "new-booking-from-history") {
    openBookingModal();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "directory-photo-file") {
    const file = event.target.files?.[0];
    const preview = $("#directory-photo-preview");
    if (file && preview) {
      const objectUrl = URL.createObjectURL(file);
      preview.innerHTML = `<img src="${objectUrl}" alt="Попередній перегляд фото" />`;
      preview.dataset.previewUrl = objectUrl;
    }
    return;
  }
  if (event.target.id === "login-user" && authRoleDraft === "master") {
    const selected = event.target.selectedOptions[0];
    const branchId = selected?.dataset.branchId || "branch-podil";
    const branch = state.branches.find((item) => item.id === branchId);
    const branchInput = $("#login-master-branch-id");
    const branchLabel = $("#login-master-branch");
    if (branchInput) branchInput.value = branchId;
    if (branchLabel) branchLabel.textContent = branch?.name || "Основна філія";
  }
  if (event.target.id === "schedule-date") {
    state.selectedDate = event.target.value || getTodayIsoDate();
    render();
    return;
  }
  if (event.target.id === "master-filter") {
    state.filterMaster = event.target.value;
    render();
  }
  if (event.target.id === "room-filter") {
    state.filterRoom = event.target.value;
    render();
  }
  if (["booking-client", "booking-procedure"].includes(event.target.id)) {
    const confirmationInput = $("#booking-new-master-confirm");
    if (confirmationInput) confirmationInput.checked = false;
  }
  if (["booking-client", "booking-start", "booking-date", "booking-procedure", "booking-new-master-confirm"].includes(event.target.id)) syncBookingBuilder();
  if (["reschedule-start", "reschedule-date"].includes(event.target.id)) syncReschedulePreview();
});

document.addEventListener("submit", async (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault();
    await loginFromForm(event.target);
    return;
  }
  if (event.target.id === "admin-form") {
    event.preventDefault();
    if (state.role !== "admin") return;
    const data = new FormData(event.target);
    const payload = { name: data.get("name"), email: data.get("email"), phone: data.get("phone"), branchId: data.get("branchId"), password: data.get("password") };
    try {
      let admin = { ...payload, id: `admin-${Date.now()}`, role: "admin", initials: initials(String(payload.name)) };
      if (apiReady) {
        const response = await apiRequest("/admins", { method: "POST", body: JSON.stringify(payload) });
        admin = response.admin;
        await refreshLoginUsers();
      } else {
        demoUsers.admin.push(admin);
        demoPasswords[admin.id] = payload.password;
      }
      if (!apiReady) demoUsers.admin = [...demoUsers.admin];
      closeModal();
      render();
      showToast(`Адміністратора «${admin.name}» додано.`);
    } catch (error) {
      showToast(`Не вдалося додати адміністратора: ${apiErrorMessage(error)}`);
    }
    return;
  }
  if (event.target.id === "branch-create-form") {
    event.preventDefault();
    if (state.role !== "admin") return;
    const data = new FormData(event.target);
    const hours = String(data.get("hours") || "09:00–19:00").split("–");
    const payload = { name: data.get("name"), city: data.get("city"), address: data.get("address"), phone: data.get("phone"), hoursStart: hours[0], hoursEnd: hours[1] || "19:00" };
    try {
      let branch = { ...payload, id: `branch-${Date.now()}`, status: "open", closedAt: "", isClosed: false };
      if (apiReady) {
        const response = await apiRequest("/branches", { method: "POST", body: JSON.stringify(payload) });
        branch = response.branch;
      }
      state.branches.push(branch);
      cacheBranches(state.branches);
      await switchBranch(branch.id);
      showToast(`Філію «${branch.name}» створено.`);
    } catch (error) {
      showToast(`Не вдалося створити філію: ${apiErrorMessage(error)}`);
    }
    return;
  }
  if (event.target.id === "profile-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = { name: data.get("name"), phone: data.get("phone") };
    try {
      let user = { ...state.user, ...payload, initials: String(payload.name).split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() };
      if (apiReady) {
        const response = await apiRequest("/auth/profile", { method: "PATCH", body: JSON.stringify(payload) });
        user = { ...user, ...response.user };
      }
      applySessionUser(user);
      render();
      showToast("Профіль оновлено.");
    } catch (error) {
      showToast(`Не вдалося зберегти профіль: ${apiErrorMessage(error)}`);
    }
    return;
  }
  if (event.target.id === "password-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = { currentPassword: data.get("currentPassword"), newPassword: data.get("newPassword"), confirmPassword: data.get("confirmPassword") };
    try {
      if (apiReady) {
        await apiRequest("/auth/password", { method: "POST", body: JSON.stringify(payload) });
      } else {
        const userId = state.user?.id;
        if (!userId || demoPasswords[userId] !== payload.currentPassword) throw { error: "Поточний пароль введено неправильно." };
        if (String(payload.newPassword).length < 6) throw { error: "Новий пароль має містити щонайменше 6 символів." };
        if (payload.newPassword !== payload.confirmPassword) throw { error: "Новий пароль і підтвердження не збігаються." };
        if (payload.newPassword === payload.currentPassword) throw { error: "Новий пароль має відрізнятися від поточного." };
        demoPasswords[userId] = payload.newPassword;
      }
      event.target.reset();
      showToast("Пароль успішно змінено.");
    } catch (error) {
      showToast(`Не вдалося змінити пароль: ${apiErrorMessage(error)}`);
    }
    return;
  }
  if (event.target.id === "directory-form") {
    event.preventDefault();
    if (state.role !== "admin") return;
    const form = event.target;
    const entity = form.dataset.entity;
    const id = form.dataset.directoryId;
    const data = new FormData(form);
    let payload = {};
    if (entity === "master") {
      const currentMaster = getBranchItems("masters").find((item) => item.name === id);
      let photo = currentMaster?.photo || "";
      const photoFile = data.get("photoFile");
      if (photoFile && photoFile.size) photo = await fileToPhotoData(photoFile);
      payload = { name: data.get("name"), role: data.get("role"), email: data.get("email"), phone: data.get("phone"), schedule: data.get("schedule"), color: data.get("color"), focus: data.get("focus"), photo, password: data.get("password") };
    } else if (entity === "room") {
      payload = { name: data.get("name"), type: data.get("type"), status: data.get("status"), detail: data.get("detail") };
    } else if (entity === "equipment") {
      payload = { name: data.get("name"), type: data.get("type"), room: data.get("room"), status: data.get("status") };
    } else {
      payload = { name: data.get("name"), category: data.get("category"), price: Number(data.get("price")), resourcePlan: readProcedureStages(form) };
    }
    try {
      let saved;
      if (apiReady) {
        const response = await apiRequest(directoryApiPath(entity, id), { method: id ? "PATCH" : "POST", body: JSON.stringify(payload) });
        saved = response[entity];
        await reloadBootstrap();
        if (entity === "master") await refreshLoginUsers();
      } else {
        const collection = { master: "masters", room: "rooms", equipment: "equipment", procedure: "procedures" }[entity];
        saved = entity === "procedure"
          ? { ...payload, branchId: state.branchId, id: id || `procedure-${Date.now()}`, duration: `${payload.resourcePlan.reduce((total, stage) => total + Number(stage.duration || 0), 0)} хв`, stages: payload.resourcePlan.length, relation: `${new Set(payload.resourcePlan.map((stage) => stage.master)).size} майстри · ${new Set(payload.resourcePlan.map((stage) => stage.room)).size} кабінети` }
          : { ...payload, branchId: state.branchId, ...(entity === "master" ? { initials: initials(String(payload.name)), color: payload.color || "peach" } : {}) };
        const current = state[collection].find((item) => entity === "procedure" ? item.id === id : item.name === id);
        if (current) Object.assign(current, saved);
        else state[collection].push(saved);
        if (entity === "master" && !id) {
          const userId = `master-${Date.now()}`;
          demoUsers.master.push({ id: userId, name: saved.name, role: "master", initials: saved.initials, email: payload.email, masterName: saved.name, branchId: state.branchId });
          demoPasswords[userId] = payload.password;
        }
      }
      directoryDraftMeta = null;
      directoryDraftStages = [];
      closeModal();
      render();
      showToast(id ? `${directoryEntityLabel(entity)[0].toUpperCase()}${directoryEntityLabel(entity).slice(1)} оновлено.` : `${directoryEntityLabel(entity)[0].toUpperCase()}${directoryEntityLabel(entity).slice(1)} додано.`);
    } catch (error) {
      showToast(`Не вдалося зберегти ${directoryEntityLabel(entity)}: ${apiErrorMessage(error)}`);
    }
    return;
  }
  if (event.target.id === "reschedule-form") {
    event.preventDefault();
    const booking = state.bookings.find((item) => item.id === event.target.dataset.bookingId);
    if (!booking || state.role === "client" || (state.role === "master" && !bookingBelongsToCurrentMaster(booking))) return;
    const data = new FormData(event.target);
    const candidate = buildRescheduledBooking(booking, data.get("date"), data.get("start"));
    const conflicts = conflictsFor(candidate, candidate.date, booking.id);
    if (conflicts.length) {
      showToast(`Не вдалося перенести: ${conflicts[0]}.`);
      return;
    }
    let savedBooking = candidate;
    if (apiReady) {
      try {
        const response = await apiRequest(`/bookings/${encodeURIComponent(booking.id)}`, {
          method: "PATCH",
          body: JSON.stringify(candidate)
        });
        savedBooking = response.booking;
      } catch (error) {
        showToast(`Не вдалося перенести: ${apiErrorMessage(error)}`);
        return;
      }
    }
    Object.assign(booking, savedBooking);
    state.selectedDate = candidate.date;
    closeModal();
    render();
    showToast(`Запис для ${booking.client} перенесено на ${candidate.date} о ${candidate.start}.`);
    return;
  }
  if (event.target.id === "availability-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    const slotId = event.target.dataset.availabilityId;
    const masterName = state.role === "master" ? getCurrentMasterName() : data.get("master");
    const slot = { id: slotId || `unavailable-${Date.now()}`, date: data.get("date"), master: masterName, start: data.get("start"), end: data.get("end"), reason: data.get("reason"), createdBy: state.role };
    const master = getBranchItems("masters").find((item) => item.name === slot.master);
    if (!master) {
      showToast("Оберіть майстра для цього інтервалу.");
      return;
    }
    if (state.role === "master" && slot.master !== getCurrentMasterName()) {
      showToast("Майстер може змінювати лише власний неробочий час.");
      return;
    }
    if (parseMinutes(slot.start) >= parseMinutes(slot.end)) {
      showToast("Час завершення має бути пізніше за час початку.");
      return;
    }
    if (parseMinutes(slot.start) < parseMinutes(salonHours.start) || parseMinutes(slot.end) > parseMinutes(salonHours.end)) {
      showToast(`Інтервал має бути в межах ${salonHours.start}—${salonHours.end}.`);
      return;
    }
    const duplicate = state.unavailableSlots.some((item) => (!item.branchId || item.branchId === state.branchId) && item.id !== slotId && item.date === slot.date && item.master === slot.master && timeOverlaps(slot.start, slot.end, item.start, item.end));
    if (duplicate) {
      showToast("Цей неробочий час уже перетинається з іншим інтервалом.");
      return;
    }
    const bookingConflicts = bookingConflictsForUnavailable(slot);
    if (bookingConflicts.length) {
      showToast(`Неможливо заблокувати час: ${bookingConflicts[0]}.`);
      return;
    }
    let savedSlot = slot;
    if (apiReady) {
      try {
        const response = await apiRequest(slotId ? `/availability/${encodeURIComponent(slotId)}` : "/availability", {
          method: slotId ? "PATCH" : "POST",
          body: JSON.stringify(slot)
        });
        savedSlot = response.slot;
      } catch (error) {
        showToast(`Не вдалося зберегти інтервал: ${apiErrorMessage(error)}`);
        return;
      }
    }
    if (slotId) {
      const existing = getEditableUnavailableSlots().find((item) => item.id === slotId);
      if (!existing) return;
      Object.assign(existing, savedSlot);
    } else {
      state.unavailableSlots.push(savedSlot);
    }
    state.selectedDate = slot.date;
    closeModal();
    render();
    showToast(slotId ? "Неробочий інтервал оновлено." : "Неробочий інтервал додано до розкладу.");
    return;
  }
  if (event.target.id !== "booking-form") return;
  event.preventDefault();
  if (state.role === "client") return;
  const data = new FormData(event.target);
  const procedureIds = [...bookingDraftProcedures];
  if (!procedureIds.length) {
    showToast("Спочатку додайте хоча б одну процедуру до візиту.");
    return;
  }
  const candidate = buildDraftCandidate(data.get("start"));
  const conflicts = conflictsFor(candidate, data.get("date"));
  if (conflicts.length) {
    showToast("Не вдалося зберегти: знайдено конфлікт ресурсу.");
    return;
  }
  if (getDraftNewProcedureMasters(data.get("client"), procedureIds).length > 0 && !$("#booking-new-master-confirm")?.checked) {
    showToast("Підтвердіть новий для клієнта етап маршруту.");
    return;
  }
  const client = getClient(data.get("client"));
  const draftBooking = { id: `visit-${Date.now()}`, date: data.get("date"), branchId: state.branchId, clientId: client.id, client: client.name, phone: client.phone, service: candidate.service, kind: candidate.stages.length > 1 ? "complex" : "single", start: candidate.start, end: candidate.end, price: candidate.price, status: "booked", stages: candidate.stages };
  let savedBooking = draftBooking;
  if (apiReady) {
    try {
      const response = await apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify(draftBooking)
      });
      savedBooking = response.booking;
    } catch (error) {
      showToast(`Не вдалося зберегти запис: ${apiErrorMessage(error)}`);
      return;
    }
  }
  state.bookings.push(savedBooking);
  client.masterNames = [...new Set([...(client.masterNames || []), ...savedBooking.stages.map((stage) => stage.master)])];
  state.selectedDate = data.get("date");
  closeModal();
  render();
  showToast(`Запис для ${client.name} додано до розкладу.`);
});

document.addEventListener("keydown", (event) => {
  const pendingBlock = event.target.closest?.("[data-pending-block]");
  if (pendingBlock && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    const startInput = $("#booking-start");
    const procedureId = pendingBlock.dataset.pendingProcedure;
    if (startInput && procedureId) {
      const deltaMinutes = event.key === "ArrowLeft" ? -15 : 15;
      const routeStart = startInput.value;
      const currentStart = getDraftProcedureStart(routeStart, procedureId);
      const preview = clampProcedureStart(currentStart, procedureId, deltaMinutes);
      if (bookingDraftProcedures[0] === procedureId) {
        startInput.value = preview.start;
        bookingDraftOffsets[procedureId] = 0;
      } else {
        bookingDraftOffsets[procedureId] = parseMinutes(preview.start) - parseMinutes(routeStart);
      }
      syncBookingBuilder();
    }
    return;
  }
  if (event.key === "Escape" && !$("#modal-backdrop").hidden) closeModal();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#global-search").focus();
  }
});

const cachedBranches = readCachedBranches();
if (cachedBranches.length) state.branches = cachedBranches;
const cachedSession = readCachedSession();
if (cachedSession?.user) applySessionUser(cachedSession.user);
render();
loadPersistentState();
