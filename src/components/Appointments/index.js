import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    appointmentdate: '',
    appointmentsList: [],
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      appointmentdate: event.target.value,
    })
  }

  changeStarStatus = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, appointmentdate} = this.state
    const formattedDate = format(
      new Date(appointmentdate),
      'dd MMMM yyyy, EEEE',
    )
    const newAppointment = {
      id: uuidv4(),
      title,
      appointmentdate: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      appointmentdate: '',
    }))
  }

  getStarredAppointments = () => {
    const {appointmentsList} = this.state
    const getStarred = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    this.setState({
      appointmentsList: getStarred,
    })
  }

  render() {
    const {title, appointmentdate, appointmentsList} = this.state

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="input-container">
            <div className="form-container">
              <h1>Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label className="form-label" htmlFor="name">
                  TITLE
                </label>
                <br />
                <input
                  onChange={this.onChangeTitle}
                  value={title}
                  placeholder="Title"
                  id="name"
                  type="text"
                />
                <br />
                <label className="form-label" htmlFor="date">
                  DATE
                </label>
                <br />
                <input
                  onChange={this.onChangeDate}
                  value={appointmentdate}
                  placeholder="dd/mm/yyyy"
                  id="date"
                  type="date"
                />
                <br />
                <button className="btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="img-container">
              <img
                className="image"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-container">
            <div className="head">
              <h1 className="heading">Appointments</h1>
              <button
                onClick={this.getStarredAppointments}
                className="starred-btn"
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {appointmentsList.map(eachAppointment => (
                <AppointmentItem
                  changeStarStatus={this.changeStarStatus}
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
