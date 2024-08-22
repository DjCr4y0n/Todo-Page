import { loadProject, loadAllProjects, saveProject } from "./storage";


function controller() {
    document.addEventListener('click', (e) => {
        if(e.target.matches('.project'))
        {
            changeActiveProject(e.target);
        }
        if(e.target.matches('.add'))
        {
            createProjectUI();
            console.log('bb');
        }
        if(e.target.matches('.addT'))
        {
            const container = document.querySelector(".projects-container");
            container.innerHTML = "";
            showProjects();
        }   
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

function createProjectUI()
{
    return new Promise((resolve) => {
        projectInfo().then((name, description) => {

            saveProject(name,description);

            resolve(name, description);  
        });
    });
}

function changeActiveProject(project)
{
    document.querySelector('.project.active').classList.remove('active');
    project.classList.add('active');
}

function showProjects()
{
    loadAllProjects().forEach(project => {
        console.log('aa')
    });
}


export {
    controller
}
