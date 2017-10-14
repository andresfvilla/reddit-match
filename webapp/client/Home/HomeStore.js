import alt from '../alt';
import HomeActions from './HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.email = '';
    this.delta = '';
    this.password = '';
    this.response = '';
    this.usernameValidationState = '';
    this.passwordValidationState = '';
  }

  onLoginSuccess(data) {
    // window.location.replace("/profile");
    this.displayNameValidationState = 'has-success';
    this.response = data;
  }

  onLoginFail(errorMessage) {
    this.displayNameValidationState = 'has-error';
    this.response = errorMessage;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
    this.usernameValidationState = '';
    this.response = '';
  }
  onUpdateDelta(event) {
    this.delta = event.target.value;
    this.usernameValidationState = '';
    this.response = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.passwordValidationState = '';
    this.response = '';
  }

  onInvalidEmail() {
    this.usernameValidationState = 'has-error';
    this.response = 'Please enter an email.';
  }

  onInvalidPassword() {
    this.passwordValidationState = 'has-error';
    this.response = 'Please enter a password.';
  }
}

export default alt.createStore(HomeStore);
