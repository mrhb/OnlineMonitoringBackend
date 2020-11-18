const path = require('path');
const fs = require('fs');

const getJsonData = function (basePathToData, filename) {
  var filename = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};
exports.getData =(req, res) => {
 // req.body
  var data = getJsonData(__dirname, 'mockData.json');
  var i;
for (i = 0; i < data.length; i++) {
  data[i].Oil_P=data[i].Oil_P*Math.random();  
  data[i].Water_T=data[i].Oil_P*Math.random();  

}
    return res.send(data);
  };