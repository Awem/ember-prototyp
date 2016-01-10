export function initialize( container, application ) {
  application.inject('controller', 'imagesService', 'service:images');
  application.inject('component', 'imagesService', 'service:images');
}

export default {
  name: 'images-service',
  initialize: initialize
};
