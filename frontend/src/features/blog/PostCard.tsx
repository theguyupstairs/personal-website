import { Link } from 'react-router-dom'
import type { Post } from './types'

function readTime(summary: string): string {
  const words = summary.split(' ').length * 12
  return `${Math.max(3, Math.round(words / 200))} min read`
}

interface Props {
  post: Post
  activeTag?: string
  onTagClick?: (tag: string) => void
}

export function PostCard({ post, activeTag, onTagClick }: Props) {
  return (
    <Link className="post-card" to={`/blog/${post.slug}`}>
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
            <span
              key={t}
              className={`post-card__tag ${activeTag === t ? 'post-card__tag--active' : ''}`}
              onClick={onTagClick ? (e) => { e.preventDefault(); onTagClick(t) } : undefined}
            >
              #{t}
            </span>
          ))}
        </div>
        <span className="post-card__arrow">→</span>
      </div>
    </Link>
  )
}
