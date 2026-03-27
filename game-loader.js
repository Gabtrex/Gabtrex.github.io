// ============================================================
//  game-loader.js
//
//  Unity  → iframe is scaled to fit inside the wrapper as-is.
//           The wrapper size is NEVER changed — CSS owns it.
//  Godot  → iframe fills wrapper 100%×100%, no transform.
//
//  config.engine must be 'unity' | 'godot' (set by project.html
//  from the skills array in data.js).
// ============================================================

(function (global) {

    global.initGameEmbed = function (config) {
        var gamePath      = config.gamePath;
        var iframe        = config.iframe;
        var wrapper       = config.wrapper;
        var loadingEl     = config.loadingEl;
        var loadingText   = config.loadingText;
        var errorEl       = config.errorEl;
        var errorTextEl   = config.errorTextEl;
        var fullscreenBtn = config.fullscreenBtn;
        var engineHint    = (config.engine || '').toLowerCase();

        var gameUrl = gamePath.replace(/\/?$/, '/') + 'index.html';

        var gameWidth   = 0;
        var gameHeight  = 0;
        var fixedCanvas = false;

        // ── ICONS ─────────────────────────────────────────────────
        var expandIcon =
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"' +
            ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>' +
            '<line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';

        var shrinkIcon =
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"' +
            ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>' +
            '<line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';

        // ── UNITY LAYOUT ──────────────────────────────────────────
        // Scales the iframe to fit inside the wrapper WITHOUT touching
        // the wrapper's own size or aspect-ratio — CSS owns that.
        function applyGameScale() {
            if (!fixedCanvas || !gameWidth || !gameHeight) return;

            var rect  = wrapper.getBoundingClientRect();
            var scale = Math.min(rect.width / gameWidth, rect.height / gameHeight);

            iframe.style.position        = 'absolute';
            iframe.style.top             = '50%';
            iframe.style.left            = '50%';
            iframe.style.width           = gameWidth  + 'px';
            iframe.style.height          = gameHeight + 'px';
            iframe.style.transform       = 'translate(-50%, -50%) scale(' + scale + ')';
            iframe.style.transformOrigin = 'center center';
        }

        // ── GODOT LAYOUT ──────────────────────────────────────────
        function applyFluidLayout() {
            fixedCanvas = false;
            iframe.style.position        = '';
            iframe.style.top             = '';
            iframe.style.left            = '';
            iframe.style.width           = '100%';
            iframe.style.height          = '100%';
            iframe.style.transform       = '';
            iframe.style.transformOrigin = '';
        }

        // ── CANVAS SIZE POLL (Unity only) ─────────────────────────
        function pollCanvasSize(canvas) {
            var attempts = 0;
            var interval = setInterval(function () {
                var w = canvas.width;
                var h = canvas.height;
                if (w && h) {
                    clearInterval(interval);
                    fixedCanvas = true;
                    gameWidth   = w;
                    gameHeight  = h;
                    applyGameScale();
                    return;
                }
                if (++attempts > 30) {
                    clearInterval(interval);
                    applyFluidLayout();
                }
            }, 200);
        }

        // ── PLAY OVERLAY ──────────────────────────────────────────
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
            'cursor:pointer', 'backdrop-filter:blur(8px)',
            'transition:background 0.2s,border-color 0.2s'
        ].join(';');

        playBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">' +
            '<polygon points="5 3 19 12 5 21 5 3"/></svg><span>Play in Browser</span>';

        playBtn.addEventListener('mouseenter', function () {
            playBtn.style.background  = 'rgba(255,255,255,0.22)';
            playBtn.style.borderColor = 'rgba(255,255,255,0.6)';
        });
        playBtn.addEventListener('mouseleave', function () {
            playBtn.style.background  = 'rgba(255,255,255,0.12)';
            playBtn.style.borderColor = 'rgba(255,255,255,0.3)';
        });

        playOverlay.appendChild(playBtn);
        wrapper.insertBefore(playOverlay, wrapper.firstChild);
        loadingEl.style.display = 'none';

        // ── FULLSCREEN ────────────────────────────────────────────
        if (config.allowFullscreen && fullscreenBtn) {
            fullscreenBtn.style.display = 'flex';
            fullscreenBtn.innerHTML = expandIcon;

            fullscreenBtn.addEventListener('click', function () {
                var isFs = document.fullscreenElement ||
                           document.webkitFullscreenElement ||
                           document.mozFullScreenElement;
                if (isFs) {
                    (document.exitFullscreen ||
                     document.webkitExitFullscreen ||
                     document.mozCancelFullScreen).call(document);
                } else {
                    var t = wrapper;
                    (t.requestFullscreen ||
                     t.webkitRequestFullscreen ||
                     t.mozRequestFullScreen).call(t);
                }
            });

            document.addEventListener('fullscreenchange', function () {
                fullscreenBtn.innerHTML = document.fullscreenElement ? shrinkIcon : expandIcon;
                setTimeout(applyGameScale, 100);
            });

        } else if (fullscreenBtn) {
            fullscreenBtn.style.display = 'none';
        }

        // ── RESIZE ────────────────────────────────────────────────
        window.addEventListener('resize', applyGameScale);

        // ── PLAY CLICK ────────────────────────────────────────────
        playBtn.addEventListener('click', function () {
            playOverlay.style.display = 'none';
            loadingEl.style.display   = 'flex';
            loadingText.innerText     = 'Loading game…';

            iframe.src = gameUrl;

            iframe.addEventListener('load', function onLoad() {
                if (!iframe.src || iframe.src === 'about:blank') return;
                iframe.removeEventListener('load', onLoad);

                loadingEl.style.display = 'none';
                iframe.style.opacity    = '1';

                if (engineHint === 'godot') {
                    applyFluidLayout();
                    return;
                }

                if (engineHint === 'unity') {
                    try {
                        var doc    = iframe.contentDocument || iframe.contentWindow.document;
                        var canvas = doc.querySelector('canvas');
                        if (canvas) { pollCanvasSize(canvas); } else { applyFluidLayout(); }
                    } catch (e) { applyFluidLayout(); }
                    return;
                }

                applyFluidLayout();
            });

            iframe.addEventListener('error', function () {
                loadingEl.style.display = 'none';
                errorEl.style.display   = 'flex';
                errorTextEl.innerText   =
                    'Failed to load game. Make sure the games/' +
                    gamePath.split('/').filter(Boolean).pop() +
                    '/ folder exists in your repo.';
            });
        });
    };

})(window);