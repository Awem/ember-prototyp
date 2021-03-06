import ActiveModelAdapter from 'active-model-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
  host: config.APP.host,
  namespace: config.APP.namespace,
  authorizer: 'authorizer:application',
  shouldReloadAll() { return true; }
});
