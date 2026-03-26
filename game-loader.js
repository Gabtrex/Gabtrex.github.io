// ============================================================
//  game-loader.js
//  Shows a Play overlay, then loads the game folder directly
//  into the iframe when clicked. No zips, no service workers.
//
//  Usage: initGameEmbed(config)
// ============================================================

(function(global) {

    global.initGameEmbed = function(config) {
        var gamePath      = config.gamePath;      // e.g. "games/mam/"
        var iframe        = config.iframe;
        var wrapper       = config.wrapper;
        var loadingEl     = config.loadingEl;
        var loadingText   = config.loadingText;
        var errorEl       = config.errorEl;
        var errorTextEl   = config.errorTextEl;
        var fullscreenBtn = config.fullscreenBtn;

        // Ensure path ends with /index.html
        var gameUrl = gamePath.replace(/\/?$/, '/') + 'index.html';

        // ── Play overlay ─────────────────────────────────────────
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
        playBtn.addEventListener('mouseenter', function() {
            playBtn.style.background  = 'rgba(255,255,255,0.22)';
            playBtn.style.borderColor = 'rgba(255,255,255,0.6)';
        });
        playBtn.addEventListener('mouseleave', function() {
            playBtn.style.background  = 'rgba(255,255,255,0.12)';
            playBtn.style.borderColor = 'rgba(255,255,255,0.3)';
        });
        playOverlay.appendChild(playBtn);
        wrapper.insertBefore(playOverlay, wrapper.firstChild);
        loadingEl.style.display = 'none';

        // ── Fullscreen ───────────────────────────────────────────
        if (config.allowFullscreen && fullscreenBtn) {
            fullscreenBtn.style.display = 'flex';
            fullscreenBtn.addEventListener('click', function() {
                var t = wrapper;
                if (t.requestFullscreen)            t.requestFullscreen();
                else if (t.webkitRequestFullscreen) t.webkitRequestFullscreen();
                else if (t.mozRequestFullScreen)    t.mozRequestFullScreen();
            });
        } else if (fullscreenBtn) {
            fullscreenBtn.style.display = 'none';
        }

        // ── Play click ───────────────────────────────────────────
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
                    // Wait a bit in case Unity resizes after init
                    setTimeout(function() {
                        const width  = canvas.width;
                        const height = canvas.height;

                        if (width && height) {
                            // Apply real resolution
                            iframe.style.width  = width + 'px';
                            iframe.style.height = height + 'px';

                            // Compute scale to fit wrapper
                            const wrapperRect = wrapper.getBoundingClientRect();
                            const scale = Math.min(
                                wrapperRect.width / width,
                                wrapperRect.height / height
                            );

                            iframe.style.transform =
                                'translate(-50%, -50%) scale(' + scale + ')';
                        }
                    }, 500);
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