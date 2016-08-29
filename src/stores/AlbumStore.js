import {EventEmitter} from 'events';
import AppDispatcher from '../AppDispatcher';

let _albums = null;
let _album = null;

class AlbumStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case "RECEIVE_ALBUMS":
          _albums = action.albums;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ONE_ALBUM':
          _albums.push(action.album);
          this.emit('CHANGE');
          break;
        case "RECEIVE_ALBUM":
          _album = action.album;
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


  getAlbums() {
    return _albums;
  }

  getAlbum() {
    return _album;
  }
}


export default new AlbumStore();

