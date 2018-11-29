utils.IE();

// 模版加载
var fontdownTpl = template(globalTpl.fontdown.funToStr());

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());
  $('#content-font').html(fontdownTpl(Render.fontdown));

  // 判断用户是否登录
  var user = APP.getUser();
  // 初始化、加载用户信息
  APP.setInit(user);

  // 登录 按钮
  $(document).on('click', '.loginBtn', function () {
    // 登录弹窗
    layer.open(loginSet());
    return false;
  });

  // 注册 按钮
  $(document).on('click', '.regBtn', function () {
    layer.open(regSet());
    return false;
  });

  APP.request({type:'GET',url:HOST.WEB_SERVER + API.getVersion},function(res){
    if(res.error_code==0){
      Render.fontdown.data = res.data
      $('#content-font').html(fontdownTpl(Render.fontdown));
    }
  });
  $('#app-fontsync').find('.J_down_font').attr('href', Render.fontdown.link.down1);

  $(document.body).on('click', '.J_down_font', function() {
    APP.request({type:'GET',url:HOST.WEB_SERVER + API.getFontCount})
  });

});