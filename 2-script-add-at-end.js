/* ===== Mobile header menus (hamburger + language dropdown) ===== */
(function () {
  const menuBtn = document.getElementById('menuToggle');
  const langBtn = document.getElementById('langToggle');
  const nav = document.querySelector('.main-nav');
  const langBox = document.querySelector('.lang-switch');
  if (!menuBtn || !langBtn || !nav || !langBox) return;

  const label = langBtn.querySelector('.lang-toggle-label');
  const syncLabel = () => {
    const active = document.querySelector('.lang-btn.active');
    label.textContent = ((active && active.dataset.lang) || 'ar').toUpperCase();
  };

  function setOpen(btn, panel, open) {
    panel.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeAll() {
    setOpen(menuBtn, nav, false);
    setOpen(langBtn, langBox, false);
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !nav.classList.contains('open');
    closeAll();
    setOpen(menuBtn, nav, willOpen);
  });
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !langBox.classList.contains('open');
    closeAll();
    setOpen(langBtn, langBox, willOpen);
  });

  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeAll));
  document.querySelectorAll('.lang-btn').forEach((b) =>
    b.addEventListener('click', () => {
      setTimeout(syncLabel, 0);
      closeAll();
    })
  );
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  nav.id = nav.id || 'mainNav';
  langBox.id = langBox.id || 'langSwitch';
  syncLabel();
})();
