exports.concat=(metrics,start,end,UnitId)=>
{

var startDate = new Date();
startDate.setTime(start);
console.log("startDate: "+startDate);

var endDate = new Date();
endDate.setTime(end);
console.log("endDate: "+endDate);

    // this function creat string like nex line:
   // `SELECT mean("Oil_P") FROM "ModbusLogger" WHERE time >= now() - 5m GROUP BY time(10s) fill(linear)`
 let  caonc=metrics.map(el => `mean("` + el+`")` + `AS "` +el+`"`).join(", ")

  let result= `SELECT `+ caonc +` FROM "ModbusLogger"  ` +
  `WHERE  ("Id" = '`+UnitId+`') AND time >= '`
//`WHERE time >= '`
 + startDate.toJSON().toString()
 + `' AND time < '`
 + endDate.toJSON().toString()
 //+`now() - 5m `
 +`' GROUP BY time(10m) fill(null)`;
  return  result;
}

exports.concatStateQuery=(OwnerId)=>
{

    // this function creat string like next line:
    // `SELECT * FROM "telegraf"."autogen"."ModbusLogger" where "Id"!='' GROUP BY "Id" ORDER BY DESC LIMIT 1`

  let result=  ` SELECT * FROM "telegraf"."autogen"."ModbusLogger" where "OwnerId"='`+ OwnerId +`' GROUP BY "Id" ORDER BY DESC LIMIT 1`;
  return  result;
}

exports.concatAlarmQuery=(OwnerId)=>
{

    // this function creat string like next line:
    // `SELECT * FROM "telegraf"."autogen"."ModbusLogger" where "Id"!='' GROUP BY "Id" ORDER BY DESC LIMIT 1`

  let result=  ` SELECT * FROM "telegraf"."autogen"."ModbusAlarms" where "OwnerId"='`+ OwnerId +`' GROUP BY "Id" ORDER BY DESC LIMIT 1`;
  return  result;
}