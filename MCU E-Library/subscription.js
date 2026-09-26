// Require sign-in before subscribing, and tag the WhatsApp message with the student's email.
document.querySelectorAll(".whatsapp-subscribe-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const currentUserEmail = localStorage.getItem("mcu_current_user");

        if (!currentUserEmail) {
            e.preventDefault();
            alert("Please sign in first so we can activate your subscription after payment.");
            window.location.href = "signin.html";
            return;
        }

        // Append the student's email to the WhatsApp message so you know who's paying.
        const url = new URL(btn.href);
        const existingText = url.searchParams.get("text") || "";
        url.searchParams.set("text", `${existingText} (Account: ${currentUserEmail})`);
        btn.href = url.toString();
    });
});

// ==========================
// ADMIN TOOL — for you only
// ==========================
// Usage (in the browser console, on subscription.html):
//   mcuActivateSubscription("student@email.com", "1month")
//   mcuActivateSubscription("student@email.com", "6months")
//   mcuActivateSubscription("student@email.com", "1year")
//   mcuActivateSubscription("student@email.com", "cancel")   // to deactivate

const PLAN_DURATIONS_DAYS = {
    "1month": 30,
    "6months": 182,
    "1year": 365
};

window.mcuActivateSubscription = function (email, plan = "1month") {
    email = email.trim().toLowerCase();
    const accounts = JSON.parse(localStorage.getItem("mcu_accounts") || "{}");

    if (!accounts[email]) {
        console.error(`No account found for ${email}`);
        return;
    }

    if (plan === "cancel") {
        accounts[email].subscribed = false;
        accounts[email].subscriptionExpires = null;
        localStorage.setItem("mcu_accounts", JSON.stringify(accounts));
        if (localStorage.getItem("mcu_current_user") === email) {
            localStorage.setItem("mcu_subscribed", "false");
        }
        console.log(`${email} subscription cancelled.`);
        return;
    }

    const days = PLAN_DURATIONS_DAYS[plan];
    if (!days) {
        console.error(`Unknown plan "${plan}". Use "1month", "6months", or "1year".`);
        return;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    accounts[email].subscribed = true;
    accounts[email].subscriptionExpires = expiryDate.toISOString();
    localStorage.setItem("mcu_accounts", JSON.stringify(accounts));

    if (localStorage.getItem("mcu_current_user") === email) {
        localStorage.setItem("mcu_subscribed", "true");
    }

    console.log(`${email} activated on the "${plan}" plan. Expires: ${expiryDate.toDateString()}`);
};
