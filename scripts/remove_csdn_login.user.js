// ==UserScript==
// @name         csdn去除登录看评论
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var ele = document.getElementsByClassName('opt-box')[1]
    ele.style.display='none'
    var scrollEle = document.getElementsByClassName('comment-list-box')[0]
    scrollEle.style.overflow = 'auto'
    // Your code here...
})();