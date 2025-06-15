'use server'

import { makeSolution } from '@/services/solution'
import { getUser } from '@/services/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSolution(formData: FormData) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const scrambleId = Number(formData.get('scrambleId'))
  const solution = formData.get('solution') as string
  const comment = formData.get('comment') as string | undefined

  if (!scrambleId || !solution) {
    throw new Error('Missing required fields')
  }

  try {
    const newSolution = await makeSolution(
      user.email,
      scrambleId,
      solution,
      comment,
    )

    // Revalidate the scramble page to show the new solution
    revalidatePath(`/scramble/${scrambleId}`)

    return { success: true, solution: newSolution }
  } catch (error) {
    throw new Error('Failed to create solution')
  }
}

export async function createSolutionFromData(
  scrambleId: number,
  solution: string,
  comment?: string,
) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  if (!scrambleId || !solution) {
    throw new Error('Missing required fields')
  }

  try {
    const newSolution = await makeSolution(
      user.email,
      scrambleId,
      solution,
      comment,
    )

    // Revalidate the scramble page to show the new solution
    revalidatePath(`/scramble/${scrambleId}`)

    return { success: true, solution: newSolution }
  } catch (error) {
    throw new Error('Failed to create solution')
  }
}
