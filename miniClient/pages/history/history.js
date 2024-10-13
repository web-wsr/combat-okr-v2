// pages/history/history.js
import todoServer from '../../models/todo';
import { modal } from './../../utils/extendApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: []
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
  async onShow() {
    const {
      data
    } = await todoServer.todoList({
      status: 0
    })
    this.setData({
      todos: data.todos
    })
    console.log(this.data.todos);
  },

  handleActionSheet(event) {
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['标记未完成', '删除'],
      itemColor: '#333',
      success: async (res) => {
        let tapIndex = res.tapIndex
        switch (tapIndex) {
          case 0:
            this.handleChangeTodo(id, index)
            break
          case 1:
            const res = await modal({
              title: '删除',
              content: '是否删除该条 Todo'
            })
            if(res){
              this.handleDeletedTodo(id, index)
            }
            break
        }
      },
      fail(res) {
        console.log(res.errMsg);
      }
    })
  },
  async handleChangeTodo(id, index) {
    // 状态1 为未完成状态
    await todoServer.todoUpdate(id, {status: 1})
    let todos = this.data.todos
    todos.splice(index, 1)
    this.setData({todos})
  },
  async handleDeletedTodo(id, index){
    await todoServer.todoDeleted(id)
    let todos = this.data.todos
    todos.splice(index, 1)
    this.setData({todos})
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