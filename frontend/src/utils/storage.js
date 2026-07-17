import { apiGetSite, apiSaveSite } from './api.js';


export const IMAGE_DEFAULTS = {
  homeHero:        '/pexels-negativespace-34639.jpg',
  homeAbout:       '/images/home_01.jpg',
  homeDesign:      '/images/home_02.jpg',
  homeGraphic:     '/images/home_00.jpg',
  aboutMain:       '/images/advertising_02.jpg',
  contactHero:     '/images/contact_00.jpg',
  freeQuoteHero:   '/images/freequote_00.jpg',
  advertisingHero: '/images/advertising_00.jpg',
  advertisingMid:  '/images/advertising_01.jpg',
  activitiesHero:  '/images/activities_01.jpg',
  activitiesZone2: '/images/activities_03.jpg',
  activitiesZone3: '/images/Image 1.jpg',
  activitiesZone4: '/images/eric-prouzet-qUi9i0nLcPQ-unsplash.jpg',
  activitiesZone5: '/images/pexels-kokyo-k-244418001-26761527.jpg',
  serviceShoppingCenters: '/images/activities_03.jpg',
  serviceMalls:           '/images/Image 1.jpg',
  serviceAirports:        '/images/eric-prouzet-qUi9i0nLcPQ-unsplash.jpg',
  serviceUrbanZones:      '/images/pexels-kokyo-k-244418001-26761527.jpg',
};

const CONTENT_EN = {
  navBrand: 'Influence Digital Ads',

  heroBadge:    'DIGITAL ADVERTISING AGENCY / DIGITAL SIGNAGE SOLUTIONS',
  heroHeadline: 'Amplify Your Brand Presence Across High-Traffic Locations',
  heroSubtext:  'Elevate your impact with precision-targeted digital advertising solutions in premium malls, international airports, and urban billboards. Data-driven strategy meets high-definition display.',
  heroCta1:     'Get Free Quote',
  heroCta2:     'Explore Advertising Solutions',
  heroStat1Val: '500+', heroStat1Label: 'Screens',
  heroStat2Val: '50+',  heroStat2Label: 'Locations',
  heroStat3Val: '100+', heroStat3Label: 'Campaigns',

  trustedLabel: 'Trusted by global industry leaders',

  aboutLabel:      'DIGITAL ADVERTISING',
  aboutHeadline:   "Maximize Your Brand's Visibility",
  aboutText1:      'Influence Digital-ads specializes in digital advertising with giant LED screens. We broadcast a variety of content, including client information, weather updates, and announcements, in high-traffic areas such as shopping centers, airports, and other strategic locations.',
  aboutText2:      'Successful advertising on giant screens requires exceptional graphic design. Our expertise in creating captivating graphics ensures that your content stands out and effectively captures the audience\'s attention.',
  aboutYears:      '7+',
  aboutYearsLabel: 'Years of Excellence',
  aboutCta:        'Learn More About Us',

  solutionsHeadline: 'Precision-Targeted Solutions',
  solutionsSubtext:  'Diverse media formats designed to capture attention where it matters most.',

  whyLabel:    'THE INFLUENCE ADVANTAGE',
  whyHeadline: 'Strategy Built on Precision and Performance',
  whySubtext:  'We combine premium inventory with rigorous analytics to ensure every impression contributes to your bottom line.',
  why1Title: 'Strategic Locations',    why1Desc: 'Pre-selected hubs that guarantee alignment with target demographics.',
  why2Title: 'Unrivaled Reach',        why2Desc: 'Scale your brand across domestic and international markets seamlessly.',
  why3Title: 'Premium Displays',       why3Desc: 'State-of-the-art hardware ensuring your brand looks its absolute best.',
  why4Title: 'Domain Expertise',       why4Desc: 'Over a decade of specialization in the digital out-of-home (DOOH) sector.',
  why5Title: 'End-to-End Management',  why5Desc: 'From creative adaptation to technical deployment, we handle it all.',
  why6Title: 'Data Transparency',      why6Desc: 'Comprehensive performance reporting with verified impression metrics.',

  metric1Val: '542',  metric1Label: 'Premium Screens',
  metric2Val: '12M+', metric2Label: 'Monthly Impressions',
  metric3Val: '24/7', metric3Label: 'Uptime Guarantee',
  metric4Val: '100%', metric4Label: 'Transparency',

  processHeadline: 'A Streamlined Path to Impact',
  process1Title: 'Consultation', process1Desc: 'We analyze your goals, budget, and target audience to identify ideal inventory.',
  process2Title: 'Planning',     process2Desc: 'A customized media plan is developed with specific screen selections and timings.',
  process3Title: 'Creative',     process3Desc: 'Technical specs review and visual adaptation to ensure maximum clarity on our displays.',
  process4Title: 'Launch',       process4Desc: 'Campaign goes live with real-time monitoring and post-campaign performance audits.',

  ctaHeadline: 'Ready to Increase Your Brand Visibility?',
  ctaSubtext:  "Partner with Influence Digital Ads and place your brand at the center of the world's most dynamic environments.",
  ctaButton:   'Request a Free Quote',

  formHeadline: 'Get a Free Quote',
  formSubtext:  'Fill out the form below and our strategic team will contact you within 24 hours.',

  footerDesc:      'The leading partner for strategic digital advertising across premium global locations. Precision. Impact. Influence.',
  footerAddress:   'www.influencedigital-ads.com',
  footerPhone:     '+1 803 295 7599',
  footerEmail:     'info@influencedigital-ads.com',
  footerCopyright: '© 2024 Influence Digital Ads. All rights reserved.',

  // Advertising page
  advBadge:       'DIGITAL ADVERTISING AGENCY / DIGITAL SIGNAGE SOLUTIONS',
  advHeadline:    'Let Us Promote Your Brand / Come Advertise With Us',
  advSubtext:     'Influence Digital-ads is an agency that provides opportunities accessible to all businesses, with the goal of making advertising in large retail spaces accessible to everyone.',
  advAllChannels: 'All Advertising Channels',
  advStat1Val: '542',  advStat1Label: 'Premium Screens',
  advStat2Val: '12M+', advStat2Label: 'Monthly Impressions',
  advStat3Val: '50+',  advStat3Label: 'Locations',
  advStat4Val: '100%', advStat4Label: 'Transparency',
  advCtaHeadline: 'Ready to Elevate Your Brand?',
  advCtaSubtext:  'Let our experts create a custom advertising solution for your business.',
  advCtaButton:   'Get a Free Quote',

  // Our Activities page
  oaBadge:        'What We Do',
  oaHeadline:     'Our Expertise in Action',
  oaSubtext:      'From strategic planning to flawless execution, we deliver measurable results across the most premium out-of-home environments.',
  oaProcessTitle: 'How We Work',
  oaCapBadge:     'OUR CAPABILITIES',
  oaCapHeadline:  'Full-Spectrum Advertising Capabilities',
  oaCapSubtext:   'A comprehensive suite of services designed to maximize your brand exposure across every major format.',
  oaWhyBadge:     'THE INFLUENCE ADVANTAGE',
  oaWhyHeadline:  'Why Leading Brands Choose Influence',
  oaWhySubtext:   'We are not just a media buyer. We are a strategic partner dedicated to delivering tangible results for your brand.',
  oaCtaHeadline:  'Ready to Make Your Mark?',
  oaCtaSubtext:   'Partner with Influence Digital Ads and let us craft a campaign that drives real results.',
  oaCtaButton:    'Start Your Campaign',

  // Our Activities — Process Steps
  oaStep1Title: 'Consultation', oaStep1Desc: 'We begin with a deep-dive session to understand your brand objectives, target audience, budget parameters, and campaign timeline. Every strategy is built from scratch — no templated packages.',
  oaStep2Title: 'Planning',     oaStep2Desc: 'Our media planners develop a customised inventory selection with specific screen IDs, location coordinates, expected footfall, and demographic overlap data. You see exactly what you are buying.',
  oaStep3Title: 'Creative',     oaStep3Desc: 'Our technical team reviews your creative assets against display specifications and advises on optimal formats, resolution, and motion guidelines to ensure maximum visual impact on-screen.',
  oaStep4Title: 'Launch',       oaStep4Desc: 'Your campaign goes live with real-time content management and uptime monitoring. Post-campaign, you receive a verified performance report with impression counts, uptime logs, and audience data.',

  // Our Activities — Why Items
  oaWhy1Title: 'Strategic Locations',   oaWhy1Desc: 'Pre-selected hubs that guarantee alignment with target demographics.',
  oaWhy2Title: 'Unrivaled Reach',        oaWhy2Desc: 'Scale your brand across domestic and international markets seamlessly.',
  oaWhy3Title: 'Premium Displays',       oaWhy3Desc: 'State-of-the-art hardware ensuring your brand looks its absolute best.',
  oaWhy4Title: 'Domain Expertise',       oaWhy4Desc: 'Over a decade of specialization in the digital out-of-home (DOOH) sector.',
  oaWhy5Title: 'End-to-End Management',  oaWhy5Desc: 'From creative adaptation to technical deployment, we handle it all.',
  oaWhy6Title: 'Data Transparency',      oaWhy6Desc: 'Comprehensive performance reporting with verified impression metrics.',

  // Contact page
  contactBadge:          'CONTACT US',
  contactHeadline:       "Let's Build Your Next Campaign",
  contactSubtext:        'Reach out to our strategic team. We respond within 24 hours and will match you with the right advertising solution for your goals.',
  contactGetInTouch:     'Get in Touch',
  contactRequestQuote:   'Request a Free Quote',
  contactResponseLabel:  'RESPONSE TIME',
  contactResponseTime:   '24hrs',
  contactResponseNote:   'Guaranteed response from a senior strategist, not a bot.',
  contactInfo1Label:     'Phone (US)',      contactInfo1Value: '+1 803 295 7599',
  contactInfo2Label:     'Phone (Bamako)', contactInfo2Value: '+223 93 14 14 51',
  contactInfo3Label:     'Phone (Dakar)',  contactInfo3Value: '+221 77 234 66 33',
  contactInfo4Label:     'Email',          contactInfo4Value: 'info@influencedigital-ads.com',

  // About Us page
  auBadge:    'OUR STORY',
  auHeadline: 'Redefining Presence in the Digital Age',
  auSubtext:  'Founded with a mission to connect premium brands with their audiences at scale, Influence Digital Ads has grown into the region\'s leading digital out-of-home advertising partner.',
  auMissionTitle: 'Our Mission',
  auMissionText:  'To bridge the gap between high-value brands and their target audiences through premium placements in the most influential physical spaces — delivering precision, transparency, and undeniable impact at every touchpoint.',
  auVisionTitle:  'Our Vision',
  auVisionText:   'To be the most trusted digital out-of-home advertising partner in every market we serve — setting the standard for data-driven, high-impact outdoor advertising globally.',
  auValuesTitle:  'Our Core Values',
  auVal1Title: 'Precision',      auVal1Desc: 'Every placement decision is backed by verified data, not intuition. We select screens that align with your specific audience demographics.',
  auVal2Title: 'Transparency',   auVal2Desc: 'Full visibility into every impression, screen, and campaign metric. No black boxes — you see exactly what you are buying.',
  auVal3Title: 'Partnership',    auVal3Desc: 'We work as an extension of your marketing team, deeply invested in your success beyond a single campaign transaction.',
  auVal4Title: 'Innovation',     auVal4Desc: 'Continuously pushing the boundaries of what DOOH advertising can achieve through technology, data, and creative excellence.',
  auVal5Title: 'Impact',         auVal5Desc: 'Every campaign is measured against real business outcomes. We hold ourselves accountable to results, not just delivery.',
  auVal6Title: 'Excellence',     auVal6Desc: 'Uncompromising standards across creative execution, technical delivery, and client service — in every market, on every screen.',
  auTeamTitle:  'Our Leadership Team',
  auTeam1Name: 'James Morgan',    auTeam1Role: 'Founder & CEO',           auTeam1Bio: 'Visionary leader with 20+ years in media and advertising technology. Built Influence from a single market to a regional powerhouse.', auTeam1Photo: '',
  auTeam2Name: 'Sarah Chen',      auTeam2Role: 'Chief Strategy Officer',  auTeam2Bio: 'Strategic architect behind campaigns for Fortune 500 brands across 15 markets. Expert in data-driven media planning.', auTeam2Photo: '',
  auTeam3Name: 'Marcus Williams', auTeam3Role: 'Head of Technology',      auTeam3Bio: 'Engineering leader responsible for our proprietary screen management, analytics platform, and real-time monitoring infrastructure.', auTeam3Photo: '',
  auTeam4Name: 'Priya Patel',     auTeam4Role: 'VP Client Success',       auTeam4Bio: 'Dedicated to ensuring every client achieves measurable ROI. Oversees onboarding, campaign delivery, and post-campaign reporting.', auTeam4Photo: '',
  auCtaHeadline: 'Ready to Partner With Us?',
  auCtaSubtext:  'Join the growing list of premium brands that trust Influence Digital Ads to deliver results that matter.',
  auCtaButton:   'Start a Conversation',
};

const CONTENT_FR = {
  navBrand: 'Influence Digital Ads',

  heroBadge:    'AGENCE DE PUBLICITE DIGITALE / SOLUTIONS D\'AFFICHAGE NUMERIQUE',
  heroHeadline: 'Amplifiez la Présence de Votre Marque dans les Lieux à Fort Trafic',
  heroSubtext:  "Élevez votre impact avec des solutions publicitaires numériques ciblées dans les centres commerciaux premium, les aéroports internationaux et les panneaux urbains. Une stratégie axée sur les données pour un affichage haute définition.",
  heroCta1:     'Devis Gratuit',
  heroCta2:     'Explorer Nos Solutions',
  heroStat1Val: '500+', heroStat1Label: 'Écrans',
  heroStat2Val: '50+',  heroStat2Label: 'Emplacements',
  heroStat3Val: '100+', heroStat3Label: 'Campagnes',

  trustedLabel: 'Approuvé par les leaders mondiaux de l\'industrie',

  aboutLabel:      'NOTRE HÉRITAGE',
  aboutHeadline:   'Redéfinir la Présence à l\'Ère Numérique',
  aboutText1:      'Influence Digital Ads est bien plus qu\'un acheteur média. Nous sommes des partenaires stratégiques dans l\'élévation des marques. Notre mission est de combler le fossé entre les marques haut de gamme et leurs publics cibles grâce à des placements premium dans les espaces physiques les plus influents.',
  aboutText2:      'Des monuments emblématiques aux audiences captives des hubs de voyages internationaux, nous livrons précision, transparence et un impact indéniable.',
  aboutYears:      '7+',
  aboutYearsLabel: "Années d'Excellence",
  aboutCta:        'En Savoir Plus Sur Nous',

  solutionsHeadline: 'Solutions Ciblées avec Précision',
  solutionsSubtext:  "Des formats médias diversifiés conçus pour capter l'attention là où elle compte le plus.",

  whyLabel:    "L'AVANTAGE INFLUENCE",
  whyHeadline: 'Une Stratégie Fondée sur la Précision et la Performance',
  whySubtext:  "Nous combinons un inventaire premium avec des analyses rigoureuses pour garantir que chaque impression contribue à votre résultat.",
  why1Title: 'Emplacements Stratégiques', why1Desc: "Des hubs présélectionnés qui garantissent l'alignement avec les données démographiques cibles.",
  why2Title: 'Portée Incomparable',       why2Desc: 'Élargissez votre marque sur les marchés nationaux et internationaux de manière transparente.',
  why3Title: 'Affichages Premium',        why3Desc: 'Un matériel de pointe garantissant que votre marque soit mise en valeur au mieux.',
  why4Title: 'Expertise du Domaine',      why4Desc: "Plus d'une décennie de spécialisation dans le secteur de l'affichage numérique hors domicile (DOOH).",
  why5Title: 'Gestion de A à Z',          why5Desc: "De l'adaptation créative au déploiement technique, nous gérons tout.",
  why6Title: 'Transparence des Données',  why6Desc: "Rapports de performance complets avec des métriques d'impressions vérifiées.",

  metric1Val: '542',  metric1Label: 'Écrans Premium',
  metric2Val: '12M+', metric2Label: 'Impressions Mensuelles',
  metric3Val: '24/7', metric3Label: 'Disponibilité Garantie',
  metric4Val: '100%', metric4Label: 'Transparence',

  processHeadline: "Un Chemin Rationalisé vers l'Impact",
  process1Title: 'Consultation', process1Desc: 'Nous analysons vos objectifs, votre budget et votre public cible pour identifier l\'inventaire idéal.',
  process2Title: 'Planification', process2Desc: 'Un plan média personnalisé est développé avec des sélections d\'écrans spécifiques et des calendriers.',
  process3Title: 'Créatif',       process3Desc: 'Révision des spécifications techniques et adaptation visuelle pour garantir une clarté maximale sur nos affichages.',
  process4Title: 'Lancement',     process4Desc: 'La campagne est lancée avec une surveillance en temps réel et des audits de performance post-campagne.',

  ctaHeadline: 'Prêt à Augmenter la Visibilité de Votre Marque ?',
  ctaSubtext:  "Associez-vous à Influence Digital Ads et placez votre marque au centre des environnements les plus dynamiques du monde.",
  ctaButton:   'Demander un Devis Gratuit',

  formHeadline: 'Obtenir un Devis Gratuit',
  formSubtext:  'Remplissez le formulaire ci-dessous et notre équipe stratégique vous contactera dans les 24 heures.',

  footerDesc:      'Le partenaire leader pour la publicité numérique stratégique dans les emplacements premium mondiaux. Précision. Impact. Influence.',
  footerAddress:   'www.influencedigital-ads.com',
  footerPhone:     '+1 803 295 7599',
  footerEmail:     'info@influencedigital-ads.com',
  footerCopyright: '© 2024 Influence Digital Ads. Tous droits réservés.',

  // Advertising page (FR)
  advBadge:       'Solutions Publicitaires',
  advHeadline:    "Publicité Numérique Hors Domicile Complète",
  advSubtext:     "Des centres commerciaux aux aéroports, nous connectons votre marque aux audiences qui comptent le plus.",
  advAllChannels: 'Tous les Canaux Publicitaires',
  advStat1Val: '542',  advStat1Label: 'Écrans Premium',
  advStat2Val: '12M+', advStat2Label: 'Impressions Mensuelles',
  advStat3Val: '50+',  advStat3Label: 'Emplacements',
  advStat4Val: '100%', advStat4Label: 'Transparence',
  advCtaHeadline: 'Prêt à Élever Votre Marque ?',
  advCtaSubtext:  "Laissez nos experts créer une solution publicitaire personnalisée pour votre entreprise.",
  advCtaButton:   'Obtenir un Devis Gratuit',

  // Our Activities page (FR)
  oaBadge:        'Ce Que Nous Faisons',
  oaHeadline:     'Notre Expertise en Action',
  oaSubtext:      "De la planification stratégique à l'exécution impeccable, nous livrons des résultats mesurables.",
  oaProcessTitle: 'Notre Méthode de Travail',
  oaCapBadge:     'NOS CAPACITÉS',
  oaCapHeadline:  'Capacités Publicitaires Complètes',
  oaCapSubtext:   "Une suite complète de services conçus pour maximiser l'exposition de votre marque.",
  oaWhyBadge:     "L'AVANTAGE INFLUENCE",
  oaWhyHeadline:  'Pourquoi les Grandes Marques Choisissent Influence',
  oaWhySubtext:   "Nous ne sommes pas seulement un acheteur média. Nous sommes un partenaire stratégique.",
  oaCtaHeadline:  'Prêt à Laisser Votre Empreinte ?',
  oaCtaSubtext:   "Associez-vous à Influence Digital Ads et laissez-nous concevoir une campagne qui produit de vrais résultats.",
  oaCtaButton:    'Démarrer Votre Campagne',

  // Our Activities — Process Steps (FR)
  oaStep1Title: 'Consultation',  oaStep1Desc: "Nous commençons par une session approfondie pour comprendre vos objectifs de marque, votre audience cible, vos paramètres budgétaires et votre calendrier de campagne. Chaque stratégie est construite de zéro.",
  oaStep2Title: 'Planification', oaStep2Desc: "Nos planificateurs médias développent une sélection d'inventaire personnalisée avec des identifiants d'écrans spécifiques, des coordonnées de localisation et des données de fréquentation.",
  oaStep3Title: 'Créatif',       oaStep3Desc: "Notre équipe technique examine vos créatifs par rapport aux spécifications d'affichage et conseille sur les formats optimaux pour garantir un impact visuel maximal.",
  oaStep4Title: 'Lancement',     oaStep4Desc: "Votre campagne est lancée avec une gestion de contenu en temps réel et une surveillance du temps de fonctionnement. Après la campagne, vous recevez un rapport de performance vérifié.",

  // Our Activities — Why Items (FR)
  oaWhy1Title: 'Emplacements Stratégiques', oaWhy1Desc: "Des hubs présélectionnés qui garantissent l'alignement avec les données démographiques cibles.",
  oaWhy2Title: 'Portée Incomparable',        oaWhy2Desc: 'Élargissez votre marque sur les marchés nationaux et internationaux de manière transparente.',
  oaWhy3Title: 'Affichages Premium',         oaWhy3Desc: "Un matériel de pointe garantissant que votre marque soit mise en valeur au mieux.",
  oaWhy4Title: 'Expertise du Domaine',       oaWhy4Desc: "Plus d'une décennie de spécialisation dans le secteur de l'affichage numérique hors domicile.",
  oaWhy5Title: 'Gestion de A à Z',           oaWhy5Desc: "De l'adaptation créative au déploiement technique, nous gérons tout.",
  oaWhy6Title: 'Transparence des Données',   oaWhy6Desc: "Rapports de performance complets avec des métriques d'impressions vérifiées.",

  // Contact page (FR)
  contactBadge:          'CONTACTEZ-NOUS',
  contactHeadline:       'Construisons Votre Prochaine Campagne',
  contactSubtext:        'Contactez notre équipe stratégique. Nous répondons dans les 24 heures et vous trouverons la bonne solution publicitaire.',
  contactGetInTouch:     'Prendre Contact',
  contactRequestQuote:   'Demander un Devis Gratuit',
  contactResponseLabel:  'TEMPS DE RÉPONSE',
  contactResponseTime:   '24h',
  contactResponseNote:   "Réponse garantie d'un stratège senior, pas d'un bot.",
  contactInfo1Label:     'Téléphone (US)',      contactInfo1Value: '+1 803 295 7599',
  contactInfo2Label:     'Téléphone (Bamako)', contactInfo2Value: '+223 93 14 14 51',
  contactInfo3Label:     'Téléphone (Dakar)',  contactInfo3Value: '+221 77 234 66 33',
  contactInfo4Label:     'E-mail',             contactInfo4Value: 'info@influencedigital-ads.com',

  // About Us page (FR)
  auBadge:    'NOTRE HISTOIRE',
  auHeadline: "Redéfinir la Présence à l'Ère Numérique",
  auSubtext:  "Fondée avec la mission de connecter les marques premium à leurs audiences à grande échelle, Influence Digital Ads est devenu le partenaire publicitaire numérique hors domicile de référence de la région.",
  auMissionTitle: 'Notre Mission',
  auMissionText:  "Combler le fossé entre les marques haut de gamme et leurs publics cibles grâce à des placements premium dans les espaces physiques les plus influents — offrant précision, transparence et impact indéniable à chaque point de contact.",
  auVisionTitle:  'Notre Vision',
  auVisionText:   "Être le partenaire publicitaire numérique hors domicile le plus fiable sur chaque marché que nous servons — définir la norme pour la publicité extérieure axée sur les données et à fort impact.",
  auValuesTitle:  'Nos Valeurs Fondamentales',
  auVal1Title: 'Précision',      auVal1Desc: "Chaque décision de placement est soutenue par des données vérifiées, non par l'intuition.",
  auVal2Title: 'Transparence',   auVal2Desc: "Visibilité totale sur chaque impression, écran et métrique de campagne. Aucune boîte noire.",
  auVal3Title: 'Partenariat',    auVal3Desc: "Nous travaillons comme une extension de votre équipe marketing, profondément investis dans votre succès.",
  auVal4Title: 'Innovation',     auVal4Desc: "Repousser continuellement les limites de la publicité DOOH grâce à la technologie, aux données et à l'excellence créative.",
  auVal5Title: 'Impact',         auVal5Desc: "Chaque campagne est mesurée par rapport aux résultats commerciaux réels. Nous nous tenons responsables des résultats.",
  auVal6Title: 'Excellence',     auVal6Desc: "Des normes inébranlables en matière d'exécution créative, de livraison technique et de service client.",
  auTeamTitle:  'Notre Équipe de Direction',
  auTeam1Name: 'James Morgan',    auTeam1Role: 'Fondateur & PDG',               auTeam1Bio: "Leader visionnaire avec plus de 20 ans dans les médias et la technologie publicitaire.", auTeam1Photo: '',
  auTeam2Name: 'Sarah Chen',      auTeam2Role: 'Directrice Stratégique',         auTeam2Bio: "Architecte stratégique derrière des campagnes pour des marques Fortune 500 dans 15 marchés.", auTeam2Photo: '',
  auTeam3Name: 'Marcus Williams', auTeam3Role: 'Responsable Technologie',        auTeam3Bio: "Leader en ingénierie responsable de notre plateforme de gestion d'écrans et d'analyse.", auTeam3Photo: '',
  auTeam4Name: 'Priya Patel',     auTeam4Role: 'VP Succès Client',              auTeam4Bio: "Dédiée à garantir que chaque client atteigne un ROI mesurable sur son investissement publicitaire.", auTeam4Photo: '',
  auCtaHeadline: 'Prêt à Vous Associer Avec Nous ?',
  auCtaSubtext:  "Rejoignez la liste croissante de marques premium qui font confiance à Influence Digital Ads pour livrer des résultats qui comptent.",
  auCtaButton:   'Commencer une Conversation',
};

export const DEFAULTS = {
  images: { ...IMAGE_DEFAULTS },
  services: [
    { slug: 'shopping-centers', icon: 'shopping_cart',   title: 'Shopping Centers', tagline: 'Reach Consumers at Prime Shopping Moments',          stat: '200+ Screens',   desc: 'Reach a wide audience every day with strategic locations in shopping centers. Ideal for capturing consumers\' attention at a prime shopping moment.' },
    { slug: 'malls',            icon: 'storefront',      title: 'Malls',            tagline: 'Large Daily Audience in Premium Retail Spaces',       stat: '150+ Locations', desc: 'Benefit from a large daily audience with strategic locations in malls. Ideal for capturing consumers\' attention at a prime shopping moment.' },
    { slug: 'airports',         icon: 'flight_takeoff',  title: 'Airports',         tagline: 'Communicate With Travelers and Professionals',        stat: '12 Airports',    desc: 'Communicate effectively with travelers and air transport professionals. Airports offer significant visibility in transit and waiting areas.' },
    { slug: 'urban-zones',      icon: 'location_city',   title: 'Urban Zones',      tagline: 'High Visibility With a Local and Regular Audience',   stat: '500+ Placements',desc: 'Achieve high visibility with a local and regular audience. Bus stops allow you to reach an urban and mobile public throughout the day.' },
  ],
  content:    CONTENT_EN,
  content_fr: CONTENT_FR,
};

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// ── Sync helpers ──────────────────────────────────────────────────────────────
async function syncToApi(key, val) {
  try { await apiSaveSite(key, val); } catch {}
}

async function loadFromApi(key, fallback) {
  try {
    const val = await apiGetSite(key);
    if (val !== null && val !== undefined) {
      save(`site_${key}`, val);
      return val;
    }
  } catch {}
  return load(`site_${key}`) ?? fallback;
}

// ── Sync reads (used at render time) ─────────────────────────────────────────
export const getImages = () => {
  const s = load('site_images');
  return s ? { ...DEFAULTS.images, ...s } : DEFAULTS.images;
};
export const getServices = () => {
  const s = load('site_services');
  return Array.isArray(s) && s.length > 0 ? s : DEFAULTS.services;
};
export const getContent  = (lang = 'en') => {
  // Migrate old site_content key → site_content_en
  if (lang === 'en' && !load('site_content_en') && load('site_content')) {
    save('site_content_en', load('site_content'));
  }
  const defaults = lang === 'fr' ? CONTENT_FR : CONTENT_EN;
  const stored = load(`site_content_${lang}`);
  const merged = stored && typeof stored === 'object' ? stored : {};
  return { ...defaults, ...merged };
};

// ── Async saves (used by admin panel) ─────────────────────────────────────────
export const saveImages = (val) => {
  save('site_images', val);
  syncToApi('images', val);
};
export const saveServices = (val) => {
  save('site_services', val);
  syncToApi('services', val);
};
export const saveContent = (val, lang = 'en') => {
  save(`site_content_${lang}`, val);
  syncToApi(`content_${lang}`, val);
};

// ── Async loaders — hydrate localStorage from API on app init ────────────────
export const fetchImages   = () => loadFromApi('images',      DEFAULTS.images);
export const fetchServices = () => loadFromApi('services',    DEFAULTS.services);
export const fetchContent  = (lang = 'en') => loadFromApi(
  `content_${lang}`,
  lang === 'fr' ? CONTENT_FR : CONTENT_EN
);

