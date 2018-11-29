utils.IE();

$(function(){

  // 加载模版
  $('#header').html(headerTpl(Render.header));
  $('#footer').html(footTpl());

  // 设置当前tab
  var fontTab = $('.fontlist-nav .active').hasClass('created');

  // 创建并收藏字体单模块
  var fontCSet = function (data) {
    return $.extend(true,{},Render.layeropts,{
      type: 1,
      title: data.type ? '编辑字体单' : '创建字体单',
      offset: 'auto',
      area: '798px',
      zIndex: 9000,
      content: fonteditTpl(data),
      success: function (layero, index) {

        // 选择标签 按钮
        $('.fontlist-tag-btn').on('click', function () {
          // 获取当前标签内容
          var tag = $('.fontlist-tag').attr('data-arr'), tagArr = [];
          // 判断当前是否有数据
          if (!(tag.indexOf('标签') > -1)) {
            tagArr = tag.split(',');
          }
          var c_data = {
            tagItem: ['简约','现代','古典','中国风','手写风','优雅','端庄','有趣','卡通','尖锐','有力','豪放'],
            tagArr: tagArr
          }
          // 打开选择标签弹窗
          layer.open(fontagSet(c_data));
          return false;
        });

        // 选择封面 按钮
        $('.fontlist-pic-upload').on('change', function (lat) {
          var _file = lat.target.files[0];
          // 检测图片格式和大小
          if (_file.size > 1024*1024) {
            $.toast('文件大小不超过1M');
            return;
          }
          if (!/(jpg|jpeg|png)$/.test(_file.type)) {
            $.toast('只允许上传jpg、png格式图片');
            return;
          }
          if (_file) {
            var formData = new FormData();
            formData.append('coverImgFile', _file);
            // 上传封面图
            $.ajax({
              url: HOST.WEB_SERVER + API.uploadFontListImg,
              data: formData,
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
                if (result.is_success) {
                  // 设置
                  var _img = HOST.WEB_SERVER + '/getImgByOSSKey?oss_key=' + result.data;
                  $('.fontlist-pic').find('img').attr('src', _img).attr('data-img', result.data);
                } else {
                  $.toast(result.error);
                }
              },
              complete: function () {
                $.hideLoading();
              }
            });
          }
        }).on('click', function () {
          $(this).val('');
        });

        // 取消 按钮
        $('.fontlist-edit-btn .cancel').on('click', function () {
          layer.close(index);
          return false;
        });

        // 保存 按钮
        $('.fontlist-edit-btn .save').on('click', function () {
          var obj = $(this);
          var listName = $('.fontlist-name').val();
          var tag = $('.fontlist-tag').attr('data-arr');
          var brief = $('.fontlist-brief').val();
          var coverImg = $('.fontlist-pic').find('img').attr('data-img');
          if (!obj.hasClass('dis-save')) {
            obj.addClass('dis-save');
            if (!$.trim(listName)) {
              $.toast('标题不存在');
              obj.removeClass('dis-save');
              return false;
            } else if (tag.indexOf('标签') > -1) {
              $.toast('标签不存在');
              obj.removeClass('dis-save');
              return false;
            } else {
              $.ajax({
                url: HOST.WEB_SERVER + API.addFontList,
                data: {
                  userId: Render.header.user.id,
                  listName: $.trim(listName),
                  tag: tag,
                  brief: brief,
                  coverImg: coverImg
                },
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                  $.showLoading('正在创建字体单');
                },
                error: function (e) {
                  $.toast('请求失败，请稍后重试！');
                },
                success: function (result) {
                  if (result.is_success) {
                    // 默认收藏
                    $.ajax({
                      url: HOST.WEB_SERVER + API.upFontListToUser,
                      data: {
                        fontListIds: result.data.id,
                        userId: Render.header.user.id,
                        type: 'ADD'
                      },
                      type: 'GET',
                      dataType: 'json',
                      beforeSend: function () {
                        // $.showLoading();
                      },
                      error: function (e) {
                        // $.toast('请求失败，请稍后重试！');
                        // obj.removeClass('collect-dis');
                      },
                      success: function (res) {
                        if (res.is_success) {
                          layer.close(index);
                          // 创建并收藏成功跳转
                          APP.toast({txt:'创建成功',time:'1000'},function(){
                            window.location.href = './fontdetail.html?id=' + result.data.id;
                          });
                        }
                      },
                      complete: function () {
                        // $.hideLoading();
                      }
                    });
                  } else {
                    $.toast(result.error);
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

  // 编辑字体单模块
  var fontESet = function (data) {
    return $.extend(true,{},Render.layeropts,{
      type: 1,
      title: data.type ? '编辑字体单' : '创建字体单',
      offset: 'auto',
      area: '798px',
      zIndex: 9000,
      content: fonteditTpl(data),
      success: function (layero, index) {

        // 选择标签 按钮
        $('.fontlist-tag-btn').on('click', function () {
          // 获取当前标签内容
          var tag = $('.fontlist-tag').attr('data-arr'), tagArr = [];
          // 判断当前是否有数据
          if (!(tag.indexOf('标签') > -1)) {
            tagArr = tag.split(',');
          }
          var c_data = {
            tagItem: ['简约','现代','古典','中国风','手写风','优雅','端庄','有趣','卡通','尖锐','有力','豪放'],
            tagArr: tagArr
          }
          // 打开选择标签弹窗
          layer.open(fontagSet(c_data));
          return false;
        });

        // 选择封面 按钮
        $('.fontlist-pic-upload').on('change', function (lat) {
          var _file = lat.target.files[0];
          // 检测图片格式和大小
          if (_file.size > 1024*1024) {
            $.toast('文件大小不超过1M');
            return;
          }
          if (!/(jpg|jpeg|png)$/.test(_file.type)) {
            $.toast('只允许上传jpg、png格式图片');
            return;
          }
          if (_file) {
            var formData = new FormData();
            formData.append('coverImgFile', _file);
            // 上传封面图
            $.ajax({
              url: HOST.WEB_SERVER + API.uploadFontListImg,
              data: formData,
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
                if (result.is_success) {
                  // 设置
                  var _img = HOST.WEB_SERVER + '/getImgByOSSKey?oss_key=' + result.data;
                  $('.fontlist-pic').find('img').attr('src', _img).attr('data-img', result.data);
                } else {
                  $.toast(result.error);
                }
              },
              complete: function () {
                $.hideLoading();
              }
            });
          }
        }).on('click', function () {
          $(this).val('');
        });

        // 取消 按钮
        $('.fontlist-edit-btn .cancel, .fontlist-edit-btns .cancel').on('click', function () {
          layer.close(index);
          return false;
        });

        // 保存 按钮
        $('.fontlist-edit-btns .save').on('click', function () {
          var obj = $(this);
          var listName = $('.fontlist-name').val();
          var tag = $('.fontlist-tag').attr('data-arr');
          var brief = $('.fontlist-brief').val();
          var coverImg = $('.fontlist-pic').find('img').attr('data-img');
          if (!obj.hasClass('dis-save')) {
            obj.addClass('dis-save');
            if (!$.trim(listName)) {
              $.toast('标题不存在');
              obj.removeClass('dis-save');
              return false;
            } else if (tag.indexOf('标签') > -1) {
              $.toast('标签不存在');
              obj.removeClass('dis-save');
              return false;
            } else {
              var coverImgState = '';
              if (coverImg !== data.coverImg) {
                coverImgState = 'Update';
              }
              $.ajax({
                url: HOST.WEB_SERVER + API.upFontListDetail,
                data: {
                  userId: Render.header.user.id,
                  id: data.id,
                  listName: $.trim(listName),
                  tag: tag,
                  brief: brief,
                  coverImg: coverImg,
                  coverImgState: coverImgState
                },
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                  $.showLoading('正在编辑字体单');
                },
                error: function (e) {
                  $.toast('请求失败，请稍后重试！');
                },
                success: function (result) {
                  if (result.is_success) {
                    layer.close(index);
                    // 编辑保存
                    APP.toast({txt:'编辑成功',time:'1000'},function(){
                      // 刷新页面
                      fontRequest(fontTab);
                    });
                  } else {
                    $.toast(result.error);
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

        // 删除字体单
        $('.fontlist-edit-btns .delete').on('click', function () {
          layer.confirm('确认删除当前字体单？', {
            btn: ['确认', '取消']
          }, function(){
            // 删除操作
            $.ajax({
              url: HOST.WEB_SERVER + API.deleteFontList,
              data: {
                userId: Render.header.user.id,
                ids: data.id
              },
              type: 'POST',
              dataType: 'json',
              beforeSend: function () {
                $.showLoading('正在删除字体单');
              },
              error: function (e) {
                $.toast('删除失败，请稍后重试！');
              },
              success: function (result) {
                if (result.is_success) {
                  // 取消默认收藏
                  $.ajax({
                    url: HOST.WEB_SERVER + API.upFontListToUser,
                    data: {
                      fontListIds: data.id,
                      userId: Render.header.user.id,
                      type: 'DEL'
                    },
                    type: 'GET',
                    dataType: 'json',
                    error: function (e) {
                      $.toast('请求失败，请稍后重试！');
                    },
                    success: function (res) {
                      if (res.is_success) {
                        layer.close(index);
                        APP.toast({txt:'成功删除了该字体单',time:'500'},function(){
                          // 刷新页面
                          fontRequest(fontTab);
                        });
                      }
                    }
                  });
                } else {
                  $.toast(result.error);
                }
              },
              complete: function () {
                $.hideLoading();
              }
            })
          });
          return false;
        });
      }
    });
  };

  // 字体单列表请求
  var fontRequest = function (tab) {
    // console.log(tab);
    if (tab) {
      // 创建字体单请求并显示
      $.ajax({
        url: HOST.WEB_SERVER + API.getMyFontListsByUserId,
        data: {
          userId: Render.header.user.id
        },
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
          $.showLoading();
        },
        error: function (e) {
          $.toast('创建字体单列表请求失败，请稍后重试！');
        },
        success: function (res) {
          if (res.is_success) {
            var total = res.data.length;
            var list = res.data;

            $('.fontlist-nav .created').html('创建的字体单 '+total);

            if (0 === list.length) {
              //- 没有数据的情况
              // 没有数据模版
              var fontnoTpl = template(globalTpl.fontlistnodata.funToStr());
              $('.fontlist-list').html(fontnoTpl);
            } else {
              //- 有数据的情况
              // 列表模版
              var fontTpl = template(globalTpl.fontlistsdata.funToStr());

              // 根据用户信息查询用户是否收藏
              if (Render.header.user) {
                // 请求用户收藏列表
                $.ajax({
                  url: HOST.WEB_SERVER + API.getCollectFontListIdsByUserId,
                  data: {
                    userId: Render.header.user.id
                  },
                  type: 'GET',
                  dataType: 'json',
                  success: function (cres) {
                    var _user = null;
                    // 获取用户收藏字体单列表
                    if (cres.is_success) {
                      if (cres.data) {
                        _user = cres.data;
                      }
                    }
                    // 数据源
                    var fontData = {
                      count: list.length,
                      list: list,
                      user: _user,
                      userid: Render.header.user
                    }
                    $('.fontlist-list').html(fontTpl(fontData));
                  }
                })
              } else {
                // 数据源
                var fontData = {
                  count: list.length,
                  list: list,
                  user: Render.header.user,
                  userid: Render.header.user
                }
                $('.fontlist-list').html(fontTpl(fontData));
              }
            }
          } else {
            $.toast(res.error);
          }
        },
        complete: function () {
          $.hideLoading();
        }
      });
      // 收藏字体单总数
      $.ajax({
        url: HOST.WEB_SERVER + API.getCollectFontListByUserId,
        data: {
          userId: Render.header.user.id
        },
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (res) {
          if (res.is_success) {
            var _total = res.data.length;
            $('.fontlist-nav .collectd').html('收藏的字体单 '+_total);
          }
        }
      });
    } else {
      // 收藏字体单请求并显示
      $.ajax({
        url: HOST.WEB_SERVER + API.getCollectFontListByUserId,
        data: {
          userId: Render.header.user.id
        },
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
          $.showLoading();
        },
        error: function (e) {
          $.toast('收藏字体单列表请求失败，请稍后重试！');
        },
        success: function (res) {
          if (res.is_success) {
            var total = res.data.length;
            var list = res.data;

            $('.fontlist-nav .collectd').html('收藏的字体单 '+total);

            if (0 === list.length) {
              //- 没有数据的情况
              // 没有数据模版
              var fontnoTpl = template(globalTpl.fontlistnodata.funToStr());
              $('.fontlist-list').html(fontnoTpl);
            } else {
              //- 有数据的情况
              // 列表模版
              var fontTpl = template(globalTpl.fontlistdata.funToStr());

              // 根据用户信息查询用户是否收藏
              if (Render.header.user) {
                // 请求用户收藏列表
                $.ajax({
                  url: HOST.WEB_SERVER + API.getCollectFontListIdsByUserId,
                  data: {
                    userId: Render.header.user.id
                  },
                  type: 'GET',
                  dataType: 'json',
                  success: function (cres) {
                    var _user = null;
                    // 获取用户收藏字体单列表
                    if (cres.is_success) {
                      if (cres.data) {
                        _user = cres.data;
                      }
                    }
                    // 数据源
                    var fontData = {
                      count: list.length,
                      list: list,
                      user: _user,
                      userid: Render.header.user
                    }
                    $('.fontlist-list').html(fontTpl(fontData));
                  }
                })
              } else {
                // 数据源
                var fontData = {
                  count: list.length,
                  list: list,
                  user: Render.header.user,
                  userid: Render.header.user
                }
                $('.fontlist-list').html(fontTpl(fontData));
              }
            }
          } else {
            $.toast(res.error);
          }
        },
        complete: function () {
          $.hideLoading();
        }
      });
      // 创建字体单总数
      $.ajax({
        url: HOST.WEB_SERVER + API.getMyFontListsByUserId,
        data: {
          userId: Render.header.user.id
        },
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (res) {
          if (res.is_success) {
            var _total = res.data.length;
            $('.fontlist-nav .created').html('创建的字体单 '+_total);
          }
        }
      });
    }
  }

  var user = APP.getUser();
  if (user) {
    // 初始化用户信息
    APP.setInit(user);

    // 初始化
    fontRequest(fontTab);

    // 编辑 按钮
    $(document).on('click', '.edit', function () {
      var obj = $(this);
      var _id = obj.attr('data-id');
      var _listName = obj.attr('data-listName');
      var _tag = obj.attr('data-tag');
      var _brief = obj.attr('data-brief');
      var _coverImg = obj.attr('data-coverImg');
      var data = {
        type: 1,
        id: _id,
        listName: _listName,
        tag: _tag,
        brief: _brief,
        coverImg: _coverImg
      }
      layer.open(fontESet(data));
      return false;
    });

    // 删除 按钮
    $(document).on('click', '.delete', function () {
      var _id = $(this).attr('data-id');
      layer.confirm('确认删除当前字体单？', {
        btn: ['确认', '取消']
      }, function(){
        // 删除操作
        $.ajax({
          url: HOST.WEB_SERVER + API.deleteFontList,
          data: {
            userId: Render.header.user.id,
            ids: _id
          },
          type: 'POST',
          dataType: 'json',
          beforeSend: function () {
            $.showLoading('正在删除字体单');
          },
          error: function (e) {
            $.toast('删除失败，请稍后重试！');
          },
          success: function (result) {
            if (result.is_success) {
              // 取消默认收藏
              $.ajax({
                url: HOST.WEB_SERVER + API.upFontListToUser,
                data: {
                  fontListIds: _id,
                  userId: Render.header.user.id,
                  type: 'DEL'
                },
                type: 'GET',
                dataType: 'json',
                error: function (e) {
                  $.toast('请求失败，请稍后重试！');
                },
                success: function (res) {
                  if (res.is_success) {
                    APP.toast({txt:'成功删除了该字体单',time:'500'},function(){
                      // 刷新页面
                      fontRequest(fontTab);
                    });
                  }
                }
              });
            } else {
              $.toast(result.error);
            }
          },
          complete: function () {
            $.hideLoading();
          }
        })
      });
      return false;
    });

    // 收藏 按钮
    $(document).on('click', '.collect', function () {
      var obj = $(this);
      var id = obj.attr('data-id');
      // 判断用户是否登录
      if (Render.header.user) {
        if (!obj.hasClass('dis-collect')) {
          if (!obj.hasClass('collect-dis')) {
            obj.addClass('collect-dis');
            if (obj.find('i').hasClass('cur')) {
              // 取消收藏
              $.ajax({
                url: HOST.WEB_SERVER + API.upFontListToUser,
                data: {
                  fontListIds: id,
                  userId: Render.header.user.id,
                  type: 'DEL'
                },
                type: 'GET',
                dataType: 'json',
                beforeSend: function () {
                  $.showLoading();
                },
                error: function (e) {
                  $.toast('请求失败，请稍后重试！');
                  obj.removeClass('collect-dis');
                },
                success: function (res) {
                  if (res.is_success) {
                    APP.toast({txt:'已取消收藏',time:'1000'},function(){
                      // 刷新
                      fontRequest(fontTab);
                    });
                  } else {
                    $.toast(res.error);
                    obj.removeClass('collect-dis');
                  }
                },
                complete: function () {
                  $.hideLoading();
                }
              });
            } else {
              // 添加收藏
              $.ajax({
                url: HOST.WEB_SERVER + API.upFontListToUser,
                data: {
                  fontListIds: id,
                  userId: Render.header.user.id,
                  type: 'ADD'
                },
                type: 'GET',
                dataType: 'json',
                beforeSend: function () {
                  $.showLoading();
                },
                error: function (e) {
                  $.toast('请求失败，请稍后重试！');
                  obj.removeClass('collect-dis');
                },
                success: function (res) {
                  if (res.is_success) {
                    APP.toast({txt:'已收藏到“我的字体单”中',time:'1000'},function(){
                      // 刷新
                      fontRequest(fontTab);
                    });
                  } else {
                    $.toast(res.error);
                    obj.removeClass('collect-dis');
                  }
                },
                complete: function () {
                  $.hideLoading();
                }
              });
            }
          }
        }
      } else {
        APP.toast({txt:'请先登录', time: '1000'}, function(){
          layer.open(loginSet('reload'));
        });
      }
      return false;
    });

    // 分享 按钮
    $(document).on('click', '.share', function () {
      var obj = $(this);
      var id = obj.attr('data-id');
      var oss_key = obj.attr('data-key');
      var cont = obj.attr('data-title');
      var num = obj.attr('data-total');
      var name = obj.attr('data-name');
      var title = document.title;
      var _url = HOST.BEN + '/fontdetail.html?id=' + id;
      var pic = HOST.BEN + '/image/common/fontlist-default.png';
      if (oss_key != '') {
        pic = HOST.WEB_SERVER + API.getImgByOSSKey + '?oss_key=' + oss_key;
      }
      layer.open(shareSet(title,'分享字体单：“'+cont+'”字体合集，by '+name+'，里面包含了'+num+'款字体，快来看哦，字体还可以下载。', _url, pic));
      return false;
    });

    // 创建 按钮
    $(document).on('click', '.create-fontlist', function () {
      layer.open(fontCSet({type: 0}));
      return false;
    });

    // 列表切换
    $(document).on('click', '.fontlist-nav li', function () {
      var obj = $(this);
      if (!obj.hasClass('active')) {
        obj.addClass('active').siblings().removeClass('active');
        // 设置tag，重置页面，重新请求列表，隐藏创建字体单
        if (obj.hasClass('collectd')) {
          obj.parent().next().addClass('ihide');
          fontTab = false;
          fontRequest(fontTab);
        } else {
          obj.parent().next().removeClass('ihide');
          fontTab = true;
          fontRequest(fontTab);
        }
      }
      return false;
    });

  } else {
    window.location.href = './index.html';
  }

});