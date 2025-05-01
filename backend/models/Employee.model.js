const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Username must be atleast 3 Characters Long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'Password must be atleast 5 Characters Long']
    },
    assignedTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
    }],
    newTask: {
        type: Number,
        default: 0
    },
    completed: {
        type: Number,
        default: 0
    }
    ,
    failed: {
        type: Number,
        default: 0
    }
})

const employee = mongoose.model('employee', employeeSchema);
module.exports = employee