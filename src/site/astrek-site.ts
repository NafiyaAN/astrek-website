// @ts-nocheck
/* eslint-disable */
import { BRAND_ARROW_SVG } from "./brand-icons";
// Ported verbatim from the original single-file build so every behaviour
// (content overrides, blog modal, testimonials, enquiries, i18n) is preserved.
type Cleanup = () => void;

function withSignal<T extends object>(obj: T, signal: AbortSignal): T {
  return new Proxy(obj, {
    get(target: any, prop) {
      if (prop === "addEventListener") {
        return (type: string, fn: any, opts?: any) =>
          target.addEventListener(type, fn, {
            ...(typeof opts === "object" && opts ? opts : {}),
            signal,
          });
      }
      const value = target[prop];
      return typeof value === "function" ? value.bind(target) : value;
    },
    set(target: any, prop, value) {
      target[prop] = value;
      return true;
    },
  }) as T;
}

import {
  detectBrowserLocale,
  isLocale,
  localeFromPath,
  persistLocale,
  readSavedLocale,
  switchLocalePath,
  type Locale,
} from "./i18n";
import { MARKUP, translate, tryTranslate } from "./translations";

export function initAstrekSite(forcedLocale?: Locale): Cleanup {
  const ac = new AbortController();
  const signal = ac.signal;
  const rafs: number[] = [];
  const document = withSignal(globalThis.document, signal) as Document;
  const window = withSignal(globalThis.window, signal) as Window & typeof globalThis;
  const requestAnimationFrame = (fn: FrameRequestCallback) => {
    const id = globalThis.requestAnimationFrame(fn);
    rafs.push(id);
    return id;
  };
  void window;
  
    // mobile nav toggle
    const burgerBtn = document.getElementById('burgerBtn');
    const navLinks = document.getElementById('navLinks');
    const siteHeader = document.getElementById('siteHeader');
    const setMobileNav = (open) => {
      if (!siteHeader || !burgerBtn) return;
      siteHeader.classList.toggle('nav-open', open);
      burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      burgerBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-locked', open);
    };
    if (burgerBtn && navLinks && siteHeader) {
      burgerBtn.addEventListener('click', () => {
        setMobileNav(!siteHeader.classList.contains('nav-open'));
      });
      navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        setMobileNav(false);
      }));
      siteHeader.querySelector('.logo')?.addEventListener('click', () => setMobileNav(false));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMobileNav(false);
      });
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1100) setMobileNav(false);
      });
    }
  
    // header scroll state
    const header = document.getElementById('siteHeader');
    const pct = document.getElementById('scrollPct');
    window.addEventListener('scroll', () => {
      if (header) header.classList.toggle('scrolled', window.scrollY > 20);
      const h = document.documentElement;
      const p = Math.min(100, Math.round((h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100));
      if (pct) pct.textContent = (p < 10 ? '0' : '') + p + '%';
    });
  
    // scroll reveal: mark above-fold first so content is never delayed
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      return r.top < vh * 1.35 && r.bottom > -vh * 0.2;
    };
    revealEls.forEach(el => { if (inView(el)) el.classList.add('in'); });
    document.documentElement.classList.add('js-reveals');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '120px 0px 45% 0px' });
    revealEls.forEach(el => { if (!el.classList.contains('in')) io.observe(el); });
  
    // classy section-to-section transition: top accent line draws in once per section
    const secIO = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('sec-in'); secIO.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('section[id]').forEach(el => secIO.observe(el));
  
    // scroll-progress rail: highlight the section currently in view
    const railLinks = document.querySelectorAll('#scrollRail a');
    if(railLinks.length){
      const railMap = new Map();
      railLinks.forEach(a => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if(target) railMap.set(target, a);
      });
      const railIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          const a = railMap.get(e.target);
          if(!a) return;
          if(e.isIntersecting) railLinks.forEach(l => l.classList.toggle('active', l === a));
        });
      }, { threshold: 0.5 });
      railMap.forEach((a, target) => railIO.observe(target));
    }
  
    // scanline drift on product image
    const scan = document.getElementById('scanline');
    if (scan) {
      let t = 0;
      function scanAnim(){
        t += 0.006;
        const y = (Math.sin(t) * 0.5 + 0.5) * 100;
        scan.style.top = y + '%';
        requestAnimationFrame(scanAnim);
      }
      scanAnim();
    }
  
    // reduced motion respect
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(prefersReducedMotion){
      document.querySelectorAll('.reveal, .reveal-stagger > *').forEach(el=>{ el.style.transition='none'; el.classList.add('in'); });
    }

    // mouse-tracked 3D tilt on product media + mode cards
    if(!prefersReducedMotion){
      const TILT_MAX = 7; // degrees
      const tiltEls = document.querySelectorAll('.product-media, .mode-card');
      tiltEls.forEach(function(el){
        el.addEventListener('mousemove', function(e){
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const rotY = (px - 0.5) * TILT_MAX * 2;
          const rotX = (0.5 - py) * TILT_MAX * 2;
          el.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
        }, { signal });
        el.addEventListener('mouseleave', function(){
          el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
        }, { signal });
      });
    }
  
    /* =====================================================================
       ADMIN-CONNECTED FEATURES (content overrides, blog, enquiries)
       Data lives in this browser's localStorage under the "astrek_" prefix.
       Edited from admin.html: see that file for how the two connect.
    ===================================================================== */
    function escapeHtml(str){
      return String(str == null ? '' : str).replace(/[&<>"']/g, function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
      });
    }
  
    // 1. Content overrides (hero, about, vision/mission text)
    function applyContentOverrides(){
      let data;
      try{ data = JSON.parse(localStorage.getItem('astrek_content') || '{}'); }catch(e){ data = {}; }
      document.querySelectorAll('[data-editable]').forEach(function(el){
        const key = el.getAttribute('data-editable');
        const val = data[key];
        if(val !== undefined && val !== null && val !== ''){
          if(key === 'hero-h1'){ el.innerHTML = escapeHtml(val).replace(/\n/g,'<br>'); }
          else{ el.textContent = val; }
        }
      });
    }
    applyContentOverrides();
  
    // 2. Blog: render from localStorage if the admin has customised posts,
    //    otherwise the three default posts baked into the HTML stay as-is.
    function renderBlogFromStorage(){
      const grid = document.getElementById('blogGrid');
      if(!grid) return;
      const raw = localStorage.getItem('astrek_blogPosts');
      if(raw === null) return;
      let posts;
      try{ posts = JSON.parse(raw); }catch(e){ return; }
      if(!Array.isArray(posts) || posts.length === 0){
        grid.innerHTML = '<div class="blog-empty">No posts yet. Add one from the admin panel.</div>';
        return;
      }
      const fallbackImages = [
        '/images/clinical-pilot.webp',
        '/images/motion-capture-gait.png',
        '/images/astrek-lab.webp'
      ];
      grid.innerHTML = posts.map(function(p, i){
        const tag = escapeHtml(p.tag || 'JOURNAL');
        const image = escapeHtml(p.image || fallbackImages[i % fallbackImages.length]);
        return '<div class="blog-card" data-image="'+image+'" data-title="'+escapeHtml(p.title)+'" data-date="'+escapeHtml(p.date)+'" data-tag="'+tag+'" data-body="'+escapeHtml(p.body || p.excerpt || '')+'">'
          + '<div class="blog-cover"><span class="tag mono">'+tag+'</span></div>'
          + '<div class="blog-body"><div class="date mono">'+escapeHtml(p.date)+'</div><h4>'+escapeHtml(p.title)+'</h4>'
          + '<p>'+escapeHtml(p.excerpt || '')+'</p><span class="read-more elvin-link">Read more '+BRAND_ARROW_SVG+'</span></div></div>';
      }).join('');
    }
    renderBlogFromStorage();
  
    // Blog reading: dedicated article pages, with modal as fallback
    const blogModal = document.getElementById('blogModal');
    const blogGridEl = document.getElementById('blogGrid');
    if(blogGridEl){
      blogGridEl.addEventListener('click', function(e){
        const card = e.target.closest('.blog-card');
        if(!card) return;
        const slug = card.dataset.slug;
        if (slug) {
          const lang = document.documentElement.lang === 'ar' ? 'ar' : document.documentElement.lang === 'ja' ? 'ja' : 'en';
          window.location.href = (lang === 'en' ? '' : '/' + lang) + '/blog/' + slug;
          return;
        }
        if (!blogModal) return;
        document.getElementById('blogModalTag').textContent = card.dataset.tag || 'JOURNAL';
        document.getElementById('blogModalDate').textContent = card.dataset.date || '';
        document.getElementById('blogModalTitle').textContent = card.dataset.title || '';
        document.getElementById('blogModalBody').textContent = card.dataset.body || card.dataset.excerpt || '';
        blogModal.classList.add('open');
      });
      if (blogModal) {
        document.getElementById('blogModalClose')?.addEventListener('click', function(){ blogModal.classList.remove('open'); });
        blogModal.addEventListener('click', function(e){ if(e.target === blogModal) blogModal.classList.remove('open'); });
        document.addEventListener('keydown', function(e){ if(e.key === 'Escape') blogModal.classList.remove('open'); });
      }
    }
  
  
    // 4. Testimonials: optionally managed from admin.html using the same
    //    localStorage pattern as blog posts.
    function renderTestimonialsFromStorage(){
      const grid = document.getElementById('testimonialGrid');
      if(!grid) return;
      const raw = localStorage.getItem('astrek_testimonials');
      if(raw === null) return; // keep the three built-in testimonials
      let items;
      try{ items = JSON.parse(raw); }catch(e){ return; }
      if(!Array.isArray(items) || items.length === 0){
        grid.innerHTML = '<div class="testimonial-empty">No testimonials yet. Add one from the admin panel.</div>';
        return;
      }
      grid.innerHTML = items.map(function(t){
        return '<article class="testimonial-card">'
          + '<div class="testimonial-quote">“</div>'
          + '<p class="testimonial-text">'+escapeHtml(t.text || '')+'</p>'
          + '<div class="testimonial-author">'
          + '<strong>'+escapeHtml(t.name || '')+'</strong>'
          + '<span>'+escapeHtml(t.role || '')+'</span>'
          + '</div></article>';
      }).join('');
      grid.dispatchEvent(new CustomEvent('testimonials:updated'));
    }
    renderTestimonialsFromStorage();
  
    // 3. Contact form: stores enquiries locally so admin.html (opened in this
    //    same browser) can list them. See admin.html for the important caveat
    //    about this only working within one browser, not across all visitors.
    const contactForm = document.getElementById('contactForm');
    if(contactForm){
      contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const entry = {
          id: 'enq_' + Date.now(),
          name: document.getElementById('cfName').value.trim(),
          email: document.getElementById('cfEmail').value.trim(),
          phone: document.getElementById('cfPhone')?.value.trim() || '',
          organisation: document.getElementById('cfOrg')?.value.trim() || '',
          subject: document.getElementById('cfSubject').value.trim(),
          message: document.getElementById('cfMessage').value.trim(),
          date: new Date().toISOString(),
          read: false
        };
        let list;
        try{ list = JSON.parse(localStorage.getItem('astrek_enquiries') || '[]'); }catch(err){ list = []; }
        list.unshift(entry);
        localStorage.setItem('astrek_enquiries', JSON.stringify(list));
        const status = document.getElementById('cfStatus');
        status.style.display = 'block';
        status.textContent = "Thank you. Your message has been received. We'll be in touch shortly.";
        contactForm.reset();
      });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e){
        e.preventDefault();
        const email = (document.getElementById('nlEmail') as HTMLInputElement | null)?.value.trim();
        if (!email) return;
        let list;
        try { list = JSON.parse(localStorage.getItem('astrek_newsletter') || '[]'); } catch(err) { list = []; }
        list.unshift({ email, date: new Date().toISOString() });
        localStorage.setItem('astrek_newsletter', JSON.stringify(list));
        const status = document.getElementById('nlStatus');
        if (status) status.textContent = "Thank you. You're on the list.";
        newsletterForm.reset();
      });
    }

    const cookieNotice = document.getElementById('cookieNotice');
    const cookieAccept = document.getElementById('cookieAccept');
    try {
      if (cookieNotice && localStorage.getItem('astrek_cookies_ok') !== '1') {
        cookieNotice.classList.add('is-open');
      }
    } catch(e) {}
    cookieAccept?.addEventListener('click', function(){
      try { localStorage.setItem('astrek_cookies_ok', '1'); } catch(e) {}
      cookieNotice?.classList.remove('is-open');
    });
  
  
    /* =====================================================================
       MULTILINGUAL UI: English / Arabic / Japanese
       Built-in translations; no external translation service required.
       ===================================================================== */
    (function(){
      const originals = new WeakMap();
      const languageButtons = document.querySelectorAll('#languageSwitcher [data-lang], #languageSwitcherMobile [data-lang]');
      const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE']);

      function lookup(raw, lang) {
        return tryTranslate(lang, raw);
      }

      function translateTextNodes(lang) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) {
          const parent = n.parentElement;
          if (!parent || SKIP.has(parent.tagName)) continue;
          if (parent.closest('.language-switcher')) continue;
          if (parent.closest('[data-i18n]')) continue;
          if (!n.nodeValue || !n.nodeValue.trim()) continue;
          nodes.push(n);
        }
        for (const node of nodes) {
          if (!originals.has(node)) originals.set(node, node.nodeValue);
          const orig = originals.get(node);
          if (lang === 'en') { node.nodeValue = orig; continue; }
          const found = lookup(orig, lang);
          if (!found) continue;
          const lead = orig.match(/^\s*/)[0];
          const trail = orig.match(/\s*$/)[0];
          node.nodeValue = lead + found + trail;
        }
      }

      function translateMarkup(lang) {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
          if (!el.dataset.i18nHtml) el.dataset.i18nHtml = el.innerHTML;
          const key = el.getAttribute('data-i18n');
          if (lang === 'en') { el.innerHTML = el.dataset.i18nHtml; return; }
          const hit = MARKUP[key];
          if (hit && hit[lang]) el.innerHTML = hit[lang];
        });
      }

      function translateAttrs(lang) {
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function(el) {
          if (!el.dataset.i18nPlaceholder) el.dataset.i18nPlaceholder = el.getAttribute('placeholder') || '';
          el.setAttribute('placeholder', translate(lang, el.dataset.i18nPlaceholder));
        });
        document.querySelectorAll('option').forEach(function(el) {
          if (!el.dataset.i18nKey) el.dataset.i18nKey = el.textContent.trim();
          el.textContent = translate(lang, el.dataset.i18nKey);
        });
        document.querySelectorAll('[aria-label]').forEach(function(el) {
          if (el.closest('.language-switcher')) return;
          if (!el.dataset.i18nAria) el.dataset.i18nAria = el.getAttribute('aria-label') || '';
          el.setAttribute('aria-label', translate(lang, el.dataset.i18nAria));
        });
      }

      function localizeHrefs(lang) {
        document.querySelectorAll('a[href]').forEach(function(el) {
          const a = el;
          if (!a.dataset.i18nHref) a.dataset.i18nHref = a.getAttribute('href') || '';
          const href = a.dataset.i18nHref;
          if (!href || /^(https?:|mailto:|tel:)/i.test(href)) return;
          if (href.startsWith('#')) return;
          if (!href.startsWith('/')) return;
          const stripped = href.replace(/^\/(en|ar|ja)(?=\/|$|#)/, '') || '/';
          const path = stripped.startsWith('/') ? stripped : '/' + stripped;
          a.setAttribute('href', lang === 'en' ? path : '/' + lang + (path === '/' ? '' : path));
        });
      }

      function applyLanguage(lang, persist) {
        if (!['en','ar','ja'].includes(lang)) lang = 'en';
        translateMarkup(lang);
        translateTextNodes(lang);
        translateAttrs(lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('lang-ar', lang === 'ar');
        languageButtons.forEach(function(btn) {
          btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        if (persist !== false) persistLocale(lang);
        localizeHrefs(lang);
      }

      languageButtons.forEach(function(btn){
        btn.addEventListener('click', function(){
          const next = btn.dataset.lang;
          if (!isLocale(next)) return;
          persistLocale(next);
          const target = switchLocalePath(next, window.location.pathname, window.location.hash);
          if (target.split('#')[0] !== window.location.pathname) {
            window.location.assign(target);
            return;
          }
          applyLanguage(next);
        });
      });

      const pathLocale = localeFromPath(window.location.pathname);
      const savedLanguage = readSavedLocale();
      const detected = detectBrowserLocale();
      if (!pathLocale && savedLanguage && savedLanguage !== 'en' && !window.location.pathname.startsWith('/admin')) {
        window.location.replace(switchLocalePath(savedLanguage, window.location.pathname, window.location.hash));
        return;
      }
      if (!pathLocale && !savedLanguage && detected !== 'en' && window.location.pathname === '/') {
        window.location.replace('/' + detected + window.location.hash);
        return;
      }
      applyLanguage(forcedLocale || pathLocale || savedLanguage || detected || 'en', Boolean(forcedLocale || pathLocale || savedLanguage));
  
      function translateModalContent(){
        const lang = (document.documentElement.lang || 'en') as Locale;
        ['blogModalTag','blogModalTitle','blogModalBody'].forEach(function(id){
          const el=document.getElementById(id);
          if(!el) return;
          if(!el.dataset.i18nKey) el.dataset.i18nKey=el.textContent.trim();
          el.textContent = translate(lang, el.dataset.i18nKey);
        });
      }
      document.addEventListener('click', function(e){
        if(e.target.closest('.blog-card')) setTimeout(translateModalContent, 0);
      });
    })();
  
  

  return () => {
    ac.abort();
    rafs.forEach((id) => globalThis.cancelAnimationFrame(id));
    document.body.classList.remove('nav-locked');
    document.getElementById('siteHeader')?.classList.remove('nav-open');
  };
}