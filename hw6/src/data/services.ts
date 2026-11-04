/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MedicalService, ClinicAnnouncement } from '../types';

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'pediatric-consultation',
    title: 'Pediatric Consultation',
    titleRu: 'Консультация педиатра',
    titleKy: 'Педиатрдын кабыл алуусу',
    category: 'consultation',
    description: 'Evidence-based outpatient consultations for infants, children, and adolescents. Thorough clinical assessment without overprescribing medications, vitamins, or unnecessary tests.',
    descriptionRu: 'Амбулаторный прием детей от рождения до подросткового возраста на основе доказательной медицины. Внимательный осмотр без назначения неэффективных препаратов и лишних анализов.',
    descriptionKy: 'Ымыркайлардан өспүрүм куракка чейинки балдарды далилдүү медицинага негизделген кабыл алуу. Ашыкча дары-дармексиз жана негизсиз анализдерсиз так текшерүү.',
    priceEstimate: '1,500 KGS',
    exactPriceKgs: 1500,
    durationMinutes: 30,
    badge: 'Core Focus',
    badgeRu: 'Основной профиль',
    badgeKy: 'Негизги багыт',
    symptoms: ['Fever', 'Cough', 'Infant Care', 'Rash', 'Child Growth', 'Flu'],
    keyFeatures: {
      en: [
        'Strictly 30-minute dedicated appointment to avoid queues',
        'Growth and developmental milestone evaluation',
        'Acute illness care (fevers, coughs, gastrointestinal)',
        'Consultations in English, Russian, German, French, Chinese, Kyrgyz'
      ],
      ru: [
        'Прием строго 30 минут по расписанию для исключения очередей',
        'Оценка физического и нервно-психического развития',
        'Лечение острых состояний (температура, кашель, инфекции)',
        'Прием на русском, кыргызском, английском, немецком, французском'
      ],
      ky: [
        'Кезек күтпөө үчүн так 30 мүнөттүк өзүнчө кабыл алуу',
        'Баланын өсүшүн жана өнүгүүсүн көзөмөлдөө',
        'Курч ооруларды (сасык тумоо, температура) далилдүү дарылоо',
        'Кыргыз, орус, англис, немис, француз жана кытай тилдеринде'
      ]
    }
  },
  {
    id: 'family-medicine',
    title: 'Family Medicine & Adult Internal Care',
    titleRu: 'Семейная медицина и прием терапевта',
    titleKy: 'Үй-бүлөлүк медицина жана терапевт',
    category: 'consultation',
    description: 'Whole-family health in one setting. Adult wellness assessments, blood pressure control, chronic disease monitoring, and revision of previous treatment plans.',
    descriptionRu: 'Единый центр для всей семьи. Комплексный осмотр терапевта, контроль давления, ревизия ранее назначенных лекарств и ведение хронических состояний.',
    descriptionKy: 'Бүтүндөй үй-бүлө үчүн бир клиника. Терапевттин кароосу, кан басымын көзөмөлдөө, мурунку дарыларды кайра карап чыгуу.',
    priceEstimate: '1,500 KGS',
    exactPriceKgs: 1500,
    durationMinutes: 30,
    badge: 'Whole Family',
    badgeRu: 'Для всей семьи',
    badgeKy: 'Бүт үй-бүлөгө',
    symptoms: ['Hypertension', 'Fatigue', 'Headache', 'Annual Checkup', 'Stomach Pain'],
    keyFeatures: {
      en: [
        '30-minute private consultation with experienced internist',
        'Chronic condition management (hypertension, diabetes, asthma)',
        'Elimination of redundant, non-beneficial medications',
        'Direct coordination with our ultrasound and EKG team'
      ],
      ru: [
        '30-минутный прием терапевта высшей категории',
        'Ведение хронических состояний (гипертония, диабет, астма)',
        'Исключение неэффективных медикаментов и полипрагмазии',
        'Оперативная координация с врачами УЗИ и ЭКГ'
      ],
      ky: [
        '30 мүнөттүк дарыгердин кылдат кабыл алуусу',
        'Өнөкөт ооруларды көзөмөлдөө (кан басым, диабет, астма)',
        'Пайдасыз дарыларды жокко чыгаруу жана дарылоону тартипке салуу',
        'УЗИ жана ЭКГ адистери менен биргелешкен кароо'
      ]
    }
  },
  {
    id: 'pulmonology-care',
    title: 'Pulmonology & Respiratory Care',
    titleRu: 'Пульмонология и лечение дыхательных путей',
    titleKy: 'Пульмонология жана дем алуу органдарын дарылоо',
    category: 'consultation',
    description: 'Specialized evaluation by Dr. Nasyikat Dononbaeva for persistent cough, bronchial asthma, post-viral airway hyperreactivity, and chronic bronchitis.',
    descriptionRu: 'Прием врача-пульмонолога: диагностика и лечение затяжного кашля, бронхиальной астмы, аллергических бронхитов и обструкций.',
    descriptionKy: 'Пульмонологдун кабыл алуусу: созулган жөтөлдү, бронхиалдык астманы, аллергиялык дем кыгууну так аныктоо жана дарылоо.',
    priceEstimate: '1,800 KGS',
    exactPriceKgs: 1800,
    durationMinutes: 30,
    badge: 'Specialist Focus',
    badgeRu: 'Узкий специалист',
    badgeKy: 'Атайын адис',
    symptoms: ['Persistent Cough', 'Shortness of Breath', 'Asthma', 'Bronchitis', 'Wheezing'],
    keyFeatures: {
      en: [
        'Differential diagnosis of prolonged cough in children and adults',
        'Individualized asthma action plans following GINA protocols',
        'Inhalation technique optimization and peak flow monitoring',
        'Clear clinical guidance without unnecessary antibiotics'
      ],
      ru: [
        'Дифференциальная диагностика затяжного кашля',
        'Индивидуальный план базисной терапии астмы по стандартам GINA',
        'Обучение технике ингаляций и контролю дыхания',
        'Рациональное лечение без необоснованных антибиотиков'
      ],
      ky: [
        'Узакка созулган жөтөлдүн себептерин так аныктоо',
        'Эл аралык стандарт боюнча астманы дарылоо планы',
        'Ингаляция ыкмаларын туура колдонууну үйрөтүү',
        'Негизсиз антибиотиктерсиз натыйжалуу дарылоо'
      ]
    }
  },
  {
    id: 'ultrasound-diagnostics',
    title: 'High-Resolution Ultrasound (Sonography)',
    titleRu: 'УЗИ-диагностика экспертного класса',
    titleKy: 'Жогорку тактыктагы УЗИ диагностикасы',
    category: 'diagnostics',
    description: 'Detailed, gentle ultrasound examinations performed by Dr. Nargiza Islamova using modern sonography equipment.',
    descriptionRu: 'Современное УЗИ-исследование на высокоточном сканере. Детальное и бережное обследование органов брюшной полости, почек и щитовидной железы.',
    descriptionKy: 'Заманбап жогорку тактыктагы аппарат менен УЗИ изилдөө. Ич көңдөйүнүн органдарын, бөйрөктөрдү жана калкан безин кылдат текшерүү.',
    priceEstimate: '1,200 KGS',
    exactPriceKgs: 1200,
    durationMinutes: 30,
    badge: 'In-Clinic Ultrasound',
    badgeRu: 'УЗИ аппарат в клинике',
    badgeKy: 'Клиникадагы УЗИ',
    symptoms: ['Abdominal Pain', 'Kidney / Flank Pain', 'Thyroid Check', 'Pelvic Discomfort'],
    keyFeatures: {
      en: [
        'Abdominal organs (liver, gallbladder, pancreas, spleen)',
        'Kidneys, adrenal glands, and urinary bladder',
        'Thyroid gland and cervical lymph nodes',
        'Printed clinical ultrasound protocol with visual captures'
      ],
      ru: [
        'Органы брюшной полости (печень, желчный пузырь, поджелудочная железа)',
        'Почки, надпочечники и мочевой пузырь',
        'Щитовидная железа и лимфатические узлы',
        'Выдача официального протокола УЗИ с фотофиксацией'
      ],
      ky: [
        'Ич көңдөйүнүн органдары (боор, өт, уйку бези, көк боор)',
        'Бөйрөктөр жана заара чыгаруу системасы',
        'Калкан бези жана лимфа түйүндөрү',
        'Сүрөттөрү менен расмий УЗИ протоколун берүү'
      ]
    }
  },
  {
    id: 'partner-laboratory-express',
    title: 'Partnered Laboratory Testing (Express Plus)',
    titleRu: 'Лабораторные анализы (Express Plus в клинике)',
    titleKy: 'Лабораториялык анализдер (Express Plus бөлмөсү)',
    category: 'diagnostics',
    description: 'Convenient procedural blood and specimen collection point operated in partnership with Express Plus laboratory. Patients receive reduced partner fees and direct online results via private QR code.',
    descriptionRu: 'Собственный процедурный кабинет партнерской лаборатории Express Plus в клинике MercyMed. Пациенты получают партнерские условия и прямой доступ к результатам по личному QR-коду.',
    descriptionKy: 'MercyMed клиникасындагы Express Plus лабораториясынын процедуралык бөлмөсү. Бейтаптарга атайын өнөктөштүк шарттары жана жеке QR-код аркылуу онлайн жыйынтык берилет.',
    priceEstimate: 'From 250 KGS (By Panel)',
    exactPriceKgs: 250,
    durationMinutes: 15,
    badge: 'On-Site Partner Lab',
    badgeRu: 'Лаборатория на месте',
    badgeKy: 'Өз лаборатория бөлмөсү',
    symptoms: ['Fatigue', 'Fever Assessment', 'Routine Bloodwork', 'Allergy Screen', 'Diabetes Screen'],
    keyFeatures: {
      en: [
        'Gentle pediatric and adult blood sampling on-site',
        'Full spectrum: CBC, biochemistry, ferritin, thyroid hormones, vitamin levels',
        'Digital QR code sent directly to patient smartphone for private results lookup',
        'Reviewed directly by your MercyMed physician during consultation'
      ],
      ru: [
        'Бережный забор анализов у детей и взрослых',
        'Полный спектр: ОАК, биохимия, ферритин, гормоны щитовидной железы',
        'Личный QR-код и СМС для удобного просмотра результатов на смартфоне',
        'Быстрый разбор данных лечащим врачом MercyMed'
      ],
      ky: [
        'Балдардан жана чоңдордон оорутпай кан алуу',
        'Бардык анализдер: кандын жалпы анализи, биохимия, ферритин, гормондор',
        'Телефондон жыйынтыкты көрүү үчүн жеке QR-код',
        'MercyMed дарыгеринин жыйынтык боюнча түшүндүрмөсү'
      ]
    }
  },
  {
    id: 'ekg-cardiac-testing',
    title: 'Electrocardiogram (EKG) & Heart Check',
    titleRu: 'ЭКГ (электрокардиограмма) и кардио-скрининг',
    titleKy: 'ЭКГ (электрокардиограмма) жана жүрөк текшерүүсү',
    category: 'diagnostics',
    description: '12-lead digital electrocardiogram with immediate tracing interpretation by our physicians for chest pain, palpitations, athletics clearance, or surgical pre-op.',
    descriptionRu: '12-канальная цифровая электрокардиография с оперативной расшифровкой врачом: при болях в груди, сердцебиении, допуске к спорту или перед операциями.',
    descriptionKy: 'Клиникада заманбап 12 каналдуу ЭКГ тартуу жана дарыгердин чечмелөөсү: жүрөк ооруганда, спортко уруксат алууда.',
    priceEstimate: '600 KGS',
    exactPriceKgs: 600,
    durationMinutes: 20,
    badge: 'Instant Result',
    badgeRu: 'Готово за 15 мин',
    badgeKy: '15 мүнөттө даяр',
    symptoms: ['Chest Pain', 'Palpitations', 'Dizziness', 'Sports Clearance'],
    keyFeatures: {
      en: [
        'Resting 12-lead digital EKG recording',
        'Instant physician interpretation and cardiac assessment',
        'Clearance certificates for sports, flight travel, and surgeries',
        'Pediatric and adult cardiac rhythm testing'
      ],
      ru: [
        'Снятие 12-канальной ЭКГ в спокойной обстановке',
        'Немедленная расшифровка и рекомендации доктора',
        'Официальные заключения для спортивных секций и полетов',
        'Проверка ритма сердца у детей и взрослых'
      ],
      ky: [
        '12 каналдуу санариптик ЭКГ тартуу',
        'Дарыгердин токтоосуз корутундусу жана кеңеши',
        'Спорт секцияларына жана учууга расмий справкалар',
        'Балдар жана чоңдор үчүн коопсуз текшерүү'
      ]
    }
  },
  {
    id: 'vision-audiometry',
    title: 'Vision Screening & Computerized Audiometry',
    titleRu: 'Проверка зрения и аудиометрия (слух)',
    titleKy: 'Көрүүнү текшерүү жана аудиометрия (угуу)',
    category: 'diagnostics',
    description: 'Specialized sensory assessment in the clinic: visual acuity testing and computerized audiometry hearing thresholds for children, speech delay investigations, and school readiness.',
    descriptionRu: 'Инструментальная проверка слуха и зрения в клинике: диагностика остроты зрения и компьютерная аудиометрия слуха для школы, сада и логопедической оценки.',
    descriptionKy: 'Клиникада угуу жана көрүү жөндөмүн текшерүү: мектепке, бакчага даярдык жана сүйлөө кемчиликтерин аныктоо үчүн.',
    priceEstimate: '800 KGS',
    exactPriceKgs: 800,
    durationMinutes: 25,
    badge: 'Sensory Screening',
    badgeRu: 'Слух и зрение',
    badgeKy: 'Угуу жана көрүү',
    symptoms: ['Speech Delay', 'Hearing Difficulty', 'Blurry Vision', 'School Entry Check'],
    keyFeatures: {
      en: [
        'Computerized audiometry for hearing threshold verification',
        'Early identification of auditory deficits contributing to speech delay',
        'Standardized visual acuity charts for pediatric checkups',
        'Certified sensory screening reports for school admission'
      ],
      ru: [
        'Компьютерная аудиометрия порогов слуха',
        'Раннее выявление нарушений слуха, влияющих на развитие речи',
        'Проверка остроты зрения по таблицам для детей и взрослых',
        'Официальное заключение для школьных и дошкольных карт'
      ],
      ky: [
        'Компьютердик аудиометрия менен угуу босогосун тактоо',
        'Сүйлөөгө тоскоол болгон угуу көйгөйлөрүн эрте аныктоо',
        'Эл аралык стандартта көрүү курчтугун текшерүү',
        'Мектеп жана бала бакча үчүн медициналык тастыктама'
      ]
    }
  },
  {
    id: 'maternity-doula',
    title: 'Doula Care & Physiological Birth Preparation',
    titleRu: 'Сопровождение доулы и подготовка к родам',
    titleKy: 'Доуланын коштоосу жана төрөткө даярдык',
    category: 'maternity',
    description: 'Led by certified doula and clinic director Mahabat Alieva. Holistic physiological prenatal education, birth planning, partner guidance, and postpartum home visits.',
    descriptionRu: 'Под руководством сертифицированной доулы и директора клиники Махабат Алиевой. Подготовка к мягким физиологическим родам, поддержка партнера и послеродовой патронаж.',
    descriptionKy: 'Сертификатталган доула жана директор Махабат Алиеванын жетекчилиги астында кош бойлуулукту, өнөктөштүк төрөттү жана төрөттөн кийинки калыбына келүүнү колдоо.',
    priceEstimate: '2,000 KGS (Session)',
    exactPriceKgs: 2000,
    durationMinutes: 45,
    badge: 'Maternal Care',
    badgeRu: 'Забота о маме',
    badgeKy: 'Энеликке кам көрүү',
    symptoms: ['Pregnancy Support', 'Labor Fear', 'Postpartum Recovery', 'Breastfeeding'],
    keyFeatures: {
      en: [
        'Comfortable 45-minute prenatal doula consultation',
        'Breathing mechanics, physiological movement, and natural relaxation',
        'Partner coaching for supportive delivery room presence',
        'Postpartum breastfeeding and newborn recovery guidance'
      ],
      ru: [
        '45-минутная доверительная консультация доулы',
        'Дыхательные техники, физиологические позы и расслабление в родах',
        'Подготовка партнера к партнерским родам',
        'Послеродовое восстановление и налаживание грудного вскармливания'
      ],
      ky: [
        'Доула менен 45 мүнөттүк жеке баарлашуу',
        'Дем алуу, эркин болуу жана ооруну жеңилдетүү ыкмалары',
        'Өнөктөштүк төрөткө жолдошун даярдоо',
        'Төрөттөн кийинки калыбына келүү жана эмизүү боюнча кеңештер'
      ]
    }
  },
  {
    id: 'physical-therapy',
    title: 'Physical Therapy & Musculoskeletal Rehab',
    titleRu: 'Физиотерапия и реабилитация суставов/спины',
    titleKy: 'Физиотерапия жана муун/омуртка калыбына келтирүү',
    category: 'consultation',
    description: 'Licensed physical therapy by Madison Smith: posture correction, pediatric motor milestone enhancement, back pain relief, and orthopedic sports recovery.',
    descriptionRu: 'Прием физиотерапевта Мэдисон Смит: исправление осанки, моторное развитие детей, снятие болей в спине и восстановление после травм.',
    descriptionKy: 'Физиотерапевт Мэдисон Смиттин кабыл алуусу: омуртканы түздөө, балдардын кыймыл-аракетин өнүктүрүү, белдин оорусун басуу.',
    priceEstimate: '1,500 KGS',
    exactPriceKgs: 1500,
    durationMinutes: 40,
    badge: 'Rehab & Mobility',
    badgeRu: 'ЛФК и реабилитация',
    badgeKy: 'Калыбына келтирүү',
    symptoms: ['Back Pain', 'Neck Stiffness', 'Scoliosis', 'Joint Pain', 'Sports Injury'],
    keyFeatures: {
      en: [
        'Comprehensive musculoskeletal and posture evaluation',
        'Active corrective exercise prescriptions (no passive reliance)',
        'Pediatric developmental motor milestone stimulation',
        'Ergonomic workstation and spine preservation counseling'
      ],
      ru: [
        'Комплексная оценка биомеханики осанки и суставов',
        'Индивидуальный комплекс лечебных упражнений',
        'Стимуляция моторных навыков у детей',
        'Рекомендации по эргономике рабочего места и здоровью спины'
      ],
      ky: [
        'Омуртканын жана муундардын абалын толук текшерүү',
        'Жекече дарылоочу көнүгүүлөр комплекси',
        'Балдардын кыймыл-аракет жөндөмдүүлүгүн арттыруу',
        'Бел жана моюн ооруларынын алдын алуу боюнча кеңештер'
      ]
    }
  },
  {
    id: 'medical-certificates',
    title: 'Official Medical Certificates & Travel Clearance',
    titleRu: 'Медицинские справки для школ, полетов и страховых',
    titleKy: 'Мектепке, учакта учууга жана камсыздандырууга справкалар',
    category: 'documents',
    description: 'Officially certified medical certificates in Russian and English: fit-to-fly airline certificates, university and international school clearances (e.g. AUCA), and foreign health insurance documentation.',
    descriptionRu: 'Официальные медицинские справки на русском и английском: допуск к перелетам (fit-to-fly), справки в школы и вузы (включая АУЦА), выписки для зарубежных страховых.',
    descriptionKy: 'Чет өлкөгө чыгуу, учакта учуу, мектепке/бакчага тапшыруу жана эл аралык камсыздандыруу компаниялары үчүн расмий медициналык справкалар.',
    priceEstimate: '1,000 KGS',
    exactPriceKgs: 1000,
    durationMinutes: 20,
    badge: 'Official Documents',
    badgeRu: 'Официальные справки',
    badgeKy: 'Расмий документтер',
    symptoms: ['School Admission', 'Flight Clearance (Fit to Fly)', 'Expat Insurance Report', 'Sports Club Clearance'],
    keyFeatures: {
      en: [
        'Bilingual English / Russian official medical clearance',
        'Fit-to-fly pregnancy and surgical convalescence certificates',
        'AUCA & international school annual admission medical checkups',
        'Itemized medical reports for international travel health insurance claims'
      ],
      ru: [
        'Официальное двуязычное заключение (русский / английский)',
        'Справки для авиаперелетов при беременности и после лечения',
        'Медосмотры для зачисления в АУЦА и международные школы',
        'Детальные отчеты для возмещения зарубежными страховыми компаниями'
      ],
      ky: [
        'Орус жана англис тилдеринде расмий берилген корутунду',
        'Учакта учууга медициналык уруксат кагаздары',
        'АУЦА жана эл аралык мектептерге медициналык кароодон өтүү',
        'Чет элдик камсыздандыруу компаниялары үчүн расмий отчеттор'
      ]
    }
  }
];

export const CLINIC_ANNOUNCEMENTS: ClinicAnnouncement[] = [];
