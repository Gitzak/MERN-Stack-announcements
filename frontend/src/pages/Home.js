import { useEffect }from 'react'
import { useAnnouncementsContext } from "../hooks/useAnnouncementsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import AnnouncementDetails from '../components/AnnouncementDetails'
import AnnouncementForm from '../components/AnnouncementForm'

const Home = () => {
  const {announcements, dispatch} = useAnnouncementsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch('/api/announcements', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_ANNOUNCEMENTS', payload: json})
      }
    }

    if (user) {
      fetchAnnouncements()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="announcements">
        {announcements && announcements.map((announcement) => (
          <AnnouncementDetails key={announcement._id} announcement={announcement} />
        ))}
      </div>
      <AnnouncementForm />
    </div>
  )
}

export default Home