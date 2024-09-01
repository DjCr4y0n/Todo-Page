import { loadProject, loadAllProjects, saveProject } from "./storage";

var doProjectsExist = false;
function controller() {
    document.addEventListener('click', (e) => {
        if(e.target.matches('.project'))
        {
            loadProject(e.target.innerHTML);
            changeActiveProject(e.target);
        }
        if(e.target.matches('.add'))
        {
            createProjectUI();
        }
        if(e.target.matches('.addT'))
        {

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
            console.log(projectDescription);
            form.remove();
            formContainer.remove(); 
            resolve([projectName, projectDescription]); 
        });
    });
    
}

function createProjectUI() {
    const activeElement = document.querySelector('.project.active');

    if (activeElement) {
        activeElement.classList.remove('active');
    }
    

    projectInfo().then((v) => {  
        saveProject(v[0], v[1]);  
        showProjects();  
        
       
        const elements = document.querySelectorAll('.project'); 
        elements.forEach(el => {
            if (el.innerText == v[0]) {  
                el.classList.add("active");
            }
        });
    });
}

function changeActiveProject(project)
{
    const activeElement = document.querySelector('.project.active');

    if (activeElement) {
        activeElement.classList.remove('active');
    }
    project.classList.add('active');
}

function showProjects()
{
    const projectsContainer = document.querySelector('.projects-container');
    projectsContainer.innerHTML = "";
    loadAllProjects().forEach(project => {
        renderProjectBtn(project);
    });
}

function renderProjectBtn(project)
{
    const projectsContainer = document.querySelector('.projects-container');
    const projectBtn = document.createElement('button');

    projectBtn.classList.add('project');  
    projectBtn.innerHTML = project._title;
    projectsContainer.appendChild(projectBtn);
}


export {
    controller, showProjects
}
