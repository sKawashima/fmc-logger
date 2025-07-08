'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from '@heroui/react'
import { scoreToText } from '@/services/solution'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
type SolutionWithUser = {
  id: string | number
  userId: string
  scrambleId: number
  solution: string
  comment?: string | null
  score?: number | null
  createdAt?: Date
  updatedAt?: Date
  user?: {
    showId?: string | null
    email?: string | null
  } | null
}

type Props = {
  scramble: string
  userSolution?: SolutionWithUser
  allSolutions: SolutionWithUser[]
  currentUserEmail?: string
}

export function ScrambleResultsSection({
  scramble,
  userSolution,
  allSolutions,
  currentUserEmail,
}: Props) {
  const [showScramble, setShowScramble] = useState(false)
  const [showAllAnswers, setShowAllAnswers] = useState(false)
  const t = useTranslations('scramble')

  const shouldShowContent = userSolution || showAllAnswers

  return (
    <div className="space-y-6">
      {/* Scramble Card */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{t('title')}</h2>
        </CardHeader>
        <CardBody>
          {!shouldShowContent ? (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">{t('notChallenged')}</p>
              <Button
                color="primary"
                variant="solid"
                onPress={() => setShowAllAnswers(true)}
              >
                {t('showAllAnswers')}
              </Button>
            </div>
          ) : showScramble ? (
            <p className="font-mono text-lg bg-gray-50 p-4 rounded-lg">
              {scramble}
            </p>
          ) : (
            <div className="text-center py-4">
              <Button
                color="primary"
                variant="flat"
                onPress={() => setShowScramble(true)}
              >
                {t('showButton')}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* User's Solution */}
      {userSolution && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">{t('yourAnswer')}</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">{t('score')}</h3>
              <Chip
                color={userSolution.score ? 'success' : 'danger'}
                variant="solid"
                size="lg"
                className="text-lg font-bold"
              >
                {scoreToText(userSolution.score || null)}
              </Chip>
            </div>

            <Divider />

            <div>
              <h3 className="text-lg font-medium mb-2">{t('solution')}</h3>
              <p className="font-mono text-base bg-gray-50 p-4 rounded-lg">
                {userSolution.solution}
              </p>
            </div>

            {userSolution.comment && (
              <>
                <Divider />
                <div>
                  <h3 className="text-lg font-medium mb-2">{t('notes')}</h3>
                  <p className="text-base bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {userSolution.comment}
                  </p>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      )}

      {/* All Solutions */}
      {shouldShowContent && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">{t('everyonesAnswers')}</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {allSolutions.map((solution, index) => (
                <div key={solution.id}>
                  {index > 0 && <Divider className="my-4" />}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          #{index + 1}
                        </span>
                        {solution.user?.showId ? (
                          <Link
                            href={`/user/${solution.user.showId}`}
                            className="text-blue-600 hover:underline"
                          >
                            {solution.user.showId}
                          </Link>
                        ) : (
                          <span className="text-gray-400">
                            {solution.user?.email === currentUserEmail
                              ? t('you')
                              : t('anonymous')}
                          </span>
                        )}
                      </div>
                      <Chip
                        color={solution.score ? 'success' : 'danger'}
                        variant="flat"
                        size="md"
                      >
                        {scoreToText(solution.score || null)}
                      </Chip>
                    </div>

                    <div>
                      <p className="font-mono text-sm bg-gray-50 p-3 rounded-lg">
                        {solution.solution}
                      </p>
                    </div>

                    {solution.comment && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {t('notesLabel')}
                        </p>
                        <p className="text-sm bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                          {solution.comment}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
