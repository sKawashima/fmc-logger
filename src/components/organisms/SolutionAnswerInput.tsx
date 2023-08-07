'use client'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import { useState } from 'react'

type Props = {
  scrambleId: number
}

export const SolutionAnswerInput = (props: Props) => {
  const [solutionError, setSolutionError] = useState<string | null>(null)
  return (
    <div>
      <p>{solutionError}</p>
      <textarea id="solutionInput" />
      <textarea id="commentInput" />
      <button
        onClick={async () => {
          const solutionInputElement = document.getElementById(
            'solutionInput',
          ) as HTMLTextAreaElement
          const commentInputElement = document.getElementById(
            'commentInput',
          ) as HTMLTextAreaElement
          if (!solutionInputElement || !commentInputElement) return
          try {
            cubeNotationNormalizer(solutionInputElement.value)
          } catch (e) {
            setSolutionError('回転記号が正しくありません')
            return
          }
          setSolutionError(null)
          const responce = await fetch('/api/solution', {
            method: 'POST',
            body: JSON.stringify({
              scrambleId: props.scrambleId,
              solution: solutionInputElement.value,
              comment: commentInputElement.value,
            }),
          })
          console.log(responce)
        }}
      >
        submit
      </button>
    </div>
  )
}
