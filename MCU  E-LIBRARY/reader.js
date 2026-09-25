document.addEventListener("DOMContentLoaded", () => {
    // 1. Extract ?id= from URL and normalize
    const urlParams = new URLSearchParams(window.location.search);
    let rawId = (urlParams.get("id") || "").toLowerCase().trim();

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

    // 2. Verify dataset exists
    if (!resourceId || typeof resourceLibrary === "undefined" || !resourceLibrary[resourceId]) {
        return;
    }

    const data = resourceLibrary[resourceId];

    // 3. Update Browser Tab Title
    document.title = `${data.title} | MCU E-Library Reader`;

    // 4. Update "Back to Resource" link
    const backBtn = document.querySelector("a[href*='resource.html']");
    if (backBtn) {
        backBtn.href = `resource.html?id=${resourceId}`;
    }

    // 5. Update Headings across the Reader page
    const headings = document.querySelectorAll("h1, h2, .reader-title");
    headings.forEach(h => {
        if (h.textContent.includes("Anatomy") || h.textContent.includes("MCU Anatomy")) {
            h.textContent = data.title;
        }
    });

    // 6. Update Subtitles & Metadata tags
    const subTags = document.querySelectorAll("p, span");
    subTags.forEach(el => {
        if (el.textContent.includes("Anatomy • Medical Reference")) {
            el.textContent = `${data.tag || data.department} • Medical Reference`;
        }
    });

    // 7. Update Introduction Paragraph
    const introParagraph = Array.from(document.querySelectorAll("p")).find(p => 
        p.textContent.includes("reading interface") || p.textContent.includes("MCU E-Library resources")
    );
    if (introParagraph && data.description) {
        introParagraph.textContent = data.description;
    }

    // 8. Dynamic Chapter List Fallback
    const chapters = data.chapters || [
        `1. Introduction to ${data.title}`,
        `2. Fundamentals of ${data.tag || data.department}`,
        `3. Key Diagnostic & Clinical Concepts`,
        `4. Pathophysiology & Management`,
        `5. Review & Self-Assessment`
    ];

    // 9. Overwrite the Anatomy Contents List Items
    let chapterIndex = 0;
    const pageElements = document.querySelectorAll("p, li, div");
    
    pageElements.forEach(el => {
        const text = el.textContent.trim();
        // Match default Anatomy list items
        if (
            text.includes("Introduction to Human Anatomy") ||
            text.includes("UPPER LIMB") ||
            text.includes("LOWER LIMB") ||
            text.includes("THORAX") ||
            text.includes("ABDOMEN")
        ) {
            if (chapters[chapterIndex]) {
                el.textContent = chapters[chapterIndex];
                chapterIndex++;
            }
        }
    });
});