// ===================================
// AI BUXGALTER PRO
// GLOBAL APP.JS
// ===================================

// Pul formatlash
function money(value){
    return Number(value)
    .toLocaleString("uz-UZ")
    +" so'm";
}

// ===============================
// LOCAL STORAGE YORDAMCHI
// ===============================
function saveData(key, data){
    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}

function getData(key){
    return JSON.parse(
        localStorage.getItem(key)
    ) || [];
}

// ===============================
// FORMULALAR
// ===============================

// Foyda
function profit(income, expense){
    return income - expense;
}

// Rentabellik %
function profitability(income, expense){
    if(expense <= 0)
        return 0;
    return (
        ((income - expense) / expense) * 100
    ).toFixed(2);
}

// Chegirma
function discount(price, percent){
    return price - (price * percent / 100);
}

// QQS
function vat(price, percent = 12){
    return price * percent / 100;
}

// Ustama
function markup(price, percent){
    return price + (price * percent / 100);
}

// Kredit foizi
function creditInterest(sum, percent, month){
    return sum * (percent / 100) * month;
}

// ===============================
// THEME MANAGEMENT (DARK / LIGHT)
// ===============================

function darkMode(){
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateThemeIcon();
    // Dispatch custom event to notify charts to redraw
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: "dark" } }));
}

function lightMode(){
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateThemeIcon();
    // Dispatch custom event to notify charts to redraw
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: "light" } }));
}

function toggleTheme() {
    if (document.body.classList.contains("dark")) {
        lightMode();
    } else {
        darkMode();
    }
}

function updateThemeIcon() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    if (toggleBtn) {
        if (document.body.classList.contains("dark")) {
            toggleBtn.innerHTML = "☀️";
            toggleBtn.setAttribute("title", "Yorug' rejim");
        } else {
            toggleBtn.innerHTML = "🌙";
            toggleBtn.setAttribute("title", "Tungi rejim");
        }
    }
}

function loadTheme(){
    try {
        let theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        updateThemeIcon();
    } catch (e) {
        console.error("Error loading theme:", e);
    }
}

// Run loadTheme as soon as DOM is ready, and bind events if buttons exist
document.addEventListener("DOMContentLoaded", () => {
    try {
        loadTheme();
        loadSettings();
        
        // Add click listeners to settings buttons if they exist
        const settingsDarkBtn = document.getElementById("settingsDarkBtn");
        const settingsLightBtn = document.getElementById("settingsLightBtn");
        if (settingsDarkBtn) settingsDarkBtn.addEventListener("click", darkMode);
        if (settingsLightBtn) settingsLightBtn.addEventListener("click", lightMode);
    } catch (e) {
        console.error("DOMContentLoaded error:", e);
    }
});

// ===============================
// SOZLAMALAR
// ===============================
function loadSettings(){
    try {
        let settingsStr = localStorage.getItem("settings");
        if (!settingsStr) return;
        
        let settings = JSON.parse(settingsStr);
        if(settings && settings.family){
            // Find all divs with class "user" and update their text content to the family name
            const userDivs = document.querySelectorAll(".user");
            userDivs.forEach(div => {
                div.innerHTML = `<i class="fa fa-user"></i> ${settings.family} oilasi`;
            });
        }
    } catch (e) {
        console.error("Error loading settings:", e);
    }
}

loadSettings();

// ===============================
// AI TAHLIL
// ===============================
function aiAnalyze(income, expense){
    let result = "";
    let p = income - expense;
    let savingsRate = income > 0 ? ((p / income) * 100).toFixed(0) : 0;
    
    if(p > 0){
        if(savingsRate >= 20) {
            result = `✅ Oilaviy byudjet sog'lom! Daromadning ${savingsRate}% qismi jamg'arilmoqda. Jamg'arma maqsadlariga faol pul yo'naltirishni davom ettiring.`;
        } else {
            result = `⚠️ Oilangiz daromadning faqat ${savingsRate}% qismini jamg'arayapti. Jamg'armani ko'paytirish uchun keraksiz shaxsiy xarajatlarni qisqartirish tavsiya etiladi.`;
        }
    } else if (p < 0) {
        result = `🚨 Ogohlantirish! Oilaviy xarajatlar daromaddan oshib ketdi. Zudlik bilan oylik xarajatlar va kommunal to'lovlarni qayta ko'rib chiqing.`;
    } else {
        result = `ℹ️ Byudjet muvozanatda. Oilangizda hech qanday jamg'arma shakllanmayapti. Byudjet chegaralarini qayta rejalashtiring.`;
    }
    return result;
}

// ===============================
// MA'LUMOT TOZALASH
// ===============================
function clearDatabase(){
    let answer = confirm("Barcha ma'lumotlar o'chirilsinmi?");
    if(answer){
        localStorage.clear();
        location.reload();
    }
}
// ===============================
// CHIROYLI ALERT (native alert() o'rniga)
// ===============================
function showPrettyAlert(message){
    let existing = document.getElementById("prettyAlertOverlay");
    if(existing) existing.remove();

    let overlay = document.createElement("div");
    overlay.id = "prettyAlertOverlay";
    overlay.className = "pretty-alert-overlay";

    let icon = "ℹ️";
    let accent = "blue";
    let lower = String(message).toLowerCase();
    if(lower.includes("xato") || lower.includes("to'g'ri") || lower.includes("kiriting") || lower.includes("!")){
        icon = "⚠️";
        accent = "orange";
    }
    if(lower.includes("saqland") || lower.includes("qo'shildi") || lower.includes("muvaffaqiyatli") || lower.includes("qayd etildi")){
        icon = "✅";
        accent = "green";
    }
    if(lower.includes("o'chir")){
        icon = "🗑";
        accent = "red";
    }

    overlay.innerHTML = `
      <div class="pretty-alert-box ${accent}">
        <div class="pretty-alert-icon">${icon}</div>
        <div class="pretty-alert-message">${message}</div>
        <button class="pretty-alert-btn" onclick="document.getElementById('prettyAlertOverlay').remove()">Tushunarli</button>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener("click", function(e){
        if(e.target === overlay){
            overlay.remove();
        }
    });
}

// Standart alert() o'rniga chiroyli oynani ishlatamiz
window.alert = function(message){
    showPrettyAlert(message);
};
