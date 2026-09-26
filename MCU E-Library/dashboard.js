// Guard: redirect to sign-in if nobody's logged in.
const currentUserEmail = localStorage.getItem("mcu_current_user");

if (!currentUserEmail) {
    window.location.href = "signin.html";
}

const accounts = JSON.parse(localStorage.getItem("mcu_accounts") || "{}");
const account = accounts[currentUserEmail];

if (!account) {
    // Account no longer exists (e.g. storage was cleared) — force re-login.
    localStorage.removeItem("mcu_current_user");
    window.location.href = "signin.html";
}

// Map programme values to readable labels (matches register.html's <select>).
const programmeLabels = {
    "medicine": "Medicine and Surgery",
    "nursing": "Nursing",
    "anatomy": "Human Anatomy",
    "physiology": "Human Physiology",
    "pharmacy": "Pharmacy",
    "medical-laboratory": "Medical Laboratory Science",
    "dentistry": "Dentistry",
    "public-health": "Public Health",
    "other": "Other"
};

// Welcome message with first name only.
const firstName = account.fullname ? account.fullname.split(" ")[0] : "Student";
document.getElementById("welcomeHeading").textContent = `Welcome back, ${firstName} 👋`;

// Subscription status.
const subStatus = document.getElementById("subStatus");
const subMessage = document.getElementById("subMessage");
const subAction = document.getElementById("subAction");

if (account.subscribed) {
    subStatus.textContent = "Active";
    subStatus.classList.remove("status-inactive");
    subStatus.classList.add("status-active");
    const expiryDate = account.subscriptionExpires ? new Date(account.subscriptionExpires).toDateString() : "";
    subMessage.textContent = `Active until ${expiryDate}.`;
    subAction.textContent = "Manage Subscription";
} else {
    subStatus.textContent = "Not Active";
    subStatus.classList.remove("status-active");
    subStatus.classList.add("status-inactive");
    subMessage.textContent = "Subscribe to access premium medical resources.";
    subAction.textContent = "Subscribe ₦2,500/month";
}

// Account Information.
document.getElementById("infoFullname").textContent = account.fullname || "—";
document.getElementById("infoEmail").textContent = currentUserEmail;
document.getElementById("infoInstitution").textContent = account.institution || "—";
document.getElementById("infoProgramme").textContent = programmeLabels[account.programme] || "—";

// Sign out.
const signOutBtn = document.getElementById("signOutBtn");

if (signOutBtn) {
    signOutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("mcu_current_user");
        localStorage.removeItem("mcu_subscribed");
        window.location.href = "signin.html";
    });
} else {
    console.warn("Sign out button not found on this page.");
}