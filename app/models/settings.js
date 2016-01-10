//import StorageObject from 'ember-local-storage/local/object';
import StorageObject from 'ember-local-storage/session/object';

export default StorageObject.extend({
  storageKey: 'settings',
  initialContent: {
    startScreenSeen: false
  }
});
