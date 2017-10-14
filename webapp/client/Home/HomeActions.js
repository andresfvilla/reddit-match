import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateDisplayName',
      'updatePassword',
      'updateUsername',
      'updateDelta',
      'invalidDisplayName',
      'invalidPassword',
      'invalidUsername',
    );
  }

  login(username, delta) {
    $.ajax({
      type: 'POST',
      url: '/api/v1/getComments/' + username + '/' + delta,
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
