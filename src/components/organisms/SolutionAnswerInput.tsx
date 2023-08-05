'use client'

export const SolutionAnswerInput = () => {
  return (
    <div>
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
          console.log(solutionInputElement.value, commentInputElement.value)
        }}
      >
        submit
      </button>
    </div>
  )
}
