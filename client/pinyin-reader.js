class PinyinReader {
    constructor() {
        this.specialWords = ['我', '了', '妳', '她', '它', '沒有', '是', '有', '他們', '自己'];
    }

    init(callback) {
        $.ajax({
            url: 'pinyin.json',
            datatype: 'json',
            success: (dict)=>{
                this.dict = dict;
                $('#parse').removeClass('disabled');
                if(callback) callback();
            }
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
        const parts = this.getParts(text);

        let result = '<div class="row">';
        parts.forEach(e=>{
            if(e.p) {
                let tooltip = `${e.p}\n${e.d}`;
                result += `<div class="col-sm charblock" >
                <span class="label label-default" href="#" data-toggle="tooltip" data-placement="top" title="${tooltip}">${e.s}</span>
                </div>`;
            } else {
                result += `<div class="col-sm charblock" >
                <span class="label label-default">${e.s}</span>
                </div>`;
            }
        });
        result += '</div>';
        return result;
    }

}