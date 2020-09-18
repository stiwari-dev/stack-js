const fs = require('fs');

const { createError } = require('../utils');

exports.getStack = (req, res, next) => {
    fs.readFile('stack-data.json', 'utf-8', (err, data) => {
        res.status(200).json(JSON.parse(data));
    });
};

exports.push = (req, res, next) => {
    let stackData = [];
    fs.readFile('stack-data.json', 'utf-8', (err, data) => {
        stackData = JSON.parse(data);
        if (stackData.data.length >= stackData.size) {
            next(createError(400, 'Stack size exceeded!'));
        } else {
            stackData.data.push(Number(req.body.el));
            fs.writeFile('stack-data.json', JSON.stringify(stackData), err => {
                if (err) {
                    next(createError(500, err.message));
                } else {
                    res.status(200).json(stackData);
                }
            });
        }
    });
};

exports.pop = (req, res, next) => {
    let stackData = [];
    fs.readFile('stack-data.json', 'utf-8', (err, data) => {
        if (err) {
            next(createError(500, err.message));
        }
        stackData = JSON.parse(data);
        if (stackData.data.length === 0) {
            next(createError(400, 'Stack is empty!'));
        } else {
            stackData.data.pop();
            fs.writeFile('stack-data.json', JSON.stringify(stackData), err => {
                if (err) {
                    next(createError(500, err.message));
                }
                res.status(200).json(stackData);
            });
        }
    });
};

exports.changeSize = (req, res, next) => {
    let stackData = [];
    fs.readFile('stack-data.json', 'utf-8', (err, data) => {
        if (err) {
            next(createError(500, err.message));
        }
        stackData = JSON.parse(data);
        stackData.size = req.body.size;
        if (stackData.data.length >= stackData.size) {
            stackData.data.length = stackData.size;
        }
        fs.writeFile('stack-data.json', JSON.stringify(stackData), err => {
            if (err) {
                next(createError(500, err.message));
            }
            res.status(200).json(stackData);
        });
    });
};