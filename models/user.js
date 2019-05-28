const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const position = require("./../models/position")

let JobSchema = new Schema({
    type: String,
    company: String,
    companyUrl: String
});

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job: [JobSchema],
    // location: {
    //     'type': {
    //         type: String,
    //         enum: "Point",
    //         default: "Point",
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         default: []
    //     }
    // },
    friends: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastUpdated: Date
});

UserSchema.pre("save", function (next) {
    this.password = "Has me!! " + this.password
    next();
})

UserSchema.pre("update", function (next) {
    this.update({}, {
        $set: {
            lastUpdated: Date.now()
        }
    });
    next();
})

let User = mongoose.model("User", UserSchema);

module.exports = User