import {creareToDoServer, createProjectServer} from "./menuFunctions";

var doProjectsExist = false;
const cardArray = [];

function controller() {
    const addBtn = document.querySelector('.add');

    addBtn.addEventListener("click", async () => {
        const name = await createProject();
        console.log(`Project created with name: ${name}`);
    });

    document.addEventListener('click', (e) => {
        if(e.target.matches('.project'))
        {
            changeActiveProject(e.target);
            renderProject();
        }
        if(e.target.matches('.add'))
        {
            createProject();
            renderProject();
        }
        if(e.target.matches('.addT'))
        {
            console.log('ggggg')
            creareToDo(e.target);
        }
    });
}

function createProject() {
    return new Promise((resolve) => {
        const content = document.querySelector('.projects-container');
        const project = document.createElement('button');
        project.classList.add('project');
        if(doProjectsExist == true) document.querySelector('.project.active').classList.remove('active');
        project.classList.add('active');
        


        projectInfo().then((name, description) => {
            project.innerHTML = name;
            project.id = name;
            createProjectServer(name, description)
            content.appendChild(project);
            resolve(name, description);  
        });

       doProjectsExist = true;
    });
}

function projectInfo() {
    return new Promise((resolve) => {
        const formContainer = document.createElement('div');
        formContainer.classList.add('centered-form');
        const form = document.createElement('form');
        form.setAttribute("method", "post");


        var name = document.createElement("input");
        name.setAttribute("type", "text");
        name.setAttribute("name", "name");
        name.setAttribute("placeholder", "Name");

        var description = document.createElement("input");
        description.setAttribute("type", "text");
        description.setAttribute("name", "description");
        description.setAttribute("placeholder", "Description");

        var s = document.createElement("button");
        s.textContent = "Submit";

        form.append(name);
        form.append(description);
        form.append(s);

        formContainer.appendChild(form); 
        document.body.appendChild(formContainer);

        s.addEventListener("click", (event) => {
            event.preventDefault(); 
            const projectName = name.value;
            const projectDescription = description.value;
            form.remove();
            formContainer.remove(); 
            resolve(projectName, projectDescription); 
        });
    });
}

function changeActiveProject(project)
{
    document.querySelector('.project.active').classList.remove('active');
    project.classList.add('active');
}

function renderProject()
{
    console.log("bagno");
    const content = document.querySelector('.main');
    content.innerHTML = '';
    const space = document.createElement('div');
    space.classList.add('space');
    space.style.border = '5px solid black';
    space.style.borderRadius = '15px';
    space.style.height = '100%';
    space.style.flex = '1';

    content.appendChild(space);
}

function creareToDo()
{
    const project = document.querySelector('.active');
    const id = project.id;
    project.classList.add(id);
    return new Promise((resolve) => {
        
        const toDoCard = document.createElement('div');
        toDoCard.classList.add('toDo');
        const _title = document.createElement('h1');
        const _description = document.createElement('p');
        const _dueDate = document.createElement('p');
        const _priority = document.createElement('p');

        toDoCard.appendChild(_title);
        toDoCard.appendChild(_description);
        toDoCard.appendChild(_dueDate);
        toDoCard.appendChild(_priority);

        ToDoInfo().then((title,description,dueDate,priority) => {
            creareToDoServer(title,description,dueDate,priority);
            _title = title;
            _description = description;
            _dueDate = dueDate;
            _priority = priority;
            cardArray.push(toDoCard);
            resolve(title,description,dueDate,priority);  
        });

    });
}

function renderToDo()
{
    const container = document.querySelector('.space');
}

function ToDoInfo()
{
    return new Promise((resolve) => {
        const formContainer = document.createElement('div');
        formContainer.classList.add('centered-form');
        const form = document.createElement('form');
        form.setAttribute("method", "post");


        var name = document.createElement("input");
        name.setAttribute("type", "text");
        name.setAttribute("name", "name");
        name.setAttribute("placeholder", "Name");

        var description = document.createElement("input");
        description.setAttribute("type", "text");
        description.setAttribute("name", "description");
        description.setAttribute("placeholder", "Description");

        var dueDate = document.createElement('input');
        dueDate.setAttribute('type', 'date');
        dueDate.setAttribute('name', 'dueDate');
        dueDate.setAttribute('placeholder', "Due date");

        //priority
        const priorities = ['low', 'medium', 'high'];
        var prioritiesContainer = document.createElement('div');
        priorities.forEach((option) =>
        {
            const radioButton = document.createElement('label');
            radioButton.textContent = option;
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'priorities';
            input.value = option;

            radioButton.appendChild(input);
            prioritiesContainer.appendChild(radioButton);

        });
        let priorityValue;
        prioritiesContainer.forEach((priority) =>
        {
            priority.addEventListener('change', (e) =>
            {
                priorityValue = e.target.value;
            });
        });


        var s = document.createElement("button");
        s.textContent = "Submit";

        form.append(name);
        form.append(description);
        form.append(dueDate);
        form.append(prioritiesContainer);
        form.append(s);

        formContainer.appendChild(form); 
        document.body.appendChild(formContainer);

        s.addEventListener("click", (event) => {
            event.preventDefault(); 
            const toDoName = name.value;
            const toDoDescription = description.value;
            const toDoDueDate = dueDate.value;
            const toDoPriority = priorityValue;
            form.remove();
            formContainer.remove(); 
            resolve(toDoName, toDoDescription, toDoDueDate, toDoPriority); 
        });
    });
}

function addToDotoProject(project)
{

}

export {
    controller
}
