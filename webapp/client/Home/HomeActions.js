import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateDisplayName',
      'updatePassword',
      'updateEmail',
      'updateDelta',
      'invalidDisplayName',
      'invalidPassword',
      'invalidEmail',
    );
  }

  login(email, delta) {
    $.ajax({
      type: 'POST',
      url: '/api/v1/getComments/' + email + '/' + delta,
    })
      .done((data) => {
        this.actions.loginSuccess(data);
        console.log(data);
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);
