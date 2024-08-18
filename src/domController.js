import {creareToDoServer, createProjectServer} from "./menuFunctions";
import { creareToDoServer } from "./menuFunctions";

var doProjectsExist = false;

function controller() {
    const addBtn = document.querySelector('.add');

    addBtn.addEventListener("click", async () => {
        const name = await createProject();
        console.log(`Project created with name: ${name}`);
    });

    document.addEventListener('click', (e) => {
        if(e.target.matches('.projectBtn'))
        {
            changeActiveProject(e.target);
            renderProject(e.target);
        }
        if(e.target.matches('add'))
        {
            createProject();
            renderProject(e.target);
        }
        if(e.target.matches('addCard'))
        {
            creareToDo(e.target.parentNode);
        }
    });
}

function createProject() {
    return new Promise((resolve) => {
        const content = document.querySelector('.projects-container');
        const project = document.createElement('li');
        project.classList.add('project');
        var btn = document.createElement('button');
        btn.classList.add('projectBtn');
        if(doProjectsExist == true) document.querySelector('.projectBtn.active').classList.remove('active');
        btn.classList.add('active');
        


        projectInfo().then((name, description) => {
            btn.innerHTML = name;
            createProjectServer(name, description)
            content.appendChild(project);
            resolve(name, description);  
        });

        project.appendChild(btn);
        doProjectsExist = true;
        console.log(doProjectsExist);
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
    document.querySelector('.projectBtn.active').classList.remove('active');
    project.classList.add('active');
}

function renderProject(project)
{
    const content = document.querySelector('.main');
    content.innerHTML = '';
    const space = document.createElement('div');
    space.style.border = '5px solid black';
    space.style.borderRadius = '15px';
    space.style.height = '100%';
    space.style.flex = '1';
    const createToDoBtn = document.createElement('button');
    createToDoBtn.classList.add('addCard');

    content.appendChild(space);
}

function creareToDo(project)
{
    return new Promise((resolve) => {
        const toDoCard = document.createElement('div');
        toDoCard.classList.add('toDo');
        var btn = document.createElement('button');
        btn.classList.add('deleteBtn');
        

        ToDoInfo().then((title,description,dueDate,priority) => {
            creareToDoServer(title,description,dueDate,priority)
            project.appendChild(toDoCard);
            resolve(title,description,dueDate,priority);  
        });

        project.appendChild(btn);
        doProjectsExist = true;
        console.log(doProjectsExist);
    });
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

function addToDotoProject(card)
{

}

export {
    controller
}
