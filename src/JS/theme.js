function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        btn.title = theme === 'dark' ? 'Mode clair' : 'Mode sombre';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
    localStorage.setItem('autoThemeDisabled', 'true');
}

function initTheme() {
    const autoDisabled = localStorage.getItem('autoThemeDisabled');
    if (!autoDisabled) {
        const applyAuto = () => {
            const hour = new Date().getHours();
            const autoTheme = (hour >= 18 || hour < 6) ? 'dark' : 'light';
            applyTheme(autoTheme);
        };
        applyAuto();
        setInterval(() => {
            if (localStorage.getItem('autoThemeDisabled') === 'true') return;
            applyAuto();
        }, 60000);
    } else {
        const saved = localStorage.getItem('theme');
        applyTheme(saved || 'light');
    }
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
}
