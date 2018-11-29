utils.IE();

// 模版加载

// 手机/邮箱验证模版
var valiaccountTpl = template(globalTpl.valiaccount.funToStr());
var validationsTpl = template(globalTpl.validations.funToStr());
// 绑定手机模版
// 绑定邮箱模版

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

  // 订单
  var user = APP.getUser();
  if (user) {
    // 初始化用户信息
    APP.setInit(user);

    // 手机/邮箱 获取验证模版
    var valiaccountSet = function (data) {
      return $.extend(true,{},Render.layeropts,{
        type: 1,
        title: data.title,
        offset: 'auto',
        area: '500px',
        zIndex: 9000,
        content: valiaccountTpl(data),
        success: function (layero, index) {
          // 用户ID
          var _userId = Render.header.user.id;
          // 帐号
          var account = $('.forget-account').val();
          // 账号类型
          var userType = account.indexOf('@') > -1 ? 2 : 1;

          var imgLoading = function () {
            $.ajax({
              url: HOST.USER + API.getAuthCodeBase,
              type: 'GET',
              dataType: 'json',
              success: function (res) {
                if (res.success) {
                  $('.login-codes').find('.my-code').html('<img src="data:image/jpeg;base64,'+res.image+'" data-key="'+res.key+'" />');
                }
              }
            });
          }

          if (userType == 1) {
            // 渲染图片验证码
            imgLoading();

            $('#focode').on('click', function () {
              imgLoading();
              return false;
            });
          }

          // 立即验证
          $('.recommend').on('click', function () {
            var obj = $(this);
            if (!obj.hasClass('recommend-dis')) {
              obj.addClass('recommend-dis');
              if (userType == 1) {
                // 手机
                // 获取验证码
                var valiCode = $('.forget-code').val();
                // 图形校验码验证
                if (utils.isEmpty(valiCode)) {
                  $('.forget-code').next().next().show().find('span').html('请输入图形验证码');
                  obj.removeClass('recommend-dis');
                  return false;
                }
                var valiKey = $('#focode').find('img').attr('data-key');
                // 获取手机验证码请求
                $.ajax({
                  url: HOST.USER + API.sendPhoneCode,
                  data: {
                    loginPhone: account,
                    userId: _userId,
                    authCode: valiCode,
                    authKey: valiKey
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      APP.toast({txt:'发送成功',time:'1000'},function(){
                        layer.close(index);
                        layer.open(valiVelSet({key: res.data, user:account, userId: _userId, type: 1, tova: data.tova}));
                      });
                    } else {
                      obj.removeClass('recommend-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                    $('.forget-code').val('');
                    imgLoading();
                  }
                });
              } else {
                // 根据账号信息获取邮箱验证码
                $.ajax({
                  url: HOST.USER + API.sendEmailCode,
                  data: {
                    email: account,
                    userId: _userId
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      APP.toast({txt:'发送成功',time:'1000'},function(){
                        layer.close(index);
                        layer.open(valiVelSet({key: res.data, user:account, userId: _userId, type: 2, tova: data.tova}));
                      });
                    } else {
                      obj.removeClass('recommend-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              }
            }
            return false;
          });
        }
      })
    };
    // 手机/邮箱 验证模版
    var valiVelSet =  function (data) {
      return $.extend(true,{},Render.layeropts,{
        type: 1,
        title: '身份验证',
        offset: 'auto',
        area: '500px',
        zIndex: 9000,
        content: validationTpl(data),
        success: function (layero, index) {

          var imgLoading = function () {
            $.ajax({
              url: HOST.USER + API.getAuthCodeBase,
              type: 'GET',
              dataType: 'json',
              success: function (res) {
                if (res.success) {
                  $('.login-codes').find('.my-code').html('<img src="data:image/jpeg;base64,'+res.image+'" data-key="'+res.key+'" />');
                }
              }
            });
          }
          // 倒计时
          APP.countDown($('.valibtn'), 'send-message-dis');
          // 账号信息
          var forgetUser = $('.forget-user').val();
          var forgetUserId = $('.forget-userid').val();
          var forgetToken = Render.header.user.token;
          // 账号类型
          var userType = forgetUser.indexOf('@') > -1 ? 2 : 1;

          if (userType == 1) {
            // 渲染图形验证码
            imgLoading();

            $('.forget .forget-tcode').on('blur', function () {
              var forgetCode = $('.forget-tcode').val();
              if (utils.isEmpty(forgetCode)) {
                $('.forget-tcode').next().next().show().find('span').html('请输入图形验证码');
              } else {
                $('.forget-tcode').next().next().hide().find('span').html('');
              }
            });

            $('#code').on('click', function () {
              imgLoading();
              return false;
            });
          }

          $('.forget .forget-code').on('blur', function () {
            var code_status = APP.checkCode('forget-code');
          });

          // 获取验证码
          $('.valibtn').on('click', function () {
            var obj = $(this);
            if (!obj.hasClass('send-message-dis')) {
              obj.addClass('send-message-dis');
              if (userType == 1) {
                // 手机
                // 获取图形验证码
                var forgetCode = $('.forget-tcode').val();
                if (utils.isEmpty(forgetCode)) {
                  $('.login-codes').removeClass('ihide');
                  $('.forget-tcode').next().next().show().find('span').html('请输入图形验证码');
                  obj.removeClass('send-message-dis');
                  return false;
                }
                var forgetKey = $('#code').find('img').attr('data-key');
                // 获取手机验证码请求
                $.ajax({
                  url: HOST.USER + API.sendPhoneCode,
                  data: {
                    loginPhone: forgetUser,
                    userId: forgetUserId,
                    authCode: forgetCode,
                    authKey: forgetKey
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('send-message-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      $('.forget-key').val(res.data);
                      $('.login-codes').addClass('ihide');
                      // 倒计时
                      APP.countDown(obj, 'send-message-dis');
                    } else {
                      obj.removeClass('send-message-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                    $('.forget-tcode').val('');
                    imgLoading();
                  }
                });
              } else {
                // 邮箱
                // 获取邮箱验证码
                $.ajax({
                  url: HOST.USER + API.sendEmailCode,
                  data: {
                    email: forgetUser,
                    userId: forgetUserId
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('send-message-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      $('.forget-key').val(res.data);
                      // 倒计时
                      APP.countDown(obj, 'send-message-dis');
                    } else {
                      obj.removeClass('send-message-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              }
            }
          });

          // 下一步
          $('.recommend').on('click', function () {
            var obj = $(this);
            // 获取验证码
            var forgetCode = $('.forget-code').val();
            var forgetKey = $('.forget-key').val();
            if (!obj.hasClass('recommend-dis')) {
              obj.addClass('recommend-dis');
              // 验证码
              var code_status = APP.checkCode('forget-code');
              if (!code_status) {
                obj.removeClass('recommend-dis');
                return false;
              }
              if (userType == 1) {
                // 校验短信验证码
                $.ajax({
                  url: HOST.USER + API.valiPhoneCode,
                  data: {
                    key: forgetKey,
                    phoneCode: forgetCode
                  },
                  type: 'GET',
                  dataType: 'json',
                  success: function (res) {
                    if (res.success && res.data) {
                      APP.toast({txt:'校验成功',time:'1000'},function(){
                        layer.close(index);
                        if (data.tova == 'phone') {
                          // 设置标题、操作类型、用户类型、用户ID、用户TOKEN、旧手机码、旧手机验证码
                          layer.open(updateSet({title: '修改手机号-绑定新手机', tip: 'update', type: 1, userId: forgetUserId, token: forgetToken, key: forgetKey, code: forgetCode}));
                        } else {
                          layer.open(finduSet({userCode: forgetUser, key: forgetKey, userId: forgetUserId, code: forgetCode}));
                        }
                      });
                    } else {
                      $('.forget-code').parent().next().show().find('span').html('验证码错误');
                      obj.removeClass('recommend-dis');
                    }
                  }
                });
              } else {
                // 校验邮箱验证码
                $.ajax({
                  url: HOST.USER + API.valiEmailCode,
                  data: {
                    key: forgetKey,
                    emailCode: forgetCode
                  },
                  type: 'GET',
                  dataType: 'json',
                  success: function (res) {
                    if (res.success && res.data) {
                      APP.toast({txt:'校验成功',time:'1000'},function(){
                        layer.close(index);
                        if (data.tova == 'email') {
                          // 设置标题、操作类型、用户类型、用户ID、用户TOKEN、旧邮箱码、旧邮箱验证码
                          layer.open(updateSet({title: '修改邮箱-绑定新邮箱', tip: 'update', type: 2, userId: forgetUserId, token: forgetToken, key: forgetKey, code: forgetCode}));
                        } else {
                          layer.open(finduSet({userCode: forgetUser, key: forgetKey, userId: forgetUserId, code: forgetCode}));
                        }
                      });
                    } else {
                      $('.forget-code').parent().next().show().find('span').html('验证码错误');
                      obj.removeClass('recommend-dis');
                    }
                  }
                });
              }
            }
            return false;
          })
        }
      });
    };
    // 手机/邮箱 修改模版
    var updateSet = function (data) {
      return $.extend(true,{},Render.layeropts,{
        type: 1,
        title: data.title,
        offset: 'auto',
        area: '500px',
        zIndex: 9000,
        content: validationsTpl(data),
        success: function (layero, index) {
          // 帐号类型
          var userType = data.type;
          var foruserid = data.userId;
          var fortoken = data.token;
          var foroldkey = data.key;
          var foroldcode = data.code;

          var imgLoading = function () {
            $.ajax({
              url: HOST.USER + API.getAuthCodeBase,
              type: 'GET',
              dataType: 'json',
              success: function (res) {
                if (res.success) {
                  $('.login-codes').find('.my-code').html('<img src="data:image/jpeg;base64,'+res.image+'" data-key="'+res.key+'" />');
                }
              }
            });
          }

          if (userType == 1) {
            // 渲染图形验证码
            imgLoading();

            $('.forget .forget-tcode').on('blur', function () {
              var forgetCode = $('.forget-tcode').val();
              if (utils.isEmpty(forgetCode)) {
                $('.forget-tcode').next().next().show().find('span').html('请输入图形验证码');
              } else {
                $('.forget-tcode').next().next().hide().find('span').html('');
              }
            });

            $('#code').on('click', function () {
              imgLoading();
              return false;
            });

            // 手机验证
            $('.forget .forget-user').on('blur', function () {
               var phone_status = APP.checkPhone('forget-user');
            });

          } else {

            // 邮箱验证
            $('.forget .forget-user').on('blur', function () {
              var email_status = APP.checkEmail('forget-user');
            });

          }

          $('.forget .forget-code').on('blur', function () {
            var code_status = APP.checkCode('forget-code');
          });

          // 获取新验证码
          $('.valisbtn').on('click', function () {
            var obj = $(this);
            // 帐号信息
            var forgetUser = $('.forget-user').val();

            if (!obj.hasClass('send-message-dis')) {
              obj.addClass('send-message-dis');
              if (userType == 1) {
                // 手机
                // 验证手机号
                var phone_status = APP.checkPhone('forget-user');
                if (!phone_status) {
                  obj.removeClass('send-message-dis');
                  return false;
                }
                // 获取图形验证码
                var forgetCode = $('.forget-tcode').val();
                if (utils.isEmpty(forgetCode)) {
                  $('.login-codes').removeClass('ihide');
                  $('.forget-tcode').next().next().show().find('span').html('请输入图形验证码');
                  obj.removeClass('send-message-dis');
                  return false;
                }
                var forgetKey = $('#code').find('img').attr('data-key');
                // 获取手机验证码请求
                $.ajax({
                  url: HOST.USER + API.sendNewPhoneCode,
                  data: {
                    userId: foruserid,
                    token: fortoken,
                    loginPhone: forgetUser,
                    key: foroldkey,
                    phoneCode: foroldcode,
                    authCode: forgetCode,
                    authKey: forgetKey
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('send-message-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      $('.forget-key').val(res.data);
                      $('.login-codes').addClass('ihide');
                      // 倒计时
                      APP.countDown(obj, 'send-message-dis');
                    } else {
                      obj.removeClass('send-message-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                    $('.forget-tcode').val('');
                    imgLoading();
                  }
                });
              } else {
                // 邮箱
                var email_status = APP.checkEmail('forget-user');
                if (!email_status) {
                  obj.removeClass('send-message-dis');
                  return false;
                }
                // 获取邮箱验证码
                $.ajax({
                  url: HOST.USER + API.sendNewEmailCode,
                  data: {
                    userId: foruserid,
                    token: fortoken,
                    email: forgetUser,
                    key: foroldkey,
                    emailCode: foroldcode
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('send-message-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      $('.forget-key').val(res.data);
                      // 倒计时
                      APP.countDown(obj, 'send-message-dis');
                    } else {
                      obj.removeClass('send-message-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              }
            }
          });

          // 立即绑定
          $('.recommend').on('click', function () {
            var obj = $(this);
            var forgetUser = $('.forget-user').val();
            // 获取验证码
            var forgetCode = $('.forget-code').val();
            var forgetKeys = $('.forget-key').val();
            if (!obj.hasClass('recommend-dis')) {
              obj.addClass('recommend-dis');
              if (userType == 1) {
                // 手机号验证
                var phone_status = APP.checkPhone('forget-user');
                if (!phone_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 验证码
                var code_status = APP.checkCode('forget-code');
                if (!code_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 更新手机号
                $.ajax({
                  url: HOST.USER + API.updatePhone,
                  data: {
                    userId: foruserid,
                    token: fortoken,
                    loginPhone: forgetUser,
                    key: forgetKeys,
                    phoneCode: forgetCode
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      // 更新cookie
                      Render.header.user.loginPhone = forgetUser;
                      APP.setUser(Render.header.user);
                      APP.toast({txt:'修改手机成功',time:'1000'},function(){
                        APP.setInit(Render.header.user);
                        layer.close(index);
                      });
                    } else {
                      $('.forget-code').parent().next().show().find('span').html(res.error);
                      obj.removeClass('recommend-dis');
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              } else {
                // 邮箱验证
                var email_status = APP.checkEmail('forget-user');
                if (!email_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 验证码
                var code_status = APP.checkCode('forget-code');
                if (!code_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 更新邮箱地址
                $.ajax({
                  url: HOST.USER + API.updateEmail,
                  data: {
                    userId: foruserid,
                    token: fortoken,
                    email: forgetUser,
                    key: forgetKeys,
                    emailCode: forgetCode
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      // 更新cookie
                      Render.header.user.email = forgetUser;
                      APP.setUser(Render.header.user);
                      APP.toast({txt:'修改邮箱成功',time:'1000'},function(){
                        APP.setInit(Render.header.user);
                        layer.close(index);
                      });
                    } else {
                      $('.forget-code').parent().next().show().find('span').html(res.error);
                      obj.removeClass('recommend-dis');
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              }
            }
            return false;
          });
        }
      });
    };
    // 手机/邮箱 新增模版
    var addSet = function (data) {
      return $.extend(true,{},Render.layeropts,{
        type: 1,
        title: data.title,
        offset: 'auto',
        area: '500px',
        zIndex: 9000,
        content: validationsTpl(data),
        success: function (layero, index) {
          // 帐号类型
          var userType = data.type;
          var foruserid = data.userId;
          var fortoken = data.token;

          var imgLoading = function () {
            $.ajax({
              url: HOST.USER + API.getAuthCodeBase,
              type: 'GET',
              dataType: 'json',
              success: function (res) {
                if (res.success) {
                  $('.login-codes').find('.my-code').html('<img src="data:image/jpeg;base64,'+res.image+'" data-key="'+res.key+'" />');
                }
              }
            });
          }

          if (userType == 1) {
            // 渲染图形验证码
            imgLoading();

            $('.forget .forget-tcode').on('blur', function () {
              var forgetCode = $('.forget-tcode').val();
              if (utils.isEmpty(forgetCode)) {
                $('.forget-tcode').next().next().show().find('span').html('请输入图形验证码');
              } else {
                $('.forget-tcode').next().next().hide().find('span').html('');
              }
            });

            $('#code').on('click', function () {
              imgLoading();
              return false;
            });

            // 手机验证
            $('.forget .forget-user').on('blur', function () {
               var phone_status = APP.checkPhone('forget-user');
            });
          } else {
            // 邮箱验证
            $('.forget .forget-user').on('blur', function () {
              var email_status = APP.checkEmail('forget-user');
            });
          }

          $('.forget .forget-code').on('blur', function () {
            var code_status = APP.checkCode('forget-code');
          });

          // 获取验证码
          $('.valisbtn').on('click', function () {
            var obj = $(this);
            // 帐号信息
            var forgetUser = $('.forget-user').val();

            if (!obj.hasClass('send-message-dis')) {
              obj.addClass('send-message-dis');
              if (userType == 1) {
                // 手机
                // 验证手机号
                var phone_status = APP.checkPhone('forget-user');
                if (!phone_status) {
                  obj.removeClass('send-message-dis');
                  return false;
                }
                // 获取图形验证码
                var forgetCode = $('.forget-tcode').val();
                if (utils.isEmpty(forgetCode)) {
                  $('.login-codes').removeClass('ihide');
                  $('.forget-tcode').next().next().show().find('span').html('请输入图形验证码');
                  obj.removeClass('send-message-dis');
                  return false;
                }
                var forgetKey = $('#code').find('img').attr('data-key');
                // 获取手机验证码请求
                $.ajax({
                  url: HOST.USER + API.sendPhoneCode,
                  data: {
                    userId: foruserid,
                    loginPhone: forgetUser,
                    authCode: forgetCode,
                    authKey: forgetKey
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('send-message-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      $('.forget-key').val(res.data);
                      $('.login-codes').addClass('ihide');
                      // 倒计时
                      APP.countDown(obj, 'send-message-dis');
                    } else {
                      obj.removeClass('send-message-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                    $('.forget-tcode').val('');
                    imgLoading();
                  }
                });
              } else {
                // 邮箱
                var email_status = APP.checkEmail('forget-user');
                if (!email_status) {
                  obj.removeClass('send-message-dis');
                  return false;
                }
                // 获取邮箱验证码
                $.ajax({
                  url: HOST.USER + API.sendEmailCode,
                  data: {
                    userId: foruserid,
                    email: forgetUser
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('send-message-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      $('.forget-key').val(res.data);
                      // 倒计时
                      APP.countDown(obj, 'send-message-dis');
                    } else {
                      obj.removeClass('send-message-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              }
            }
          });

          // 立即绑定
          $('.recommend').on('click', function () {
            var obj = $(this);
            var forgetUser = $('.forget-user').val();
            // 获取验证码
            var forgetCode = $('.forget-code').val();
            var forgetKeys = $('.forget-key').val();
            if (!obj.hasClass('recommend-dis')) {
              obj.addClass('recommend-dis');
              if (userType == 1) {
                // 手机号验证
                var phone_status = APP.checkPhone('forget-user');
                if (!phone_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 验证码
                var code_status = APP.checkCode('forget-code');
                if (!code_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 更新手机号
                $.ajax({
                  url: HOST.USER + API.bindPhone,
                  data: {
                    userId: foruserid,
                    token: fortoken,
                    loginPhone: forgetUser,
                    key: forgetKeys,
                    phoneCode: forgetCode
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      // 更新cookie
                      Render.header.user.loginPhone = forgetUser;
                      APP.setUser(Render.header.user);
                      APP.toast({txt:'绑定手机成功',time:'1000'},function(){
                        APP.setInit(Render.header.user);
                        layer.close(index);
                      });
                    } else {
                      $('.forget-code').parent().next().show().find('span').html(res.error);
                      obj.removeClass('recommend-dis');
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              } else {
                // 邮箱验证
                var email_status = APP.checkEmail('forget-user');
                if (!email_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 验证码
                var code_status = APP.checkCode('forget-code');
                if (!code_status) {
                  obj.removeClass('recommend-dis');
                  return false;
                }
                // 绑定邮箱地址
                $.ajax({
                  url: HOST.USER + API.bindEmail,
                  data: {
                    userId: foruserid,
                    token: fortoken,
                    email: forgetUser,
                    key: forgetKeys,
                    emailCode: forgetCode
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      // 更新cookie
                      Render.header.user.email = forgetUser;
                      APP.setUser(Render.header.user);
                      APP.toast({txt:'绑定邮箱成功',time:'1000'},function(){
                        APP.setInit(Render.header.user);
                        layer.close(index);
                      });
                    } else {
                      $('.forget-code').parent().next().show().find('span').html(res.error);
                      obj.removeClass('recommend-dis');
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              }
            }
            return false;
          });
        }
      });
    };
    // 用户找回密码模块
    var finduSet = function (data) {
      return $.extend(true,{},Render.layeropts,{
        type: 1,
        title: '重置登录密码',
        offset: 'auto',
        area: '500px',
        zIndex: 9000,
        content: findTpl(data),
        success: function (layero, index) {

          // 账号信息
          var forgetUser = $('.forget-user').val();
          var forgetUserId = $('.forget-userid').val();
          var forgetKey = $('.forget-key').val();
          var forgetCode = $('.forget-code').val();
          // 账号类别
          var userType = forgetUser.indexOf('@') > -1 ? 2 : 1;

          // 密码验证
          $('.forget .forget-password').on('blur', function () {
            var pwd_status = APP.checkPwd('forget-password');
          });

          // 重复验证
          $('.forget .forget-repassword').on('blur', function () {
            var repwd_status = APP.checkConPwd('forget-password', 'forget-repassword');
          });

          // 下一步
          $('.recommend').on('click', function () {
            var obj = $(this);
            var forgetPwd = $('.forget-password').val();
            var forgetRPwd = $('.forget-repassword').val();
            if (!obj.hasClass('recommend-dis')) {
              obj.addClass('recommend-dis');
              // 密码验证
              var pwd_status = APP.checkPwd('forget-password');
              if (!pwd_status) {
                obj.removeClass('recommend-dis');
                return false;
              }
              // 重复验证
              var repwd_status = APP.checkConPwd('forget-password', 'forget-repassword');
              if (!repwd_status) {
                obj.removeClass('recommend-dis');
                return false;
              }
              if (userType == 1) {
                // 手机
                // 请求重置密码接口
                $.ajax({
                  url: HOST.USER + API.setPassword,
                  data: {
                    phoneCode: forgetCode,
                    userId: forgetUserId,
                    key: forgetKey,
                    newPassword: utils.encrypt(forgetPwd),
                    isEncrypt: 0
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      Tool.delCookie(_COOKIE_KEY);
                      APP.user = '';
                      APP.toast({txt:'重置成功',time:'1000'},function(){
                        layer.close(index);
                        window.location.href = './index.html';
                      });
                    } else {
                      obj.removeClass('recommend-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              } else {
                // 邮箱
                // 请求重置密码接口
                $.ajax({
                  url: HOST.USER + API.setPassword,
                  data: {
                    emailCode: forgetCode,
                    userId: forgetUserId,
                    key: forgetKey,
                    newPassword: utils.encrypt(forgetPwd),
                    isEncrypt: 0
                  },
                  type: 'POST',
                  dataType: 'json',
                  beforeSend: function () {
                    $.showLoading();
                  },
                  error: function (e) {
                    obj.removeClass('recommend-dis');
                    $.toast('请求失败，请稍后重试！');
                  },
                  success: function (res) {
                    if (res.success) {
                      Tool.delCookie(_COOKIE_KEY);
                      APP.user = '';
                      APP.toast({txt:'重置成功',time:'1000'},function(){
                        layer.close(index);
                        window.location.href = './index.html';
                      });
                    } else {
                      obj.removeClass('recommend-dis');
                      $.toast(res.error);
                    }
                  },
                  complete: function () {
                    $.hideLoading();
                  }
                });
              }
            }
            return false;
          })
        }
      });
    };

    //切换
    $('.user-nav-list li').on('click', function(){
      var obj = $(this);
      var index = obj.index();
      if (index < 2 && !obj.hasClass('cur')) {
        $('.user-name-cont').show();
        $('.user-name-edit').hide();
        $('.city-panel-layer').hide();
        obj.addClass('cur').siblings().removeClass('cur');
        $('.user-cont').eq(index).addClass('cur').siblings().removeClass('cur');
      } else {
        var _url = obj.find('a').attr('href');
        window.location.href = _url;
      }
      return false;
    });

    // 个人资料
    // 修改头像
    $('#user-avatar-uploader').on('click', function(){
      $(this).val('');
    }).on('change', function(event){
      var pic = $(this).val();
      var _file = event.target.files[0];
      // 检测图片格式和大小
      if (_file.size > 1024*1024) {
        $.toast('文件大小不超过1M');
        return;
      }
      if (!/(jpg|jpeg|png)$/.test(_file.type)) {
        $.toast('只允许上传jpg、png格式图片');
        return;
      }
      // 上传图片更新用户头像
      var formDatap = new FormData();
      formDatap.append('file', _file);
      formDatap.append('userId', Render.header.user.id);
      formDatap.append('project', 'LTY');
      $.ajax({
        url: HOST.UPLOAD + API.uploadHeadPortraitFile,
        data: formDatap,
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType : false,
        beforeSend: function () {
          $.showLoading('正在上传头像');
        },
        error: function (e) {
          $.toast('请求失败，请稍后重试！');
        },
        success: function (result) {
          if (result.success) {
            var _img = result.data;
            var _key = result.key;
            // 更新用户头像
            $.ajax({
              url: HOST.USER + API.uploadUserData,
              data: {
                userId: Render.header.user.id,
                token: Render.header.user.token,
                headPortraitPath: _img
              },
              type: 'POST',
              dataType: 'json',
              success: function (res) {
                if (res.success) {
                  var _data = res.data;
                  // 申请不是删除图片
                  $.ajax({
                    url: HOST.UPLOAD + API.cancelDeleteFile,
                    data: {
                      key: _key
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (json) {
                      if (json.success) {
                        // 更新cookie
                        APP.setUser(_data);
                        APP.toast({txt:'头像更新成功',time:'1000'},function(){
                          APP.setInit(_data);
                        });
                      } else {
                        $.toast('头像更新失败');
                      }
                    },
                    error: function (e) {
                      $.toast('请求失败，' + e);
                    }
                  });
                } else {
                  $.toast('头像更新失败');
                }
              },
              error: function (e) {
                $.toast('请求失败，' + e);
              }
            });
          } else {
            $.toast('头像更新失败');
          }
        },
        complete: function () {
          $.hideLoading();
        }
      })
    });
    // 修改昵称
    // 修改
    $('.user-name-btn').on('click', function(){
      $('.user-name-cont').hide();
      $('.user-name-edit').show();
      return false;
    });
    // 取消
    $('.user-name-cancel').on('click', function(){
      $('.user-name-cont').show();
      $('.user-name-edit').hide();
      return false;
    });
    // 保存
    $('.user-name-save').on('click', function(){
      var _name = $('#user-name-val').val();

      if (_name === Render.header.user.nickName) {
        $.toast('昵称暂无变化');
        return false;
      }

      // 更新用户昵称
      $.ajax({
        url: HOST.USER + API.uploadUserData,
        data: {
          userId: Render.header.user.id,
          token: Render.header.user.token,
          nickName: _name
        },
        type: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.success) {
            var _data = res.data;
            // 更新cookie
            APP.setUser(_data);
            APP.toast({txt:'保存成功',time:'1000'},function(){
              APP.setInit(_data);
              $('.user-name-cont').show();
              $('.user-name-edit').hide();
            });
          } else {
            $.toast('保存失败，' + res.error);
          }
        },
        error: function (e) {
          $.toast('请求失败，' + e);
        }
      });
      return false;
    });
    // 修改现居地
    // 城市选择
    $.city({
        Clickcb: function(tcity) {
          var _area = tcity.attr('data-code');
          // 更新用户地区
          $.ajax({
            url: HOST.USER + API.uploadUserData,
            data: {
              userId: Render.header.user.id,
              token: Render.header.user.token,
              areaId: _area
            },
            type: 'POST',
            dataType: 'json',
            success: function (res) {
              if (res.success) {
                var _data = res.data;
                // 更新cookie
                APP.setUser(_data);
                APP.toast({txt:'保存成功',time:'1000'},function(){
                  APP.setInit(_data);
                });
              } else {
                $.toast('保存失败，' + res.error);
              }
            },
            error: function (e) {
              $.toast('请求失败，' + e);
            }
          });
        }
    });

    // 安全设置
    // 手机绑定
    $('#mobile .si-btn').on('click', function(){
      var obj = $(this);
      if (!obj.hasClass('update')) {
        // 未绑定
        // 设置标题、操作类型、用户类型、用户ID、用户TOKEN
        layer.open(addSet({title: '绑定新手机', tip: 'add', type: 1, userId: Render.header.user.id, token: Render.header.user.token}));
      } else {
        // 已绑定
        // 设置标题、用户昵称、用户帐号、验证类型、目标类型（tova值作为一个验证引导，不同值分别指向不同目标模块）
        layer.open(valiaccountSet({title: '修改手机-身份验证', user: Render.header.user.nickName, account: Render.header.user.loginPhone, vtype: 1, tova: 'phone'}));
      }
      return false;
    });
    // 邮箱绑定
    $('#email .si-btn').on('click', function(){
      var obj = $(this);
      if (!obj.hasClass('update')) {
        // 未绑定
        // 设置标题、操作类型、用户类型、用户ID、用户TOKEN
        layer.open(addSet({title: '绑定新邮箱', tip: 'add', type: 2, userId: Render.header.user.id, token: Render.header.user.token}));
      } else {
        // 已绑定
        // 设置标题、用户昵称、用户帐号、验证类型、目标类型（tova值作为一个验证引导，不同值分别指向不同目标模块）
        layer.open(valiaccountSet({title: '修改邮箱-身份验证', user: Render.header.user.nickName, account: Render.header.user.email, vtype: 2, tova: 'email'}));
      }
      return false;
    });
    // 密码修改
    $('#loginpwd .si-btn').on('click', function(){
      // 检测帐号信息（手机>邮箱>openId），根据不同信息作检测。
      if (Render.header.user.loginPhone) {
        // 设置标题、用户昵称、用户帐号、验证类型、目标类型（tova值作为一个验证引导，不同值分别指向不同目标模块）
        layer.open(valiaccountSet({title: '修改登录密码-短信验证', user: Render.header.user.nickName, account: Render.header.user.loginPhone, vtype: 1, tova: 'find'}));
      } else if (Render.header.user.email) {
        // 设置标题、用户昵称、用户帐号、验证类型、目标类型（tova值作为一个验证引导，不同值分别指向不同目标模块）
        layer.open(valiaccountSet({title: '修改登录密码-邮箱验证', user: Render.header.user.nickName, account: Render.header.user.email, vtype: 2, tova: 'find'}));
      } else {
        $.toast('第三方登录暂不支持修改登录密码');
      }
      return false;
    });
  } else {
    window.location.href = './index.html';
  }

});