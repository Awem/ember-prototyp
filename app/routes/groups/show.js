import Ember from 'ember';
import config from '../../config/environment';
import ResponseHandlers from '../../mixins/response-handlers';
const {
  Route,
  inject
  } = Ember;
const { service } = inject;
const { host, namespace } = config.APP;
const url = `${host}/${namespace}/pictures/upload`;

export default Route.extend(ResponseHandlers, {
  session: service(),
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('showSave', false);
  },
  actions: {
    uploadImage(file) {
      const model = this.controller.get('model');
      const { token, email } = this.get('session.data.authenticated');
      this.controller.set('uploadErrors', null);
      file.upload({
        url: url,
        data: {
          picture: 'group',
          modelId: model.id
        },
        headers: {
          'Authorization': `Token token="${token}", email="${email}"`
        }
      }).then(
        (success) => {
          this.controller.get('model').reload();
          return this.send('actionSucceeded', success.body.picture, 'Group logo set to picture', 'Picture uploaded', 'uploadErrors');
        },
        (failure) => {
          file.destroy();
          return this.send('actionFailed', JSON.parse(`${failure.response}`), 'uploading', 'uploadErrors', 'title');
        }
      );
    }
  }
});
