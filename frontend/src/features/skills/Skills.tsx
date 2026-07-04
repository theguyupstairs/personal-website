import './skills.css'

const SKILLS = [
  {
    category: 'languages',
    items: ['C', 'C++', 'C#', 'Java', 'Go', 'Python', 'TypeScript', 'SQL'],
  },
  {
    category: 'backend',
    items: ['Node.js', 'Express', 'FastAPI', 'Django', '.NET', 'PostgreSQL', 'SQLite'],
  },
  {
    category: 'frontend',
    items: ['React', 'Tailwind', 'HTML / CSS'],
  },
  {
    category: 'security',
    items: ['WinAPI', 'PE Analysis', 'DLL Injection', 'Process Hollowing', 'AV Evasion'],
  },
  {
    category: 'cloud',
    items: ['AWS', 'EC2 / S3', 'Lambda', 'RDS', 'IAM', 'CloudWatch', 'Vercel', 'DigitalOcean'],
  },
  {
    category: 'infrastructure',
    items: ['Docker', 'Proxmox', 'pfSense', 'Nginx', 'Linux'],
  },
]

export default function Skills() {
  return (
    <section>
      <p className="skills__comment">{'// skills'}</p>
      <div className="skills__grid">
        {SKILLS.map(({ category, items }) => (
          <div key={category} className="skill-group">
            <div className="skill-group__header">
              <span className="skill-group__bracket">[</span>
              <span className="skill-group__name">{category}</span>
              <span className="skill-group__bracket">]</span>
            </div>
            <ul className="skill-group__list">
              {items.map(item => (
                <li key={item} className="skill-group__item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
