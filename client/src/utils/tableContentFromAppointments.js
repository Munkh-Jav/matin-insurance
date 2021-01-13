export default (appointments, filters, buttons) => {
    const table_data = [];

    if(!appointments || appointments.length === 0 )
        return [{
            title: "No pending appointments",
            italic : true,
            donTrim : false,
            contents: []
        }];

    appointments.map(appointment => {
        const object = {
            title: appointment.client_name,
            id: appointment.id,
            contents: []
        }
        filters.map(filter => {
            let content = {};
            switch (filter){
                case "users":
                    content = {
                        type:"avatar-group",
                        task_id:appointment._id
                    };
                    break;
                case "status":
                    content = {
                        type:"badge",
                        value: getStatus(appointment.status).status,
                        class: getStatus(appointment.status).class
                    };
                    break;
                case "progress":
                    content = {
                        type:"progress",
                        value: appointment.completion,
                        class: getBarClass(appointment.completion)
                    };
                    break;
                case "date":
                    content = {
                        value: getDate(appointment.date)
                    }
                    break;
                case "time":
                    content = {
                        value: getTime(appointment.date)
                    }
            }
            object.contents.push(content);
        });
        if(buttons) {
            const buttonContent = {type:"buttons",actions: []};
            buttons.map(button => {
                buttonContent.actions.push({title: button.title, callback: button.callback});
            })
            object.contents.push(buttonContent);
        }
        table_data.push(object);
    })

    return table_data;
}

const getStatus = (status) => {
    const result = {
        status: '',
        class: ''
    }
    switch (status){
        case 0:
            result.status = 'Waiting';
            result.class = 'bg-info';
            break;
        case 1:
            result.status = 'Accepted';
            result.class = 'bg-success';
            break;
        case 2:
            result.status = 'Cancelled';
            result.class = 'bg-danger';
            break;
        case 3:
            result.status = 'Done';
            result.class = 'bg-success';
            break;
        default:
            result.status = 'Unknown';
            result.class = 'bg-blue';
            break;
    }
    return result;
}

const getBarClass = (value) => {
    if(value<50)
        return "bg-gradient-danger"
    if(value<70)
        return "bg-gradient-warning"
    if(value<90)
        return "bg-gradient-info"
    return "bg-gradient-success"
}

const getDate = (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${mo} ${da}, ${ye}`;
}

const getTime = (date) => new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(new Date(date));
