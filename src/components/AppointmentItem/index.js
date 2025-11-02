import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, changeStarStatus} = props
  const {id, title, appointmentdate, isStarred} = appointmentDetails

  const addFavourite = () => {
    changeStarStatus(id)
  }

  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listItem">
      <div className="title-star">
        <p className="title">{title}</p>
        <button
          onClick={addFavourite}
          data-testid="star"
          className="star-btn"
          type="button"
        >
          <img className="star-img" alt="star" src={star} />
        </button>
      </div>
      <p>{appointmentdate}</p>
    </li>
  )
}
export default AppointmentItem
