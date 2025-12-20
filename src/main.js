/**
 * Main entry point for Pinyin Reader application
 */

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

// Import application code
import { PinyinReader } from './lib/PinyinReader.js';
import { initTooltips } from './utils/bootstrap-utils.js';
import { i18n } from './utils/i18n.js';

// Initialize i18n and update UI
i18n.updateUI();

// Update language indicator
const updateLanguageIndicator = () => {
    const languageSpan = document.getElementById('currentLanguage');
    if (languageSpan) {
        languageSpan.textContent = i18n.getLanguage().toUpperCase();
    }
};
updateLanguageIndicator();

// Initialize the application
const pr = new PinyinReader();

// Make pr globally accessible for debugging (optional)
window.pr = pr;

// Initialize the application when dictionary is loaded
pr.init(() => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }, 100);

    // Set initial text input value
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.value = pr.text;
    }

    // Show initial result
    const result = document.getElementById('result');
    if (result) {
        result.innerHTML = pr.showResult(pr.text);
    }

    // Initialize Bootstrap tooltips
    initTooltips('[data-bs-toggle="tooltip"]');

    // Show bottom navigation
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'flex';
    }

    // Load phrases and history
    pr.loadPhrases();
    pr.loadHistory();

    // Switch to result view by default
    pr.switchView('result-view');
});

// Parse button click
const parseBtn = document.getElementById('parse');
if (parseBtn) {
    parseBtn.addEventListener('click', () => {
        const textInput = document.getElementById('textInput');
        const text = textInput ? textInput.value : '';

        if (text && text.trim().length > 0) {
            const result = document.getElementById('result');
            if (result) {
                result.innerHTML = pr.showResult(text);
            }
            initTooltips('[data-bs-toggle="tooltip"]');
            pr.switchView('result-view');
        }
    });
}

// Add current text to collection button
const addCurrentBtn = document.getElementById('addCurrentToCollection');
if (addCurrentBtn) {
    addCurrentBtn.addEventListener('click', () => {
        pr.addCurrentTextToCollection();
    });
}

// Clear button click
const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        const textInput = document.getElementById('textInput');
        if (textInput) {
            textInput.value = '';
            textInput.focus();
        }
    });
}

// Bottom nav click handlers
document.querySelectorAll('.nav-item').forEach(navItem => {
    navItem.addEventListener('click', function() {
        const viewId = this.dataset.view;
        pr.switchView(viewId);
    });
});

// Phrase search
const phraseSearch = document.getElementById('phraseSearch');
if (phraseSearch) {
    phraseSearch.addEventListener('input', function() {
        pr.filterPhrases(this.value);
    });
}

// Pinyin input mode toggle
const toggleInputMode = document.getElementById('toggleInputMode');
if (toggleInputMode) {
    toggleInputMode.addEventListener('click', () => {
        pr.togglePinyinInput();
    });
}

// Pinyin input with real-time suggestions
const pinyinInput = document.getElementById('pinyinInput');
if (pinyinInput) {
    pinyinInput.addEventListener('input', function() {
        pr.displayPinyinSuggestions(this.value);
    });

    // Allow pressing Enter to select first suggestion
    pinyinInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const firstSuggestion = document.querySelector('.suggestion-item');
            if (firstSuggestion) {
                firstSuggestion.click();
            }
        }
    });
}

// Language toggle
const languageToggle = document.getElementById('languageToggle');
if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        const newLang = i18n.getLanguage() === 'en' ? 'fr' : 'en';
        i18n.setLanguage(newLang);
        updateLanguageIndicator();
    });
}

// Listen for language changes to update dynamic content
window.addEventListener('languageChanged', () => {
    // Reload phrases with new language
    if (pr && typeof pr.loadPhrases === 'function') {
        pr.loadPhrases();
    }
    // Reload collection with new language
    if (pr && typeof pr.loadCollection === 'function') {
        pr.loadCollection();
    }
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
