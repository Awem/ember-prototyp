import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';
import ResponseHandlers from '../mixins/response-handlers';

const {
  Route,
  inject
} = Ember;
const { service } = inject;
const { host, namespace } = config.APP;
const url = `${host}/${namespace}/pictures/upload`;

export default Route.extend(AuthenticatedRouteMixin, ResponseHandlers, {
  session: service(),
  account: service(),
  model() {
    const currentUser = this.get('account.user.id');
    return this.store.findRecord('user', currentUser, { reload: true });
  },
  actions: {
    uploadImage(file) {
      const { token, email } = this.get('session.data.authenticated');
      this.controller.set('uploadErrors', null);
      file.upload({
        url: url,
        data: {
          picture: 'profile'
        },
        headers: {
          'Authorization': `Token token="${token}", email="${email}"`
        }
      }).then(
        (success) => {
          this.get('account').reloadUser();
          return this.send('actionSucceeded', success.body.picture, 'Picture uploaded', 'uploadErrors');
        },
        (failure) => {
          file.destroy();
          return this.send('actionFailed', JSON.parse(`${failure.response}`), 'uploading', 'uploadErrors', 'title');
        }
      );
    }
  }
});
