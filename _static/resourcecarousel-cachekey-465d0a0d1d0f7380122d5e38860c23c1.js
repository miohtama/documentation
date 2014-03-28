
/* - ++resource++carousel.js - */
// http://plone.org/portal_javascripts/++resource++carousel.js?original=1
(function($){
function PloneCarousel(container,opts){var carousel=this;this.parent_container=$(container);this.container=this.parent_container.find('.carousel-banners');this.banners=this.container.find('.carousel-banner');this.current_index=0;this.max_index=this.banners.length-1;this.animating=false;this.opts=opts;this.container.add(this.banners).height(opts.height).width(opts.width).css({position:'relative',overflow:'hidden'});this.banners.css({position:'absolute'});this.triggerEvent=function(name,extra_args){var args=[this];if(extra_args!==undefined){args=args.concat(extra_args)}
this.parent_container.triggerHandler(name,args)};this.shiftIndex=function(offset,old_index){old_index=(old_index===undefined)?this.current_index:old_index;var new_index=old_index+offset;if(new_index>this.max_index){new_index-=this.banners.length} else if(new_index<0){new_index+=this.banners.length}
return new_index};this.nextBanner=function(){this.prepareAnimateTo(this.shiftIndex(1))};this.prevBanner=function(){this.prepareAnimateTo(this.shiftIndex(-1))};this.loadLazyImages=function(index,callback){var target=this.banners.eq(index);var img=target.find("img");var self=this;var carousel=target.parents(".carousel");
function retry(){self.loadLazyImages(index,callback)}
if(!carousel.is(":visible")){setTimeout(retry,500);return}
if(img.attr("data-lazy-load-src")){img.bind("load", function(){if(callback){callback()}});img.attr("src",img.attr("data-lazy-load-src"));img.removeAttr("data-lazy-load-src")} else{if(callback){callback()}}},this.prepareAnimateTo=function(index,direction){var self=this;
function cb(){self.animateTo(index,direction)}
this.loadLazyImages(index,cb)};this.animateTo=function(index){};this.play=function(){if(carousel.timer){clearInterval(carousel.timer)}
carousel.timer=setInterval(function(){carousel.nextBanner()},carousel.opts.delay);carousel.triggerEvent('play');carousel.loadLazyImages(0)};this.pause=function(){if(carousel.timer){clearInterval(carousel.timer)}
carousel.triggerEvent('pause')}}
function FadingPloneCarousel(container,opts){PloneCarousel.apply(this,[container,opts]);var carousel=this;this.animateTo=function(index){if(index==this.current_index||this.animating) return;this.triggerEvent('beforeAnimate',[this.current_index,index]);this.animating=true;this.banners.not(':eq('+index.toString()+')').fadeOut(this.opts.speed, function(){carousel.current_index=index});this.banners.eq(index).fadeIn(this.opts.speed, function(){var old_index=carousel.current_index=index;carousel.animating=false;carousel.triggerEvent('afterAnimate',[old_index,index])})}}
function SlidingPloneCarousel(container,opts){PloneCarousel.apply(this,[container,opts]);var carousel=this;this.banners.wrapAll('<div class="carousel-slider" />');this.slider=this.container.find('.carousel-slider').height(this.opts.height).width(this.opts.width * this.banners.length).css({position:'absolute',left:0,top:0});this.nextBanner=function(){this.prepareAnimateTo(this.shiftIndex(1),'left')};this.prevBanner=function(){this.prepareAnimateTo(this.shiftIndex(-1),'right')};this.animateTo=function(index,direction){if(index==this.current_index||this.animating) return;this.animating=true;this.triggerEvent('beforeAnimate',[this.current_index,index]);direction=(direction===undefined)?'left':direction;var shift=(direction=='left')?-carousel.current_index:carousel.max_index-carousel.current_index;this.banners.each(function(banner_index,banner){var new_index=carousel.shiftIndex(shift,banner_index);$(banner).css('left',(new_index * carousel.opts.width)).show()});var start_left=(direction=='left')?0:-this.opts.width * this.max_index;this.slider.css('left',start_left);var index_offset=this.shiftIndex(shift,index);this.slider.animate({left:-this.opts.width * index_offset},this.opts.speed,'swing', function(){var old_index=carousel.current_index=index;carousel.animating=false;carousel.triggerEvent('afterAnimate',[old_index,index])})}}
$.fn.ploneCarousel=function(options){var opts=$.extend({},$.fn.ploneCarousel.defaults,options);return this.each(function(){var container=$(this);var carousel=$.fn.ploneCarousel.selectCarousel(container,opts);$.fn.ploneCarousel.initCarousel(carousel);$.fn.ploneCarousel.initPager(carousel);$.fn.ploneCarousel.initEvents(carousel)})};$.fn.ploneCarousel.defaults={speed:500,delay:8000,height:0,width:0,transition:'fade'};$.fn.ploneCarousel.selectCarousel=function(container,opts){if(opts.transition=='fade'){return new FadingPloneCarousel(container,opts)} else{return new SlidingPloneCarousel(container,opts)}};$.fn.ploneCarousel.initCarousel=function(carousel){carousel.play();carousel.parent_container.hover(carousel.pause,carousel.play);carousel.banners.eq(0).addClass('carousel-banner-active')};$.fn.ploneCarousel.initPager=function(carousel){var pager_items=carousel.parent_container.find('.carousel-pager-item');pager_items.filter(':first').addClass('carousel-pager-item-first carousel-pager-item-active');pager_items.filter(':last').addClass('carousel-pager-item-last');pager_items.click(function(){carousel.prepareAnimateTo(pager_items.index($(this)));return false});carousel.parent_container.find('.carousel-pager-button-prev').click(function(){carousel.prevBanner();return false});carousel.parent_container.find('.carousel-pager-button-next').click(function(){carousel.nextBanner();return false})};$.fn.ploneCarousel.initEvents=function(carousel){var pager_items=carousel.parent_container.find('.carousel-pager-item');carousel.parent_container.bind('beforeAnimate', function(e,carousel,old_index,new_index){carousel.banners.removeClass('carousel-banner-active').eq(new_index).addClass('carousel-banner-active');pager_items.removeClass('carousel-pager-item-active').eq(new_index).addClass('carousel-pager-item-active')})}})(jQuery);
