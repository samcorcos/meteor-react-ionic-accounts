Settings = React.createClass({
  render() {
    return (
      <div>
        <Profile ionModal={this.props.ionModal} />
        <SettingsList ionModal={this.props.ionModal} />
      </div>
    )
  }
});

Profile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    if (Meteor.loggingIn()) {
      this.setState({
        loginStatus: false
      })
    }
    if (Meteor.user()) {
      this.setState({
        loginStatus: true
      })
    }
    return {
      user: Meteor.user(),
      userLoading: Meteor.loggingIn()
    }
  },
  getInitialState() {
    return {
      loginStatus: false
    }
  },
  render() {
    if (this.data.userLoading) {
      return <AppLoading />
    }
    return (
      <div className="profile-wrapper">
        <div className="image-wrapper">
          <img src={this.data.user.profile.image} />
        </div>
        <div className="login-wrapper">
          {this.state.loginStatus ? <LoggedIn ionModal={this.props.ionModal} /> : <NotLoggedIn ionModal={this.props.ionModal} />}
        </div>
      </div>
    )
  }
})

LoggedIn = React.createClass({
  logOut() {
    Meteor.logout()
  },
  render() {
    return (
      <div>
        <a onClick={this.logOut}>Logout</a> | <a onClick={this.props.ionModal.bind(null, "Profile")}>Profile</a>
      </div>
    )
  }
})

NotLoggedIn = React.createClass({
  logIn(user, pass) {
    Meteor.loginWithPassword(user, pass)
  },
  render() {
    return (
      <div>
        <a onClick={this.props.ionModal}>Login</a>
      </div>
    )
  }
})

SettingsList = React.createClass({
  getDefaultProps() {
    return {
      settings: ["Setting 1", "Setting 2", "Setting 3"]
    }
  },
  render() {
    let list = this.props.settings.map((setting) => {
      return (
        <div onClick={this.props.ionModal.bind(null, setting)} className="item" key={setting}>
          <h2>{setting}</h2>
        </div>
      )
    })
    return (
      <div className="list">
        {list}
      </div>
    )
  }
})
