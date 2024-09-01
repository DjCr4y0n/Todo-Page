export function createProject(title,description)
{
    const project = {
        _title: title,
        _description: description,
    };

    return project;
}

export function createCard(title)
{
    const card = { 
        _title: title
    };
    
    return card;
}