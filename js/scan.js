class Scan {
    constructor() {
        this.eventOption = '<option value="{{id}}">{{code}} - {{name}}</option>';
    }

    reset() {
        scanner.stop();
    }

    setListener() {
        this.renderEventList();
        this.activateCamera();
    }

    activateCamera() {
        let self = this;
        scanner = new Instascan.Scanner({
            video: document.getElementById('preview')
        });
        scanner.addListener('scan', function (content) {
            $('#msg').html(`Scanning`);
            let eventId = $('#choose-event').val();
            api.changeStatus(eventId, content, 'ok', (response) =>  {
                $('#msg').html(`Scan success, ${response.participant.name} in ${response.event.name}`);
                setTimeout(() => {
                    $('#msg').html('Ready to scan');
                }, 2000);
            });
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                let selected = cameras[0];
                cameras.forEach((camera) => {
                    if (camera.name != null && camera.name.indexOf('back') != -1) {
                        selected = camera;
                    }
                });
                scanner.start(selected);
            } else {
                console.error('No cameras found');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    renderEventList() {
        api.getAllEvents(() => {
            data.events.forEach((val) => {
                let code = val.information.code == undefined ? '' : val.information.code;
                let element = this.eventOption.split('{{id}}').join(val.id)
                    .split('{{code}}').join(code)
                    .split('{{name}}').join(val.name);
                $('#choose-event').append(element);
            });
        });
    }
}