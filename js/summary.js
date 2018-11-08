class Summary {
    constructor() {
        this.eventContainer = `<label class="form-check bg-danger text-light" id="event-container-{{id}}" for="event-{{id}}"><input class="form-check-input" type="checkbox" value="{{id}}" id="event-{{id}}"/><label class="form-check-label" for="event-{{id}}">{{name}}</label></label>`;
        this.checkboxElement = $('input[type=checkbox]');
        this.participants = [];
        this.summaries = [];
    }

    reset() {}

    setListener() {
        let self = this;
        this.summaries = [];
        this.removed = [];
        this.keep = [];
        this.renderEventList();
        this.renderAttendances();
    }

    renderAttendances() {
        let self = this;
        let events = this.getActiveEvents();
        this.getSortedParticipants((result) => {
            self.removed = [];
            self.keep = [];
            self.summaries = [
                { label: 'Team', width: 125, values: [] },
                { label: 'Role', width: 125, values: [] },
                { label: 'Participant', width: -1, values: [] }
            ];
            result.forEach((res) => {
                if (res.information.role == 'coach' || res.information.role == 'cocoach') {
                    let role = res.information.role == 'coach' ? 'Coach' : 'Co-Coach';
                    self.summaries[0].values.push({ rowspan: 0, colspan: 2, text: role, c: '' });
                    self.summaries[1].values.push({ rowspan: 0, colspan: -1, text: role, c: '' });
                    self.summaries[2].values.push({ rowspan: 0, colspan: 0, text: res.name, c: '' });
                } else if (res.information.role.indexOf('contestant') != -1) {
                    if (res.information.role == 'contestant1') {
                        self.summaries[0].values.push({ rowspan: 3, colspan: 0, text: res.information.team_name[0], c: '' });
                    } else {
                        self.summaries[0].values.push({ rowspan: -1, colspan: 0, text: '', c: '' });
                    }
                    self.summaries[1].values.push({ rowspan: 0, colspan: 0, text: 'Contestant', c: '' });
                    self.summaries[2].values.push({ rowspan: 0, colspan: 0, text: res.name, c: '' });
                }
            });
            events.forEach((event, i) => {
                api.getEvent(event.id, (response) => {
                    response = response[0];
                    let attTemp = {
                        label: response.information.code,
                        width: 125,
                        values: []
                    };
                    result.forEach((res, index) => {
                        let found = response.attendances.find((attendance) => {
                            return attendance.participant.id == res.id;
                        });
                        if (found == undefined) {
                            if (self.keep.indexOf(index) == -1) {
                                self.removed.push(index);
                            }
                            attTemp.values.push({ rowspan: 0, colspan: 0, text: '', c: 'bg-danger' });
                        } else {
                            self.keep.push(index);
                            if (self.removed.indexOf(index) != -1) {
                                self.removed.splice(self.removed.indexOf(index), 1);
                            }
                            if (found.status == null) {
                                attTemp.values.push({ rowspan: 0, colspan: 0, text: '', c: '' });
                            } else if (found.status == 'ok') {
                                attTemp.values.push({ rowspan: 0, colspan: 0, text: '', c: 'bg-success' });
                            } else {
                                attTemp.values.push({ rowspan: 0, colspan: 0, text: found.status, c: 'bg-warning' });
                            }
                        }
                    });
                    this.summaries.unshift(attTemp);
                });
            });
            self.waitParticipants(events);
        });
    }

    waitParticipants(events) {
        if (this.summaries.length == events.length + 3) {
            for (let i = this.removed.length - 1; i >= 0; i--) {
                this.summaries.forEach((summary) => {
                    summary.values.splice(this.removed[i], 1);
                });
            }
            this.renderParticipantList();
        } else {
            setTimeout(() => {
                this.waitParticipants(events)
            }, 200);
        }
    }

    renderParticipantList() {
        let attTitle = $('#attendance-title');
        let attBody = $('#attendance-body');

        let str = '';
        for (let j = 0; j < this.summaries.length; j++) {
            if (this.summaries[j].width == -1) {
                str += `<th>${this.summaries[j].label}</th>`;
            } else {
                str += `<th width="${this.summaries[j].width}" style="max-width:${this.summaries[j].width}px">${this.summaries[j].label}</th>`;
            }
        }
        attTitle.html(str);
        str = '';
        for(let i = 0; i < this.summaries[0].values.length; i++) {
            str += '<tr>';
            for (let j = 0; j < this.summaries.length; j++) {
                let row = this.summaries[j].values[i];
                if (row.colspan != -1) {
                    if (row.rowspan == 0) {
                        if (row.colspan > 0) {
                            str += `<td class="${row.c}" colspan="${row.colspan}">${row.text}</td>`;
                        } else {
                            str += `<td class="${row.c}">${row.text}</td>`;
                        }
                    } else if (row.rowspan > 0) {
                        str += `<td class="${row.c}" rowspan="${row.rowspan}">${row.text}</td>`;
                    }
                }
            }
            str += '</tr>';
        }
        attBody.html(str);
    }

    unique(arr) {
        return arr.filter((item, index) => {
            return arr.indexOf(item) == index;
        });
    }

    renderEventList() {
        let self = this;
        api.getAllEvents(() => {
            data.events.forEach((val) => {
                let element = this.eventContainer.split('{{id}}').join(val.id)
                    .split('{{name}}').join(val.name);
                $('#event-list').append(element);
            });

            $('#event-list .form-check-input').change(function (e) {
                let id = $(this).val();
                if ($(this).is(':checked')) {
                    $(`#event-container-${id}`).removeClass('bg-danger')
                        .addClass('bg-success');
                } else {
                    $(`#event-container-${id}`).addClass('bg-danger')
                        .removeClass('bg-success');
                }
                self.renderAttendances();
            });
        });
    }

    getSortedParticipants(callback) {
        api.getAllParticipants(() => {
            // get all coach
            let teams = [];
            let coaches = data.participants.filter((participant) => {
                return participant.information.role == 'coach';
            });
            let cocoaches = data.participants.filter((participant) => {
                return participant.information.role == 'cocoach';
            });
            let contestants = data.participants.filter((participant) => {
                let roles = ['contestant1', 'contestant2', 'contestant3'];
                return roles.indexOf(participant.information.role) != -1;
            });
            coaches.forEach((coach) => {
                teams.push(coach);
                cocoaches.forEach((cocoach) => {
                    if (coach.information.team_name.indexOf(cocoach.information.team_name[0]) != -1) {
                        teams.push(cocoach);
                    }
                });
                coach.information.team_name.forEach((team) => {
                    contestants.forEach((contestant) => {
                        if (team == contestant.information.team_name[0]) {
                            teams.push(contestant);
                        }
                    });
                });
            });
            callback(teams);
        });
    }

    getActiveEvents() {
        let result = [];
        $('.form-check-input').each((key, item) => {
            if (item.checked) {
                result.push(data.events.find((event) => {
                    return event.id == item.value;
                }));
            }
        });
        return result;
    }
}