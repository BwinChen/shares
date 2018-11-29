utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footerTpl());

  // 判断用户是否登录
  var user = APP.getUser();

  // 初始化、加载用户信息
  APP.setInit(user);

  // 首页
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

  // 字体搜索执行
  var $fn = $('#textfn');
  var $searchbtn = $('#search');
  $fn.on('keypress', function(event) {
    if (event.keyCode === 13) {
      $searchbtn.click();
    }
  }).maxlength().placeholder();
  $searchbtn.on('click', function () {
    var val = $fn.val();
    var placeholder = $fn.attr('placeholder');
    if (!val || val === placeholder) {
      $.toast(placeholder);
    } else {
      val = $.trim(val);
      window.location.href = './search.html?fn=' + encodeURIComponent(val);
    }
  });

  // 识图搜索字体图层
  // 获取粘贴图层
  $(document).on('paste', function(e) {
    var event = e.originalEvent;
    var cbd = window.clipboardData || event.clipboardData;
    var ua = window.navigator.userAgent;

    // 如果是 Safari 直接 return
    if ( !(event.clipboardData && event.clipboardData.items) ) {
      return;
    }

    // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
    if(cbd.items && cbd.items.length === 2 && cbd.items[0].kind === 'string' && cbd.items[1].kind === 'file' &&
        cbd.types && cbd.types.length === 2 && cbd.types[0] === 'text/plain' && cbd.types[1] === 'Files' &&
        ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49){
      return;
    }
    for(var i = 0; i < cbd.items.length; i++) {
      var item = cbd.items[i];
      if(item.kind == 'file'){
        var blob = item.getAsFile();
        if (!blob) {
          $.toast('只允许上传jpg、png、bmp格式图片');
          return;
        }
        if (blob.size === 0) {
          return;
        }
        if (blob.size > 1024*1024) {
          $.toast('文件大小不超过1M');
          return;
        }
        // blob 就是从剪切板获得的文件 可以进行上传或其他操作
        Render.file = blob;
        if (Render.file) {
          $('#textfield').val(blob.name);
          var formDatas = new FormData();
          formDatas.append('file', Render.file);
          getFontImg(formDatas);
        }
      }
    }
  });
  // 设置file文件
  $(document).on('change', 'input[name="uploaded_file"]', function(vat){
    var asd = $(this).val();
    var _file = vat.target.files[0];
    // 检测图片格式和大小
    if (_file.size > 1024*1024) {
      $.toast('文件大小不超过1M');
      return;
    }
    if (!/(jpg|jpeg|png|bmp)$/.test(_file.type)) {
      $.toast('只允许上传jpg、png、bmp格式图片');
      return;
    }
    // if (utils.IEN()) {
    //   var fileEle = document.getElementById('uploadfile');
    //   var fso = new ActiveXObject("Scripting.FileSystemObject");
    //   fileEle.select();
    //   fileEle.blur();
    //   var filePath = document.selection.createRange().text;
    //   if(fso.FileExists(filePath)){
    //     Render.file = fso.GetFile(filePath);
    //   }
    // } else {
    Render.file = _file;
    // }
    if (Render.file) {
      $('#textfield').val(asd);
      var formDatac = new FormData();
      formDatac.append('file', Render.file);
      getFontImg(formDatac);
    } else {
      $('#textfield').val('');
    }
  })
  $(document).on('click', 'input[name="uploaded_file"]', function(){
    $(this).val('');
  });
  // 识图一下 按钮
  $('#forward').on('click', function(){
    if (Render.file) {
      var formDate = new FormData();
      formDate.append('file', Render.file);
      getFontImg(formDate);
    } else {
      $.toast('请先选择图片');
    }
    return false;
  });
  var getFontImg = function (formData) {
    var _formData = formData;
    $.ajax({
      url: HOST.FONTRE + API.uploadFontImg,
      data: _formData,
      type: 'POST',
      dataType: 'json',
      processData: false,
      contentType : false,
      beforeSend: function () {
        $.showLoading('正在上传图片');
      },
      error: function (e) {
        $.toast('请求失败，请稍后重试！');
      },
      success: function (result) {
        if (result.success) {
          // 清空本地缓存文件
          $('#textfield').val('');
          window.location.href = './confirm.html?path=' + encodeURIComponent(result.path);
        } else {
          $.toast(result.error);
        }
      },
      complete: function () {
        $.hideLoading();
      }
    });
  }

});