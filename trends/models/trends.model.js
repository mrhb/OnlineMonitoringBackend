// const mongoose = require('../../common/services/mongoose.service').mongoose;
const InfluxDb = require('../../common/services/InfluxDb.service').MonitoringDb;
const concat= require('./QueryBuilder');
exports.ReadTrends = (seriesInfo) =>{
  var metrics= new Array(seriesInfo.metricsInfo.length);
  var unitId=seriesInfo.metricsInfo[0].Unit.id;

  for (i in seriesInfo.metricsInfo) {
    metrics[i]= seriesInfo.metricsInfo[i].Measurment;
  }

  return  InfluxDb
    .query(
      concat.concat(metrics,seriesInfo.startDate,seriesInfo.endDate,unitId)
      // `SELECT mean("Oil_P") FROM "ModbusLogger" WHERE time >= now() - 5m GROUP BY time(10s) fill(linear)`
    );   
  };
  

  exports.ReadStatus= () =>{
   
    return  InfluxDb
      .query(
        `SELECT * FROM "telegraf"."autogen"."ModbusLogger" where "Id"!='' GROUP BY "Id" ORDER BY DESC LIMIT 1`
        );   
      };
      // `SELECT * FROM "ModbusLogger" GROUP BY "Id" ORDER BY DESC LIMIT 1`

