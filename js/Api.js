class Api {
    constructor() {
        this.token = 'jS63ISYpCHRXgO2o03DtTIGsFFyEK54Vw5e4fWhjpqngkazZsMGrrOYwtyTH';
        this.baseUrl = 'http://icpc.mrp130.com/api/';
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

    addEvent(name, roleIds, callback) {
        this.post('event', {
            name: name
        }, (response) => {
            this.post('attendance/add', {
                event_id: response.id,
                role_ids: JSON.stringify(roleIds)
            }, (response) => {
                callback();
            });
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