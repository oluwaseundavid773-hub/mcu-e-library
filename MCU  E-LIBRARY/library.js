document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector("#resourceGrid");
    const searchInput = document.querySelector("#searchInput");
    const sortSelect = document.querySelector("#sortSelect");
    const countElement = document.querySelector("#resourceCount");
    const filterBtns = document.querySelectorAll(".filter-btn");

    let activeCategory = "all";
    let searchQuery = "";

    function render() {
        if (!gridContainer || typeof resourceLibrary === "undefined") return;

        // 1. Filter dataset
        let keys = Object.keys(resourceLibrary).filter(key => {
            const item = resourceLibrary[key];
            const dept = (item.department || item.tag || "").toLowerCase();
            const title = item.title.toLowerCase();
            const desc = (item.description || "").toLowerCase();

            const matchesCategory = activeCategory === "all" || 
                dept.includes(activeCategory) || 
                key.includes(activeCategory);

            const matchesSearch = title.includes(searchQuery) || 
                desc.includes(searchQuery) || 
                dept.includes(searchQuery);

            return matchesCategory && matchesSearch;
        });

        // 2. Sort dataset
        const sortValue = sortSelect ? sortSelect.value : "recent";
        if (sortValue === "az") {
            keys.sort((a, b) => resourceLibrary[a].title.localeCompare(resourceLibrary[b].title));
        } else if (sortValue === "za") {
            keys.sort((a, b) => resourceLibrary[b].title.localeCompare(resourceLibrary[a].title));
        }

        // 3. Update counter text
        if (countElement) {
            countElement.textContent = keys.length;
        }

        // 4. Render cards into grid
        if (keys.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: #718096;">
                    <h3>No resources found</h3>
                    <p>Try refining your search keyword or selected filter.</p>
                </div>`;
            return;
        }

        gridContainer.innerHTML = keys.map(key => {
            const item = resourceLibrary[key];
            return `
                <div class="resource-card">
                    <div>
                        <span class="tag">${item.tag || item.department}</span>
                        <h3>${item.title}</h3>
                        <p>${item.description || ""}</p>
                    </div>
                    <a href="resource.html?id=${key}" class="card-btn">View Resource</a>
                </div>
            `;
        }).join("");
    }

    // Initial render
    render();

    // Event: Live Search
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            render();
        });
    }

    // Event: Sort Dropdown
    if (sortSelect) {
        sortSelect.addEventListener("change", () => render());
    }

    // Event: Filter Category Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.getAttribute("data-category").toLowerCase();
            render();
        });
    });
});document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector("#resourceGrid");
    const searchInput = document.querySelector("#searchInput");
    const sortSelect = document.querySelector("#sortSelect");
    const countElement = document.querySelector("#resourceCount");
    const filterBtns = document.querySelectorAll(".filter-btn");

    let activeCategory = "all";
    let searchQuery = "";

    function render() {
        if (!gridContainer || typeof resourceLibrary === "undefined") return;

        // 1. Filter dataset
        let keys = Object.keys(resourceLibrary).filter(key => {
            const item = resourceLibrary[key];
            const dept = (item.department || item.tag || "").toLowerCase();
            const title = item.title.toLowerCase();
            const desc = (item.description || "").toLowerCase();

            const matchesCategory = activeCategory === "all" || 
                dept.includes(activeCategory) || 
                key.includes(activeCategory);

            const matchesSearch = title.includes(searchQuery) || 
                desc.includes(searchQuery) || 
                dept.includes(searchQuery);

            return matchesCategory && matchesSearch;
        });

        // 2. Sort dataset
        const sortValue = sortSelect ? sortSelect.value : "recent";
        if (sortValue === "az") {
            keys.sort((a, b) => resourceLibrary[a].title.localeCompare(resourceLibrary[b].title));
        } else if (sortValue === "za") {
            keys.sort((a, b) => resourceLibrary[b].title.localeCompare(resourceLibrary[a].title));
        }

        // 3. Update counter text
        if (countElement) {
            countElement.textContent = keys.length;
        }

        // 4. Render cards into grid
        if (keys.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: #718096;">
                    <h3>No resources found</h3>
                    <p>Try refining your search keyword or selected filter.</p>
                </div>`;
            return;
        }

        gridContainer.innerHTML = keys.map(key => {
            const item = resourceLibrary[key];
            return `
                <div class="resource-card">
                    <div>
                        <span class="tag">${item.tag || item.department}</span>
                        <h3>${item.title}</h3>
                        <p>${item.description || ""}</p>
                    </div>
                    <a href="resource.html?id=${key}" class="card-btn">View Resource</a>
                </div>
            `;
        }).join("");
    }

    // Initial render
    render();

    // Event: Live Search
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            render();
        });
    }

    // Event: Sort Dropdown
    if (sortSelect) {
        sortSelect.addEventListener("change", () => render());
    }

    // Event: Filter Category Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.getAttribute("data-category").toLowerCase();
            render();
        });
    });
});