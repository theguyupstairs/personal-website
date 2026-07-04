import type { Project } from './types'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <a
      className="project-card"
      href={project.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="project-card__header">
        <span className="project-card__bracket">[</span>
        <span className="project-card__name">{project.name}</span>
        <span className="project-card__bracket">]</span>
      </div>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map(t => (
          <span key={t} className="project-card__tag">#{t}</span>
        ))}
      </div>
    </a>
  )
}
