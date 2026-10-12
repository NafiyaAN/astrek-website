import type { Locale } from "./i18n";

export type Phrase = { ar: string; ja: string };

export const TRANSLATIONS: Record<string, Phrase> = {
  About: { ar: "حول", ja: "概要" },
  "About Us": { ar: "من نحن", ja: "私たちについて" },
  Product: { ar: "المنتج", ja: "製品" },
  "Unik Exo": { ar: "Unik Exo", ja: "Unik Exo" },
  Specs: { ar: "المواصفات", ja: "仕様" },
  Mentors: { ar: "المرشدون", ja: "メンター" },
  Team: { ar: "الفريق", ja: "チーム" },
  Partners: { ar: "الشركاء", ja: "パートナー" },
  Testimonials: { ar: "آراء العملاء", ja: "お客様の声" },
  Stories: { ar: "قصص", ja: "ストーリー" },
  Press: { ar: "الإعلام", ja: "メディア" },
  Media: { ar: "الإعلام", ja: "メディア" },
  "Media / Press": { ar: "الإعلام / الصحافة", ja: "メディア / プレス" },
  Journal: { ar: "المدونة", ja: "ジャーナル" },
  Blog: { ar: "المدونة", ja: "ブログ" },
  "Blog / Insights": { ar: "المدونة / رؤى", ja: "ブログ / インサイト" },
  Contact: { ar: "تواصل معنا", ja: "お問い合わせ" },
  "Contact Us": { ar: "تواصل معنا", ja: "お問い合わせ" },
  Connect: { ar: "تواصل", ja: "つながる" },
  Company: { ar: "الشركة", ja: "会社" },
  Careers: { ar: "الوظائف", ja: "採用" },
  Research: { ar: "البحث", ja: "研究" },
  Technology: { ar: "التقنية", ja: "テクノロジー" },
  Modes: { ar: "الأوضاع", ja: "モード" },
  Products: { ar: "المنتجات", ja: "製品" },
  Insights: { ar: "رؤى", ja: "インサイト" },
  Resources: { ar: "المصادر", ja: "リソース" },
  "What we do": { ar: "ماذا نفعل", ja: "私たちの取り組み" },
  "Get in touch": { ar: "تواصل معنا", ja: "お問い合わせ" },
  Subscribe: { ar: "اشترك", ja: "購読する" },
  LinkedIn: { ar: "لينكدإن", ja: "LinkedIn" },
  Instagram: { ar: "إنستغرام", ja: "Instagram" },
  Scroll: { ar: "مرّر", ja: "スクロール" },
  SCROLL: { ar: "مرّر", ja: "スクロール" },
  Close: { ar: "إغلاق", ja: "閉じる" },
  "Open menu": { ar: "فتح القائمة", ja: "メニューを開く" },
  "Close menu": { ar: "إغلاق القائمة", ja: "メニューを閉じる" },
  Language: { ar: "اللغة", ja: "言語" },
  Primary: { ar: "رئيسي", ja: "メイン" },

  "Take your": { ar: "اتخذ", ja: "もう一度" },
  "first steps": { ar: "خطواتك الأولى", ja: "最初の一歩を" },
  "again.": { ar: "من جديد.", ja: "踏み出そう。" },
  "Take your first steps again.": { ar: "اتخذ خطواتك الأولى من جديد.", ja: "最初の一歩を、もう一度。" },
  "Take your first steps,": { ar: "خطوتك الأولى،", ja: "最初の一歩を、" },
  "Advanced robotics that restore mobility. Dignity. Independence.": {
    ar: "روبوتات متقدمة تعيد الحركة. والكرامة. والاستقلال.",
    ja: "先進ロボティクスが、移動・尊厳・自立を取り戻します。",
  },
  "A robotic exoskeleton for lower-limb rehabilitation, built to help patients stand, walk, and regain independence.":
    {
      ar: "هيكل خارجي روبوتي لإعادة تأهيل الأطراف السفلية، صُمم لمساعدة المرضى على الوقوف والمشي واستعادة الاستقلال.",
      ja: "下肢リハビリテーションのためのロボット外骨格。立つ・歩く・自立を取り戻すために設計されています。",
    },
  "Robotics → Rehabilitation → Innovation → Impact": {
    ar: "الروبوتات → إعادة التأهيل → الابتكار → الأثر",
    ja: "ロボティクス → リハビリ → イノベーション → インパクト",
  },
  Robotics: { ar: "الروبوتات", ja: "ロボティクス" },
  Rehabilitation: { ar: "إعادة التأهيل", ja: "リハビリテーション" },
  Innovation: { ar: "الابتكار", ja: "イノベーション" },
  "Real-world impact": { ar: "أثر واقعي", ja: "実世界での成果" },
  Impact: { ar: "الأثر", ja: "インパクト" },
  "Astrek Innovations is a robotics company building lower-limb exoskeletons that restore mobility with therapist-controlled, clinic-ready hardware.":
    {
      ar: "أستريك إنوفيشنز شركة روبوتات تبني هياكل خارجية للأطراف السفلية تعيد الحركة بأجهزة جاهزة للعيادات وتحت تحكم المعالج.",
      ja: "Astrek Innovationsは、セラピスト制御の臨床向け下肢外骨格で移動を取り戻すロボティクス企業です。",
    },
  "Unik Exo supports Sit, Stand and Walk for PMR, neuro-rehab and gait labs — structured training under clinical supervision.":
    {
      ar: "يدعم Unik Exo الجلوس والوقوف والمشي في إعادة التأهيل العصبي ومختبرات المشي — تدريب منظم تحت إشراف سريري.",
      ja: "Unik ExoはPMR・神経リハビリ・歩行ラボで座位・立位・歩行を支援し、臨床監督下の構造化訓練を行います。",
    },
  "Pilot-tested and ISO 13485 compliant, with award-winning work that expands from rehabilitation into broader robotics.":
    {
      ar: "مُختبر تجريبيًا ومتوافق مع ISO 13485، بعمل حائز على جوائز يمتد من إعادة التأهيل إلى روبوتات أوسع.",
      ja: "パイロット検証済みでISO 13485準拠。リハビリからより広いロボティクスへ広がる受賞実績があります。",
    },
  "Used with 120+ patients across 15+ rehabilitation centres — validated in real clinics, not only in the lab.":
    {
      ar: "استُخدم مع أكثر من 120 مريضًا في أكثر من 15 مركز إعادة تأهيل — موثّق في عيادات حقيقية لا في المختبر فقط.",
      ja: "15以上のリハビリセンターで120人以上の患者に使用。ラボだけでなく実臨床で検証されています。",
    },
  "Discover Unik Exo": { ar: "اكتشف Unik Exo", ja: "Unik Exoを見る" },
  "Watch film": { ar: "شاهد الفيلم", ja: "映像を見る" },
  "Scroll to explore": { ar: "مرر للاستكشاف", ja: "スクロールして見る" },
  "Technology designed around human movement.": {
    ar: "تقنية مصممة حول حركة الإنسان.",
    ja: "人の動きに寄り添うテクノロジー。",
  },
  "designed around": { ar: "مصمّمة حول", ja: "寄り添う" },
  "human movement.": { ar: "حركة الإنسان.", ja: "人の動き。" },
  "Explore Unik Exo": { ar: "استكشف Unik Exo", ja: "Unik Exoを見る" },
  "Watch film": { ar: "شاهد الفيلم", ja: "映像を見る" },
  "Hip Assist": { ar: "دعم الورك", ja: "股関節アシスト" },
  "Adaptive support for natural motion.": { ar: "دعم تكيّفي لحركة طبيعية.", ja: "自然な動きのための適応支援。" },
  "Knee Actuation": { ar: "تشغيل الركبة", ja: "膝駆動" },
  "Precision control for stability and safety.": {
    ar: "تحكم دقيق للاستقرار والسلامة.",
    ja: "安定と安全のための精密制御。",
  },
  "Ankle Support": { ar: "دعم الكاحل", ja: "足関節サポート" },
  "Balanced assistance for confident steps.": {
    ar: "مساعدة متوازنة لخطوات واثقة.",
    ja: "自信ある一歩のためのバランス支援。",
  },
  "Smart Control": { ar: "تحكم ذكي", ja: "スマート制御" },
  "Real-time intelligence that adapts to the user.": {
    ar: "ذكاء فوري يتكيّف مع المستخدم.",
    ja: "使用者に合わせて適応するリアルタイム知能。",
  },

  "We combine advanced robotics, intelligent software and human insight to create adaptive solutions that restore mobility and independence.":
    {
      ar: "نجمع بين الروبوتات المتقدمة والبرمجيات الذكية والفهم الإنساني لابتكار حلول تكيّفية تعيد الحركة والاستقلال.",
      ja: "先進ロボティクス、知能ソフトウェア、人への洞察を組み合わせ、移動と自立を取り戻す適応型ソリューションをつくります。",
    },
  "UNIK EXO: a lower-limb exoskeleton that adapts to you, so you can move forward.": {
    ar: "UNIK EXO: هيكل خارجي للأطراف السفلية يتكيّف معك: لتمضي إلى الأمام.",
    ja: "UNIK EXO: あなたに合わせて適応する下肢外骨格。前へ進むために。",
  },
  "Advanced robotics": { ar: "الروبوتات المتقدمة", ja: "先進ロボティクス" },
  "Advanced Robotics": { ar: "الروبوتات المتقدمة", ja: "先進ロボティクス" },
  "Precision hardware for natural motion.": { ar: "عتاد دقيق لحركة طبيعية.", ja: "自然な動きのための精密ハードウェア。" },
  "Artificial intelligence": { ar: "الذكاء الاصطناعي", ja: "人工知能" },
  "Artificial Intelligence": { ar: "الذكاء الاصطناعي", ja: "人工知能" },
  "Adaptive algorithms that understand you.": {
    ar: "خوارزميات تكيّفية تفهمك.",
    ja: "あなたを理解する適応アルゴリズム。",
  },
  "Wearable technology": { ar: "التقنيات القابلة للارتداء", ja: "ウェアラブル技術" },
  "Wearable Technology": { ar: "التقنيات القابلة للارتداء", ja: "ウェアラブル技術" },
  "Ergonomic design for everyday use.": { ar: "تصميم مريح للاستخدام اليومي.", ja: "日常使いの人間工学デザイン。" },
  "Data driven": { ar: "مدفوع بالبيانات", ja: "データ駆動" },
  "Data Driven": { ar: "مدفوع بالبيانات", ja: "データ駆動" },
  "Insights that guide better outcomes.": { ar: "رؤى تقود إلى نتائج أفضل.", ja: "より良い成果を導くインサイト。" },

  "Engineered to move": { ar: "صُمّم ليتحرك", ja: "ともに動くために" },
  "with you.": { ar: "معك.", ja: "設計されています。" },
  "Engineered to move with you.": { ar: "صُمّم ليتحرك معك.", ja: "ともに動くために設計。" },
  "Unik Exo is a lower-limb exoskeleton that combines advanced robotics, intelligent software and human insight to restore mobility and independence.":
    {
      ar: "Unik Exo هيكل خارجي للأطراف السفلية يجمع بين الروبوتات المتقدمة والبرمجيات الذكية والفهم الإنساني لاستعادة الحركة والاستقلال.",
      ja: "Unik Exoは先進ロボティクス、知能ソフトウェア、人への洞察を組み合わせ、移動と自立を取り戻す下肢外骨格です。",
    },
  "Explore features": { ar: "استكشف الميزات", ja: "機能を見る" },
  "Watch overview": { ar: "شاهد النظرة العامة", ja: "概要を見る" },
  "Patients trained with Unik Exo": { ar: "مريضًا تدربوا على Unik Exo", ja: "Unik Exoで訓練した患者" },
  "Rehabilitation centers working with us": { ar: "مركز إعادة تأهيل يعمل معنا", ja: "連携するリハビリテーション施設" },
  "Therapy sessions completed": { ar: "جلسة علاجية مكتملة", ja: "実施したセラピセッション" },
  "Therapist feedback would recommend Unik Exo": {
    ar: "من تقييمات المعالجين يوصون بـ Unik Exo",
    ja: "セラピストがUnik Exoを推奨",
  },

  Experience: { ar: "التجربة", ja: "体験" },
  "Support through every stage of": { ar: "دعم في كل مرحلة من", ja: "すべての段階を支える" },
  "movement.": { ar: "الحركة.", ja: "動き。" },
  "Unik Exo adapts to each phase of your rehabilitation journey with intelligent assistance and clinician control.":
    {
      ar: "يتكيّف Unik Exo مع كل مرحلة من رحلة إعادة التأهيل بمساعدة ذكية وتحكم من المختص السريري.",
      ja: "Unik Exoは知的アシストと臨床家の制御により、リハビリの各段階に適応します。",
    },
  "Sit mode": { ar: "وضع الجلوس", ja: "座位モード" },
  "Safe and supported sitting with posture assistance.": {
    ar: "جلوس آمن ومدعوم مع مساعدة على الوضعية.",
    ja: "姿勢支援付きの安全で支えられた座位。",
  },
  "Stand mode": { ar: "وضع الوقوف", ja: "立位モード" },
  "Assisted transition from sitting to standing.": {
    ar: "انتقال مدعوم من الجلوس إلى الوقوف.",
    ja: "座位から立位への立ち上がり支援。",
  },
  "Walk mode": { ar: "وضع المشي", ja: "歩行モード" },
  "Natural gait assistance for confident movement.": {
    ar: "مساعدة مشي طبيعية لحركة واثقة.",
    ja: "自信ある動きのための自然な歩行支援。",
  },
  "Exercise mode": { ar: "وضع التمرين", ja: "運動モード" },
  "Guided training to build strength, endurance and balance.": {
    ar: "تدريب موجّه لبناء القوة والتحمل والتوازن.",
    ja: "筋力・持久力・バランスを高めるガイド付きトレーニング。",
  },
  "One system. Four modes. Continuous support for real progress.": {
    ar: "نظام واحد. أربعة أوضاع. دعم مستمر لتقدم حقيقي.",
    ja: "ひとつのシステム。4つのモード。着実な前進を支える継続支援。",
  },
  "Continuous support for": { ar: "دعم مستمر لـ", ja: "継続的に支える" },
  "real progress.": { ar: "تقدم حقيقي.", ja: "着実な前進。" },
  "Learn more about Unik Exo": { ar: "اعرف المزيد عن Unik Exo", ja: "Unik Exoについてもっと知る" },

  "Built for rehabilitation": { ar: "مصمم لإعادة التأهيل", ja: "リハビリテーションのために" },
  "Every detail serves": { ar: "كل تفصيل يخدم", ja: "すべての細部が" },
  "a purpose.": { ar: "غاية.", ja: "目的を持つ。" },
  "Every design decision on Unik Exo traces back to one goal: safe, repeatable gait training a therapist can trust.":
    {
      ar: "كل قرار تصميم في Unik Exo يعود إلى هدف واحد: تدريب مشي آمن وقابل للتكرار يمكن للمعالج الوثوق به.",
      ja: "Unik Exoの設計はすべて、セラピストが信頼できる安全で再現可能な歩行訓練を目指しています。",
    },
  "View technical specifications →": { ar: "عرض المواصفات التقنية ←", ja: "技術仕様を見る →" },
  "View technical specifications": { ar: "عرض المواصفات التقنية", ja: "技術仕様を見る" },
  "Hip module": { ar: "وحدة الورك", ja: "股関節モジュール" },
  "Adaptive support through the gait cycle.": {
    ar: "دعم تكيّفي عبر دورة المشي.",
    ja: "歩行周期を通じた適応支援。",
  },
  "Knee actuator": { ar: "مشغّل الركبة", ja: "膝アクチュエータ" },
  "Precision torque for stability and lift.": {
    ar: "عزم دقيق للاستقرار والرفع.",
    ja: "安定と持ち上げのための精密トルク。",
  },
  "Ankle support": { ar: "دعم الكاحل", ja: "足関節サポート" },
  "Comfortable fit": { ar: "ملاءمة مريحة", ja: "快適なフィット" },
  "Clinic-grade padding for long sessions.": {
    ar: "حشوة بمستوى عيادي للجلسات الطويلة.",
    ja: "長いセッション向けの臨床グレードパディング。",
  },
  "Smart control unit": { ar: "وحدة التحكم الذكية", ja: "スマート制御ユニット" },
  "On-device intelligence, stride by stride.": {
    ar: "ذكاء على الجهاز، خطوة بخطوة.",
    ja: "一歩ごとに働くオンデバイス知能。",
  },
  "Clinician interface": { ar: "واجهة المختص السريري", ja: "臨床インターフェース" },
  "Step-wise control under supervision.": {
    ar: "تحكم تدريجي تحت الإشراف.",
    ja: "監督下での段階的制御。",
  },

  "Every step tells a story.": { ar: "كل خطوة تحكي قصة.", ja: "一歩一歩が物語になる。" },
  "I thought I may never walk again. With Unik Exo, I took my first steps, and it changed everything.": {
    ar: "ظننت أنني قد لا أمشي مجددًا. مع Unik Exo اتخذت خطواتي الأولى: وتغيّر كل شيء.",
    ja: "もう歩けないかもしれないと思っていました。Unik Exoで最初の一歩を踏み出し、すべてが変わりました。",
  },
  "Stroke Survivor · Kochi, India": { ar: "ناجي من سكتة دماغية · كوتشي، الهند", ja: "脳卒中サバイバー · コーチ、インド" },
  "Stroke Survivor": { ar: "ناجي من سكتة دماغية", ja: "脳卒中サバイバー" },
  "Rehabilitation Specialist": { ar: "أخصائي إعادة تأهيل", ja: "リハビリテーション専門医" },
  "Clinical Partner": { ar: "شريك سريري", ja: "臨床パートナー" },
  "Rehabilitation & Mobility": { ar: "إعادة التأهيل والحركة", ja: "リハビリテーションと移動" },
  "Therapy Lead": { ar: "مسؤول العلاج", ja: "療法リーダー" },
  "Gait Rehabilitation": { ar: "إعادة تأهيل المشي", ja: "歩行リハビリテーション" },
  "Kochi, India": { ar: "كوتشي، الهند", ja: "コーチ、インド" },
  "Bengaluru, India": { ar: "بنغالور، الهند", ja: "ベンガルール、インド" },
  "Kerala, India": { ar: "كيرالا، الهند", ja: "ケララ、インド" },
  "Kannur, India": { ar: "كانور، الهند", ja: "カンヌール、インド" },
  "Unik Exo brings together thoughtful engineering and a clear understanding of what gait rehabilitation actually needs on the clinic floor.":
    {
      ar: "يجمع Unik Exo بين هندسة متأنية وفهم واضح لما تحتاجه إعادة تأهيل المشي فعليًا في العيادة.",
      ja: "Unik Exoは、臨床現場で歩行リハビリに本当に必要なことを踏まえた、丁寧なエンジニアリングです。",
    },
  "What stood out to us was the team's willingness to listen, test, and improve. The product feels built around the person using it.":
    {
      ar: "ما لفتنا هو استعداد الفريق للاستماع والاختبار والتحسين. المنتج يبدو مبنيًا حول الشخص الذي يستخدمه.",
      ja: "耳を傾け、試し、改善しようとする姿勢が印象的でした。使う人のために作られた製品だと感じます。",
    },
  "The first time a patient stood without our hands under their arms, the room went quiet. That is the moment this work is for.":
    {
      ar: "في أول مرة وقف فيها مريض دون أن تكون أيدينا تحت ذراعيه، ساد الصمت الغرفة. هذه هي اللحظة التي نعمل من أجلها.",
      ja: "患者が私たちの手に頼らず立った瞬間、部屋が静まりました。この仕事はその瞬間のためです。",
    },
  "Every recovery has a first step. These are the people who took it.": {
    ar: "لكل تعافٍ خطوة أولى. هؤلاء من اتخذوها.",
    ja: "回復には必ず最初の一歩がある。それを踏み出した人たちです。",
  },
  "Every recovery has a first step.": { ar: "لكل تعافٍ خطوة أولى.", ja: "回復には必ず最初の一歩がある。" },
  "These are the people who took it.": { ar: "هؤلاء من اتخذوها.", ja: "それを踏み出した人たちです。" },
  "View all stories →": { ar: "عرض كل القصص ←", ja: "すべてのストーリーを見る →" },
  "Share your story →": { ar: "شارك قصتك ←", ja: "あなたの物語を共有 →" },
  "Previous story": { ar: "القصة السابقة", ja: "前のストーリー" },
  "Next story": { ar: "القصة التالية", ja: "次のストーリー" },

  "Guided by": { ar: "بإرشاد", ja: "経験に" },
  "experience.": { ar: "الخبرة.", ja: "導かれて。" },
  "Our mentors bring decades of expertise across robotics, healthcare, technology and innovation, guiding us as we build solutions that change lives.":
    {
      ar: "يقدم مرشدونا عقودًا من الخبرة في الروبوتات والرعاية الصحية والتقنية والابتكار: ويرشدوننا ونحن نبني حلولًا تغيّر الحياة.",
      ja: "メンターはロボティクス、ヘルスケア、技術、イノベーションで数十年の経験を持ち、人生を変えるソリューションづくりを導きます。",
    },
  "Founding Partner, Huddle.": { ar: "شريك مؤسس، Huddle.", ja: "Huddle 創業パートナー。" },
  "Founder / Chairman, Healthstart · Fellow, DCI Stanford.": {
    ar: "مؤسس / رئيس، Healthstart · زميل، DCI Stanford.",
    ja: "Healthstart 創業者 / 会長 · DCI Stanford フェロー。",
  },
  "Diverse perspectives. Shared vision.": { ar: "وجهات نظر متنوعة. رؤية مشتركة.", ja: "多様な視点。共有するビジョン。" },
  "Mentors who challenge us to think further.": {
    ar: "مرشدون يدفعوننا للتفكير أبعد.",
    ja: "さらに深く考えるよう促すメンター。",
  },
  "Together, we move": { ar: "معًا نحوّل", ja: "ともに" },
  ideas: { ar: "الأفكار", ja: "アイデアを" },
  "impact.": { ar: "أثر.", ja: "インパクトへ。" },

  "People behind": { ar: "الأشخاص وراء", ja: "成功を支える" },
  "People behind our success.": { ar: "الأشخاص وراء نجاحنا.", ja: "成功を支える人々。" },
  "A small, founder-led team building hardware, software and clinical partnerships together.": {
    ar: "فريق صغير يقوده المؤسسون، يبني الأجهزة والبرمجيات والشراكات السريرية معًا.",
    ja: "創業者主導の小さなチームが、ハードウェア、ソフトウェア、臨床パートナーシップを一体で築いています。",
  },
  "Chief Executive Officer.": { ar: "الرئيس التنفيذي.", ja: "最高経営責任者。" },
  "Chief Operating Officer.": { ar: "الرئيس التنفيذي للعمليات.", ja: "最高執行責任者。" },
  "Chief Technology Officer.": { ar: "الرئيس التنفيذي للتقنية.", ja: "最高技術責任者。" },
  "Chief Marketing Officer.": { ar: "الرئيس التنفيذي للتسويق.", ja: "最高マーケティング責任者。" },
  "We're hiring.": { ar: "نحن نوظّف.", ja: "採用しています。" },
  "Check our current openings and submit your application.": {
    ar: "اطّلع على الوظائف المتاحة وقدّم طلبك.",
    ja: "現在の募集を確認して応募してください。",
  },
  "View openings": { ar: "عرض الوظائف", ja: "募集を見る" },

  "Built with the right": { ar: "نُبنى مع", ja: "ふさわしい" },
  "partners.": { ar: "الشركاء المناسبين.", ja: "パートナーとともに。" },
  "Incubated at Maker Village and CIE IIIT Hyderabad, supported by Kerala Startup Mission, with acceleration from HealthStart, Huddle, Startup Chile, and the OIST Innovation Accelerator.":
    {
      ar: "حاضنة في Maker Village وCIE IIIT Hyderabad، بدعم من Kerala Startup Mission، وتسريع من HealthStart وHuddle وStartup Chile ومسرّع الابتكار في OIST.",
      ja: "Maker VillageとCIE IIIT Hyderabadでインキュベートされ、Kerala Startup Missionの支援、HealthStart、Huddle、Startup Chile、OIST Innovation Acceleratorによるアクセラレーションを受けています。",
    },
  "Let's build together →": { ar: "لنبنِ معًا ←", ja: "一緒に築く →" },
  "Let's build together": { ar: "لنبنِ معًا", ja: "一緒に築く" },
  "From Maker Village in Kochi to OIST in Japan, and with backing from IAN Fund and MeitY, our partners help take Unik Exo from the lab into clinics.":
    {
      ar: "من Maker Village في كوتشي إلى OIST في اليابان، وبدعم من IAN Fund وMeitY، يساعد شركاؤنا على نقل Unik Exo من المختبر إلى العيادات.",
      ja: "コーチンのMaker Villageから日本のOISTまで、IAN FundとMeitYの支援とともに、パートナーはUnik Exoをラボからクリニックへ届けます。",
    },
  "Partnerships that inspire innovation.": { ar: "شراكات تلهم الابتكار.", ja: "イノベーションを促すパートナーシップ。" },
  "Together, we create impact that lasts.": { ar: "معًا نصنع أثرًا يدوم.", ja: "ともに、続くインパクトをつくる。" },
  "We are always open to meaningful collaborations that drive technology for good.": {
    ar: "نرحب دائمًا بشراكات هادفة تدفع التقنية نحو الخير.",
    ja: "善きための技術を進める、意味ある協働を常に歓迎します。",
  },
  "Partner with us →": { ar: "كن شريكًا معنا ←", ja: "パートナーになる →" },
  "Partner with us": { ar: "كن شريكًا معنا", ja: "パートナーになる" },
  "Partner With Us": { ar: "كن شريكًا معنا", ja: "パートナーになる" },
  Partnerships: { ar: "الشراكات", ja: "パートナーシップ" },
  UNIKEXO: { ar: "UNIKEXO", ja: "UNIKEXO" },
  "Let’s Build the Future of Rehabilitation": {
    ar: "لنبنِ مستقبل إعادة التأهيل",
    ja: "リハビリテーションの未来をつくろう",
  },
  "Take your first step, again!": {
    ar: "خذ خطوتك الأولى، من جديد!",
    ja: "もう一度、最初の一歩を。",
  },
  "Astrek Innovations is a robotics startup specializing in lower-limb exoskeletons designed to enhance mobility, independence, and assisted movement. Our solutions focus on rehabilitation and mobility support, validated through real-world pilot testing and recognized through multiple innovation awards.":
    {
      ar: "أستريك إنوفيشنز شركة ناشئة في الروبوتات متخصصة في الهياكل الخارجية للأطراف السفلية لتعزيز الحركة والاستقلالية والدعم. تركز حلولنا على إعادة التأهيل ودعم الحركة، وقد ثبتت عبر تجارب ميدانية وحصلت على جوائز ابتكار.",
      ja: "Astrek Innovationsは、移動、自立、補助動作のための下肢外骨格に特化したロボティクススタートアップです。リハビリと移動支援に注力し、実地のパイロット試験と複数のイノベーション賞で認められています。",
    },
  "Scan the QR code to:": { ar: "امسح رمز QR من أجل:", ja: "QRコードで：" },
  "Learn more about UNIKEXO": { ar: "تعرّف أكثر على UNIKEXO", ja: "UNIKEXOについて知る" },
  "Request a demo or collaboration": { ar: "اطلب عرضًا أو تعاونًا", ja: "デモまたは協業を依頼する" },
  "Explore partnership opportunities": { ar: "استكشف فرص الشراكة", ja: "パートナーシップの機会を探る" },
  "106-OD4, Office 2201, Floor 22, Sky Tower, Abu Dhabi, United Arab Emirates": {
    ar: "106-OD4، مكتب 2201، الطابق 22، سكاي تاور، أبوظبي، الإمارات العربية المتحدة",
    ja: "106-OD4, Office 2201, Floor 22, Sky Tower, Abu Dhabi, United Arab Emirates",
  },
  "Rehabilitation and mobility support": { ar: "إعادة التأهيل ودعم الحركة", ja: "リハビリと移動支援" },
  PMR: { ar: "PMR", ja: "PMR" },
  "Neuro-Rehab": { ar: "إعادة التأهيل العصبي", ja: "神経リハビリ" },
  "Gait Labs": { ar: "مختبرات المشي", ja: "歩行ラボ" },
  Name: { ar: "الاسم", ja: "氏名" },
  Email: { ar: "البريد الإلكتروني", ja: "メール" },
  "Company / Organization": { ar: "الشركة / المؤسسة", ja: "会社 / 組織" },
  Designation: { ar: "المسمى الوظيفي", ja: "役職" },
  "Phone Number": { ar: "رقم الهاتف", ja: "電話番号" },
  "Partnership Type": { ar: "نوع الشراكة", ja: "パートナーシップの種類" },
  "Area of Interest": { ar: "مجال الاهتمام", ja: "関心分野" },
  "Message / Requirements": { ar: "الرسالة / المتطلبات", ja: "メッセージ / ご要件" },
  Submit: { ar: "إرسال", ja: "送信" },
  "Submit enquiry": { ar: "إرسال الاستفسار", ja: "お問い合わせを送信" },
  Partnership: { ar: "الشراكة", ja: "パートナーシップ" },
  "Talk to us": { ar: "تواصل معنا", ja: "お問い合わせ" },
  Page: { ar: "الصفحة", ja: "ページ" },
  "Back to home": { ar: "العودة إلى الصفحة الرئيسية", ja: "ホームに戻る" },
  "Back to partners": { ar: "العودة إلى الشركاء", ja: "パートナーに戻る" },
  "Clinical use": { ar: "الاستخدام السريري", ja: "臨床利用" },
  "Clinical pilot with Unik Exo": { ar: "تجربة سريرية مع Unik Exo", ja: "Unik Exoの臨床パイロット" },
  "Wearable robotics for lower-limb rehabilitation": {
    ar: "روبوتات قابلة للارتداء لإعادة تأهيل الأطراف السفلية",
    ja: "下肢リハビリのための装着型ロボティクス",
  },
  "Our solutions focus on rehabilitation and mobility support, validated through real-world pilot testing and recognized through multiple innovation awards.":
    {
      ar: "تركّز حلولنا على إعادة التأهيل ودعم الحركة، ومُثبتة عبر تجارب واقعية ومعترف بها بجوائز ابتكار متعددة.",
      ja: "当社のソリューションはリハビリと移動支援に焦点を当て、実地パイロットで検証され、複数のイノベーション賞を受賞しています。",
    },
  "Work with hospitals, rehabilitation centres, research groups and innovation partners to bring Unik Exo into structured therapy programs.":
    {
      ar: "اعمل مع المستشفيات ومراكز إعادة التأهيل ومجموعات البحث وشركاء الابتكار لإدخال Unik Exo في برامج علاجية منظّمة.",
      ja: "病院、リハビリセンター、研究グループ、イノベーションパートナーと協力し、構造化された療法プログラムにUnik Exoを導入します。",
    },
  "Tell us about your organisation and how you’d like to work together.": {
    ar: "أخبرنا عن مؤسستك وكيف تود العمل معنا.",
    ja: "貴組織とご希望の協業についてお聞かせください。",
  },
  "Astrek Innovations builds lower-limb exoskeletons for rehabilitation and mobility support — validated in real-world pilots and recognized through innovation awards.": {
    ar: "تبني أستريك هياكل خارجية للأطراف السفلية لإعادة التأهيل ودعم الحركة — مُثبتة في تجارب واقعية ومعترف بها بجوائز ابتكار.",
    ja: "Astrekはリハビリと移動支援のための下肢外骨格を開発しています。実地パイロットで検証され、イノベーション賞も受賞しています。",
  },
  "Select an option": { ar: "اختر خيارًا", ja: "選択してください" },
  "Please complete the required fields.": { ar: "يرجى إكمال الحقول المطلوبة.", ja: "必須項目を入力してください。" },
  "Sending…": { ar: "جارٍ الإرسال…", ja: "送信中…" },
  "Thank you. Your partnership enquiry has been sent to the Astrek team.": {
    ar: "شكرًا لك. تم إرسال استفسار الشراكة إلى فريق أستريك.",
    ja: "ありがとうございます。パートナーシップのお問い合わせはAstrekチームに送信されました。",
  },
  "Something went wrong. Please email info@astrekinnovations.com directly.": {
    ar: "حدث خطأ. يرجى مراسلة info@astrekinnovations.com مباشرة.",
    ja: "送信に失敗しました。info@astrekinnovations.com へ直接ご連絡ください。",
  },
  "Clinical / Hospital partnership": { ar: "شراكة سريرية / مستشفى", ja: "臨床 / 病院パートナーシップ" },
  "Rehabilitation center": { ar: "مركز إعادة التأهيل", ja: "リハビリテーションセンター" },
  "Distribution / Channel": { ar: "توزيع / قنوات", ja: "流通 / チャネル" },
  "Investment / Funding": { ar: "استثمار / تمويل", ja: "投資 / 資金調達" },
  "Academic / University": { ar: "أكاديمي / جامعة", ja: "学術 / 大学" },
  "Technology / OEM": { ar: "تقنية / تصنيع أصلي", ja: "技術 / OEM" },
  "Unik Exo deployment": { ar: "نشر Unik Exo", ja: "Unik Exoの導入" },
  "Clinical pilots": { ar: "تجارب سريرية", ja: "臨床パイロット" },
  "Research & development": { ar: "البحث والتطوير", ja: "研究開発" },
  "Manufacturing / supply chain": { ar: "التصنيع / سلسلة التوريد", ja: "製造 / サプライチェーン" },
  "Training & education": { ar: "التدريب والتعليم", ja: "研修 / 教育" },
  "Market expansion": { ar: "التوسع في السوق", ja: "市場拡大" },

  "Company updates": { ar: "تحديثات الشركة", ja: "会社の最新情報" },
  "Product development": { ar: "تطوير المنتج", ja: "製品開発" },
  "Rehabilitation robotics": { ar: "روبوتات إعادة التأهيل", ja: "リハビリテーションロボティクス" },
  "Industry insights": { ar: "رؤى القطاع", ja: "業界インサイト" },
  "View all articles": { ar: "عرض كل المقالات", ja: "すべての記事を見る" },
  "No posts in this category yet.": { ar: "لا توجد مقالات في هذه الفئة بعد.", ja: "このカテゴリの記事はまだありません。" },
  "Article not found": { ar: "المقال غير موجود", ja: "記事が見つかりません" },
  "This post is not available. Return to the blog for the latest articles.": {
    ar: "هذا المقال غير متاح. عد إلى المدونة لأحدث المقالات.",
    ja: "この記事は利用できません。ブログに戻って最新記事をご覧ください。",
  },
  "Company updates, technology articles, product stories, rehabilitation robotics, industry insights, and event announcements from Astrek Innovations.":
    {
      ar: "تحديثات الشركة، ومقالات التقنية، وقصص تطوير المنتج، وروبوتات إعادة التأهيل، ورؤى القطاع، وإعلانات الفعاليات من أستريك إنوفيشنز.",
      ja: "Astrek Innovationsの会社ニュース、技術記事、製品開発、リハビリテーションロボティクス、業界洞察、イベント情報。",
    },
  "Designing Unik Exo for clinic-floor donning": {
    ar: "تصميم Unik Exo لارتداء أسرع في العيادة",
    ja: "クリニックでの装着に向けたUnik Exo設計",
  },
  "How lab timings fell apart in real clinics, and the hardware changes that followed.": {
    ar: "كيف تغيّرت أوقات المختبر في العيادات الحقيقية، والتعديلات التي تبرتب عليها.",
    ja: "ラボの想定時間が現場で崩れたことと、その後のハードウェア変更。",
  },
  "What clinics look for in lower-limb robotics": {
    ar: "ماذا تبحث العيادات عنه في روبوتات الأطراف السفلية",
    ja: "下肢ロボティクスでクリニックが求めるもの",
  },
  "A field note on the questions rehabilitation centres ask before they take a device seriously.": {
    ar: "ملاحظات ميدانية عن الأسئلة التي تطرحها مراكز إعادة التأهيل قبل اعتماد جهاز.",
    ja: "リハビリセンターが機器を真剣に検討する前に聞く問いについての現場メモ。",
  },
  "In the spotlight.": { ar: "في دائرة الضوء.", ja: "スポットライト。" },
  "View latest coverage": { ar: "عرض أحدث التغطية", ja: "最新の報道を見る" },
  "Company updates": { ar: "تحديثات الشركة", ja: "会社の最新情報" },
  "Updated automatically from public news sources.": {
    ar: "يُحدَّث تلقائيًا من مصادر إخبارية عامة.",
    ja: "公開ニュースソースから自動更新されます。",
  },
  "Stories, features and conversations that highlight the work we are building.": {
    ar: "قصص وتقارير وحوارات تبرز العمل الذي نبنيه.",
    ja: "私たちがつくる仕事を伝えるストーリー、特集、対話。",
  },
  "Coverage that follows the science, the clinics, and the people learning to walk again.": {
    ar: "تغطية تتابع العلم والعيادات والأشخاص الذين يتعلمون المشي من جديد.",
    ja: "科学、臨床、そして再び歩けるようになる人々を追う報道。",
  },
  "View all coverage ↗": { ar: "عرض كل التغطية ↗", ja: "すべての報道を見る ↗" },
  "Featured story": { ar: "قصة مميزة", ja: "注目ストーリー" },
  "Read article ↗": { ar: "اقرأ المقال ↗", ja: "記事を読む ↗" },
  "Startups attract ₹80 crore in investments at Seeding Kerala summit": {
    ar: "شركات ناشئة تجذب 80 كرور روبية في قمة Seeding Kerala",
    ja: "Seeding Keralaサミットでスタートアップが80クロールの投資を集める",
  },
  "The Hindu Businessline on Kerala’s seeding summit, and the healthtech teams in the room.": {
    ar: "The Hindu Businessline عن قمة كيرالا، وفرق التقنية الصحية في القاعة.",
    ja: "The Hindu Businesslineが伝えるケララのシーディングサミットと、そこにいたヘルステックチーム。",
  },
  "Why Indian startup founders are flocking to Chile": {
    ar: "لماذا يتجه مؤسسو الشركات الهندية الناشئة إلى تشيلي",
    ja: "インドの創業者がチリへ向かう理由",
  },
  "IAN Fund backs healthcare startup Astrek Innovations": {
    ar: "صندوق IAN يدعم شركة Astrek Innovations الصحية",
    ja: "IAN FundがヘルスケアのAstrek Innovationsを支援",
  },
  "MeitY felicitates winners of the Swadeshi Microprocessor Challenge": {
    ar: "MeitY تكرّم الفائزين في تحدي Swadeshi Microprocessor",
    ja: "MeitYがSwadeshi Microprocessor Challengeの受賞者を表彰",
  },
  "Astrek selected to Startup Chile programme Seed G22": {
    ar: "اختيار Astrek لبرنامج Startup Chile Seed G22",
    ja: "AstrekがStartup Chile Seed G22に選出",
  },
  "Removing 'Dis' from 'DisAbled'": { ar: "إزالة «العجز» من «ذوي الإعاقة»", ja: "「障がい」から「できない」を取り除く" },
  "Rest of World ↗": { ar: "Rest of World ↗", ja: "Rest of World ↗" },
  "VCCircle ↗": { ar: "VCCircle ↗", ja: "VCCircle ↗" },
  "Business Today ↗": { ar: "Business Today ↗", ja: "Business Today ↗" },
  "TechCircle ↗": { ar: "TechCircle ↗", ja: "TechCircle ↗" },
  "Startup Talky ↗": { ar: "Startup Talky ↗", ja: "Startup Talky ↗" },

  "Insights from": { ar: "رؤى من", ja: "Astrekからの" },
  "Astrek.": { ar: "Astrek.", ja: "洞察。" },
  "Thoughts, research and stories from the team building the future of mobility and rehabilitation.": {
    ar: "أفكار وبحوث وقصص من الفريق الذي يبني مستقبل الحركة وإعادة التأهيل.",
    ja: "移動とリハビリテーションの未来をつくるチームからの思考、研究、物語。",
  },
  "We share what we learn from labs, clinics and real-world impact to accelerate innovation that matters.":
    {
      ar: "نشارك ما نتعلمه من المختبرات والعيادات والأثر الواقعي لتسريع الابتكار الذي يهم.",
      ja: "ラボ、臨床、現場の学びを共有し、意味あるイノベーションを加速します。",
    },
  "View all articles ↗": { ar: "عرض كل المقالات ↗", ja: "すべての記事を見る ↗" },
  FEATURED: { ar: "مميز", ja: "注目" },
  RESEARCH: { ar: "بحث", ja: "研究" },
  TECHNOLOGY: { ar: "تقنية", ja: "テクノロジー" },
  COMPANY: { ar: "الشركة", ja: "会社" },
  CLINICAL: { ar: "سريري", ja: "臨床" },
  ENGINEERING: { ar: "هندسة", ja: "エンジニアリング" },
  EVENTS: { ar: "فعاليات", ja: "イベント" },
  All: { ar: "الكل", ja: "すべて" },
  Events: { ar: "فعاليات", ja: "イベント" },
  "7 min read": { ar: "٧ دقائق قراءة", ja: "7分で読める" },
  "6 min read": { ar: "٦ دقائق قراءة", ja: "6分で読める" },
  "5 min read": { ar: "٥ دقائق قراءة", ja: "5分で読める" },
  "4 min read": { ar: "٤ دقائق قراءة", ja: "4分で読める" },
  "3 min read": { ar: "٣ دقائق قراءة", ja: "3分で読める" },
  "Inside Our First Clinical Pilot": { ar: "من داخل أول تجربة سريرية لنا", ja: "初めての臨床パイロットの舞台裏" },
  "What we learned fitting Unik Exo on real patients for the first time, and what we changed as a result.": {
    ar: "ما تعلمناه عند تركيب Unik Exo على مرضى حقيقيين لأول مرة، وما غيّرناه نتيجة لذلك.",
    ja: "初めて実際の患者にUnik Exoを装着して得た学びと、その結果として変えたこと。",
  },
  "What Motion Capture Teaches Us About Gait": {
    ar: "ماذا يعلّمنا التقاط الحركة عن المشي",
    ja: "モーションキャプチャが教える歩行のこと",
  },
  "Building Astrek: From Startup Chile to Kannur": {
    ar: "بناء Astrek: من Startup Chile إلى كانور",
    ja: "Astrekの歩み：Startup Chileからカンヌールへ",
  },
  "Astrek at Huddle 2025: Building Connections, Driving Impact": {
    ar: "Astrek في Huddle 2025: بناء علاقات وصناعة أثر",
    ja: "Huddle 2025のAstrek：つながりを築き、インパクトを生む",
  },
  "Showcasing Unik Exo at Amala MedEx Expo 2024": {
    ar: "عرض Unik Exo في معرض Amala MedEx 2024",
    ja: "Amala MedEx Expo 2024でUnik Exoを展示",
  },
  "A short primer on how we use motion capture data to model human gait, and why average gait is a myth.": {
    ar: "مقدمة مختصرة حول استخدام بيانات التقاط الحركة لنمذجة مشي الإنسان، ولماذا لا توجد مشية متوسطة واحدة.",
    ja: "モーションキャプチャで人の歩行をモデル化する方法と、「平均的な歩行」が神話である理由。",
  },
  "A short history of how a college robotics project became a rehabilitation hardware company.": {
    ar: "قصة مختصرة عن تحوّل مشروع روبوتات جامعي إلى شركة متخصصة في أجهزة إعادة التأهيل.",
    ja: "大学のロボティクスプロジェクトがリハビリ機器企業へ成長した軌跡。",
  },
  "A week with founders, clinicians and investors, and what we brought back to the lab.": {
    ar: "أسبوع مع مؤسسين وأطباء ومستثمرين، وما عدنا به إلى المختبر.",
    ja: "創業者、臨床家、投資家と過ごした一週間と、ラボへ持ち帰ったもの。",
  },
  "What happens when you put a lower-limb exoskeleton in front of practising clinicians for two days.": {
    ar: "ماذا يحدث عندما تضع هيكلًا خارجيًا للأطراف السفلية أمام أطباء ممارسين ليومين.",
    ja: "下肢外骨格を現役の臨床家の前に2日間置いたときに起きること。",
  },
  "We believe in sharing knowledge": { ar: "نؤمن بمشاركة المعرفة", ja: "知識を分かち合い" },
  "that creates meaningful progress.": { ar: "التي تصنع تقدمًا ذا معنى.", ja: "意味ある前進をつくる。" },
  "Stay updated with our latest insights on robotics, research and impact.": {
    ar: "تابع أحدث رؤانا في الروبوتات والبحث والأثر.",
    ja: "ロボティクス、研究、インパクトに関する最新の洞察をお届けします。",
  },
  "Use the form in the footer. No spam. Unsubscribe anytime.": {
    ar: "استخدم النموذج في التذييل. بدون رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.",
    ja: "フッターのフォームから。迷惑メールはありません。いつでも解除できます。",
  },
  "← Back to journal": { ar: "→ العودة إلى المدونة", ja: "← ジャーナルへ戻る" },
  "Back to journal": { ar: "العودة إلى المدونة", ja: "ジャーナルへ戻る" },

  "Let’s connect. Let’s build": { ar: "لنتواصل. لنبنِ", ja: "つながろう。次を" },
  "what's next.": { ar: "ما التالي.", ja: "一緒につくろう。" },
  "Whether you're a healthcare provider, researcher, investor or innovator, let's create meaningful impact together.":
    {
      ar: "سواء كنت مقدم رعاية صحية أو باحثًا أو مستثمرًا أو مبتكرًا، لنصنع أثرًا ذا معنى معًا.",
      ja: "医療提供者、研究者、投資家、イノベーターの方も。意味あるインパクトを一緒につくりましょう。",
    },
  "What can we build together?": { ar: "ماذا يمكننا أن نبني معًا؟", ja: "一緒に何を築けますか？" },
  "Your name": { ar: "اسمك", ja: "お名前" },
  "Full name": { ar: "الاسم الكامل", ja: "氏名" },
  "Email address": { ar: "البريد الإلكتروني", ja: "メールアドレス" },
  Organisation: { ar: "المؤسسة", ja: "所属" },
  "Your organisation": { ar: "مؤسستك", ja: "ご所属" },
  "Phone number": { ar: "رقم الهاتف", ja: "電話番号" },
  "I'm interested in": { ar: "أنا مهتم بـ", ja: "ご関心のある内容" },
  "Clinical partnership": { ar: "شراكة سريرية", ja: "臨床パートナーシップ" },
  "Pilot program": { ar: "برنامج تجريبي", ja: "パイロットプログラム" },
  Investment: { ar: "استثمار", ja: "投資" },
  "Research collaboration": { ar: "تعاون بحثي", ja: "研究協力" },
  "Media / press": { ar: "إعلام / صحافة", ja: "メディア / プレス" },
  Other: { ar: "أخرى", ja: "その他" },
  Message: { ar: "الرسالة", ja: "メッセージ" },
  "Tell us about your idea, partnership or enquiry...": {
    ar: "أخبرنا عن فكرتك أو شراكتك أو استفسارك...",
    ja: "アイデア、パートナーシップ、お問い合わせをご記入ください...",
  },
  "Let's build together ↗": { ar: "لنبنِ معًا ↗", ja: "一緒に築く ↗" },
  "We respect your privacy. Your information is safe with us.": {
    ar: "نحترم خصوصيتك. معلوماتك في أمان معنا.",
    ja: "プライバシーを尊重します。情報は大切に扱います。",
  },
  "Let's talk": { ar: "لنتحدث", ja: "お話しましょう" },
  "Our locations": { ar: "مواقعنا", ja: "所在地" },
  "Head office": { ar: "المكتب الرئيسي", ja: "本社" },
  "Innovation hub": { ar: "مركز الابتكار", ja: "イノベーションハブ" },
  "Astrek Innovations, Kinfra Techno Industrial Park, Kannur, Kerala 670611, India.": {
    ar: "أستريك إنوفيشنز، مجمع كينفرا الصناعي التقني، كانور، كيرالا 670611، الهند.",
    ja: "Astrek Innovations, Kinfra Techno Industrial Park, Kannur, Kerala 670611, India.",
  },
  "Maker Village, Kalamassery, Kochi, Kerala 683503, India.": {
    ar: "ميكر فيلدج، كالاماسيري، كوتشي، كيرالا 683503، الهند.",
    ja: "Maker Village, Kalamassery, Kochi, Kerala 683503, India.",
  },
  "THE NEXT STEP STARTS HERE. Together, we can build a future where everyone can": {
    ar: "الخطوة التالية تبدأ من هنا. معًا يمكننا بناء مستقبل يستطيع فيه الجميع",
    ja: "次の一歩はここから。誰もが前へ進める未来を、ともに。",
  },
  "move forward.": { ar: "المضي قدمًا.", ja: "進めるように。" },
  "We develop intelligent exoskeleton systems and data-driven solutions that restore mobility and dignity.": {
    ar: "نطوّر أنظمة هياكل خارجية ذكية وحلولًا قائمة على البيانات تعيد الحركة والكرامة.",
    ja: "移動と尊厳を取り戻す、知能外骨格とデータ駆動のソリューションを開発しています。",
  },
  "Enter your email": { ar: "أدخل بريدك الإلكتروني", ja: "メールアドレスを入力" },
  "© 2026 Astrek Innovations Pvt. Ltd. All rights reserved.": {
    ar: "© 2026 Astrek Innovations Pvt. Ltd. جميع الحقوق محفوظة.",
    ja: "© 2026 Astrek Innovations Pvt. Ltd. All rights reserved.",
  },
  "© 2026 Astrek Innovations. All rights reserved.": {
    ar: "© 2026 Astrek Innovations. جميع الحقوق محفوظة.",
    ja: "© 2026 Astrek Innovations. All rights reserved.",
  },
  "We use cookies to remember your language and keep the site fast.": {
    ar: "نستخدم ملفات تعريف الارتباط لتذكر لغتك وجعل الموقع أسرع.",
    ja: "言語設定の保存とサイトの快適な表示のためにCookieを使用します。",
  },
  "We use essential cookies to remember your language. With your permission we also use Microsoft Clarity to understand page visits, sessions, scrolling, clicks, and mobile usability issues. You can decline analytics cookies.":
    {
      ar: "نستخدم ملفات تعريف ارتباط أساسية لتذكر لغتك. وبإذنك نستخدم أيضًا Microsoft Clarity لفهم زيارات الصفحات والجلسات والتمرير والنقرات ومشكلات الاستخدام على الجوال. يمكنك رفض ملفات التحليلات.",
      ja: "言語設定の保存に必須Cookieを使用します。許可をいただいた場合のみ、Microsoft Clarityでページ閲覧、セッション、スクロール、クリック、モバイルでの使いやすさを把握します。分析Cookieは拒否できます。",
    },
  "Accept analytics": { ar: "قبول التحليلات", ja: "分析を許可" },
  "Essential only": { ar: "الأساسية فقط", ja: "必須のみ" },
  "Cookie settings": { ar: "إعدادات ملفات الارتباط", ja: "Cookie設定" },
  Solutions: { ar: "الحلول", ja: "ソリューション" },
  "Research / Technology": { ar: "البحث / التقنية", ja: "研究 / テクノロジー" },
  OK: { ar: "حسنًا", ja: "OK" },
  "Cookie notice": { ar: "إشعار ملفات الارتباط", ja: "Cookieに関するお知らせ" },

  "Unik Exo capabilities": { ar: "قدرات Unik Exo", ja: "Unik Exoの機能" },
  "Technology that moves": { ar: "تقنية تحرّك", ja: "人生を前へ進める" },
  "lives forward.": { ar: "الحياة إلى الأمام.", ja: "テクノロジー。" },
  "Unik Exo is designed to help individuals stand, walk and regain independence through intelligent assistance and clinical precision.":
    {
      ar: "صُمم Unik Exo لمساعدة الأفراد على الوقوف والمشي واستعادة الاستقلال عبر مساعدة ذكية ودقة سريرية.",
      ja: "Unik Exoは知的アシストと臨床精度により、立つ・歩く・自立を取り戻すために設計されています。",
    },
  "Sit to stand": { ar: "من الجلوس إلى الوقوف", ja: "座位から立位へ" },
  "Powered transfer with posture support.": { ar: "انتقال مدعوم مع سند للوضعية.", ja: "姿勢支援付きの動力移乗。" },
  Sit: { ar: "جلوس", ja: "座る" },
  Stand: { ar: "وقوف", ja: "立つ" },
  Walk: { ar: "مشي", ja: "歩く" },
  Exercise: { ar: "تمرين", ja: "運動" },
  "Stable upright support in the clinic.": { ar: "دعم عمودي ثابت في العيادة.", ja: "クリニックでの安定した立位支援。" },
  "Gait assistance that follows the wearer.": {
    ar: "مساعدة مشي تتبع المستخدم.",
    ja: "装着者に沿う歩行支援。",
  },
  "Guided strength, endurance and balance.": {
    ar: "قوة وتحمل وتوازن موجّهة.",
    ja: "ガイド付きの筋力・持久力・バランス。",
  },
  "Talk to our team": { ar: "تحدث إلى فريقنا", ja: "チームに相談" },
  "Talk to the clinical team →": { ar: "تحدث إلى الفريق السريري ←", ja: "臨床チームに相談 →" },
  "Talk to the team →": { ar: "تحدث إلى الفريق ←", ja: "チームに相談 →" },
  "Engineered for the clinic floor.": { ar: "مصمم لبيئة العيادة.", ja: "クリニックの現場のために設計。" },
  "Safety engineered system, clinically structured gait training, clinic-ready portability, and therapist-controlled operation.":
    {
      ar: "نظام هندسي للسلامة، وتدريب مشي سريري منظم، وقابلية نقل جاهزة للعيادة، وتشغيل تحت تحكم المعالج.",
      ja: "安全設計、臨床向け歩行訓練、クリニック対応の可搬性、セラピスト管理の操作。",
    },
  "Safety engineered": { ar: "هندسة للسلامة", ja: "安全設計" },
  "Emergency stop, motor-locked safety modes, mechanical hard limits.": {
    ar: "إيقاف طارئ، أوضاع أمان بقفل المحرك، وحدود ميكانيكية صارمة.",
    ja: "非常停止、モーターロック安全モード、機械的ハードリミット。",
  },
  "Structured gait training": { ar: "تدريب مشي منظم", ja: "構造化された歩行訓練" },
  "Programmable, repeatable gait cycles for protocol-based rehabilitation.": {
    ar: "دورات مشي قابلة للبرمجة والتكرار لإعادة تأهيل وفق بروتوكول.",
    ja: "プロトコルに基づく、プログラム可能で再現性のある歩行周期。",
  },
  "Clinic ready": { ar: "جاهز للعيادة", ja: "クリニック対応" },
  "Battery powered, easy donning and doffing, no infrastructure changes.": {
    ar: "يعمل بالبطارية، سهل الارتداء والخلع، دون تغيير في البنية التحتية.",
    ja: "バッテリー駆動、着脱が容易、インフラ変更は不要。",
  },
  "Therapist controlled": { ar: "تحت تحكم المعالج", ja: "セラピスト管理" },
  "Step-wise control, operated entirely under clinical supervision.": {
    ar: "تحكم تدريجي، يُشغَّل بالكامل تحت إشراف سريري.",
    ja: "段階的制御。すべて臨床監督下で操作。",
  },

  "Thank you. You're on the list.": { ar: "شكرًا. تم تسجيلك.", ja: "登録しました。ありがとうございます。" },
  "Thank you. Your message has been received. We'll be in touch shortly.": {
    ar: "شكرًا. تم استلام رسالتك. سنتواصل معك قريبًا.",
    ja: "ありがとうございます。メッセージを受け取りました。近日中にご連絡します。",
  },
  "March 2026": { ar: "مارس 2026", ja: "2026年3月" },
  "January 2026": { ar: "يناير 2026", ja: "2026年1月" },
  "November 2025": { ar: "نوفمبر 2025", ja: "2025年11月" },
  "February 2025": { ar: "فبراير 2025", ja: "2025年2月" },
  "January 2024": { ar: "يناير 2024", ja: "2024年1月" },

  /* ── Remaining homepage strings (exact HTML matches) ── */
  again: { ar: "من جديد", ja: "もう一度" },
  Chapter: { ar: "الفصل", ja: "章" },
  "Chapter 01": { ar: "الفصل 01", ja: "第01章" },
  "Chapter 02": { ar: "الفصل 02", ja: "第02章" },
  "Chapter 03": { ar: "الفصل 03", ja: "第03章" },
  "Advanced AI": { ar: "ذكاء اصطناعي متقدم", ja: "先進AI" },
  "Adaptive algorithms that understand the wearer, stride by stride, so assistance feels personal, not generic.": {
    ar: "خوارزميات تكيّفية تفهم مرتدي الجهاز خطوة بخطوة، فتصبح المساعدة شخصية وليست عامة.",
    ja: "着用者を一歩ごとに理解する適応アルゴリズム。支援は一律ではなく、一人ひとりに合わせます。",
  },
  "Human-centered fit": { ar: "ملاءمة محورها الإنسان", ja: "人中心のフィット" },
  "Ergonomic design built for real clinics, real people, and the long sessions that make rehabilitation work.": {
    ar: "تصميم مريح مبني للعيادات الحقيقية والأشخاص الحقيقيين والجلسات الطويلة التي تصنع نجاح إعادة التأهيل.",
    ja: "本物のクリニック、本物の人、リハビリを成立させる長いセッションのための人間工学デザイン。",
  },
  Explore: { ar: "استكشف", ja: "見る" },
  Lightweight: { ar: "خفيف الوزن", ja: "軽量" },
  Adaptive: { ar: "تكيّفي", ja: "適応型" },
  Intelligent: { ar: "ذكي", ja: "インテリジェント" },
  "Robotic assistance": { ar: "مساعدة روبوتية", ja: "ロボティックアシスト" },
  "Human-centered": { ar: "محوره الإنسان", ja: "人中心" },
  "Introducing Unik Exo": { ar: "نقدّم Unik Exo", ja: "Unik Exoのご紹介" },
  "INTRODUCING UNIK EXO": { ar: "نقدّم Unik Exo", ja: "Unik Exoのご紹介" },
  "A lower-limb exoskeleton that combines advanced robotics, intelligent software and human insight to restore mobility and independence.":
    {
      ar: "هيكل خارجي للأطراف السفلية يجمع بين الروبوتات المتقدمة والبرمجيات الذكية والفهم الإنساني لاستعادة الحركة والاستقلال.",
      ja: "先進ロボティクス、知能ソフトウェア、人への洞察を組み合わせ、移動と自立を取り戻す下肢外骨格。",
    },
  "Real robotics. Real impact.": { ar: "روبوتات حقيقية. أثر حقيقي.", ja: "本物のロボティクス。本物のインパクト。" },
  "Built for clinics, trusted by therapists, designed around the people who need it most.": {
    ar: "مبني للعيادات، موثوق من المعالجين، ومصمّم حول من هم في أمسّ الحاجة إليه.",
    ja: "クリニックのために作られ、セラピストに信頼され、最も必要とする人のために設計。",
  },
  "Would recommend Unik Exo": { ar: "يوصون بـ Unik Exo", ja: "Unik Exoを推奨" },
  "would recommend Unik Exo": { ar: "يوصون بـ Unik Exo", ja: "Unik Exoを推奨" },
  "Rehabilitation centers": { ar: "مراكز إعادة التأهيل", ja: "リハビリテーション施設" },
  Rehabilitation: { ar: "إعادة التأهيل", ja: "リハビリテーション" },
  "Support through every stage of movement": {
    ar: "دعم في كل مرحلة من الحركة",
    ja: "動きのすべての段階を支える",
  },
  "Structured therapy programs": { ar: "برامج علاج منظّمة", ja: "構造化された療法プログラム" },
  "A next-generation gait system": { ar: "نظام مشي من الجيل التالي", ja: "次世代の歩行システム" },
  "Assisted standing with stability": { ar: "وقوف مدعوم مع ثبات", ja: "安定した立位支援" },
  "Supported seating and transfers": { ar: "جلوس ونقل مدعومان", ja: "座位と移乗の支援" },
  "Learn more": { ar: "اعرف المزيد", ja: "詳しく見る" },
  "Every detail serves a purpose": { ar: "كل تفصيل يخدم غاية", ja: "すべての細部が目的を持つ" },
  "After months in a wheelchair, standing upright in Unik Exo felt like getting a piece of my life back. The therapists could adjust support in real time, and I felt safe every step.":
    {
      ar: "بعد أشهر على الكرسي المتحرك، كان الوقوف باستقامة في Unik Exo كأنني استعدت جزءًا من حياتي. استطاع المعالجون ضبط الدعم في الوقت الفعلي، وشعرت بالأمان في كل خطوة.",
      ja: "車いすの数か月の後、Unik Exoでまっすぐに立てたことは人生の一部を取り戻すようでした。セラピストがリアルタイムで支援を調整でき、一歩一歩安全だと感じました。",
    },
  "Ramesh N.": { ar: "رامِش ن.", ja: "Ramesh N." },
  "Priya M.": { ar: "بريا م.", ja: "Priya M." },
  "Dr. Anil K.": { ar: "د. أنيل ك.", ja: "Dr. Anil K." },
  "Suresh V.": { ar: "سوريش ف.", ja: "Suresh V." },
  "Caregiver · Bengaluru, India": { ar: "مقدّم رعاية · بنغالور، الهند", ja: "介護者 · ベンガルール、インド" },
  "Rehabilitation Specialist · Kochi, India": {
    ar: "أخصائي إعادة تأهيل · كوتشي، الهند",
    ja: "リハビリテーション専門医 · コーチ、インド",
  },
  "SCI Patient · Kannur, India": { ar: "مريض إصابة نخاع شوكي · كانور، الهند", ja: "脊髄損傷患者 · カンヌール、インド" },
  "We tried many devices. Unik Exo was the first that felt designed for real clinics. Setup was fast, and the team trained our physiotherapist thoroughly.":
    {
      ar: "جرّبنا أجهزة كثيرة. كان Unik Exo الأول الذي بدا مصمّمًا للعيادات الحقيقية. كان الإعداد سريعًا، ودرّب الفريق أخصائي العلاج الطبيعي لدينا بعناية.",
      ja: "多くの機器を試しました。Unik Exoは本物のクリニック向けだと感じた初めての製品でした。セットアップは速く、チームは理学療法士を丁寧に指導してくれました。",
    },
  "Gait training needs repeatability. Unik Exo gives me step-wise control and clear feedback, and it fits into our protocol instead of fighting it.":
    {
      ar: "تدريب المشي يحتاج قابلية التكرار. يمنحني Unik Exo تحكمًا تدريجيًا وملاحظات واضحة، وينسجم مع بروتوكولنا بدل أن يعارضه.",
      ja: "歩行訓練には再現性が必要です。Unik Exoは段階的な制御と明確なフィードバックを与え、プロトコルに逆らわずに馴染みます。",
    },
  "Walk mode assistance adapted as I improved. Each session built confidence, from supported steps to walking the length of the clinic.":
    {
      ar: "تكيّفت مساعدة وضع المشي مع تحسّني. كل جلسة بنت الثقة، من خطوات مدعومة إلى المشي بطول العيادة.",
      ja: "歩行モードの支援は改善に合わせて適応しました。支えられた一歩からクリニックを歩き切るまで、毎回自信が積み上がりました。",
    },
  "We're hiring": { ar: "نحن نوظّف", ja: "採用中" },
  "People behind Unik Exo": { ar: "الأشخاص وراء Unik Exo", ja: "Unik Exoを支える人々" },
  "A founder-led team building hardware, software and clinical partnerships together.": {
    ar: "فريق يقوده المؤسسون يبني الأجهزة والبرمجيات والشراكات السريرية معًا.",
    ja: "創業者主導のチームが、ハードウェア、ソフトウェア、臨床パートナーシップを一体で築いています。",
  },
  "Guided by experience": { ar: "بإرشاد الخبرة", ja: "経験に導かれて" },
  "Our mentors bring decades of expertise across robotics, healthcare, technology and innovation.": {
    ar: "يقدّم مرشدونا عقودًا من الخبرة عبر الروبوتات والرعاية الصحية والتقنية والابتكار.",
    ja: "メンターはロボティクス、ヘルスケア、技術、イノベーションで数十年の専門性をもたらします。",
  },
  Mentor: { ar: "مرشد", ja: "メンター" },
  "Founding Partner, Huddle": { ar: "شريك مؤسس، Huddle", ja: "Huddle 創業パートナー" },
  Huddle: { ar: "Huddle", ja: "Huddle" },
  "Strategic Advisor · Photo coming soon.": {
    ar: "مستشار استراتيجي · الصورة قريبًا.",
    ja: "戦略アドバイザー · 写真準備中。",
  },
  "Robin Kanattu Thomas": { ar: "روبن كاناتو توماس", ja: "Robin Kanattu Thomas" },
  "Jithin Vidya Ajith": { ar: "جيثين فيديا أجينت", ja: "Jithin Vidya Ajith" },
  "Alex M Sunny": { ar: "أليكس إم ساني", ja: "Alex M Sunny" },
  "Vishnu Sankar": { ar: "فيشنو سانكار", ja: "Vishnu Sankar" },
  "Ishaan Khosla": { ar: "إيشان خوسلا", ja: "Ishaan Khosla" },
  "Dr Pradeep K Jaisingh": { ar: "د. براديب ك. جايسينغ", ja: "Dr Pradeep K Jaisingh" },
  "Sanil Sachar": { ar: "سانيل ساتشار", ja: "Sanil Sachar" },
  Akhil: { ar: "أخيل", ja: "Akhil" },
  CEO: { ar: "الرئيس التنفيذي", ja: "CEO" },
  COO: { ar: "الرئيس التنفيذي للعمليات", ja: "COO" },
  CTO: { ar: "الرئيس التنفيذي للتقنية", ja: "CTO" },
  CMO: { ar: "الرئيس التنفيذي للتسويق", ja: "CMO" },
  "In the spotlight": { ar: "في دائرة الضوء", ja: "スポットライト" },
  "Read article": { ar: "اقرأ المقال", ja: "記事を読む" },
  "Business Today": { ar: "بزنس توداي", ja: "Business Today" },
  TechCircle: { ar: "تيك سيركل", ja: "TechCircle" },
  "The Hindu Businessline": { ar: "ذي هندو بزنس لاين", ja: "The Hindu Businessline" },
  MeitY: { ar: "MeitY", ja: "MeitY" },
  "Seeding Kerala": { ar: "سيدينغ كيرالا", ja: "Seeding Kerala" },
  "Our latest insights": { ar: "أحدث رؤانا", ja: "最新のインサイト" },
  "Thoughts, research and stories from the team building the future of mobility.": {
    ar: "أفكار وبحوث وقصص من الفريق الذي يبني مستقبل الحركة.",
    ja: "モビリティの未来をつくるチームからの考え、研究、ストーリー。",
  },
  FAQ: { ar: "الأسئلة الشائعة", ja: "FAQ" },
  FAQs: { ar: "الأسئلة الشائعة", ja: "FAQ" },
  "Frequently asked questions": { ar: "الأسئلة الشائعة", ja: "よくある質問" },
  "Answers about Unik Exo, who it is for, clinical use, demonstrations, partnerships and how to reach us.": {
    ar: "إجابات حول Unik Exo، ولمن هو، والاستخدام السريري، والعروض، والشراكات، وكيفية التواصل معنا.",
    ja: "Unik Exo、対象者、臨床利用、デモ、パートナーシップ、お問い合わせについての回答。",
  },
  "Answers about Unik Exo, intended users, rehabilitation use, hospitals, demonstrations, partnerships, patient trials and how to enquire.": {
    ar: "إجابات حول Unik Exo، والمستخدمين المستهدفين، وإعادة التأهيل، والمستشفيات، والعروض، والشراكات، وتجارب المرضى، وكيفية الاستفسار.",
    ja: "Unik Exo、対象ユーザー、リハビリ用途、病院、デモ、パートナーシップ、患者試験、お問い合わせについての回答。",
  },
  "Common questions about Unik Exo, clinical use, and how we work with partners.": {
    ar: "أسئلة شائعة حول Unik Exo والاستخدام السريري وكيف نعمل مع الشركاء.",
    ja: "Unik Exo、臨床利用、パートナーとの働き方についてのよくある質問。",
  },
  "Who are the intended users?": {
    ar: "من هم المستخدمون المستهدفون؟",
    ja: "想定ユーザーは誰ですか？",
  },
  "What is Unik Exo?": { ar: "ما هو Unik Exo؟", ja: "Unik Exoとは何ですか？" },
  "Unik Exo is Astrek Innovations’ wearable robotic exoskeleton for clinically structured lower-limb gait training. It supports sit, stand, walk and exercise under therapist control.":
    {
      ar: "Unik Exo هيكل خارجي روبوتي قابل للارتداء من أستريك لتدريب المشي السريري للأطراف السفلية. يدعم الجلوس والوقوف والمشي والتمرين تحت تحكم المعالج.",
      ja: "Unik Exoは、臨床的に構成された下肢歩行訓練向けのAstrekの装着型ロボット外骨格です。セラピスト制御で座位・立位・歩行・運動を支援します。",
    },
  "Unik Exo is intended for people with lower-limb mobility impairment in a clinical setting, including stroke rehabilitation and structured gait therapy, always under clinician supervision.":
    {
      ar: "صُمّم Unik Exo للأشخاص ذوي ضعف حركة الأطراف السفلية في بيئة سريرية، بما في ذلك إعادة تأهيل السكتة وعلاج المشي المنظّم، دائمًا تحت إشراف سريري.",
      ja: "Unik Exoは、脳卒中リハビリや構造化された歩行療法を含む、臨床現場での下肢運動障害のある方を対象とし、常に臨床監督下で使用します。",
    },
  "Which rehabilitation applications does it support?": {
    ar: "ما تطبيقات إعادة التأهيل التي يدعمها؟",
    ja: "どのリハビリテーション用途に対応していますか？",
  },
  "It is used for gait training, sit-to-stand practice, walking sessions and exercise protocols. Therapists set the mode and assistance level for each patient and session.":
    {
      ar: "يُستخدم لتدريب المشي، والانتقال من الجلوس إلى الوقوف، وجلسات المشي، وبروتوكولات التمرين. يضبط المعالج الوضع ومستوى المساعدة لكل مريض وجلسة.",
      ja: "歩行訓練、座位から立位、歩行セッション、運動プロトコルに使います。セラピストが患者とセッションごとにモードと補助レベルを設定します。",
    },
  "Can hospitals and rehabilitation centers use Unik Exo?": {
    ar: "هل يمكن للمستشفيات ومراكز إعادة التأهيل استخدام Unik Exo؟",
    ja: "病院やリハビリテーションセンターでUnik Exoを使えますか？",
  },
  "Yes. Unik Exo is built for clinic floors: therapist-controlled operation, clinic-ready portability, and session workflows a rehabilitation team can run without an engineer in the room.":
    {
      ar: "نعم. بُني Unik Exo لأرضية العيادة: تشغيل تحت تحكم المعالج، وقابلية نقل جاهزة للعيادة، ومسارات جلسة يديرها فريق إعادة التأهيل دون مهندس في الغرفة.",
      ja: "はい。Unik Exoはクリニック向けです。セラピストが操作し、持ち運びでき、エンジニアがいなくてもリハチームがセッションを回せます。",
    },
  "How can we arrange a product demonstration?": {
    ar: "كيف يمكننا ترتيب عرض للمنتج؟",
    ja: "製品デモはどのように手配できますか？",
  },
  "Contact the Astrek team through the enquiry form or email info@astrekinnovations.com. We can schedule a supervised demonstration for clinicians, hospitals and rehabilitation centres.":
    {
      ar: "تواصل مع فريق أستريك عبر نموذج الاستفسار أو البريد info@astrekinnovations.com. يمكننا جدولة عرض خاضع للإشراف للأطباء والمستشفيات ومراكز إعادة التأهيل.",
      ja: "お問い合わせフォームまたは info@astrekinnovations.com へご連絡ください。臨床家、病院、リハビリセンター向けの監督付きデモを調整できます。",
    },
  "How do partnerships with Astrek work?": {
    ar: "كيف تعمل الشراكات مع أستريك؟",
    ja: "Astrekとのパートナーシップはどのように進みますか？",
  },
  "We work with hospitals, rehabilitation centres, research groups, distributors and innovation partners. Use Partner With Us to open the dedicated partnership form.":
    {
      ar: "نعمل مع المستشفيات ومراكز إعادة التأهيل ومجموعات البحث والموزعين وشركاء الابتكار. استخدم «كن شريكًا معنا» لفتح نموذج الشراكة المخصص.",
      ja: "病院、リハビリセンター、研究グループ、販売、イノベーションパートナーと協業します。「Partner With Us」から専用のパートナーシップフォームを開いてください。",
    },
  "Are patient trials available?": { ar: "هل تتوفر تجارب للمرضى؟", ja: "患者向けの試験はありますか？" },
  "Structured clinical pilots and supervised patient sessions are arranged with partner centres. Reach out to discuss eligibility, clinical protocol and onboarding.":
    {
      ar: "نرتّب تجارب سريرية منظّمة وجلسات مرضى تحت إشراف مع المراكز الشريكة. تواصل معنا لمناقشة الأهلية والبروتوكول السريري وبدء العمل.",
      ja: "提携センターと、構造化された臨床パイロットと監督下の患者セッションを調整します。適格性、臨床プロトコル、導入についてご相談ください。",
    },
  "How do I contact Astrek or send an enquiry?": {
    ar: "كيف أتواصل مع أستريك أو أرسل استفسارًا؟",
    ja: "Astrekへの連絡や問い合わせはどうすればよいですか？",
  },
  "Use the contact form on this website, email info@astrekinnovations.com, or call +971 50 353 1304. Partnership enquiries should use the Partner With Us form.":
    {
      ar: "استخدم نموذج التواصل في هذا الموقع، أو راسل info@astrekinnovations.com، أو اتصل على +971 50 353 1304. استفسارات الشراكة يجب أن تتم عبر نموذج «كن شريكًا معنا».",
      ja: "本サイトのお問い合わせフォーム、info@astrekinnovations.com、または +971 50 353 1304 へ。パートナーシップは Partner With Us の専用フォームをご利用ください。",
    },
  "Can clinics pilot Unik Exo?": { ar: "هل يمكن للعيادات تجربة Unik Exo؟", ja: "クリニックでUnik Exoをパイロット運用できますか？" },
  "What modes does Unik Exo support?": { ar: "ما الأوضاع التي يدعمها Unik Exo؟", ja: "Unik Exoはどのモードに対応していますか？" },
  "Sit, Stand, Walk and Exercise, so therapists can take a patient through each stage of mobility training with one system.":
    {
      ar: "الجلوس والوقوف والمشي والتمرين، حتى يتمكن المعالجون من أخذ المريض عبر كل مرحلة من تدريب الحركة بجهاز واحد.",
      ja: "座位、立位、歩行、運動。セラピストは一つのシステムで各段階のモビリティ訓練を進められます。",
    },
  "Safety is built in: emergency stop, motor-locked safety modes, mechanical hard limits, and step-wise therapist control throughout every session.":
    {
      ar: "السلامة مدمجة: إيقاف طارئ، وأوضاع أمان بقفل المحرك، وحدود ميكانيكية صارمة، وتحكم تدريجي من المعالج طوال كل جلسة.",
      ja: "非常停止、モーターロック安全モード、機械的ハードリミット、セッション全体の段階的なセラピスト制御を備えています。",
    },
  "Who is Unik Exo designed for?": { ar: "لمن صُمّم Unik Exo؟", ja: "Unik Exoは誰のために設計されていますか？" },
  "How does Unik Exo ensure safety?": { ar: "كيف يضمن Unik Exo السلامة؟", ja: "Unik Exoはどのように安全性を確保しますか？" },
  "Unik Exo supports individuals with lower-limb immobility under clinician supervision, including stroke rehabilitation, gait training, and structured therapy programs.":
    {
      ar: "يدعم Unik Exo الأشخاص ذوي محدودية حركة الأطراف السفلية تحت إشراف سريري، بما في ذلك إعادة تأهيل السكتة وتدريب المشي وبرامج العلاج المنظّمة.",
      ja: "Unik Exoは臨床監督下で下肢の可動制限がある方を支援します。脳卒中リハビリ、歩行訓練、構造化療法プログラムを含みます。",
    },
  "Discover the next step in": { ar: "اكتشف الخطوة التالية في", ja: "次の一歩を発見する" },
  "robotic rehabilitation": { ar: "إعادة التأهيل الروبوتية", ja: "ロボティックリハビリテーション" },
  "Discover the next step in robotic rehabilitation": {
    ar: "اكتشف الخطوة التالية في إعادة التأهيل الروبوتية",
    ja: "ロボティックリハビリテーションの次の一歩を発見する",
  },
  "Whether you're a clinician, partner, or innovator, let's build mobility that matters.": {
    ar: "سواء كنت مختصًا سريريًا أو شريكًا أو مبتكرًا، لنبنِ حركة ذات معنى.",
    ja: "臨床家、パートナー、イノベーターの皆さんと、意味あるモビリティを築きましょう。",
  },
  "Let’s connect. Let’s build what’s next": {
    ar: "لنتواصل. لنبنِ ما التالي",
    ja: "つながろう。次を一緒につくろう",
  },
  "Let's connect. Let's build what's next": {
    ar: "لنتواصل. لنبنِ ما التالي",
    ja: "つながろう。次を一緒につくろう",
  },
  Intelligence: { ar: "الذكاء", ja: "インテリジェンス" },
  Fit: { ar: "الملاءمة", ja: "フィット" },

  /* ── Marquee + Key features chapter (remaining English) ── */
  "REDEFINING MOBILITY": { ar: "إعادة تعريف الحركة", ja: "モビリティを再定義" },
  "ROBOTIC PRECISION": { ar: "دقة روبوتية", ja: "ロボティック精度" },
  "ADVANCED REHABILITATION": { ar: "إعادة تأهيل متقدمة", ja: "先進リハビリテーション" },
  "HUMAN-CENTERED DESIGN": { ar: "تصميم محوره الإنسان", ja: "人間中心デザイン" },
  "Key features": { ar: "الميزات الرئيسية", ja: "主な特長" },
  "Enhanced mobility": { ar: "حركة محسّنة", ja: "強化されたモビリティ" },
  "Precision hardware that supports natural gait and confident movement across sit, stand, and walk therapy.": {
    ar: "عتاد دقيق يدعم المشي الطبيعي والحركة الواثقة عبر علاج الجلوس والوقوف والمشي.",
    ja: "座位・立位・歩行セラピー全体で、自然な歩行と自信ある動きを支える精密ハードウェア。",
  },
  "Mobility 01": { ar: "الحركة 01", ja: "モビリティ 01" },
  "01 Mobility": { ar: "01 الحركة", ja: "01 モビリティ" },
  Mobility: { ar: "الحركة", ja: "モビリティ" },

  /* ── Contact / specs / marquee leftovers ── */
  Locations: { ar: "المواقع", ja: "所在地" },
  "Astrek Innovations": { ar: "أستريك إنوفيشنز", ja: "Astrek Innovations" },
  "Maker Village": { ar: "ميكر فيلدج", ja: "Maker Village" },
  "Smart control": { ar: "تحكم ذكي", ja: "スマート制御" },
  "Site Map": { ar: "خريطة الموقع", ja: "サイトマップ" },
  Patients: { ar: "مرضى", ja: "患者" },
  "Rehabilitation Centers": { ar: "مراكز إعادة التأهيل", ja: "リハビリテーション施設" },
  Home: { ar: "الرئيسية", ja: "ホーム" },
  Pages: { ar: "الصفحات", ja: "ページ" },
  "Home sections": { ar: "أقسام الصفحة الرئيسية", ja: "ホームセクション" },
  "Unik Exo page": { ar: "صفحة يونيك إكسو", ja: "Unik Exoページ" },
  "Product overview": { ar: "نظرة عامة على المنتج", ja: "製品概要" },
  Capabilities: { ar: "القدرات", ja: "機能" },
  Introduction: { ar: "المقدمة", ja: "イントロダクション" },
  "All major pages and sections of the Astrek Innovations website.": {
    ar: "جميع الصفحات والأقسام الرئيسية لموقع أستريك إنوفيشنز.",
    ja: "Astrek Innovationsウェブサイトの主要なページとセクション。",
  },
  "About Astrek Innovations": { ar: "عن أستريك إنوفيشنز", ja: "Astrek Innovationsについて" },
  "Who we are": { ar: "من نحن", ja: "私たちについて" },
  "Restoring mobility through clinical-grade robotics": {
    ar: "استعادة الحركة عبر روبوتات بمستوى سريري",
    ja: "臨床グレードのロボティクスで可動性を取り戻す",
  },
  "13485 compliant": { ar: "متوافق مع 13485", ja: "13485準拠" },
  "Rehabilitation centres": { ar: "مراكز إعادة التأهيل", ja: "リハビリセンター" },
  Award: { ar: "جائزة", ja: "受賞" },
  "Winning design": { ar: "تصميم فائز", ja: "受賞デザイン" },
  "Key areas of work": { ar: "مجالات العمل الرئيسية", ja: "主な活動領域" },
  "Focus areas": { ar: "مجالات التركيز", ja: "注力領域" },
  "Built for clinics, designed for independence": {
    ar: "مصمم للعيادات، من أجل الاستقلال",
    ja: "クリニックのために、自立のために。",
  },
  "Scalable robotic solutions across diverse fields.": {
    ar: "حلول روبوتية قابلة للتوسع عبر مجالات متنوعة.",
    ja: "多様な分野に広がるスケーラブルなロボットソリューション。",
  },
  "Protocol-based gait training under clinical supervision.": {
    ar: "تدريب مشي وفق بروتوكول تحت إشراف سريري.",
    ja: "臨床監督下のプロトコル型歩行訓練。",
  },
  "UNIKEXO: sit, stand, and walk support.": {
    ar: "UNIKEXO: دعم الجلوس والوقوف والمشي.",
    ja: "UNIKEXO：座位・立位・歩行のサポート。",
  },
  "PMR, neuro-rehab, and gait labs.": {
    ar: "الطب الطبيعي، وإعادة التأهيل العصبي، ومختبرات المشي.",
    ja: "PMR、神経リハビリ、歩行ラボ。",
  },
  "Helping patients stand, walk, and regain independence — starting in clinic, then across more fields of care.":
    {
      ar: "مساعدة المرضى على الوقوف والمشي واستعادة الاستقلال — بدءًا من العيادة ثم عبر مجالات رعاية أوسع.",
      ja: "患者が立ち、歩き、自立を取り戻せるよう支援する。まず臨床から、そしてより広いケア領域へ。",
    },
  "Therapist-controlled gait training with emergency stop, motor-locked safety modes, and mechanical hard limits. Precision telescopic fit at the hip, thigh, and calf.":
    {
      ar: "تدريب مشي يتحكم به المعالج مع إيقاف طارئ وأوضاع أمان بقفل المحرك وحدود ميكانيكية صارمة. ملاءمة تلسكوبية دقيقة عند الورك والفخذ والساق.",
      ja: "非常停止、モーターロック安全モード、機械的ハードリミットを備えたセラピスト制御の歩行訓練。股・大腿・下腿の精密テレスコピックフィット。",
    },
  "UNIKEXO supports Sit, Stand, and Walk, with battery operation up to two hours for protocol-based lower-limb rehabilitation.":
    {
      ar: "يدعم UNIKEXO الجلوس والوقوف والمشي، بتشغيل بطارية حتى ساعتين لإعادة تأهيل الأطراف السفلية وفق بروتوكول.",
      ja: "UNIKEXOは座位・立位・歩行に対応し、プロトコル型の下肢リハビリ向けに最大2時間のバッテリー駆動です。",
    },
  "Astrek Innovations builds wearable robotic exoskeletons that restore lower-limb mobility. We work with rehabilitation centres to help patients stand, walk, and regain independence.":
    {
      ar: "تبني أستريك إنوفيشنز هياكل خارجية روبوتية قابلة للارتداء لاستعادة حركة الأطراف السفلية. نعمل مع مراكز إعادة التأهيل لمساعدة المرضى على الوقوف والمشي واستعادة الاستقلال.",
      ja: "Astrek Innovationsは、下肢の可動性を取り戻すウェアラブルロボット外骨格を開発しています。リハビリセンターと協力し、患者が立ち、歩き、自立を取り戻せるよう支援します。",
    },
  "Our systems are validated in real clinics — used with 120+ patients across 15+ centres — and recognized through innovation awards. From this foundation we are expanding into broader robotics.":
    {
      ar: "أنظمةنا مثبتة في عيادات حقيقية — مع أكثر من 120 مريضًا في أكثر من 15 مركزًا — ومعترف بها بجوائز ابتكار. ومن هذا الأساس نوسّع عملنا نحو روبوتات أوسع.",
      ja: "当社のシステムは実臨床で検証され、15以上の施設で120人以上の患者に使用され、イノベーション賞も受けています。この基盤から、より広いロボティクスへ展開しています。",
    },
  "Scalable robotic systems that help people stand, walk, and reclaim independence — in clinic first, then across more fields of care.":
    {
      ar: "أنظمة روبوتية قابلة للتوسع تساعد الناس على الوقوف والمشي واستعادة الاستقلال — في العيادة أولًا، ثم عبر مجالات رعاية أوسع.",
      ja: "人が立ち、歩き、自立を取り戻すためのスケーラブルなロボットシステム。まず臨床、そしてより広いケア領域へ。",
    },
  "Lower-limb exoskeletons for protocol-based gait training. Therapist-controlled, with emergency stop, locked safety modes, and mechanical hard limits.":
    {
      ar: "هياكل خارجية للأطراف السفلية لتدريب مشي وفق بروتوكول. يتحكم بها المعالج، مع إيقاف طارئ وأوضاع أمان مقفلة وحدود ميكانيكية صارمة.",
      ja: "プロトコル型歩行訓練向けの下肢外骨格。セラピスト制御、非常停止、ロック式安全モード、機械的ハードリミットを備えます。",
    },
  "Unik Exo supports Sit, Stand, and Walk, with up to two hours of battery operation and a precision telescopic fit at the hip, thigh, and calf.":
    {
      ar: "يدعم Unik Exo الجلوس والوقوف والمشي، بتشغيل بطارية حتى ساعتين وملاءمة تلسكوبية دقيقة عند الورك والفخذ والساق.",
      ja: "Unik Exoは座位・立位・歩行に対応し、最大2時間のバッテリー駆動と、股・大腿・下腿の精密テレスコピックフィットを備えます。",
    },
  "Built for PMR, neuro-rehab, and gait labs. Compatible with body-weight support, wheelchair transfers, and existing clinic infrastructure.":
    {
      ar: "مصمم للطب الطبيعي وإعادة التأهيل العصبي ومختبرات المشي. متوافق مع دعم وزن الجسم والانتقال من الكرسي المتحرك والبنية التحتية الحالية للعيادة.",
      ja: "PMR、神経リハビリ、歩行ラボ向け。体重支持、車椅子移乗、既存のクリニック設備に対応します。",
    },
  "Clinical work": { ar: "العمل السريري", ja: "臨床" },
  "ISO 13485": { ar: "ISO 13485", ja: "ISO 13485" },
  "Unik Exo · clinic-ready gait system": { ar: "Unik Exo · نظام مشي جاهز للعيادة", ja: "Unik Exo · クリニック対応歩行システム" },
  "Astrek Innovations is a robotics startup specializing in lower limb exoskeletons designed to enhance mobility, independence, and assisted movement. Our solutions focus on rehabilitation and mobility support, validated through real world pilot testing and recognized through multiple innovation awards. Building on this foundation, we are expanding our capabilities across broader robotics applications, with a long term vision to develop scalable robotic solutions across diverse fields.":
    {
      ar: "أستريك إنوفيشنز شركة ناشئة في الروبوتات متخصصة في الهياكل الخارجية للأطراف السفلية لتعزيز الحركة والاستقلال والحركة المساعدة. تركز حلولنا على إعادة التأهيل ودعم الحركة، وقد ثبتت عبر تجارب ميدانية وحازت جوائز ابتكار متعددة. وانطلاقًا من هذا الأساس نوسّع قدراتنا عبر تطبيقات روبوتية أوسع، برؤية طويلة الأمد لتطوير حلول روبوتية قابلة للتوسع في مجالات متنوعة.",
      ja: "Astrek Innovationsは、移動・自立・補助動作を高める下肢外骨格に特化したロボティクスのスタートアップです。リハビリとモビリティ支援に焦点を当て、実地パイロットで検証され、複数のイノベーション賞を受けています。この基盤の上で、より広いロボティクス応用へ能力を広げ、多様な分野でスケーラブルなロボットソリューションを開発するという長期ビジョンを持っています。",
    },
  "Pilot-tested": { ar: "مجرّب ميدانيًا", ja: "パイロット検証済み" },
  "Award-winning": { ar: "حائز على جوائز", ja: "受賞歴あり" },
  "ISO 13485 Compliant": { ar: "متوافق مع ISO 13485", ja: "ISO 13485準拠" },
  Vision: { ar: "الرؤية", ja: "ビジョン" },
  "A long term vision to develop scalable robotic solutions across diverse fields, helping patients stand, walk, and regain independence.":
    {
      ar: "رؤية طويلة الأمد لتطوير حلول روبوتية قابلة للتوسع في مجالات متنوعة، لمساعدة المرضى على الوقوف والمشي واستعادة الاستقلال.",
      ja: "患者が立ち、歩き、自立を取り戻せるよう、多様な分野でスケーラブルなロボットソリューションを開発するという長期ビジョン。",
    },
  "Technology focus": { ar: "التركيز التقني", ja: "技術の焦点" },
  "Lower-limb robotic exoskeletons for clinically structured, protocol-based gait training. Therapist-controlled operation under clinical supervision, with emergency stop, motor-locked safety modes, and mechanical hard limits.":
    {
      ar: "هياكل خارجية روبوتية للأطراف السفلية لتدريب مشي سريري منظّم وفق بروتوكول. تشغيل يتحكم به المعالج تحت إشراف سريري، مع إيقاف طارئ وأوضاع أمان بقفل المحرك وحدود ميكانيكية صارمة.",
      ja: "臨床的に構造化されたプロトコル型歩行訓練向けの下肢ロボット外骨格。臨床監督下でセラピストが制御し、非常停止、モーターロック安全モード、機械的ハードリミットを備えます。",
    },
  "UNIKEXO is a robotic exoskeleton for lower limb rehabilitation. It supports Sit, Stand and Walk, with battery operation of up to 2 hours and precision fit through telescopic hip, thigh, and calf adjustment.":
    {
      ar: "UNIKEXO هيكل خارجي روبوتي لإعادة تأهيل الأطراف السفلية. يدعم الجلوس والوقوف والمشي، بتشغيل بطارية حتى ساعتين وملاءمة دقيقة عبر ضبط تلسكوبي للورك والفخذ والساق.",
      ja: "UNIKEXOは下肢リハビリテーション向けロボット外骨格です。座位・立位・歩行に対応し、最大2時間のバッテリー駆動と、股・大腿・下腿のテレスコピック調整による精密フィットを備えます。",
    },
  "Key areas of work": { ar: "مجالات العمل الرئيسية", ja: "主な事業領域" },
  "Rehabilitation and mobility support across PMR, Neuro-Rehab and Gait Labs. Compatible with body-weight support systems, wheelchair-to-exo transfers, and existing rehabilitation infrastructure.":
    {
      ar: "دعم إعادة التأهيل والحركة عبر الطب الطبيعي وإعادة التأهيل العصبي ومختبرات المشي. متوافق مع أنظمة دعم وزن الجسم والانتقال من الكرسي المتحرك إلى الهيكل الخارجي والبنية التحتية الحالية لإعادة التأهيل.",
      ja: "PMR、神経リハビリ、歩行ラボにおけるリハビリとモビリティ支援。体重支持システム、車椅子から外骨格への移乗、既存のリハビリインフラに対応します。",
    },
  "CLINICIAN-GUIDED ASSISTANCE": {
    ar: "مساعدة موجّهة من المختص السريري",
    ja: "臨床家ガイドのアシスタンス",
  },
};

export const MARKUP: Record<string, Phrase> = {
  "hero-h1": {
    ar: 'اتخذ خطواتك الأولى <span class="ajh-title-accent">من جديد</span>',
    ja: 'もう一度、最初の<span class="ajh-title-accent">一歩を</span>',
  },
  "tech-h2": {
    ar: "تقنية<br /> مصمّمة حول<br /> <em>حركة الإنسان.</em>",
    ja: "人の動きに<br />寄り添う<br /><em>テクノロジー。</em>",
  },
  "product-h2": {
    ar: "صُمّم ليتحرك <em>معك.</em>",
    ja: "ともに動くために<em>設計。</em>",
  },
  "modes-h2": {
    ar: "دعم في كل مرحلة من <em>الحركة.</em>",
    ja: "すべての段階の<em>動き</em>を支える。",
  },
  "purpose-h2": {
    ar: "كل تفصيل يخدم <em>غاية.</em>",
    ja: "すべての細部が<em>目的を持つ。</em>",
  },
  "mentors-h2": {
    ar: "بإرشاد<br /> <em>الخبرة.</em>",
    ja: "経験に<br /><em>導かれて。</em>",
  },
  "team-h2": {
    ar: "الأشخاص وراء<br /> نجاحنا.",
    ja: "成功を支える<br />人々。",
  },
  "partners-h2": {
    ar: "نُبنى مع <em>الشركاء المناسبين.</em>",
    ja: "ふさわしい<em>パートナー</em>とともに。",
  },
  "blog-h2": {
    ar: "رؤى من <em>Astrek.</em>",
    ja: "<em>Astrek</em>からの洞察。",
  },
  "contact-h2": {
    ar: "لنتواصل. لنبنِ <em>ما التالي.</em>",
    ja: "つながろう。<em>次を</em>一緒につくろう。",
  },
  "mission": {
    ar: "الخطوة التالية تبدأ من هنا. معًا يمكننا بناء مستقبل يستطيع فيه الجميع <em>المضي قدمًا.</em>",
    ja: "次の一歩はここから。誰もが<em>前へ進める</em>未来を、ともに。",
  },
  "cap-h2": {
    ar: "تقنية تحرّك <em>الحياة إلى الأمام.</em>",
    ja: "人生を前へ進める<em>テクノロジー。</em>",
  },
  "ideas-banner": {
    ar: "معًا نحوّل <em>الأفكار</em> إلى <em>أثر.</em>",
    ja: "ともに<em>アイデア</em>を<em>インパクト</em>へ。",
  },
  "blog-progress": {
    ar: "نؤمن بمشاركة المعرفة <em>التي تصنع تقدمًا ذا معنى.</em>",
    ja: "知識を分かち合い<em>意味ある前進をつくる。</em>",
  },
};

export function normalizePhrase(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

const INDEX: Record<string, Phrase> = {};
for (const [key, value] of Object.entries(TRANSLATIONS)) {
  INDEX[normalizePhrase(key)] = value;
}

export function translate(locale: Locale, english: string): string {
  if (locale === "en") return english;
  const hit = INDEX[normalizePhrase(english)];
  return hit?.[locale] || english;
}

export function tryTranslate(locale: Locale, english: string): string | null {
  if (locale === "en") return null;
  return INDEX[normalizePhrase(english)]?.[locale] || null;
}
