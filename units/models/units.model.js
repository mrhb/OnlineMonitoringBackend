const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;






const unitSchema = new Schema({
  Name: String,
  Ip:String
});

const Unit = mongoose.model('units', unitSchema);
exports.createColor = (unitData) => {
    const unit = new Unit(unitData);
    return unit.save();
};

// unitSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// // Ensure virtual fields are serialised.
// unitSchema.set('toJSON', {
//     virtuals: true
// });

// unitSchema.findById = function (cb) {
//     return this.model('units').find({id: this.id}, cb);
// };



// exports.findByEmail = (email) => {
//     return unit.find({email: email});
// };
// exports.findById = (id) => {
//     return unit.findById(id)
//         .then((result) => {
//             result = result.toJSON();
//             delete result._id;
//             delete result.__v;
//             return result;
//         });
// };

// exports.createunit = (unitData) => {
//     const unit = new unit(unitData);
//     return unit.save();
// };

// exports.list = (perPage, page) => {
//     return new Promise((resolve, reject) => {
//         unit.find()
//             .limit(perPage)
//             .skip(perPage * page)
//             .exec(function (err, units) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(units);
//                 }
//             })
//     });
// };

// exports.patchunit = (id, unitData) => {
//     return unit.findOneAndUpdate({
//         _id: id
//     }, unitData);
// };

// exports.removeById = (unitId) => {
//     return new Promise((resolve, reject) => {
//         unit.deleteMany({_id: unitId}, (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(err);
//             }
//         });
//     });
// };

