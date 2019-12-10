
module.exports = {
  repairZero(num){
    return num < 10 ? ("0"+num):num
  },
  formatMs2Obj(total){
    var hour = this.repairZero(Math.floor(total/3600))
    var minute = this.repairZero(Math.floor((total - hour*3600)/60))
    var second = this.repairZero(Math.floor(total - hour * 3600 - minute*60))
    return{
      hour,
      minute,
      second
    }
  },

}
