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
    userId : {
        type: mongoose.Types.ObjectId,
        ref : 'User',
        require : true
    },
});

const SharedContentSchema = new Schema({
  contentId: { type: mongoose.Types.ObjectId, ref: 'Content', required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  shareId: { type: String, unique: true, required: true }, 
  createdAt: { type: Date, default: Date.now },
});



export const UserModel = model('User', UserSchema);
export const ContentModel = model('Content', ContentSchema);
export const SharedContentModel = model('Links',SharedContentSchema);


