import React from 'react';
import {Link} from 'react-router';
import HomeStore from './HomeStore'
import HomeActions from './HomeActions';
import ResponseBlock from '../ResponseBlock/ResponseBlock';
import {first, without, findWhere} from 'underscore';

var LogoStars = '../img/logo_stars.png';


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var username = this.state.username;
    var delta = this.state.delta;
    HomeActions.login(username, delta);
  }

  render() {
    return (
      <div className='container'>
        <h3 className='text-center'></h3>
        {/* <img className='center-block' width="80%" height="auto"  src={LogoStars} /> */}
        <div className='usernameInput'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className={'form-group ' + this.state.usernameValidationState}>
              <label className='control-label'>Enter a Reddit username:</label>
              <input type='password' className='form-control' ref='usernameTextField' value={this.state.username}
                      onChange={HomeActions.updateUsername} autoFocus/>
              <label className='control-label'>Enter a confidence delta between 0.0 and 1.0:</label>
              <input type='text' className='form-control' ref='deltaTextField' value={this.state.delta}
                      onChange={HomeActions.updateDelta} autoFocus/>
              <ResponseBlock response={this.state.response}/>
            </div>
            <button type='submit' className='btn btn-primary align-right'>Find matching subreddits</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
