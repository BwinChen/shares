utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

  var EMAIL = utils.getParam('email');
  var KEYCODE = utils.getParam('keyCode');
  var TIME = utils.getParam('time');

  // 请求
  if (EMAIL && KEYCODE && TIME) {
    $.ajax({
      url: HOST.USER + API.activeEmail,
      data: {
        email: EMAIL,
        keyCode: KEYCODE,
        time: TIME
      },
      type: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.success) {
          $('.msg-p').find('.col-red').html('恭喜您，激活成功！');
        } else {
          $('.msg-p').find('.col-red').html(res.error);
        }
        var time = 10;
        _timeR = setInterval(function(){
          if (time == 1) {
            clearInterval(_timeR);
            window.location.href = './index.html';
          }
          if (time > 1) {
            time--;
            $('.msg-p').find('.time').html(time);
          }
        }, 1000)
      }
    });
  } else {
    window.location.href = './index.html';
  }

});