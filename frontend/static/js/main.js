/**
 * Main JavaScript - HSBC Banking App
 * Handles global functionality, animations, and utilities
 */

// ============================================
// TRANSLATION DATA
// ============================================
const translations = {
    en: {
        // Navigation
        'home': 'Home',
        'about': 'About',
        'contact': 'Contact',
        'login': 'Log On',
        'register': 'Register',
        'logout': 'Log Out',
        'dashboard': 'Dashboard',
        'payments': 'Payments',
        'savings': 'Savings',
        'cards': 'Cards',
        'settings': 'Settings',
        'admin': 'Admin',
        'users': 'Users',
        'transactions': 'Transactions',
        'kyc': 'KYC',

        // Footer
        'banking': '🏦 Banking',
        'support': '📚 Support',
        'legal': '⚖️ Legal',
        'contact_us': '📞 Contact',
        'about_us': 'About Us',
        'faq': 'FAQ',
        'help_center': 'Help Center',
        'security': 'Security',
        'privacy': 'Privacy',
        'terms_conditions': 'Terms & Conditions',
        'privacy_policy': 'Privacy Policy',
        'cookie_policy': 'Cookie Policy',

        // Hero
        'hero_badge': '🏆 World-Class Banking Since 1865',
        'hero_title': 'Banking Built for Your Future',
        'hero_subtitle': 'Join millions of customers who trust HSBC for secure, reliable, and innovative banking services. From everyday banking to global investments, we\'re here to help you succeed.',
        'open_account': '🚀 Open Your Account',
        'log_in': '🔐 Log In',
        'go_dashboard': '📊 Go to Dashboard',
        'go_admin': '📊 Go to Admin Panel',

        // Stats
        'customers': 'Customers Worldwide',
        'assets': 'Assets Under Management',
        'countries': 'Countries & Territories',
        'years': 'Years of Trust',

        // Features
        'why_choose': 'Why Choose HSBC?',
        'why_subtitle': 'We combine global strength with local expertise to deliver exceptional banking experiences.',
        'security_title': 'Enterprise-Grade Security',
        'security_desc': 'Your money and data are protected with advanced encryption, real-time fraud detection, and 24/7 monitoring.',
        'reliable_title': 'Fast & Reliable',
        'reliable_desc': 'Most UK payments arrive within minutes. Our systems maintain 99.99% uptime for uninterrupted banking.',
        'global_title': 'Global Reach, Local Touch',
        'global_desc': 'With presence in over 60 countries, we offer international banking with local UK support.',
        'support_title': 'Exceptional Support',
        'support_desc': 'Our UK-based support team is available 24/7 via phone, chat, or in-branch to help you.',
        'digital_title': 'Smart Digital Banking',
        'digital_desc': 'Manage your finances anywhere with our award-winning mobile app and online platform.',
        'innovative_title': 'Innovative Products',
        'innovative_desc': 'From competitive savings rates to flexible mortgages and investment options, we\'ve got you covered.',
        'learn_more': 'Learn More →',

        // Products
        'our_products': 'Our Products',
        'products_subtitle': 'Tailored financial solutions designed to meet your unique needs.',
        'current_accounts': 'Current Accounts',
        'current_desc': 'Everyday banking with contactless payments, direct debits, and 24/7 access.',
        'current_feature_1': 'Free Faster Payments',
        'current_feature_2': 'Contactless Debit Card',
        'current_feature_3': 'Arranged Overdraft',
        'explore_accounts': 'Explore Accounts',
        'savings_title': 'Savings & ISAs',
        'savings_desc': 'Grow your money with competitive interest rates and tax-efficient options.',
        'savings_feature_1': 'Easy Access Savings',
        'savings_feature_2': 'Fixed Rate Bonds',
        'savings_feature_3': 'Cash & Stocks ISAs',
        'start_saving': 'Start Saving',
        'mortgages_title': 'Mortgages & Loans',
        'mortgages_desc': 'Flexible financing solutions for your home, car, or personal needs.',
        'mortgages_feature_1': 'Competitive Rates',
        'mortgages_feature_2': 'Fixed & Variable Terms',
        'mortgages_feature_3': 'Quick Decisions',
        'learn_more_btn': 'Learn More',
        'international_title': 'International Banking',
        'international_desc': 'Send and receive money globally with competitive exchange rates.',
        'international_feature_1': '50+ Currencies',
        'international_feature_2': 'SWIFT Transfers',
        'international_feature_3': 'Competitive Fees',
        'explore': 'Explore',
        'investments_title': 'Investments',
        'investments_desc': 'Build your wealth with professionally managed investment portfolios.',
        'investments_feature_1': 'Managed Portfolios',
        'investments_feature_2': 'Global Equities',
        'investments_feature_3': 'Bond Funds',
        'start_investing': 'Start Investing',
        'business_title': 'Business Banking',
        'business_desc': 'Comprehensive banking solutions for startups, SMEs, and corporations.',
        'business_feature_1': 'Business Accounts',
        'business_feature_2': 'Corporate Banking',
        'business_feature_3': 'Merchant Services',

        // Steps
        'how_it_works': 'How It Works',
        'steps_subtitle': 'Getting started with HSBC is simple and straightforward.',
        'step_1_title': 'Open Your Account',
        'step_1_desc': 'Register online in minutes with your personal details and ID.',
        'step_2_title': 'Verify Your Identity',
        'step_2_desc': 'We\'ll verify your identity quickly and securely.',
        'step_3_title': 'Start Banking',
        'step_3_desc': 'Access your account, make transfers, and manage your finances.',
        'step_4_title': 'Grow Your Wealth',
        'step_4_desc': 'Explore savings, investments, and other financial products.',

        // FAQ
        'faq_title': 'Frequently Asked Questions',
        'faq_subtitle': 'Quick answers to common questions about HSBC banking.',
        'faq_1_q': '🤔 Is my money protected?',
        'faq_1_a': 'Yes! Your eligible deposits are protected by the Financial Services Compensation Scheme (FSCS) up to £85,000 per person, per banking group.',
        'faq_2_q': '🤔 How do I open an account?',
        'faq_2_a': 'Simply click the "Open Your Account" button above, fill in your details, verify your identity, and you\'re ready to go!',
        'faq_3_q': '🤔 How fast are transfers?',
        'faq_3_a': 'Faster Payments usually arrive within seconds or minutes. International SWIFT transfers typically take 1-4 working days depending on the destination.',
        'view_all_faqs': 'View All FAQs →',

        // CTA
        'cta_title': 'Ready to Take Control of Your Finances?',
        'cta_subtitle': 'Join HSBC today and experience world-class banking with security, reliability, and innovation at its best.',
        'cta_trust': '🔒 Your data is secure. Trusted by millions worldwide.',
        'open_now': '🚀 Open Your Account Now',

        // Common
        'welcome_back': 'Welcome back',
        'logged_out': 'Logged out successfully',
        'back_to_home': '← Back to Home',
        'account_active': 'Active',
        'total_balance': 'Total Balance',
        'pending_transactions': 'Pending Transactions',
        'total_transactions': 'Total Transactions',
        'no_transactions': 'No transactions yet',
        'recent_transactions': 'Recent Transactions',
        'quick_actions': 'Quick Actions',
        'send_money': 'Send Money',
        'receive_funds': 'Receive Funds',
        'save_money': 'Save Money',
        'view_history': 'View History',
        'admin_dashboard': 'Admin Dashboard',
        'manage_users': 'Manage Users',
        'manage_transactions': 'Manage Transactions',
        'kyc_reviews': 'KYC Reviews',
        'refresh_data': 'Refresh Data',
        'pending_kyc': 'Pending KYC Applications',
        'no_pending_kyc': 'No pending KYC applications',
        'view_all': 'View All →',
        'id': 'ID',
        'from': 'From',
        'to': 'To',
        'amount': 'Amount',
        'date': 'Date',
        'status': 'Status',
        'actions': 'Actions',
        'approve': 'Approve',
        'reject': 'Reject',
        'pending': 'Pending',
        'approved': 'Approved',
        'rejected': 'Rejected',
        'local': 'Local',
        'international': 'International',
        'total_users': 'Total Users',
        'active_users': 'Active Users',
        'inactive_users': 'Inactive Users',
        'today_transactions': 'Today\'s Transactions',
        'description': 'Description',
        'reference': 'Reference',
        'bank_name': 'Bank Name',
        'account_holder': 'Account Holder',
        'account_number': 'Account Number',
        'bank_country': 'Bank Country',
        'swift_code': 'SWIFT / BIC Code',
        'transfer_type': 'Transfer Type',
        'local_transfer': 'Local Transfer',
        'international_transfer': 'International Transfer',
        'submit_transfer': 'Submit Transfer for Approval',
        'submit_international': '🌍 Submit International Transfer',
        'enter_pin': 'Enter your 6-digit transaction PIN',
        'confirm_pin': 'Confirm with Transaction PIN',
        'invalid_pin': 'Please enter a valid 6-digit PIN',
        'pin_error': 'Invalid PIN. Please try again.',
        'insufficient_balance': 'Insufficient balance',
        'transfer_success': 'Transfer created successfully! Waiting for admin approval.',
        'transfer_failed': 'Transfer failed. Please try again.',
        'network_error': 'Network error. Please try again.',
    },
    es: {
        'home': 'Inicio',
        'about': 'Acerca de',
        'contact': 'Contacto',
        'login': 'Iniciar Sesión',
        'register': 'Registrarse',
        'logout': 'Cerrar Sesión',
        'dashboard': 'Panel',
        'payments': 'Pagos',
        'savings': 'Ahorros',
        'cards': 'Tarjetas',
        'settings': 'Configuración',
        'admin': 'Administrador',
        'users': 'Usuarios',
        'transactions': 'Transacciones',
        'kyc': 'KYC',
        'banking': '🏦 Banca',
        'support': '📚 Soporte',
        'legal': '⚖️ Legal',
        'contact_us': '📞 Contacto',
        'about_us': 'Sobre Nosotros',
        'faq': 'Preguntas Frecuentes',
        'help_center': 'Centro de Ayuda',
        'security': 'Seguridad',
        'privacy': 'Privacidad',
        'terms_conditions': 'Términos y Condiciones',
        'privacy_policy': 'Política de Privacidad',
        'cookie_policy': 'Política de Cookies',
        'hero_badge': '🏆 Banca de Clase Mundial Desde 1865',
        'hero_title': 'Banca Construida para Tu Futuro',
        'hero_subtitle': 'Únete a millones de clientes que confían en HSBC para servicios bancarios seguros, confiables e innovadores. Desde la banca cotidiana hasta inversiones globales, estamos aquí para ayudarte a tener éxito.',
        'open_account': '🚀 Abre Tu Cuenta',
        'log_in': '🔐 Iniciar Sesión',
        'go_dashboard': '📊 Ir al Panel',
        'go_admin': '📊 Ir al Panel de Administración',
        'customers': 'Clientes en Todo el Mundo',
        'assets': 'Activos Bajo Gestión',
        'countries': 'Países y Territorios',
        'years': 'Años de Confianza',
        'why_choose': '¿Por Qué Elegir HSBC?',
        'why_subtitle': 'Combinamos fuerza global con experiencia local para ofrecer experiencias bancarias excepcionales.',
        'security_title': 'Seguridad de Nivel Empresarial',
        'security_desc': 'Tu dinero y datos están protegidos con cifrado avanzado, detección de fraudes en tiempo real y monitoreo 24/7.',
        'reliable_title': 'Rápido y Confiable',
        'reliable_desc': 'La mayoría de los pagos en el Reino Unido llegan en minutos. Nuestros sistemas mantienen un 99.99% de tiempo de actividad.',
        'global_title': 'Alcance Global, Toque Local',
        'global_desc': 'Con presencia en más de 60 países, ofrecemos banca internacional con soporte local del Reino Unido.',
        'support_title': 'Soporte Excepcional',
        'support_desc': 'Nuestro equipo de soporte con sede en el Reino Unido está disponible 24/7 por teléfono, chat o en sucursal.',
        'digital_title': 'Banca Digital Inteligente',
        'digital_desc': 'Gestiona tus finanzas en cualquier lugar con nuestra galardonada aplicación móvil y plataforma en línea.',
        'innovative_title': 'Productos Innovadores',
        'innovative_desc': 'Desde tasas de ahorro competitivas hasta hipotecas flexibles y opciones de inversión, te tenemos cubierto.',
        'learn_more': 'Aprende Más →',
        'our_products': 'Nuestros Productos',
        'products_subtitle': 'Soluciones financieras adaptadas para satisfacer tus necesidades únicas.',
        'current_accounts': 'Cuentas Corrientes',
        'current_desc': 'Banca cotidiana con pagos sin contacto, domiciliaciones y acceso 24/7.',
        'current_feature_1': 'Pagos Más Rápidos Gratuitos',
        'current_feature_2': 'Tarjeta de Débito Sin Contacto',
        'current_feature_3': 'Descubierto Acordado',
        'explore_accounts': 'Explorar Cuentas',
        'savings_title': 'Ahorros e ISAs',
        'savings_desc': 'Haz crecer tu dinero con tasas de interés competitivas y opciones eficientes fiscalmente.',
        'savings_feature_1': 'Ahorros de Fácil Acceso',
        'savings_feature_2': 'Bonos a Tasa Fija',
        'savings_feature_3': 'ISAs en Efectivo y Acciones',
        'start_saving': 'Comenzar a Ahorrar',
        'mortgages_title': 'Hipotecas y Préstamos',
        'mortgages_desc': 'Soluciones de financiamiento flexibles para tu hogar, automóvil o necesidades personales.',
        'mortgages_feature_1': 'Tasas Competitivas',
        'mortgages_feature_2': 'Plazos Fijos y Variables',
        'mortgages_feature_3': 'Decisiones Rápidas',
        'learn_more_btn': 'Aprende Más',
        'international_title': 'Banca Internacional',
        'international_desc': 'Envía y recibe dinero globalmente con tasas de cambio competitivas.',
        'international_feature_1': '50+ Monedas',
        'international_feature_2': 'Transferencias SWIFT',
        'international_feature_3': 'Comisiones Competitivas',
        'explore': 'Explorar',
        'investments_title': 'Inversiones',
        'investments_desc': 'Construye tu riqueza con carteras de inversión gestionadas profesionalmente.',
        'investments_feature_1': 'Carteras Gestionadas',
        'investments_feature_2': 'Acciones Globales',
        'investments_feature_3': 'Fondos de Bonos',
        'start_investing': 'Comenzar a Invertir',
        'business_title': 'Banca Empresarial',
        'business_desc': 'Soluciones bancarias integrales para startups, PYMES y corporaciones.',
        'business_feature_1': 'Cuentas Empresariales',
        'business_feature_2': 'Banca Corporativa',
        'business_feature_3': 'Servicios Comerciales',
        'how_it_works': 'Cómo Funciona',
        'steps_subtitle': 'Comenzar con HSBC es simple y directo.',
        'step_1_title': 'Abre Tu Cuenta',
        'step_1_desc': 'Regístrate en línea en minutos con tus datos personales y documento de identidad.',
        'step_2_title': 'Verifica Tu Identidad',
        'step_2_desc': 'Verificaremos tu identidad de manera rápida y segura.',
        'step_3_title': 'Comienza a Usar la Banca',
        'step_3_desc': 'Accede a tu cuenta, haz transferencias y gestiona tus finanzas.',
        'step_4_title': 'Haz Crecer Tu Riqueza',
        'step_4_desc': 'Explora ahorros, inversiones y otros productos financieros.',
        'faq_title': 'Preguntas Frecuentes',
        'faq_subtitle': 'Respuestas rápidas a preguntas comunes sobre la banca de HSBC.',
        'faq_1_q': '🤔 ¿Está protegido mi dinero?',
        'faq_1_a': '¡Sí! Tus depósitos elegibles están protegidos por el FSCS hasta £85,000 por persona, por grupo bancario.',
        'faq_2_q': '🤔 ¿Cómo abro una cuenta?',
        'faq_2_a': 'Simplemente haz clic en el botón "Abre Tu Cuenta" arriba, completa tus datos, verifica tu identidad y ¡listo!',
        'faq_3_q': '🤔 ¿Qué tan rápidas son las transferencias?',
        'faq_3_a': 'Los Pagos Más Rápidos suelen llegar en segundos o minutos. Las transferencias internacionales SWIFT suelen tardar de 1 a 4 días hábiles.',
        'view_all_faqs': 'Ver Todas las Preguntas Frecuentes →',
        'cta_title': '¿Listo para Tomar el Control de tus Finanzas?',
        'cta_subtitle': 'Únete a HSBC hoy y experimenta la banca de clase mundial con seguridad, confiabilidad e innovación en su máximo nivel.',
        'cta_trust': '🔒 Tus datos están seguros. Confiado por millones en todo el mundo.',
        'open_now': '🚀 Abre Tu Cuenta Ahora',
        'welcome_back': 'Bienvenido de nuevo',
        'logged_out': 'Sesión cerrada exitosamente',
        'back_to_home': '← Volver al Inicio',
        'account_active': 'Activa',
        'total_balance': 'Saldo Total',
        'pending_transactions': 'Transacciones Pendientes',
        'total_transactions': 'Transacciones Totales',
        'no_transactions': 'Aún no hay transacciones',
        'recent_transactions': 'Transacciones Recientes',
        'quick_actions': 'Acciones Rápidas',
        'send_money': 'Enviar Dinero',
        'receive_funds': 'Recibir Fondos',
        'save_money': 'Ahorrar Dinero',
        'view_history': 'Ver Historial',
        'admin_dashboard': 'Panel de Administración',
        'manage_users': 'Gestionar Usuarios',
        'manage_transactions': 'Gestionar Transacciones',
        'kyc_reviews': 'Revisiones KYC',
        'refresh_data': 'Actualizar Datos',
        'pending_kyc': 'Solicitudes KYC Pendientes',
        'no_pending_kyc': 'No hay solicitudes KYC pendientes',
        'view_all': 'Ver Todo →',
        'id': 'ID',
        'from': 'De',
        'to': 'Para',
        'amount': 'Importe',
        'date': 'Fecha',
        'status': 'Estado',
        'actions': 'Acciones',
        'approve': 'Aprobar',
        'reject': 'Rechazar',
        'pending': 'Pendiente',
        'approved': 'Aprobado',
        'rejected': 'Rechazado',
        'local': 'Local',
        'international': 'Internacional',
        'total_users': 'Usuarios Totales',
        'active_users': 'Usuarios Activos',
        'inactive_users': 'Usuarios Inactivos',
        'today_transactions': 'Transacciones de Hoy',
        'description': 'Descripción',
        'reference': 'Referencia',
        'bank_name': 'Nombre del Banco',
        'account_holder': 'Titular de la Cuenta',
        'account_number': 'Número de Cuenta',
        'bank_country': 'País del Banco',
        'swift_code': 'Código SWIFT / BIC',
        'transfer_type': 'Tipo de Transferencia',
        'local_transfer': 'Transferencia Local',
        'international_transfer': 'Transferencia Internacional',
        'submit_transfer': 'Enviar Transferencia para Aprobación',
        'submit_international': '🌍 Enviar Transferencia Internacional',
        'enter_pin': 'Ingresa tu PIN de 6 dígitos',
        'confirm_pin': 'Confirmar con PIN de Transacción',
        'invalid_pin': 'Ingresa un PIN válido de 6 dígitos',
        'pin_error': 'PIN inválido. Intenta de nuevo.',
        'insufficient_balance': 'Saldo insuficiente',
        'transfer_success': '¡Transferencia creada exitosamente! Esperando aprobación del administrador.',
        'transfer_failed': 'Transferencia fallida. Intenta de nuevo.',
        'network_error': 'Error de red. Intenta de nuevo.',
    },
    fr: {
        'home': 'Accueil',
        'about': 'À propos',
        'contact': 'Contact',
        'login': 'Se Connecter',
        'register': "S'inscrire",
        'logout': 'Se Déconnecter',
        'dashboard': 'Tableau de Bord',
        'payments': 'Paiements',
        'savings': 'Épargne',
        'cards': 'Cartes',
        'settings': 'Paramètres',
        'admin': 'Administrateur',
        'users': 'Utilisateurs',
        'transactions': 'Transactions',
        'kyc': 'KYC',
        'banking': '🏦 Banque',
        'support': '📚 Support',
        'legal': '⚖️ Juridique',
        'contact_us': '📞 Contact',
        'about_us': 'À Propos de Nous',
        'faq': 'FAQ',
        'help_center': "Centre d'Aide",
        'security': 'Sécurité',
        'privacy': 'Confidentialité',
        'terms_conditions': "Conditions d'Utilisation",
        'privacy_policy': 'Politique de Confidentialité',
        'cookie_policy': 'Politique des Cookies',
        'hero_badge': '🏆 Banque de Classe Mondiale Depuis 1865',
        'hero_title': 'La Banque Construite pour Votre Avenir',
        'hero_subtitle': "Rejoignez des millions de clients qui font confiance à HSBC pour des services bancaires sécurisés, fiables et innovants. De la banque quotidienne aux investissements mondiaux, nous sommes là pour vous aider à réussir.",
        'open_account': '🚀 Ouvrez Votre Compte',
        'log_in': '🔐 Se Connecter',
        'go_dashboard': '📊 Aller au Tableau de Bord',
        'go_admin': "📊 Aller au Panneau d'Administration",
        'customers': 'Clients dans le Monde',
        'assets': "Actifs Sous Gestion",
        'countries': 'Pays et Territoires',
        'years': "Années de Confiance",
        'why_choose': "Pourquoi Choisir HSBC?",
        'why_subtitle': "Nous combinons la force mondiale avec l'expertise locale pour offrir des expériences bancaires exceptionnelles.",
        'security_title': 'Sécurité de Niveau Entreprise',
        'security_desc': 'Votre argent et vos données sont protégés par un cryptage avancé, une détection des fraudes en temps réel et une surveillance 24/7.',
        'reliable_title': 'Rapide et Fiable',
        'reliable_desc': "La plupart des paiements au Royaume-Uni arrivent en quelques minutes. Nos systèmes maintiennent une disponibilité de 99,99%.",
        'global_title': 'Portée Mondiale, Touche Locale',
        'global_desc': "Avec une présence dans plus de 60 pays, nous offrons des services bancaires internationaux avec un soutien local au Royaume-Uni.",
        'support_title': 'Support Exceptionnel',
        'support_desc': "Notre équipe de support basée au Royaume-Uni est disponible 24/7 par téléphone, chat ou en agence.",
        'digital_title': 'Banque Numérique Intelligente',
        'digital_desc': 'Gérez vos finances n\'importe où avec notre application mobile primée et notre plateforme en ligne.',
        'innovative_title': 'Produits Innovants',
        'innovative_desc': "Des taux d'épargne compétitifs aux hypothèques flexibles et options d'investissement, nous avons tout ce qu'il vous faut.",
        'learn_more': 'En Savoir Plus →',
        'our_products': 'Nos Produits',
        'products_subtitle': 'Des solutions financières adaptées à vos besoins uniques.',
        'current_accounts': 'Comptes Courants',
        'current_desc': "Banque quotidienne avec paiements sans contact, prélèvements automatiques et accès 24/7.",
        'current_feature_1': 'Paiements Plus Rapides Gratuits',
        'current_feature_2': 'Carte de Débit Sans Contact',
        'current_feature_3': 'Découvert Convenu',
        'explore_accounts': 'Explorer les Comptes',
        'savings_title': 'Épargne et ISAs',
        'savings_desc': "Faites fructifier votre argent avec des taux d'intérêt compétitifs et des options fiscalement efficaces.",
        'savings_feature_1': "Épargne à Accès Facile",
        'savings_feature_2': 'Obligations à Taux Fixe',
        'savings_feature_3': 'ISAs en Espèces et en Actions',
        'start_saving': "Commencer à Épargner",
        'mortgages_title': 'Hypothèques et Prêts',
        'mortgages_desc': 'Des solutions de financement flexibles pour votre maison, votre voiture ou vos besoins personnels.',
        'mortgages_feature_1': 'Taux Compétitifs',
        'mortgages_feature_2': 'Durées Fixes et Variables',
        'mortgages_feature_3': 'Décisions Rapides',
        'learn_more_btn': 'En Savoir Plus',
        'international_title': 'Banque Internationale',
        'international_desc': 'Envoyez et recevez de l\'argent dans le monde entier avec des taux de change compétitifs.',
        'international_feature_1': '50+ Devises',
        'international_feature_2': 'Transferts SWIFT',
        'international_feature_3': 'Frais Compétitifs',
        'explore': 'Explorer',
        'investments_title': 'Investissements',
        'investments_desc': 'Construisez votre patrimoine avec des portefeuilles d\'investissement gérés professionnellement.',
        'investments_feature_1': 'Portefeuilles Gérés',
        'investments_feature_2': 'Actions Mondiales',
        'investments_feature_3': 'Fonds Obligataires',
        'start_investing': "Commencer à Investir",
        'business_title': 'Banque d\'Entreprise',
        'business_desc': 'Des solutions bancaires complètes pour les startups, les PME et les grandes entreprises.',
        'business_feature_1': 'Comptes Professionnels',
        'business_feature_2': 'Banque d\'Entreprise',
        'business_feature_3': 'Services Commerciaux',
        'how_it_works': 'Comment Ça Marche',
        'steps_subtitle': 'Commencer avec HSBC est simple et direct.',
        'step_1_title': 'Ouvrez Votre Compte',
        'step_1_desc': 'Inscrivez-vous en ligne en quelques minutes avec vos coordonnées et votre pièce d\'identité.',
        'step_2_title': 'Vérifiez Votre Identité',
        'step_2_desc': 'Nous vérifierons votre identité rapidement et en toute sécurité.',
        'step_3_title': 'Commencez à Utiliser la Banque',
        'step_3_desc': 'Accédez à votre compte, effectuez des transferts et gérez vos finances.',
        'step_4_title': 'Faites Croître Votre Patrimoine',
        'step_4_desc': 'Explorez l\'épargne, les investissements et d\'autres produits financiers.',
        'faq_title': 'Questions Fréquemment Posées',
        'faq_subtitle': 'Des réponses rapides aux questions courantes sur la banque HSBC.',
        'faq_1_q': '🤔 Mon argent est-il protégé?',
        'faq_1_a': 'Oui! Vos dépôts éligibles sont protégés par le FSCS jusqu\'à £85,000 par personne, par groupe bancaire.',
        'faq_2_q': '🤔 Comment ouvrir un compte?',
        'faq_2_a': 'Cliquez simplement sur le bouton "Ouvrez Votre Compte" ci-dessus, remplissez vos coordonnées, vérifiez votre identité et c\'est parti!',
        'faq_3_q': '🤔 Les transferts sont-ils rapides?',
        'faq_3_a': 'Les paiements plus rapides arrivent généralement en quelques secondes ou minutes. Les transferts internationaux SWIFT prennent généralement 1 à 4 jours ouvrables.',
        'view_all_faqs': 'Voir Toutes les FAQ →',
        'cta_title': 'Prêt à Prendre le Contrôle de Vos Finances?',
        'cta_subtitle': 'Rejoignez HSBC aujourd\'hui et découvrez une banque de classe mondiale avec sécurité, fiabilité et innovation au meilleur niveau.',
        'cta_trust': '🔒 Vos données sont sécurisées. Confiance de millions de personnes dans le monde.',
        'open_now': '🚀 Ouvrez Votre Compte Maintenant',
        'welcome_back': 'Bon retour',
        'logged_out': 'Déconnexion réussie',
        'back_to_home': '← Retour à l\'Accueil',
        'account_active': 'Active',
        'total_balance': 'Solde Total',
        'pending_transactions': 'Transactions en Attente',
        'total_transactions': 'Transactions Totales',
        'no_transactions': 'Aucune transaction pour le moment',
        'recent_transactions': 'Transactions Récentes',
        'quick_actions': 'Actions Rapides',
        'send_money': 'Envoyer de l\'Argent',
        'receive_funds': 'Recevoir des Fonds',
        'save_money': 'Économiser de l\'Argent',
        'view_history': 'Voir l\'Historique',
        'admin_dashboard': "Tableau de Bord Administrateur",
        'manage_users': 'Gérer les Utilisateurs',
        'manage_transactions': 'Gérer les Transactions',
        'kyc_reviews': 'Révisions KYC',
        'refresh_data': 'Actualiser les Données',
        'pending_kyc': 'Demandes KYC en Attente',
        'no_pending_kyc': 'Aucune demande KYC en attente',
        'view_all': 'Voir Tout →',
        'id': 'ID',
        'from': 'De',
        'to': 'À',
        'amount': 'Montant',
        'date': 'Date',
        'status': 'Statut',
        'actions': 'Actions',
        'approve': 'Approuver',
        'reject': 'Rejeter',
        'pending': 'En Attente',
        'approved': 'Approuvé',
        'rejected': 'Rejeté',
        'local': 'Local',
        'international': 'International',
        'total_users': 'Utilisateurs Totaux',
        'active_users': 'Utilisateurs Actifs',
        'inactive_users': 'Utilisateurs Inactifs',
        'today_transactions': 'Transactions d\'Aujourd\'hui',
        'description': 'Description',
        'reference': 'Référence',
        'bank_name': 'Nom de la Banque',
        'account_holder': 'Titulaire du Compte',
        'account_number': 'Numéro de Compte',
        'bank_country': 'Pays de la Banque',
        'swift_code': 'Code SWIFT / BIC',
        'transfer_type': 'Type de Transfert',
        'local_transfer': 'Transfert Local',
        'international_transfer': 'Transfert International',
        'submit_transfer': 'Soumettre le Transfert pour Approbation',
        'submit_international': '🌍 Soumettre un Transfert International',
        'enter_pin': 'Entrez votre code PIN à 6 chiffres',
        'confirm_pin': 'Confirmer avec le PIN de Transaction',
        'invalid_pin': 'Veuillez entrer un PIN valide à 6 chiffres',
        'pin_error': 'PIN invalide. Veuillez réessayer.',
        'insufficient_balance': 'Solde insuffisant',
        'transfer_success': 'Transfert créé avec succès! En attente d\'approbation.',
        'transfer_failed': 'Le transfert a échoué. Veuillez réessayer.',
        'network_error': 'Erreur réseau. Veuillez réessayer.',
    },
    de: {
        'home': 'Startseite',
        'about': 'Über uns',
        'contact': 'Kontakt',
        'login': 'Anmelden',
        'register': 'Registrieren',
        'logout': 'Abmelden',
        'dashboard': 'Dashboard',
        'payments': 'Zahlungen',
        'savings': 'Sparen',
        'cards': 'Karten',
        'settings': 'Einstellungen',
        'admin': 'Administrator',
        'users': 'Benutzer',
        'transactions': 'Transaktionen',
        'kyc': 'KYC',
        'banking': '🏦 Bankwesen',
        'support': '📚 Support',
        'legal': '⚖️ Rechtliches',
        'contact_us': '📞 Kontakt',
        'about_us': 'Über Uns',
        'faq': 'FAQ',
        'help_center': 'Hilfezentrum',
        'security': 'Sicherheit',
        'privacy': 'Datenschutz',
        'terms_conditions': 'AGB',
        'privacy_policy': 'Datenschutzerklärung',
        'cookie_policy': 'Cookie-Richtlinie',
        'hero_badge': '🏆 Weltklasse-Banking Seit 1865',
        'hero_title': 'Banking für Ihre Zukunft',
        'hero_subtitle': 'Schließen Sie sich Millionen von Kunden an, die HSBC für sichere, zuverlässige und innovative Bankdienstleistungen vertrauen. Vom täglichen Banking bis zu globalen Investitionen - wir sind da, um Ihnen zum Erfolg zu verhelfen.',
        'open_account': '🚀 Konto Eröffnen',
        'log_in': '🔐 Anmelden',
        'go_dashboard': '📊 Zum Dashboard',
        'go_admin': '📊 Zum Admin-Panel',
        'customers': 'Kunden Weltweit',
        'assets': 'Verwaltetes Vermögen',
        'countries': 'Länder & Gebiete',
        'years': 'Jahre Vertrauen',
        'why_choose': 'Warum HSBC?',
        'why_subtitle': 'Wir verbinden globale Stärke mit lokaler Expertise, um außergewöhnliche Bankerlebnisse zu bieten.',
        'security_title': 'Sicherheit auf Unternehmensniveau',
        'security_desc': 'Ihr Geld und Ihre Daten sind durch fortschrittliche Verschlüsselung, Echtzeit-Betrugserkennung und 24/7-Überwachung geschützt.',
        'reliable_title': 'Schnell & Zuverlässig',
        'reliable_desc': 'Die meisten Zahlungen im Vereinigten Königreich kommen innerhalb weniger Minuten an. Unsere Systeme haben eine Verfügbarkeit von 99,99%.',
        'global_title': 'Globale Reichweite, Lokaler Touch',
        'global_desc': 'Mit Präsenz in über 60 Ländern bieten wir internationales Banking mit lokaler Unterstützung im Vereinigten Königreich.',
        'support_title': 'Außergewöhnlicher Support',
        'support_desc': 'Unser in Großbritannien ansässiges Support-Team ist rund um die Uhr telefonisch, per Chat oder in der Filiale für Sie da.',
        'digital_title': 'Intelligentes Digitales Banking',
        'digital_desc': 'Verwalten Sie Ihre Finanzen überall mit unserer preisgekrönten mobilen App und Online-Plattform.',
        'innovative_title': 'Innovative Produkte',
        'innovative_desc': 'Von wettbewerbsfähigen Sparzinsen bis zu flexiblen Hypotheken und Anlageoptionen - wir haben alles für Sie.',
        'learn_more': 'Mehr Erfahren →',
        'our_products': 'Unsere Produkte',
        'products_subtitle': 'Maßgeschneiderte Finanzlösungen für Ihre individuellen Bedürfnisse.',
        'current_accounts': 'Girokonten',
        'current_desc': 'Tägliches Banking mit kontaktlosen Zahlungen, Lastschriften und 24/7-Zugang.',
        'current_feature_1': 'Kostenlose Schnellzahlungen',
        'current_feature_2': 'Kontaktlose Debitkarte',
        'current_feature_3': 'Vereinbarter Überziehungskredit',
        'explore_accounts': 'Konten Entdecken',
        'savings_title': 'Sparen & ISAs',
        'savings_desc': 'Vermehren Sie Ihr Geld mit wettbewerbsfähigen Zinssätzen und steuereffizienten Optionen.',
        'savings_feature_1': 'Sparmöglichkeiten mit leichtem Zugang',
        'savings_feature_2': 'Festverzinsliche Anleihen',
        'savings_feature_3': 'Bargeld- & Aktien-ISAs',
        'start_saving': 'Mit Sparen Beginnen',
        'mortgages_title': 'Hypotheken & Kredite',
        'mortgages_desc': 'Flexible Finanzierungslösungen für Ihr Zuhause, Ihr Auto oder Ihre persönlichen Bedürfnisse.',
        'mortgages_feature_1': 'Wettbewerbsfähige Zinssätze',
        'mortgages_feature_2': 'Feste & Variable Laufzeiten',
        'mortgages_feature_3': 'Schnelle Entscheidungen',
        'learn_more_btn': 'Mehr Erfahren',
        'international_title': 'Internationales Banking',
        'international_desc': 'Senden und empfangen Sie Geld weltweit mit wettbewerbsfähigen Wechselkursen.',
        'international_feature_1': '50+ Währungen',
        'international_feature_2': 'SWIFT-Überweisungen',
        'international_feature_3': 'Wettbewerbsfähige Gebühren',
        'explore': 'Entdecken',
        'investments_title': 'Investitionen',
        'investments_desc': 'Bauen Sie Ihr Vermögen mit professionell verwalteten Anlageportfolios auf.',
        'investments_feature_1': 'Verwaltete Portfolios',
        'investments_feature_2': 'Globale Aktien',
        'investments_feature_3': 'Anleihefonds',
        'start_investing': 'Mit Investieren Beginnen',
        'business_title': 'Geschäftsbanking',
        'business_desc': 'Umfassende Banklösungen für Startups, KMU und Unternehmen.',
        'business_feature_1': 'Geschäftskonten',
        'business_feature_2': 'Firmenkundenbanking',
        'business_feature_3': 'Händlerdienste',
        'how_it_works': 'So Funktioniert es',
        'steps_subtitle': 'Der Einstieg bei HSBC ist einfach und unkompliziert.',
        'step_1_title': 'Konto Eröffnen',
        'step_1_desc': 'Registrieren Sie sich in wenigen Minuten online mit Ihren persönlichen Daten und Ihrem Ausweis.',
        'step_2_title': 'Identität Prüfen',
        'step_2_desc': 'Wir prüfen Ihre Identität schnell und sicher.',
        'step_3_title': 'Banking Starten',
        'step_3_desc': 'Greifen Sie auf Ihr Konto zu, tätigen Sie Überweisungen und verwalten Sie Ihre Finanzen.',
        'step_4_title': 'Vermögen Aufbauen',
        'step_4_desc': 'Entdecken Sie Spar-, Investitions- und andere Finanzprodukte.',
        'faq_title': 'Häufig Gestellte Fragen',
        'faq_subtitle': 'Schnelle Antworten auf häufige Fragen zum HSBC-Banking.',
        'faq_1_q': '🤔 Ist mein Geld geschützt?',
        'faq_1_a': 'Ja! Ihre förderfähigen Einlagen sind durch das FSCS bis zu £85,000 pro Person und Bankgruppe geschützt.',
        'faq_2_q': '🤔 Wie eröffne ich ein Konto?',
        'faq_2_a': 'Klicken Sie einfach auf den Button "Konto Eröffnen" oben, füllen Sie Ihre Daten aus, bestätigen Sie Ihre Identität und schon kann es losgehen!',
        'faq_3_q': '🤔 Wie schnell sind Überweisungen?',
        'faq_3_a': 'Schnellzahlungen kommen in der Regel innerhalb von Sekunden oder Minuten an. Internationale SWIFT-Überweisungen dauern je nach Ziel 1-4 Werktage.',
        'view_all_faqs': 'Alle FAQs Anzeigen →',
        'cta_title': 'Bereit, die Kontrolle über Ihre Finanzen zu übernehmen?',
        'cta_subtitle': 'Werden Sie noch heute HSBC-Kunde und erleben Sie erstklassiges Banking mit Sicherheit, Zuverlässigkeit und Innovation.',
        'cta_trust': '🔒 Ihre Daten sind sicher. Vertrauen von Millionen weltweit.',
        'open_now': '🚀 Jetzt Konto Eröffnen',
        'welcome_back': 'Willkommen zurück',
        'logged_out': 'Erfolgreich abgemeldet',
        'back_to_home': '← Zurück zur Startseite',
        'account_active': 'Aktiv',
        'total_balance': 'Gesamtguthaben',
        'pending_transactions': 'Ausstehende Transaktionen',
        'total_transactions': 'Transaktionen Gesamt',
        'no_transactions': 'Noch keine Transaktionen',
        'recent_transactions': 'Letzte Transaktionen',
        'quick_actions': 'Schnellaktionen',
        'send_money': 'Geld Senden',
        'receive_funds': 'Geld Empfangen',
        'save_money': 'Geld Sparen',
        'view_history': 'Verlauf Anzeigen',
        'admin_dashboard': 'Admin-Dashboard',
        'manage_users': 'Benutzer Verwalten',
        'manage_transactions': 'Transaktionen Verwalten',
        'kyc_reviews': 'KYC-Prüfungen',
        'refresh_data': 'Daten Aktualisieren',
        'pending_kyc': 'Ausstehende KYC-Anträge',
        'no_pending_kyc': 'Keine ausstehenden KYC-Anträge',
        'view_all': 'Alle Anzeigen →',
        'id': 'ID',
        'from': 'Von',
        'to': 'An',
        'amount': 'Betrag',
        'date': 'Datum',
        'status': 'Status',
        'actions': 'Aktionen',
        'approve': 'Genehmigen',
        'reject': 'Ablehnen',
        'pending': 'Ausstehend',
        'approved': 'Genehmigt',
        'rejected': 'Abgelehnt',
        'local': 'Lokal',
        'international': 'International',
        'total_users': 'Benutzer Gesamt',
        'active_users': 'Aktive Benutzer',
        'inactive_users': 'Inaktive Benutzer',
        'today_transactions': 'Heutige Transaktionen',
        'description': 'Beschreibung',
        'reference': 'Referenz',
        'bank_name': 'Bankname',
        'account_holder': 'Kontoinhaber',
        'account_number': 'Kontonummer',
        'bank_country': 'Bankland',
        'swift_code': 'SWIFT / BIC-Code',
        'transfer_type': 'Überweisungsart',
        'local_transfer': 'Lokale Überweisung',
        'international_transfer': 'Internationale Überweisung',
        'submit_transfer': 'Überweisung zur Genehmigung einreichen',
        'submit_international': '🌍 Internationale Überweisung einreichen',
        'enter_pin': 'Geben Sie Ihre 6-stellige PIN ein',
        'confirm_pin': 'Mit Transaktions-PIN bestätigen',
        'invalid_pin': 'Bitte geben Sie eine gültige 6-stellige PIN ein',
        'pin_error': 'Ungültige PIN. Bitte versuchen Sie es erneut.',
        'insufficient_balance': 'Unzureichendes Guthaben',
        'transfer_success': 'Überweisung erfolgreich erstellt! Warte auf Admin-Genehmigung.',
        'transfer_failed': 'Überweisung fehlgeschlagen. Bitte versuchen Sie es erneut.',
        'network_error': 'Netzwerkfehler. Bitte versuchen Sie es erneut.',
    },
    ko: {
        'home': '홈',
        'about': '소개',
        'contact': '연락처',
        'login': '로그인',
        'register': '회원가입',
        'logout': '로그아웃',
        'dashboard': '대시보드',
        'payments': '결제',
        'savings': '저축',
        'cards': '카드',
        'settings': '설정',
        'admin': '관리자',
        'users': '사용자',
        'transactions': '거래',
        'kyc': 'KYC',
        'banking': '🏦 뱅킹',
        'support': '📚 지원',
        'legal': '⚖️ 법률',
        'contact_us': '📞 연락처',
        'about_us': '회사 소개',
        'faq': '자주 묻는 질문',
        'help_center': '도움말 센터',
        'security': '보안',
        'privacy': '개인정보',
        'terms_conditions': '이용약관',
        'privacy_policy': '개인정보처리방침',
        'cookie_policy': '쿠키 정책',
        'hero_badge': '🏆 1865년 이래 세계적 수준의 뱅킹',
        'hero_title': '당신의 미래를 위한 뱅킹',
        'hero_subtitle': '안전하고 신뢰할 수 있으며 혁신적인 뱅킹 서비스를 위해 HSBC를 신뢰하는 수백만 고객에 합류하세요. 일상적인 뱅킹부터 글로벌 투자까지, 우리는 당신의 성공을 돕기 위해 여기 있습니다.',
        'open_account': '🚀 계좌 개설',
        'log_in': '🔐 로그인',
        'go_dashboard': '📊 대시보드로 이동',
        'go_admin': '📊 관리자 패널로 이동',
        'customers': '전 세계 고객',
        'assets': '관리 자산',
        'countries': '국가 및 지역',
        'years': '신뢰의 년수',
        'why_choose': 'HSBC를 선택해야 하는 이유',
        'why_subtitle': '글로벌 강점과 현지 전문성을 결합하여 탁월한 뱅킹 경험을 제공합니다.',
        'security_title': '기업 수준의 보안',
        'security_desc': '귀하의 돈과 데이터는 고급 암호화, 실시간 사기 탐지 및 24/7 모니터링으로 보호됩니다.',
        'reliable_title': '빠르고 신뢰할 수 있음',
        'reliable_desc': '대부분의 영국 결제는 몇 분 내에 도착합니다. 우리 시스템은 99.99%의 가동 시간을 유지합니다.',
        'global_title': '글로벌 도달, 현지 터치',
        'global_desc': '60개 이상의 국가에 진출하여 영국 현지 지원과 함께 국제 뱅킹을 제공합니다.',
        'support_title': '탁월한 지원',
        'support_desc': '영국에 기반을 둔 지원 팀이 전화, 채팅 또는 지점 방문을 통해 24/7 이용 가능합니다.',
        'digital_title': '스마트 디지털 뱅킹',
        'digital_desc': '수상 경력에 빛나는 모바일 앱과 온라인 플랫폼으로 어디서나 재정을 관리하세요.',
        'innovative_title': '혁신적인 상품',
        'innovative_desc': '경쟁력 있는 저축 금리부터 유연한 주택담보대출 및 투자 옵션까지, 모든 것을 제공합니다.',
        'learn_more': '자세히 알아보기 →',
        'our_products': '우리의 상품',
        'products_subtitle': '고객의 고유한 요구를 충족시키기 위해 맞춤화된 금융 솔루션.',
        'current_accounts': '당좌 계좌',
        'current_desc': '비접촉 결제, 자동이체 및 24/7 액세스를 통한 일상 뱅킹.',
        'current_feature_1': '무료 빠른 결제',
        'current_feature_2': '비접촉 직불 카드',
        'current_feature_3': '약정된 초과인출',
        'explore_accounts': '계좌 살펴보기',
        'savings_title': '저축 및 ISA',
        'savings_desc': '경쟁력 있는 이자율과 세금 효율적인 옵션으로 돈을 불리세요.',
        'savings_feature_1': '쉬운 접근 저축',
        'savings_feature_2': '고정 금리 채권',
        'savings_feature_3': '현금 및 주식 ISA',
        'start_saving': '저축 시작하기',
        'mortgages_title': '주택담보대출 및 대출',
        'mortgages_desc': '주택, 자동차 또는 개인 필요에 맞는 유연한 금융 솔루션.',
        'mortgages_feature_1': '경쟁력 있는 금리',
        'mortgages_feature_2': '고정 및 변동 조건',
        'mortgages_feature_3': '신속한 결정',
        'learn_more_btn': '자세히 알아보기',
        'international_title': '국제 뱅킹',
        'international_desc': '경쟁력 있는 환율로 전 세계적으로 송금 및 수취하세요.',
        'international_feature_1': '50개 이상의 통화',
        'international_feature_2': 'SWIFT 송금',
        'international_feature_3': '경쟁력 있는 수수료',
        'explore': '살펴보기',
        'investments_title': '투자',
        'investments_desc': '전문적으로 관리되는 투자 포트폴리오로 자산을 구축하세요.',
        'investments_feature_1': '관리형 포트폴리오',
        'investments_feature_2': '글로벌 주식',
        'investments_feature_3': '채권 펀드',
        'start_investing': '투자 시작하기',
        'business_title': '기업 뱅킹',
        'business_desc': '스타트업, 중소기업 및 기업을 위한 종합 뱅킹 솔루션.',
        'business_feature_1': '사업자 계좌',
        'business_feature_2': '기업 뱅킹',
        'business_feature_3': '가맹점 서비스',
        'how_it_works': '이용 방법',
        'steps_subtitle': 'HSBC 시작은 간단하고 직관적입니다.',
        'step_1_title': '계좌 개설',
        'step_1_desc': '개인 정보와 신분증으로 몇 분 안에 온라인으로 등록하세요.',
        'step_2_title': '신원 확인',
        'step_2_desc': '신원을 빠르고 안전하게 확인합니다.',
        'step_3_title': '뱅킹 시작',
        'step_3_desc': '계좌에 접속하여 송금하고 재정을 관리하세요.',
        'step_4_title': '자산 증대',
        'step_4_desc': '저축, 투자 및 기타 금융 상품을 살펴보세요.',
        'faq_title': '자주 묻는 질문',
        'faq_subtitle': 'HSBC 뱅킹에 대한 일반적인 질문에 대한 빠른 답변.',
        'faq_1_q': '🤔 내 돈은 보호받나요?',
        'faq_1_a': '네! 귀하의 적격 예금은 금융서비스보상제도(FSCS)에 의해 1인당, 은행 그룹당 최대 £85,000까지 보호됩니다.',
        'faq_2_q': '🤔 계좌는 어떻게 개설하나요?',
        'faq_2_a': '위의 "계좌 개설" 버튼을 클릭하고, 정보를 입력하고, 신원을 확인하면 바로 시작할 수 있습니다!',
        'faq_3_q': '🤔 송금은 얼마나 빠른가요?',
        'faq_3_a': '빠른 결제는 보통 몇 초에서 몇 분 내에 도착합니다. 국제 SWIFT 송금은 목적지에 따라 1-4 영업일이 소요됩니다.',
        'view_all_faqs': '모든 FAQ 보기 →',
        'cta_title': '재정 관리를 시작할 준비가 되셨나요?',
        'cta_subtitle': '지금 HSBC에 가입하고 안전성, 신뢰성, 혁신성을 갖춘 세계적 수준의 뱅킹을 경험하세요.',
        'cta_trust': '🔒 귀하의 데이터는 안전합니다. 전 세계 수백만 명이 신뢰합니다.',
        'open_now': '🚀 지금 계좌 개설',
        'welcome_back': '다시 오신 것을 환영합니다',
        'logged_out': '성공적으로 로그아웃되었습니다',
        'back_to_home': '← 홈으로 돌아가기',
        'account_active': '활성',
        'total_balance': '총 잔액',
        'pending_transactions': '보류 중인 거래',
        'total_transactions': '총 거래',
        'no_transactions': '아직 거래가 없습니다',
        'recent_transactions': '최근 거래',
        'quick_actions': '빠른 작업',
        'send_money': '송금',
        'receive_funds': '자금 수령',
        'save_money': '저축',
        'view_history': '내역 보기',
        'admin_dashboard': '관리자 대시보드',
        'manage_users': '사용자 관리',
        'manage_transactions': '거래 관리',
        'kyc_reviews': 'KYC 검토',
        'refresh_data': '데이터 새로고침',
        'pending_kyc': '보류 중인 KYC 신청',
        'no_pending_kyc': '보류 중인 KYC 신청이 없습니다',
        'view_all': '모두 보기 →',
        'id': 'ID',
        'from': '보낸 사람',
        'to': '받는 사람',
        'amount': '금액',
        'date': '날짜',
        'status': '상태',
        'actions': '작업',
        'approve': '승인',
        'reject': '거절',
        'pending': '보류 중',
        'approved': '승인됨',
        'rejected': '거절됨',
        'local': '국내',
        'international': '국제',
        'total_users': '총 사용자',
        'active_users': '활성 사용자',
        'inactive_users': '비활성 사용자',
        'today_transactions': '오늘의 거래',
        'description': '설명',
        'reference': '참조',
        'bank_name': '은행 이름',
        'account_holder': '계좌 소유자',
        'account_number': '계좌 번호',
        'bank_country': '은행 국가',
        'swift_code': 'SWIFT / BIC 코드',
        'transfer_type': '송금 유형',
        'local_transfer': '국내 송금',
        'international_transfer': '국제 송금',
        'submit_transfer': '승인을 위한 송금 제출',
        'submit_international': '🌍 국제 송금 제출',
        'enter_pin': '6자리 거래 PIN을 입력하세요',
        'confirm_pin': '거래 PIN으로 확인',
        'invalid_pin': '유효한 6자리 PIN을 입력해주세요',
        'pin_error': '유효하지 않은 PIN입니다. 다시 시도해주세요.',
        'insufficient_balance': '잔액이 부족합니다',
        'transfer_success': '송금이 성공적으로 생성되었습니다! 관리자 승인을 기다리는 중입니다.',
        'transfer_failed': '송금에 실패했습니다. 다시 시도해주세요.',
        'network_error': '네트워크 오류. 다시 시도해주세요.',
    },
    zh: {
        'home': '首页',
        'about': '关于我们',
        'contact': '联系我们',
        'login': '登录',
        'register': '注册',
        'logout': '登出',
        'dashboard': '仪表板',
        'payments': '付款',
        'savings': '储蓄',
        'cards': '卡',
        'settings': '设置',
        'admin': '管理员',
        'users': '用户',
        'transactions': '交易',
        'kyc': 'KYC',
        'banking': '🏦 银行业务',
        'support': '📚 支持',
        'legal': '⚖️ 法律',
        'contact_us': '📞 联系方式',
        'about_us': '关于我们',
        'faq': '常见问题',
        'help_center': '帮助中心',
        'security': '安全',
        'privacy': '隐私',
        'terms_conditions': '条款与条件',
        'privacy_policy': '隐私政策',
        'cookie_policy': 'Cookie政策',
        'hero_badge': '🏆 自1865年以来世界级银行业务',
        'hero_title': '为您的未来而建的银行',
        'hero_subtitle': '加入数百万信任汇丰银行安全、可靠和创新银行服务的客户。从日常银行到全球投资，我们在这里帮助您成功。',
        'open_account': '🚀 开设账户',
        'log_in': '🔐 登录',
        'go_dashboard': '📊 进入仪表板',
        'go_admin': '📊 进入管理面板',
        'customers': '全球客户',
        'assets': '管理资产',
        'countries': '国家和地区',
        'years': '信任的年数',
        'why_choose': '为什么选择汇丰？',
        'why_subtitle': '我们结合全球实力与本地专业知识，提供卓越的银行体验。',
        'security_title': '企业级安全',
        'security_desc': '您的资金和数据受到高级加密、实时欺诈检测和24/7监控的保护。',
        'reliable_title': '快速可靠',
        'reliable_desc': '大多数英国支付在几分钟内到达。我们的系统保持99.99％的正常运行时间。',
        'global_title': '全球覆盖，本地服务',
        'global_desc': '我们在60多个国家设有业务，提供国际银行服务，并在英国提供本地支持。',
        'support_title': '卓越支持',
        'support_desc': '我们位于英国的支援团队通过电话、聊天或到分行24/7为您提供服务。',
        'digital_title': '智能数字银行',
        'digital_desc': '通过我们屡获殊荣的移动应用程序和在线平台，随时随地管理您的财务。',
        'innovative_title': '创新产品',
        'innovative_desc': '从有竞争力的储蓄利率到灵活的抵押贷款和投资选择，我们为您提供全面的服务。',
        'learn_more': '了解更多 →',
        'our_products': '我们的产品',
        'products_subtitle': '为您独特需求量身定制的金融解决方案。',
        'current_accounts': '活期账户',
        'current_desc': '日常银行服务，包括非接触式支付、直接借记和24/7访问。',
        'current_feature_1': '免费快速支付',
        'current_feature_2': '非接触式借记卡',
        'current_feature_3': '约定透支',
        'explore_accounts': '探索账户',
        'savings_title': '储蓄和ISA',
        'savings_desc': '通过有竞争力的利率和节税选项让您的资金增值。',
        'savings_feature_1': '便捷储蓄',
        'savings_feature_2': '固定利率债券',
        'savings_feature_3': '现金和股票ISA',
        'start_saving': '开始储蓄',
        'mortgages_title': '抵押贷款和贷款',
        'mortgages_desc': '为您的房屋、汽车或个人需求提供灵活的融资解决方案。',
        'mortgages_feature_1': '有竞争力的利率',
        'mortgages_feature_2': '固定和可变期限',
        'mortgages_feature_3': '快速决策',
        'learn_more_btn': '了解更多',
        'international_title': '国际银行',
        'international_desc': '以有竞争力的汇率在全球范围内发送和接收资金。',
        'international_feature_1': '50多种货币',
        'international_feature_2': 'SWIFT转账',
        'international_feature_3': '有竞争力的费用',
        'explore': '探索',
        'investments_title': '投资',
        'investments_desc': '通过专业管理的投资组合建立您的财富。',
        'investments_feature_1': '管理投资组合',
        'investments_feature_2': '全球股票',
        'investments_feature_3': '债券基金',
        'start_investing': '开始投资',
        'business_title': '企业银行',
        'business_desc': '为初创企业、中小企业和公司提供全面的银行解决方案。',
        'business_feature_1': '企业账户',
        'business_feature_2': '企业银行',
        'business_feature_3': '商户服务',
        'how_it_works': '如何运作',
        'steps_subtitle': '开始使用汇丰银行简单直接。',
        'step_1_title': '开设账户',
        'step_1_desc': '在线注册只需几分钟，提供您的个人信息和身份证件。',
        'step_2_title': '验证身份',
        'step_2_desc': '我们将快速安全地验证您的身份。',
        'step_3_title': '开始银行服务',
        'step_3_desc': '访问您的账户、转账和管理您的财务。',
        'step_4_title': '增加财富',
        'step_4_desc': '探索储蓄、投资和其他金融产品。',
        'faq_title': '常见问题',
        'faq_subtitle': '关于汇丰银行常见问题的快速解答。',
        'faq_1_q': '🤔 我的资金安全吗？',
        'faq_1_a': '是的！您符合资格的存款受到金融服务补偿计划（FSCS）的保护，每人每银行集团最高可达£85,000。',
        'faq_2_q': '🤔 如何开设账户？',
        'faq_2_a': '只需点击上方"开设账户"按钮，填写您的详细信息，验证您的身份，然后就可以开始了！',
        'faq_3_q': '🤔 转账有多快？',
        'faq_3_a': '快速支付通常在几秒或几分钟内到达。国际SWIFT转账通常需要1-4个工作日，具体取决于目的地。',
        'view_all_faqs': '查看所有常见问题 →',
        'cta_title': '准备好控制您的财务了吗？',
        'cta_subtitle': '今天加入汇丰银行，体验安全、可靠和创新的世界级银行服务。',
        'cta_trust': '🔒 您的数据安全。全球数百万人信赖。',
        'open_now': '🚀 立即开设账户',
        'welcome_back': '欢迎回来',
        'logged_out': '成功登出',
        'back_to_home': '← 返回首页',
        'account_active': '活跃',
        'total_balance': '总余额',
        'pending_transactions': '待处理交易',
        'total_transactions': '总交易',
        'no_transactions': '暂无交易',
        'recent_transactions': '最近交易',
        'quick_actions': '快速操作',
        'send_money': '发送资金',
        'receive_funds': '接收资金',
        'save_money': '储蓄资金',
        'view_history': '查看历史',
        'admin_dashboard': '管理面板',
        'manage_users': '管理用户',
        'manage_transactions': '管理交易',
        'kyc_reviews': 'KYC审核',
        'refresh_data': '刷新数据',
        'pending_kyc': '待处理的KYC申请',
        'no_pending_kyc': '没有待处理的KYC申请',
        'view_all': '查看全部 →',
        'id': 'ID',
        'from': '从',
        'to': '到',
        'amount': '金额',
        'date': '日期',
        'status': '状态',
        'actions': '操作',
        'approve': '批准',
        'reject': '拒绝',
        'pending': '待处理',
        'approved': '已批准',
        'rejected': '已拒绝',
        'local': '本地',
        'international': '国际',
        'total_users': '总用户',
        'active_users': '活跃用户',
        'inactive_users': '非活跃用户',
        'today_transactions': '今日交易',
        'description': '描述',
        'reference': '参考',
        'bank_name': '银行名称',
        'account_holder': '账户持有人',
        'account_number': '账号',
        'bank_country': '银行所在国',
        'swift_code': 'SWIFT / BIC代码',
        'transfer_type': '转账类型',
        'local_transfer': '本地转账',
        'international_transfer': '国际转账',
        'submit_transfer': '提交转账以待批准',
        'submit_international': '🌍 提交国际转账',
        'enter_pin': '请输入您的6位交易PIN码',
        'confirm_pin': '使用交易PIN确认',
        'invalid_pin': '请输入有效的6位PIN码',
        'pin_error': '无效PIN码，请重试。',
        'insufficient_balance': '余额不足',
        'transfer_success': '转账创建成功！等待管理员批准。',
        'transfer_failed': '转账失败，请重试。',
        'network_error': '网络错误，请重试。',
    },
    ar: {
        'home': 'الرئيسية',
        'about': 'من نحن',
        'contact': 'اتصل بنا',
        'login': 'تسجيل الدخول',
        'register': 'تسجيل',
        'logout': 'تسجيل الخروج',
        'dashboard': 'لوحة التحكم',
        'payments': 'المدفوعات',
        'savings': 'التوفير',
        'cards': 'البطاقات',
        'settings': 'الإعدادات',
        'admin': 'المشرف',
        'users': 'المستخدمين',
        'transactions': 'المعاملات',
        'kyc': 'KYC',
        'banking': '🏦 الخدمات المصرفية',
        'support': '📚 الدعم',
        'legal': '⚖️ القانوني',
        'contact_us': '📞 اتصل بنا',
        'about_us': 'من نحن',
        'faq': 'الأسئلة الشائعة',
        'help_center': 'مركز المساعدة',
        'security': 'الأمان',
        'privacy': 'الخصوصية',
        'terms_conditions': 'الشروط والأحكام',
        'privacy_policy': 'سياسة الخصوصية',
        'cookie_policy': 'سياسة ملفات تعريف الارتباط',
        'hero_badge': '🏆 الخدمات المصرفية العالمية منذ 1865',
        'hero_title': 'خدمات مصرفية مبنية لمستقبلك',
        'hero_subtitle': 'انضم إلى ملايين العملاء الذين يثقون في HSBC للحصول على خدمات مصرفية آمنة وموثوقة ومبتكرة. من الخدمات المصرفية اليومية إلى الاستثمارات العالمية، نحن هنا لمساعدتك على النجاح.',
        'open_account': '🚀 افتح حسابك',
        'log_in': '🔐 تسجيل الدخول',
        'go_dashboard': '📊 الذهاب إلى لوحة التحكم',
        'go_admin': '📊 الذهاب إلى لوحة المشرف',
        'customers': 'عملاء حول العالم',
        'assets': 'الأصول المدارة',
        'countries': 'الدول والأقاليم',
        'years': 'سنوات من الثقة',
        'why_choose': 'لماذا تختار HSBC؟',
        'why_subtitle': 'نحن نجمع بين القوة العالمية والخبرة المحلية لتقديم تجارب مصرفية استثنائية.',
        'security_title': 'أمان على مستوى المؤسسات',
        'security_desc': 'أموالك وبياناتك محمية بالتشفير المتقدم والكشف عن الاحتيال في الوقت الفعلي والمراقبة على مدار الساعة.',
        'reliable_title': 'سريع وموثوق',
        'reliable_desc': 'تصل معظم المدفوعات في المملكة المتحدة في غضون دقائق. تحافظ أنظمتنا على وقت تشغيل بنسبة 99.99٪.',
        'global_title': 'وصول عالمي، لمسة محلية',
        'global_desc': 'مع تواجد في أكثر من 60 دولة، نقدم خدمات مصرفية دولية مع دعم محلي في المملكة المتحدة.',
        'support_title': 'دعم استثنائي',
        'support_desc': 'فريق الدعم لدينا ومقره المملكة المتحدة متاح على مدار الساعة عبر الهاتف أو الدردشة أو في الفرع.',
        'digital_title': 'خدمات مصرفية رقمية ذكية',
        'digital_desc': 'إدارة أموالك في أي مكان من خلال تطبيقنا الحائز على جوائز ومنصتنا الإلكترونية.',
        'innovative_title': 'منتجات مبتكرة',
        'innovative_desc': 'من أسعار التوفير التنافسية إلى الرهون العقارية المرنة وخيارات الاستثمار، نحن نوفر لك كل ما تحتاجه.',
        'learn_more': 'اعرف المزيد →',
        'our_products': 'منتجاتنا',
        'products_subtitle': 'حلول مالية مصممة خصيصًا لتلبية احتياجاتك الفريدة.',
        'current_accounts': 'الحسابات الجارية',
        'current_desc': 'خدمات مصرفية يومية مع مدفوعات بدون تلامس، وخصومات مباشرة، ووصول على مدار الساعة.',
        'current_feature_1': 'مدفوعات أسرع مجانية',
        'current_feature_2': 'بطاقة خصم بدون تلامس',
        'current_feature_3': 'سحب على المكشوف مرتب',
        'explore_accounts': 'استكشف الحسابات',
        'savings_title': 'التوفير و ISAs',
        'savings_desc': 'تنمية أموالك بأسعار فائدة تنافسية وخيارات فعالة من حيث الضرائب.',
        'savings_feature_1': 'توفير سهل الوصول',
        'savings_feature_2': 'سندات بسعر فائدة ثابت',
        'savings_feature_3': 'ISAs نقدية وأسهم',
        'start_saving': 'ابدأ التوفير',
        'mortgages_title': 'الرهون العقارية والقروض',
        'mortgages_desc': 'حلول تمويل مرنة لمنزلك أو سيارتك أو احتياجاتك الشخصية.',
        'mortgages_feature_1': 'أسعار تنافسية',
        'mortgages_feature_2': 'شروط ثابتة ومتغيرة',
        'mortgages_feature_3': 'قرارات سريعة',
        'learn_more_btn': 'اعرف المزيد',
        'international_title': 'الخدمات المصرفية الدولية',
        'international_desc': 'أرسل واستقبل الأموال عالمياً بأسعار صرف تنافسية.',
        'international_feature_1': '50+ عملة',
        'international_feature_2': 'تحويلات SWIFT',
        'international_feature_3': 'رسوم تنافسية',
        'explore': 'استكشف',
        'investments_title': 'الاستثمارات',
        'investments_desc': 'بناء ثروتك من خلال محافظ استثمارية مدارة بشكل احترافي.',
        'investments_feature_1': 'محافظ مدارة',
        'investments_feature_2': 'أسهم عالمية',
        'investments_feature_3': 'صناديق السندات',
        'start_investing': 'ابدأ الاستثمار',
        'business_title': 'الخدمات المصرفية للأعمال',
        'business_desc': 'حلول مصرفية شاملة للشركات الناشئة والشركات الصغيرة والمتوسطة والشركات الكبرى.',
        'business_feature_1': 'حسابات الأعمال',
        'business_feature_2': 'الخدمات المصرفية للشركات',
        'business_feature_3': 'خدمات التجار',
        'how_it_works': 'كيف يعمل',
        'steps_subtitle': 'البدء مع HSBC بسيط ومباشر.',
        'step_1_title': 'افتح حسابك',
        'step_1_desc': 'سجل عبر الإنترنت في دقائق مع تفاصيلك الشخصية وهوية.',
        'step_2_title': 'تحقق من هويتك',
        'step_2_desc': 'سنقوم بالتحقق من هويتك بسرعة وأمان.',
        'step_3_title': 'ابدأ الخدمات المصرفية',
        'step_3_desc': 'الوصول إلى حسابك، وإجراء التحويلات، وإدارة أموالك.',
        'step_4_title': 'تنمية ثروتك',
        'step_4_desc': 'استكشف التوفير والاستثمارات والمنتجات المالية الأخرى.',
        'faq_title': 'الأسئلة الشائعة',
        'faq_subtitle': 'إجابات سريعة للأسئلة الشائعة حول الخدمات المصرفية من HSBC.',
        'faq_1_q': '🤔 هل أموالي محمية؟',
        'faq_1_a': 'نعم! ودائعك المؤهلة محمية من قبل نظام تعويض الخدمات المالية (FSCS) حتى 85,000 جنيه إسترليني للشخص الواحد، لكل مجموعة مصرفية.',
        'faq_2_q': '🤔 كيف أفتح حساباً؟',
        'faq_2_a': 'ما عليك سوى النقر على زر "افتح حسابك" أعلاه، وملء تفاصيلك، والتحقق من هويتك، وستكون جاهزاً للانطلاق!',
        'faq_3_q': '🤔 ما مدى سرعة التحويلات؟',
        'faq_3_a': 'تصل المدفوعات الأسرع عادة في غضون ثوان أو دقائق. تستغرق تحويلات SWIFT الدولية عادة من 1 إلى 4 أيام عمل حسب الوجهة.',
        'view_all_faqs': 'عرض جميع الأسئلة الشائعة →',
        'cta_title': 'هل أنت مستعد للسيطرة على أموالك؟',
        'cta_subtitle': 'انضم إلى HSBC اليوم واختبر الخدمات المصرفية العالمية مع الأمان والموثوقية والابتكار في أفضل حالاته.',
        'cta_trust': '🔒 بياناتك آمنة. يثق بها الملايين حول العالم.',
        'open_now': '🚀 افتح حسابك الآن',
        'welcome_back': 'مرحباً بعودتك',
        'logged_out': 'تم تسجيل الخروج بنجاح',
        'back_to_home': '← العودة إلى الرئيسية',
        'account_active': 'نشط',
        'total_balance': 'الرصيد الإجمالي',
        'pending_transactions': 'المعاملات المعلقة',
        'total_transactions': 'إجمالي المعاملات',
        'no_transactions': 'لا توجد معاملات حتى الآن',
        'recent_transactions': 'المعاملات الأخيرة',
        'quick_actions': 'إجراءات سريعة',
        'send_money': 'إرسال الأموال',
        'receive_funds': 'استلام الأموال',
        'save_money': 'توفير المال',
        'view_history': 'عرض السجل',
        'admin_dashboard': 'لوحة تحكم المشرف',
        'manage_users': 'إدارة المستخدمين',
        'manage_transactions': 'إدارة المعاملات',
        'kyc_reviews': 'مراجعات KYC',
        'refresh_data': 'تحديث البيانات',
        'pending_kyc': 'طلبات KYC المعلقة',
        'no_pending_kyc': 'لا توجد طلبات KYC معلقة',
        'view_all': 'عرض الكل →',
        'id': 'المعرف',
        'from': 'من',
        'to': 'إلى',
        'amount': 'المبلغ',
        'date': 'التاريخ',
        'status': 'الحالة',
        'actions': 'الإجراءات',
        'approve': 'موافقة',
        'reject': 'رفض',
        'pending': 'معلق',
        'approved': 'تمت الموافقة',
        'rejected': 'مرفوض',
        'local': 'محلي',
        'international': 'دولي',
        'total_users': 'إجمالي المستخدمين',
        'active_users': 'المستخدمين النشطين',
        'inactive_users': 'المستخدمين غير النشطين',
        'today_transactions': 'معاملات اليوم',
        'description': 'الوصف',
        'reference': 'المرجع',
        'bank_name': 'اسم البنك',
        'account_holder': 'صاحب الحساب',
        'account_number': 'رقم الحساب',
        'bank_country': 'دولة البنك',
        'swift_code': 'رمز SWIFT / BIC',
        'transfer_type': 'نوع التحويل',
        'local_transfer': 'تحويل محلي',
        'international_transfer': 'تحويل دولي',
        'submit_transfer': 'تقديم التحويل للموافقة',
        'submit_international': '🌍 تقديم تحويل دولي',
        'enter_pin': 'أدخل رقم التعريف الشخصي المكون من 6 أرقام',
        'confirm_pin': 'تأكيد برقم التعريف الشخصي للمعاملة',
        'invalid_pin': 'الرجاء إدخال رقم تعريف شخصي صحيح مكون من 6 أرقام',
        'pin_error': 'رقم تعريف شخصي غير صحيح. يرجى المحاولة مرة أخرى.',
        'insufficient_balance': 'الرصيد غير كاف',
        'transfer_success': 'تم إنشاء التحويل بنجاح! في انتظار موافقة المشرف.',
        'transfer_failed': 'فشل التحويل. يرجى المحاولة مرة أخرى.',
        'network_error': 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
    },
    pt: {
        'home': 'Início',
        'about': 'Sobre',
        'contact': 'Contato',
        'login': 'Entrar',
        'register': 'Registrar',
        'logout': 'Sair',
        'dashboard': 'Painel',
        'payments': 'Pagamentos',
        'savings': 'Poupança',
        'cards': 'Cartões',
        'settings': 'Configurações',
        'admin': 'Administrador',
        'users': 'Usuários',
        'transactions': 'Transações',
        'kyc': 'KYC',
        'banking': '🏦 Bancário',
        'support': '📚 Suporte',
        'legal': '⚖️ Legal',
        'contact_us': '📞 Contato',
        'about_us': 'Sobre Nós',
        'faq': 'Perguntas Frequentes',
        'help_center': 'Central de Ajuda',
        'security': 'Segurança',
        'privacy': 'Privacidade',
        'terms_conditions': 'Termos e Condições',
        'privacy_policy': 'Política de Privacidade',
        'cookie_policy': 'Política de Cookies',
        'hero_badge': '🏆 Banca de Classe Mundial Desde 1865',
        'hero_title': 'Banco Construído para o Seu Futuro',
        'hero_subtitle': 'Junte-se a milhões de clientes que confiam no HSBC para serviços bancários seguros, confiáveis e inovadores. Da banca diária aos investimentos globais, estamos aqui para ajudá-lo a ter sucesso.',
        'open_account': '🚀 Abra Sua Conta',
        'log_in': '🔐 Entrar',
        'go_dashboard': '📊 Ir para o Painel',
        'go_admin': '📊 Ir para o Painel do Administrador',
        'customers': 'Clientes em Todo o Mundo',
        'assets': 'Ativos sob Gestão',
        'countries': 'Países e Territórios',
        'years': 'Anos de Confiança',
        'why_choose': 'Por que Escolher o HSBC?',
        'why_subtitle': 'Combinamos força global com experiência local para oferecer experiências bancárias excepcionais.',
        'security_title': 'Segurança de Nível Empresarial',
        'security_desc': 'Seu dinheiro e dados estão protegidos com criptografia avançada, detecção de fraudes em tempo real e monitoramento 24/7.',
        'reliable_title': 'Rápido e Confiável',
        'reliable_desc': 'A maioria dos pagamentos no Reino Unido chega em minutos. Nossos sistemas mantêm 99,99% de disponibilidade.',
        'global_title': 'Alcance Global, Toque Local',
        'global_desc': 'Com presença em mais de 60 países, oferecemos serviços bancários internacionais com suporte local no Reino Unido.',
        'support_title': 'Suporte Excepcional',
        'support_desc': 'Nossa equipe de suporte baseada no Reino Unido está disponível 24/7 por telefone, chat ou nas agências.',
        'digital_title': 'Banco Digital Inteligente',
        'digital_desc': 'Gerencie suas finanças em qualquer lugar com nosso aplicativo móvel premiado e plataforma online.',
        'innovative_title': 'Produtos Inovadores',
        'innovative_desc': 'De taxas de poupança competitivas a hipotecas flexíveis e opções de investimento, temos tudo para você.',
        'learn_more': 'Saiba Mais →',
        'our_products': 'Nossos Produtos',
        'products_subtitle': 'Soluções financeiras adaptadas para atender às suas necessidades únicas.',
        'current_accounts': 'Contas Correntes',
        'current_desc': 'Banco diário com pagamentos por aproximação, débitos diretos e acesso 24/7.',
        'current_feature_1': 'Pagamentos Mais Rápidos Gratuitos',
        'current_feature_2': 'Cartão de Débito por Aproximação',
        'current_feature_3': 'Descoberto Negociado',
        'explore_accounts': 'Explorar Contas',
        'savings_title': 'Poupança e ISAs',
        'savings_desc': 'Faça seu dinheiro crescer com taxas de juros competitivas e opções eficientes em termos fiscais.',
        'savings_feature_1': 'Poupança de Fácil Acesso',
        'savings_feature_2': 'Títulos com Taxa Fixa',
        'savings_feature_3': 'ISAs em Dinheiro e Ações',
        'start_saving': 'Começar a Poupar',
        'mortgages_title': 'Hipotecas e Empréstimos',
        'mortgages_desc': 'Soluções de financiamento flexíveis para sua casa, carro ou necessidades pessoais.',
        'mortgages_feature_1': 'Taxas Competitivas',
        'mortgages_feature_2': 'Prazos Fixos e Variáveis',
        'mortgages_feature_3': 'Decisões Rápidas',
        'learn_more_btn': 'Saiba Mais',
        'international_title': 'Banco Internacional',
        'international_desc': 'Envie e receba dinheiro globalmente com taxas de câmbio competitivas.',
        'international_feature_1': '50+ Moedas',
        'international_feature_2': 'Transferências SWIFT',
        'international_feature_3': 'Taxas Competitivas',
        'explore': 'Explorar',
        'investments_title': 'Investimentos',
        'investments_desc': 'Construa sua riqueza com carteiras de investimento geridas profissionalmente.',
        'investments_feature_1': 'Carteiras Gerenciadas',
        'investments_feature_2': 'Ações Globais',
        'investments_feature_3': 'Fundos de Títulos',
        'start_investing': 'Começar a Investir',
        'business_title': 'Banco Empresarial',
        'business_desc': 'Soluções bancárias abrangentes para startups, PMEs e corporações.',
        'business_feature_1': 'Contas Empresariais',
        'business_feature_2': 'Banco Corporativo',
        'business_feature_3': 'Serviços Comerciais',
        'how_it_works': 'Como Funciona',
        'steps_subtitle': 'Começar com o HSBC é simples e direto.',
        'step_1_title': 'Abra Sua Conta',
        'step_1_desc': 'Registre-se online em minutos com seus dados pessoais e identidade.',
        'step_2_title': 'Verifique Sua Identidade',
        'step_2_desc': 'Verificaremos sua identidade de forma rápida e segura.',
        'step_3_title': 'Comece a Usar o Banco',
        'step_3_desc': 'Acesse sua conta, faça transferências e gerencie suas finanças.',
        'step_4_title': 'Aumente Sua Riqueza',
        'step_4_desc': 'Explore poupanças, investimentos e outros produtos financeiros.',
        'faq_title': 'Perguntas Frequentes',
        'faq_subtitle': 'Respostas rápidas para perguntas comuns sobre o banco HSBC.',
        'faq_1_q': '🤔 Meu dinheiro está protegido?',
        'faq_1_a': 'Sim! Seus depósitos elegíveis são protegidos pelo FSCS até £85.000 por pessoa, por grupo bancário.',
        'faq_2_q': '🤔 Como abrir uma conta?',
        'faq_2_a': 'Basta clicar no botão "Abra Sua Conta" acima, preencher seus dados, verificar sua identidade e pronto!',
        'faq_3_q': '🤔 Quão rápidas são as transferências?',
        'faq_3_a': 'Os Pagamentos Mais Rápidos geralmente chegam em segundos ou minutos. Transferências internacionais SWIFT geralmente levam de 1 a 4 dias úteis.',
        'view_all_faqs': 'Ver Todas as FAQs →',
        'cta_title': 'Pronto para Assumir o Controle de Suas Finanças?',
        'cta_subtitle': 'Junte-se ao HSBC hoje e experimente a banca de classe mundial com segurança, confiabilidade e inovação no seu melhor.',
        'cta_trust': '🔒 Seus dados estão seguros. Confiado por milhões em todo o mundo.',
        'open_now': '🚀 Abra Sua Conta Agora',
        'welcome_back': 'Bem-vindo de volta',
        'logged_out': 'Desconectado com sucesso',
        'back_to_home': '← Voltar ao Início',
        'account_active': 'Ativa',
        'total_balance': 'Saldo Total',
        'pending_transactions': 'Transações Pendentes',
        'total_transactions': 'Total de Transações',
        'no_transactions': 'Nenhuma transação ainda',
        'recent_transactions': 'Transações Recentes',
        'quick_actions': 'Ações Rápidas',
        'send_money': 'Enviar Dinheiro',
        'receive_funds': 'Receber Fundos',
        'save_money': 'Economizar Dinheiro',
        'view_history': 'Ver Histórico',
        'admin_dashboard': 'Painel do Administrador',
        'manage_users': 'Gerenciar Usuários',
        'manage_transactions': 'Gerenciar Transações',
        'kyc_reviews': 'Revisões KYC',
        'refresh_data': 'Atualizar Dados',
        'pending_kyc': 'Aplicações KYC Pendentes',
        'no_pending_kyc': 'Nenhuma aplicação KYC pendente',
        'view_all': 'Ver Todos →',
        'id': 'ID',
        'from': 'De',
        'to': 'Para',
        'amount': 'Valor',
        'date': 'Data',
        'status': 'Status',
        'actions': 'Ações',
        'approve': 'Aprovar',
        'reject': 'Rejeitar',
        'pending': 'Pendente',
        'approved': 'Aprovado',
        'rejected': 'Rejeitado',
        'local': 'Local',
        'international': 'Internacional',
        'total_users': 'Total de Usuários',
        'active_users': 'Usuários Ativos',
        'inactive_users': 'Usuários Inativos',
        'today_transactions': 'Transações de Hoje',
        'description': 'Descrição',
        'reference': 'Referência',
        'bank_name': 'Nome do Banco',
        'account_holder': 'Titular da Conta',
        'account_number': 'Número da Conta',
        'bank_country': 'País do Banco',
        'swift_code': 'Código SWIFT / BIC',
        'transfer_type': 'Tipo de Transferência',
        'local_transfer': 'Transferência Local',
        'international_transfer': 'Transferência Internacional',
        'submit_transfer': 'Enviar Transferência para Aprovação',
        'submit_international': '🌍 Enviar Transferência Internacional',
        'enter_pin': 'Digite seu PIN de 6 dígitos',
        'confirm_pin': 'Confirmar com PIN de Transação',
        'invalid_pin': 'Por favor, insira um PIN válido de 6 dígitos',
        'pin_error': 'PIN inválido. Tente novamente.',
        'insufficient_balance': 'Saldo insuficiente',
        'transfer_success': 'Transferência criada com sucesso! Aguardando aprovação do administrador.',
        'transfer_failed': 'Falha na transferência. Tente novamente.',
        'network_error': 'Erro de rede. Tente novamente.',
    }
};

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔵 HSBC Banking App loaded');

    initAnimations();
    initFlashMessages();
    initFormValidation();
    initPasswordToggle();
    initMobileMenu();
    initLanguageTranslator();
    loadLanguagePreference();
    initBalanceUpdates();
    initCSRFToken();
});

// ============================================
// CSRF TOKEN
// ============================================
function getCsrfToken() {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
        return metaTag.getAttribute('content');
    }
    const input = document.querySelector('input[name="csrf_token"]');
    if (input) {
        return input.value;
    }
    if (typeof csrfToken !== 'undefined') {
        return csrfToken;
    }
    return '';
}

function initCSRFToken() {
    const token = getCsrfToken();
    if (token) {
        window.csrfToken = token;
        console.log('🔐 CSRF Token loaded');
    } else {
        console.warn('⚠️ CSRF Token not found');
    }
}

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.animate || 'fade-in';
                    const delay = parseInt(el.dataset.delay) || 0;

                    setTimeout(() => {
                        el.classList.add(`animate-${animation}`);
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    } else {
        animateElements.forEach(el => {
            el.classList.add('animate-fade-in');
        });
    }
}

// ============================================
// FLASH MESSAGES
// ============================================
function initFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');

    flashMessages.forEach(msg => {
        setTimeout(() => {
            dismissFlash(msg);
        }, 5000);

        const closeBtn = msg.querySelector('.flash-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                dismissFlash(msg);
            });
        }
    });
}

function dismissFlash(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(20px)';
    element.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        if (element.parentElement) {
            element.remove();
        }
    }, 300);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info', duration = 4000) {
    let container = document.getElementById('flashContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'flashContainer';
        container.className = 'flash-container';
        document.body.appendChild(container);
    }

    const flash = document.createElement('div');
    flash.className = `flash-message ${type}`;

    const icons = {
        success: '✅',
        danger: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    flash.innerHTML = `
        <span>${icons[type] || 'ℹ️'}</span>
        <span>${message}</span>
        <button class="flash-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(flash);

    setTimeout(() => {
        if (flash.parentElement) {
            dismissFlash(flash);
        }
    }, duration);
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });

        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });
            input.addEventListener('input', function () {
                if (this.classList.contains('error') || this.classList.contains('success')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(input) {
    const errorElement = input.parentElement.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';

    if (errorElement) {
        errorElement.remove();
    }
    input.classList.remove('error', 'success');

    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    if (isValid && input.type === 'email' && input.value) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(input.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    if (isValid && input.type === 'password' && input.value) {
        if (input.value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters';
        }
    }

    if (isValid && input.type === 'number' && input.value) {
        if (isNaN(input.value) || parseFloat(input.value) < 0) {
            isValid = false;
            errorMessage = 'Please enter a valid number';
        }
    }

    if (!isValid) {
        input.classList.add('error');
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = errorMessage;
        input.parentElement.appendChild(error);
    } else if (input.value) {
        input.classList.add('success');
    }

    return isValid;
}

// ============================================
// PASSWORD TOGGLE
// ============================================
function initPasswordToggle() {
    const toggles = document.querySelectorAll('.toggle-password');

    toggles.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.textContent = 'Hide';
                } else {
                    input.type = 'password';
                    this.textContent = 'Show';
                }
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    if (toggle && nav) {
        toggle.removeAttribute('onclick');

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 991) {
                if (nav.classList.contains('active') &&
                    !nav.contains(e.target) &&
                    !toggle.contains(e.target)) {
                    nav.classList.remove('active');
                    toggle.classList.remove('active');
                }
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 991) {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    }
}

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('menuToggle');
    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

// ============================================
// LANGUAGE TRANSLATOR - COMPLETE WORKING
// ============================================

function initLanguageTranslator() {
    const dropdown = document.getElementById('langDropdown');
    const btn = document.getElementById('translatorBtn');

    if (btn && dropdown) {
        btn.removeAttribute('onclick');

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        console.log('✅ Translator initialized');
    }
}

function toggleTranslator() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function translatePage(lang) {
    const btn = document.getElementById('translatorBtn');
    const labels = {
        en: '🌐 English',
        es: '🌐 Español',
        fr: '🌐 Français',
        de: '🌐 Deutsch',
        ko: '🌐 한국어',
        zh: '🌐 中文',
        ar: '🌐 العربية',
        pt: '🌐 Português'
    };

    // Update button text
    if (btn) {
        btn.innerHTML = labels[lang] || labels.en;
    }

    // Close dropdown
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }

    // Update language attribute
    const langAttr = {
        en: 'en-GB', es: 'es-ES', fr: 'fr-FR', de: 'de-DE',
        ko: 'ko-KR', zh: 'zh-CN', ar: 'ar-SA', pt: 'pt-PT'
    };
    document.documentElement.lang = langAttr[lang] || 'en-GB';

    // Get translation data
    const translation = translations[lang] || translations.en;

    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translation[key]) {
            el.textContent = translation[key];
        }
    });

    // Translate navigation links
    const navMap = {
        'Home': 'home',
        'About': 'about',
        'Contact': 'contact',
        'Log On': 'login',
        'Register': 'register',
        'Log Out': 'logout',
        'Dashboard': 'dashboard',
        'Payments': 'payments',
        'Savings': 'savings',
        'Cards': 'cards',
        'Settings': 'settings',
        'Admin': 'admin',
        'Users': 'users',
        'Transactions': 'transactions',
        'KYC': 'kyc'
    };

    document.querySelectorAll('.main-nav a, .footer-col a').forEach(link => {
        const text = link.textContent.trim();
        const key = navMap[text];
        if (key && translation[key]) {
            link.textContent = translation[key];
        }
    });

    // Translate footer headings
    const footerMap = {
        '🏦 Banking': 'banking',
        '📚 Support': 'support',
        '⚖️ Legal': 'legal',
        '📞 Contact': 'contact_us'
    };

    document.querySelectorAll('.footer-col h4').forEach(heading => {
        const text = heading.textContent.trim();
        const key = footerMap[text];
        if (key && translation[key]) {
            heading.textContent = translation[key];
        }
    });

    // Show toast notification
    const langName = labels[lang] ? labels[lang].split(' ')[1] : lang;
    showToast(`🌐 Language changed to ${langName}`, 'info');

    // Save preference
    try {
        localStorage.setItem('preferred_language', lang);
    } catch (e) {
        console.warn('Could not save language preference:', e);
    }
}

function loadLanguagePreference() {
    try {
        const savedLang = localStorage.getItem('preferred_language');
        if (savedLang) {
            const btn = document.getElementById('translatorBtn');
            const labels = {
                en: '🌐 English',
                es: '🌐 Español',
                fr: '🌐 Français',
                de: '🌐 Deutsch',
                ko: '🌐 한국어',
                zh: '🌐 中文',
                ar: '🌐 العربية',
                pt: '🌐 Português'
            };
            if (btn && labels[savedLang]) {
                btn.innerHTML = labels[savedLang];
                // Apply translation on load
                translatePage(savedLang);
                console.log(`🌐 Loaded saved language: ${savedLang}`);
            }
        }
    } catch (e) {
        console.warn('Could not load language preference:', e);
    }
}

// ============================================
// BALANCE UPDATES
// ============================================
function initBalanceUpdates() {
    const balanceElements = document.querySelectorAll('[data-balance]');

    if (balanceElements.length > 0) {
        updateBalances();
        setInterval(updateBalances, 30000);
    }
}

async function updateBalances() {
    try {
        const response = await fetch('/api/balance', {
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.balance !== undefined) {
            const balanceElements = document.querySelectorAll('[data-balance]');
            balanceElements.forEach(el => {
                const format = el.dataset.format || 'currency';
                if (format === 'currency') {
                    el.textContent = `£${data.balance.toFixed(2)}`;
                } else {
                    el.textContent = data.balance.toFixed(2);
                }
            });
        }
    } catch (error) {
        console.error('Failed to update balance:', error);
    }
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function copyToClipboard(text, message = 'Copied to clipboard!') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message, 'success');
        }).catch(() => {
            fallbackCopy(text, message);
        });
    } else {
        fallbackCopy(text, message);
    }
}

function fallbackCopy(text, message) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast(message, 'success');
    } catch (err) {
        showToast('Failed to copy', 'danger');
    }
    document.body.removeChild(textarea);
}

// ============================================
// CONFIRM DIALOG
// ============================================
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// ============================================
// EXPOSE GLOBAL FUNCTIONS
// ============================================
window.showToast = showToast;
window.translatePage = translatePage;
window.toggleMenu = toggleMenu; window.toggleTranslator = toggleTranslator;

window.copyToClipboard = copyToClipboard;
window.confirmAction = confirmAction;
window.getCsrfToken = getCsrfToken;

console.log('✅ HSBC Banking App JavaScript loaded successfully');