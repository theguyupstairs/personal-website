import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { POSTS } from './posts'
import { PostCard } from './PostCard'
import './BlogPage.css'

const ALL_TAGS = Array.from(new Set(POSTS.flatMap(p => p.tags))).sort()

export default function BlogPage() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return POSTS.filter(post => {
      const matchesTag = !activeTag || post.tags.includes(activeTag)
      const q = query.toLowerCase()
      const matchesQuery = !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some(t => t.includes(q))
      return matchesTag && matchesQuery
    })
  }, [query, activeTag])

  function toggleTag(tag: string) {
    setActiveTag(prev => prev === tag ? null : tag)
  }

  return (
    <main className="blog-page">
      <Link to="/" className="blog-page__back">← back</Link>

      <div className="blog-page__header">
        <p className="blog-page__comment">{'// writing'}</p>
        <input
          className="blog-page__search"
          type="text"
          placeholder="> search posts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className="blog-page__tags">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            className={`blog-page__tag ${activeTag === tag ? 'blog-page__tag--active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="blog-page__empty">no posts match "{query}"</p>
      ) : (
        <div className="blog-page__grid">
          {filtered.map(post => (
            <PostCard
              key={post.id}
              post={post}
              activeTag={activeTag ?? undefined}
              onTagClick={toggleTag}
            />
          ))}
        </div>
      )}
    </main>
  )
}
