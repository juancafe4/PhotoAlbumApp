import AppDispatcher from '../AppDispatcher'

let ServerActions = {
  getAlbums(albums) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ALBUMS',
      albums
    })
  },

  createAlbum(album) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ONE_ALBUM',
      album
    })
  },

  getAlbum(album) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ALBUM',
      album
    })
  },

  getPhoto(photo) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_PHOTO',
      photo
    })
  },

  updatePhotos(id) {
    AppDispatcher.dispatch({
      type: 'UPDATE_PHOTO',
      id
    })
  }
}

export default ServerActions;