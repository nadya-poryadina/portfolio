/* v3 · бенто: мягкое появление карточек */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.cell, .side');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

/* плавающая кнопка «Смотреть» под курсором на карточках кейсов */
(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;
  var btn = document.createElement('div');
  btn.className = 'view-btn';
  btn.setAttribute('aria-hidden', 'true');
  btn.textContent = 'Смотреть';
  document.body.appendChild(btn);
  var raf = null, tx = 0, ty = 0;
  function place() {
    btn.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) translate(-50%, -50%) scale(1)';
    raf = null;
  }
  document.querySelectorAll('.cell.proj').forEach(function (card) {
    card.addEventListener('mouseenter', function () { btn.classList.add('on'); });
    card.addEventListener('mouseleave', function () { btn.classList.remove('on'); });
    card.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(place);
    });
  });
})();

/* слайдер «другие кейсы» */
(function () {
  var slider = document.getElementById('casesSlider');
  if (!slider) return;
  document.querySelectorAll('.slider-nav button').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = slider.querySelector('.slider-card');
      var w = card ? card.getBoundingClientRect().width + 12 : 312;
      slider.scrollBy({ left: w * parseInt(b.getAttribute('data-dir'), 10), behavior: 'smooth' });
    });
  });
})();

// Лайтбокс: клик по картинке .zoomable открывает её на весь экран
(function () {
  var lb = document.createElement('div');
  lb.style.cssText = 'position:fixed;inset:0;z-index:999;background:rgba(20,20,25,.92);display:none;align-items:center;justify-content:center;padding:32px;cursor:zoom-out';
  var img = document.createElement('img');
  img.style.cssText = 'max-width:100%;max-height:100%;border-radius:12px;box-shadow:0 24px 80px rgba(0,0,0,.5)';
  lb.appendChild(img);
  document.body.appendChild(lb);
  function close() { lb.style.display = 'none'; }
  lb.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && t.classList.contains('zoomable')) {
      img.src = t.src;
      lb.style.display = 'flex';
    }
  });
})();

// Подсветка активного раздела в навигации кейса (scroll-spy)
(function () {
  var links = document.querySelectorAll('.side-nav a[href^="#"]');
  if (!links.length) return;
  var map = {};
  links.forEach(function (l) {
    var id = l.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (target) map[id] = { link: l, el: target };
  });
  var ids = Object.keys(map);
  if (!ids.length) return;

  function activate(id) {
    links.forEach(function (l) { l.classList.remove('nav-active'); });
    if (map[id]) map[id].link.classList.add('nav-active');
  }

  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
    });
    var best = null, bestRatio = 0;
    ids.forEach(function (id) {
      if (visible[id] > bestRatio) { bestRatio = visible[id]; best = id; }
    });
    if (best) activate(best);
  }, { rootMargin: '-20% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] });

  ids.forEach(function (id) { observer.observe(map[id].el); });
})();
