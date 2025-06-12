"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { initializeFirebase, checkAuthState } from "@/lib/firebase"

export default function UploadPage() {
  const [privacy, setPrivacy] = useState("")
  const [username, setUsername] = useState("")
  const [genre, setGenre] = useState("")
  const [content, setContent] = useState("")
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    initializeFirebase()
    checkAuthState()

    // Load draft from localStorage
    const savedDraft = localStorage.getItem("draftContent")
    if (savedDraft) {
      setContent(savedDraft)
    }
  }, [])

  useEffect(() => {
    // Save draft to localStorage
    localStorage.setItem("draftContent", content)
  }, [content])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isAnonymous = privacy === "anonymous"
    const name = isAnonymous ? "Anonymous" : username.trim()
    const timestamp = new Date().toLocaleString("en-US", { hour12: false })

    if (!content.trim() || (!isAnonymous && !name)) {
      alert("Please fill out all required fields.")
      return
    }

    // Simulate submission - replace with actual Firebase logic
    console.log("Submitting:", { name, genre, content, timestamp })

    // Clear form and show success
    localStorage.removeItem("draftContent")
    setPrivacy("")
    setUsername("")
    setGenre("")
    setContent("")
    setShowModal(true)
  }

  const clearDraft = () => {
    setContent("")
    localStorage.removeItem("draftContent")
  }

  const getPreviewAuthor = () => {
    if (privacy === "anonymous") return "— Anonymous"
    if (privacy === "named" && username.trim()) return `— ${username.trim()}`
    return ""
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="upload-main">
        <form onSubmit={handleSubmit} className="upload-form">
          <h1>✍️ Upload Your Writing</h1>

          <div className="form-group">
            <label htmlFor="privacy">Choose Privacy:</label>
            <select id="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)} required>
              <option value="" disabled>
                -Select Privacy-
              </option>
              <option value="anonymous">Anonymous</option>
              <option value="named">Named</option>
            </select>
          </div>

          {privacy === "named" && (
            <div className="form-group">
              <label htmlFor="username">
                Your Name: <span className="char-limit">({username.length}/15)</span>
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                placeholder="e.g. Maya Angelou"
                maxLength={15}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="genre">Category:</label>
            <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
              <option value="" disabled>
                -Select Category-
              </option>
              <option value="poem">Poem</option>
              <option value="story">Story</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Your Writing:</label>
            <textarea
              id="content"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              required
            />
            <div className="char-count">{content.length} characters</div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button type="button" onClick={clearDraft} className="clear-button">
              Clear Draft
            </button>
          </div>

          <div className="preview-box">
            <div className="preview-content">{content.trim() || "Your writing preview will appear here..."}</div>
            <div className="preview-author">{getPreviewAuthor()}</div>
          </div>
        </form>
      </main>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>✅ Upload Successful!</h2>
            <p>Thank you for sharing your words with Society Poems.</p>
            <button onClick={() => setShowModal(false)} className="modal-close">
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 Society Poems</p>
        </div>
      </footer>
    </div>
  )
}
