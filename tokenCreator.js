'use strict'

const token = () => {
    return Math.random().toString(36).substr(2);
};

module.exports = token;