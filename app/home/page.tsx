'use client'

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Brain,
  Zap,
  Upload,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  BarChart3,
  Clock
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const menuItems = [
    { icon: Home, label: 'Home', href: '/home' },
    { icon: Upload, label: 'Upload', href: '/upload' },
    { icon: BookOpen, label: 'Sessions', href: '/sessions' },
    { icon: FileText, label: 'Documents', href: '/documents' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  ]

  const sidebarItems = [
    { icon: Clock, label: 'Recent Activity' },
    { icon: Brain, label: 'AI Suggestions' },
    { icon: Zap, label: 'Quick Actions' },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 border-r bg-card">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Peak Study AI</h1>
                <p className="text-xs text-muted-foreground">Learn Smarter</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <Button
                  key={item.href}
                  variant={index === 0 ? "secondary" : "ghost"}
                  className="w-full justify-start h-10"
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Workspace Section */}
            <div className="mb-3">
              <p className="text-xs font-medium text-muted-foreground mb-2 px-2">WORKSPACE</p>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                  Personal
                </Button>
                <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3" />
                  Study Group
                </Button>
              </div>
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t bg-muted/30">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-accent">
                  <div className="flex items-center gap-3 w-full min-w-0">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="text-xs">
                        {user?.user_metadata?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user?.user_metadata?.name || user?.email}
                      </p>
                      <p className="text-xs text-muted-foreground">Free Plan</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/billing')}>
                  <span className="mr-2">💳</span>
                  Billing
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={signOut} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Center Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">Ready to transform your content into intelligent learning materials?</p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/upload')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Upload videos, audio, PDFs, or text to start learning
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Study Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Continue your latest learning sessions
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get help from your AI learning assistant
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sessions */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Recent Sessions</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Machine Learning Basics</h3>
                        <p className="text-sm text-muted-foreground">Started 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Web Development Course</h3>
                        <p className="text-sm text-muted-foreground">Started yesterday</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Contextual Info */}
        <div className="w-64 border-l bg-card/50 p-6">
          <div className="space-y-6">
            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Completed flashcards</p>
                  <p className="text-muted-foreground">ML Basics • 30 min ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Uploaded new document</p>
                  <p className="text-muted-foreground">React Tutorial • 2 hours ago</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* AI Suggestions */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Suggestions
              </h3>
              <div className="space-y-3">
                <Card className="p-3">
                  <p className="text-sm">
                    Review your Machine Learning flashcards - you're 85% ready!
                  </p>
                </Card>
                <Card className="p-3">
                  <p className="text-sm">
                    Try uploading a video for better engagement
                  </p>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat with AI
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Summary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}