// pages/todo_keyresult/todo_keyresult.js
import todoKeyresultServer from '../../models/todoKeyresult';
import { modal,toast } from './../../utils/extendApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    okr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let id = options.id
    const { data } = await todoKeyresultServer.getTodoKeyresultList(id)
    this.setData({
      id,
      okr: data.okr
    })
  },
  async handleChange(event){
    // console.log(event);
    let todo_id = this.data.id
    let keyresult_id = event.currentTarget.dataset.keyresult_id
    let active = event.currentTarget.dataset.active
    let index = event.currentTarget.dataset.index
    let objective_index = event.currentTarget.dataset.objective_index
    // 取反
    let flageActive = !active
    let okr = this.data.okr
    if(flageActive){
      const res = await modal({
        title:'关联',
        content: '是否关联此条成果'
      })
      res && await todoKeyresultServer.todoKeyresultAdd(todo_id, {todo_id, keyresult_id})
      okr[objective_index].keyresults[index].active = flageActive
      this.setData({ okr })
    }else{
      const res = await modal({
        title:'取消',
        content: '是否取消关联此条成果'
      })
      res && todoKeyresultServer.todoKeyresultDeleted(todo_id, {todo_id, keyresult_id})
      okr[objective_index].keyresults[index].active = flageActive
      this.setData({ okr })
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