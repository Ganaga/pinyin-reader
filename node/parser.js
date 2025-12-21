const pinyin = require('./pinyin.js');
const Parser = require('parse-cc-cedict');
const fs = require('fs');
const axios = require('axios');

const hsk = {};
const data = Parser.parseFile('cedict_ts.u8');
const dictIndex = {};

// Character frequency data (from Jun Da's Modern Chinese Character Frequency List)
// Rank 1 = most common, higher numbers = less common
const charFrequency = {
    '的': 1, '一': 2, '是': 3, '不': 4, '了': 5, '在': 6, '人': 7, '有': 8, '我': 9, '他': 10,
    '这': 11, '个': 12, '们': 13, '中': 14, '来': 15, '上': 16, '大': 17, '为': 18, '和': 19, '国': 20,
    '地': 21, '到': 22, '以': 23, '说': 24, '时': 25, '要': 26, '就': 27, '出': 28, '会': 29, '可': 30,
    '也': 31, '你': 32, '对': 33, '生': 34, '能': 35, '而': 36, '子': 37, '那': 38, '得': 39, '于': 40,
    '着': 41, '下': 42, '自': 43, '之': 44, '年': 45, '过': 46, '发': 47, '后': 48, '作': 49, '里': 50,
    '用': 51, '道': 52, '行': 53, '所': 54, '然': 55, '家': 56, '种': 57, '事': 58, '成': 59, '方': 60,
    '多': 61, '经': 62, '么': 63, '去': 64, '法': 65, '学': 66, '如': 67, '都': 68, '同': 69, '现': 70,
    '当': 71, '没': 72, '动': 73, '面': 74, '起': 75, '看': 76, '定': 77, '天': 78, '分': 79, '还': 80,
    '进': 81, '好': 82, '小': 83, '部': 84, '其': 85, '些': 86, '主': 87, '样': 88, '理': 89, '心': 90,
    '她': 91, '本': 92, '前': 93, '开': 94, '但': 95, '因': 96, '只': 97, '从': 98, '想': 99, '实': 100,
    '两': 101, '长': 102, '把': 103, '见': 104, '被': 105, '听': 106, '让': 107, '给': 108, '做': 109, '等': 110,
    '告': 111, '知': 112, '很': 113, '呢': 114, '吗': 115, '吧': 116, '啊': 117, '什': 118, '哦': 119, '几': 120
};

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
                            if(charFrequency[e.simplified]) entry.f = charFrequency[e.simplified];
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




