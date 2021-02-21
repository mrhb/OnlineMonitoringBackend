var moment = require("moment");
const trendsModel = require('../../trends/models/trends.model.js');

const unitModel = require('../../units/models/units.model');




exports.list = (req, res) => {
    
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    
    unitModel.userUnits(req.jwt.ownerId,limit, page)
        .then((result) => {
          var item=  [{
                "GroupId":1,
                "GroupName":"My Units",
                "UnitsInfo":result
                }];
            res.status(200).send(item);
        })

};


exports.getById = (req, res) => {
    unitModel.findById(req.params.unitId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    if (req.body.maintenances) {
        unitModel.patchUnitMaintenances(req.params.id, req.body.maintenances)
        .then((result) => {
            res.status(204).send({});
        });
    }
    else
    res.status(400).send({});

};


exports.unitsStatus = (req, res) => {
    
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    trendsModel.ReadAlarms(req.jwt.ownerId).then(
        (Alarms)=>
    {
trendsModel.ReadStatus(req.jwt.ownerId).then(
        (statuses)=>
        {
            unitModel.userUnits(req.jwt.ownerId,limit, page)
            .then((result) => {

                const merged = result.map(itm => {
                    var matched=statuses.find((item) => (item.Id === itm.id) && item);
                    var matchedAlarms=Alarms.find((item) => (item.Id === itm.id) && item);
                    // return {matched,itm};
                    if(matched && matchedAlarms)
                    {
                        // var start_date = moment(matched.time, 'YYYY-MM-DD HH:mm:ss');
                        // var end_date = moment();
                        var timeStamp=moment(matched.time, 'YYYY-MM-DD HH:mm:ss');
                        var elapsed_string = timeStamp.calendar(); ;
                        var elapsed_minute = moment.duration(moment().diff(timeStamp)).asMinutes();

                        if(elapsed_minute>1)
                        matched.status="NoCon";
                            return{
                                "id":itm.id,
                                "name":itm.name,
                                "state":matched.status,
                                "AlarmList":matchedAlarms.AlarmList,
                                "Genset_kWh":matched.Genset_kWh,
                                "Run_Hours":matched.Run_Hours,
                                "time":matched.time,
                                "elapsed": elapsed_string,
                                "lat":itm.lat,
                                "long":itm.long
                            };
                    }
                        else
                        return{
                            "id":itm.id,
                            "name":itm.name,
                            "state":"NoData",
                            "AlarmList":[],
                            "time":"",
                            "elapsed": "",
                            "lat":itm.lat,
                            "long":itm.long
                        };

                });
                    console.log(merged);
                    res.status(200).send(merged);
                })
            }
        )
    })

};
// exports.getById = (req, res) => {
//     UserModel.findById(req.params.userId)
//         .then((result) => {
//             res.status(200).send(result);
//         });
// };
// exports.patchById = (req, res) => {
//     if (req.body.password) {
//         let salt = crypto.randomBytes(16).toString('base64');
//         let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
//         req.body.password = salt + "$" + hash;
//     }

//     UserModel.patchUser(req.params.userId, req.body)
//         .then((result) => {
//             res.status(204).send({});
//         });

// };

// exports.removeById = (req, res) => {
//     UserModel.removeById(req.params.userId)
//         .then((result)=>{
//             res.status(204).send({});
//         });
// };