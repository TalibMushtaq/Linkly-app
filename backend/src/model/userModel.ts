import  mongoose, {model , Schema} from 'mongoose'


const UserSchema = new Schema ({
    username: {type: String, unique : true, require : true},
    fullname: {type: String , require : true },
    password : {type: String, require : true},
    email : {type : String, unique : true, require : true},
    isActive : { type : Boolean, default : true}
},{
    timestamps : true
});


const ContentSchema  = new Schema ({
    title : String,
    Link : String,
    tags : [{type: mongoose.Types.ObjectId,ref:'tag'}],
    userId : [{
        type: mongoose.Types.ObjectId,
        ref : 'User',
        require : true
    }],
});

const LinkSchema = new Schema ({
    hash: String,
    userId : { type: mongoose.Types.ObjectId, ref : 'User', require : true, unique : true},

});



export const UserModel = model('User', UserSchema);
export const ContentModel = model('Content', ContentSchema);
export const LinkModel = model('Links',LinkSchema);


