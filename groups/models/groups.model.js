const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  groupType:{
    type: String,
    enum: ['site','wecControl','basic']
    }
});


const Group = mongoose.model('groups', groupSchema);
exports.create = (data) => {
    const group = new Group(data);
    return group.save();
};

groupSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
groupSchema.set('toJSON', {
    virtuals: true
});

groupSchema.findById = function (cb) {
    return this.model('groups').find({id: this.id}, cb);
};


exports.findById = (id) => {
    return Group.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.create = (data) => {
    const group = new Group(data);
    return group.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
      Group.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, objects) {
                if (err) {
                    reject(err);
                } else {
                    resolve(objects);
                }
            })
    });
};

exports.patchById = (id, data) => {
    return Group.findOneAndUpdate({
        _id: id
    }, data);
};

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Group.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

