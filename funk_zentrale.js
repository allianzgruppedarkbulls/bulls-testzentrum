// ==========================================
// DARK BULLS - CHAT GEHIRN (FUNK_ZENTRALE.JS)
// ==========================================

const CHAT_API = window.BULLS_CONFIG.SCRIPT_URL;

// Globaler Zwischenspeicher für Daten
let activeChatType = "allianz"; // "allianz", "pn", "gruppe", "support"
let currentChatTarget = "global"; // Name des PN-Partners, Gruppen-ID oder "support"
let chatInterval = null;
let typingTimeout = null;

// 1. INITIALISIERUNG BEIM START (INKLUSIVE SUPPORT-KANAL-SPLIT)
function initFunkkreis(type) {
    activeChatType = type;
    const user = localStorage.getItem('bulls_user');
    if (!user) { window.location.href = "index.html"; return; }

    const role = localStorage.getItem('bulls_role') || 'Mitglied';
    const extra = localStorage.getItem('bulls_extra') || '';
    let displayRole = role; if (extra) displayRole += " | " + extra;
    
    const uDisp = document.getElementById('userDisplay');
    if (uDisp) uDisp.innerText = `${user} (${displayRole})`;

    // Taktischer Support-Kanal-Split: Support-Meldungen laufen immer an das Ziel "support"
    if (type === "support") {
        currentChatTarget = "support";
    }

    updateMuteStatusAndFetch();
    chatInterval = setInterval(updateMuteStatusAndFetch, 3000);

    const msgInput = document.getElementById('messageInput');
    if (msgInput) {
        msgInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') sendFunkMessage(); });
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
            if (sendBtn && sendBtn.disabled) {
                sendBtn.disabled = false;
            }
        }

        // B. Chat-Daten aus der Cloud ziehen
        const chatRes = await fetch(`${CHAT_API}?action=getChatData&user=${encodeURIComponent(user)}`);
        const chatData = await chatRes.json();
        
        // Verteiler an die Logik der geöffneten HTML-Seite (PN, Gruppe oder Support)
        if (typeof processChatData === "function") {
            processChatData(chatData);
        }

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
    inputField.value = ""; // Sofort leeren für flüssiges Schreibgefühl

    const payload = {
        action: "sendChatMessage",
        user: user,
        msg: messageText,
        type: activeChatType, 
        target: currentChatTarget 
    };

    try {
        await fetch(CHAT_API, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        updateMuteStatusAndFetch(); // Sofortigen Refresh erzwingen
    } catch (e) {
        console.error("Funkspruch-Übertragungsfehler:", e);
    }
}

// 4. SCHREIB-INDIKATOR FUNKTIONEN
function triggerTypingIndicator() {
    const user = localStorage.getItem('bulls_user');
    if (typingTimeout) clearTimeout(typingTimeout);

    // Signalisiere dem HQ-Server "Ich tippe..."
    fetch(CHAT_API, {
        method: "POST",
        body: JSON.stringify({ action: "setTyping", user: user, target: currentChatTarget, status: true })
    });

    // Nach 3 Sekunden Inaktivität Zustand wieder löschen
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
    const teile = dateStr.split(" ");
    if (teile.length < 2) return dateStr;
    return teile[1]; // Schneidet das Datum ab, liefert nur "HH:mm"
}

// 6. CENTRAL LOGOUT
function logoutFunk() {
    if (chatInterval) clearInterval(chatInterval);
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
}
