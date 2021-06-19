const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        reg: 'User'
    },
    make : {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: Number
    },
    type: {
        type: String
    },
    monthlyprice: {
        type: Number
    },
    weeklyprice: {
        type: Number
    },
    image: [{
        imageUrl: {
            type: String
        }
    }],
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    coords: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    logo: {
        type: String
    },
    wallet:{
        type: Number
    }
});
module.exports = mongoose.model('Car',carSchema);