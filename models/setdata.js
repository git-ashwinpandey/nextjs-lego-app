import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const themeSchema = new Schema({
    id: String,
    name: String
});

const setDataSchema = new Schema({
    set_num: String,
    name: String,
    year: String,
    num_parts: String,
    img_url: String,
    theme: themeSchema,
}, { collection : 'setdata' });
const setdata = mongoose.models.setdata || model('setdata', setDataSchema);

export default setdata;
