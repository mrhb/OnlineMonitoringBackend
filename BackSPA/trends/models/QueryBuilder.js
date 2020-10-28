exports.concat=(metrics,start,end)=>
{

var startDate = new Date();
startDate.setTime(start);

var endDate = new Date();
endDate.setTime(end);

    // this function creat string like nex line:
   // `SELECT mean("Oil_P") FROM "ModbusLogger" WHERE time >= now() - 5m GROUP BY time(10s) fill(linear)`
 let  caonc=metrics.map(el => `mean("` + el+`")` + `AS "` +el+`"`).join(", ")

  let result= `SELECT `+ caonc +` FROM "ModbusLogger"  ` +
 `WHERE time >= '`
 + startDate.toJSON().toString()
 + `' AND time < '`
 + endDate.toJSON().toString()
 //+`now() - 5m `
 +`' GROUP BY time(10m) fill(linear)`;
  return  result;
}