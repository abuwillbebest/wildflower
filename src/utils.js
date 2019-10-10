import React from 'react';
const inject = obj => Comp => props => <Comp {...obj} {...props} />;


class paging {
    constructor(list) {
        this.fresh = {};
        this.raw = list;

        for (let key in list) {
            let value = list[key];
            this.fresh[value] = key;
        }
    }

    next(num) {
        if (num in this.fresh && this.fresh[num] < parseInt(this.raw.length) - 1) {
            return this.raw[parseInt(this.fresh[num]) + 1];
        }

        else {
            return null;
        }
    };

    pre(num) {
        if (num in this.fresh && this.fresh[num] > 0) {
            return this.raw[this.fresh[num] - 1]
        }
        else {
            return null;
        }
    };

}


function parse_qs(qs, re = /(\w+)=([^&]+)/) {
    let obj = {};
    if (qs.startsWith('?'))
        qs = qs.substr(1)
    console.log(qs);
    qs.split('&').forEach(element => {
        let match = re.exec(element);
        //console.log(match)
        if (match) obj[match[1]] = match[2];
    });
    return obj;
}

export { inject, parse_qs, paging };