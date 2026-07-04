import { useParams, Link } from 'react-router-dom'
import { POSTS } from './posts'
import './PostPage.css'

function readTime(content: string): string {
  const words = content.split(' ').length
  return `${Math.max(3, Math.round(words / 200))} min read`
}

function renderContent(content: string) {
  const paragraphs = content.split('\n\n').filter(Boolean)
  return paragraphs.map((p, i) =>
    p.startsWith('TODO:')
      ? <p key={i} className="post-page__todo">{p}</p>
      : <p key={i}>{p}</p>
  )
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = POSTS.find(p => p.slug === slug)

  if (!post) {
    return (
      <div>
        <Link to="/" className="post-page__back">← back</Link>
        <p style={{ color: 'var(--dim)' }}>post not found.</p>
      </div>
    )
  }

  return (
    <article className="post-page">
      <Link to="/" className="post-page__back">← back</Link>

      <div className="post-page__meta">
        <span className="post-page__date">{post.date}</span>
        <span className="post-page__dot" />
        <span className="post-page__read-time">{readTime(post.content)}</span>
      </div>

      <h1 className="post-page__title">{post.title}</h1>

      <div className="post-page__tags">
        {post.tags.map(t => (
          <span key={t} className="post-page__tag">#{t}</span>
        ))}
      </div>

      <div className="post-page__body">
        {renderContent(post.content)}
      </div>
    </article>
  )
}
