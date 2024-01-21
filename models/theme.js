import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const themeDataSchema = new Schema({
    id: String,
    name: String
}, { collection : 'themedata' });
const themedata = mongoose.models.themedata || model('themedata', themeDataSchema);

export default themedata;
