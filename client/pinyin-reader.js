class PinyinReader {
    constructor() {
        this.currentView = 'result-view';
        this.allPhrases = [];
    }

    init(callback) {
        this.text = window.localStorage.getItem('text');
        if(!this.text) this.text = '您好，这个应用程序可以帮助您学习中文。它允许您将文本翻译成带有相关翻译的拼音。';
        const historyString = window.localStorage.getItem('history');
        if(historyString) this.history = JSON.parse(historyString);
        else this.history = [];
        $.ajax({
            url: 'pinyin.json',
            datatype: 'json',
            success: (dict)=>{
                this.dict = dict;
                $('#parse').removeClass('disabled');
                if(callback) callback();
            },
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                //Download progress
                xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        const percent = (Math.round(percentComplete * 100) + "%");
                        $('.progress-bar').css('width', percent)
                    }
                }, false);
                return xhr;
            },
        })
    }

    getParts(text) {
        let parts = [];
        for(let i=0;i<text.length;i++) {
            let l=1;
            let candidate;
            let chunk;
            while(l<6) {
                chunk = text.substring(i,i+l);
                const potentialCandidate = this.dict[chunk];
                if(potentialCandidate) {
                    candidate = potentialCandidate;
                    candidate.s = chunk;
                }
                l++;
            }
            if(candidate) {
                parts.push(candidate);
            }
            else {
                chunk = text.substring(i,i+1);
                if(chunk !== ' ')  parts.push({s:chunk});
            }
            if(candidate) i=i+candidate.s.length-1;
        }
        return parts;
    }

    showResult(text) {
        this.save(text);
        const parts = this.getParts(text);
        const colors = ['#737cfa', '#737cfa', 'rgb(219, 144, 108)', 'rgb(224, 118, 107)', 'rgb(228, 93, 107)', 'rgb(233, 68, 106)'];
        let result = '<div class="row"><div class="col sm">';
        parts.forEach(e=>{
            if(e.p) {
                let tooltip = `<b>${e.p}</b><p>${e.d}</p>`;
                if(e.h) tooltip += `<p>HSK${e.h}</p>`;
                let color = e.h ? 'color: ' + colors[e.h] : '';
                result += `
                <span class="label label-defaul charblock" style="${color}" href="#" data-toggle="tooltip" data-html="true" data-placement="top" title="${tooltip}">${e.s}</span>
                `;
            } else {
                result += `<span class="label label-default">${e.s}</span>`;
            }
        });
        result += '</div></div>';
        return result;
    }

    save(text) {
        if(text && text.length > 0) {
            window.localStorage.setItem('text', text);
            let exists = false;
            this.history.forEach(e=>{
                if(e.text===text) exists=true;
            });
            if(!exists) {
                this.history.unshift({text: text, date: Date.now()}); // Add to beginning
                window.localStorage.setItem('history', JSON.stringify(this.history));
                this.loadHistory(); // Refresh history view
            }
        }
    }

    // View switching
    switchView(viewId) {
        // Update view visibility
        $('.view-content').removeClass('active');
        $(`#${viewId}`).addClass('active');

        // Update nav buttons
        $('.nav-item').removeClass('active');
        $(`.nav-item[data-view="${viewId}"]`).addClass('active');

        this.currentView = viewId;

        // Scroll to top
        $('#main-content').scrollTop(0);
    }

    // Load phrases into the phrases view
    loadPhrases() {
        const container = $('#phrases-list');
        container.empty();

        for (const categoryKey in BUILT_IN_PHRASES) {
            const category = BUILT_IN_PHRASES[categoryKey];
            const categoryHtml = `
                <div class="phrase-category" data-category="${categoryKey}">
                    <div class="category-header collapsed" onclick="pr.toggleCategory('${categoryKey}')">
                        <span class="icon">${category.icon}</span>
                        <span>${category.title}</span>
                        <i class="bi bi-chevron-down toggle-icon"></i>
                    </div>
                    <div class="category-phrases collapsed" id="category-${categoryKey}">
                        ${category.phrases.map(phrase => `
                            <div class="phrase-item" onclick="pr.selectPhrase('${phrase.zh.replace(/'/g, "\\'")}')">
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
            container.append(categoryHtml);
        }
    }

    // Toggle category collapse
    toggleCategory(categoryKey) {
        const categoryEl = $(`#category-${categoryKey}`);
        const headerEl = $(`#category-${categoryKey}`).parent().find('.category-header');

        categoryEl.toggleClass('collapsed');
        headerEl.toggleClass('collapsed');
    }

    // Select a phrase and translate it
    selectPhrase(text) {
        $('#textInput').val(text);
        $('#result').html(this.showResult(text));
        $('[data-toggle="tooltip"]').tooltip({ html: true });
        this.switchView('result-view');
    }

    // Filter phrases by search query
    filterPhrases(query) {
        query = query.toLowerCase().trim();

        if (query === '') {
            // Show all categories
            $('.phrase-category').show();
            $('.phrase-item').show();
            return;
        }

        // Filter phrases
        $('.phrase-category').each(function() {
            const category = $(this);
            let hasVisiblePhrases = false;

            category.find('.phrase-item').each(function() {
                const phraseItem = $(this);
                const zh = phraseItem.find('.phrase-zh').text();
                const fr = phraseItem.find('.phrase-fr').text().toLowerCase();
                const en = phraseItem.find('.phrase-en').text().toLowerCase();

                if (zh.includes(query) || fr.includes(query) || en.includes(query)) {
                    phraseItem.show();
                    hasVisiblePhrases = true;
                } else {
                    phraseItem.hide();
                }
            });

            // Show/hide category based on whether it has visible phrases
            if (hasVisiblePhrases) {
                category.show();
                // Expand category if it has matches
                category.find('.category-phrases').removeClass('collapsed');
                category.find('.category-header').removeClass('collapsed');
            } else {
                category.hide();
            }
        });
    }

    // Load history into the history view
    loadHistory() {
        const container = $('#history-list');
        container.empty();

        if (!this.history || this.history.length === 0) {
            container.html(`
                <div class="empty-state">
                    <i class="bi bi-clock-history"></i>
                    <p>Aucun historique disponible</p>
                </div>
            `);
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
                <div class="history-item" onclick="pr.selectHistory(${index})">
                    <button class="history-delete" onclick="event.stopPropagation(); pr.deleteHistory(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                    <div class="history-text">${item.text}</div>
                    <div class="history-date">${dateStr}</div>
                </div>
            `;
            container.append(historyHtml);
        });
    }

    // Select a history item
    selectHistory(index) {
        const sortedHistory = [...this.history].sort((a, b) => b.date - a.date);
        const item = sortedHistory[index];

        if (item) {
            $('#textInput').val(item.text);
            $('#result').html(this.showResult(item.text));
            $('[data-toggle="tooltip"]').tooltip({ html: true });
            this.switchView('result-view');
        }
    }

    // Delete a history item
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
            this.loadHistory(); // Refresh the view
        }
    }

    // Pinyin input methods
    searchByPinyin(pinyinQuery) {
        if (!pinyinQuery || pinyinQuery.trim() === '') {
            return [];
        }

        // Normalize the pinyin query (convert to lowercase)
        const query = pinyinQuery.toLowerCase().trim();
        const results = [];

        // Search through the dictionary
        for (const char in this.dict) {
            const entry = this.dict[char];
            if (entry.p) {
                // Normalize the pinyin in the dictionary
                const entryPinyin = entry.p.toLowerCase();

                // Check if the pinyin matches (exact or starts with)
                if (entryPinyin === query || entryPinyin.startsWith(query)) {
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

        // Limit to top 20 results
        return results.slice(0, 20);
    }

    displayPinyinSuggestions(pinyinQuery) {
        const container = $('#pinyinSuggestions');
        container.empty();

        if (!pinyinQuery || pinyinQuery.trim() === '') {
            return;
        }

        const suggestions = this.searchByPinyin(pinyinQuery);

        if (suggestions.length === 0) {
            container.html('<div class="no-suggestions">Aucun caractère trouvé pour ce pinyin</div>');
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
                <div class="suggestion-item" onclick="pr.insertCharacter('${suggestion.char.replace(/'/g, "\\'")}')">
                    <span class="suggestion-char">${suggestion.char}</span>
                    <span class="suggestion-pinyin">${suggestion.pinyin}${hskBadge}</span>
                    <span class="suggestion-definition">${firstDef}</span>
                </div>
            `;
            container.append(suggestionHtml);
        });
    }

    insertCharacter(char) {
        const textInput = $('#textInput');
        const currentText = textInput.val();
        const cursorPos = textInput[0].selectionStart;

        // Insert character at cursor position
        const newText = currentText.substring(0, cursorPos) + char + currentText.substring(cursorPos);
        textInput.val(newText);

        // Move cursor after inserted character
        const newCursorPos = cursorPos + char.length;
        textInput[0].setSelectionRange(newCursorPos, newCursorPos);
        textInput.focus();

        // Clear pinyin input
        $('#pinyinInput').val('');
        $('#pinyinSuggestions').empty();
    }

    togglePinyinInput() {
        const section = $('#pinyinInputSection');
        const button = $('#toggleInputMode');

        if (section.is(':visible')) {
            section.slideUp(200);
            button.html('<i class="bi bi-keyboard"></i> Mode Pinyin');
        } else {
            section.slideDown(200);
            button.html('<i class="bi bi-x-circle"></i> Fermer');
            setTimeout(() => $('#pinyinInput').focus(), 250);
        }
    }

}