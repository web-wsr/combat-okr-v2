// pages/okr_detail/okr_detail.js
import okrServer from '../../models/okr';
import objectiveServer from '../../models/objective';
import keyresultServer from '../../models/keyresult'
import { formatDate } from '../../utils/formatTime';
import { modal, toast } from './../../utils/extendApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    okr:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let id = options.id
    const { data } = await okrServer.okrShow(id)
    this.setData({ okr: data.okr, id})
  },
  async handleObjectiveActionSheet(event){
    // console.log(event);
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    let status = event.currentTarget.dataset.status
    let statusChange = status ? 0 : 1
    let statusChangeDisplay = statusChange ? '标记未完成' : '标记已完成'
    wx.showActionSheet({
      itemList: [statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: async (res) => {
        let tapIndex = res.tapIndex
        switch(tapIndex){
          case 0:
            this.handleChangeObjective(id, index, statusChange)
            break;
          case 1:
            const resultDeleted =  await modal({
              title: '删除',
              content: '是否要删除该条 目标(OKR) ',
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
    let completed_time = status ?  null : formatDate(new Date())
    let okr = this.data.okr
    okr.status = status
    okr.completed_time = completed_time
    this.setData({ okr })
  },

  async handleDeletedObjective(id, index){
    await objectiveServer.objectiveDeleted(id)
    toast({
      title: '删除成功',
      icon: 'success',
      mask: true,
      duration: 1000
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/okr/okr',
      })
    },1000)
  },


  async handleKeyresultActionSheet(event){
    // console.log(event);
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    let status = event.currentTarget.dataset.status
    let statusChange = status ? 0 : 1
    let statusChangeDisplay = statusChange ? '标记未完成' : '标记已完成'
    wx.showActionSheet({
      itemList: [statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: async (res) => {
        let tapIndex = res.tapIndex
        switch(tapIndex){
          case 0:
            await keyresultServer.keyresultUpdate(id, { status: statusChange})
            let okr = this.data.okr
            console.log(okr);
            okr.keyresults[index].status = statusChange
            this.setData({ okr })
            break;
          case 1:
            const resultDeleted =  await modal({
              title: '删除',
              content: '是否要删除该条 成果(KR)  ',
            })
            if(resultDeleted){
              await keyresultServer.keyresultDeleted(id)
              let okr = this.data.okr
              okr.keyresults.splice(index ,1)
              this.setData({ okr })
            }
            break;
        }
      },
      fail(res){
        console.log(res.errMsg);
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