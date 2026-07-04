import { Link } from 'react-router-dom'
import { POSTS } from './posts'
import { PostCard } from './PostCard'
import './blog.css'

export default function Blog() {
  const preview = POSTS.slice(0, 3)

  return (
    <section>
      <p className="blog__comment">{'// writing'}</p>
      <div className="blog__grid">
        {preview.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Link to="/blog" className="blog__see-all">
        see all posts →
      </Link>
    </section>
  )
}
