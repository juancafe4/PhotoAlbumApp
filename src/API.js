const axios = require('axios');
import  ServerActions from './actions/ServerActions';

const API = {
  getAlbums() {
    axios.get('/api/albums')
      .then(res => res.data)
      .then(albums => { 
        ServerActions.getAlbums(albums)
      })
      .catch(console.error)
  },
  createAlbum(name) {
    axios.post('/api/albums', name)
      .then(res => res.data)
      .then(album => { 
        ServerActions.createAlbum(album)
      })
      .catch(console.error)
  }
}
export default API;