import {createProjectServer} from "./menuFunctions";

function controller() {
    const addBtn = document.querySelector('.add');

    addBtn.addEventListener("click", async () => {
        const name = await createProject(); // Wait for the project to be created
        console.log(`Project created with name: ${name}`);
    });
}

function createProject() {
    createProjectServer();
    return new Promise((resolve) => {
        const content = document.querySelector('.projects-container');
        const project = document.createElement('li');

        projectInfo().then((name) => {
            project.textContent = name;
            content.appendChild(project);
            resolve(name);  // Resolve the promise with the project name
        });
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

        var s = document.createElement("button");
        s.textContent = "Submit";

        s.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent form submission
            const projectName = name.value; // Get the value from the input
            form.remove(); // Optionally remove the form after submission
            resolve(projectName); // Resolve the promise with the project name
        });

        form.append(name);
        form.append(s);

        formContainer.appendChild(form); // Append the form to the container
        document.body.appendChild(formContainer);
    });
}

export {
    controller
}
