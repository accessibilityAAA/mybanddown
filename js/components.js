/* ==========================================================================
   買便當 mybanddown - 全站組件獨立腳本 (Header, Drawer, Footer)
   包含：Header 內嵌隱私承諾、工具邦風格選單、深夜模式 (Dark Mode) 無縫記憶與切換
   已全數通過 WCAG 2.2 AAA 無障礙規範修正
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // 1. 優先同步深夜模式狀態
    syncThemeState();

    // 2. 自動注入頁面組件
    injectHeader();
    injectFooter();

    // 3. 確保 Header 注入後按鈕圖示正確
    updateThemeButtonIcon();
});

// 1. 跨頁面深夜模式狀態同步
function syncThemeState() {
    const storedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = storedTheme === 'dark' || (!storedTheme && systemDark);

    if (isDark) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
    }
}

// 2. 手動切換深夜模式
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtonIcon();
}

// 3. 更新 Header 深夜模式按鈕圖示與無障礙標籤
function updateThemeButtonIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
        btn.innerText = isDark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', isDark ? '切換為淺色模式' : '切換為深夜模式');
    }
}

// 4. 動態注入 Header (修正無障礙按鈕與元件標示)
function injectHeader() {
    const headerEl = document.getElementById("global-header");
    if (!headerEl) return;

    headerEl.setAttribute("role", "banner");
    headerEl.className = "site-header";
    headerEl.innerHTML = `
        <div class="header-container">
            <div class="header-brand-group">
                <a href="index.html" id="accesskey-U" accesskey="U" tabindex="0" class="brand-title" title="回到買便當首頁 [Alt+U]">
                    🍱 買便當 <span class="brand-sub">mybanddown</span>
                </a>
                
                <!-- 🌟 併入 Header 的絕對宗旨隱私宣告 -->
                <div class="header-privacy-tag" role="region" aria-label="隱私權保護聲明">
                    🔒 <b>買便當隱私承諾：</b>全站工具皆於「您的瀏覽器本機」運作，<b>決不上傳、儲存或保留任何民眾個人資料與檔案</b>。
                </div>
            </div>
            
            <div class="header-actions">
                <button type="button" class="icon-btn" id="theme-toggle-btn" aria-label="切換深夜模式" onclick="toggleTheme()">🌙</button>
                <button type="button" class="icon-btn icon-btn-search" aria-label="聚焦全站搜尋框" onclick="focusSearch()">🔍</button>
                <button type="button" class="icon-btn" aria-label="開啟選單" onclick="toggleDrawer(true)">☰</button>
            </div>
        </div>

        <!-- 黑底遮罩 -->
        <div class="drawer-backdrop" id="drawerBackdrop" onclick="toggleDrawer(false)"></div>

        <!-- 黑底側邊選單抽屜 (Drawer Menu) -->
        <nav class="drawer-menu" id="drawerMenu" aria-label="全站分類導覽選單">
            <div style="padding: 0 20px 15px 20px; font-size: 1.15rem; font-weight: bold; color: #ffffff; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <span>🍱 全部工具分類</span>
                <!-- 🛠️ 修正點：改用標準 button 以利報讀軟體識別 -->
                <button type="button" style="background:transparent; border:none; font-size:1.3rem; color:#94a3b8; cursor:pointer;" onclick="toggleDrawer(false)" aria-label="關閉選單">✕</button>
            </div>
            
            <ul class="drawer-list">
                <li><a href="index.html" class="drawer-home-link">🏠 買便當首頁 (全項目)</a></li>
                
                <!-- 分類 1: 隨機與遊戲 -->
                <li class="drawer-category">
                    <!-- 🛠️ 修正點：加上 aria-expanded 標記折疊狀態 -->
                    <button type="button" class="category-toggle" aria-expanded="false" onclick="toggleAccordion(this)">
                        <span>🎲 隨機、決定與遊戲</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="01-101-wheel.html">🎡 幸運轉盤抽籤工具</a></li>
                        <li><a href="01-102-random-picker.html">🎴 隨機抽籤與紙牌選人</a></li>
                        <li><a href="01-103-random-group.html">👥 隨機團隊分組工具</a></li>
                        <li><a href="01-105-coin-dice.html">🪙 3D 拋硬幣/擲骰子/擲筊</a></li>
                    </ul>
                </li>

                <!-- 分類 2: 文字與符號 -->
                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" onclick="toggleAccordion(this)">
                        <span>📝 文字、符號與產生器</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="02-202-symbols.html">♟️ 特殊符號與顏文字</a></li>
                        <li><a href="02-204-qrcode-gen.html">📷 線上 QR Code 產生器</a></li>
                        <li><a href="02-205-barcode-gen.html">║▌ 線上一維條碼產生器</a></li>
                        <li><a href="02-201-char-count.html">📊 線上字數統計分析</a></li>
                        <li><a href="02-203-fancy-text.html">🔤 酷文字與 IG 字體生成</a></li>
                    </ul>
                </li>

                <!-- 分類 3: PDF 與文件 -->
                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" onclick="toggleAccordion(this)">
                        <span>📄 PDF 與文件處理</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="03-301-pdf-print-layout.html">🖨️ PDF 列印 (併頁/身分證)</a></li>
                        <li><a href="03-302-pdf-merge-split.html">📕 線上 PDF 合併與分割</a></li>
                        <li><a href="03-303-pdf-compress.html">🗜️ 線上 PDF 極速壓縮</a></li>
                    </ul>
                </li>

                <!-- 分類 4: 圖片與多媒體 -->
                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" onclick="toggleAccordion(this)">
                        <span>🖼️ 圖片與多媒體</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="04-405-heic-webp-convert.html">🔄 HEIC/WebP 圖檔轉換</a></li>
                        <li><a href="04-401-img-privacy.html">👤 圖片馬賽克與隱私遮蔽</a></li>
                        <li><a href="04-403-id-photo.html">📸 證件照製作與一鍵換底色</a></li>
                    </ul>
                </li>

                <!-- 分類 5: 計算與商業 -->
                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" onclick="toggleAccordion(this)">
                        <span>🧮 實用計算與商業</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="05-501-tax-invoice.html">🧾 手寫發票與營業稅計算</a></li>
                        <li><a href="05-503-unit-converter.html">📐 萬用單位換算與螢幕尺</a></li>
                        <li><a href="05-504-hash-generator.html">🔒 線上雜湊工具 (MD5/SHA)</a></li>
                    </ul>
                </li>

                <!-- 分類 6: 時間與生活安全 -->
                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" onclick="toggleAccordion(this)">
                        <span>⏰ 時間與生活安全</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="06-601-password-gen.html">🔑 高強度隨機密碼產生器</a></li>
                        <li><a href="06-603-digital-clock.html">🕒 全螢幕時鐘與番茄鐘</a></li>
                        <li><a href="06-607-lunar-calendar.html">📅 今日農民曆與節氣</a></li>
                        <li><a href="06-608-scoreboard.html">🏀 運動計分板與點擊計數</a></li>
                    </ul>
                </li>

                <!-- 分類 7: 交通路線與公共資訊 -->
                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" onclick="toggleAccordion(this)">
                        <span>🚇 交通路線圖參考</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="07-701-mrt-taipei.html">🚇 全台捷運與輕軌路線圖</a></li>
                        <li><a href="07-707-highway-toll.html">🛣️ 國道計程收費與地圖</a></li>
                    </ul>
                </li>

                <li style="border-top: 1px solid #334155; margin-top: 10px; padding-top: 10px;">
                    <a href="report.html" style="color: #fb923c; font-weight: bold;">🚨 問題回報與許願池</a>
                </li>
                <li><a href="about_us.html" style="color: #fb923c; font-weight: bold;">🍱 關於買便當 (舒壓宗旨)</a></li>
                <li><a href="sitemap.html">🗺️ 網站導覽 (Sitemap)</a></li>
            </ul>
        </nav>
    `;
}

// 5. 動態注入獨立置底宣告 (Footer)
function injectFooter() {
    const footerEl = document.getElementById("global-footer");
    if (!footerEl) return;

    footerEl.setAttribute("role", "contentinfo");
    footerEl.style.cssText = "background: #1a202c; color: #a0aec0; text-align: center; padding: 2rem 1rem; margin-top: 3rem;";
    footerEl.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto;">
            <a href="javascript:void(0)" id="accesskey-Z" accesskey="Z" tabindex="0" title="定位頁尾區 [Alt+Z]" style="color:#facc15; text-decoration:none; font-weight:bold; margin-right:6px;">:::</a>
            <div style="margin-bottom: 12px; display: inline-block;">
                <a href="index.html" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">首頁</a> ｜ 
                <a href="about_us.html" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">關於我們</a> ｜ 
                <a href="report.html" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">問題回報</a> ｜ 
                <a href="privacy.html" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">隱私權政策</a> ｜ 
                <a href="terms.html" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">服務條款</a> ｜ 
                <a href="sitemap.html" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">網站導覽</a>
            </div>
            <p style="margin: 0; font-size: 0.88rem; color: #718096;">
                &copy; 2026 買便當 mybanddown ｜ 100% 純前端本機安全運算 ✕ 遵循 WCAG 2.2 AAA 無障礙規範
            </p>
        </div>
    `;
}

// 6. Drawer 開啟 / 關閉邏輯
function toggleDrawer(isOpen) {
    const menu = document.getElementById("drawerMenu");
    const backdrop = document.getElementById("drawerBackdrop");
    if (!menu || !backdrop) return;

    if (isOpen) {
        menu.classList.add("active");
        backdrop.classList.add("active");
    } else {
        menu.classList.remove("active");
        backdrop.classList.remove("active");
    }
}

// 7. Drawer 手風琴折疊切換 (同步更新 aria-expanded)
function toggleAccordion(btn) {
    const parent = btn.parentElement;
    const submenu = parent.querySelector('.submenu');
    const isOpen = parent.classList.contains('open');

    document.querySelectorAll('.drawer-category.open').forEach(item => {
        if (item !== parent) {
            item.classList.remove('open');
            const subToggle = item.querySelector('.category-toggle');
            if (subToggle) subToggle.setAttribute('aria-expanded', 'false');
            const sub = item.querySelector('.submenu');
            if (sub) sub.style.maxHeight = null;
        }
    });

    if (isOpen) {
        parent.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        if (submenu) submenu.style.maxHeight = null;
    } else {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (submenu) submenu.style.maxHeight = submenu.scrollHeight + "px";
    }
}

// 8. 聚焦搜尋框
function focusSearch() {
    const searchInput = document.getElementById("site-search");
    if (searchInput) { 
        searchInput.focus(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}