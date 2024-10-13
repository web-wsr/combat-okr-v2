// pages/okr_create/okr_create.js
import { toast } from './../../utils/extendApi';
import okrServer from '../../models/okr'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objective: '',
    keyresults: [{
        keyresult: ''
    }]
  },
  handleAddKeyresult(){
    let keyresults = this.data.keyresults
    keyresults.push({keyresult: ''})
    this.setData({keyresults})
  },
  handleDeleteKeyresult(event){
    // console.log(event);
    let index = event.currentTarget.dataset.index
    let keyresults = this.data.keyresults
    keyresults.splice(index, 1)
    this.setData({keyresults})
  },
  handleChangeObjective(event){
    let value = event.detail.value
    this.setData({objective: value})
  },
  handleChangeKeyresult(event){
    let index = event.currentTarget.dataset.index
    let value = event.detail.value
    let keyresults = this.data.keyresults
    keyresults[index].keyresult = value
    this.setData({ keyresults })
  },
  async handleSubmit(){
    let keyresults = this.data.keyresults
    let objective = this.data.objective
    if(!keyresults.length || !objective){
      toast({
        title: '目标和成果不能为空',
        icon:'none',
        mask: true,
        duration: 2000
      })
      return
    }
    let data = { keyresults, objective }
    const res = await okrServer.okrAdd(data)
    if(res.code === 200){
      toast({
        title: '成功',
        icon: 'success',
        mask: true,
        duration: 1000
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/okr/okr',
        })
      },1000)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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