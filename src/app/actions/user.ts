'use server'

import { updateUserShowId } from '@/services/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function setUserShowId(formData: FormData) {
  const showId = formData.get('showId') as string

  if (!showId) {
    throw new Error('Show ID is required')
  }

  try {
    const updatedUser = await updateUserShowId(showId)

    if (updatedUser === 'already exists') {
      throw new Error('このIDは既に使用されています')
    }

    // Revalidate and redirect to home page
    revalidatePath('/')
    redirect('/')
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'このIDは既に使用されています'
    ) {
      throw error
    }
    throw new Error('ユーザーID設定に失敗しました')
  }
}

export async function setUserShowIdFromData(showId: string) {
  if (!showId) {
    throw new Error('Show ID is required')
  }

  try {
    const updatedUser = await updateUserShowId(showId)

    if (updatedUser === 'already exists') {
      throw new Error('このIDは既に使用されています')
    }

    // Revalidate the layout to update user info
    revalidatePath('/', 'layout')

    return { success: true, user: updatedUser }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'このIDは既に使用されています'
    ) {
      throw error
    }
    throw new Error('ユーザーID設定に失敗しました')
  }
}
