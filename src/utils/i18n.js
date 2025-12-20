/**
 * Internationalization utility
 * Supports English (default) and French
 */

const translations = {
  en: {
    // App title
    appTitle: 'Pinyin Reader - Chinese Reader',

    // Views
    readingView: 'Reading',
    editView: 'Edit',
    collectionView: 'Collection',
    libraryView: 'Library',
    helpView: 'Help',

    // Reading view
    addToCollection: 'Add to Collection',

    // Edit view
    newText: 'New Text',
    pinyinMode: 'Pinyin Mode',
    pinyinPlaceholder: 'Type in pinyin with tones (1-4)...',
    pinyinLabel: 'Enter in pinyin (e.g., ni3hao3)',
    textPlaceholder: 'Enter your Chinese text here...',
    clear: 'Clear',
    translate: 'Translate',

    // Library view
    library: 'Library',
    search: 'Search...',

    // Collection view
    collection: 'Collection',
    view: 'View',
    delete: 'Delete',

    // Messages
    loading: 'Loading...',
    loadingDictionary: 'Loading dictionary...',
    errorLoadingDictionary: 'Error loading dictionary',
    textAddedToCollection: 'Text added to collection!',
    textAlreadyInCollection: 'This text is already in your collection',
    confirmDelete: 'Are you sure you want to delete this item?',

    // Empty states
    emptyCollection: 'Your collection is empty',
    emptyCollectionDesc: 'Add texts from the reading view or library',
    noResults: 'No results found',
    noSuggestions: 'No suggestions found',

    // Phrase categories
    greetings: 'Greetings',
    basicConversation: 'Basic Conversation',
    numbers: 'Numbers',
    time: 'Time',
    family: 'Family',
    food: 'Food',
    shopping: 'Shopping',
    directions: 'Directions',
    health: 'Health',

    // Accessibility
    closeTooltip: 'Close tooltip',
    expandCategory: 'Expand category',
    collapseCategory: 'Collapse category',

    // Help view
    helpTitle: 'How to Use Pinyin Reader',
    helpIntro: 'Pinyin Reader helps you learn Chinese by automatically converting text to Pinyin with tones and definitions.',
    helpReadingTitle: '📖 Reading View',
    helpReadingDesc: 'Displays your Chinese text with Pinyin pronunciation and word definitions. Hover over characters to see details.',
    helpEditTitle: '✏️ Edit View',
    helpEditDesc: 'Enter or paste Chinese text. Use Pinyin Mode to type Chinese characters using pinyin input (e.g., ni3hao3 → 你好).',
    helpCollectionTitle: '💾 Collection',
    helpCollectionDesc: 'Save your favorite texts for later. View or delete saved items.',
    helpLibraryTitle: '📚 Library',
    helpLibraryDesc: 'Browse pre-built dialogues organized by HSK level. Click phrases to view them in Reading mode.',
    helpFeaturesTitle: 'Key Features',
    helpFeature1: 'HSK level color coding for difficulty',
    helpFeature2: 'Offline support (PWA)',
    helpFeature3: 'Auto-load from clipboard',
    helpFeature4: 'Bilingual interface (EN/FR)',
    helpGithubTitle: 'Open Source',
    helpGithubDesc: 'This project is open source. Contribute or report issues on GitHub:',
    helpGithubLink: 'View on GitHub'
  },

  fr: {
    // App title
    appTitle: 'Pinyin Reader - Lecteur de Chinois',

    // Views
    readingView: 'Lecture',
    editView: 'Éditer',
    collectionView: 'Collection',
    libraryView: 'Librairie',
    helpView: 'Aide',

    // Reading view
    addToCollection: 'Ajouter à la collection',

    // Edit view
    newText: 'Nouveau texte',
    pinyinMode: 'Mode Pinyin',
    pinyinPlaceholder: 'Tapez en pinyin avec les tons (1-4)...',
    pinyinLabel: 'Saisissez en pinyin (ex: ni3hao3)',
    textPlaceholder: 'Saisissez votre texte chinois ici...',
    clear: 'Effacer',
    translate: 'Traduire',

    // Library view
    library: 'Librairie',
    search: 'Rechercher...',

    // Collection view
    collection: 'Collection',
    view: 'Voir',
    delete: 'Supprimer',

    // Messages
    loading: 'Chargement...',
    loadingDictionary: 'Chargement du dictionnaire...',
    errorLoadingDictionary: 'Erreur de chargement du dictionnaire',
    textAddedToCollection: 'Texte ajouté à la collection !',
    textAlreadyInCollection: 'Ce texte est déjà dans votre collection',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',

    // Empty states
    emptyCollection: 'Votre collection est vide',
    emptyCollectionDesc: 'Ajoutez des textes depuis la vue lecture ou la librairie',
    noResults: 'Aucun résultat trouvé',
    noSuggestions: 'Aucune suggestion trouvée',

    // Phrase categories
    greetings: 'Salutations',
    basicConversation: 'Conversation de base',
    numbers: 'Nombres',
    time: 'Temps',
    family: 'Famille',
    food: 'Nourriture',
    shopping: 'Achats',
    directions: 'Directions',
    health: 'Santé',

    // Accessibility
    closeTooltip: 'Fermer l\'info-bulle',
    expandCategory: 'Développer la catégorie',
    collapseCategory: 'Réduire la catégorie',

    // Help view
    helpTitle: 'Comment utiliser Pinyin Reader',
    helpIntro: 'Pinyin Reader vous aide à apprendre le chinois en convertissant automatiquement le texte en Pinyin avec les tons et les définitions.',
    helpReadingTitle: '📖 Vue Lecture',
    helpReadingDesc: 'Affiche votre texte chinois avec la prononciation Pinyin et les définitions des mots. Survolez les caractères pour voir les détails.',
    helpEditTitle: '✏️ Vue Éditer',
    helpEditDesc: 'Saisissez ou collez du texte chinois. Utilisez le Mode Pinyin pour taper des caractères chinois en pinyin (ex: ni3hao3 → 你好).',
    helpCollectionTitle: '💾 Collection',
    helpCollectionDesc: 'Enregistrez vos textes favoris pour plus tard. Consultez ou supprimez les éléments sauvegardés.',
    helpLibraryTitle: '📚 Librairie',
    helpLibraryDesc: 'Parcourez les dialogues pré-construits organisés par niveau HSK. Cliquez sur les phrases pour les voir en mode Lecture.',
    helpFeaturesTitle: 'Fonctionnalités clés',
    helpFeature1: 'Code couleur par niveau HSK pour la difficulté',
    helpFeature2: 'Support hors ligne (PWA)',
    helpFeature3: 'Chargement automatique depuis le presse-papiers',
    helpFeature4: 'Interface bilingue (EN/FR)',
    helpGithubTitle: 'Open Source',
    helpGithubDesc: 'Ce projet est open source. Contribuez ou signalez des problèmes sur GitHub :',
    helpGithubLink: 'Voir sur GitHub'
  }
};

class I18n {
  constructor() {
    // Auto-detect browser language
    // Check if browser language is French, otherwise default to English
    const browserLang = navigator.language || navigator.userLanguage;
    const isFrench = browserLang.toLowerCase().startsWith('fr');
    this.currentLanguage = isFrench ? 'fr' : 'en';
  }

  /**
   * Get translation for a key
   * @param {string} key - Translation key
   * @returns {string} Translated text
   */
  t(key) {
    return translations[this.currentLanguage][key] || translations.en[key] || key;
  }

  /**
   * Set current language
   * @param {string} lang - Language code (en or fr)
   */
  setLanguage(lang) {
    if (translations[lang]) {
      this.currentLanguage = lang;
      this.updateUI();
    }
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getLanguage() {
    return this.currentLanguage;
  }

  /**
   * Update all UI elements with data-i18n attributes
   */
  updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);

      // Update text content or placeholder based on element type
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translation;
        } else {
          element.value = translation;
        }
      } else {
        element.textContent = translation;
      }
    });

    // Update page title
    document.title = this.t('appTitle');

    // Dispatch custom event for components that need to refresh
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: this.currentLanguage } }));
  }
}

// Create singleton instance
export const i18n = new I18n();

// Export for use in other modules
export default i18n;
