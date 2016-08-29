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
  }
}

export default ServerActions;