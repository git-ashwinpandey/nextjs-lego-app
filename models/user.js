import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
}, { collection : 'users' });
const userdata = mongoose.models.users || model('users', userSchema);

export default userdata;
