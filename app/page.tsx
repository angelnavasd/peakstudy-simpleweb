'use client'

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { BookOpen, Brain, Zap } from "lucide-react"

export default function Home() {
  const { user, loading, signInWithGoogle } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push("/home")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Content into
              <span className="block text-primary">Intelligent Learning Materials</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload videos, audio, PDFs, or text and get AI-powered flashcards, summaries, and interactive quizzes that enhance your learning.
            </p>
            <Button onClick={signInWithGoogle} size="lg" className="gap-2">
              Get Started
              <Zap className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Upload Content</h3>
                <p className="text-muted-foreground">
                  Upload videos, audio files, PDFs, or paste text directly into the platform.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. AI Processing</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes and transforms your content into structured learning materials.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Learn Smarter</h3>
                <p className="text-muted-foreground">
                  Study with interactive flashcards, quizzes, and summaries tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border py-4 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">© 2025 Peak Study AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
