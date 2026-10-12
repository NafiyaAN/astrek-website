import type { Locale } from "./i18n";
import { localizeHref } from "./i18n";
import { MechChrome } from "./MechChrome";

export function ProductPage({ locale }: { locale: Locale }) {
  const contact = localizeHref(locale, "/#contact");
  const html = `
<section id="product" class="rf-section rf-product-hero page-hero">
  <div class="wrap">
    <div class="rf-product-hero-grid reveal">
      <div class="rf-product-hero-copy">
        <p class="rf-kicker mono">Unik Exo</p>
        <h1 data-i18n="product-h2">Engineered to move with you</h1>
        <p>Unik Exo is a lower-limb exoskeleton that combines advanced robotics, intelligent software and human insight to restore mobility and independence.</p>
        <div class="rf-product-hero-actions">
          <a class="rf-btn" href="${contact}">Talk to our team</a>
          <a class="rf-btn" href="https://youtu.be/NpqgceuA6IM" target="_blank" rel="noopener">Watch video</a>
        </div>
      </div>
      <div class="rf-product-media" id="productStage">
        <div id="product3DStage" class="product-3d-stage">
          <div class="product-face product-face--front">
            <img id="productHeroImg" src="/images/hero-exo-product.png" alt="Unik Exo exoskeleton, studio view" />
          </div>
          <div class="product-face product-face--back" aria-hidden="true">
            <img id="productHeroImgBack" src="/images/hero-exo-product.png" alt="" />
          </div>
          <div class="product-face product-face--left" aria-hidden="true">
            <img id="productHeroImgLeft" src="/images/hero-exo-product.png" alt="" />
          </div>
          <div class="product-face product-face--right" aria-hidden="true">
            <img id="productHeroImgRight" src="/images/hero-exo-product.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="rf-product-below reveal">
      <div class="rf-product-points product-callouts" id="productCallouts">
        <article class="rf-point product-callout is-active" data-src="/images/hero-exo-product.png">
          <div class="idx mono">01</div>
          <div>
            <h3>Hip Assist</h3>
            <p>Adaptive support for natural motion.</p>
          </div>
        </article>
        <article class="rf-point product-callout" data-src="/images/walk-mode.webp">
          <div class="idx mono">02</div>
          <div>
            <h3>Knee Actuation</h3>
            <p>Precision control for stability and safety.</p>
          </div>
        </article>
        <article class="rf-point product-callout" data-src="/images/stand-mode.webp">
          <div class="idx mono">03</div>
          <div>
            <h3>Ankle Support</h3>
            <p>Balanced assistance for confident steps.</p>
          </div>
        </article>
        <article class="rf-point product-callout" data-src="/images/unikexo-control.webp">
          <div class="idx mono">04</div>
          <div>
            <h3>Smart Control</h3>
            <p>Real-time intelligence that adapts to the user.</p>
          </div>
        </article>
      </div>
      <div class="rf-stats-grid">
        <div><strong>120+</strong><span>Patients trained</span></div>
        <div><strong>15+</strong><span>Rehab centers</span></div>
        <div><strong>10K+</strong><span>Therapy sessions</span></div>
        <div><strong>90%</strong><span>Would recommend</span></div>
      </div>
    </div>
  </div>
</section>

<section class="rf-section" id="capabilities">
  <div class="wrap">
    <div class="rf-section-head reveal">
      <div>
        <h2 class="rf-h2" data-i18n="cap-h2">Technology that moves lives forward</h2>
        <p>Unik Exo helps individuals stand, walk and regain independence through intelligent assistance and clinical precision.</p>
      </div>
      <a class="rf-btn rf-btn--sm" href="${contact}">Talk to the team</a>
    </div>
    <div class="rf-mode-grid rf-mode-grid--tall reveal-stagger">
      <article class="rf-mode-card">
        <img src="/images/sit-mode.webp" alt="Sit to stand" />
        <div class="rf-mode-meta"><span class="idx mono">01</span><h3>Sit to stand</h3><p>Powered transfer with posture support.</p></div>
      </article>
      <article class="rf-mode-card">
        <img src="/images/stand-mode.webp" alt="Stand" />
        <div class="rf-mode-meta"><span class="idx mono">02</span><h3>Stand</h3><p>Stable upright support in the clinic.</p></div>
      </article>
      <article class="rf-mode-card">
        <img src="/images/walk-mode.webp" alt="Walk" />
        <div class="rf-mode-meta"><span class="idx mono">03</span><h3>Walk</h3><p>Gait assistance that follows the wearer.</p></div>
      </article>
      <article class="rf-mode-card">
        <img src="/images/clinical-pilot.webp" alt="Exercise" />
        <div class="rf-mode-meta"><span class="idx mono">04</span><h3>Exercise</h3><p>Guided strength, endurance and balance.</p></div>
      </article>
    </div>
  </div>
</section>

<section class="rf-section">
  <div class="wrap">
    <div class="rf-section-head reveal">
      <div>
        <h2 class="rf-h2" data-i18n="purpose-h2">Every detail serves a purpose</h2>
        <p>Every design decision on Unik Exo traces back to safe, repeatable gait training a therapist can trust.</p>
      </div>
      <a class="rf-btn rf-btn--sm" href="${contact}">Clinical partnership</a>
    </div>
    <div class="rf-part-grid reveal-stagger">
      <article class="rf-part-card">
        <img src="/images/unikexo-hip.webp" alt="Hip module" />
        <div class="rf-part-meta"><h3>Hip module</h3><p>Adaptive support through the gait cycle.</p></div>
      </article>
      <article class="rf-part-card">
        <img src="/images/unikexo-knee.webp" alt="Knee actuator" />
        <div class="rf-part-meta"><h3>Knee actuator</h3><p>Precision torque for stability and lift.</p></div>
      </article>
      <article class="rf-part-card">
        <img src="/images/unikexo-ankle.webp" alt="Ankle support" />
        <div class="rf-part-meta"><h3>Ankle support</h3><p>Balanced assistance for confident steps.</p></div>
      </article>
      <article class="rf-part-card">
        <img src="/images/unikexo-fit.webp" alt="Comfortable fit" />
        <div class="rf-part-meta"><h3>Comfortable fit</h3><p>Clinic-grade padding for long sessions.</p></div>
      </article>
      <article class="rf-part-card">
        <img src="/images/unikexo-control.webp" alt="Smart control unit" />
        <div class="rf-part-meta"><h3>Smart control</h3><p>On-device intelligence, stride by stride.</p></div>
      </article>
      <article class="rf-part-card">
        <img src="/images/unikexo-front.webp" alt="Clinician interface" />
        <div class="rf-part-meta"><h3>Clinician interface</h3><p>Step-wise control under supervision.</p></div>
      </article>
    </div>
  </div>
</section>

<section id="modes" class="rf-section">
  <div class="wrap">
    <div class="rf-section-head reveal">
      <div>
        <h2 class="rf-h2" data-i18n="modes-h2">Support through every stage of movement</h2>
        <p>Unik Exo adapts to each phase of rehabilitation with intelligent assistance and clinician control.</p>
      </div>
    </div>
    <div class="rf-feature-grid reveal-stagger">
      <article class="rf-feature-card rf-feature-card--overlay">
        <div class="rf-feature-media">
          <img src="/images/sit-mode.webp" alt="Sit mode" />
          <div class="rf-feature-caption"><h3>Sit mode</h3><p>Safe and supported sitting with posture assistance.</p></div>
        </div>
      </article>
      <article class="rf-feature-card rf-feature-card--overlay">
        <div class="rf-feature-media">
          <img src="/images/stand-mode.webp" alt="Stand mode" />
          <div class="rf-feature-caption"><h3>Stand mode</h3><p>Assisted transition from sitting to standing.</p></div>
        </div>
      </article>
      <article class="rf-feature-card rf-feature-card--overlay">
        <div class="rf-feature-media">
          <img src="/images/walk-mode.webp" alt="Walk mode" />
          <div class="rf-feature-caption"><h3>Walk mode</h3><p>Natural gait assistance for confident movement.</p></div>
        </div>
      </article>
    </div>
  </div>
</section>

<section id="specs" class="rf-section">
  <div class="wrap">
    <div class="rf-section-head reveal">
      <div>
        <h2 class="rf-h2">Engineered for the clinic floor</h2>
        <p>Safety-engineered system, clinically structured gait training, clinic-ready portability, and therapist-controlled operation.</p>
      </div>
      <a class="rf-btn rf-btn--sm" href="${contact}">Get in touch</a>
    </div>
    <div class="rf-spec-cards reveal-stagger">
      <article class="rf-spec-card"><div class="idx mono">01</div><h3>Safety engineered</h3><p>Emergency stop, motor-locked safety modes, mechanical hard limits.</p></article>
      <article class="rf-spec-card"><div class="idx mono">02</div><h3>Structured gait training</h3><p>Programmable, repeatable gait cycles for protocol-based rehabilitation.</p></article>
      <article class="rf-spec-card"><div class="idx mono">03</div><h3>Clinic ready</h3><p>Battery powered, easy donning and doffing, no infrastructure changes.</p></article>
      <article class="rf-spec-card"><div class="idx mono">04</div><h3>Therapist controlled</h3><p>Step-wise control, operated entirely under clinical supervision.</p></article>
    </div>
  </div>
</section>

<section class="rf-cta-band" aria-label="Call to action">
  <div class="wrap rf-cta-inner reveal">
    <h2 class="rf-h2">Ready to bring Unik Exo to your clinic?</h2>
    <p>Talk with our team about pilots, partnerships, and clinical onboarding.</p>
    <a class="rf-btn" href="${contact}">Talk to our team</a>
  </div>
</section>`;

  return (
    <MechChrome locale={locale}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </MechChrome>
  );
}
