class Event {
    constructor() {
        this.roleContainer = `<label class="form-check bg-danger text-light" id="role-container-{{id}}" for="role-{{id}}"><input class="form-check-input" type="checkbox" value="{{id}}" id="role-{{id}}"/><label class="form-check-label" for="role-{{id}}">{{name}}</label></label>`;
        this.eventRow = `<tr><td>{{code}}</td><td>{{name}}</td><td>{{roles}}</td><td><button class="btn btn-danger event-remove" data-id="{{id}}">Remove</button></td></tr>`;
    }

    reset() {}

    setListener() {
        let self = this;
        this.renderRoleList();
        this.renderEventIndex();

        $('#role-list .form-check-input').change(function (e) {
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
            let code = $('#code').val();
            let roleIds = [];
            $('#role-list .form-check-input').each((key, val) => {
                if (val.checked) {
                    roleIds.push(parseInt(val.value));
                }
            });
            api.addEvent(name, code, roleIds, () => {
                self.renderEventIndex();
                self.resetForm();
            });
        });
    }

    resetForm() {
        $('#name').val('');
        $('#code').val('');
        $('#role-list .form-check-input').each((index, checkbox) => {
            checkbox.checked = false;
        });
        $('.form-check').addClass('bg-danger')
            .removeClass('bg-success');
        $('#add-event').blur();
    }

    renderEventIndex() {
        let self = this;
        api.getAllEvents(() => {
            let str = '';
            data.events.forEach((val) => {
                let roles = [];
                if (val.role_ids.length > 0) {
                    val.role_ids.forEach((role_id) => {
                        let role = data.roles.find((v) => {
                            return v.id == role_id;
                        });
                        roles.push(role.name);
                    });
                }
                let code = val.information.code == undefined ? '-' : val.information.code;
                str += this.eventRow.split('{{id}}').join(val.id)
                    .split('{{name}}').join(val.name)
                    .split('{{roles}}').join(roles.join(', '))
                    .split('{{code}}').join(code);
            });
            $('#event-index').html(str);

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