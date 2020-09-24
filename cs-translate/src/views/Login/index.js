import React, { Component } from 'react'
import { auth } from '../../firebase'
import { NavLink } from 'react-router-dom'

class ExampleLogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      currentUser: null
    }
  }
  onSubmit = e => {
    const { email, password } = this.state
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user)
        this.setState({
          currentUser: res.user
        })
      })
      .catch(err => console.log(err))
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const { currentUser } = this.state

    if (currentUser) {
      return (
        <div>
          <p style={{ color: 'black' }}>Hello {currentUser.email}</p>
          {/* <button onClick={this.logout}>Logout</button> */}
        </div>
      )
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Sign In</h3>

        <div>
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={this.onChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={this.onChange}
          />
        </div>

        <button type="submit" className="button1">
          Sign In
        </button>
        <p className="have-an-account text-left">
          Do not have ab account?{' '}
          <NavLink to="/sign-up" activeClassName="is-active">
            sign-up
          </NavLink>
        </p>
      </form>
    )
  }
}

export default ExampleLogIn
