import { useAnnouncementsContext } from '../hooks/useAnnouncementsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const AnnouncementDetails = ({ announcement }) => {
  const { dispatch } = useAnnouncementsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/announcements/' + announcement._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_ANNOUNCEMENT', payload: json})
    }
  }

  return (
    <div className="announcement-details">
      <h4>{announcement.title}</h4>
      <p><strong>Load (kg): </strong>{announcement.load}</p>
      <p><strong>Reps: </strong>{announcement.reps}</p>
      <p>{formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default AnnouncementDetails