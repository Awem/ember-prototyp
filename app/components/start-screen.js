import Ember from 'ember';

export default Ember.Component.extend({
  swiperOptions: {
    initialSlide: 0,
    direction: 'vertical',
    slidesPerView: 'auto',
    keyboardControl: true,
    mousewheelControl: true,
    grabCursor: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next-custom',
    prevButton: '.swiper-button-prev-custom',
    buttonDisabledClass: 'disabled'
  },
  logoScreen: Ember.computed('slide', function() {
    const slide = this.get('slide');
    return slide === '0' || slide === null;
  }),
  actions: {
    home() {
      this.sendAction('home');
    },
    login() {
      this.sendAction('login');
    },
    register() {
      this.sendAction('register');
    }
  }
});
