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
    '告': 111, '知': 112, '很': 113, '呢': 114, '吗': 115, '吧': 116, '啊': 117, '什': 118, '哦': 119, '几': 120,
    '最': 121, '工': 122, '意': 123, '第': 124, '手': 125, '重': 126, '己': 127, '位': 128, '力': 129, '业': 130,
    '产': 131, '名': 132, '通': 133, '新': 134, '门': 135, '明': 136, '情': 137, '必': 138, '正': 139, '此': 140,
    '外': 141, '机': 142, '高': 143, '将': 144, '物': 145, '问': 146, '三': 147, '目': 148, '关': 149, '身': 150,
    '合': 151, '代': 152, '或': 153, '总': 154, '教': 155, '结': 156, '体': 157, '与': 158, '条': 159, '政': 160,
    '果': 161, '原': 162, '口': 163, '数': 164, '水': 165, '性': 166, '加': 167, '常': 168, '间': 169, '论': 170,
    '领': 171, '军': 172, '较': 173, '各': 174, '电': 175, '表': 176, '品': 177, '真': 178, '书': 179, '且': 180,
    '斯': 181, '点': 182, '变': 183, '受': 184, '十': 185, '已': 186, '农': 187, '反': 188, '际': 189, '连': 190,
    '接': 191, '党': 192, '员': 193, '角': 194, '期': 195, '根': 196, '化': 197, '清': 198, '美': 199, '集': 200,
    '信': 201, '完': 202, '回': 203, '场': 204, '象': 205, '步': 206, '保': 207, '认': 208, '处': 209, '备': 210,
    '传': 211, '利': 212, '先': 213, '该': 214, '内': 215, '记': 216, '克': 217, '何': 218, '特': 219, '度': 220,
    '向': 221, '统': 222, '制': 223, '例': 224, '至': 225, '难': 226, '革': 227, '运': 228, '示': 229, '西': 230,
    '究': 231, '文': 232, '决': 233, '越': 234, '二': 235, '放': 236, '权': 237, '观': 238, '程': 239, '使': 240,
    '院': 241, '车': 242, '满': 243, '每': 244, '风': 245, '级': 246, '队': 247, '非': 248, '色': 249, '光': 250,
    '亲': 251, '选': 252, '王': 253, '格': 254, '量': 255, '指': 256, '强': 257, '即': 258, '究': 259, '太': 260,
    '候': 261, '神': 262, '系': 263, '活': 264, '社': 265, '增': 266, '便': 267, '况': 268, '九': 269, '武': 270,
    '音': 271, '建': 272, '打': 273, '收': 274, '离': 275, '华': 276, '族': 277, '世': 278, '拉': 279, '深': 280,
    '取': 281, '证': 282, '花': 283, '它': 284, '持': 285, '称': 286, '费': 287, '别': 288, '历': 289, '战': 290,
    '边': 291, '思': 292, '毛': 293, '提': 294, '精': 295, '值': 296, '整': 297, '始': 298, '四': 299, '维': 300
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




