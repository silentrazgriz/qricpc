class Api {
    constructor() {
        this.token = 'xMDGc6CU32QFv34UbYkT1dSRh4nhCbcCf0W0fJAZqzI05UD1cGD58rH7VuH5';
        this.baseUrl = 'https://qr-api.ashiwawa.com/api/';
    }

    getAllRoles(callback) {
        this.get('role', (response) => {
            data.roles = response;
            callback();
        });
    }

    getAllEvents(callback) {
        this.get('event', (response) => {
            data.events = response;
            callback();
        });
    }

    getAllParticipants(callback) {
        this.get('participant', (response) => {
            data.participants = response;
            callback();
        });
    }

    getEvent(id, callback) {
        this.get('event/' + id, (response) => {
            callback(response);
        });
    }

    addEvent(name, code, roleIds, callback) {
        this.post('event', {
            name: name,
            code: code
        }, (response) => {
            this.post('attendance/add', {
                event_id: response.id,
                role_ids: roleIds
            }, (response) => {
                callback();
            });
        });
    }

    changeStatus(eventId, code, status, callback) {
        this.post('attendance/change-status', {
            event_id: eventId,
            code: code,
            status: status
        }, (response) => {
            callback(response[0]);
        });
    }

    deleteEvent(id, callback) {
        this.delete(`event/${id}`, (response) => {
            callback();
        });
    }

    get(url, callback) {
        fetch(this.baseUrl + url, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        })
        .then((res) => { return res.json(); })
        .then(callback)
        .catch((err) => { console.error(`Error when get from url: ${err}`); });
    }

    post(url, data, callback) {
        fetch(this.baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => { return res.json(); })
        .then(callback)
        .catch((err) => { console.error(`Error when get from url: ${err}`); });
    }

    delete(url, callback) {
        fetch(this.baseUrl + url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => { return res.json(); })
        .then(callback)
        .catch((err) => { console.error(`Error when get from url: ${err}`); });
    }
}