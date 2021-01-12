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
    
    unitModel.list(limit, page)
        .then((result) => {
          var item=  [{
                "GroupId":1,
                "GroupName":"CharmShahr",
                "UnitsInfo":result
                }];
            res.status(200).send(item);
        })

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
    
trendsModel.ReadStatus(req.jwt.ownerId).then(
        (statuses)=>
        {
            unitModel.userUnits(req.jwt.userId,limit, page)
            .then((result) => {

                const merged = result.map(itm => {
                    var matched=statuses.find((item) => (item.Id === itm.id) && item);

                    
                    // return {matched,itm};
                    if(matched)
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
                                "redAlarm":matched.redAlarm,
                                "yellowAlarm":matched.yellowAlarm,
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
                            "redAlarm":false,
                            "yellowAlarm":false,
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