'use client'

type Props = {
  scrambleId: number
}

export const SolutionAnswerInput = (props: Props) => {
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
