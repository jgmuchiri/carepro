!function(){"use strict";var e="undefined"!=typeof module&&module.exports,n="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,l=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],l=0,r=n.length,t={};l<r;l++)if((e=n[l])&&e[1]in document){for(l=0;l<e.length;l++)t[n[0][l]]=e[l];return t}return!1}(),r={request:function(e){var r=l.requestFullscreen;e=e||document.documentElement,/5\.1[.\d]* Safari/.test(navigator.userAgent)?e[r]():e[r](n&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[l.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},onchange:function(e){document.addEventListener(l.fullscreenchange,e,!1)},onerror:function(e){document.addEventListener(l.fullscreenerror,e,!1)},raw:l};if(!l)return void(e?module.exports=!1:window.screenfull=!1);Object.defineProperties(r,{isFullscreen:{get:function(){return Boolean(document[l.fullscreenElement])}},element:{enumerable:!0,get:function(){return document[l.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return Boolean(document[l.fullscreenEnabled])}}}),e?module.exports=r:window.screenfull=r}();