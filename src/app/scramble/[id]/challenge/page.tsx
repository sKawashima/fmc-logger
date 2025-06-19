'use client'

import { FormInputSolutionAnswer } from '@/components/organisms/FormInputSolutionAnswer'
import { getScramble } from '@/services/scramble'
import { getSolution } from '@/services/solution'
import { getUser } from '@/services/user'
import { Button } from '@heroui/react'
import { notFound, redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export default function ScrambleChallengePage({ params }: Props) {
  const [scrambleId, setScrambleId] = useState<number | null>(null)
  const [scramble, setScramble] = useState<string | null>(null)
  const [showScramble, setShowScramble] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [solution, setSolution] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { id } = await params
        const scrambleIdNum = Number(id)
        setScrambleId(scrambleIdNum)

        const [scrambleData, userData] = await Promise.all([
          getScramble(scrambleIdNum),
          getUser()
        ])

        if (!scrambleData) {
          notFound()
          return
        }

        setScramble(scrambleData.scramble)
        setUser(userData)

        if (userData) {
          const solutionData = await getSolution(scrambleIdNum, userData.email)
          setSolution(solutionData)
          
          if (solutionData) {
            redirect(`/scramble/${id}`)
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>ログインが必要です</div>
  }

  if (solution) {
    redirect(`/scramble/${scrambleId}`)
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">スクランブル {scrambleId} - チャレンジ</h1>
      
      {!showScramble ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            スクランブルを表示して、挑戦を開始しましょう！
          </p>
          <Button 
            variant="solid" 
            color="primary" 
            size="lg"
            onClick={() => setShowScramble(true)}
          >
            スクランブルを表示
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">スクランブル:</h2>
            <p className="text-xl font-mono bg-white p-4 rounded border">
              {scramble}
            </p>
          </div>
          
          {scrambleId && (
            <FormInputSolutionAnswer scrambleId={scrambleId} />
          )}
        </div>
      )}
    </div>
  )
}