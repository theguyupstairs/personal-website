import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './features/hero/Hero'
import Skills from './features/skills/Skills'
import Projects from './features/projects/Projects'
// BLOG IMPORTS — uncomment when ready to publish writing
// import Blog from './features/blog/Blog'
// import BlogPage from './features/blog/BlogPage'
// import PostPage from './features/blog/PostPage'
import './App.css'

function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      {/* BLOG SECTION — uncomment when ready to publish writing
      <Blog />
      */}
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* BLOG ROUTES — uncomment when ready to publish writing
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<main><PostPage /></main>} />
        */}
      </Routes>
    </BrowserRouter>
  )
}
