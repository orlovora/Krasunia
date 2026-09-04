const state = {
  role: "admin",
  authenticated: false,
  user: null,
  section: "schedule",
  view: "day",
  selectedDate: "2026-09-04",
  branchId: "branch-podil",
  branches: [
    { id: "branch-podil", name: "Поділ", city: "Київ", address: "вул. Нижній Вал, 17", phone: "+38 044 555 01 01", hoursStart: "09:00", hoursEnd: "19:00" },
    { id: "branch-pechersk", name: "Печерськ", city: "Київ", address: "вул. Басейна, 4", phone: "+38 044 555 01 02", hoursStart: "09:00", hoursEnd: "20:00" }
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

const salonHours = { start: "09:00", end: "19:00" };
const scheduleHourHeight = 72;
const currentMasterName = "Ірина Мельник";
const API_BASE = "/api";
let apiReady = false;
let apiAvailable = false;
let authRoleDraft = "admin";
let timelineDrag = null;
let bookingDraftProcedures = [];
let bookingDraftOffsets = {};

const demoUsers = {
  admin: [{ id: "admin-001", name: "Ольга Коваль", role: "admin", initials: "ОК", email: "olga@krasunya.local" }],
  master: [{ id: "master-001", name: "Ірина Мельник", role: "master", initials: "ІМ", email: "iryna@krasunya.local" }],
  client: [{ id: "client-001-user", name: "Марина Соколова", role: "client", initials: "МС", email: "marina@krasunya.local" }]
};

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
    if (Array.isArray(session.branches)) state.branches = session.branches;
    if (!session.authenticated) {
      state.authenticated = false;
      render();
      return;
    }
    applySessionUser(session.user);
    const payload = await apiRequest("/bootstrap");
    ["clients", "masters", "rooms", "equipment", "procedures", "bookings", "unavailableSlots", "branches"].forEach((key) => {
      if (Array.isArray(payload[key])) state[key] = payload[key];
    });
    apiReady = true;
    if (payload.session) applySessionUser(payload.session);
    render();
  } catch (error) {
    apiAvailable = false;
    state.authenticated = false;
    renderLoginScreen(apiErrorMessage(error));
    console.warn("Backend недоступний, вхід працює в локальному демо-режимі.", error);
  }
}

function applySessionUser(user) {
  state.user = user;
  state.authenticated = Boolean(user);
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

function renderLoginScreen(errorMessage = "") {
  const users = demoUsers[authRoleDraft] || demoUsers.admin;
  const userOptions = users.map((user) => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`).join("");
  const branchField = authRoleDraft === "master"
    ? `<div class="auth-field"><label>Філія майстра</label><div class="settings-detail" style="margin-top:0;padding:11px 12px;background:var(--cream);border-radius:10px;border:0"><span>Основна локація</span><strong>Поділ · Київ</strong></div></div>`
    : `<div class="auth-field"><label for="login-branch">Філія для роботи</label><select id="login-branch" name="branchId" required>${state.branches.map((branch) => `<option value="${escapeHtml(branch.id)}" ${branch.id === state.branchId ? "selected" : ""}>${escapeHtml(branch.name)} · ${escapeHtml(branch.city)}</option>`).join("")}</select></div>`;
  const roles = ["admin", "master", "client"];
  $("#auth-modal").innerHTML = `
    <div class="auth-brand"><div class="auth-brand-mark">К</div><div class="auth-brand-copy"><strong>Красуня</strong><span>простір салону</span></div></div>
    <h1 id="auth-title">Вхід у систему</h1>
    <p>Оберіть свою роль, щоб відкрити персональний робочий простір.</p>
    <div class="auth-role-tabs" role="tablist" aria-label="Тип користувача">
      ${roles.map((role) => `<button class="auth-role-tab ${authRoleDraft === role ? "active" : ""}" data-auth-role="${role}" type="button" role="tab" aria-selected="${authRoleDraft === role}">${roleLabel(role)}</button>`).join("")}
    </div>
    <form class="auth-form" id="login-form">
      <div class="auth-field"><label for="login-user">Користувач</label><select id="login-user" name="userId" required>${userOptions}</select></div>
      ${branchField}
      <div class="auth-field"><label for="login-password">Пароль</label><input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Введіть пароль" required /></div>
      <p class="auth-password-note">Для локального демо використовуйте пароль <strong>demo123</strong>.</p>
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
      if (Array.isArray(response.branches)) state.branches = response.branches;
      applySessionUser(response.user);
      const bootstrap = await apiRequest("/bootstrap");
      ["clients", "masters", "rooms", "equipment", "procedures", "bookings", "unavailableSlots", "branches"].forEach((key) => {
        if (Array.isArray(bootstrap[key])) state[key] = bootstrap[key];
      });
      if (bootstrap.session) applySessionUser(bootstrap.session);
      apiReady = true;
    } else {
      const user = (demoUsers[authRoleDraft] || []).find((item) => item.id === payload.userId);
      if (payload.password !== "demo123" || !user) throw { error: "Невірний користувач або пароль." };
      applySessionUser({ ...user, branchId: authRoleDraft === "master" ? "branch-podil" : payload.branchId, masterName: authRoleDraft === "master" ? "Ірина Мельник" : "", clientId: authRoleDraft === "client" ? "client-001" : "" });
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
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Локація роботи</div><h2 id="modal-title">Оберіть філію</h2><p>${state.role === "admin" ? "Адміністратор може перемикати робочі локації та додавати нові." : "Оберіть салон, до якого хочете записатися."}</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><div class="modal-form"><div class="branch-list">${state.branches.map((branch, index) => `<button class="branch-option ${branch.id === currentBranch.id ? "active" : ""}" data-branch-select="${escapeHtml(branch.id)}" type="button"><span class="branch-option-mark">${String(index + 1).padStart(2, "0")}</span><span class="branch-option-copy"><strong>${escapeHtml(branch.name)} · ${escapeHtml(branch.city)}</strong><span>${escapeHtml(branch.address)} · ${escapeHtml(branch.phone || "Контакти не вказані")}</span></span>${branch.id === currentBranch.id ? `<span class="branch-current">Обрано</span>` : ""}</button>`).join("")}</div>${state.role === "admin" ? `<div class="branch-create"><div class="branch-create-head"><strong>Додати нову філію</strong><span class="tag">для адміністратора</span></div><form id="branch-create-form" class="form-grid"><div class="form-field"><label for="branch-create-name">Назва</label><input id="branch-create-name" name="name" placeholder="Наприклад, Центр" required /></div><div class="form-field"><label for="branch-create-city">Місто</label><input id="branch-create-city" name="city" placeholder="Київ" required /></div><div class="form-field full"><label for="branch-create-address">Адреса</label><input id="branch-create-address" name="address" placeholder="вул. ..." required /></div><div class="form-field"><label for="branch-create-phone">Телефон</label><input id="branch-create-phone" name="phone" placeholder="+38 ..." /></div><div class="form-field"><label for="branch-create-hours">Години</label><input id="branch-create-hours" name="hours" value="09:00–19:00" placeholder="09:00–19:00" /></div><div class="modal-actions full"><button class="primary-button" type="submit"><span>＋</span> Створити філію</button></div></form></div>` : ""}</div>`;
  showModal();
}

async function switchBranch(branchId) {
  const branch = state.branches.find((item) => item.id === branchId);
  if (!branch) return;
  try {
    if (apiReady) {
      const response = await apiRequest("/auth/branch", { method: "POST", body: JSON.stringify({ branchId }) });
      applySessionUser({ ...state.user, ...response.user });
      const bootstrap = await apiRequest("/bootstrap");
      ["clients", "masters", "rooms", "equipment", "procedures", "bookings", "unavailableSlots", "branches"].forEach((key) => {
        if (Array.isArray(bootstrap[key])) state[key] = bootstrap[key];
      });
      if (bootstrap.session) applySessionUser(bootstrap.session);
    } else {
      state.branchId = branchId;
      if (state.user) state.user.branchId = branchId;
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
  state.role = "admin";
  state.section = "schedule";
  closeModal();
  render();
}

function renderUserSettings() {
  const user = state.user || { name: "Користувач", email: "", phone: "", role: state.role, initials: "К" };
  const branch = getCurrentBranch();
  return `<section class="settings-view"><section class="settings-card"><div class="panel-kicker">Особистий профіль</div><h2>Налаштування користувача</h2><p>Оновіть контактні дані та перевірте поточний доступ до системи.</p><form class="settings-form" id="profile-form"><div class="form-grid"><div class="form-field"><label for="profile-name">Ім'я та прізвище</label><input id="profile-name" name="name" value="${escapeHtml(user.name)}" required /></div><div class="form-field"><label for="profile-phone">Телефон</label><input id="profile-phone" name="phone" value="${escapeHtml(user.phone || "")}" /></div><div class="form-field"><label for="profile-email">Email</label><input id="profile-email" value="${escapeHtml(user.email || "")}" readonly /></div><div class="form-field"><label for="profile-role">Роль у системі</label><input id="profile-role" value="${roleLabel(user.role)}" readonly /></div></div><div class="modal-actions"><button class="primary-button" type="submit">Зберегти зміни</button></div></form></section><aside class="settings-card"><div class="settings-summary"><div class="avatar avatar-${user.role === "master" ? "lilac" : user.role === "client" ? "sage" : "peach"}">${escapeHtml(user.initials || user.name.split(" ").map((part) => part[0]).join("").slice(0, 2))}</div><div class="settings-summary-copy"><strong>${escapeHtml(user.name)}</strong><span>${escapeHtml(roleLabel(user.role))}</span></div></div><div class="settings-detail-list"><div class="settings-detail"><span>Поточна філія</span><strong>${escapeHtml(branch.name)} · ${escapeHtml(branch.city)}</strong></div><div class="settings-detail"><span>Адреса</span><strong>${escapeHtml(branch.address || "Не вказано")}</strong></div><div class="settings-detail"><span>Статус сеансу</span><strong style="color:var(--sage-deep)">Активний</strong></div></div><button class="ghost-button" data-action="open-branch-switcher" type="button" style="width:100%;justify-content:center;margin-top:20px">Змінити філію</button><div class="settings-danger"><button class="danger-button" data-action="logout" type="button">Вийти з системи</button></div></aside></section>`;
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

function getClient(clientId) {
  return state.clients.find((client) => client.id === clientId) || state.clients[0];
}

function getMaster(masterName) {
  return state.masters.find((master) => master.name === masterName);
}

function renderMasterAvatar(masterOrName, sizeClass = "") {
  const master = typeof masterOrName === "string" ? getMaster(masterOrName) : masterOrName;
  if (!master) return "";
  const alt = `Фото майстра ${escapeHtml(master.name)}`;
  return `<span class="master-avatar avatar-${escapeHtml(master.color)} ${sizeClass}" title="${alt}"><img src="${escapeHtml(master.photo)}" alt="${alt}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false" /><span class="master-avatar-fallback" hidden>${escapeHtml(master.initials)}</span></span>`;
}

function bookingBelongsToCurrentMaster(booking) {
  return booking.stages.some((stage) => stage.master === currentMasterName);
}

function getVisibleClients() {
  if (state.role !== "master") return state.clients;
  const masterClientIds = new Set(
    state.clients
      .filter((client) => client.masterNames?.includes(currentMasterName))
      .map((client) => client.id)
  );
  state.bookings.filter(bookingBelongsToCurrentMaster).forEach((booking) => masterClientIds.add(booking.clientId));
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
    if (slot.date !== state.selectedDate) return false;
    if (state.role === "master" && slot.master !== currentMasterName) return false;
    if (state.filterMaster !== "all" && slot.master !== state.filterMaster) return false;
    return true;
  });
}

function getEditableUnavailableSlots() {
  return state.unavailableSlots.filter((slot) => state.role !== "master" || slot.master === currentMasterName);
}

function getVisibleBookings() {
  return state.bookings.filter((booking) => {
    if (booking.date !== state.selectedDate) return false;
    if (state.filterMaster !== "all" && !booking.stages.some((stage) => stage.master === state.filterMaster)) return false;
    if (state.filterRoom !== "all" && !booking.stages.some((stage) => stage.room === state.filterRoom)) return false;
    if (state.role === "master" && !booking.stages.some((stage) => stage.master === currentMasterName)) return false;
    return true;
  });
}

function getProcedure(procedureId) {
  return state.procedures.find((procedure) => procedure.id === procedureId) || state.procedures[0];
}

function getProcedureMasters(procedureId) {
  return [...new Set(getProcedure(procedureId).resourcePlan.map((stage) => stage.master))];
}

function getClientProcedureMasters(clientId, procedureId) {
  const client = getClient(clientId);
  const procedureMasters = new Set(getProcedureMasters(procedureId));
  const historyMasters = new Set([
    ...(client?.masterNames || []),
    ...state.bookings
      .filter((booking) => booking.clientId === clientId)
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
    .filter((booking) => booking.date === date)
    .flatMap((booking) => booking.stages
      .filter((stage) => ["master", "room", "equipment"].some((key) => stage[key] === resourceStage[key]))
      .map((stage) => ({
        ...stage,
        bookingId: booking.id,
        client: booking.client,
        service: booking.service
      })));
  const unavailable = state.unavailableSlots
    .filter((slot) => slot.date === date && slot.master === resourceStage.master)
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
  container.innerHTML = `<div class="procedure-timeline-head"><div><div class="panel-kicker">Доступність процедур</div><strong id="procedure-timeline-title">${bookingDraftProcedures.length === 1 ? escapeHtml(selectedProcedures[0].name) : `${bookingDraftProcedures.length} процедури в маршруті`} · ${escapeHtml(formatLongDate(date))}</strong><p>Порожні ділянки на шкалі — доступні вікна. Кожну додану процедуру можна рухати окремо, а зайнятість враховує майстра, кабінет і обладнання.</p></div><div class="procedure-timeline-legend"><span class="legend-dot legend-dot-booked"></span>Зайнято<span class="legend-dot legend-dot-unavailable"></span>Неробочий час<span class="legend-dot legend-dot-pending"></span>Новий запис<span class="procedure-drag-hint" id="procedure-drag-hint">↔ Перетягніть «Новий»</span></div></div><div class="procedure-timeline-summary"><span><strong>${bookingDraftProcedures.length}</strong> ${bookingDraftProcedures.length === 1 ? "процедура" : "процедури"}</span><span><strong>${totalStages}</strong> ${totalStages === 1 ? "етап" : "етапи"} маршруту</span><span><strong>${procedureMasters.length}</strong> ${procedureMasters.length === 1 ? "майстер" : "майстри"}</span><span class="summary-free"><span class="legend-dot"></span>доступно між записами</span></div><div class="procedure-timeline-scroll"><div class="procedure-timeline-grid"><div class="procedure-timeline-axis"><span>Процедура, етап і ресурси</span><div class="procedure-time-axis">${timeLabels.map((time) => `<span>${time}</span>`).join("")}</div></div>${stageRows}</div></div>`;
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

function render() {
  if (!state.authenticated) {
    renderLoginScreen();
    return;
  }
  updateChrome();
  renderStats();
  $("#stats-grid").hidden = state.section === "settings";
  const view = $("#app-view");
  if (state.section === "settings") {
    view.innerHTML = renderUserSettings();
  } else if (state.role === "client") {
    view.innerHTML = renderClientPortal();
  } else if (state.section === "schedule") {
    view.innerHTML = renderSchedule();
  } else {
    view.innerHTML = renderDirectory(state.section);
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
  $("#breadcrumb-current").textContent = current;
  $("#page-title").innerHTML = `${roleData.title} <span class="wave">✳</span>`;
  $("#page-subtitle").textContent = roleData.subtitle;
  $("#new-booking-button").style.display = state.role === "client" ? "none" : "inline-flex";
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
  $$(".nav-item").forEach((item) => item.classList.toggle("active", state.role !== "client" && item.dataset.section === state.section));
  $$(".nav-item").forEach((item) => {
    item.style.opacity = state.role === "master" && ["procedures", "resources"].includes(item.dataset.section) ? "0.4" : "1";
  });
}

function renderStats() {
  const total = state.bookings.filter((booking) => booking.date === state.selectedDate).reduce((sum, booking) => sum + booking.price, 0);
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
    { icon: "◷", label: "Записи сьогодні", value: String(state.bookings.filter((booking) => booking.date === state.selectedDate).length), note: "2 складні сеанси" },
    { icon: "◒", label: "Завантаження студії", value: "74%", note: "↑ 8% до минулої п’ятниці", trend: true },
    { icon: "₴", label: "Очікувана виручка", value: formatMoney(total), note: "із 5 записів" },
    { icon: "✦", label: "Нові клієнти", value: "3", note: "за останні 7 днів" }
  ];
  $("#stats-grid").innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <div class="stat-topline"><span>${escapeHtml(stat.label)}</span><span class="stat-icon" aria-hidden="true">${stat.icon}</span></div>
      <strong class="stat-value">${escapeHtml(stat.value)}</strong>
      <span class="stat-note ${stat.trend ? "up" : ""}">${escapeHtml(stat.note)}</span>
    </article>
  `).join("");
}

function renderSchedule() {
  return `
    <section class="panel calendar-panel" aria-labelledby="schedule-title">
      <div class="panel-head">
        <div>
          <div class="panel-kicker">Головна сцена</div>
          <h2 class="panel-title" id="schedule-title">Розклад на сьогодні</h2>
          <p class="panel-subtitle">${state.role === "master" ? "Ваші етапи підсвічені в загальній сітці." : "Майстри — по горизонталі, час — по вертикалі."}</p>
        </div>
        <div class="toolbar-actions">
          <div class="date-nav" aria-label="Навігація за датами">
            <button class="date-button" data-date-shift="-1" type="button" aria-label="Попередній день">‹</button>
            <span class="date-chip">${formatScheduleDate(state.selectedDate)}</span>
            <button class="date-button" data-date-shift="1" type="button" aria-label="Наступний день">›</button>
          </div>
          <div class="view-toggle" aria-label="Вигляд розкладу">
            <button class="${state.view === "day" ? "active" : ""}" data-view="day" type="button">День</button>
            <button class="${state.view === "week" ? "active" : ""}" data-view="week" type="button">Тиждень</button>
          </div>
        </div>
      </div>
      ${state.view === "day" ? renderDayView() : renderWeekView()}
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
  const masterOptions = ["all", ...state.masters.map((master) => master.name)];
  const roomOptions = ["all", ...state.rooms.map((room) => room.name)];
  const timeLabels = Array.from({ length: 10 }, (_, index) => toTime(parseMinutes(salonHours.start) + index * 60));
  const hourHeight = scheduleHourHeight;
  const nowTop = ((10 * 60 + 12 - parseMinutes(salonHours.start)) / 60) * hourHeight;
  return `
    <div class="filter-row">
      <select class="filter-select" id="master-filter" aria-label="Фільтр за майстром">
        ${masterOptions.map((master) => `<option value="${escapeHtml(master)}" ${state.filterMaster === master ? "selected" : ""}>${master === "all" ? "Усі майстри" : escapeHtml(master)}</option>`).join("")}
      </select>
      <select class="filter-select" id="room-filter" aria-label="Фільтр за кабінетом">
        ${roomOptions.map((room) => `<option value="${escapeHtml(room)}" ${state.filterRoom === room ? "selected" : ""}>${room === "all" ? "Усі кабінети" : escapeHtml(room)}</option>`).join("")}
      </select>
      <button class="ghost-button availability-button" data-action="add-availability" type="button"><span>＋</span> Неробочий час</button>
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
        <div class="schedule-now-line" style="top:${nowTop}px"><span class="now-line-label">сейчас</span></div>
      </div>
    </div>
  `;
}

function getScheduleMasters() {
  if (state.role === "master") return state.masters.filter((master) => master.name === currentMasterName);
  if (state.filterMaster !== "all") return state.masters.filter((master) => master.name === state.filterMaster);
  return state.masters;
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
  const days = [
    { day: "ПН", date: "31", label: "сер", iso: "2026-08-31" },
    { day: "ВТ", date: "01", label: "вер", iso: "2026-09-01" },
    { day: "СР", date: "02", label: "вер", iso: "2026-09-02" },
    { day: "ЧТ", date: "03", label: "вер", iso: "2026-09-03" },
    { day: "ПТ", date: "04", label: "вер", iso: "2026-09-04" },
    { day: "СБ", date: "05", label: "вер", iso: "2026-09-05" },
    { day: "НД", date: "06", label: "вер", iso: "2026-09-06" }
  ];
  return `<div class="week-grid">${days.map((day) => {
    const dayBookings = state.bookings.filter((booking) => booking.date === day.iso && (state.role !== "master" || bookingBelongsToCurrentMaster(booking)));
    const dayUnavailable = state.unavailableSlots.filter((slot) => slot.date === day.iso && (state.role !== "master" || slot.master === currentMasterName));
    return `<div class="week-day ${day.iso === state.selectedDate ? "today" : ""}">
      <div class="week-day-top"><span>${day.day} · ${day.label}</span><strong>${day.date}</strong></div>
      ${dayUnavailable.map((slot) => `<button class="week-unavailable" data-availability="${slot.id}" type="button"><strong>${escapeHtml(slot.start)}—${escapeHtml(slot.end)}</strong><span>${escapeHtml(slot.reason)} · ${escapeHtml(slot.master)}</span></button>`).join("")}
      ${dayBookings.length ? dayBookings.slice(0, 3).map((booking) => `<button class="week-booking" data-booking="${booking.id}" type="button"><strong>${escapeHtml(booking.client)}</strong><span>${booking.start} · ${escapeHtml(booking.service)}</span></button>`).join("") : `<span class="empty-week">—</span>`}
    </div>`;
  }).join("")}</div>`;
}

function renderFocusCard() {
  const booking = state.bookings[0];
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
  const attentionBookings = state.bookings.filter((booking) => booking.date === state.selectedDate && booking.status !== "confirmed" && (state.role !== "master" || bookingBelongsToCurrentMaster(booking)));
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
  return `
    <section class="panel side-panel">
      <div class="side-panel-head"><h2 class="side-panel-title">Ресурси сьогодні</h2><button class="side-panel-link" data-section-link="resources" type="button">Відкрити</button></div>
      <div class="resource-summary">
        <div class="resource-line"><div class="resource-line-copy"><span>⌂</span>Кабінети</div><span class="resource-line-status">4 / 4 готові</span></div>
        <div class="resource-line"><div class="resource-line-copy"><span>⌘</span>Обладнання</div><span class="resource-line-status">8 / 8 готове</span></div>
        <div class="resource-line"><div class="resource-line-copy"><span>◌</span>Майстри</div><span class="resource-line-status">3 на зміні</span></div>
      </div>
    </section>
  `;
}

function renderDirectory(section) {
  const titles = {
    clients: ["Клієнти", state.role === "master" ? "Ваші клієнти: ті, хто вже записувався до вас, і нові записи до вас." : "Усі клієнти салону, їхня історія та нотатки."],
    history: ["Історія візитів", state.role === "master" ? "Історія клієнтів, які записувалися до вас." : "Усі процедури, майстри й суми по клієнтах."],
    procedures: ["Процедури", "Зв’язки між етапами та ресурсами живуть тут."],
    resources: ["Кабінети й обладнання", "Стан простору й техніки на сьогодні."],
    team: ["Команда", "Графіки майстрів визначають доступні вікна запису."]
  }[section];
  const action = section === "team" ? `<button class="primary-button" data-action="add-availability" type="button"><span>＋</span> Неробочий час</button>` : `<button class="primary-button" data-action="add-${section}" type="button"><span>＋</span> Додати</button>`;
  return `<section class="directory-view"><div class="management-head"><div><div class="panel-kicker">Довідник студії</div><h2 class="panel-title">${titles[0]}</h2><p class="panel-subtitle">${titles[1]}</p></div>${action}</div>${section === "procedures" ? renderProcedures() : section === "resources" ? renderResources() : section === "team" ? renderTeam() : section === "clients" ? renderClients() : renderHistory()}</section>`;
}

function renderProcedures() {
  return `<div class="directory-grid"><section class="panel directory-table"><div class="table-row header"><span>Назва процедури</span><span>Нормогодини</span><span>Вартість</span><span>Зв’язки</span></div>${state.procedures.map((procedure) => `<button class="table-row" data-procedure="${procedure.id}" type="button"><strong>${escapeHtml(procedure.name)}<small>${escapeHtml(procedure.category)}</small></strong><span>${escapeHtml(procedure.duration)}</span><span class="price-cell">${formatMoney(procedure.price)}</span><span class="tag-list"><span class="tag">${procedure.stages} ${procedure.stages === 1 ? "етап" : "етапи"}</span></span></button>`).join("")}</section><section class="panel side-panel"><div class="side-panel-head"><h2 class="side-panel-title">Зв’язок етапів</h2><span class="verified">готово</span></div><p class="panel-subtitle" style="margin-bottom:15px">Glow Reset · комплексна процедура</p><div class="mini-list"><div class="mini-list-item"><span class="builder-stage-number">01</span><span class="mini-list-copy"><strong>Лімфодренаж</strong><span>Анна · Каб. 1 · Pressotherapy P-02</span></span><span class="mini-count">45′</span></div><div class="mini-list-item"><span class="builder-stage-number">02</span><span class="mini-list-copy"><strong>LED-відновлення</strong><span>Ірина · Каб. 3 · LED-маска Luma</span></span><span class="mini-count">70′</span></div></div><div class="conflict-check" style="margin-top:19px">Послідовність і ресурси налаштовані</div></section></div>`;
}

function renderResources() {
  return `<div class="directory-grid"><section class="panel directory-table"><div class="table-row header"><span>Кабінет</span><span>Призначення</span><span>Статус</span><span>Оснащення</span></div>${state.rooms.map((room) => `<div class="table-row"><strong>${escapeHtml(room.name)}<small>${escapeHtml(room.type)}</small></strong><span>${escapeHtml(room.status)}</span><span class="tag">готовий</span><span>${escapeHtml(room.detail)}</span></div>`).join("")}</section><section class="panel resource-card"><div class="side-panel-head"><div><h2 class="side-panel-title">Обладнання</h2><p class="panel-subtitle">Години студії: ${salonHours.start}—${salonHours.end}</p></div><button class="side-panel-link" data-action="add-equipment" type="button">Додати</button></div><div class="mini-list">${state.equipment.map((item) => `<div class="mini-list-item"><span class="resource-line-copy"><span>⌘</span></span><span class="mini-list-copy"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.type)} · ${escapeHtml(item.room)}</span></span><span class="resource-line-status">${escapeHtml(item.status)}</span></div>`).join("")}</div></section></div>`;
}

function renderTeam() {
  const visibleSlots = getEditableUnavailableSlots().filter((slot) => slot.date === state.selectedDate);
  const masterRows = state.role === "master" ? state.masters.filter((master) => master.name === currentMasterName) : state.masters;
  return `<div class="directory-grid team-grid"><section class="panel resource-card"><div class="mini-list">${masterRows.map((master) => `<div class="mini-list-item"><div class="master-profile-photo">${renderMasterAvatar(master, "master-avatar-md")}</div><span class="mini-list-copy"><strong>${escapeHtml(master.name)}</strong><span>${escapeHtml(master.role)} · ${escapeHtml(master.focus)}</span></span><span class="tag">${escapeHtml(master.schedule)}</span></div>`).join("")}</div></section><section class="panel side-panel availability-panel"><div class="side-panel-head"><div><h2 class="side-panel-title">Неробочий час</h2><p class="panel-subtitle">${state.selectedDate === "2026-09-04" ? "04 вересня · сьогодні" : escapeHtml(state.selectedDate)}</p></div><span class="tag">${visibleSlots.length} ${visibleSlots.length === 1 ? "інтервал" : "інтервали"}</span></div>${visibleSlots.length ? `<div class="availability-list">${visibleSlots.map((slot) => `<div class="availability-row"><div class="availability-row-time">${escapeHtml(slot.start)}—${escapeHtml(slot.end)}</div><div class="availability-row-copy"><strong>${escapeHtml(slot.reason)}</strong><span>${renderMasterAvatar(slot.master, "master-avatar-xs")} ${escapeHtml(slot.master)}</span></div><button class="icon-button availability-edit" data-availability="${slot.id}" type="button" aria-label="Змінити неробочий час">✎</button></div>`).join("")}</div>` : `<div class="availability-empty"><strong>Немає заблокованих інтервалів</strong><span>Додайте перерву або час для відлучки.</span></div>`}<button class="ghost-button availability-add-secondary" data-action="add-availability" type="button"><span>＋</span> Додати інтервал</button></section><section class="panel side-panel"><div class="side-panel-head"><h2 class="side-panel-title">Графік сьогодні</h2><span class="verified">${masterRows.length} на зміні</span></div><div class="mini-list">${masterRows.map((master) => `<div class="mini-list-item">${renderMasterAvatar(master, "master-avatar-xs")}<span class="mini-list-copy"><strong>${escapeHtml(master.name)}</strong><span>${escapeHtml(master.schedule)} · ${state.bookings.filter((booking) => booking.date === state.selectedDate && booking.stages.some((stage) => stage.master === master.name)).length} записів</span></span></div>`).join("")}</div></section></div>`;
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
  const visibleHistory = state.role === "master" ? history.filter((item) => item.master.includes(currentMasterName)) : history;
  return `<section class="panel directory-table"><div class="table-row header"><span>Дата й клієнт</span><span>Процедура</span><span>Майстер</span><span>Вартість</span></div>${visibleHistory.map((item) => `<button class="table-row" data-client-history="${state.clients.find((client) => client.name === item.client)?.id || "client-001"}" type="button"><strong>${item.date}<small>${escapeHtml(item.client)}</small></strong><span>${escapeHtml(item.service)}<small>${escapeHtml(item.status)}</small></span><span>${escapeHtml(item.master)}</span><span class="price-cell">${formatMoney(item.price)}</span></button>`).join("")}</section>`;
}

function renderClientPortal() {
  const client = state.clients[0] || {
    id: state.user?.clientId || "",
    name: state.user?.name || "Клієнт",
    initials: state.user?.initials || "К",
    phone: state.user?.phone || ""
  };
  const upcoming = state.bookings[0];
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
    const master = state.masters.find((item) => item.name === stage.master);
    if (!master) return;
    const [scheduleStart, scheduleEnd] = master.schedule.split("–");
    if (parseMinutes(stage.start) < parseMinutes(scheduleStart) || parseMinutes(stage.end) > parseMinutes(scheduleEnd)) {
      conflicts.push(`${stage.master}: робочі години ${master.schedule}`);
    }
    state.unavailableSlots.filter((slot) => slot.date === date && slot.master === stage.master).forEach((slot) => {
      if (timeOverlaps(stage.start, stage.end, slot.start, slot.end)) {
        conflicts.push(`${stage.master}: неробочий час ${slot.start}—${slot.end}${slot.reason ? ` (${slot.reason.toLowerCase()})` : ""}`);
      }
    });
  });
  state.bookings.filter((booking) => booking.date === date && booking.id !== excludedBookingId).forEach((booking) => {
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
  if (state.role === "client") return;
  const booking = state.bookings.find((item) => item.id === bookingId);
  if (!booking || (state.role === "master" && !bookingBelongsToCurrentMaster(booking))) return;
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
    .filter((booking) => booking.date === slot.date)
    .flatMap((booking) => booking.stages
      .filter((stage) => stage.master === slot.master && timeOverlaps(slot.start, slot.end, stage.start, stage.end))
      .map((stage) => `${booking.client} має запис ${stage.start}—${stage.end}`));
}

function openBookingModal() {
  if (state.role === "client") return;
  bookingDraftProcedures = [];
  bookingDraftOffsets = {};
  const availableClients = getVisibleClients();
  const clientOptions = availableClients.map((client) => `<option value="${escapeHtml(client.id)}">${escapeHtml(client.name)}${client.note === "Новий клієнт" ? " · новий клієнт" : ""}</option>`).join("");
  const procedureOptions = state.procedures.map((procedure) => `<option value="${escapeHtml(procedure.id)}">${escapeHtml(procedure.name)} · ${procedure.stages} ${procedure.stages === 1 ? "етап" : "етапи"}</option>`).join("");
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Новий запис</div><h2 id="modal-title">Зібрати візит</h2><p>Оберіть процедуру, перевірте доступність і додайте її до візиту.</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><form class="modal-form" id="booking-form"><div class="form-grid"><div class="form-field full"><label for="booking-client">Клієнт</label><select id="booking-client" name="client" ${clientOptions ? "" : "disabled"}>${clientOptions || "<option>Немає доступних клієнтів</option>"}</select>${state.role === "master" ? `<small class="field-hint">Ви бачите лише клієнтів зі своїми записами.</small>` : ""}</div><div class="form-field full"><label for="booking-procedure">Процедура для додавання</label><div class="procedure-picker"><select id="booking-procedure" name="procedure">${procedureOptions}</select><button class="ghost-button add-procedure-button" data-action="add-procedure-to-visit" type="button"><span>＋</span> Додати до візиту</button></div><small class="field-hint">Після додавання процедура з’явиться в таймлайні нижче. Там її можна видалити або перемістити.</small><div id="booking-master-preference"></div></div><div class="form-field"><label for="booking-date">Дата</label><input id="booking-date" name="date" type="date" value="${escapeHtml(state.selectedDate)}" required /></div><div class="form-field"><label for="booking-start">Початок маршруту</label><input id="booking-start" name="start" type="time" value="12:00" step="900" required /></div></div><section class="procedure-timeline-panel" id="booking-procedure-timeline" aria-live="polite" aria-labelledby="procedure-timeline-title"></section><div class="booking-builder"><div class="builder-head"><strong>Маршрут доданих процедур</strong><span class="builder-total" id="builder-total">Додайте процедуру</span></div><div id="builder-stage-list"></div><div class="conflict-check warning" id="booking-check">Додайте хоча б одну процедуру до візиту</div></div><div class="form-field full" style="margin-top:14px"><label for="booking-note">Нотатка для команди</label><textarea id="booking-note" name="note" placeholder="Наприклад: повторити минулий протокол догляду"></textarea></div><div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Скасувати</button><button class="primary-button" id="submit-booking" type="submit" ${clientOptions ? "" : "disabled"}><span>＋</span> Зберегти запис</button></div></form>`;
  showModal();
  syncBookingBuilder();
}

function openAvailabilityModal(slotId = "") {
  if (state.role === "client") return;
  const slot = getEditableUnavailableSlots().find((item) => item.id === slotId);
  if (slotId && !slot) return;
  const isEditing = Boolean(slot);
  const masterOptions = state.role === "master" ? state.masters.filter((master) => master.name === currentMasterName) : state.masters;
  const selectedMaster = slot?.master || masterOptions[0]?.name || currentMasterName;
  const reasons = ["Перерва", "Відлучка", "Особиста справа", "Інше"];
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">Розклад майстра</div><h2 id="modal-title">${isEditing ? "Змінити неробочий час" : "Додати неробочий час"}</h2><p>Цей інтервал буде виключено з доступного часу для нових записів.</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><form class="modal-form" id="availability-form" data-availability-id="${slot?.id || ""}"><div class="form-grid"><div class="form-field full"><label for="availability-master">Майстер</label><select id="availability-master" name="master" ${state.role === "master" ? "disabled" : ""}>${masterOptions.map((master) => `<option value="${escapeHtml(master.name)}" ${master.name === selectedMaster ? "selected" : ""}>${escapeHtml(master.name)} · ${escapeHtml(master.role)}</option>`).join("")}</select>${state.role === "master" ? `<input type="hidden" name="master" value="${escapeHtml(currentMasterName)}" />` : ""}</div><div class="form-field"><label for="availability-date">Дата</label><input id="availability-date" name="date" type="date" value="${escapeHtml(slot?.date || state.selectedDate)}" required /></div><div class="form-field"><label for="availability-reason">Причина</label><select id="availability-reason" name="reason">${reasons.map((reason) => `<option value="${escapeHtml(reason)}" ${reason === (slot?.reason || "Перерва") ? "selected" : ""}>${escapeHtml(reason)}</option>`).join("")}</select></div><div class="form-field"><label for="availability-start">Початок</label><input id="availability-start" name="start" type="time" value="${escapeHtml(slot?.start || "12:00")}" step="900" required /></div><div class="form-field"><label for="availability-end">Завершення</label><input id="availability-end" name="end" type="time" value="${escapeHtml(slot?.end || "12:30")}" step="900" required /></div></div><div class="availability-form-note"><span>i</span><p>Години студії: ${salonHours.start}—${salonHours.end}. Запис поверх цього часу система не дозволить.</p></div><div class="modal-actions">${isEditing ? `<button class="danger-button" data-availability-delete="${slot.id}" type="button">Видалити</button>` : ""}<button class="ghost-button" data-close-modal type="button">Скасувати</button><button class="primary-button" type="submit"><span>✓</span> ${isEditing ? "Зберегти зміни" : "Заблокувати час"}</button></div></form>`;
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
  if (!booking || (state.role === "master" && !bookingBelongsToCurrentMaster(booking))) return;
  const client = getClient(booking.clientId);
  $("#modal").innerHTML = `<div class="modal-head"><div><div class="panel-kicker">${booking.status === "confirmed" ? "Підтверджено" : "Очікує підтвердження"}</div><h2 id="modal-title">${escapeHtml(booking.client)}</h2><p>${escapeHtml(booking.service)} · ${escapeHtml(booking.date)} · ${escapeHtml(booking.start)}—${escapeHtml(booking.end)}</p></div><button class="close-modal" data-close-modal type="button" aria-label="Закрити">×</button></div><div class="modal-form"><div class="booking-builder" style="margin-top:0"><div class="builder-head"><strong>Етапи візиту</strong><span class="builder-total">${formatMoney(booking.price)}</span></div>${booking.stages.map((stage, index) => `<div class="builder-stage"><span class="builder-stage-number">0${index + 1}</span><span class="builder-stage-copy"><strong>${escapeHtml(stage.name)}</strong><span class="stage-master-line">${renderMasterAvatar(stage.master, "master-avatar-xs")} ${escapeHtml(stage.master)} · ${escapeHtml(stage.room)} · ${escapeHtml(stage.equipment)}</span></span><span class="builder-stage-time">${escapeHtml(stage.start)}—${escapeHtml(stage.end)}</span></div>`).join("")}<div class="conflict-check">Ресурси зарезервовано, перетинів немає</div></div><div class="client-hero" style="margin-top:14px;padding:14px;background:var(--cream);border-radius:12px"><div class="avatar">${escapeHtml(client.initials)}</div><div class="client-hero-copy"><h2 style="font-size:19px">Історія клієнта</h2><p>${client.visits} візитів · ${formatMoney(client.total)} за весь час</p></div><button class="ghost-button" data-client-history="${client.id}" type="button">Відкрити</button></div><div class="modal-actions"><button class="ghost-button" data-close-modal type="button">Закрити</button>${state.role !== "client" ? `<button class="primary-button" data-reschedule-booking="${escapeHtml(booking.id)}" type="button"><span>↗</span> Перенести запис</button>` : ""}<button class="primary-button" data-action="confirm-booking" type="button"><span>✓</span> Підтвердити</button></div></div>`;
  showModal();
}

function openClientHistory(clientId) {
  const client = getClient(clientId);
  if (!client || (state.role === "master" && !getVisibleClients().some((item) => item.id === client.id))) return;
  const clientBookings = state.bookings.filter((booking) => booking.clientId === client.id && (state.role !== "master" || bookingBelongsToCurrentMaster(booking)));
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
  const bookingButton = event.target.closest("[data-booking]");
  if (bookingButton) {
    openBookingDetails(bookingButton.dataset.booking);
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
    showToast(shiftButton.dataset.dateShift === "1" ? "Наступний день буде доступний після синхронізації календаря." : "Попередній день буде доступний після синхронізації календаря.");
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "open-branch-switcher") {
    openBranchSwitcher();
  } else if (action === "open-settings") {
    state.section = "settings";
    render();
  } else if (action === "logout") {
    await logoutFromSystem();
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
  if (event.target.id === "branch-create-form") {
    event.preventDefault();
    if (state.role !== "admin") return;
    const data = new FormData(event.target);
    const hours = String(data.get("hours") || "09:00–19:00").split("–");
    const payload = { name: data.get("name"), city: data.get("city"), address: data.get("address"), phone: data.get("phone"), hoursStart: hours[0], hoursEnd: hours[1] || "19:00" };
    try {
      let branch = { ...payload, id: `branch-${Date.now()}` };
      if (apiReady) {
        const response = await apiRequest("/branches", { method: "POST", body: JSON.stringify(payload) });
        branch = response.branch;
      }
      state.branches.push(branch);
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
    const masterName = state.role === "master" ? currentMasterName : data.get("master");
    const slot = { id: slotId || `unavailable-${Date.now()}`, date: data.get("date"), master: masterName, start: data.get("start"), end: data.get("end"), reason: data.get("reason"), createdBy: state.role };
    const master = state.masters.find((item) => item.name === slot.master);
    if (!master) {
      showToast("Оберіть майстра для цього інтервалу.");
      return;
    }
    if (state.role === "master" && slot.master !== currentMasterName) {
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
    const duplicate = state.unavailableSlots.some((item) => item.id !== slotId && item.date === slot.date && item.master === slot.master && timeOverlaps(slot.start, slot.end, item.start, item.end));
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

render();
loadPersistentState();
