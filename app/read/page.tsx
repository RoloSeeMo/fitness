"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { initializeFirebase, checkAuthState } from "@/lib/firebase"

interface Entry {
  name: string
  content: string
  timestamp: string
}

export default function ReadPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeFirebase()
    checkAuthState()
    loadEntries()
  }, [])

  const loadEntries = async () => {
    // Simulate loading entries - replace with actual Firebase logic
    setTimeout(() => {
      setEntries([
        {
          name: "Anonymous",
          content: "The stars whisper secrets\nTo those who dare to listen\nIn the quiet of night",
          timestamp: "2025-01-11, 10:30:00",
        },
        {
          name: "Maya",
          content: "Words flow like rivers\nCarrying dreams downstream\nTo oceans of possibility",
          timestamp: "2025-01-11, 09:15:00",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="read-main">
        {loading ? (
          <p className="loading-text">Loading submissions...</p>
        ) : entries.length === 0 ? (
          <p className="empty-text">No entries yet. Be the first to upload!</p>
        ) : (
          <div className="entries-container">
            {entries.map((entry, index) => (
              <div key={index} className="entry">
                <p className="entry-content">{entry.content}</p>
                <div className="entry-meta">
                  — <strong>{entry.name}</strong>, <em>{entry.timestamp}</em>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 Society Poems</p>
        </div>
      </footer>
    </div>
  )
}
