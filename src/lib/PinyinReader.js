/**
 * PinyinReader - Main class for Chinese to Pinyin translation
 * Converted to vanilla JS (no jQuery dependency)
 */
import { BUILT_IN_PHRASES } from '../data/phrases.js';
import { initTooltips } from '../utils/bootstrap-utils.js';

export class PinyinReader {
    constructor() {
        this.currentView = 'result-view';
        this.allPhrases = [];
        this.dict = null;
        this.text = '';
        this.history = [];
        this.tooltips = [];
    }

    /**
     * Initialize the reader by loading the dictionary
     * @param {Function} callback - Called when dictionary is loaded
     */
    async init(callback) {
        // Load text and history from localStorage
        this.text = window.localStorage.getItem('text');
        if (!this.text) {
            this.text = '您好，这个应用程序可以帮助您学习中文。它允许您将文本翻译成带有相关翻译的拼音。';
        }

        const historyString = window.localStorage.getItem('history');
        if (historyString) {
            this.history = JSON.parse(historyString);
        } else {
            this.history = [];
        }

        // Load dictionary with progress tracking
        try {
            const response = await fetch('/pinyin.json');
            const contentLength = response.headers.get('content-length');
            const total = parseInt(contentLength, 10);
            const reader = response.body.getReader();

            let receivedLength = 0;
            const chunks = [];
            const progressBar = document.querySelector('.progress-bar');

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                chunks.push(value);
                receivedLength += value.length;

                // Update progress bar
                if (progressBar && total) {
                    const percent = Math.round((receivedLength / total) * 100);
                    progressBar.style.width = percent + '%';
                }
            }

            // Combine chunks and decode
            const chunksAll = new Uint8Array(receivedLength);
            let position = 0;
            for (let chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }

            const textContent = new TextDecoder("utf-8").decode(chunksAll);
            this.dict = JSON.parse(textContent);

            // Enable parse button
            const parseBtn = document.getElementById('parse');
            if (parseBtn) {
                parseBtn.classList.remove('disabled');
            }

            if (callback) callback();

        } catch (error) {
            console.error('Error loading dictionary:', error);
        }
    }

    /**
     * Parse Chinese text into parts (characters/words with pinyin data)
     * @param {string} text - Chinese text to parse
     * @returns {Array} Array of parts with pinyin and definitions
     */
    getParts(text) {
        let parts = [];
        for (let i = 0; i < text.length; i++) {
            let l = 1;
            let candidate;
            let chunk;

            // Try to match longest possible word (up to 5 characters)
            while (l < 6) {
                chunk = text.substring(i, i + l);
                const potentialCandidate = this.dict[chunk];
                if (potentialCandidate) {
                    candidate = potentialCandidate;
                    candidate.s = chunk;
                }
                l++;
            }

            if (candidate) {
                parts.push(candidate);
            } else {
                chunk = text.substring(i, i + 1);
                if (chunk !== ' ') parts.push({ s: chunk });
            }

            if (candidate) i = i + candidate.s.length - 1;
        }
        return parts;
    }

    /**
     * Generate HTML result with pinyin tooltips
     * @param {string} text - Chinese text to translate
     * @returns {string} HTML string with pinyin annotations
     */
    showResult(text) {
        this.save(text);
        const parts = this.getParts(text);
        const colors = ['#737cfa', '#737cfa', 'rgb(219, 144, 108)', 'rgb(224, 118, 107)', 'rgb(228, 93, 107)', 'rgb(233, 68, 106)'];

        let result = '<div class="row"><div class="col sm">';
        parts.forEach(e => {
            if (e.p) {
                let tooltip = `<b>${e.p}</b><p>${e.d}</p>`;
                if (e.h) tooltip += `<p>HSK${e.h}</p>`;
                let color = e.h ? 'color: ' + colors[e.h] : '';
                result += `
                <span class="label label-defaul charblock" style="${color}" href="#" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" title="${tooltip}">${e.s}</span>
                `;
            } else {
                result += `<span class="label label-default">${e.s}</span>`;
            }
        });
        result += '</div></div>';
        return result;
    }

    /**
     * Save text to localStorage and history
     * @param {string} text - Text to save
     */
    save(text) {
        if (text && text.length > 0) {
            window.localStorage.setItem('text', text);

            let exists = false;
            this.history.forEach(e => {
                if (e.text === text) exists = true;
            });

            if (!exists) {
                this.history.unshift({ text: text, date: Date.now() });
                window.localStorage.setItem('history', JSON.stringify(this.history));
                this.loadHistory();
            }
        }
    }

    /**
     * Switch between different views
     * @param {string} viewId - ID of the view to show
     */
    switchView(viewId) {
        // Update view visibility
        document.querySelectorAll('.view-content').forEach(el => {
            el.classList.remove('active');
        });
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Update nav buttons
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
        });
        const targetNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        }

        this.currentView = viewId;

        // Scroll to top
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }

    /**
     * Load phrases into the phrases view
     */
    loadPhrases() {
        const container = document.getElementById('phrases-list');
        if (!container) return;

        container.innerHTML = '';

        for (const categoryKey in BUILT_IN_PHRASES) {
            const category = BUILT_IN_PHRASES[categoryKey];
            const categoryHtml = `
                <div class="phrase-category" data-category="${categoryKey}">
                    <div class="category-header collapsed" data-category-key="${categoryKey}">
                        <span class="icon">${category.icon}</span>
                        <span>${category.title}</span>
                        <i class="bi bi-chevron-down toggle-icon"></i>
                    </div>
                    <div class="category-phrases collapsed" id="category-${categoryKey}">
                        ${category.phrases.map(phrase => `
                            <div class="phrase-item" data-phrase="${phrase.zh.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}">
                                <div class="phrase-zh">${phrase.zh}</div>
                                <div class="phrase-translations">
                                    <div class="phrase-fr">${phrase.fr}</div>
                                    <div class="phrase-en">${phrase.en}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', categoryHtml);
        }

        // Add event listeners for category headers
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const categoryKey = header.dataset.categoryKey;
                this.toggleCategory(categoryKey);
            });
        });

        // Add event listeners for phrase items
        document.querySelectorAll('.phrase-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const text = item.dataset.phrase;
                this.selectPhrase(text);
            });
        });
    }

    /**
     * Toggle category collapse state
     * @param {string} categoryKey - Key of the category to toggle
     */
    toggleCategory(categoryKey) {
        const categoryEl = document.getElementById(`category-${categoryKey}`);
        const headerEl = categoryEl?.parentElement.querySelector('.category-header');

        if (categoryEl) {
            categoryEl.classList.toggle('collapsed');
        }
        if (headerEl) {
            headerEl.classList.toggle('collapsed');
        }
    }

    /**
     * Select a phrase and translate it
     * @param {string} text - Phrase text to translate
     */
    selectPhrase(text) {
        const textInput = document.getElementById('textInput');
        const result = document.getElementById('result');

        if (textInput) textInput.value = text;
        if (result) result.innerHTML = this.showResult(text);

        // Reinitialize tooltips
        this.tooltips = initTooltips('[data-bs-toggle="tooltip"]');

        this.switchView('result-view');
    }

    /**
     * Filter phrases by search query
     * @param {string} query - Search query
     */
    filterPhrases(query) {
        query = query.toLowerCase().trim();

        if (query === '') {
            // Show all categories and phrases
            document.querySelectorAll('.phrase-category').forEach(el => {
                el.style.display = 'block';
            });
            document.querySelectorAll('.phrase-item').forEach(el => {
                el.style.display = 'block';
            });
            return;
        }

        // Filter phrases
        document.querySelectorAll('.phrase-category').forEach(category => {
            let hasVisiblePhrases = false;

            category.querySelectorAll('.phrase-item').forEach(phraseItem => {
                const zh = phraseItem.querySelector('.phrase-zh').textContent;
                const fr = phraseItem.querySelector('.phrase-fr').textContent.toLowerCase();
                const en = phraseItem.querySelector('.phrase-en').textContent.toLowerCase();

                if (zh.includes(query) || fr.includes(query) || en.includes(query)) {
                    phraseItem.style.display = 'block';
                    hasVisiblePhrases = true;
                } else {
                    phraseItem.style.display = 'none';
                }
            });

            // Show/hide category based on whether it has visible phrases
            if (hasVisiblePhrases) {
                category.style.display = 'block';
                // Expand category if it has matches
                const phrasesEl = category.querySelector('.category-phrases');
                const headerEl = category.querySelector('.category-header');
                if (phrasesEl) phrasesEl.classList.remove('collapsed');
                if (headerEl) headerEl.classList.remove('collapsed');
            } else {
                category.style.display = 'none';
            }
        });
    }

    /**
     * Load history into the history view
     */
    loadHistory() {
        const container = document.getElementById('history-list');
        if (!container) return;

        container.innerHTML = '';

        if (!this.history || this.history.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-clock-history"></i>
                    <p>Aucun historique disponible</p>
                </div>
            `;
            return;
        }

        // Sort history by date (most recent first)
        const sortedHistory = [...this.history].sort((a, b) => b.date - a.date);

        sortedHistory.forEach((item, index) => {
            const date = new Date(item.date);
            const dateStr = date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const historyHtml = `
                <div class="history-item" data-history-index="${index}">
                    <button class="history-delete" data-delete-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                    <div class="history-text">${item.text}</div>
                    <div class="history-date">${dateStr}</div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', historyHtml);
        });

        // Add event listeners for history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't trigger if delete button was clicked
                if (!e.target.closest('.history-delete')) {
                    const index = parseInt(item.dataset.historyIndex, 10);
                    this.selectHistory(index);
                }
            });
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.history-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.deleteIndex, 10);
                this.deleteHistory(index);
            });
        });
    }

    /**
     * Select a history item
     * @param {number} index - Index in sorted history array
     */
    selectHistory(index) {
        const sortedHistory = [...this.history].sort((a, b) => b.date - a.date);
        const item = sortedHistory[index];

        if (item) {
            const textInput = document.getElementById('textInput');
            const result = document.getElementById('result');

            if (textInput) textInput.value = item.text;
            if (result) result.innerHTML = this.showResult(item.text);

            this.tooltips = initTooltips('[data-bs-toggle="tooltip"]');
            this.switchView('result-view');
        }
    }

    /**
     * Delete a history item
     * @param {number} index - Index in sorted history array
     */
    deleteHistory(index) {
        const sortedHistory = [...this.history].sort((a, b) => b.date - a.date);
        const itemToDelete = sortedHistory[index];

        // Find the item in the original history array
        const originalIndex = this.history.findIndex(item =>
            item.text === itemToDelete.text && item.date === itemToDelete.date
        );

        if (originalIndex !== -1) {
            this.history.splice(originalIndex, 1);
            window.localStorage.setItem('history', JSON.stringify(this.history));
            this.loadHistory();
        }
    }

    // Pinyin input methods

    /**
     * Remove tone marks from pinyin for comparison
     * @param {string} pinyin - Pinyin with tone marks
     * @returns {string} Normalized pinyin without tones or spaces
     */
    removeToneMarks(pinyin) {
        const toneMap = {
            'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
            'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
            'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
            'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
            'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
            'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü',
            'ü': 'u', 'ń': 'n', 'ň': 'n', 'ǹ': 'n'
        };

        return pinyin.toLowerCase().split('').map(char => toneMap[char] || char).join('').replace(/\s+/g, '');
    }

    /**
     * Search dictionary by pinyin input
     * @param {string} pinyinQuery - Pinyin query string
     * @returns {Array} Array of matching characters/words
     */
    searchByPinyin(pinyinQuery) {
        if (!pinyinQuery || pinyinQuery.trim() === '') {
            return [];
        }

        // Normalize the query: lowercase and remove tone marks/numbers
        let query = pinyinQuery.toLowerCase().trim();
        // Remove tone numbers (1-4) if present
        query = query.replace(/[1-4]/g, '');

        const results = [];

        // Search through the dictionary
        for (const char in this.dict) {
            const entry = this.dict[char];
            if (entry.p) {
                // Get the pinyin without tone marks for comparison
                const entryPinyinNormalized = this.removeToneMarks(entry.p);

                // Check if the pinyin matches (exact or starts with)
                if (entryPinyinNormalized === query || entryPinyinNormalized.startsWith(query)) {
                    results.push({
                        char: char,
                        pinyin: entry.p,
                        definitions: entry.d,
                        hsk: entry.h
                    });
                }
            }
        }

        // Sort by HSK level (lower first) and then by character length
        results.sort((a, b) => {
            if (a.hsk && b.hsk) {
                return a.hsk - b.hsk;
            } else if (a.hsk) {
                return -1;
            } else if (b.hsk) {
                return 1;
            }
            return a.char.length - b.char.length;
        });

        // Limit to top 10 results
        return results.slice(0, 10);
    }

    /**
     * Display pinyin suggestions in the UI
     * @param {string} pinyinQuery - Pinyin query string
     */
    displayPinyinSuggestions(pinyinQuery) {
        const container = document.getElementById('pinyinSuggestions');
        if (!container) return;

        container.innerHTML = '';

        if (!pinyinQuery || pinyinQuery.trim() === '') {
            return;
        }

        const suggestions = this.searchByPinyin(pinyinQuery);

        if (suggestions.length === 0) {
            container.innerHTML = '<div class="no-suggestions">Aucun caractère trouvé pour ce pinyin</div>';
            return;
        }

        suggestions.forEach(suggestion => {
            const firstDef = suggestion.definitions && suggestion.definitions.length > 0
                ? suggestion.definitions[0]
                : '';

            const hskBadge = suggestion.hsk
                ? `<span style="font-size:0.7rem;color:#999"> HSK${suggestion.hsk}</span>`
                : '';

            const suggestionHtml = `
                <div class="suggestion-item" data-char="${suggestion.char.replace(/"/g, '&quot;')}">
                    <span class="suggestion-char">${suggestion.char}</span>
                    <span class="suggestion-pinyin">${suggestion.pinyin}${hskBadge}</span>
                    <span class="suggestion-definition">${firstDef}</span>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', suggestionHtml);
        });

        // Add event listeners for suggestion items
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const char = item.dataset.char;
                this.insertCharacter(char);
            });
        });
    }

    /**
     * Insert character at cursor position in text input
     * @param {string} char - Character to insert
     */
    insertCharacter(char) {
        const textInput = document.getElementById('textInput');
        if (!textInput) return;

        const currentText = textInput.value;
        const cursorPos = textInput.selectionStart;

        // Insert character at cursor position
        const newText = currentText.substring(0, cursorPos) + char + currentText.substring(cursorPos);
        textInput.value = newText;

        // Move cursor after inserted character
        const newCursorPos = cursorPos + char.length;
        textInput.setSelectionRange(newCursorPos, newCursorPos);
        textInput.focus();

        // Clear pinyin input
        const pinyinInput = document.getElementById('pinyinInput');
        const pinyinSuggestions = document.getElementById('pinyinSuggestions');
        if (pinyinInput) pinyinInput.value = '';
        if (pinyinSuggestions) pinyinSuggestions.innerHTML = '';
    }

    /**
     * Toggle pinyin input section visibility
     */
    togglePinyinInput() {
        const section = document.getElementById('pinyinInputSection');
        const button = document.getElementById('toggleInputMode');
        if (!section || !button) return;

        const isVisible = section.style.display !== 'none' && section.style.display !== '';

        if (isVisible) {
            // Slide up
            section.style.transition = 'height 200ms ease';
            section.style.height = section.scrollHeight + 'px';
            requestAnimationFrame(() => {
                section.style.height = '0';
                section.style.overflow = 'hidden';
            });
            setTimeout(() => {
                section.style.display = 'none';
                section.style.height = '';
                section.style.overflow = '';
                section.style.transition = '';
            }, 200);
            button.innerHTML = '<i class="bi bi-keyboard"></i> Mode Pinyin';
        } else {
            // Slide down
            section.style.display = 'block';
            const height = section.scrollHeight;
            section.style.height = '0';
            section.style.overflow = 'hidden';
            section.style.transition = 'height 200ms ease';
            requestAnimationFrame(() => {
                section.style.height = height + 'px';
            });
            setTimeout(() => {
                section.style.height = '';
                section.style.overflow = '';
                section.style.transition = '';
                const pinyinInput = document.getElementById('pinyinInput');
                if (pinyinInput) pinyinInput.focus();
            }, 200);
            button.innerHTML = '<i class="bi bi-x-circle"></i> Fermer';
        }
    }
}
