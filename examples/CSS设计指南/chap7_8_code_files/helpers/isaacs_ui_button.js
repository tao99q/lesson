// JavaScript Document
ri.ui.button = function(obj) {
  var $body;
  $body = $body || $('body');
  $body.on('mouseup touchend', function() {
    $('.mousedown').removeClass('mousedown');
    if (device.is) {
      return $('.hover').removeClass('hover');
    }
  });
  $body.on('mousedown touchstart', obj, function() {
    var that;
    that = $(this);
    if (!that.hasClass('disabled')) {
      return that.addClass('mousedown');
    }
  });
  $body.on('mouseover mouseout', obj, function(e) {
    var that;
    that = $(this);
    if (e.type === 'mouseover') {
      that.addClass('hover');
    }
    if (e.type === 'mouseout') {
      return that.removeClass('hover');
    }
  });
  return $body.on('click', obj, function(e) {
    var that;
    that = $(this);
    if (!that.hasClass('disabled')) {
      return that.trigger('ri-press');
    }
  });
};