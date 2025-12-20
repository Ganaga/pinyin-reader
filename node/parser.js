const pinyin = require('./pinyin.js');
const Parser = require('parse-cc-cedict');
const fs = require('fs');
const axios = require('axios');

const hsk = {};
const data = Parser.parseFile('cedict_ts.u8');
const dictIndex = {};

// load hsk vocab
axios.get('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-1.json').then(hsk1 => {
    axios.get('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-2.json').then(hsk2 => {
        axios.get('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-3.json').then(hsk3 => {
            axios.get('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-4.json').then(hsk4 => {
                axios.get('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-5.json').then(hsk4 => {
                    axios.get('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-6.json').then(hsk4 => {
                        hsk1.data.forEach(e => hsk[e.hanzi] = 1);
                        hsk2.data.forEach(e => hsk[e.hanzi] = 2);
                        hsk3.data.forEach(e => hsk[e.hanzi] = 3);
                        hsk4.data.forEach(e => hsk[e.hanzi] = 4);

                        data.forEach(e => {
                            if(e.definitions) {
                                e.definitions.map(d => pinyin.normalizePinyin(d));
                            }
                            const entry = {
                                p: pinyin.normalizePinyin(e.pronunciation),
                                d: e.definitions
                            }
                            if(hsk[e.simplified]) entry.h = hsk[e.simplified];
                            dictIndex[e.simplified] = entry;
                        });

                        fs.writeFile('../public/pinyin.json', JSON.stringify(dictIndex), err => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            //file written successfully
                        })
                        console.log('Done - ' + Object.keys(dictIndex).length + ' entries');

                    });
                });
            });
        });
    });
});




