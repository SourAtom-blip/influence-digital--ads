import { apiGetSite, apiSaveSite } from './api.js';

const HERO_IMG  = '/pexels-edgarcolomba-28288097.jpg';
const ABOUT_IMG = '/pexels-negativespace-34639.jpg';

const CONTENT_EN = {
  navBrand: 'Influence Digital Ads',

  heroBadge:    'Strategic Visibility',
  heroHeadline: 'Amplify Your Brand Presence Across High-Traffic Locations',
  heroSubtext:  'Elevate your impact with precision-targeted digital advertising solutions in premium malls, international airports, and urban billboards. Data-driven strategy meets high-definition display.',
  heroCta1:     'Get Free Quote',
  heroCta2:     'Explore Advertising Solutions',
  heroStat1Val: '500+', heroStat1Label: 'Screens',
  heroStat2Val: '50+',  heroStat2Label: 'Locations',
  heroStat3Val: '100+', heroStat3Label: 'Campaigns',

  trustedLabel: 'Trusted by global industry leaders',

  aboutLabel:      'OUR LEGACY',
  aboutHeadline:   'Redefining Presence in the Digital Age',
  aboutText1:      'Influence Digital Ads is more than a media buyer. We are strategic partners in brand elevation. Our mission is to bridge the gap between high-value brands and their target audiences through premium placements in the most influential physical spaces.',
  aboutText2:      'From iconic city landmarks to the captive audiences of international travel hubs, we deliver precision, transparency, and undeniable impact.',
  aboutYears:      '15+',
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
  footerAddress:   '1200 Avenue of the Americas, New York, NY 10036',
  footerPhone:     '+1 (212) 555-0198',
  footerEmail:     'strategy@influencedigital.com',
  footerCopyright: '© 2024 Influence Digital Ads. All rights reserved.',

  // Advertising page
  advBadge:       'Advertising Solutions',
  advHeadline:    'Comprehensive Digital Out-of-Home Advertising',
  advSubtext:     'From malls to airports, we connect your brand with the audiences that matter most.',
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
  contactInfo1Label:     'Head Office',    contactInfo1Value: '1200 Avenue of the Americas, New York, NY 10036',
  contactInfo2Label:     'Phone',          contactInfo2Value: '+1 (212) 555-0198',
  contactInfo3Label:     'Email',          contactInfo3Value: 'strategy@influencedigital.com',
  contactInfo4Label:     'Business Hours', contactInfo4Value: 'Mon – Fri, 9:00 AM – 6:00 PM EST',

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

  heroBadge:    'Visibilité Stratégique',
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
  aboutYears:      '15+',
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
  footerAddress:   '1200 Avenue of the Americas, New York, NY 10036',
  footerPhone:     '+1 (212) 555-0198',
  footerEmail:     'strategy@influencedigital.com',
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
  contactInfo1Label:     'Siège Social',        contactInfo1Value: '1200 Avenue of the Americas, New York, NY 10036',
  contactInfo2Label:     'Téléphone',           contactInfo2Value: '+1 (212) 555-0198',
  contactInfo3Label:     'E-mail',              contactInfo3Value: 'strategy@influencedigital.com',
  contactInfo4Label:     "Heures d'Ouverture",  contactInfo4Value: 'Lun – Ven, 9h00 – 18h00 EST',

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
  images: {
    hero:  { active: 0, list: [HERO_IMG] },
    about: { active: 0, list: [ABOUT_IMG] },
  },
  brands: [
    { id: '1', name: 'Brand One',   logoUrl: '', siteUrl: '#' },
    { id: '2', name: 'Brand Two',   logoUrl: '', siteUrl: '#' },
    { id: '3', name: 'Brand Three', logoUrl: '', siteUrl: '#' },
    { id: '4', name: 'Brand Four',  logoUrl: '', siteUrl: '#' },
    { id: '5', name: 'Brand Five',  logoUrl: '', siteUrl: '#' },
    { id: '6', name: 'Brand Six',   logoUrl: '', siteUrl: '#' },
  ],
  services: [
    { slug: 'mall-advertising',   icon: 'shopping_bag',       title: 'Mall Advertising',   tagline: 'Reach Shoppers at the Point of Purchase',         stat: '200+ Screens',       desc: 'Connect with shoppers at the point of purchase in high-end retail environments.' },
    { slug: 'airport-displays',   icon: 'flight_takeoff',     title: 'Airport Displays',   tagline: 'Command Attention in International Travel Hubs',  stat: '12 Major Airports',  desc: 'Engage high-net-worth international travelers with premium long-dwell displays.' },
    { slug: 'billboard-networks', icon: 'branding_watermark', title: 'Billboard Networks', tagline: 'Dominate Key Urban Arteries and Highways',         stat: '150+ Billboards',    desc: 'Dominant presence on key urban arteries and highway networks for maximum reach.' },
    { slug: 'led-solutions',      icon: 'lightbulb',          title: 'LED Solutions',      tagline: 'Dynamic Content That Breaks Through the Clutter', stat: '4K Resolution',      desc: 'High-resolution dynamic content that breaks through urban clutter with vibrant clarity.' },
    { slug: 'urban-centers',      icon: 'location_city',      title: 'Urban Centers',      tagline: 'Own the Heart of the City',                       stat: '30+ Districts',      desc: 'Target the heart of the city where business, leisure, and lifestyle intersect.' },
    { slug: 'transit-ads',        icon: 'train',              title: 'Transit Ads',        tagline: 'Move With Your Audience Across the Network',      stat: '500+ Placements',    desc: 'Move with your audience across metro networks, buses, and high-traffic transit hubs.' },
  ],
  capabilities: [
    { id: '1', icon: 'analytics',     title: 'Audience Analytics',      desc: 'We integrate footfall data, mobile movement insights, and demographic profiling to plan placements with surgical precision.' },
    { id: '2', icon: 'monitoring',    title: 'Real-Time Monitoring',    desc: '24/7 screen uptime monitoring with automated alerts ensures your campaign is never down without our knowledge.' },
    { id: '3', icon: 'content_paste', title: 'Content Management',      desc: 'Our proprietary CMS allows instant creative swaps, A/B testing, and daypart scheduling across all screens simultaneously.' },
    { id: '4', icon: 'verified_user', title: 'Proof of Play',           desc: 'Every impression is logged. We provide verifiable play-logs, screen-level reporting, and third-party audience measurement.' },
    { id: '5', icon: 'support_agent', title: 'Dedicated Account Team',  desc: 'A senior strategist and a campaign manager are assigned to every client. One point of contact for the entire relationship.' },
    { id: '6', icon: 'bar_chart',     title: 'Post-Campaign Reporting', desc: 'Comprehensive end-of-campaign reports with reach, frequency, OTS estimates, and brand recall survey options.' },
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
  return (s && s.hero && s.about) ? s : DEFAULTS.images;
};
export const getTrustedBrands = () => {
  const s = load('site_brands');
  return Array.isArray(s) && s.length > 0 ? s : DEFAULTS.brands;
};
export const getServices = () => {
  const s = load('site_services');
  return Array.isArray(s) && s.length > 0 ? s : DEFAULTS.services;
};
export const getCapabilities = () => {
  const s = load('site_capabilities');
  return Array.isArray(s) && s.length > 0 ? s : DEFAULTS.capabilities;
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
export const saveTrustedBrands = (val) => {
  save('site_brands', val);
  syncToApi('brands', val);
};
export const saveCapabilities = (val) => {
  save('site_capabilities', val);
  syncToApi('capabilities', val);
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

export const logVisit = () => {};
