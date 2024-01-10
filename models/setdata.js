import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const setDataSchema = new Schema({
    set_num: String,
    name: String,
    year: String,
    theme_id: String,
    num_parts: String,
    img_url: String
}, { collection : 'setdata' });
const setdata = mongoose.models.setdata || model('setdata', setDataSchema);

export default setdata;
