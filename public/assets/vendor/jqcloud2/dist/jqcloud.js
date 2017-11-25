!function(t,i){"function"==typeof define&&define.amd?define(["jquery"],i):"object"==typeof module&&module.exports?module.exports=i(require("jquery")):i(t.jQuery)}(this,function(t){"use strict";function i(t,i,e){var s={pid:null,last:0};return function(){function o(){return s.last=(new Date).getTime(),t.apply(e||a,Array.prototype.slice.call(n))}var h=(new Date).getTime()-s.last,n=arguments,a=this;if(h>i)return o();clearTimeout(s.pid),s.pid=setTimeout(o,i-h)}}var e=function(i,e,s){this.$element=t(i),this.word_array=e||[],this.options=s,this.sizeGenerator=null,this.colorGenerator=null,this.data={placed_words:[],timeouts:{},namespace:null,step:null,angle:null,aspect_ratio:null,max_weight:null,min_weight:null,sizes:[],colors:[]},this.initialize()};e.DEFAULTS={width:100,height:100,center:{x:.5,y:.5},steps:10,delay:null,shape:"elliptic",classPattern:"w{n}",encodeURI:!0,removeOverflowing:!0,afterCloudRender:null,autoResize:!1,colors:null,fontSize:null,template:null},e.prototype={initialize:function(){if(this.options.width?this.$element.width(this.options.width):this.options.width=this.$element.width(),this.options.height?this.$element.height(this.options.height):this.options.height=this.$element.height(),this.options=t.extend(!0,{},e.DEFAULTS,this.options),null===this.options.delay&&(this.options.delay=this.word_array.length>50?10:0),this.options.center.x>1&&(this.options.center.x=this.options.center.x/this.options.width,this.options.center.y=this.options.center.y/this.options.height),"function"==typeof this.options.colors)this.colorGenerator=this.options.colors;else if(t.isArray(this.options.colors)){var s=this.options.colors.length;if(s>0){if(s<this.options.steps)for(var o=s;o<this.options.steps;o++)this.options.colors[o]=this.options.colors[s-1];this.colorGenerator=function(t){return this.options.colors[this.options.steps-t]}}}if("function"==typeof this.options.fontSize)this.sizeGenerator=this.options.fontSize;else if(t.isPlainObject(this.options.fontSize))this.sizeGenerator=function(t,i,e){var s=t*this.options.fontSize.from,o=t*this.options.fontSize.to;return Math.round(o+1*(s-o)/(this.options.steps-1)*(e-1))+"px"};else if(t.isArray(this.options.fontSize)){var h=this.options.fontSize.length;if(h>0){if(h<this.options.steps)for(var n=h;n<this.options.steps;n++)this.options.fontSize[n]=this.options.fontSize[h-1];this.sizeGenerator=function(t,i,e){return this.options.fontSize[this.options.steps-e]}}}this.data.angle=6.28*Math.random(),this.data.step="rectangular"===this.options.shape?18:2,this.data.aspect_ratio=this.options.width/this.options.height,this.clearTimeouts(),this.data.namespace=(this.$element.attr("id")||Math.floor(1e6*Math.random()).toString(36))+"_word_",this.$element.addClass("jqcloud"),"static"===this.$element.css("position")&&this.$element.css("position","relative"),this.createTimeout(t.proxy(this.drawWordCloud,this),10),this.options.autoResize&&t(window).on("resize",i(this.resize,50,this))},createTimeout:function(i,e){var s=setTimeout(t.proxy(function(){delete this.data.timeouts[s],i()},this),e);this.data.timeouts[s]=!0},clearTimeouts:function(){t.each(this.data.timeouts,function(t){clearTimeout(t)}),this.data.timeouts={}},overlapping:function(t,i){return Math.abs(2*t.left+t.width-2*i.left-i.width)<t.width+i.width&&Math.abs(2*t.top+t.height-2*i.top-i.height)<t.height+i.height},hitTest:function(t){for(var i=0,e=this.data.placed_words.length;i<e;i++)if(this.overlapping(t,this.data.placed_words[i]))return!0;return!1},drawWordCloud:function(){var t,i;if(this.$element.children('[id^="'+this.data.namespace+'"]').remove(),0!==this.word_array.length){for(t=0,i=this.word_array.length;t<i;t++)this.word_array[t].weight=parseFloat(this.word_array[t].weight,10);if(this.word_array.sort(function(t,i){return i.weight-t.weight}),this.data.max_weight=this.word_array[0].weight,this.data.min_weight=this.word_array[this.word_array.length-1].weight,this.data.colors=[],this.colorGenerator)for(t=0;t<this.options.steps;t++)this.data.colors.push(this.colorGenerator(t+1));if(this.data.sizes=[],this.sizeGenerator)for(t=0;t<this.options.steps;t++)this.data.sizes.push(this.sizeGenerator(this.options.width,this.options.height,t+1));if(this.options.delay>0)this.drawOneWordDelayed();else{for(t=0,i=this.word_array.length;t<i;t++)this.drawOneWord(t,this.word_array[t]);"function"==typeof this.options.afterCloudRender&&this.options.afterCloudRender.call(this.$element)}}},drawOneWord:function(i,e){var s,o,h,n=this.data.namespace+i,a=this.data.angle,r=0,d=0,l=0,p=Math.floor(this.options.steps/2);for(e.attr=t.extend({},e.html,{id:n}),this.data.max_weight!=this.data.min_weight&&(p=Math.round(1*(e.weight-this.data.min_weight)*(this.options.steps-1)/(this.data.max_weight-this.data.min_weight))+1),s=t("<span>").attr(e.attr),this.options.classPattern&&s.addClass(this.options.classPattern.replace("{n}",p)),this.data.colors.length&&s.css("color",this.data.colors[p-1]),this.data.sizes.length&&s.css("font-size",this.data.sizes[p-1]),this.options.template?s.html(this.options.template(e)):e.link?("string"==typeof e.link&&(e.link={href:e.link}),this.options.encodeURI&&(e.link.href=encodeURI(e.link.href).replace(/'/g,"%27")),s.append(t("<a>").attr(e.link).text(e.text))):s.text(e.text),e.handlers&&s.on(e.handlers),this.$element.append(s),o={width:s.outerWidth(),height:s.outerHeight()},o.left=this.options.center.x*this.options.width-o.width/2,o.top=this.options.center.y*this.options.height-o.height/2,h=s[0].style,h.position="absolute",h.left=o.left+"px",h.top=o.top+"px";this.hitTest(o);){if("rectangular"===this.options.shape)switch(d++,d*this.data.step>(1+Math.floor(l/2))*this.data.step*(l%4%2==0?1:this.data.aspect_ratio)&&(d=0,l++),l%4){case 1:o.left+=this.data.step*this.data.aspect_ratio+2*Math.random();break;case 2:o.top-=this.data.step+2*Math.random();break;case 3:o.left-=this.data.step*this.data.aspect_ratio+2*Math.random();break;case 0:o.top+=this.data.step+2*Math.random()}else r+=this.data.step,a+=(i%2==0?1:-1)*this.data.step,o.left=this.options.center.x*this.options.width-o.width/2+r*Math.cos(a)*this.data.aspect_ratio,o.top=this.options.center.y*this.options.height+r*Math.sin(a)-o.height/2;h.left=o.left+"px",h.top=o.top+"px"}if(this.options.removeOverflowing&&(o.left<0||o.top<0||o.left+o.width>this.options.width||o.top+o.height>this.options.height))return void s.remove();this.data.placed_words.push(o),"function"==typeof e.afterWordRender&&e.afterWordRender.call(s)},drawOneWordDelayed:function(i){if(i=i||0,!this.$element.is(":visible"))return void this.createTimeout(t.proxy(function(){this.drawOneWordDelayed(i)},this),10);i<this.word_array.length?(this.drawOneWord(i,this.word_array[i]),this.createTimeout(t.proxy(function(){this.drawOneWordDelayed(i+1)},this),this.options.delay)):"function"==typeof this.options.afterCloudRender&&this.options.afterCloudRender.call(this.$element)},destroy:function(){this.clearTimeouts(),this.$element.removeClass("jqcloud"),this.$element.removeData("jqcloud"),this.$element.children('[id^="'+this.data.namespace+'"]').remove()},update:function(t){this.word_array=t,this.data.placed_words=[],this.clearTimeouts(),this.drawWordCloud()},resize:function(){var t={width:this.$element.width(),height:this.$element.height()};t.width==this.options.width&&t.height==this.options.height||(this.options.width=t.width,this.options.height=t.height,this.data.aspect_ratio=this.options.width/this.options.height,this.update(this.word_array))}},t.fn.jQCloud=function(i,s){var o=arguments;return this.each(function(){var h=t(this),n=h.data("jqcloud");if(n||"destroy"!==i)if(n)"string"==typeof i&&n[i].apply(n,Array.prototype.slice.call(o,1));else{var a="object"==typeof s?s:{};h.data("jqcloud",n=new e(this,i,a))}})},t.fn.jQCloud.defaults={set:function(i){t.extend(!0,e.DEFAULTS,i)},get:function(i){var s=e.DEFAULTS;return i&&(s=s[i]),t.extend(!0,{},s)}}});