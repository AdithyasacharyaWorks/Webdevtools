import React from 'react'
import ProjectCard from '../components/ProjectCard'

function ProjectPage() {
  return (
    <div className='flex flex-col gap-5 justify-center items-center mt-10'>
        <ProjectCard name={"Create project"}/>
        <ProjectCard name={"Project List"}/>
        <ProjectCard name={"Manage Projects"}/>
    </div>
  )
}

export default ProjectPage