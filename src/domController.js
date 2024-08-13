import {createProjectServer} from "./menuFunctions";

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
        }
        if(e.target.matches('add'))
        {
            createProject();
        }
    });
}

function createProject() {
    createProjectServer();
    return new Promise((resolve) => {
        const content = document.querySelector('.projects-container');
        const project = document.createElement('li');
        project.classList.add('project');
        var btn = document.createElement('button');
        btn.classList.add('projectBtn');
        if(doProjectsExist == true) document.querySelector('.project.active').classList.remove('active');
        project.classList.add('active');
        


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

export {
    controller
}
