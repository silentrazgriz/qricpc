class Summary {
    constructor() {
        this.eventContainer = `<label class="form-check bg-danger text-light" id="event-container-{{id}}" for="event-{{id}}"><input class="form-check-input" type="checkbox" value="{{id}}" id="event-{{id}}"/><label class="form-check-label" for="event-{{id}}">{{name}}</label></label>`;
    }

    setListener() {
        this.renderEventList();

        $('input[type=checkbox]').click((e) => {
            let id = $(this).val();
            if ($(this).is(':checked')) {
                $(`#event-container-${id}`).addClass('bg-success')
                    .removeClass('bg-danger');
            } else {
                $(`#event-container-${id}`).removeClass('bg-success')
                    .addClass('bg-danger');
            }
            this.renderAttendances();
        });
    }
    
    renderAttendances() {
        let events = getActiveEvents();
        let attendances = [];
        let participants = [];

        let attTitle = $('#attendance-title');
        let attBody = $('#attendance-body');
        attTitle.html('');
        attBody.html('');
        events.forEach((event) => {
            attTitle.append(`<th>${event.name}</th>`);
            attendances = attendances.concat(data.attendances.filter(item => item.event_id == event.id));
        });
        attTitle.append(`<th>Participants</th>`);

        attendances = unique(attendances);
        participants = findParticipants(attendances);

        participants.forEach((participant) => {
            let str = '<tr>';
            events.forEach((event) => {
                let data = attendances.find((attendance) => {
                    return attendance.event_id == event.id && attendance.participant_id == participant.id;
                });
                if (data == undefined || data.status == null) {
                    str += `<td></td>`;
                } else if (data.status == 'OK') {
                    str += `<td class="bg-success text-white">OK</td>`;
                } else {
                    str += `<td class="bg-warning text-white">${data.status}</td>`;
                }
            });
            str += `<td>${participant.team[0]} - ${participant.name}</td>`;
            str += `</tr>`;
            attBody.append(str);
        });
    }

    findParticipants(attendances) {
        let result = [];
        data.participants.forEach((participant) => {
            let p = attendances.find((attendance) => {
                return attendance.participant_id == participant.id;
            });
            if (p !== undefined) {
                result.push(participant);
            }
        });
        return unique(result);
    }

    unique(arr) {
        return arr.filter((item, index) => {
            return arr.indexOf(item) == index;
        });
    }

    renderEventList() {
        data.events.forEach((val) => {
            let element = this.eventContainer.split('{{id}}').join(val.id)
                .split('{{name}}').join(val.name);
            $('#event-list').append(element);
        });
    }

    getActiveEvents() {
        let result = [];
        $('input[type=checkbox]').each((key, item) => {
            if (item.checked) {
                result.push(data.events.find((event) => {
                    return event.id == item.value;
                }));
            }
        });
        return result;
    }
}