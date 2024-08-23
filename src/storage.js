import { createProject } from "./domCreator";

export function saveProject(title, description)
{
    const project = createProject(title,description);
    const projectString = JSON.stringify(project);
    localStorage.setItem(title, projectString);
    
}

export function loadAllProjects()
{
    const projects = [];

    // Iterate over all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedValue = localStorage.getItem(key);

        try {
            // Attempt to parse the value as JSON
            const project = JSON.parse(storedValue);

            // Check if the parsed value is an object (to confirm it's a project)
            if (typeof project === 'object' && project !== null) {
                projects.push(project);
            }
        } catch (e) {
            // If parsing fails, it's not a JSON object, so we skip it
            console.warn(`Skipping key "${key}": not a valid JSON object`);
        }
    }

    return projects;

}

export function loadProject(name)
{
    const storedProjectString = localStorage.getItem(name);

    if (storedProjectString) {
        const storedProject = JSON.parse(storedProjectString);
        console.log("Project found:", storedProject);
        return storedProject;
    } else {
        console.log("No project found with the given name:", name);
        return null;
    }

}

