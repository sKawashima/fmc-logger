'use server'

import { updateUserShowId } from '@/services/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const ERR_ID_IN_USE = 'This ID is already in use'

export async function setUserShowId(formData: FormData) {
  const showId = formData.get('showId') as string

  if (!showId) {
    throw new Error('Show ID is required')
  }

  try {
    const updatedUser = await updateUserShowId(showId)

    if (updatedUser === 'already exists') {
      throw new Error(ERR_ID_IN_USE)
    }

    // Revalidate and redirect to home page
    revalidatePath('/')
    redirect('/')
  } catch (error) {
    if (error instanceof Error && error.message === ERR_ID_IN_USE) {
      throw error
    }
    throw new Error('Failed to set user ID')
  }
}

export async function setUserShowIdFromData(showId: string) {
  if (!showId) {
    throw new Error('Show ID is required')
  }

  try {
    const updatedUser = await updateUserShowId(showId)

    if (updatedUser === 'already exists') {
      throw new Error(ERR_ID_IN_USE)
    }

    // Revalidate the layout to update user info
    revalidatePath('/', 'layout')
    revalidatePath('/user/setId')

    return { success: true, user: updatedUser }
  } catch (error) {
    if (error instanceof Error && error.message === ERR_ID_IN_USE) {
      throw error
    }
    throw new Error('Failed to set user ID')
  }
}
