<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>DARK BULLS - DIREKTFUNK</title>
    <script src="config.js"></script>
    <script src="funk_zentrale.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Almendra:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; background-color: #050505; color: white; font-family: 'Almendra', serif; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
        
        /* NAVIGATION BAR */
        .funk-nav { display: flex; justify-content: space-between; align-items: center; background: #0c0c0e; border-bottom: 2px solid #ff3131; padding: 10px 20px; box-shadow: 0 4px 15px rgba(255, 49, 49, 0.2); }
        .nav-links { display: flex; gap: 15px; }
        .nav-link-btn { background: #111; border: 1px solid #333; color: #888; font-family: 'Almendra'; padding: 10px 20px; font-size: 16px; border-radius: 6px; cursor: pointer; text-transform: uppercase; transition: 0.2s; }
        .nav-link-btn:hover { color: #fff; border-color: #ff3131; }
        .nav-link-btn.active { background: #ff3131; color: #000; border-color: #ff3131; font-weight: bold; box-shadow: 0 0 15px rgba(255, 49, 49, 0.4); }
        .logout-btn { background: #ff0000; color: #fff; border: none; padding: 8px 15px; font-family: 'Almendra'; font-weight: bold; border-radius: 4px; cursor: pointer; text-transform: uppercase; }

       /* MULTI-PANEL CHAT LAYOUT */
.chat-container { flex: 1; display: flex; max-width: 1400px; width: 100%; margin: 0 auto; background: rgba(10, 10, 10, 0.95); border-left: 1px solid #222; border-right: 1px solid #222; overflow: hidden; }

/* LINKER PRIVAT-FUNK-VERTEILER */
.side-bar { width: 320px; background: #0b0b0c; border-right: 1px solid #222; display: flex; flex-direction: column; }

.new-chat-action-btn { background: #111; border: 1px solid #ff8c00; color: #ff8c00; padding: 12px; margin: 15px 15px 5px 15px; font-family: 'Almendra'; font-weight: bold; font-size: 15px; border-radius: 6px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: 0.2s; box-shadow: 0 0 10px rgba(255, 140, 0, 0.1); display: block; text-align: center; }
.new-chat-action-btn:hover { background: #ff8c00; color: #000; box-shadow: 0 0 15px rgba(255, 140, 0, 0.4); }

.search-box { padding: 10px 15px 15px 15px; border-bottom: 1px solid #1a1a1a; position: relative; }
.search-box input { width: 100%; background: #151515; border: 1px solid #333; padding: 10px; color: #fff; border-radius: 5px; box-sizing: border-box; }
.search-box input:focus { outline: none; border-color: #ff3131; }

/* Dropdown für feste Spieler-Liste */
.search-results { position: absolute; top: 55px; left: 15px; right: 15px; background: #0c0c0e; border: 1px solid #ff8c00; border-radius: 6px; max-height: 300px; overflow-y: auto; z-index: 9999; display: none; box-shadow: 0 10px 25px rgba(0,0,0,0.9); }
.search-results-header { background: #151518; padding: 8px 12px; font-size: 13px; color: #ff8c00; font-weight: bold; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
.search-result-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #161616; font-family: sans-serif; font-size: 14px; display: flex; justify-content: space-between; align-items: center; color: #eee; }
.search-result-item:hover { background: #ff8c00; color: #000; font-weight: bold; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #39d353; box-shadow: 0 0 8px #39d353; }

.chat-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
.chat-item { padding: 15px 20px; border-bottom: 1px solid #1a1a1a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; }
.chat-item:hover { background: #151515; border-left: 3px solid #ff3131; }
.chat-item.active { background: #1c1515; border-left: 3px solid #ff3131; }
.chat-name { font-weight: bold; font-size: 16px; }

.unread-badge { background: #ff3131; color: white; font-family: sans-serif; font-size: 12px; font-weight: bold; padding: 3px 8px; border-radius: 10px; box-shadow: 0 0 10px rgba(255,49,49,0.5); }

/* RECHTER CHAT STREAM */
        .chat-main { flex: 1; display: flex; flex-direction: column; position: relative; }
        
        /* CHAT HEADER MIT SUPPORT BUTTON */
        .chat-header-bar { display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; background: #0c0c0e; border-bottom: 1px solid #222; min-height: 25px; }
        .report-btn { background: #221111; border: 1px solid #ff3131; color: #ff3131; padding: 5px 12px; font-family: 'Almendra'; font-size: 13px; border-radius: 4px; cursor: pointer; text-transform: uppercase; transition: 0.2s; display: none; }
        .report-btn:hover { background: #ff3131; color: #000; font-weight: bold; box-shadow: 0 0 10px rgba(255, 49, 49, 0.4); }

        .stream-area { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
        .typing-box { padding: 5px 20px; color: #ff8c00; font-size: 14px; font-style: italic; min-height: 20px; }

        /* INPUT AREA */
        .input-bar { display: flex; gap: 12px; padding: 20px; background: #0c0c0e; border-top: 1px solid #222; align-items: center; position: relative; }
        .input-bar input { flex: 1; background: #151515; border: 1px solid #ff3131; padding: 15px; color: #fff; font-family: sans-serif; font-size: 15px; border-radius: 6px; }
        .input-bar input:focus { outline: none; box-shadow: 0 0 10px rgba(255, 49, 49, 0.3); }
        
        .frog-trigger-btn { background: #151515; border: 1px solid #ff3131; font-size: 22px; cursor: pointer; padding: 11px; border-radius: 6px; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
        .frog-trigger-btn:hover { background: #1c251c; border-color: #39d353; }
        
        .send-btn { background: #ff8c00; color: #000; border: none; padding: 15px 35px; font-family: 'Almendra'; font-size: 18px; font-weight: bold; border-radius: 6px; cursor: pointer; text-transform: uppercase; box-shadow: 0 0 15px rgba(255, 140, 0, 0.3); }
        .send-btn:hover { background: #e07b00; }

        /* DISCORD-STYLE FROSCH BOX */
        .frog-box { position: absolute; bottom: 85px; right: 20px; width: 360px; height: 340px; background: #0f0f11; border: 2px solid #39d353; border-radius: 8px; display: none; flex-direction: column; box-shadow: 0 0 25px rgba(57, 211, 83, 0.4); z-index: 2000; }
        .frog-header { background: #161a16; padding: 8px 12px; font-weight: bold; color: #39d353; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
        
        .frog-tabs { display: flex; background: #111; border-bottom: 1px solid #222; }
        .frog-tab-btn { flex: 1; padding: 8px 5px; font-family: 'Almendra'; font-size: 13px; background: none; border: none; color: #666; cursor: pointer; border-bottom: 2px solid transparent; text-align: center; }
        .frog-tab-btn.active { color: #39d353; border-bottom-color: #39d353; background: #161a16; font-weight: bold; }

        .frog-grid { flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 12px; overflow-y: auto; }
        .frog-item { cursor: pointer; border: 1px solid #222; padding: 5px; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #151515; transition: 0.1s; height: 55px; }
        .frog-item:hover { border-color: #39d353; background: #1c251c; transform: scale(1.06); }
        .frog-item img { width: 42px; height: 42px; object-fit: contain; }

        /* STREAM STYLES */
        .msg-line { display: flex; flex-direction: column; background: #111; border-left: 3px solid #ff3131; padding: 10px 15px; border-radius: 0 6px 6px 0; max-width: 85%; align-self: flex-start; }
        .msg-line.me { border-left: none; border-right: 3px solid #39d353; border-radius: 6px 0 0 6px; background: #161a16; align-self: flex-end; }
        .msg-meta { font-size: 13px; margin-bottom: 4px; display: flex; gap: 10px; }
        .meta-user { color: #ff3131; font-weight: bold; }
        .msg-line.me .meta-user { color: #39d353; }
        .meta-time { color: #666; }
        .msg-text { font-family: sans-serif; font-size: 15px; line-height: 1.4; color: #eee; word-break: break-word; }
        .msg-text img.chat-pepe { max-width: 50px; max-height: 50px; display: inline-block; vertical-align: middle; margin: 2px; }
        
        .side-bar::-webkit-scrollbar, .stream-area::-webkit-scrollbar, .frog-grid::-webkit-scrollbar { width: 6px; }
        .side-bar::-webkit-scrollbar-thumb, .stream-area::-webkit-scrollbar-thumb, .frog-grid::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
    </style>
</head>
<body>

    <div class="funk-nav">
        <div class="nav-links">
            <button class="nav-link-btn" onclick="window.location.href='dashboard.html'">🏠 HQ</button>
            <button class="nav-link-btn active">💬 PNs</button>
            <button class="nav-link-btn" onclick="window.location.href='Chat_Group.html'">⚔️ Gruppen</button>
            <button class="nav-link-btn" onclick="window.location.href='Chat_Support.html'">🚨 Support</button>
        </div>
        <div style="color: #ff3131; font-size: 18px;" id="userDisplay">Bulls Direktfunk...</div>
        <button class="logout-btn" onclick="logoutFunk()">X</button>
    </div>

    <div class="chat-container">
        
        <div class="side-bar">
            <button class="new-chat-action-btn" onclick="openFesteSpielerListe(event)">➕ Neuen Chat öffnen</button>

            <div class="search-box">
                <input type="text" id="userInputSearch" placeholder="🔍 Namen filtern..." oninput="searchAllianzUser(this.value)">
                <div class="search-results" id="searchResultsDropdown"></div>
            </div>
            <div class="chat-list" id="pnChatVerteiler"></div>
        </div>

        <div class="chat-main">
            <div class="chat-header-bar">
                <span id="activeTargetLabel" style="color:#aaa; font-size:14px;">Kein Kanal aktiv</span>
                <button class="report-btn" id="reportChannelBtn" onclick="reportCurrentPlayer()">🚨 PN an Support melden</button>
            </div>

            <div class="stream-area" id="pnStreamArea">
                <div style="text-align:center; color:#ff8c00; font-style:italic; padding-top:50px;">Wähle links einen aktiven Kanal aus oder nutze die Suche, um ein neues Gespräch zu beginnen. ⚡</div>
            </div>
            
            <div class="typing-box" id="typingIndicator"></div>

            <div class="input-bar">
                <button class="frog-trigger-btn" id="frogTrigger" onclick="toggleFrogBox()">🐸</button>
                <input type="text" id="messageInput" placeholder="Privaten Funkspruch eingeben..." maxlength="500" autocomplete="off" disabled>
                <button class="send-btn" id="sendButton" onclick="triggerSendAction()" disabled>Senden</button>

                <div class="frog-box" id="frogBox">
                    <div class="frog-header">
                        <span>FROSCH-FUNK MULTIVERSUM</span>
                        <span style="cursor:pointer;color:#ff3131;font-weight:bold;" onclick="toggleFrogBox()">X</span>
                    </div>
                    <div class="frog-tabs">
                        <button class="frog-tab-btn active" id="tab-classic" onclick="switchFrogTab('classic')">🟢 Klassiker</button>
                        <button class="frog-tab-btn" id="tab-hype" onclick="switchFrogTab('hype')">🔥 Hype & Fun</button>
                        <button class="frog-tab-btn" id="tab-sad" onclick="switchFrogTab('sad')">💀 Ernst</button>
                    </div>
                    <div class="frog-grid" id="frogGrid"></div>
                </div>
            </div>
        </div>

    </div>

    <script>
        let allianzUsersList = [];
        let locallyOpenedChats = new Set(); 
        let currentTab = 'classic';

        // Die globalen Steuerungsvariablen der funk_zentrale.js direkt bedienen!
        window.currentChatTarget = "global"; 

        const FROG_DATABASE = {
            classic: [
                { code: "[pepeFrog]", url: "https://openmoji.org/data/color/svg/1F438.svg" },
                { code: "[pepeEZ]", url: "https://openmoji.org/data/color/svg/1F60E.svg" },
                { code: "[pepeSmile]", url: "https://openmoji.org/data/color/svg/1F642.svg" },
                { code: "[pepeWink]", url: "https://openmoji.org/data/color/svg/1F609.svg" },
                { code: "[pepeLove]", url: "https://openmoji.org/data/color/svg/1F970.svg" },
                { code: "[pepeHeart]", url: "https://openmoji.org/data/color/svg/1F44D.svg" },
                { code: "[pepeCool]", url: "https://openmoji.org/data/color/svg/1F919.svg" },
                { code: "[pepeSalute]", url: "https://openmoji.org/data/color/svg/1F601.svg" }
            ],
            hype: [
                { code: "[pepeFire]", url: "https://openmoji.org/data/color/svg/1F525.svg" },
                { code: "[pepeRocket]", url: "https://openmoji.org/data/color/svg/1F680.svg" },
                { code: "[pepePopcorn]", url: "https://openmoji.org/data/color/svg/1F37F.svg" },
                { code: "[pepeCrown]", url: "https://openmoji.org/data/color/svg/1F451.svg" },
                { code: "[pepeBeer]", url: "https://openmoji.org/data/color/svg/1F37A.svg" },
                { code: "[pepeTrophy]", url: "https://openmoji.org/data/color/svg/1F3C6.svg" },
                { code: "[pepeFlex]", url: "https://openmoji.org/data/color/svg/1F4AA.svg" },
                { code: "[pepeParty]", url: "https://openmoji.org/data/color/svg/1F973.svg" }
            ],
            sad: [
                { code: "[pepeJail]", url: "https://openmoji.org/data/color/svg/1F6A8.svg" },
                { code: "[pepeSad]", url: "https://openmoji.org/data/color/svg/1F343.svg" },
                { code: "[pepeClown]", url: "https://openmoji.org/data/color/svg/1F0CF.svg" },
                { code: "[pepeSkull]", url: "https://openmoji.org/data/color/svg/1F480.svg" },
                { code: "[pepeAngry]", url: "https://openmoji.org/data/color/svg/1F4A5.svg" },
                { code: "[pepeWarning]", url: "https://openmoji.org/data/color/svg/26A0.svg" },
                { code: "[pepeStop]", url: "https://openmoji.org/data/color/svg/1F6D1.svg" },
                { code: "[pepeGhost]", url: "https://openmoji.org/data/color/svg/1F47B.svg" }
            ]
        };

        window.addEventListener("DOMContentLoaded", async () => {
            buildFrogMenu();
            
            // Initialisierung zwingend als "pn" starten!
            try {
                if (typeof initFunkkreis === "function") {
                    initFunkkreis("pn");
                }
            } catch(e) { console.error("Fehler bei initFunkkreis:", e); }

            await loadAllianzUserBase();
        });

        // Schickt die Nachricht über das Gehirn (funk_zentrale.js) raus
        function triggerSendAction() {
            if (typeof sendFunkMessage === "function") {
                sendFunkMessage();
            } else {
                console.error("sendFunkMessage() nicht gefunden!");
            }
        }

        function buildFrogMenu() {
            const grid = document.getElementById("frogGrid");
            if (!grid) return;
            grid.innerHTML = "";
            
            const selectedList = FROG_DATABASE[currentTab] || FROG_DATABASE.classic;
            selectedList.forEach(frog => {
                let div = document.createElement("div");
                div.className = "frog-item";
                div.title = frog.code;
                div.onclick = () => injectFrogCode(frog.code);
                div.innerHTML = `<img src="${frog.url}">`;
                grid.appendChild(div);
            });
        }

        function switchFrogTab(tabName) {
            currentTab = tabName;
            document.querySelectorAll('.frog-tab-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`tab-${tabName}`).classList.add('active');
            buildFrogMenu();
        }

        function toggleFrogBox() {
            const box = document.getElementById("frogBox");
            if (!box) return;
            box.style.display = box.style.display === "flex" ? "none" : "flex";
        }

        function injectFrogCode(code) {
            const input = document.getElementById("messageInput");
            if (!input) return;
            input.value += " " + code + " ";
            toggleFrogBox();
            input.focus();
        }

        function parseFrogEmojis(text) {
            if (!text) return "";
            let cleanText = text;
            Object.values(FROG_DATABASE).flat().forEach(frog => {
                const regex = new RegExp(frog.code.replace('[','\\[').replace(']','\\]'), 'g');
                cleanText = cleanText.replace(regex, `<img class="chat-pepe" src="${frog.url}" title="${frog.code}">`);
            });
            return cleanText;
        }

        async function loadAllianzUserBase() {
            try {
                const apiUrl = (window.BULLS_CONFIG && window.BULLS_CONFIG.SCRIPT_URL) ? window.BULLS_CONFIG.SCRIPT_URL : "";
                if(!apiUrl) return;
                const res = await fetch(apiUrl + "?action=getDropdownData");
                const data = await res.json();
                if(data && data.user && Array.isArray(data.user)) {
                    allianzUsersList = data.user.map(u => {
                        if (!u) return "";
                        return typeof u === "object" ? u.name : u;
                    }).filter(name => name && name.trim() !== "");
                }
            } catch(e) { 
                allianzUsersList = ["Admin-Zentrale", "TestUser"];
            }
        }

        function openFesteSpielerListe(event) {
            if(event) event.stopPropagation();
            searchAllianzUser("");
        }

        function searchAllianzUser(query) {
            const dropdown = document.getElementById("searchResultsDropdown");
            if(!dropdown) return;
            const myUser = localStorage.getItem('bulls_user') || "";
            dropdown.innerHTML = "";

            let matches = allianzUsersList.filter(name => name.toLowerCase().includes(query.toLowerCase()) && name !== myUser);
            dropdown.style.display = "block";

            let header = document.createElement("div");
            header.className = "search-results-header";
            header.innerHTML = `<span>VERFÜGBARE SPIELER</span><span style="cursor:pointer;color:#ff3131;font-size:16px;padding:2px 8px;" onclick="event.stopPropagation(); document.getElementById('searchResultsDropdown').style.display='none'">X</span>`;
            dropdown.appendChild(header);

            if (matches.length > 0) {
                matches.forEach(name => {
                    let div = document.createElement("div");
                    div.className = "search-result-item";
                    div.innerHTML = `<span>👤 ${name}</span><div class="status-dot"></div>`;
                    div.onclick = (e) => { e.stopPropagation(); startNewPNChannel(name); };
                    dropdown.appendChild(div);
                });
            } else {
                let div = document.createElement("div");
                div.style.padding = "15px"; div.style.color = "#666"; div.style.fontFamily = "sans-serif";
                div.innerText = "Keine Spieler online.";
                dropdown.appendChild(div);
            }
        }

        function startNewPNChannel(name) {
            document.getElementById("userInputSearch").value = "";
            document.getElementById("searchResultsDropdown").style.display = "none";
            
            // Extrem wichtig: Ändert die globale Variable im Fenster-Kontext!
            window.currentChatTarget = name; 
            locallyOpenedChats.add(name); 
            
            const inputField = document.getElementById('messageInput');
            const sendBtn = document.getElementById('sendButton');
            if(inputField) { inputField.disabled = false; inputField.placeholder = "Funkspruch eingeben..."; }
            if(sendBtn) sendBtn.disabled = false;
            
            document.getElementById('activeTargetLabel').innerText = `Sicherer Kanal mit: ${name}`;
            document.getElementById('reportChannelBtn').style.display = "block";
            
            if(window.lastChatDataCache) {
                processChatData(window.lastChatDataCache);
            } else {
                processChatData({ pns: [] });
            }

            if(typeof updateMuteStatusAndFetch === "function") updateMuteStatusAndFetch();
        }

        function reportCurrentPlayer() {
            if(!window.currentChatTarget || window.currentChatTarget === "global") return;
            if(confirm(`Möchtest du den PN-Kanal mit [ ${window.currentChatTarget} ] wirklich beim Support melden?`)) {
                window.location.href = `Chat_Support.html?report=${encodeURIComponent(window.currentChatTarget)}`;
            }
        }

        document.addEventListener("click", function(e) {
            const dropdown = document.getElementById("searchResultsDropdown");
            if(dropdown && !e.target.closest('.search-box') && !e.target.closest('.new-chat-action-btn')) {
                dropdown.style.display = "none";
            }
        });

        // Das Herzstück: Verarbeitet die eintreffenden Serverdaten
        function processChatData(data) {
            window.lastChatDataCache = data; 
            const myUser = localStorage.getItem('bulls_user') || "";
            const verteiler = document.getElementById("pnChatVerteiler");
            const stream = document.getElementById("pnStreamArea");
            if(!verteiler || !stream) return;

            let clientLastTimestamp = {};
            let unreadCounts = {};

            if (data && data.pns) {
                data.pns.forEach(msg => {
                    let partner = (msg.user === myUser) ? msg.target : msg.user;
                    if(!partner) return;

                    let msgTime = new Date(msg.time).getTime() || 0;
                    if(!clientLastTimestamp[partner] || msgTime > clientLastTimestamp[partner]) {
                        clientLastTimestamp[partner] = msgTime;
                    }

                    if (msg.unread && msg.target === myUser) {
                        unreadCounts[partner] = (unreadCounts[partner] || 0) + 1;
                    }
                });
            }

            locallyOpenedChats.forEach(chatPartner => {
                if (!clientLastTimestamp[chatPartner]) {
                    clientLastTimestamp[chatPartner] = Date.now(); 
                }
            });

            if (window.currentChatTarget && window.currentChatTarget !== "global") {
                if (!clientLastTimestamp[window.currentChatTarget]) clientLastTimestamp[window.currentChatTarget] = Date.now();
            }

            let sortedClients = Object.keys(clientLastTimestamp).sort((a, b) => clientLastTimestamp[b] - clientLastTimestamp[a]);

            let verteilerHTML = "";
            sortedClients.forEach(clientName => {
                if(!clientName) return;
                let isActive = window.currentChatTarget === clientName ? "active" : "";
                let badgeHTML = unreadCounts[clientName] ? `<span class="unread-badge">${unreadCounts[clientName]}</span>` : "";
                verteilerHTML += `
                    <div class="chat-item ${isActive}" onclick="startNewPNChannel('${clientName}')">
                        <span class="chat-name">👤 ${clientName}</span>
                        ${badgeHTML}
                    </div>
                `;
            });
            verteiler.innerHTML = verteilerHTML || `<div style="padding:20px; color:#555; text-align:center; font-size:14px; font-family:sans-serif;">Keine aktiven PNs. Klicke oben auf "Neuen Chat öffnen"!</div>`;

            if (window.currentChatTarget && window.currentChatTarget !== "global") {
                let htmlHTML = "";
                let filteredPNs = data && data.pns ? data.pns.filter(msg => 
                    (msg.user === myUser && msg.target === window.currentChatTarget) || 
                    (msg.user === window.currentChatTarget && msg.target === myUser)
                ) : [];

                if (filteredPNs.length > 0) {
                    filteredPNs.forEach(msg => {
                        let isMe = msg.user === myUser ? "me" : "";
                        let processedMsg = parseFrogEmojis(msg.msg);
                        htmlHTML += `
                            <div class="msg-line ${isMe}">
                                <div class="msg-meta">
                                    <span class="meta-user">${msg.user}</span>
                                    <span class="meta-time">${typeof formatFunkZeit === "function" ? formatFunkZeit(msg.time) : ""}</span>
                                </div>
                                <div class="msg-text">${processedMsg}</div>
                            </div>
                        `;
                    });
                    
                    stream.innerHTML = htmlHTML;
                    stream.scrollTop = stream.scrollHeight;
                } else {
                    stream.innerHTML = `<div style="text-align:center; color:#ff8c00; padding-top:50px; font-style:italic;">Abgesicherter 1-zu-1 Funkkanal. Schreib eine Nachricht! 🔐</div>`;
                }
            }

            const typingIndicator = document.getElementById("typingIndicator");
            if (typingIndicator && data && data.typing && data.typing.pns && data.typing.pns[window.currentChatTarget]) {
                typingIndicator.innerText = `⚡ ${window.currentChatTarget} schreibt gerade...`;
            } else if(typingIndicator) {
                typingIndicator.innerText = "";
            }
        }
    </script>
</body>
</html>
