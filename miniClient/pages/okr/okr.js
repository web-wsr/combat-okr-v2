// pages/okr/okr.js
import objectiveServer from '../../models/objective';
import okrServer from '../../models/okr'
import { modal } from './../../utils/extendApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectives: []
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
    const { data } = await okrServer.okrList()
    this.setData({
      objectives : data.objectives
    })
  },
  async handleActionSheet(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    let status = event.currentTarget.dataset.status
    let statusChange = status ? 0 : 1
    let statusChangeDisplay = statusChange ? '标记未完成' : '标记已完成'
    wx.showActionSheet({
      itemList: ['查看','编辑', statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: async (res) => {
        let tapIndex = res.tapIndex
        switch(tapIndex){
          case 0:
            wx.navigateTo({
              url: `/pages/okr_detail/okr_detail?id=${id}`
            })
            break;
          case 1:
            wx.navigateTo({
              url: `/pages/okr_edit/okr_edit?id=${id}`,
            })
            break;
          case 2:
            this.handleChangeObjective(id, index, statusChange)
            break;
          case 3:
           const resultDeleted =  await modal({
              title: '删除',
              content: '是否要删除该条 OKR ',
            })
            if(resultDeleted){
              this.handleDeletedObjective(id, index)
            }
            break;
        }
      },
      fail(res){
        console.log(res.errMsg);
      }
    })
  },
  async handleChangeObjective(id, index, status){
    await objectiveServer.objdectiveUpdate(id, {status})
    let objectives = this.data.objectives
    objectives[index].status = status
    this.setData({ objectives })
    this.onShow()
  },

  async handleDeletedObjective(id, index){
    await objectiveServer.objectiveDeleted(id)
    let objectives = this.data.objectives
    objectives.splice(index, 1)
    this.setData({objectives})
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