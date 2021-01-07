export default (tasks, filters, buttons) => {
    const table_data = [];

    if(!tasks)
        return [];

    tasks.map(task => {
        const object = {
            title: task.title,
            id: task._id,
            image: task.image,
            contents: []
        }
        filters.map(filter => {
            let content = {};
            switch (filter){
                case "users":
                    content = {
                        type:"avatar-group",
                        task_id:task._id
                    };
                    break;
                case "state":
                    content = {
                        type:"badge",
                        value: getState(task.state).state,
                        class: getState(task.state).class
                    };
                    break;
                case "progress":
                    content = {
                        type:"progress",
                        value: task.completion,
                        class: getBarClass(task.completion)
                    };
                    break;
                case "deadline":
                    content = {
                        value: getDate(task.until)
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

const getState = (state) => {
    const result = {
        state: '',
        class: ''
    }
    switch (state){
        case 1:
            result.state = 'Not Started';
            result.class = 'bg-info';
            break;
        case 2:
            result.state = 'On it';
            result.class = 'bg-warning';
            break;
        case 3:
            result.state = 'Finished';
            result.class = 'bg-success';
            break;
        case 4:
            result.state = 'Stuck';
            result.class = 'bg-danger';
            break;
        default:
            result.state = 'Paused';
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