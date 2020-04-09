// miniprogram/pages/register/register.js
const app = getApp()
var utils = require("../../utils/wxDBUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identityType: '',
    picker: ['老师', '学生'],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  PickerChange(e) {
    console.log('身份选择。。。。')
    console.log(e)
    // this.data.identityType = e.detail.value;
    console.log(this.data.identityType)
    this.setData({
      identityType: e.detail.value
    })
    console.log(this.data.identityType)
  },

  register(e) {
    console.log('注册。。。。')
    if (e.detail.value.identityType == '') {
      wx.showToast({
        title: '请选择身份类型！',
        icon: 'none',
      })
      return;
    }
    if (e.detail.value.userName == "") {
      wx.showToast({
        title: '请输入用户名！',
        icon: 'none',
      })
      return;
    }
    if (e.detail.value.password == "") {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none',
      })
      return;
    }
    //  学生信息验证
    if (e.detail.value.identityType == 1) {
      if (e.detail.value.studentNum == "") {
        wx.showToast({
          title: '请输入学号！',
          icon: 'none',
        })
        return;
      }
      if (e.detail.value.major == "") {
        wx.showToast({
          title: '请输入专业！',
          icon: 'none',
        })
        return;
      }
      //老师信息验证
    } else if (e.detail.value.identityType == 0) {
        if (e.detail.value.mainDirection == '') {
            wx.showToast({
                title: '请输入主攻方向！',
                icon: 'none',
            })
            return;
        }
        if (e.detail.myInfo == "") {
            wx.showToast({
                title: '请输入个人简介！',
                icon: 'none',
            })
            return;
        }
    }
    //  注册之前必须授权
    if (!this.data.userInfo.avatarUrl) {
      wx.showToast({
        title: '请完成授权再注册！',
        icon: 'none',
      })
      return;
    }
    // 重名验证
    var that = this
    utils.dbGetMany(
      "st_user",
      {userName: e.detail.value.userName},
      function(res){
        console.info(res)
        if(res.length > 0){
          wx.showToast({
            title: '用户名已存在！',
            icon: 'none'
          })
          return;
        }else {
          e.detail.value.headUrl = that.data.userInfo.avatarUrl
          that.addUser(e.detail.value);
        }
      }
    )
    
  },
  addUser: function(data){
    const db = wx.cloud.database();
    db.collection('st_user').add({
      data,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        wx.showModal({
          title: '提示信息',
          content: '恭喜你，注册成功！',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              wx.navigateBack({
                complete: (res) => {},
              })
            }
          }
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})