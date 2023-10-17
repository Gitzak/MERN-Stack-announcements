import { useAuthContext } from './useAuthContext'
import { useAnnouncementsContext } from './useAnnouncementsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchAnnouncements } = useAnnouncementsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchAnnouncements({ type: 'SET_ANNOUNCEMENTS', payload: null })
  }

  return { logout }
}