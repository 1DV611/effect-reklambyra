var getDataFor = require('./../ApiData/getDataFor');
var Report = require('../schemas/Report');
var moreThan;
var lessThan;
var reportData;
var obj;

/**
 * Hämtar Report och matchande data
 */
function getReport(userId, startDate) {
  moreThan = new Date(startDate.setDate(startDate.getDate() - 1));
  lessThan = new Date(startDate.setDate(startDate.getDate() + 2));
  return new Promise(function(resolve, reject) {
    return Report.findOne({
      user: userId,
      startDate: { $gt: moreThan, $lt: lessThan }
    }).then(function (report) {
      if (report === null) {
        reject('getReport() - No report found for user ' + userId + ' with startDate between ' + lessThan + ' and ' + moreThan + '.');
      }
      reportData = report;
      return report;
    }).then(function (report) {
      return getDataFor(report);
    }).then(function (apiData) {
      obj = {};

      obj.data = apiData;
      obj.report = reportData;
      resolve(obj);
    }).catch(function(err) { reject(err); });
  });
}

module.exports = getReport;
