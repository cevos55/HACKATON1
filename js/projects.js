document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            title: 'Project 1',
            description: 'Description of project 1',
            link: 'http://example.com/project1'
        },
        {
            title: 'Project 2',
            description: 'Description of project 2',
            link: 'http://example.com/project2'
        },
        {
            title: 'Project 3',
            description: 'Description of project 3',
            link: 'http://example.com/project3'
        }
    ];

    const projectsContainer = document.getElementById('projects-container');

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';

        const titleElement = document.createElement('h2');
        titleElement.textContent = project.title;
        projectElement.appendChild(titleElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = project.description;
        projectElement.appendChild(descriptionElement);

        const linkElement = document.createElement('a');
        linkElement.href = project.link;
        linkElement.textContent = 'View Project';
        projectElement.appendChild(linkElement);

        projectsContainer.appendChild(projectElement);
    });
});