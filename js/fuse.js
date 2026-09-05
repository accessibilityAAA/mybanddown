/* ==========================================================================
   買便當 mybanddown - 全站極速搜尋引擎 (結合 Fuse.js)
   ========================================================================== */

let fuseEngine = null;

document.addEventListener("DOMContentLoaded", function () {
    initFuseSearch();
    bindSearchEvents();
});

function initFuseSearch() {
    if (typeof Fuse === "undefined" || typeof SEARCH_INDEX === "undefined") return;

    const options = {
        includeScore: true,
        threshold: 0.4,
        keys: [
            { name: "title", weight: 0.6 },
            { name: "aliases", weight: 0.4 }
        ]
    };

    fuseEngine = new Fuse(SEARCH_INDEX, options);
}

function bindSearchEvents() {
    const searchInput = document.getElementById("site-search");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const query = this.value.trim();
        
        // 1. 若在 index.html 大廳，直接過濾卡片
        if (typeof filterTools === "function") {
            filterTools(query);
        }

        // 2. 若有 Fuse.js 則進行精準比對
        if (query && fuseEngine) {
            const results = fuseEngine.search(query);
            console.log("買便當搜尋比對結果：", results);
        }
    });

    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = this.value.trim();
            if (query && fuseEngine) {
                const results = fuseEngine.search(query);
                if (results.length > 0) {
                    window.location.href = results[0].item.url; // Enter 直接進入第一個最匹配的工具
                }
            }
        }
    });
}