const path = require('path');
const fs = require('fs');


const getJsonData = function (basePathToData, filename) {
  var filename = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};
exports.getData =(req, res) => {
  var data = getJsonData(__dirname, 'mockData.json');
 
    return res.send(data);
 
};