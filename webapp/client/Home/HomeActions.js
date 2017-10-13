import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateDisplayName',
      'updatePassword',
      'updateEmail',
      'invalidDisplayName',
      'invalidPassword',
      'invalidEmail',
    );
  }

  login(email) {
    $.ajax({
      type: 'POST',
      url: '/api/v1/getComments/' + email,
    })
      .done((data) => {
        this.actions.loginSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);
