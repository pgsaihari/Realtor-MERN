import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"http://www.gravatar.com/avatar/?d=mp"
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;