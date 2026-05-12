// Gemeinsame Helper-Funktionen für alle Seiten
(function () {
  function getUser() {
    return {
      name: localStorage.getItem("bulls_user") || "",
      role: localStorage.getItem("bulls_role") || "",
      extra: localStorage.getItem("bulls_extra") || "",
    };
  }

  function requireLogin(redirectTo) {
    const u = getUser();
    if (!u.name) {
      window.location.href = redirectTo || "index.html";
      return false;
    }
    return true;
  }

  function setMessengerTarget(tab, partner) {
    if (tab) localStorage.setItem("bulls_messenger_tab", tab);
    if (partner) localStorage.setItem("bulls_messenger_partner", partner);
  }

  function consumeMessengerTarget() {
    const tab = localStorage.getItem("bulls_messenger_tab") || "";
    const partner = localStorage.getItem("bulls_messenger_partner") || "";
    localStorage.removeItem("bulls_messenger_tab");
    localStorage.removeItem("bulls_messenger_partner");
    return { tab, partner };
  }

  window.Bulls = {
    getUser,
    requireLogin,
    setMessengerTarget,
    consumeMessengerTarget,
  };
})();

