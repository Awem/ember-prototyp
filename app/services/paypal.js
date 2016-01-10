import Ember from 'ember';

export default Ember.Service.extend({
  openMinibrowser(url, callback) {
    const ua = navigator.userAgent;
    let win;
    let winOpened = false;

    // mobile device (open in new window)
    if (ua.match(/iPhone|iPod|Android|Blackberry.*WebKit/i)) {
      win = window.open(url,'_blank');
      winOpened = true;
    } else {
      // Desktop (open in minibrowser)
      const width = 400;
      const height = 550;
      let left;
      let top;

      if (window.outerWidth) {
        left = Math.round((window.outerWidth - width) / 2) + window.screenX;
        top = Math.round((window.outerHeight - height) / 2) + window.screenY;
      } else if (window.screen.width) {
        left = Math.round((window.screen.width - width) / 2);
        top = Math.round((window.screen.height - height) / 2);
      }

      win = window.open(url, '_blank', `top=${top}, left=${left}, width=${width}, height=${height}, location=0, status=0, toolbar=0, menubar=0, resizable=0, scrollbars=1`);
      winOpened = true;
    }

    if (winOpened) {
      let pollingInterval = 0;
      const checkWindow = function() {
        if (win && win.closed) {
          clearInterval(pollingInterval);
          callback();
        }
      };
      pollingInterval = setInterval(checkWindow, 100);
    }
  }
});
