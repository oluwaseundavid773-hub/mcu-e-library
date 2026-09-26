// Get the resource ID from the URL and normalize it
const urlParams = new URLSearchParams(window.location.search);
let rawId = (urlParams.get("id") || "").toLowerCase().trim();

// Automatically map capital letters/spaces to exact resourceLibrary keys
let resourceId = rawId;
if (rawId.includes("surg") || rawId.includes("nursing") || rawId.includes("surgical")) {
    resourceId = "medsurg";
} else if (rawId.includes("physio")) {
    resourceId = "physiology";
} else if (rawId.includes("biochem")) {
    resourceId = "biochemistry";
} else if (rawId.includes("microbio")) {
    resourceId = "microbiology";
} else if (rawId.includes("pharmaco")) {
    resourceId = "pharmacology";
} else if (rawId.includes("medicine")) {
    resourceId = "medicine";
}

// Find the resource in resource-data.js
const resource = resourceLibrary[resourceId];

// If resource doesn't exist
if (!resource) {

    document.body.innerHTML = `
        <div style="
            padding: 60px;
            text-align: center;
            font-family: Arial, sans-serif;
        ">
            <h1>Resource Not Found</h1>

            <p>
                Sorry, the resource you are looking for
                could not be found.
            </p>

            <a href="library.html">
                ← Back to Library
            </a>
        </div>
    `;

} else {

    // Browser tab title
    document.title = `${resource.title} | MCU E-LIBRARY`;

    // Safely update elements by checking class or ID
    const titleEl = document.querySelector("#resource-title") || document.querySelector(".resource-title") || document.querySelector("h1");
    if (titleEl) titleEl.textContent = resource.title;

    const tagEl = document.querySelector("#resTag") || document.querySelector("#metaType") || document.querySelector(".tag");
    if (tagEl) tagEl.textContent = resource.tag || resource.department;

    const authorEl = document.querySelector("#resAuthor") || document.querySelector(".author");
    if (authorEl) authorEl.textContent = resource.author;

    const descEl = document.querySelector("#resDescription") || document.querySelector(".resource-description");
    if (descEl) descEl.textContent = resource.description;
    // Resource type
    document.querySelector("#metaType").textContent =
        resource.tag;

    // Year
    document.querySelector("#metaYear").textContent =
        resource.year;

// Safely parse current user without crashing on invalid JSON
    let currentUser = null;
    try {
        const rawUser = localStorage.getItem("mcu_current_user");
        currentUser = rawUser ? JSON.parse(rawUser) : null;
    } catch (err) {
        // Fallback if mcu_current_user was stored as a plain string
        currentUser = { subscribed: true };
    }

    const standaloneSub = localStorage.getItem("mcu_subscribed");

    const isSubscribed =
    (currentUser && (currentUser.subscribed === true || currentUser.subscribed === "true")) ||
    (currentUser && (currentUser.isSubscribed === true || currentUser.isSubscribed === "true")) ||
    standaloneSub === "true";

    if (isSubscribed) {
        // Target all buttons/links on the page
        const allButtons = document.querySelectorAll("button, a, div");

        allButtons.forEach(el => {
            // Hide the box containing "Subscribe to Access"
            if (el.textContent.trim() === "Subscribe to Access") {
                const subCard = el.closest("div");
                if (subCard && subCard.parentElement) {
                    subCard.parentElement.style.display = "none";
                }
            }

            // Transform "Get Access" into "Open Resource"
            if (el.textContent.trim() === "Get Access") {
                el.textContent = "Open Resource";
                el.style.backgroundColor = "#16a34a"; // Green background
                el.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = `reader.html?id=${resourceId}`;
                };
            }
        });
    }
}