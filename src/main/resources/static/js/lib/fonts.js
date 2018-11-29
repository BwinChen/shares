utils.IE();

// 模版加载

var loadingTpl = template(globalTpl.loading.funToStr());
var fontattrTpl = template(globalTpl.searchattrnone.funToStr());

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());
  $('.font-attr-con').html(fontattrTpl());

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

  // 字体页面
  // 获取地址栏查找的字体名称
  var search_size = utils.getParam('fontSize'),          //- 字体
      search_height = utils.getParam('height'),        //- 字体图片高度
      search_font = utils.getParam('fontName'),          //- 查找字体名称
      search_page = utils.getParam('offset') ? utils.getParam('offset') : 0,      //- 页码
      search_rows = utils.getParam('fetchSize') ? utils.getParam('fetchSize') : 10,     //- 每页显示条数
      search_top,           //- 下载按钮 top 偏移值
      search_previewText;   //- 图片预览文字
  var $sizeSelect = $('.size-select');    //- 字体大小选择
  var $sizeitem = $('.size-item.on', $sizeSelect);
  var $fontMain = $('.font-main');        //- 字体列表
  var $fontAttr = $('.font-attr-con');        //- 字体属性
  var $previewBtn = $('#previewBtn');     //- 预览字体按钮
  var $searchBtn = $('#searchBtn');       //- 查找字体按钮
  var $fontAttrBox = $('.font-attr');

  // 初始化字体选择
  search_height = $sizeitem.data('height');
  search_size = $sizeitem.data('size');
  search_top = $sizeitem.data('top');
  $sizeSelect.find('.text').html($sizeitem.html());
  // 关闭字体选择
  var closeSizeSelect = function () {
    if ($sizeSelect.hasClass('on')) {
      $sizeSelect.click();
    }
  }
  // 发起请求
  var request = function () {
    var turl = './fonts.html?fontName=' + search_font;
    // 发起请求
    if (search_size !== '') {
      turl += '&fontSize=' + search_size;
    }
    if (search_height !== '') {
      turl += '&height=' + search_height;
    }
    if (search_page !== '') {
      turl += '&offset=' + search_page;
    }
    if (search_rows !== '') {
      turl += '&fetchSize=' + search_rows;
    }
    if (search_previewText) {
      turl += '&text=' + search_previewText;
    }
    return turl;
  }

  // 判断用户是否登录
  var user = APP.getUser();
  // 初始化、加载用户信息
  APP.setInit(user);

  // 初始化
  if (search_font) {
    utils.isChn(search_font) ? $('.font-name').html('中文字体分类') : $('.font-name').html('英文字体分类');
    $('.font-header').find('h1').html(search_font);
    // 设置标题
    document.title = search_font + '下载-' + search_font + '预览-' + search_font + '库-求字体网'
  } else {
    layer.open(errSet('请求发生错误，请稍后重试'));
    // 字体无搜索词模版
    var _fontNoneTpl = template(globalTpl.searchnone.funToStr());
    $fontMain.html(_fontNoneTpl());
  }

  // 字体大小
  $(document.body).on('click', function () {
    // 关闭字体选择
    closeSizeSelect();
  })
  // 字体大小选择
  $sizeSelect.on('click', function(event) {
    event.stopPropagation();
    $(this).toggleClass('on')
           .find('i').toggleClass('on').end()
           .find('ul').toggle();
  }).on('click', 'ul > li', function(event) {
    event.stopPropagation()

    var $this = $(this);
    var $select = $this.parent();

    //- 如果选中当前已经选中的项，则不执行
    if ( !$this.hasClass('on') ) {
      var val = $this.html();
      $select.siblings('.text').html(val);

      //- 更新全局变量值
      search_height = $this.data('height');
      search_size = $this.data('size');
      search_top = $this.data('top');

      //- 切换样式
      $this.sibToggleClass('on');

      // 发请求
      window.location.href = request();
    }

    $sizeSelect.toggleClass('on');
    $select.toggle().siblings('.icon-arrow').toggleClass('on');
  });

  // 字体点击事件
  $fontMain.on('click', '.font-item', function (event) {
    event.stopPropagation();
    closeSizeSelect();

    var obj = $(this);
    var index = $(this).index();
    if (obj.hasClass('on')) return;
    obj.sibToggleClass('on');

    var attrdata = obj.find('.font-item-attr-box').html();

    $fontAttr.html(attrdata);

    // 字体值为空时显示“无”
    $('.font-attr-content p', $fontAttr).each(function() {
      $(this).text($(this).text() || '无')
    })
  });
  // 字体属性自动置顶
  var fontAttrTop = $fontAttrBox.offset().top;
  $(window).scroll(function(){
      if ( $fontMain.find('.font-item').length > 0 ) {
          $fontAttrBox.toggleClass('fixed', $(this).scrollTop() > fontAttrTop);
      }
  });

  // 预览点击事件
  $previewBtn.on('click', function () {
    var $input = $(this).siblings('input');
    var val = $input.val();
    var placeholder = $input.attr('placeholder');
    var items = $fontMain.children('.font-item').length;
    if (0 != items) {
      if (!val || val === placeholder) {
        $.toast(placeholder);
      } else {
        if (val == search_previewText) return;
        val = $.trim(val);
        search_previewText = val;
        window.location.href = request();
      }
    }
  });
  // 预览字体简繁转换
  $('.jftrans').on('click', function () {
    var type = $(this).data('type');

    var $input = $('.preview-input');
    var val = $input.val();
    var placeholder = $input.attr('placeholder');
    if (val && val != placeholder) {
      $input.val(utils.transformJF(val, type));
    }
  });

  // 搜索点击事件
  $searchBtn.on('click', function (){
    var ptext = $('.preview-input').val();
    var $input = $(this).siblings('input');
    var val = $input.val();
    var placeholder = $input.attr('placeholder');
    if (!val || val === placeholder) {
      $.toast(placeholder);
    } else {
      if (val === search_font) return;
      val = $.trim(val);
      search_font = val;

      // 发起搜索请求
      window.location.href = './search.html?fn=' + search_font;
    }
  });

  // 预览文本框、查找文本框 回车搜索事件
  $('.preview-input, .search-input').on('keypress', function(event) {
      if (event.keyCode === 13) {
          $(this).siblings('.font-search-click').click();
      }
  }).maxlength().placeholder();

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

  // 收藏字体 按钮
  $fontMain.on('click', '.font-collect i', function () {
    var obj = $(this);
    var _id = obj.attr('data-id');
    if (!obj.hasClass('dis')) {
      obj.addClass('dis');
      if (Render.header.user) {
        // 弹出收藏列表
        var datas = {
          userid: Render.header.user.id,
          token: Render.header.user.token,
          fontid: _id
        }
        layer.open(fontcollectsSet(datas));
        obj.removeClass('dis');
      } else {
        // 还未登录
        obj.removeClass('dis');
        layer.open(loginSetup());
      }
    }
    return false;
  });

});