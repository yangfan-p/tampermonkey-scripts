// ==UserScript==
// @name         去除深航不能去的城市
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://live.16fan.com/live/show/linesearch.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const cannotGo = [ '宜春', '池州', '昭通', '巴中', '遵义(茅台)', '衡州', '满洲里', '呼伦贝尔']
    function filterCity(){
        const linksArray = Array.from(document.getElementsByClassName('js-link'))
        linksArray.forEach(ele => {
            const citys = Array.from(ele.getElementsByClassName('info')[0].getElementsByTagName('strong')).map(strong => strong.textContent)//获取城市信息
            //console.log(citys)
            const index1 = cannotGo.findIndex(v => v === citys[1])
            const index2 = cannotGo.findIndex(v => v === citys[2])
            if(index1 > -1 || index2 > -1){
                ele.style.display='none'
            }
        })
    }

    let preLength = 0
    setInterval(()=>{
        const nowLength = Array.from(document.getElementsByClassName('js-link')).length
        if(preLength !== nowLength){
            preLength = nowLength
            filterCity()
        }
    }, 1000)
    // Your code here...
})();