'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  FileText,
  Video,
  Mic,
  MessageSquare,
  Clock,
  MoreVertical,
  CheckCircle,
  XCircle,
  Loader2,
  File,
  Headphones,
  Youtube,
  Keyboard,
  FileEdit
} from 'lucide-react'
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

interface SessionListProps {
  onSessionClick?: (sessionId: string) => void
}

export function SessionList({ onSessionClick }: SessionListProps) {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!user) return

    const fetchSessions = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) {
          throw error
        }

        setSessions(data || [])
      } catch (err) {
        console.error('Error fetching sessions:', err)
        setError('Failed to load sessions')
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()

    // Set up real-time subscription for session updates
    const channel = supabase
      .channel('user-sessions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sessions',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Real-time session update:', payload)

          // Refresh sessions when there are changes
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            fetchSessions()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase])

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />
      case 'text':
        return <FileEdit className="h-4 w-4 text-blue-600" />
      case 'audio':
        return <Headphones className="h-4 w-4 text-green-600" />
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />
      case 'manual':
        return <Keyboard className="h-4 w-4 text-purple-600" />
      default:
        return <File className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case 'processing':
        return (
          <Badge variant="secondary">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const handleSessionClick = (sessionId: string) => {
    if (onSessionClick) {
      onSessionClick(sessionId)
    } else {
      router.push(`/sessions/${sessionId}`)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardContent>
      </Card>
    )
  }

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
          <p className="text-muted-foreground mb-4">
            Start by uploading your first document or content
          </p>
          <Button onClick={() => router.push('/upload')}>
            Create Your First Session
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card
          key={session.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleSessionClick(session.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  {getSourceIcon(session.source)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1 truncate">
                    {session.title || 'Untitled Session'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatRelativeTime(session.created_at)}</span>
                    {session.input_meta?.fileName && (
                      <span className="text-xs">• {session.input_meta.fileName}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {getStatusBadge(session.status)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    // TODO: Show session menu
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}