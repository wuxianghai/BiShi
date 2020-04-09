const app = getApp();
var globalData = app.globalData;
Page({
  data: {
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //表单提交
  formSubmit(e) {
    console.log(e);
    var information = e.detail.value;
    if (information.userName.length == 0 || information.userName == ''){
      wx.showToast({
        title: '请输入用户名 ！！',
        icon: 'none',
      })
      return;
    }
    if (information.password.length == 0 || information.password == ''){
      wx.showToast({
        title: '请输入密码 ！！',
        icon: 'none',
      })
      return;
    }
    const db = wx.cloud.database();
      db.collection("st_user").where({
        userName: information.userName,
        password: information.password
      }).get({
        success:res=>{
          console.log(res)
          if(res.data.length > 0){
            app.globalData.user = res.data[0]
            wx.switchTab({
              url: '../home/home',
            })
          }else {
            wx.showModal({
              title: '提示信息',
              content: '用户名密码错误',
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
          
        },fail:err=>{
          console.log(err)
        }
      })
  },
  /**
   * 跳转注册页
   */
  toRegister: function(){
    wx.navigateTo({
      url: '../register/register',
    })
  }
})