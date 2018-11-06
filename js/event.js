class Event {
    constructor() {
        this.roleContainer = `<label class="form-check bg-danger text-light" id="role-container-{{id}}" for="role-{{id}}"><input class="form-check-input" type="checkbox" value="{{id}}" id="role-{{id}}"/><label class="form-check-label" for="role-{{id}}">{{name}}</label></label>`;
        this.eventRow = `<tr><td>{{name}}</td><td>{{roles}}</td><td><button class="btn btn-danger event-remove" data-id="{{id}}">Remove</button></td></tr>`;;
    }
    
    setListener() {
        this.renderRoleList();
        this.renderEventIndex();
    }

    renderEventIndex() {
        $('#event-index').html('');
        data.events.forEach((val) => {
            let element = this.eventRow.split('{{id}}').join(val.id)
                .split('{{name}}').join(val.name)
                .split('{{roles}}').join(val.role.join(', '));
            $('#event-index').append(element);
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