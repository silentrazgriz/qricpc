class Event {
    constructor() {
        this.roleContainer = `<label class="form-check bg-danger text-light" id="role-container-{{id}}" for="role-{{id}}"><input class="form-check-input" type="checkbox" value="{{id}}" id="role-{{id}}"/><label class="form-check-label" for="role-{{id}}">{{name}}</label></label>`;
        this.eventRow = `<tr><td>{{name}}</td><td>{{roles}}</td><td><button class="btn btn-danger event-remove" data-id="{{id}}">Remove</button></td></tr>`;
    }

    setListener() {
        let self = this;
        this.renderRoleList();
        this.renderEventIndex();

        $('#role-list .form-check-input').click(function (e) {
            let id = $(this).val();
            if ($(this).is(':checked')) {
                $(`#role-container-${id}`).removeClass('bg-danger')
                    .addClass('bg-success');
            } else {
                $(`#role-container-${id}`).addClass('bg-danger')
                    .removeClass('bg-success');
            }
        });

        $('#add-event').click(function (e) {
            e.preventDefault();
            let name = $('#name').val();
            let roleIds = [];
            $('#role-list .form-check-input').each((key, val) => {
                if (val.checked) {
                    roleIds.push(parseInt(val.value));
                }
            });
            api.addEvent(name, roleIds, () => {
                self.renderEventIndex();
            });
        });
    }

    renderEventIndex() {
        $('#event-index').html('');
        api.getAllEvents(() => {
            data.events.forEach((val) => {
                let roles = [];
                if (val.role_ids !== undefined) {
                    if (typeof val.role_ids == 'string') {
                        val.role_ids = JSON.parse(JSON.parse(val.role_ids));
                    }
                    val.role_ids.forEach((role_id) => {
                        let role = data.roles.find((v) => {
                            return v.id == role_id;
                        });
                        roles.push(role.name);
                    });
                }
                let element = this.eventRow.split('{{id}}').join(val.id)
                    .split('{{name}}').join(val.name)
                    .split('{{roles}}').join(roles.join(', '));
                $('#event-index').append(element);
            });

            $('.event-remove').click(function (e) {
                let id = $(this).data('id');
                api.deleteEvent(id, () => {
                    self.renderEventIndex();
                });
            });
        });
    }

    renderRoleList() {
        $('#role-list').html('');
        data.roles.forEach((val) => {
            let element = this.roleContainer.split('{{id}}').join(val.id)
                .split('{{name}}').join(val.name);
            $('#role-list').append(element);
        });
    }
}