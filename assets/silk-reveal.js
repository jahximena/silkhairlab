(function () {
  function init() {
    var els = document.querySelectorAll('.silk-reveal');
    if (!els.length) return;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('silk-in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );
      els.forEach(function (el) {
        io.observe(el);
      });
    } else {
      els.forEach(function (el) {
        el.classList.add('silk-in');
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
