(function () {
    const currentUserEmail = localStorage.getItem("mcu_current_user");
    if (!currentUserEmail) return;

    const accounts = JSON.parse(localStorage.getItem("mcu_accounts") || "{}");
    const account = accounts[currentUserEmail];
    if (!account) return;

    if (account.subscribed && account.subscriptionExpires) {
        const expiry = new Date(account.subscriptionExpires);
        const now = new Date();

        if (now > expiry) {
            account.subscribed = false;
            accounts[currentUserEmail] = account;
            localStorage.setItem("mcu_accounts", JSON.stringify(accounts));
            localStorage.setItem("mcu_subscribed", "false");
            console.log(`Subscription for ${currentUserEmail} has expired.`);
        }
    }
})();