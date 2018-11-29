utils.IE();

// 模版加载
var loadingTpl = template(globalTpl.loading.funToStr());
var fontpicupTpl = template(globalTpl.fontpicupload.funToStr());

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());
  $('.download').html(loadingTpl());

  // 错误模版
  var errSet = function (message) {
    return $.extend(true,{},Render.layeropts,{
      type: 1,
      title: false,
      closeBtn: 0,
      offset: 'auto',
      area: 'auto',
      zIndex: 9000,
      content: '<div class="toast" style="transform: translate(-50%, -50%);"><p style="margin-bottom: 20px; line-height: 24px;">' + message + '</p><div class="toast-btn" style="width: 100px; height: 30px; background: #fff; margin: 0 auto; line-height: 30px; color: #00c198; text-align: center; font-size: 14px; cursor: pointer;">知道了</div></div>',
      success: function (layero, index) {
        $('.toast-btn').on('click', function () {
          layer.close(index);
          window.location.href = 'about:blank';
          window.close();
        });
      }
    });
  };

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

  // 下载页面
    var download_id = utils.getParam('id');   //- 字体id
    var download_font = utils.getParam('font');   //- 字体名
    var $download = $('.download');

    //开通VIP弹窗参数
    var vipSetup = $.extend(true,{},Render.layeropts,{
      type: 0,
      title: '系统提示',
      offset: 'auto',
      btn: ['立即开通','取消'],
      content: '<div class="font-layer-tips">您还不是vip，立即开通VIP享受高速下载？</div>',
      yes: function(index, layero){
        window.location.href = './member.html';
      },
      btn2: function(index, layero){
        //return false 开启该代码可禁止点击该按钮关闭
      }
    });

    // 云字体弹窗参数
    var _cloudTpl = template(globalTpl.fontlayermain.funToStr());
    var cloudSetup = $.extend(true,{},Render.layeropts,{
      type: 1,
      title: '“'+download_font+'”云字体',
      area: '700px',
      zIndex: 9000,
      content: _cloudTpl(),
      btn:''
    });

    // 默认预览图
    var _defaultPreviewImg;
    var _getPreviewParams = {fontId: download_id, fontSize: '36', height: '52'};

    // 获取需预览的值
    var getPreviewText = function () {
      var $input = $('.preview-input');
      var val = $input.val();
      var placeholder = $input.attr('placeholder');
      if (!val || val === placeholder) {
          $.toast(placeholder);
          $input.blur();
          return '';
      }
      return val;
    }
    // 获取预览图
    var getPreviewImage = function (val) {
      _getPreviewParams.text = val;
      $.ajax({
        url: HOST.WEB_SERVER + API.getPreviewByFontId,
        data: _getPreviewParams,
          beforeSend: function () {
            $('#fontImage').hide();
            $('.preview-loading').show();
          },
          complete: function () {
            $('#fontImage').show();
            $('.preview-loading').hide();
          },
          success: function (result) {
            if (result.is_success) {
              var obj = result.data[0];
              if (obj.font_image) {
                $('#fontImage').attr('alt', val).setBase64(obj.font_image);

                if (!_defaultPreviewImg) {
                    _defaultPreviewImg = obj.font_image;
                }
              } else {
                //- 预览图不存在情况
                $.toast('Sorry~ 暂无可预览的图片');
                $('#fontImage').attr('alt', '暂无可预览的图片');
                $('.preview-input').val('').blur();
              }
            }
          }
      });
    }

    // 设置title
    if (download_font) {
      document.title = download_font + '-字体下载-求字体网';
      $('.font-name').html(download_font);
    }

    // 字体id非空检测
    if (utils.isEmpty(download_id)) {
      var _fontdownloaderrTpl = template(globalTpl.fontdownloaderr.funToStr());
      $download.html(_fontdownloaderrTpl({text: '请求发生错误'}));
      layer.open(errSet('请求发生错误，请稍后重试'));
    } else {
      // 获取字体详情
      $.ajax({
        url: HOST.WEB_SERVER + API.getFontsByFontId,
        data: {fontId: download_id},
        type: 'POST',
        dataType: 'json',
        success: function (result) {
          if (result.is_success) {
            var obj = result.data.list[0];
            obj.file_size_text = utils.bytesToSize(obj.file_size);

            obj.btn_icon = 'icons icon-download-white'; //- 按钮图标样式
            obj.btn_text = '官方下载'; //- 按钮文本
            if (obj.download_level != 0 && obj.font_company_url == '') {
              //- 官方下载链接为空的情况
              obj.font_company_url = 'https://www.baidu.com/s?wd=' + obj.font_name;
              obj.btn_text = '百度一下';
              obj.btn_icon = '';
            }
            // 主体模版
            var _fontdownloadTpl = template(globalTpl.fontdownload.funToStr());
            $download.html(_fontdownloadTpl(obj));

            // 显示隐藏模版
            $('.font-pic-btn').attr('data-id', obj.id).show();
            $('.font-download-banner').show();

            //- 值为空时显示"无"
            $('.c-value', $download).each(function(){
              $(this).text($(this).text() || '无');
            });
          } else {
            var _fontdownloaderrTpl = template(globalTpl.fontdownloaderr.funToStr());
            $download.html(_fontdownloaderrTpl({text: result.error || '请求出错，请稍后重试'}));
          }
        },
        error: function (err) {
          layer.open(errSet('请求出错，请稍后重试'));
        }
      });

      // 普通线路下载按钮
      $download.on('click', '#ptDownload', function(){
        var obj = $(this);
        if (!obj.hasClass('dis')) {
          obj.addClass('dis');
          var _url = obj.data('url');
          if (_url) {
            window.location.href = HOST.DOWNLOAD + API.qztDownload + '?url=' + encodeURIComponent(_url);
          }
          // 两秒后重置按钮
          setTimeout(function(){
            obj.removeClass('dis');
          }, 2000);
        }
        return false;
      });

      // VIP线路下载按钮
      $download.on('click', '#vipDownload', function(){
        var obj = $(this);
        if (!obj.hasClass('dis')) {
          obj.addClass('dis');
          if (Render.header.user) {
            var _url = $(this).data('url');
            if (Render.header.user.vip) {
              var downloadServer = utils.getWebServer(Render.header.user.serverList, 6);
              window.location.href = downloadServer + '/qztDownload?url=' + encodeURIComponent(_url) + '&token=' + Render.header.user.token + '&user_id=' + Render.header.user.id;
              // 两秒后重置按钮
              setTimeout(function(){
                obj.removeClass('dis');
              }, 2000);
            } else {
              obj.removeClass('dis');
              layer.open(vipSetup);
            }
          } else {
            // 还未登录
            obj.removeClass('dis');
            layer.open(loginSetup());
          }
        }
        return false;
      })

      // 云字体按钮
      $download.on('click', '#cloudDownload', function(){
        layer.open(cloudSetup);
        // 第一次获取预览图
        if (!_defaultPreviewImg) {
          getPreviewImage(download_font);
        }
        return false;
      });
      // 云字体预览点击事件
      $(document).on('click', '#previewBtn', function(){
        var asd = getPreviewText();
        if (utils.isEmpty(asd)) return;
        //- 防止同一个搜索词连续搜索
        if (_getPreviewParams.text === asd) return;
        getPreviewImage(asd);
        return false;
      });

      // 预览字体简繁转换
      $(document).on('click', '.jftrans', function(){
        var type = $(this).data('type');
        var $input = $('.preview-input');
        var val = $input.val();
        var placeholder = $input.attr('placeholder');
        if (val && val != placeholder) {
          $input.val(utils.transformJF(val, type));
        }
      });

      // 下载SVG文件
      $(document).on('click', '#svgDownload', function(){
        // 判断是否登录
        if (Render.header.user) {
          var _text = getPreviewText();
          if (utils.isEmpty(_text)) return;
          if (Render.header.user.vip) {
            var server = utils.getWebServer(Render.header.user.serverList, 2);
            window.location.href = server + '/downloadSvg?fontId=' + download_id + '&text=' + _text;
          } else {
            layer.open(vipSetup);
          }
        } else {
          layer.open(loginSetup());
        }
      })

      // 预览搜索回车事件
      $(document).on('keypress', '.preview-input', function(){
        if (event.keyCode === 13) {
          $('#previewBtn').trigger('click');
        }
      }).maxlength().placeholder();

    }
});