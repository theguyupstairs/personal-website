import ProjectCard from './ProjectCard'
import type { Project } from './types'
import './projects.css'

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'expansalud',
    description: 'AI-powered healthcare chatbot that handles appointment scheduling, rescheduling, and cancellation through natural language. Stateful conversation engine backed by PostgreSQL with transactional slot management.',
    tags: ['node', 'express', 'react', 'postgresql', 'nlp'],
    url: 'https://github.com/theguyupstairs/expansalud',
  },
  {
    id: 2,
    name: 'ecom-analysis',
    description: 'E-commerce data analysis pipeline with a collaborative filtering recommender built on Alternating Least Squares. REST API layer follows clean architecture — domain, application, and infrastructure fully decoupled.',
    tags: ['python', 'fastapi', 'als', 'data-science', 'postgresql'],
    url: 'https://github.com/theguyupstairs/ecom-analysis',
  },
  {
    id: 3,
    name: 'homelab',
    description: 'Self-hosted infrastructure running on Proxmox VE. Segmented VLANs managed via pfSense, reverse proxy through Nginx, and containerised services across multiple LXC and KVM instances. Monitoring via Grafana + Prometheus.',
    tags: ['proxmox', 'pfsense', 'nginx', 'docker', 'networking'],
    url: 'https://github.com/theguyupstairs/homelab',
  },
  {
    id: 4,
    name: 'win-internals-lab',
    description: 'Malware research and Windows internals study. Implemented DLL injection, process hollowing, and keylogging from scratch in C. Explored socket-based C2 communication, PE obfuscation techniques, and AV evasion against Windows Defender. Built to understand offensive tradecraft at the implementation level — not a framework, every technique written by hand.',
    tags: ['c', 'windows', 'winapi', 'malware-research', 'reverse-engineering'],
    url: 'https://github.com/theguyupstairs/win-internals-lab',
  },
]

export default function Projects() {
  return (
    <section>
      <p className="projects__comment">{'// projects'}</p>
      <div className="projects__grid">
        {PROJECTS.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
