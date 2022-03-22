class PinyinReader {
    constructor() {
    }

    init(callback) {
        this.text = window.localStorage.getItem('text');
        if(!this.text) this.text = '您好，这个应用程序可以帮助您学习中文。它允许您将文本翻译成带有相关翻译的拼音。';
        const historyString = window.localStorage.getItem('history');
        if(this.historyString) this.history = JSON.parse(history);
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
                this.history.push({text: text, date: Date.now()});
                window.localStorage.setItem('history', JSON.stringify(this.history));
            }
        }
    }

}