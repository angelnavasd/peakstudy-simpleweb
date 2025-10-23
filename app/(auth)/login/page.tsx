'use client'

import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { Chrome } from 'lucide-react'

export default function LoginPage() {
  const { signInWithGoogle, loading } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Peak Study AI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Transform your content into intelligent learning materials
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2"
          >
            <Chrome className="h-5 w-5" />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>

          <p className="text-center text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}