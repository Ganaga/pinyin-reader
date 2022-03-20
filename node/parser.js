const pinyin = require('./pinyin.js');
const Parser = require('parse-cc-cedict');
const fs = require('fs');

const data = Parser.parseFile('cedict_ts.u8');
const dictIndex = {};
/*data.forEach(e=>{
    const entry = {
        s: e.simplified,
        p: pinyin.normalizePinyin(e.pronunciation),
        d: e.definitions
    }
    const firstChar  = e.simplified[0];
    const index = dictIndex[firstChar];
    if(!index) {
        dictIndex[firstChar] = [entry];
    } else {
        index.push(entry);
    }
});*/

data.forEach(e=>{
    const entry = {
        p: pinyin.normalizePinyin(e.pronunciation),
        d: e.definitions
    }
    dictIndex[e.simplified] = entry;
});

fs.writeFile('../client/pinyin.json', JSON.stringify(dictIndex), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
  console.log('Done - ' + Object.keys(dictIndex).length + ' entries');