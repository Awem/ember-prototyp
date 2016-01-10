import Ember from 'ember';

export function numberPrecision(params/*, hash*/) {
  if(!Ember.isEmpty(params[0])) {
    const [number, precision = 2] = params;
    return parseFloat(number).toFixed(precision);
  }
}

export default Ember.Helper.helper(numberPrecision);
