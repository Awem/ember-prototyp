import Ember from 'ember';

export function truncateString(params/*, hash*/) {
  if(!Ember.isEmpty(params[0])) {
    const [string, length = 36] = params;
    if (string.length > length) {
      return `${string.substring(0, length)}...`;
    } else {
      return string;
    }
  }
}

export default Ember.Helper.helper(truncateString);
