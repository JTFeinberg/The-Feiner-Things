import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Proptypes from 'prop-types'
import Form from './styles/Form'
import Error from './ErrorMessage'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`

export default class Reset extends Component {
  static propTypes = {
    resetToken: Proptypes.string.isRequired
  }
  state = {
    password: '',
    confirmPassword: ''
  }
  saveToState = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}>
        {(resetPassword, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              await resetPassword()
              this.setState({ email: '' })
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              <Error error={error} />
              {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Request Reset!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
