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
    libraryView: 'Library',
    collectionView: 'Collection',

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
    collapseCategory: 'Collapse category'
  },

  fr: {
    // App title
    appTitle: 'Pinyin Reader - Lecteur de Chinois',

    // Views
    readingView: 'Lecture',
    editView: 'Éditer',
    libraryView: 'Librairie',
    collectionView: 'Collection',

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
    collapseCategory: 'Réduire la catégorie'
  }
};

class I18n {
  constructor() {
    // Default to English
    this.currentLanguage = localStorage.getItem('language') || 'en';
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
      localStorage.setItem('language', lang);
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
