// ── Shared header ────────────────────────────────────────
// On index.html: name button scrolls to top, nav links
//   smooth-scroll to their section.
// On detail pages: name button goes to index.html, nav links
//   go to index.html and store the target section in
//   sessionStorage so index.html plays the scroll animation.
(function() {
    var path = window.location.pathname;
    var isIndex = (path === '/' || path === '' || path.endsWith('/index.html') || path.endsWith('/'))
                  && !window.location.search;

    var sections = ['about', 'skills', 'projects', 'experience', 'connect'];
    var labels   = ['About', 'Skills', 'Projects', 'Experience', 'Connect'];

    var navHTML = '';
    sections.forEach(function(s, i) {
        if (isIndex) {
            navHTML += '<a href="#' + s + '">' + labels[i] + '</a>\n        ';
        } else {
            navHTML += '<a href="index.html" onclick="sessionStorage.setItem(\'scrollTo\',\'' + s + '\')">' + labels[i] + '</a>\n        ';
        }
    });

    var nameTag;
    if (isIndex) {
        nameTag = '<a href="#" class="name-button" onclick="window.scrollTo({ top: 0, behavior: \'smooth\' }); return false;">';
    } else {
        nameTag = '<a href="index.html" class="name-button">';
    }

    var header = document.querySelector('header');
    if (!header) return;

    header.innerHTML =
        nameTag +
        '<div class="name-container">' +
        '<h1 class="main-name">Gabriel Fernandes Neves</h1>' +
        '<h2 class="sub-name">Gabtrex</h2>' +
        '</div>' +
        '</a>' +
        '<nav>' +
        navHTML +
        '</nav>';
})();
