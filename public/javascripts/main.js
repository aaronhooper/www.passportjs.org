$.fn.hasScrollBar = function() {
  return this.get(0).scrollHeight > this.get(0).clientHeight;
};

function msieversion() {

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
  $("body").addClass("ie")

 return false;

};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

$(document).ready(function() {

  if (msieversion()) {
    $("body").addClass("ie")
  };

  $.getJSON("https://api.github.com/repos/jaredhanson/passport", function(data){
    $(".social .stat").text(numberWithCommas(data.stargazers_count));
  });

  var data;
  $.getJSON("data.json", function(qdata) {
    data = qdata;
  });
  $(".search-con form input").autocomplete({
    source: function( request, response ) {
      var matches = $.map( data, function(acItem) {
        if ( acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0 ) {
          return acItem;
        }
      });
      response(matches);
    },
    open: function( request, response ) {
      $(".results section").html("")
      $(".ui-autocomplete li").each(function(index) {
        var label = $(this).text();
        if (index == 0) {
          $(".search-con form .autocomplete").text(label);
        };
        var matches = $.map( data, function(acItem) {
          if ( acItem.label.toUpperCase().indexOf(label.toUpperCase()) === 0 ) {

            $(".results section").append('<article><a href="'+ acItem.url +'"><span class="title">'+ acItem.label +'</span><span class="text">'+ acItem.desc +'</span><span class="stat"><span class="download">'+ acItem.forks +'</span><span class="star">'+ acItem.stars +'</span></span></a></article>');
          }
        });
      });
      if ($('.search-con .results').hasScrollBar()) {
        $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
      } else {
        $(".search-con .results section").css({ paddingLeft: 0 })
      };
    },
    search: function() {
      $(".results section").html("")
    }
  });

  $(".search-con form input").on("change keyup paste", function(){
    $(".search-con form .autocomplete").text("");
  });

  $(".search-con form input, .search form input").on("change keyup paste", function(){
    $(".search-con form .input").text($(this).val());
  });

  $(".menu-trigger").click(function() {
    $("body").toggleClass("is-menu");
    $(".content, .top-site").toggleClass('blured');
    $(this).toggleClass("is-active").next().toggleClass("is-active");
    return false;
  });

  $(".select p").click(function() {
    $(this).parent().toggleClass("is-block");
    return false;
  });

  $(".search form input").on("focus", function(){
    var val = $(this).val();
    $(".main-hold").addClass('blured');
    $("body").addClass("is-search");
    $(".search-con form input").val(val).focus();
    $(".search-con form input").val("");
    $(".search-con form input").val(val);
    $(".search-con form input").autocomplete("search");
  });

  $(".search-con .close-ico").click(function() {
    $(".search form input").val("");
    $("body").removeClass("is-search");
    $(".main-hold").removeClass('blured');
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $(".search form input").val("");
      $("body").removeClass("is-search");
      $(".main-hold").removeClass('blured');
    }
  });

  $('[placeholder]').each(function() {
    var input = $(this);
    $(input).focus(function(){
      if (input.val() == input.attr('placeholder')) {
        input.val('').removeClass("placeholder");
      }
    });

    $(input).blur(function(){
      // if (input.val() == '' || input.val() == input.attr('placeholder')) {
      //   input.val(input.attr('placeholder')).addClass("placeholder");
      // }
    });
  }).blur();

  function getScrollbarWidth() {
    var div=$('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>');$('body').append(div);var w1=$('div',div).innerWidth();div.css('overflow-y','auto');var w2=$('div',div).innerWidth();$(div).remove();return(w1-w2);
  }

  if ($('.search-con .results').hasScrollBar()) {
    $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
  };

  $(window).resize(function() {
    if ($('.search-con .results').hasScrollBar()) {
      $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    } else {
      $(".search-con .results section").css({ paddingLeft: 0 })
    };
  });

  $('.accordion').accordion({
    "transitionSpeed": 400
  });

  //Scroll to href ID
  $('a[data="scroll-to"][href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 30
        }, 1000);
        return false;
      }
    }
  });

});