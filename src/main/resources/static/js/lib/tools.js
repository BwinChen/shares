utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

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

});