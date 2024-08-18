export function createProjectServer(title,description)
{
    const _title = title;
    const _description = description;

    return {_title, _description};
}

export function creareToDoServer(title,description,dueDate,priority)
{
    const _title = title;
    const _description = description;
    const _dueDate = dueDate;
    const _priority = priority;

    return {_title, _description, _dueDate, _priority};
}