'use client'

import { getScramble } from '@/services/scramble'
import { getAllSolutionsForScramble, getSolution, scoreToText } from '@/services/solution'
import { getUser } from '@/services/user'
import { Button, Card, CardBody, Avatar } from '@heroui/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import { User } from '@/services/user'
import { Solution, Scramble } from '@prisma/client'
import Loading from './challenge/loading'

type Props = {
  params: Promise<{ id: string }>
}


export default function ScramblePage({ params }: Props) {
  const [scrambleId, setScrambleId] = useState<number | null>(null)
  const [scramble, setScramble] = useState<Scramble | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userSolution, setUserSolution] = useState<Solution | null>(null)
  const [allSolutions, setAllSolutions] = useState<(Solution & { user: { id: string; name: string | null; showId: string | null; image: string | null } })[]>([])
  const [showDetails, setShowDetails] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { id } = await params
        const scrambleIdNum = Number(id)
        setScrambleId(scrambleIdNum)

        const [scrambleData, userData, solutionsData] = await Promise.all([
          getScramble(scrambleIdNum),
          getUser(),
          getAllSolutionsForScramble(scrambleIdNum)
        ])

        if (!scrambleData) {
          notFound()
          return
        }

        setScramble(scrambleData)
        setUser(userData)
        setAllSolutions(solutionsData)

        if (userData) {
          const userSol = await getSolution(scrambleIdNum, userData.email)
          setUserSolution(userSol)
          if (userSol) {
            setShowDetails(true)
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
    return <Loading />
  }

  const canShowDetails = userSolution || showDetails

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">スクランブル {scrambleId}</h1>
        {!userSolution && (
          <Link href={`/scramble/${scrambleId}/challenge`}>
            <Button variant="solid" color="primary">
              挑戦する
            </Button>
          </Link>
        )}
      </div>

      {canShowDetails && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">スクランブル:</h2>
          <p className="text-xl font-mono bg-white p-4 rounded border">
            {scramble?.scramble}
          </p>
        </div>
      )}

      {!canShowDetails && (
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            スクランブルとみんなの解答を見るには、先に挑戦するか下のボタンをクリックしてください。
          </p>
          <Button 
            variant="solid" 
            color="secondary"
            onClick={() => setShowDetails(true)}
          >
            みんなの回答を表示
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          挑戦ログ ({allSolutions.length}人が挑戦)
        </h2>
        
        {allSolutions.length === 0 ? (
          <p className="text-gray-500">まだ誰も挑戦していません。</p>
        ) : (
          <div className="space-y-3">
            {allSolutions.map((solution, index) => (
              <Card key={solution.id} className={userSolution?.id === solution.id ? "border-blue-500 border-2" : ""}>
                <CardBody className="flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-gray-500 min-w-[2rem]">
                      #{index + 1}
                    </div>
                    <Avatar
                      src={solution.user.image || undefined}
                      name={solution.user.name || solution.user.showId || 'User'}
                      size="sm"
                    />
                    <div>
                      <p className="font-semibold">
                        {solution.user.showId || solution.user.name || 'User'}
                        {userSolution?.id === solution.id && (
                          <span className="ml-2 text-blue-600 text-sm">(あなた)</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(solution.createdAt).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {scoreToText(solution.score)}
                    </p>
                  </div>
                </CardBody>
                {canShowDetails && solution.solution && (
                  <CardBody className="pt-0 border-t">
                    <div className="space-y-2">
                      <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                        {solution.solution}
                      </p>
                      {solution.comment && (
                        <p className="text-sm text-gray-600 italic">
                          "{solution.comment}"
                        </p>
                      )}
                    </div>
                  </CardBody>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
