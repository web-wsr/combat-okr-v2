// pages/todo/todo.js
import todoServer from '../../models/todo';
import { formatDate } from './../../utils/formatTime';
import { modal } from './../../utils/extendApi';
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    value: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
      status: 1
    })
    this.setData({
      todos: data.todos
    })
  },
  valueInput(event) {
    let value = event.detail.value
    this.setData({
      value
    })
  },
  async handleConfirm(event) {
    let todo = event.detail.value;
    console.log(todo);
    const {
      data
    } = await todoServer.todoAdd({
      todo
    })
    let created_time = formatDate(new Date())
    let id = data.id
    let todos = this.data.todos
    todos.push({
      id,
      todo,
      created_time
    })
    this.setData({
      value: '',
      todos
    })
  },

  handleActionSheet(event) {
    // console.log(event);
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['关联', '完成', '删除'],
      itemColor: "#333",
      success: async (res) => {
        // console.log(res);
        let tapIndex = res.tapIndex
        switch (tapIndex) {
          case 0:
            wx.navigateTo({
              url: `/pages/todo_keyresult/todo_keyresult?id=${id}`
            })
            break;
          case 1:
              this.handleCompeletedTodo(id, index)
            break;
          case 2:
            const resultDeleted = await modal({
              title: '删除',
              content: '是否删除该条 Todo'
            })
            if(resultDeleted){
              this.handleDeletedTodo(id, index)
            }
            break;
        }
      },
      fail(res){
        console.log(res.errMsg);
      }
    })
  },
  async handleCompeletedTodo(id, index){
    // 状态0 为完成状态
    const res = await todoServer.todoUpdate(id, {status: 0})
    const todos = this.data.todos
    todos.splice(index, 1)
    this.setData({todos})
  },

  async handleDeletedTodo(id, index){
    // 删除
    const res = await todoServer.todoDeleted(id)
    const todos= this.data.todos
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