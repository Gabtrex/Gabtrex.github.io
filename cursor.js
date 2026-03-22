// ── Custom cursor ────────────────────────────────────────
(function() {
    // Skip on touch devices (phones / tablets)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    var cursorDot  = document.createElement('div');
    var cursorRing = document.createElement('div');
    cursorDot.className  = 'cursor-dot';
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    var mouseX = 0, mouseY = 0;
    var ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    })();

    var hoverTargets = 'a, button, [data-skill], .project-card, .social-btn, input, label, h1, h2, h3, h4';

    document.addEventListener('mouseover', function(e) {
        if (e.target.closest(hoverTargets)) {
            cursorDot.classList.add('hovering');
            cursorRing.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.closest(hoverTargets)) {
            cursorDot.classList.remove('hovering');
            cursorRing.classList.remove('hovering');
        }
    });

    document.addEventListener('mousedown', function() {
        cursorDot.classList.add('clicking');
        cursorRing.classList.add('clicking');
    });

    document.addEventListener('mouseup', function() {
        cursorDot.classList.remove('clicking');
        cursorRing.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });
})();