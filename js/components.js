/* ==========================================================================
   買便當 mybanddown - 全站組件獨立腳本 (Header, Drawer, Footer)
   已全數通過台灣無障礙標章 / WCAG 2.2 AAA 「鏈結必備 title 屬性」嚴格修正
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    syncThemeState();
    injectHeader();
    injectFooter();
    updateThemeButtonIcon();
});

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

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtonIcon();
}

function updateThemeButtonIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
        btn.innerText = isDark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', isDark ? '切換為淺色模式' : '切換為深夜模式');
        btn.setAttribute('title', isDark ? '切換為淺色模式' : '切換為深夜模式');
    }
}

function injectHeader() {
    const headerEl = document.getElementById("global-header");
    if (!headerEl) return;

    headerEl.setAttribute("role", "banner");
    headerEl.className = "site-header";
    headerEl.innerHTML = `
        <div class="header-container">
            <div class="header-brand-group">
                <a href="index.html" id="accesskey-U" accesskey="U" tabindex="0" class="brand-title" title="買便當首頁與上方導覽區定位點 [Alt+U]">
                    🍱 買便當 <span class="brand-sub">mybanddown</span>
                </a>
                
                <div class="header-privacy-tag" role="region" aria-label="隱私權保護聲明">
                    🔒 <b>買便當隱私承諾：</b>全站工具皆於「您的瀏覽器本機」運作，<b>決不上傳、儲存或保留任何民眾個人資料與檔案</b>。
                </div>
            </div>
            
            <div class="header-actions">
                <button type="button" class="icon-btn" id="theme-toggle-btn" title="切換深夜模式" aria-label="切換深夜模式" onclick="toggleTheme()">🌙</button>
                <button type="button" class="icon-btn icon-btn-search" title="聚焦全站搜尋框" aria-label="聚焦全站搜尋框" onclick="focusSearch()">🔍</button>
                <button type="button" class="icon-btn" title="開啟全站分類導覽選單" aria-label="開啟選單" onclick="toggleDrawer(true)">☰</button>
            </div>
        </div>

        <div class="drawer-backdrop" id="drawerBackdrop" onclick="toggleDrawer(false)"></div>

        <nav class="drawer-menu" id="drawerMenu" aria-label="全站分類導覽選單">
            <div style="padding: 0 20px 15px 20px; font-size: 1.15rem; font-weight: bold; color: #ffffff; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <span>🍱 全部工具分類</span>
                <button type="button" style="background:transparent; border:none; font-size:1.3rem; color:#94a3b8; cursor:pointer;" title="關閉分類選單" onclick="toggleDrawer(false)" aria-label="關閉選單">✕</button>
            </div>
            
            <ul class="drawer-list">
                <li><a href="index.html" class="drawer-home-link" title="前往買便當首頁總覽">🏠 買便當首頁 (全項目)</a></li>
                
                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" title="展開或收合隨機與遊戲分類" onclick="toggleAccordion(this)">
                        <span>🎲 隨機、決定與遊戲</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="01-101-wheel.html" title="前往幸運轉盤抽籤工具">🎡 幸運轉盤抽籤工具</a></li>
                        <li><a href="01-102-random-picker.html" title="前往隨機抽籤與紙牌選人工具">🎴 隨機抽籤與紙牌選人</a></li>
                        <li><a href="01-103-random-group.html" title="前往隨機團隊分組工具">👥 隨機團隊分組工具</a></li>
                        <li><a href="01-105-coin-dice.html" title="前往 3D 拋硬幣與擲筊工具">🪙 3D 拋硬幣/擲骰子/擲筊</a></li>
                    </ul>
                </li>

                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" title="展開或收合文字與符號分類" onclick="toggleAccordion(this)">
                        <span>📝 文字、符號與產生器</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="02-202-symbols.html" title="前往特殊符號與顏文字工具">♟️ 特殊符號與顏文字</a></li>
                        <li><a href="02-204-qrcode-gen.html" title="前往線上 QR Code 產生器">📷 線上 QR Code 產生器</a></li>
                        <li><a href="02-205-barcode-gen.html" title="前往線上一維條碼產生器">║▌ 線上一維條碼產生器</a></li>
                        <li><a href="02-201-char-count.html" title="前往線上字數統計分析工具">📊 線上字數統計分析</a></li>
                        <li><a href="02-203-fancy-text.html" title="前往酷文字與 IG 字體生成器">🔤 酷文字與 IG 字體生成</a></li>
                    </ul>
                </li>

                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" title="展開或收合 PDF 與文件分類" onclick="toggleAccordion(this)">
                        <span>📄 PDF 與文件處理</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="03-301-pdf-print-layout.html" title="前往 PDF 列印排版工具">🖨️ PDF 列印 (併頁/身分證)</a></li>
                        <li><a href="03-302-pdf-merge-split.html" title="前往線上 PDF 合併與分割工具">📕 線上 PDF 合併與分割</a></li>
                        <li><a href="03-303-pdf-compress.html" title="前往線上 PDF 極速壓縮工具">🗜️ 線上 PDF 極速壓縮</a></li>
                    </ul>
                </li>

                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" title="展開或收合圖片與多媒體分類" onclick="toggleAccordion(this)">
                        <span>🖼️ 圖片與多媒體</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="04-405-heic-webp-convert.html" title="前往 HEIC 與 WebP 圖檔轉換工具">🔄 HEIC/WebP 圖檔轉換</a></li>
                        <li><a href="04-401-img-privacy.html" title="前往圖片馬賽克與隱私遮蔽工具">👤 圖片馬賽克與隱私遮蔽</a></li>
                        <li><a href="04-403-id-photo.html" title="前往證件照製作與一鍵換底色工具">📸 證件照製作與一鍵換底色</a></li>
                    </ul>
                </li>

                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" title="展開或收合實用計算與商業分類" onclick="toggleAccordion(this)">
                        <span>🧮 實用計算與商業</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="05-501-tax-invoice.html" title="前往手寫發票與營業稅計算機">🧾 手寫發票與營業稅計算</a></li>
                        <li><a href="05-503-unit-converter.html" title="前往萬用單位換算與螢幕尺工具">📐 萬用單位換算與螢幕尺</a></li>
                        <li><a href="05-504-hash-generator.html" title="前往線上雜湊計算工具">🔒 線上雜湊工具 (MD5/SHA)</a></li>
                    </ul>
                </li>

                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" title="展開或收合時間與生活安全分類" onclick="toggleAccordion(this)">
                        <span>⏰ 時間與生活安全</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="06-601-password-gen.html" title="前往高強度隨機密碼產生器">🔑 高強度隨機密碼產生器</a></li>
                        <li><a href="06-603-digital-clock.html" title="前往全螢幕時鐘與番茄鐘">🕒 全螢幕時鐘與番茄鐘</a></li>
                        <li><a href="06-607-lunar-calendar.html" title="前往今日農民曆對照工具">📅 今日農民曆與節氣</a></li>
                        <li><a href="06-608-scoreboard.html" title="前往運動計分板與點擊計數器">🏀 運動計分板與點擊計數</a></li>
                    </ul>
                </li>

                <li class="drawer-category">
                    <button type="button" class="category-toggle" aria-expanded="false" title="展開或收合交通路線圖分類" onclick="toggleAccordion(this)">
                        <span>🚇 交通路線圖參考</span>
                        <span class="arrow" aria-hidden="true">▼</span>
                    </button>
                    <ul class="submenu">
                        <li><a href="07-701-mrt-taipei.html" title="前往全台捷運與輕軌路線圖">🚇 全台捷運與輕軌路線圖</a></li>
                        <li><a href="07-707-highway-toll.html" title="前往國道計程收費與地圖說明">🛣️ 國道計程收費與地圖</a></li>
                    </ul>
                </li>

                <li style="border-top: 1px solid #334155; margin-top: 10px; padding-top: 10px;">
                    <a href="report.html" title="前往問題回報與許願池" style="color: #fb923c; font-weight: bold;">🚨 問題回報與許願池</a>
                </li>
                <li><a href="about_us.html" title="前往關於買便當說明頁" style="color: #fb923c; font-weight: bold;">🍱 關於買便當 (舒壓宗旨)</a></li>
                <li><a href="sitemap.html" title="前往網站導覽 Sitemap 頁面">🗺️ 網站導覽 (Sitemap)</a></li>
            </ul>
        </nav>
    `;
}

function injectFooter() {
    const footerEl = document.getElementById("global-footer");
    if (!footerEl) return;

    footerEl.setAttribute("role", "contentinfo");
    footerEl.style.cssText = "background: #1a202c; color: #a0aec0; text-align: center; padding: 2rem 1rem; margin-top: 3rem;";
    footerEl.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto;">
            <!-- 🛠️ 修正點：定位點 a 標籤補上明確文字說明與非空 title 屬性 -->
            <a href="javascript:void(0)" id="accesskey-Z" accesskey="Z" tabindex="0" title="下方頁尾區定位點 [Alt+Z]" style="color:#facc15; text-decoration:none; font-weight:bold; margin-right:6px;">:::頁尾區定位點</a>
            
            <div style="margin-bottom: 12px; display: inline-block;">
                <!-- 🛠️ 修正點：頁尾所有 a 標籤全數補齊 title 屬性 -->
                <a href="index.html" title="回到買便當首頁" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">首頁</a> ｜ 
                <a href="about_us.html" title="前往關於我們" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">關於我們</a> ｜ 
                <a href="report.html" title="前往問題回報" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">問題回報</a> ｜ 
                <a href="privacy.html" title="前往隱私權政策" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">隱私權政策</a> ｜ 
                <a href="terms.html" title="前往服務條款" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">服務條款</a> ｜ 
                <a href="sitemap.html" title="前往網站導覽" style="color:#e2e8f0; margin:0 10px; text-decoration:none;">網站導覽</a>
            </div>
            <p style="margin: 0; font-size: 0.88rem; color: #718096;">
                &copy; 2026 買便當 mybanddown ｜ 100% 純前端本機安全運算 ✕ 遵循 WCAG 2.2 AAA 無障礙規範
            </p>
        </div>
    `;
}

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

function focusSearch() {
    const searchInput = document.getElementById("site-search");
    if (searchInput) { 
        searchInput.focus(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}