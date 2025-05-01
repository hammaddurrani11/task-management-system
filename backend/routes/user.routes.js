const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const AdminModel = require('../models/Admin.model');
const EmployeeModel = require('../models/Employee.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/FetchUser');
const taskModel = require('../models/Task.model');

router.post('/register/admin',
    body('username').trim().isLength({ min: 3 }),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 })
    , async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()
            })
        }

        const { username, email, password } = req.body

        const existingUser = await AdminModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: 'Email Already Exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await AdminModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.json(user)
    })

router.post('/login',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.status(400).json({
                    error: error.array()
                })
            }

            const { email, password } = req.body

            let user = await AdminModel.findOne({ email: email });

            if (!user) {
                user = await EmployeeModel.findOne({ email: email });
                if (user) user.role = 'employee';
            }
            else {
                user.role = 'admin'
            }

            if (!user) {
                return res.status(400).json({
                    error: 'Incorrect Email or Password'
                })
            }

            const userPassword = await bcrypt.compare(password, user.password);

            if (!userPassword) {
                return res.status(400).json({
                    error: 'Email or Password is Incorrect'
                })
            }

            const token = jwt.sign({
                userid: user._id,
                username: user.username,
                role: user.role
            }, process.env.JWT_SECRET
            )

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            res.json({
                message: 'Logged In Successfully',
                role: user.role,
                token: token
            })
        }
        catch (err) {
            return res.status(500).json({
                error: "Internal Server Error"
            })
        }
    }
)

router.get('/auth/check', authMiddleware, (req, res) => {
    const { userid, username, role } = req.user;
    res.json({
        authenticated: true,
        user: {
            userid,
            username,
            role
        }
    });
});

router.post('/register/employee', authMiddleware,
    body('username').trim().isLength({ min: 3 }),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 })
    , async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array()
            })
        }

        const { username, email, password } = req.body;

        const oldUser = await EmployeeModel.findOne({ email: email });

        if (oldUser) {
            return res.status(400).json({
                error: 'Email Already Registered'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await EmployeeModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.send(user);
    })

router.post('/createtask', authMiddleware, async (req, res) => {
    try {
        const { taskTitle, taskDate, taskAssign, taskCategory, taskDescription } = req.body

        const employee = await EmployeeModel.findOne({ username: taskAssign });

        if (!employee) {
            return res.send(400).json({
                error: 'Employee not Found'
            })
        }

        const newTask = await taskModel.create({
            taskTitle: taskTitle,
            taskDate: taskDate,
            taskAssign: taskAssign,
            taskCategory: taskCategory,
            taskDescription: taskDescription,
            taskNumber: [{
                newTask: 1,
                failed: 0,
                completed: 0
            }],
            user: employee._id
        })

        console.log('Employee Before Save:', employee);

        employee.assignedTasks.push(newTask._id);

        employee.newTask = (employee.newTask || 0) + 1;

        await employee.save();

        console.log('Employee updated successfully');

        res.status(200).json({
            message: 'Task Created and assigned successfully',
            task: newTask
        })
    }
    catch (err) {
        return res.status(500).json({
            error: 'Server error while creating task'
        })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    })
    res.json({ message: 'Logged Out' })
})

router.get('/fetch-employees', async (req, res) => {
    try {
        const data = await EmployeeModel.find().populate('assignedTasks');
        res.status(200).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: 'Server Error'
        })
    }
})

router.get('/fetch-loggedin-user', authMiddleware, async (req, res) => {
    try {
        const data = await EmployeeModel.findById(req.user.userid).populate('assignedTasks');
        console.log(req.user.userid);

        if (!data) {
            return res.status(400).json({
                error: 'User Not Found'
            })
        }

        res.json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: err
        })
    }
})

module.exports = router