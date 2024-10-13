// pages/welcome/welcome.js
import { getStorage, setStorage } from '../../utils/storage';
import { modal, toast } from '../../utils/extendApi';
import userServer from '../../models/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 验证一下token
    let token = getStorage('token')
    if(token){
        wx.switchTab({
          url: '/pages/todo/todo',
        })
    }
  },
  login(){
    // wx.login 获取用户的临时登录code
    wx.login({
        success: async ({code}) => {
            console.log(code);
            if(code){
               const { data } = await userServer.login({code})
                // 登录成功，存储token
                setStorage('token', data.token)
                // 跳转到todo页面
                wx.switchTab({
                  url: '/pages/todo/todo',
                })
            }else{
                toast({
                    title:'授权失败，重新登录'
                })
            }
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})