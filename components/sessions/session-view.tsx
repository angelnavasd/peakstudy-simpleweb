'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Session {
  id: string
  title: string
  source: 'pdf' | 'text' | 'audio' | 'youtube' | 'manual'
  status: 'processing' | 'completed' | 'failed' | 'archived'
  created_at: string
  updated_at: string
  input_meta?: {
    fileName?: string
    fileSize?: number
    processingStartedAt?: string
    [key: string]: any
  }
}

interface Output {
  id: string
  session_id: string
  raw_text: string
  clean_text: string
  meta: any
  content_hash: string
  updated_at: string
}

interface SessionViewProps {
  sessionId: string
  onBack: () => void
  onTitleUpdate?: (title: string) => void
}

export function SessionView({ sessionId, onBack, onTitleUpdate }: SessionViewProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [output, setOutput] = useState<Output | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!user || !sessionId) return

    const fetchSessionData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch session
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .select('*')
          .eq('id', sessionId)
          .single()

        if (sessionError) {
          throw sessionError
        }

        // Fetch output
        const { data: outputData, error: outputError } = await supabase
          .from('outputs')
          .select('*')
          .eq('session_id', sessionId)
          .single()

        setSession(sessionData)
        setOutput(outputData)

        // Update parent component with session title
        if (onTitleUpdate && sessionData.title) {
          onTitleUpdate(sessionData.title)
        }
      } catch (err) {
        console.error('Error fetching session:', err)
        setError('Failed to load session')
      } finally {
        setLoading(false)
      }
    }

    fetchSessionData()

    // Set up real-time subscription for updates
    const channel = supabase
      .channel(`session-detail-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sessions',
          filter: `id=eq.${sessionId}`
        },
        (payload) => {
          console.log('Session update:', payload)
          const updatedSession = payload.new
          setSession(updatedSession)

          // Update parent component if title changes
          if (onTitleUpdate && updatedSession.title) {
            onTitleUpdate(updatedSession.title)
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'outputs',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          console.log('Output update:', payload)
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setOutput(payload.new)
          } else if (payload.eventType === 'DELETE') {
            setOutput(null)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, sessionId, supabase, onTitleUpdate])

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">{error || 'Session not found'}</p>
            <Button onClick={onBack}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'processing':
        return (
          <Badge variant="secondary">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        )
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">
                {session.title || 'Untitled Session'}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(session.status)}
                {session.input_meta?.fileName && (
                  <span className="text-sm text-muted-foreground">
                    {session.input_meta.fileName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {session.status === 'processing' ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Processing Content</h3>
              <p className="text-muted-foreground">
                Your content is being processed. Please wait...
              </p>
            </CardContent>
          </Card>
        ) : session.status === 'failed' ? (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2 text-red-600">Processing Failed</h3>
              <p className="text-muted-foreground mb-4">
                {session.error_message || 'An error occurred while processing your content.'}
              </p>
              <Button onClick={onBack} variant="outline">
                Go Back to Sessions
              </Button>
            </CardContent>
          </Card>
        ) : output?.clean_text || output?.raw_text ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Processed Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {output.clean_text || output.raw_text}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No Content Available</h3>
              <p className="text-muted-foreground mb-4">
                This session doesn't have any processed content yet.
              </p>
              <Button onClick={onBack} variant="outline">
                Go Back to Sessions
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}