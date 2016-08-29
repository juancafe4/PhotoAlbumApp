import {EventEmitter} from 'events';
import AppDispatcher from '../AppDispatcher';

let _photo = null;
class PhotoStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case "RECEIVE_PHOTO":
          _photo = action.photo;
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }


  getPhoto() {
    return _photo;
  }

}


export default new PhotoStore();
