import Ember from 'ember';

export function fetchPicture(params/*, hash*/) {
  let [path='', url, defaultPicture] = params;
  if(Ember.isEmpty(url)) {
    if(path !== '' && !Ember.isEmpty(defaultPicture)) {
      url = defaultPicture;
    }
  }
  return `${path}${url}`;
}

export default Ember.Helper.helper(fetchPicture);
