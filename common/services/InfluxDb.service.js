const Influx = require("influx");
const express = require("express");

/**
 * Create a new Influx client. We tell it to use the
 * `express_response_db` database by default, and give
 * it some information about the schema we're writing.
 */
const MonitoringDb = new Influx.InfluxDB({
  host: "localhost",
  database: "telegraf",
  // schema: [
  //   {
  //     measurement: "ModbusLogger",
  //     // fields: {
  //     //   path: Influx.FieldType.STRING,
  //     //   duration: Influx.FieldType.INTEGER,
  //     // },
  //     // tags: ["Test1"],
  //   },
  // ],
});


MonitoringDb
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes("telegraf")) {
      return MonitoringDb.createDatabase("telegraf");
    }
  })
 
  .catch((err) => {
    console.error(`Error creating Influx database!`);
  });


  const connectWithRetry = () => {
    console.log('InfluxDb connection with retry')
    MonitoringDb
    .getDatabaseNames()
    .then((names) => {
        if (!names.includes("telegraf")) {
            MonitoringDb.createDatabase("telegraf");
            console.log('InfluxDb is Created,connected');
            return MonitoringDb;
        }
        console.log('InfluxDb exist,connected');
    }).catch(err=>{
        console.log('Error creating Influx database!, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.MonitoringDb = MonitoringDb;

