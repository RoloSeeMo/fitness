"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import { initializeFirebase, checkAuthState } from "@/lib/firebase"

export default function HomePage() {
  useEffect(() => {
    initializeFirebase()
    checkAuthState()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="section-content">
            <div className="hero-details">
              <h2 className="title">Society Poems</h2>
              <h3 className="subtitle">A space for all to read and write.</h3>
              <p className="description">Where every page tells a story.</p>
              <div className="buttons">
                <a href="/read" className="button read-here">
                  READ
                </a>
                <a href="/upload" className="button upload-here">
                  UPLOAD
                </a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <img src="/placeholder.svg?height=400&width=400" alt="Society Poems" className="hero-image" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="section-content">
            <div className="about-image-wrapper">
              <img src="/placeholder.svg?height=400&width=400" alt="About" className="about-image" />
            </div>
            <div className="about-details">
              <h2 className="section-title">About</h2>
              <p className="text">Society Poems is just getting started.</p>
              <p className="text">Upload to share with others.</p>
              <p className="text">Choose to be anonymous, or named.</p>
              <div className="social-link-list">
                <a
                  href="https://www.instagram.com/officialsocietypoems/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  📷
                </a>
                <a
                  href="https://x.com/offSocietyPoems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  🐦
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Note Section */}
        <section className="note-section">
          <h2 className="section-title">Note from the Author</h2>
          <div className="section-content">
            <h2>
              Thank you for visiting Society Poems. As I continue to work on this project, I'd love to receive your
              feedback!
            </h2>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 Society Poems</p>
        </div>
      </footer>
    </div>
  )
}
