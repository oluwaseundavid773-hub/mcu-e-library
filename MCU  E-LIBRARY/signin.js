document.getElementById("signInForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const errorBox = document.getElementById("signInError");

    // TEMPORARY: reads accounts saved locally by register.js.
    // Replace this whole block with a real backend call once you have one.
    const accounts = JSON.parse(localStorage.getItem("mcu_accounts") || "{}");
    const account = accounts[email];

    if (!account) {
        errorBox.textContent = "No account found with that email.";
        errorBox.style.display = "block";
        return;
    }

    if (account.password !== password) {
        errorBox.textContent = "Incorrect password. Please try again.";
        errorBox.style.display = "block";
        return;
    }

    localStorage.setItem("mcu_current_user", email);
    localStorage.setItem("mcu_subscribed", account.subscribed ? "true" : "false");

    const remember = document.getElementById("remember").checked;
    localStorage.setItem("mcu_remember", remember ? "true" : "false");

    window.location.href = "dashboard.html";
});