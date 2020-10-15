exports.concat=(fields)=>
{
    // this function creat string like nex line:
   // `SELECT mean("Oil_P") FROM "ModbusLogger" WHERE time >= now() - 5m GROUP BY time(10s) fill(linear)`
 let  caonc=fields.map(el => `mean("` + el+`")` + `AS "` +el+`"`).join(", ")
 let result= `SELECT `+ caonc +` FROM "ModbusLogger" WHERE time >= now() - 5m GROUP BY time(10s) fill(linear)`;
  return  result;
}