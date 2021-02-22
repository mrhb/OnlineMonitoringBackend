const mongoose = require('../../common/services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const unitSchema = new Schema({
  name: String,
  userId:{type: Schema.Types.ObjectId, ref: 'Users'},//ownerId
  address:String,
  ip:String,
  port:Number,
  lat:Number,
  long:Number,
  state:Boolean,
  deviceType:{
    type: String,
    enum: ['mint','amf25','teta']
    },
  groups: String,
  customer: String,
  gate:String,
  disable:Boolean,
  comm:Boolean,
  maintenances: [{
        name: { type: String, required: true, max: 100 },
        criteria:{
            type: String,
            enum: ['day','runHour']
        },
        duration:Number,
        runHour:Number,
        date:Date
    }],
});


  

unitSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

var Unit = mongoose.model('units', unitSchema);
exports.createUnit = (unitData) => {
    const unit = new Unit(unitData);
    return unit.save();
};

unitSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
unitSchema.set('toJSON', {
    virtuals: true
});

unitSchema.findById = function (cb) {
    return this.model('units').find({id: this.id}, cb);
};


exports.findById = (id) => {
    return Unit.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createunit = (unitData) => {
    const unit = new Unit(unitData);
    return unit.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
      Unit.find()
       .populate('userId')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, units) {
                if (err) {
                    reject(err);
                } else {
                    resolve(units);
                }
            })
    });
};



exports.userUnits = (userId,perPage, page) => {
    return new Promise((resolve, reject) => {
      Unit.find({userId:userId})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, units) {
                if (err) {
                    reject(err);
                } else {
                    resolve(units);
                }
            })
    });
};

exports.patchunit = (id, unitData) => {
    return Unit.findOneAndUpdate({
        _id: id
    }, unitData);
};

exports.patchUnitMaintenances = (id, maintenancesInfo) => {
    return Unit.findOneAndUpdate({
        _id: id
    }, { maintenances: maintenancesInfo },{upsert:true});
};

exports.removeById = (unitId) => {
    return new Promise((resolve, reject) => {
        Unit.deleteMany({_id: unitId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

