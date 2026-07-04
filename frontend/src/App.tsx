import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './features/hero/Hero'
import Skills from './features/skills/Skills'
import Projects from './features/projects/Projects'
import Blog from './features/blog/Blog'
import PostPage from './features/blog/PostPage'
import './App.css'

function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Blog />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<main><PostPage /></main>} />
      </Routes>
    </BrowserRouter>
  )
}
