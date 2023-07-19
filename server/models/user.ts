import mongoose from "mongoose";

const Event = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
    },
    Date:{
        type: Date,
        required: true
    },
    Notes:{
        type: String,
        required: false
    },
    Location:{
        type: String,
        required: false
    }
})

const User = new mongoose.Schema({

    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Events:{
        type: [Event],
        required: false
    },
    Shared:{
        type: [String],
        required: false
    }

})

export default mongoose.model('User', User);

