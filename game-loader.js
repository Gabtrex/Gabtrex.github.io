// ============================================================
//  game-loader.js
// ============================================================

(function(global) {

    global.initGameEmbed = function(config) {
        var gamePath      = config.gamePath;
        var iframe        = config.iframe;
        var wrapper       = config.wrapper;
        var loadingEl     = config.loadingEl;
        var loadingText   = config.loadingText;
        var errorEl       = config.errorEl;
        var errorTextEl   = config.errorTextEl;
        var fullscreenBtn = config.fullscreenBtn;

        var gameUrl = gamePath.replace(/\/?$/, '/') + 'index.html';

        let gameWidth = 0;
        let gameHeight = 0;

        // ── ICONS ───────────────────────────────────────────────
        const expandIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"/>
            <polyline points="9 21 3 21 3 15"/>
            <line x1="21" y1="3" x2="14" y2="10"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
        </svg>`;

        const shrinkIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 14 10 14 10 20"/>
            <polyline points="20 10 14 10 14 4"/>
            <line x1="14" y1="10" x2="21" y2="3"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
        </svg>`;

        // ── SCALE FUNCTION ──────────────────────────────────────
        function applyGameScale() {
            if (!gameWidth || !gameHeight) return;

            const rect = wrapper.getBoundingClientRect();

            const scale = Math.min(
                rect.width / gameWidth,
                rect.height / gameHeight
            );

            iframe.style.transform =
                'translate(-50%, -50%) scale(' + scale + ')';
        }

        // ── Play overlay ────────────────────────────────────────
        var playOverlay = document.createElement('div');
        playOverlay.style.cssText = [
            'position:absolute', 'inset:0', 'display:flex',
            'align-items:center', 'justify-content:center',
            'background:rgba(0,0,0,0.6)', 'z-index:3', 'cursor:auto'
        ].join(';');

        var playBtn = document.createElement('button');
        playBtn.style.cssText = [
            'display:flex', 'align-items:center', 'gap:0.6rem',
            'padding:0.8rem 2rem',
            'background:rgba(255,255,255,0.12)',
            'border:1px solid rgba(255,255,255,0.3)',
            'border-radius:8px', 'color:#fff',
            'font-family:Inter,sans-serif', 'font-size:0.9rem',
            'letter-spacing:0.06em', 'text-transform:uppercase',
            'cursor:auto', 'backdrop-filter:blur(8px)',
            'transition:background 0.2s,border-color 0.2s'
        ].join(';');

        playBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">' +
            '<polygon points="5 3 19 12 5 21 5 3"/></svg><span>Play in Browser</span>';

        playOverlay.appendChild(playBtn);
        wrapper.insertBefore(playOverlay, wrapper.firstChild);
        loadingEl.style.display = 'none';

        // ── Fullscreen ──────────────────────────────────────────
        if (config.allowFullscreen && fullscreenBtn) {
            fullscreenBtn.style.display = 'flex';
            fullscreenBtn.innerHTML = expandIcon;

            fullscreenBtn.addEventListener('click', function() {

                const isFullscreen =
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement;

                if (isFullscreen) {
                    if (document.exitFullscreen)            document.exitFullscreen();
                    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                    else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
                } else {
                    var t = wrapper;
                    if (t.requestFullscreen)            t.requestFullscreen();
                    else if (t.webkitRequestFullscreen) t.webkitRequestFullscreen();
                    else if (t.mozRequestFullScreen)    t.mozRequestFullScreen();
                }
            });

            // ── Sync icon with state ─────────────────────────────
            document.addEventListener('fullscreenchange', function() {
                const isFullscreen = !!document.fullscreenElement;

                fullscreenBtn.innerHTML = isFullscreen ? shrinkIcon : expandIcon;

                setTimeout(applyGameScale, 100);
            });

        } else if (fullscreenBtn) {
            fullscreenBtn.style.display = 'none';
        }

        // ── Resize ──────────────────────────────────────────────
        window.addEventListener('resize', applyGameScale);

        // ── Play click ──────────────────────────────────────────
        playBtn.addEventListener('click', function() {
            playOverlay.style.display = 'none';
            loadingEl.style.display   = 'flex';
            loadingText.innerText     = 'Loading game…';

            iframe.src = gameUrl;

            iframe.addEventListener('load', function onLoad() {
                if (!iframe.src || iframe.src === 'about:blank') return;
                iframe.removeEventListener('load', onLoad);

                try {
                    const doc = iframe.contentDocument || iframe.contentWindow.document;
                    const canvas = doc.querySelector('canvas');

                    if (canvas) {
                        let attempts = 0;

                        const interval = setInterval(function() {
                            const width  = canvas.width;
                            const height = canvas.height;

                            if (width && height) {

                                gameWidth  = width;
                                gameHeight = height;

                                iframe.style.width  = width + 'px';
                                iframe.style.height = height + 'px';

                                wrapper.style.aspectRatio = width + ' / ' + height;

                                applyGameScale();

                                clearInterval(interval);
                            }

                            if (++attempts > 15) clearInterval(interval);
                        }, 200);
                    }

                } catch (e) {
                    console.warn('Could not access iframe content (cross-origin?)', e);
                }

                loadingEl.style.display = 'none';
                iframe.style.opacity    = '1';
            });

            iframe.addEventListener('error', function() {
                loadingEl.style.display = 'none';
                errorEl.style.display   = 'flex';
                errorTextEl.innerText   = 'Failed to load game. Make sure the games/' +
                                          gamePath.split('/').filter(Boolean).pop() +
                                          '/ folder exists in your repo.';
            });
        });
    };

})(window);