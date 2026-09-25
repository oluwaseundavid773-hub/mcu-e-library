document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const institution = document.getElementById("institution").value.trim();
    const programme = document.getElementById("programme").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const termsAccepted = document.getElementById("terms").checked;
    const errorBox = document.getElementById("registerError");

    function showError(message) {
        errorBox.textContent = message;
        errorBox.style.display = "block";
    }

    // Basic validation
    if (!termsAccepted) {
        showError("You must agree to the Terms of Use and Privacy Policy.");
        return;
    }

    if (password.length < 8) {
        showError("Password must be at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }

    // TEMPORARY: stores accounts in the browser's localStorage.
    // Replace this whole block with a real backend call once you have one.
    const accounts = JSON.parse(localStorage.getItem("mcu_accounts") || "{}");

    if (accounts[email]) {
        showError("An account with this email already exists.");
        return;
    }

    accounts[email] = {
        fullname: fullname,
        institution: institution,
        programme: programme,
        password: password,
        subscribed: false
    };

    localStorage.setItem("mcu_accounts", JSON.stringify(accounts));

    // Auto sign-in the newly registered student.
    localStorage.setItem("mcu_current_user", email);
    localStorage.setItem("mcu_subscribed", "false");

    window.location.href = "dashboard.html";
});