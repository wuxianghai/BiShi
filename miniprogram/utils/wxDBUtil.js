// 根据ID查询数据
function dbGetById(dbName, id, doSuccess) {
  wx.showLoading()
  const db = wx.cloud.database()
  //进行请求
  db.collection(dbName).doc(id).get({
    success: function(res) {
      if (typeof doSuccess == "function") {
        doSuccess(res);
      }
    }
  })
  //关闭loading框
  wx.hideLoading()
};
// 根据条件查询数据
function dbGetMany(dbName, dbData, doSuccess) {
  wx.showLoading()
  const db = wx.cloud.database()
  //进行请求
  db.collection(dbName).where(dbData)
  .get({
    success: function(res) {
      if (typeof doSuccess == "function") {
        doSuccess(res.data);
      }
    }
  })
  //关闭loading框
  wx.hideLoading()
};
// 新增数据
function dbAdd(dbName, dbData, doSuccess) {
  wx.showLoading()
  const db = wx.cloud.database()
  //进行请求
  db.collection(dbName).add({
    // data 字段表示需新增的 JSON 数据
    data: data,
    success: function(res) {
      if (typeof doSuccess == "function") {
        doSuccess(res);
      }
    }
  })
  //关闭loading框
  wx.hideLoading()
};
// 根据ID更新数据
function dbUpdate(dbName, id, data, doSuccess) {
  wx.showLoading()
  const db = wx.cloud.database()
  //进行请求
  db.collection(dbName).doc(id).update({
    // data 字段表示需更新的 JSON 数据
    data: data,
    success: function(res) {
      if (typeof doSuccess == "function") {
        doSuccess(res);
      }
    }
  })
  //关闭loading框
  wx.hideLoading()
};

module.exports = {
  dbGetById: dbGetById,
  dbGetMany: dbGetMany,
  dbAdd: dbAdd,
  dbUpdate: dbUpdate
}