'use strict';

export default class Post {
    constructor(title) {
        this.title = title;
        this.date = new Date();
    }

    toString() {
        return JSON.stringify({
            title: this.title,
            // date: this.date.toJSON()
            date: this.date // можно и так
        });
    }
};
