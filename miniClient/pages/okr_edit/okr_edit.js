// pages/okr_edit/okr_edit.js
import okrServer from '../../models/okr';
import keyresultServer from '../../models/keyresult'
import { modal,toast } from './../../utils/extendApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objective: '',
    // 初始化为空，根据关联的kr进行回显
    keyresults: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // console.log(options);
    // 点击当前目标，带过来的id
    let id = options.id
    const { data } = await okrServer.okrShow(id)
    const objective = data.okr.objective
    const keyresults = data.okr.keyresults
    this.setData({ objective,keyresults,id })
  },
  handleAddKeyresult(){
    let keyresults = this.data.keyresults
    keyresults.push({keyresult: ''})
    this.setData({keyresults})
  },
  async handleDeleteKeyresult(event){
    // console.log(event);
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    let keyresults = this.data.keyresults
    // 有点击增加成果但不填 进行移除的情况
    if(keyresults[index].keyresult === ""){
      keyresults.splice(index, 1)
      this.setData({ keyresults })
      return
    }
    const res = await modal({
      title: '删除',
      content: '是否删除该条 keyresult',
    })
    if(res){
    const { code } = await keyresultServer.keyresultDeleted(id)
     if(code === 200){
      keyresults.splice(index, 1)
      this.setData({ keyresults })
     }
    }
  },
  handleChangeObjective(event){
    let value = event.detail.value
    this.setData({objective: value})
  },
  handleChangeKeyresult(event){
    const index = event.currentTarget.dataset.index
    const value = event.detail.value
    const keyresults = this.data.keyresults
    keyresults[index].keyresult = value
    this.setData({ keyresults })
  },

  async handleSubmit(event){
    const objective = this.data.objective
    const keyresults = this.data.keyresults
    console.log(keyresults);
    if(!objective || !keyresults.length){
      toast({
        title: '目标和成果不能为空',
        icon:'none',
        mask: true,
        duration: 2000
      })
      return
    }
    const flag = keyresults.every( data => data.keyresult)
    if(!flag){
      toast({ 
        title: '添加成果不能为空',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }
    // console.log(this.data);
    const id = this.data.id
    const data = { objective, keyresults}
    const res = await okrServer.okrUpdate(id, data)
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