// ==UserScript==
// @name         即时百度翻译
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include *
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    const appid = 'your_appid',
          key = 'your_key'

    const ifr = document.createElement('iframe')//avoid cover already exist modules
    ifr.setAttribute('style', 'display:none')
    document.body.appendChild(ifr)

    function addScript(url) {//add the specified script
        return new Promise((r, j) => {
            var script = document.createElement('script')
            script.setAttribute('src', url)
            ifr.contentDocument.body.appendChild(script)
            script.onload = () => r()
            script.onerror = () => j()
        })
    }

    function forRequest(query) {
        const salt = (new Date).getTime(),
              from = 'auto',
              to = 'zh',
              str1 = appid + query + salt + key,
              sign = ifr.contentWindow.md5(str1)
        return new Promise((r, j) => ifr.contentWindow.$.ajax({
            url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function (data) {
                r(data)
            },
            error: (e) => j(e)
        }))
    }

    let globalEle = null
    function createUI(x, y, content){//create ui
        globalEle = document.createElement('div')
        globalEle.setAttribute('style', `position:fixed;left:${x}px;top:${y}px;background:white;color:black;padding:.5em;border:1px solid black;border-radius:.2em;font-size:16px;`)
        globalEle.innerHTML = content
        document.body.appendChild(globalEle)
    }

    function delUI(){//delete ui
        globalEle && document.body.removeChild(globalEle)
        globalEle = null
    }
    function createPreCheck(){//check if ui exist
        if(globalEle)delUI()
    }

    Promise.all([
        addScript('https://cdn.bootcss.com/blueimp-md5/2.12.0/js/md5.js'),
        addScript('https://cdn.bootcss.com/jquery/3.4.1/jquery.js')
    ])
    .then(() => {
        let last_query = ''
        window.addEventListener('mouseup', (e) => {
            var text = window.getSelection().toString()
            if (text && text !== last_query) {// avoid duplicate event occur
                last_query = text
                forRequest(text)
                    .then(res => {
                    var trans_result = res.trans_result
                    if (trans_result.length) {
                        console.log('原文', trans_result[0].src)
                        console.log('翻译', trans_result[0].dst)
                        console.log('\n')
                        createPreCheck()
                        createUI(e.x, e.y, trans_result[0].dst)
                    }
                })
            }
        })
        window.addEventListener('mousedown', () => delUI())
    })
    // Your code here...
})();