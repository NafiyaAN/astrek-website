// @ts-nocheck
/* eslint-disable */
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

export function initAstrekAdmin(): Cleanup {
  const ac = new AbortController();
  const signal = ac.signal;
  const document = withSignal(globalThis.document, signal) as Document;
  const window = withSignal(globalThis.window, signal) as Window & typeof globalThis;
  void window;
  
  
    /* ===================== CONFIG ===================== */
    const ADMIN_PASSWORD = 'astrek2026'; // change this: see note in chat about security
    const K_CONTENT = 'astrek_content';
    const K_POSTS   = 'astrek_blogPosts';
    const K_ENQ     = 'astrek_enquiries';
    const K_TESTIMONIALS = 'astrek_testimonials';
  
    const DEFAULT_POSTS = [
      {
        id:'post_1', title:'Inside Our First Clinical Pilot', tag:'CLINICAL', date:'March 2026',
        excerpt:'What we learned fitting Unik Exo on real patients for the first time, and what we changed as a result.',
        body:"Our first clinical pilot ran across two partner rehabilitation centres over six weeks. Patients with varying degrees of lower-limb impairment used Unik Exo under supervision, and we logged every session, including fit time, gait symmetry, fatigue, and subjective comfort.\n\nThe biggest surprise wasn't mechanical. It was donning time. Our lab benchmark of under five minutes stretched to nearly fifteen in a real clinical setting, mostly due to clothing, transfers and staff familiarity. That single insight reshaped our next hardware revision more than any actuator tweak did.\n\nWe also learned to trust therapists' instincts over our own dashboards. A few sessions where the software reported 'normal' gait symmetry were flagged by therapists as compensatory movement, with patients finding clever ways to trick the metric without truly rehabilitating the pattern. We're now designing detection for exactly that."
      },
      {
        id:'post_2', title:'What Motion Capture Teaches Us About Gait', tag:'ENGINEERING', date:'January 2026',
        excerpt:'A short primer on how we use motion capture data to model human gait, and why average gait is a myth.',
        body:"Every gait cycle looks a little different. Cadence, stride length, and joint angles shift with terrain, fatigue, mood, even footwear. When we started building Unik Exo's control model, we assumed there was a 'normal' gait curve we could design around. There isn't.\n\nInstead, we capture gait across a wide population using marker-based motion capture, then train our assistive controller to recognise the shape of an individual's gait rather than match them to an average. This lets the exoskeleton assist the wearer's own pattern instead of forcing a generic one onto them.\n\nIt also means every new wearer effectively 'teaches' the device during their first calibration session, a short walk that lets the controller learn their baseline before assistance ramps up."
      },
      {
        id:'post_3', title:'Building Astrek: From Startup Chile to Kannur', tag:'COMPANY', date:'November 2025',
        excerpt:'A short history of how a college robotics project became a rehabilitation hardware company.',
        body:"Astrek began as a robotics project between engineering students trying to solve a problem close to home. What started as a proof-of-concept leg brace grew, slowly and with a lot of failed prototypes, into Unik Exo.\n\nA turning point came at Startup Chile, where we were forced to explain our technology to people with zero context: investors, mentors, and other founders, again and again. It sharpened both the product and the pitch. We came back with a clearer roadmap and, more importantly, a clearer idea of who we were building for.\n\nToday the team is based out of Kannur and the Maker Village in Kalamassery, closer to the clinics and rehabilitation centres we work with. That proximity has shaped nearly every design decision since."
      }
    ];
  
    /* ===================== LOGIN ===================== */
    const loginScreen = document.getElementById('loginScreen');
    const dashboard = document.getElementById('dashboard');
    function unlock(){
      loginScreen.style.display = 'none';
      dashboard.style.display = 'block';
      sessionStorage.setItem('astrek_admin_unlocked', '1');
      renderPosts(); renderTestimonials(); renderEnquiries(); loadContentForm();
    }
    document.getElementById('pwSubmit').addEventListener('click', tryUnlock);
    document.getElementById('pwInput').addEventListener('keydown', function(e){ if(e.key==='Enter') tryUnlock(); });
    function tryUnlock(){
      const val = document.getElementById('pwInput').value;
      if(val === ADMIN_PASSWORD){ unlock(); }
      else{ document.getElementById('pwError').style.display = 'block'; }
    }
    document.getElementById('lockBtn').addEventListener('click', function(){
      sessionStorage.removeItem('astrek_admin_unlocked');
      location.reload();
    });
    if(sessionStorage.getItem('astrek_admin_unlocked') === '1'){ unlock(); }
  
    /* ===================== TABS ===================== */
    document.querySelectorAll('.tab-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
      });
    });
  
    function toast(msg){
      const t = document.getElementById('toast');
      t.textContent = msg; t.classList.add('show');
      clearTimeout(t._timer);
      t._timer = setTimeout(()=> t.classList.remove('show'), 2400);
    }
  
    /* ===================== BLOG ===================== */
    function getPosts(){
      let raw = localStorage.getItem(K_POSTS);
      if(raw === null) return DEFAULT_POSTS.slice();
      try{ const p = JSON.parse(raw); return Array.isArray(p) ? p : []; }catch(e){ return []; }
    }
    function savePosts(posts){ localStorage.setItem(K_POSTS, JSON.stringify(posts)); }
  
    function renderPosts(){
      const posts = getPosts();
      const list = document.getElementById('postList');
      if(posts.length === 0){
        list.innerHTML = '<div class="empty-state">No posts yet. Click "+ New Post" to add one.</div>';
        return;
      }
      list.innerHTML = posts.map(function(p){
        return '<div class="post-row">'
          + '<div class="meta"><div class="tag mono">'+esc(p.tag||'JOURNAL')+' · '+esc(p.date||'')+'</div><div class="title">'+esc(p.title)+'</div></div>'
          + '<div class="row-actions">'
          + '<button class="btn-outline" data-edit="'+esc(p.id)+'">Edit</button>'
          + '<button class="btn-outline btn-danger" data-del="'+esc(p.id)+'">Delete</button>'
          + '</div></div>';
      }).join('');
      list.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', ()=> openPostEditor(b.dataset.edit)));
      list.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', ()=> deletePost(b.dataset.del)));
    }
  
    function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  
    let editingPostId = null;
    document.getElementById('newPostBtn').addEventListener('click', () => openPostEditor(null));
    document.getElementById('cancelPostBtn').addEventListener('click', closePostEditor);
  
    function mapBlogCategory(tag){
      const value = String(tag || '');
      const allowed = ['Company updates','Technology','Product development','Rehabilitation robotics','Industry insights','Events'];
      if (allowed.indexOf(value) !== -1) return value;
      const t = value.toUpperCase();
      if (t.indexOf('PRODUCT') !== -1) return 'Product development';
      if (t.indexOf('INDUSTRY') !== -1 || t.indexOf('INSIGHT') !== -1) return 'Industry insights';
      if (t === 'EVENTS' || t.indexOf('EVENT') !== -1 || t.indexOf('ANNOUNCE') !== -1) return 'Events';
      if (t === 'CLINICAL' || t === 'RESEARCH' || t.indexOf('REHAB') !== -1) return 'Rehabilitation robotics';
      if (t === 'ENGINEERING' || t === 'TECHNOLOGY' || t.indexOf('TECH') !== -1) return 'Technology';
      return 'Company updates';
    }

    function openPostEditor(id){
      editingPostId = id;
      const posts = getPosts();
      const post = id ? posts.find(p => p.id === id) : null;
      document.getElementById('postEditorTitle').textContent = post ? 'Edit Post' : 'New Post';
      document.getElementById('pfId').value = post ? post.id : '(assigned on save)';
      document.getElementById('pfTitle').value = post ? post.title : '';
      document.getElementById('pfTag').value = post ? mapBlogCategory(post.tag) : 'Company updates';
      document.getElementById('pfDate').value = post ? post.date : '';
      document.getElementById('pfExcerpt').value = post ? post.excerpt : '';
      document.getElementById('pfBody').value = post ? post.body : '';
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('panel-post-editor').classList.add('active');
    }
    function closePostEditor(){
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('panel-blog').classList.add('active');
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelector('[data-tab="blog"]').classList.add('active');
    }
    document.getElementById('savePostBtn').addEventListener('click', function(){
      const title = document.getElementById('pfTitle').value.trim();
      const excerpt = document.getElementById('pfExcerpt').value.trim();
      const body = document.getElementById('pfBody').value.trim();
      if(!title || !excerpt || !body){ toast('Title, excerpt and body are required.'); return; }
      let posts = getPosts();
      const tag = document.getElementById('pfTag').value.trim() || 'Company updates';
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if(editingPostId){
        posts = posts.map(p => p.id === editingPostId ? {
          id:p.id, title, excerpt, body, tag, slug: p.slug || slug,
          date: document.getElementById('pfDate').value.trim() || p.date,
          image: p.image || ''
        } : p);
      } else {
        posts.unshift({
          id: 'post_' + Date.now(), title, excerpt, body, tag, slug,
          date: document.getElementById('pfDate').value.trim() || new Date().toLocaleDateString('en-US',{month:'long',year:'numeric'}),
          image: ''
        });
      }
      savePosts(posts);
      toast('Post saved.');
      closePostEditor();
      renderPosts();
    });
    function deletePost(id){
      if(!confirm('Delete this post? This cannot be undone.')) return;
      savePosts(getPosts().filter(p => p.id !== id));
      renderPosts();
      toast('Post deleted.');
    }
  
  
    /* ===================== TESTIMONIALS ===================== */
    const DEFAULT_TESTIMONIALS = [
      {
        id:'testimonial_1',
        name:'Dr. Ananya Menon',
        role:'Rehabilitation Specialist',
        text:'Unik Exo brings together thoughtful engineering and a clear understanding of what gait rehabilitation actually needs on the clinic floor.'
      },
      {
        id:'testimonial_2',
        name:'Clinical Partner',
        role:'Rehabilitation & Mobility',
        text:"What stood out to us was the team's willingness to listen, test, and improve. The product feels built around the person using it."
      },
      {
        id:'testimonial_3',
        name:'Innovation Partner',
        role:'Healthcare Technology',
        text:"Astrek is tackling a meaningful problem with a strong combination of robotics, AI and clinical thinking. Their approach is refreshingly practical."
      }
    ];
  
    function getTestimonials(){
      const raw = localStorage.getItem(K_TESTIMONIALS);
      if(raw === null) return DEFAULT_TESTIMONIALS.slice();
      try{ const items = JSON.parse(raw); return Array.isArray(items) ? items : []; }catch(e){ return []; }
    }
    function saveTestimonials(items){ localStorage.setItem(K_TESTIMONIALS, JSON.stringify(items)); }
  
    function renderTestimonials(){
      const list = document.getElementById('testimonialList');
      if(!list) return;
      const items = getTestimonials();
      if(items.length === 0){
        list.innerHTML = '<div class="empty-state">No testimonials yet. Click "+ New Testimonial" to add one.</div>';
        return;
      }
      list.innerHTML = items.map(function(t){
        return '<div class="post-row">'
          + '<div class="meta"><div class="tag mono">TESTIMONIAL</div>'
          + '<div class="title">'+esc(t.name)+'</div>'
          + '<div style="color:var(--lo);font-size:12px;margin-top:4px;">'+esc(t.role||'')+'</div>'
          + '<div style="color:var(--lo2);font-size:12px;margin-top:8px;max-width:620px;">'+esc(t.text)+'</div></div>'
          + '<div class="row-actions">'
          + '<button class="btn-outline" data-edit-testimonial="'+esc(t.id)+'">Edit</button>'
          + '<button class="btn-outline btn-danger" data-del-testimonial="'+esc(t.id)+'">Delete</button>'
          + '</div></div>';
      }).join('');
      list.querySelectorAll('[data-edit-testimonial]').forEach(b => b.addEventListener('click', () => openTestimonialEditor(b.dataset.editTestimonial)));
      list.querySelectorAll('[data-del-testimonial]').forEach(b => b.addEventListener('click', () => deleteTestimonial(b.dataset.delTestimonial)));
    }
  
    let editingTestimonialId = null;
    document.getElementById('newTestimonialBtn').addEventListener('click', () => openTestimonialEditor(null));
    document.getElementById('cancelTestimonialBtn').addEventListener('click', closeTestimonialEditor);
  
    function openTestimonialEditor(id){
      editingTestimonialId = id;
      const items = getTestimonials();
      const item = id ? items.find(t => t.id === id) : null;
      document.getElementById('testimonialEditorTitle').textContent = item ? 'Edit Testimonial' : 'New Testimonial';
      document.getElementById('tfName').value = item ? item.name : '';
      document.getElementById('tfRole').value = item ? item.role : '';
      document.getElementById('tfText').value = item ? item.text : '';
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('panel-testimonial-editor').classList.add('active');
    }
  
    function closeTestimonialEditor(){
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('panel-testimonials').classList.add('active');
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelector('[data-tab="testimonials"]').classList.add('active');
    }
  
    document.getElementById('saveTestimonialBtn').addEventListener('click', function(){
      const name = document.getElementById('tfName').value.trim();
      const text = document.getElementById('tfText').value.trim();
      const role = document.getElementById('tfRole').value.trim();
      if(!name || !text){ toast('Name and testimonial are required.'); return; }
  
      let items = getTestimonials();
      if(editingTestimonialId){
        items = items.map(t => t.id === editingTestimonialId
          ? {id:t.id, name, role, text}
          : t);
      } else {
        items.unshift({id:'testimonial_'+Date.now(), name, role, text});
      }
      saveTestimonials(items);
      toast('Testimonial saved.');
      closeTestimonialEditor();
      renderTestimonials();
    });
  
    function deleteTestimonial(id){
      if(!confirm('Delete this testimonial? This cannot be undone.')) return;
      saveTestimonials(getTestimonials().filter(t => t.id !== id));
      renderTestimonials();
      toast('Testimonial deleted.');
    }
  
    /* ===================== ENQUIRIES ===================== */
    function getEnquiries(){
      try{ return JSON.parse(localStorage.getItem(K_ENQ) || '[]'); }catch(e){ return []; }
    }
    function saveEnquiries(list){ localStorage.setItem(K_ENQ, JSON.stringify(list)); }
  
    function renderEnquiries(){
      const list = getEnquiries();
      const el = document.getElementById('enqList');
      if(list.length === 0){
        el.innerHTML = '<div class="empty-state">No enquiries yet. Submissions made through the contact form on this browser will appear here.</div>';
        return;
      }
      el.innerHTML = list.map(function(e){
        const d = new Date(e.date);
        const dateStr = isNaN(d) ? '' : d.toLocaleString();
        return '<div class="enq-row '+(e.read?'':'unread')+'">'
          + '<div class="enq-top"><div><div class="enq-name">'+esc(e.name)+'</div>'
          + '<div class="enq-meta">'+esc(e.email)+(e.phone ? ' · '+esc(e.phone) : '')+' · '+esc(dateStr)+'</div></div>'
          + '<div class="enq-meta">'+esc(e.subject||'No subject')+'</div></div>'
          + '<div class="enq-msg">'+esc(e.message)+'</div>'
          + '<div class="enq-actions">'
          + '<button class="btn-outline" data-toggle="'+esc(e.id)+'">'+(e.read?'Mark unread':'Mark read')+'</button>'
          + '<button class="btn-outline btn-danger" data-delenq="'+esc(e.id)+'">Delete</button>'
          + '</div></div>';
      }).join('');
      el.querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', function(){
        const list = getEnquiries().map(e => e.id === b.dataset.toggle ? Object.assign({},e,{read:!e.read}) : e);
        saveEnquiries(list); renderEnquiries();
      }));
      el.querySelectorAll('[data-delenq]').forEach(b => b.addEventListener('click', function(){
        saveEnquiries(getEnquiries().filter(e => e.id !== b.dataset.delenq));
        renderEnquiries();
      }));
    }
    document.getElementById('clearEnqBtn').addEventListener('click', function(){
      if(!confirm('Delete all enquiries? This cannot be undone.')) return;
      saveEnquiries([]);
      renderEnquiries();
      toast('Enquiries cleared.');
    });
  
    /* ===================== CONTENT ===================== */
    const CONTENT_KEYS = ['hero-eyebrow','hero-h1','hero-sub','about-h2','about-p1','about-p2','vision-text','mission-text'];
    function getContent(){
      try{ return JSON.parse(localStorage.getItem(K_CONTENT) || '{}'); }catch(e){ return {}; }
    }
    function loadContentForm(){
      const data = getContent();
      CONTENT_KEYS.forEach(function(key){
        const el = document.getElementById('ce-' + key);
        if(el) el.value = data[key] || '';
      });
    }
    document.getElementById('saveContentBtn').addEventListener('click', function(){
      const data = {};
      CONTENT_KEYS.forEach(function(key){
        const el = document.getElementById('ce-' + key);
        if(el && el.value.trim()) data[key] = el.value.trim();
      });
      localStorage.setItem(K_CONTENT, JSON.stringify(data));
      toast('Content saved.');
    });
    document.getElementById('resetContentBtn').addEventListener('click', function(){
      if(!confirm('Reset all site content to the original defaults?')) return;
      localStorage.removeItem(K_CONTENT);
      loadContentForm();
      toast('Content reset to defaults.');
    });
  
  

  return () => ac.abort();
}
