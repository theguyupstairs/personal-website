import { Link } from 'react-router-dom'
import { POSTS } from './posts'
import './blog.css'

function readTime(summary: string): string {
  const words = summary.split(' ').length * 12
  return `${Math.max(3, Math.round(words / 200))} min read`
}

export default function Blog() {
  return (
    <section>
      <p className="blog__comment">{'// writing'}</p>
      <div className="blog__grid">
        {POSTS.map(post => (
          <Link key={post.id} className="post-card" to={`/blog/${post.slug}`}>
            <div className="post-card__meta">
              <span className="post-card__date">{post.date}</span>
              <span className="post-card__dot" />
              <span className="post-card__read-time">{readTime(post.summary)}</span>
            </div>
            <h3 className="post-card__title">{post.title}</h3>
            <p className="post-card__summary">{post.summary}</p>
            <div className="post-card__footer">
              <div className="post-card__tags">
                {post.tags.map(t => (
                  <span key={t} className="post-card__tag">#{t}</span>
                ))}
              </div>
              <span className="post-card__arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
