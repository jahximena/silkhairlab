(function () {
  function isExternal(href) {
    try {
      var url = new URL(href, window.location.href);
      return (
        (url.protocol === 'http:' || url.protocol === 'https:') &&
        url.hostname !== window.location.hostname
      );
    } catch (error) {
      return false;
    }
  }

  function markLink(link) {
    if (link.dataset.noExternalTab !== undefined) return;
    var href = link.getAttribute('href');
    if (!href || !isExternal(href)) return;

    link.setAttribute('target', '_blank');

    var relParts = (link.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
    ['noopener', 'noreferrer'].forEach(function (token) {
      if (relParts.indexOf(token) === -1) relParts.push(token);
    });
    link.setAttribute('rel', relParts.join(' '));
  }

  function scan(root) {
    root.querySelectorAll('a[href]').forEach(markLink);
  }

  function init() {
    scan(document);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches('a[href]')) markLink(node);
          if (node.querySelectorAll) scan(node);
        });
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
