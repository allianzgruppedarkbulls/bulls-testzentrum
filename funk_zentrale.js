// ==========================================
// DARK BULLS - CHAT GEHIRN (FUNK_ZENTRALE.JS)
// ==========================================

const CHAT_API = window.BULLS_CONFIG.SCRIPT_URL;

// Globaler Zwischenspeicher für Daten
let activeChatType = "allianz"; // "allianz", "pn", "gruppe"
let currentChatTarget = "global"; // Name des PN-Partners oder Gruppen-ID
let chatInterval = null;
let typingTimeout = null;

// 1. INITIALISIERUNG BEIM START
function initFunkkreis(type) {
    activeChatType = type;
    
    // Prüfen ob User eingeloggt ist
    const user = localStorage.getItem('bulls_user');
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // Header-Daten setzen
    const role = localStorage.getItem('bulls_role') || 'Mitglied';
    const extra = localStorage.getItem('bulls_extra') || '';
    let displayRole = role;
    if (extra) displayRole += " | " + extra;
    
    const uDisp = document.getElementById('userDisplay');
    if (uDisp) uDisp.innerText = `${user} (${displayRole})`;

    // Ersten Abruf starten & Polling aktivieren (alle 3 Sekunden)
    updateMuteStatusAndFetch();
    chatInterval = setInterval(updateMuteStatusAndFetch, 3000);

    // Enter-Taste im Textfeld abfangen
    const msgInput = document.getElementById('messageInput');
    if (msgInput) {
        msgInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendFunkMessage();
        });
        // Typing Indicator Trigger
        msgInput.addEventListener('input', triggerTypingIndicator);
    }
}

// 2. LIVE-ABRUF (MUTE CHECK + CHAT DATA)
async function updateMuteStatusAndFetch() {
    const user = localStorage.getItem('bulls_user');
    try {
        // A. Mute Status prüfen
        const muteRes = await fetch(`${CHAT_API}?action=checkMute&user=${encodeURIComponent(user)}`);
        const muteData = await muteRes.json();
        
        const inputField = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendButton');
        
        if (muteData.muted) {
            if (inputField) {
                inputField.disabled = true;
                inputField.placeholder = `FUNKSPERRE! Du bist noch für ${muteData.rest} Min. stummgeschaltet. 🔇`;
            }
            if (sendBtn) sendBtn.disabled = true;
        } else {
            if (inputField && inputField.disabled) {
                inputField.disabled = false;
                inputField.placeholder = "Funkspruch eingeben...";
            }
            if (sendBtn) sendBtn.disabled = false;
        }

        // B. Chat-Daten ziehen (Verwendet das optimierte Backend)
        const chatRes = await fetch(`${CHAT_API}?action=getChatData&user=${encodeURIComponent(user)}`);
        const chatData = await chatRes.json();
        
        // Verteilung an die jeweilige HTML-Logik
        processChatData(chatData);

    } catch (e) {
        console.error("Fehler beim Funkkreis-Update:", e);
    }
}

// 3. NACHRICHT ABFEUERN (POST REQUEST)
async function sendFunkMessage() {
    const inputField = document.getElementById('messageInput');
    if (!inputField || !inputField.value.trim()) return;
    
    const user = localStorage.getItem('bulls_user');
    const messageText = inputField.value.trim();
    inputField.value = ""; // Textfeld sofort leeren für flüssiges Schreibgefühl

    const payload = {
        action: "sendChatMessage",
        user: user,
        msg: messageText,
        type: activeChatType, // "allianz", "pn" oder "gruppe"
        target: currentChatTarget // "global", Username oder Gruppen-ID
    };

    try {
        await fetch(CHAT_API, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        updateMuteStatusAndFetch(); // Sofort neu laden
    } catch (e) {
        console.error("Funkspruch-Übertragungsfehler:", e);
    }
}

// 4. SCHREIB-INDIKATOR FUNKTIONEN
function triggerTypingIndicator() {
    const user = localStorage.getItem('bulls_user');
    if (typingTimeout) clearTimeout(typingTimeout);

    // Signalisiere dem Server "Ich schreibe..."
    fetch(CHAT_API, {
        method: "POST",
        body: JSON.stringify({ action: "setTyping", user: user, target: currentChatTarget, status: true })
    });

    // Nach 3 Sekunden Inaktivität stoppen
    typingTimeout = setTimeout(() => {
        fetch(CHAT_API, {
            method: "POST",
            body: JSON.stringify({ action: "setTyping", user: user, target: currentChatTarget, status: false })
        });
    }, 3000);
}

// 5. HELPER: ZEIT-FORMATIERUNG
function formatFunkZeit(dateStr) {
    if (!dateStr) return "";
    // Erwartet "dd.MM.yyyy HH:mm" vom Google Sheet
    const teile = dateStr.split(" ");
    if (teile.length < 2) return dateStr;
    return teile[1]; // Gibt nur "HH:mm" zurück
}

// 6. LOGOUT
function logoutFunk() {
    if (chatInterval) clearInterval(chatInterval);
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
}
