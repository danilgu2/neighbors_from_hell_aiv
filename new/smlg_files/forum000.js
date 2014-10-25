
$.noConflict();
jQuery.fn.customSelect = function() {
  return this.each(function() {
    var $this = jQuery(this);
    var $active = $this.find('.js-active');
    var $options = $this.find('.js-options');
    var openOptions = function() {
      globalOverlay.height(jQuery.getDocHeight()).show();
      $options.fadeIn('fast');
      $this.addClass('active');
    };
    var closeOptions = function() {
      globalOverlay.hide();
      $options.fadeOut('fast');
      $this.removeClass('active');
    };
    var init = function() {
      jQuery(document).keyup(function(e) {
        if (e.keyCode == 27) {
          closeOptions();
        }
      });
      $active.bind('click', function() {
        if ($this.hasClass('active')) {
          closeOptions();
        } else {
          openOptions();
        }
      });
      $options.on('click', '.js-option', function() {
        var $option = jQuery(this);
        if ($active.data('url') !== $option.data('url')) {
          document.location = $option.data('url');
        }
        $active.html($option.html());
        closeOptions();
      });
    };
    init();
  });
};
globalOverlay = false;
jQuery.getDocHeight = function() {
  return Math.max(
          jQuery(document).height(),
          jQuery(window).height(),
          document.documentElement.clientHeight
          );
};
jQuery(document).ready(function($) {


  jQuery('.ipsUserPhoto').each(function(c, e) {
      var e = jQuery(e);
          if (e.attr('src') == 'http://' + document.location.host + '/public/style_images/master/profile/default_large.png') {
                e.hide();
                    }
                      });
                      
                        jQuery('.ipsBadge_green').each(function(c, e) {
                            var e = jQuery(e);
                                if (e.html() == 'Опрос' || e.html() == 'Poll') {
                                      e.removeClass('ipsBadge_green');
                                          }
                                            });


  $('body').append('<div id="globalOverlay" style="display:none;"></div>');
  globalOverlay = $('#globalOverlay');
  globalOverlay.bind('click', function() {
    var $langs = $('#langs');
    var $opts = $langs.find('.js-options');
    if ($opts.is(':visible')) {
      globalOverlay.hide();
      $opts.fadeOut('fast');
      $langs.removeClass('active');
    }
    globalOverlay.hide();
  });
  $('#langs').customSelect();
  var allow = ['vk.com/tanki_online','vk.com/tankionlineapp','tankionline.com', 'tankiforum.com', 'youtube.com', 'youtu.be', 'savepic.org', 'savepic.ru', 'imageset.ru', 'imgsrc.ru', 'rutube.ru', 'dailymotion.com', 'ibox.com.ua', 'perashki.ru', 'tankiwiki.com', 'vk.com/tankionline', 'twitter.com/tankionline', 'mailto:help@tankionline.com', 'narod.premiaruneta.ru', 'alternativaplatform.com'];
  switch (document.location.host) {
    case 'ru.tankiforum.com':
      var warn = '<div id="wHead"><span class="ipsType_subtitle">Внимание!</span></div>\
<p class="warnpost">Вы переходите по внешней ссылке. Мы не несём ответственности за содержание сторонних сайтов и безопасность вашего компьютера.</p>\
<div id="warnCloseC"><span id="warnClose" class="ipsButton_secondary">Отмена</span></div> <div class="away"><a id="warnAway" target="_blank">Я понимаю риск</a></div>';
      break;
    case 'en.tankiforum.com':
      var warn = '<div id="wHead"><span class="ipsType_subtitle">Attention!</span></div>\
<p class="warnpost">You are about to follow an external link. We are not responsible for the content of external websites and therefore cannot ensure your PC safety.</p>\
<div id="warnCloseC"><span id="warnClose" class="ipsButton_secondary">Cancel</span></div> <div class="away"><a id="warnAway" target="_blank">I understand the risk</a></div>';
      break;
    case 'de.tankiforum.com':
      var warn = '<div id="wHead"><span class="ipsType_subtitle">Achtung!</span></div>\
<p class="warnpost">Sie folgen den externen Link. Somit übernehmen wir keine Verantwortung für den Inhalt der verlinkte Seite sowie für die Sicherheit Ihres Rechners.</p>\
<div id="warnCloseC"><span id="warnClose" class="ipsButton_secondary">Abbrechen</span></div> <div class="away"><a id="warnAway" target="_blank">Ich verstehe das Risiko</a></div>';
      break;
    case 'br.tankiforum.com':
      var warn = '<div id="wHead"><span class="ipsType_subtitle">Attention!</span></div>\
<p class="warnpost">You are about to follow an external link. We are not responsible for the content of external websites and therefore cannot ensure your PC safety.</p>\
<div id="warnCloseC"><span id="warnClose" class="ipsButton_secondary">Cancel</span></div> <div class="away"><a id="warnAway" target="_blank">I understand the risk</a></div>';
      break;
  }
  $('body').append('<div id="warnMask"></div><div id="warnWindow">' + warn + '</div>');
  var mask = $('#warnMask');
  var warn = $('#warnWindow');
  var maskHeight = $(document).height();
  var maskWidth = $(window).width();
  var winH = $(window).height();
  var winW = $(window).width();
  var warnShown = false;
  var warnURL = $('#warnURL');
  var warnHost = $('#warnHost');
  var warnAway = $('#warnAway');
  var wind = $(window);
  wind.resize(function() {
    placeWarn();
  });
  wind.scroll(function() {
    placeWarn();
  });
  function placeWarn() {
    if (warnShown) {
      maskHeight = $(document).height();
      maskWidth = wind.width();
      winH = wind.height();
      winW = wind.width();
      mask.css({'width': maskWidth, 'height': maskHeight});
      warn.css({'top': winH / 2 - warn.height() / 2 + wind.scrollTop(), 'left': winW / 2 - warn.width() / 2 + wind.scrollLeft()});
    }
  }
  var links = jQuery('a[rel="nofollow external"]');
  jQuery.each(links, function(i, v) {
    var link = $(v);
    var host = v.host;
    var href = link.attr('href');
    var hostArr = host.split('.');
    var last = hostArr.pop();
    var pre = hostArr.pop();
    var hrefClean = href.replace('http://', '').replace('https://', '').replace('www.', '');
    if (jQuery.inArray(pre + '.' + last, allow) == -1 && jQuery.inArray(host, allow) == -1 && jQuery.inArray(hrefClean, allow) == -1) {
      link.click(function(e) {
        e.preventDefault();
        mask.css({'width': maskWidth, 'height': maskHeight, 'opacity': 0.5}).show();
        warnURL.html(href);
        warnHost.html(host);
        warnAway.attr('href', href);
        warn.css({'top': winH / 2 - warn.height() / 2 + wind.scrollTop(), 'left': winW / 2 - warn.width() / 2 + wind.scrollLeft()}).show();
        warnShown = true;
        return false;
      });
    }
  });
  function warnHide() {
    warn.hide();
    mask.hide();
    warnShown = false;
  }
  $('#warnClose').click(function() {
    warnHide();
  });
  mask.click(function() {
    warnHide();
  });
  warnAway.click(function() {
    warnHide();
  });

});
