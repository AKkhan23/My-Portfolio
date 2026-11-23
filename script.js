(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* year */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* headline: split into words for one orchestrated entrance */
  var h = document.getElementById('headline');
  if (h) {
    var words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = words.map(function(w,i){
      var hot = /^(animated|speed\.)$/i.test(w) ? ' hot' : '';
      return '<span class="w'+hot+'" aria-hidden="true"><span style="--k:'+i+'">'+w+'</span></span>';
    }).join(' ');
  }

  /* scroll progress */
  var bar = document.getElementById('progress');
  function onScroll(){
    var d = document.documentElement;
    var p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
    if (bar) bar.style.width = (p*100) + '%';
  }

  /* hero field */
  var c = document.getElementById('field');
  var hero = c ? c.parentElement : null;
  if (c) {
    var ctx = c.getContext('2d');
    var w=0,hh=0,dpr=1,cols=0,rows=0,GAP=34,t=0,run=true;
    var mouse={x:-999,y:-999};
    function resize(){
      dpr = Math.min(window.devicePixelRatio||1, 2);
      w = hero.clientWidth; hh = hero.clientHeight;
      c.width = w*dpr; c.height = hh*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      cols = Math.ceil(w/GAP)+2; rows = Math.ceil(hh/GAP)+2;
      if (reduce) draw();
    }
    function draw(){
      ctx.clearRect(0,0,w,hh);
      var R = 170;
      for (var j=0;j<rows;j++){
        ctx.beginPath();
        for (var i=0;i<cols;i++){
          var x0=i*GAP, y0=j*GAP;
          var wave = Math.sin(x0*0.011+t)*11 + Math.cos(y0*0.016+t*1.3)*11;
          var dx=x0-mouse.x, dy=y0-mouse.y, d=Math.sqrt(dx*dx+dy*dy), push=0;
          if (d<R){ push=(1-d/R)*30; }
          var a=Math.atan2(dy,dx);
          var x=x0+Math.cos(a)*push, y=y0+wave+Math.sin(a)*push;
          if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.strokeStyle='rgba(225,29,72,0.07)';
        ctx.lineWidth=1; ctx.stroke();
      }
      for (var j2=0;j2<rows;j2++){
        for (var i2=0;i2<cols;i2++){
          var X0=i2*GAP, Y0=j2*GAP;
          var W = Math.sin(X0*0.011+t)*11 + Math.cos(Y0*0.016+t*1.3)*11;
          var DX=X0-mouse.x, DY=Y0-mouse.y, D=Math.sqrt(DX*DX+DY*DY), P=0, near=0;
          if (D<R){ near=1-D/R; P=near*30; }
          var A=Math.atan2(DY,DX);
          var px=X0+Math.cos(A)*P, py=Y0+W+Math.sin(A)*P;
          ctx.beginPath();
          ctx.arc(px,py,1.3+near*2.6,0,6.2832);
          ctx.fillStyle = near>0.02 ? 'rgba(225,29,72,'+(0.45+near*0.55)+')' : 'rgba(225,29,72,0.32)';
          ctx.fill();
        }
      }
    }
    function loop(){
      if (run){ t+=0.012; draw(); }
      requestAnimationFrame(loop);
    }
    window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', function(e){
      var r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', function(){ mouse.x=-999; mouse.y=-999; });
    if ('IntersectionObserver' in window){
      new IntersectionObserver(function(en){ run = en[0].isIntersecting; }).observe(hero);
    }
    resize();
    if (!reduce) loop();
  }

  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* contact form: opens WhatsApp or email with the message filled in */
  var form = document.getElementById('contactForm');
  function compose(){
    var f = new FormData(form);
    return 'Hi Azim, I\'m ' + f.get('name') + '. I\'m looking for: ' + f.get('type') + '.\n\n' + f.get('msg');
  }
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      window.open('https://wa.me/917000651529?text=' + encodeURIComponent(compose()), '_blank', 'noopener');
    });
    document.getElementById('mailBtn').addEventListener('click', function(){
      if (!form.reportValidity()) return;
      window.location.href = 'mailto:azimkhan50607@gmail.com?subject=' + encodeURIComponent('Project enquiry from your portfolio') + '&body=' + encodeURIComponent(compose());
    });
  }
})();
