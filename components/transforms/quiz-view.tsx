'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy } from 'lucide-react'
import { TransformsService, QuizQuestion, QuizResult } from '@/lib/api/transforms'
import { createClient } from '@/lib/supabase/client'

interface QuizViewProps {
  sessionId: string
  sessionTitle?: string
  onBack: () => void
  onQuizInfoUpdate?: (info: { currentQuestion: number; totalQuestions: number; score?: number }) => void
}

export function QuizView({ sessionId, sessionTitle, onBack, onQuizInfoUpdate }: QuizViewProps) {
  const { user } = useAuth()
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true)
        setError(null)

        const existingQuiz = await TransformsService.getQuiz(sessionId)

        if (existingQuiz.success && existingQuiz.data?.result?.questions) {
          setQuiz(existingQuiz.data.result.questions)
          onQuizInfoUpdate?.({
            currentQuestion: 1,
            totalQuestions: existingQuiz.data.result.questions.length
          })
        } else {
          const newQuiz = await TransformsService.generateQuiz(sessionId)

          if (newQuiz.success && newQuiz.data?.result?.questions) {
            setQuiz(newQuiz.data.result.questions)
            onQuizInfoUpdate?.({
              currentQuestion: 1,
              totalQuestions: newQuiz.data.result.questions.length
            })
          } else {
            setError('Failed to generate quiz')
          }
        }
      } catch (err) {
        console.error('Error loading quiz:', err)
        setError('Failed to load quiz')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      loadQuiz()
    }
  }, [sessionId, user?.id, onQuizInfoUpdate])

  const currentQuestion = quiz?.[currentQuestionIndex]

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion) return

    const correct = selectedOption === currentQuestion.correct_answer
    setIsCorrect(correct)
    setShowFeedback(true)

    const newScore = correct ? (quizResult?.score || 0) + 1 : quizResult?.score || 0
    const updatedResult: QuizResult = {
      score: newScore,
      total_questions: quiz?.length || 0,
      correct_answers: newScore,
      time_spent: (quizResult?.time_spent || 0) + 30,
      answers: [...(quizResult?.answers || []), {
        question_id: currentQuestion.id,
        selected_option: selectedOption,
        is_correct: correct,
        time_spent: 30
      }]
    }

    setQuizResult(updatedResult)
    onQuizInfoUpdate?.({
      currentQuestion: currentQuestionIndex + 1,
      totalQuestions: quiz?.length || 0,
      score: newScore
    })
  }

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    if (!quiz) return

    const result: QuizResult = {
      score: quizResult?.score || 0,
      total_questions: quiz.length,
      correct_answers: quizResult?.score || 0,
      time_spent: quizResult?.time_spent || 0,
      answers: quizResult?.answers || []
    }
    setQuizResult(result)
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setIsCorrect(false)
    setQuizResult(null)
    onQuizInfoUpdate?.({
      currentQuestion: 1,
      totalQuestions: quiz?.length || 0,
      score: 0
    })
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2 text-sm">{error || 'Could not load quiz'}</p>
          <Button onClick={onBack} size="sm">Back</Button>
        </div>
      </div>
    )
  }

  if (quizResult && currentQuestionIndex >= quiz.length) {
    const percentage = (quizResult.score / quizResult.total_questions) * 100

    return (
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <Button variant="ghost" onClick={onBack} className="hover:bg-muted">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="mb-4">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <CardTitle className="text-2xl font-bold">Quiz Completed!</CardTitle>
              <p className="text-muted-foreground">Quiz results for {sessionTitle || 'this topic'}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {Math.round(percentage)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  {quizResult.score}/{quizResult.total_questions}
                </p>
                <p className="text-lg font-semibold mt-2">Performance Score</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  {percentage >= 80 ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">Excellent! 🌟</span>
                  ) : percentage >= 60 ? (
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Good job! 👍</span>
                  ) : (
                    <span className="text-orange-600 dark:text-orange-400 font-medium">Keep practicing! 💪</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{quizResult.correct_answers}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    {quizResult.total_questions - quizResult.correct_answers}
                  </p>
                  <p className="text-xs text-muted-foreground">Incorrect</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-600">
                    {Math.floor(quizResult.time_spent / 60)}:{(quizResult.time_spent % 60).toString().padStart(2, '0')}
                  </p>
                  <p className="text-xs text-muted-foreground">Time</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button onClick={handleRestartQuiz} variant="outline" className="text-sm">
                  🔄 Retry Quiz
                </Button>
                <Button onClick={onBack} className="text-sm">
                  📚 Back to Study
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Button variant="ghost" onClick={onBack} className="hover:bg-muted">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold">
              Quiz on {sessionTitle || 'this topic'}
            </h1>
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} of {quiz.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{Math.round(((currentQuestionIndex + 1) / quiz.length) * 100)}% Complete</span>
            <span>{quiz.length - (currentQuestionIndex + 1)} questions remaining</span>
          </div>
        </div>

        {currentQuestion && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg leading-tight">
                {currentQuestion.question}
              </CardTitle>
              {currentQuestion.difficulty && (
                <div className="mt-2">
                  <Badge variant={
                    currentQuestion.difficulty === 'easy' ? 'default' :
                    currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'
                  }>
                    {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index
                  const isCorrectOption = index === currentQuestion.correct_answer
                  const showCorrectness = showFeedback && isCorrectOption
                  const showIncorrectness = showFeedback && isSelected && !isCorrect

                  return (
                    <button
                      key={index}
                      onClick={() => !showFeedback && setSelectedOption(index)}
                      disabled={showFeedback}
                      className={`
                        w-full text-left p-3 rounded-lg border transition-colors
                        ${isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }
                        ${showCorrectness
                          ? 'border-green-500 bg-green-50 dark:bg-green-500/10'
                          : showIncorrectness
                          ? 'border-red-500 bg-red-50 dark:bg-red-500/10'
                          : ''
                        }
                        ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`
                          font-medium
                          ${showCorrectness ? 'text-green-700 dark:text-green-400' :
                            showIncorrectness ? 'text-red-700 dark:text-red-400' :
                            isSelected ? 'text-primary' :
                            'foreground'
                          }
                        `}>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground font-bold mr-2 text-xs">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </span>
                        <div className="flex items-center gap-2">
                          {isSelected && !showFeedback && (
                            <div className="w-4 h-4 rounded-full bg-primary" />
                          )}
                          {showCorrectness && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {showIncorrectness && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {showFeedback && (
                <div className={`
                  p-4 rounded-lg border
                  ${isCorrect
                    ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-200 bg-red-50 dark:bg-red-900/20'
                  }
                `}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={`
                        font-semibold
                        ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}
                      `}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </p>

                      {!isCorrect && (
                        <div className="mt-2 p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Correct answer:</p>
                          <p className="text-base font-medium">
                            {String.fromCharCode(65 + currentQuestion.correct_answer)}. {currentQuestion.options[currentQuestion.correct_answer]}
                          </p>
                        </div>
                      )}

                      {currentQuestion.explanation && (
                        <div className="mt-2 p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Explanation:</p>
                          <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4">
                {showFeedback ? (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex < quiz.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                  >
                    Submit Answer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}