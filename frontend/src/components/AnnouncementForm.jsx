import { useState } from "react"
import { useAnnouncementsContext } from "../hooks/useAnnouncementsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const AnnouncementForm = () => {
  const { dispatch } = useAnnouncementsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [typeOfJob, setTypeOfJob] = useState('')
  const [salary, setSalary] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const announcement = { title, description, typeOfJob }

    const response = await fetch('/api/announcements', {
      method: 'POST',
      body: JSON.stringify(announcement),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setDescription('')
      setTypeOfJob('')
      setSalary('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_ANNOUNCEMENT', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New announcement</h3>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <textarea
        cols="50" rows="4"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <br />
      <br />
      <label>Type of job</label>
      <select className={emptyFields.includes('typeOfJob') ? 'error' : ''} onChange={(e) => setTypeOfJob(e.target.value)}
        style={{ width: "100%", padding: "8px 2px" }}>
        <option value="">Select Type of Job</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Office">Office</option>
      </select>
      <br />
      <br />

      <label>Salary [Min - Max]:</label>
      <input
        type="text"
        onChange={(e) => setSalary(e.target.value)}
        value={salary}
        className={emptyFields.includes('salary') ? 'error' : ''}
      />

      <button>Add announcement</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AnnouncementForm