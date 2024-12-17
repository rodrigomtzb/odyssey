const getProjectData = (project, withoutId = false) => {
    return [
        {
            title: "Nombre",
            description: project.name
        }
    ]
}

export default getProjectData