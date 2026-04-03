'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker via-dark to-darker">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-surface/80 backdrop-blur-md border-b border-primary/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">⚔️ THE ARENA</div>
          <div className="flex gap-6">
            <Link href="#features" className="text-text-muted hover:text-primary transition">Features</Link>
            <Link href="#phases" className="text-text-muted hover:text-primary transition">Phases</Link>
            <Link href="#docs" className="text-text-muted hover:text-primary transition">Docs</Link>
            <a href="https://github.com" className="bg-primary text-darker px-4 py-2 rounded-lg font-bold hover:bg-secondary transition">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            THE ARENA
          </h1>
          <p className="text-2xl text-text-muted mb-8">
            Unified Cognitive Operating System
          </p>
          <p className="text-lg text-text mb-12 leading-relaxed">
            Integrate AI ensemble analysis, multi-channel content propagation, and blockchain provenance verification into a single intuitive interface. Submit a thought, get quad-exposure responses from 4 AI models, publish with one tap, and claim seniority on blockchain.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-gradient-to-r from-primary to-secondary text-darker px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition">
              Launch THE ARENA
            </button>
            <Link href="#docs" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/10 transition">
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧪',
                title: 'Quad-Exposure',
                desc: 'Send prompts to Gemini, Grok, Claude, and ChatGPT simultaneously. Compare responses side-by-side.'
              },
              {
                icon: '📤',
                title: 'Multi-Channel Publishing',
                desc: 'Publish to Twitter, Substack, or Email with one tap. Track status in real-time.'
              },
              {
                icon: '🔗',
                title: 'Blockchain Seniority',
                desc: 'Hash insights on Solana or Base. Create immutable provenance records.'
              },
              {
                icon: '📱',
                title: 'Mobile-First',
                desc: 'Responsive design optimized for phones. Works on any device.'
              },
              {
                icon: '🔒',
                title: 'Offline-First',
                desc: 'Full functionality without internet. Sync when online.'
              },
              {
                icon: '🔐',
                title: 'Secure & Private',
                desc: 'No tracking. Optional encryption. Open source.'
              },
            ].map((feature, i) => (
              <div key={i} className="bg-surface rounded-lg p-8 border border-primary/20 hover:border-primary/50 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section id="phases" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Three Integrated Systems</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: 'I',
                title: 'The Lab',
                subtitle: 'AI Ensemble',
                items: [
                  'Quad-exposure to 4 AI models',
                  'Side-by-side comparison',
                  'Token & latency metrics',
                  'One-tap selection',
                  'Local persistence'
                ]
              },
              {
                num: 'II',
                title: 'MSPS',
                subtitle: 'Propagation',
                items: [
                  'Twitter/X publishing',
                  'Substack publishing',
                  'Email publishing',
                  'Multi-channel selection',
                  'Status tracking'
                ]
              },
              {
                num: 'III',
                title: 'Blockchain',
                subtitle: 'Seniority',
                items: [
                  'Solana hashing',
                  'Base hashing',
                  'Immutable records',
                  'Provenance proof',
                  'Timestamp verification'
                ]
              },
            ].map((phase, i) => (
              <div key={i} className="bg-surface rounded-lg p-8 border-l-4 border-primary">
                <div className="text-5xl font-black text-secondary mb-2">Phase {phase.num}</div>
                <h3 className="text-2xl font-bold text-primary mb-1">{phase.title}</h3>
                <p className="text-text-muted mb-6">{phase.subtitle}</p>
                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-text">
                      <span className="text-success">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Technology Stack</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Frontend', items: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
              { title: 'Backend', items: ['Express.js', 'Node.js', 'TypeScript', 'SQLite'] },
              { title: 'AI Models', items: ['Gemini', 'ChatGPT', 'Claude', 'Grok'] },
              { title: 'Blockchain', items: ['Solana', 'Base', 'Web3.js', 'SHA-256'] },
            ].map((stack, i) => (
              <div key={i} className="bg-surface rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-primary mb-4">{stack.title}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item, j) => (
                    <li key={j} className="text-text-muted">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary">Ready to Experience THE ARENA?</h2>
          <p className="text-xl text-text-muted mb-8">
            Join the cognitive revolution. Start with quad-exposure, publish instantly, claim seniority on blockchain.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-surface border border-primary/30 rounded-lg px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary text-darker px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition"
            >
              Launch
            </button>
          </form>
          {submitted && (
            <p className="text-success mt-4">✓ Welcome to THE ARENA!</p>
          )}
        </div>
      </section>

      {/* Docs Section */}
      <section id="docs" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Documentation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quick Start',
                desc: '5-minute setup guide to get THE ARENA running locally.',
                link: '/docs/quick-start'
              },
              {
                title: 'Deployment',
                desc: 'Production deployment guide for Fly.io and Vercel.',
                link: '/docs/deployment'
              },
              {
                title: 'API Reference',
                desc: 'Complete API documentation for all endpoints.',
                link: '/docs/api'
              },
            ].map((doc, i) => (
              <Link key={i} href={doc.link} className="bg-surface rounded-lg p-8 border border-primary/20 hover:border-primary/50 transition group">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition">{doc.title}</h3>
                <p className="text-text-muted mb-4">{doc.desc}</p>
                <span className="text-primary group-hover:text-secondary transition">Read More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">THE ARENA</h3>
              <p className="text-text-muted">Unified Cognitive Operating System</p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Product</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#features" className="hover:text-primary transition">Features</a></li>
                <li><a href="#phases" className="hover:text-primary transition">Phases</a></li>
                <li><a href="#docs" className="hover:text-primary transition">Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Resources</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="https://github.com" className="hover:text-primary transition">GitHub</a></li>
                <li><a href="https://twitter.com" className="hover:text-primary transition">Twitter</a></li>
                <li><a href="https://discord.com" className="hover:text-primary transition">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Company</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-primary transition">About</a></li>
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center text-text-muted">
            <p>© 2026 NO_GAS_LABS™. All rights reserved.</p>
            <p className="mt-2">The future of thought is collaborative. The future of collaboration is cognitive.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
