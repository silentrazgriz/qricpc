let data = {
    events: [
        { id: 1, name: 'Event A', role: ['Coach', 'BS'] },
        { id: 2, name: 'Event B', role: ['Participant', 'Excursion'] },
        { id: 3, name: 'Event C', role: ['Coach', 'Participant'] },
    ],
    roles: [
        { id: 1, name: 'Coach' },
        { id: 2, name: 'Participant' },
        { id: 3, name: 'BS' },
        { id: 4, name: 'Excursion' }
    ],
    participants: [
        { id: 1, name: 'Coach 1', team: ['Team 1'], role: ['Coach', 'BS', 'Excursion'] },
        { id: 2, name: 'Participant 1', team: ['Team 1'], role: ['Participant', 'BS', 'Excursion'] },
        { id: 3, name: 'Participant 2', team: ['Team 1'], role: ['Participant', 'BS', 'Excursion'] },
        { id: 4, name: 'Participant 3', team: ['Team 1'], role: ['Participant', 'BS', 'Excursion'] },

        { id: 5, name: 'Coach 2', team: ['Team 2', 'Team 3'], role: ['Coach', 'Excursion'] },
        { id: 6, name: 'Participant 4', team: ['Team 2'], role: ['Participant', 'Excursion'] },
        { id: 7, name: 'Participant 5', team: ['Team 2'], role: ['Participant', 'Excursion'] },
        { id: 8, name: 'Participant 6', team: ['Team 2'], role: ['Participant', 'Excursion'] },

        { id: 9, name: 'Participant 7', team: ['Team 3'], role: ['Participant', 'BS'] },
        { id: 10, name: 'Participant 8', team: ['Team 3'], role: ['Participant', 'BS'] },
        { id: 11, name: 'Participant 9', team: ['Team 3'], role: ['Participant', 'BS'] },
    ],
    attendances: [
        { event_id: 1, participant_id: 1, status: 'OK' },
        { event_id: 1, participant_id: 2, status: 'OK' },
        { event_id: 1, participant_id: 3, status: 'OK' },
        { event_id: 1, participant_id: 4, status: 'RUN AWAY' },
        { event_id: 1, participant_id: 5, status: null },
        { event_id: 1, participant_id: 9, status: 'SICK' },
        { event_id: 1, participant_id: 10, status: null },
        { event_id: 1, participant_id: 11, status: null },

        { event_id: 2, participant_id: 1, status: 'OK' },
        { event_id: 2, participant_id: 2, status: 'OK' },
        { event_id: 2, participant_id: 3, status: 'OK' },
        { event_id: 2, participant_id: 4, status: 'OK' },
        { event_id: 2, participant_id: 5, status: null },
        { event_id: 2, participant_id: 6, status: 'OK' },
        { event_id: 2, participant_id: 7, status: null },
        { event_id: 2, participant_id: 8, status: null },
        { event_id: 2, participant_id: 9, status: 'OK' },

        { event_id: 3, participant_id: 1, status: 'OK' },
        { event_id: 3, participant_id: 2, status: null },
        { event_id: 3, participant_id: 3, status: null },
        { event_id: 3, participant_id: 4, status: null },
        { event_id: 3, participant_id: 5, status: 'OK' },
        { event_id: 3, participant_id: 6, status: 'OK' },
        { event_id: 3, participant_id: 7, status: null },
        { event_id: 3, participant_id: 8, status: null },
        { event_id: 3, participant_id: 9, status: 'OK' },
        { event_id: 3, participant_id: 10, status: 'OK' },
        { event_id: 3, participant_id: 11, status: null },
    ]
};