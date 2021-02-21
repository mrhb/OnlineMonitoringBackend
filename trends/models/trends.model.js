// const mongoose = require('../../common/services/mongoose.service').mongoose;
const InfluxDb = require('../../common/services/InfluxDb.service').MonitoringDb;
const concat= require('./QueryBuilder');
exports.ReadTrends = (seriesInfo) =>{
  var metrics= new Array(seriesInfo.metricsInfo.length);
  var unitId=seriesInfo.metricsInfo[0].Unit.id;

  for (i in seriesInfo.metricsInfo) {
    metrics[i]= seriesInfo.metricsInfo[i].metricName;
  }

  return  InfluxDb
    .query(
      concat.concat(metrics,seriesInfo.startDate,seriesInfo.endDate,unitId)
      // `SELECT mean("Oil_P") FROM "ModbusLogger" WHERE time >= now() - 5m GROUP BY time(10s) fill(linear)`
    );   
  };
  

  exports.ReadStatusByOwnerId= (OwnerId) =>{
   
    return  InfluxDb
      .query(
        concat.concatStateQuery(OwnerId)//test: "5ff944ba580f463494acb57b"
        );   
      };
   exports.ReadAlarms= (OwnerId) =>{
   
    return  InfluxDb
      .query(
        concat.concatAlarmQuery(OwnerId)//test: "5ff944ba580f463494acb57b"
        );   
      };

