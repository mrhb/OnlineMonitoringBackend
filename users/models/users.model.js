const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);


exports.findByEmail = (email) => {
    return User.find({email: email});
};
exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};


  const mockusers = [
    {id:1,unitCount: 1, name: 'M.Reza'     ,email:'mmhajjar82@gmail.com' ,loginId:'mrhb',    lang:'En',conn:1,reportsM:true,reportsW:true,api:true,isadmin:true },
    {id:2,unitCount: 2, name: 'Hajjar.B'  ,email:'sdf_435@hotmail.com'  ,loginId:'masdfrhb',lang:'En',conn:1,reportsM:false,reportsW:false,api:true,isadmin:false},
    {id:3,unitCount: 3, name: 'mrhb' ,email:'dfsced_def@yahoo.com' ,loginId:'mdfrhb',  lang:'En',conn:1,reportsM:true,reportsW:true,api:true,isadmin:false},      
  ];

// exports.list = (perPage, page) => {
//     return new Promise((resolve, reject) => {
//         User.find()
//             .limit(perPage)
//             .skip(perPage * page)
//             .exec(function (err, users) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(mockusers);
//                 }
//             })
//     });
// };


exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

