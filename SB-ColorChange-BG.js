(function() {
  const activationKey = "MiloMakes";

  window.initSummaryColorsPlugin = function(userKey, colors) {
    if(userKey !== activationKey) {
      console.warn("Plugin not activated. Please use the code provided after purchase.");
      return;
    }

    if (!colors || !colors.length) return;

    function normalizeHex(input) {
      if (!input) return null;
      let hex = input.trim();
      if (!hex.startsWith('#')) hex = `#${hex}`;
      hex = hex.toUpperCase();
      return /^#([0-9A-F]{6})$/.test(hex) ? hex : null;
    }

    const sectionBackgrounds = document.querySelectorAll('.section-background');
    if (!sectionBackgrounds.length) return;

    let activeItem = null;

    document.addEventListener('mousemove', e => {
      const item = e.target.closest('.summary-item');

      if (!item) {
        if (activeItem) {
          sectionBackgrounds.forEach(bg => bg.style.backgroundColor = '');
          activeItem = null;
        }
        return;
      }

      if (item === activeItem) return;

      const link = item.querySelector('a[href]');
      if (!link) return;

      const slug = link.getAttribute('href').split('/').filter(Boolean).pop();
      const match = colors.find(m => m.slug === slug);
      if (!match) return;

      const color = normalizeHex(match.color);
      if (!color) return;

      sectionBackgrounds.forEach(bg => bg.style.backgroundColor = color);
      activeItem = item;
    });
  };

})();
