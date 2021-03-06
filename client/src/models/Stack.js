import axios from 'axios';

class Stack {
    constructor() {
        this.data = [];
        this.size = 0;
    }

    getData() {
        return axios({
            method: 'GET',
            url: 'https://stack-js.herokuapp.com/stack'
        }).then(result => {
            this.data = result.data.data;
            this.size = result.data.size;
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    push(value) {
        return axios({
            method: 'POST',
            url: 'https://stack-js.herokuapp.com/stack/push',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                el: value
            }
        }).then(result => {
            this.data = result.data.data;
            this.size = result.data.size;
        }).catch(err => {
            if (err.response) {
                return Promise.reject(err.response.data.message || 'Oops! An error occured!');
            } else {
                Promise.reject('Oops! An error occured!');
            }
        });
    }

    pop() {
        return axios({
            method: 'GET',
            url: 'https://stack-js.herokuapp.com/stack/pop'
        }).then(result => {
            this.data = result.data.data;
            this.size = result.data.size;
        }).catch(err => {
            if (err.response) {
                return Promise.reject(err.response.data.message || 'Oops! An error occured!');
            } else {
                Promise.reject('Oops! An error occured!');
            }
        });
    }

    changeSize(newSize) {
        return axios({
            method: 'POST',
            url: 'https://stack-js.herokuapp.com/stack/size',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                size: newSize
            }
        }).then(result => {
            this.data = result.data.data;
            this.size = result.data.size;
        }).catch(err => {
            if (err.response) {
                return Promise.reject(err.response.data.message || 'Oops! An error occured!');
            } else {
                Promise.reject('Oops! An error occured!');
            }
        });
    }
}

export default Stack;