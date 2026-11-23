/* ============================================================
   WORK — glass folder card interactions
   Pure JS port of the React + framer-motion original.
   Each card is a real link to the project; project content
   (name, description, tech chips) stays visible at all times.
   ============================================================ */
(function () {
  var section = document.querySelector('.ind-section');
  if (!section) return;

  section.classList.add('ind-ready');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var cards = Array.prototype.slice.call(section.querySelectorAll('.ind-folder'));

  cards.forEach(function (card) {
    var stage  = card.querySelector('.ind-folder-stage');
    var wrap   = card.querySelector('.ind-folder-front-wrap');
    var spec   = card.querySelector('.ind-front-spec');
    var shadow = card.querySelector('.ind-folder-shadow');
    var px = 0, py = 0;

    /* Cursor tilt: px / py are -1 … 1 */
    function move(e) {
      if (!fine || reduce) return;
      var r = card.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;

      var rx = py * -9;   /* rotateX */
      var ry = px * 11;   /* rotateY */

      if (stage) {
        stage.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
        stage.style.transition = 'transform 0.08s linear';
      }
      if (spec) {
        spec.style.background =
          'radial-gradient(180px 140px at calc(50% + ' + (px * 44) + 'px) calc(28% + ' + (py * 32) + 'px), rgba(255,255,255,0.6), rgba(255,255,255,0) 70%)';
      }
      if (shadow) {
        shadow.style.transform = 'translate(' + (ry * 0.6) + 'px, ' + (rx * -0.4) + 'px)';
      }
    }

    /* Front panel hinges toward the viewer */
    function enter() {
      if (!fine) return;
      if (wrap) {
        wrap.style.transform = reduce ? 'none' : 'perspective(700px) rotateX(-14deg)';
        wrap.style.transition = 'transform 0.6s cubic-bezier(0.34,1.2,0.5,1)';
      }
      if (shadow) shadow.style.opacity = '0.28';
    }

    /* Reset every layer back to rest */
    function leave() {
      px = 0; py = 0;
      if (stage) {
        stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
        stage.style.transition = 'transform 0.65s cubic-bezier(0.2,0.8,0.2,1)';
      }
      if (wrap) {
        wrap.style.transform = 'perspective(700px) rotateX(0deg)';
        wrap.style.transition = 'transform 0.6s cubic-bezier(0.34,1.2,0.5,1)';
      }
      if (shadow) {
        shadow.style.opacity = '0.1';
        shadow.style.transform = 'translate(0px, 0px)';
      }
    }

    card.addEventListener('pointermove', move);
    card.addEventListener('pointerenter', enter);
    card.addEventListener('pointerleave', leave);
  });

  /* Staggered scroll entrance — whileInView + delay:index*0.07 */
  if (reduce || !('IntersectionObserver' in window)) {
    cards.forEach(function (c) { c.classList.add('in-view'); });
    var headFallback = section.querySelector('.ind-heading-block');
    if (headFallback) headFallback.classList.add('in-view');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      var delay = el.classList.contains('ind-folder') ? cards.indexOf(el) * 70 : 0;
      el.style.transitionDelay = delay + 'ms';
      el.classList.add('in-view');
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(function (c) { io.observe(c); });

  var head = section.querySelector('.ind-heading-block');
  if (head) io.observe(head);
})();
