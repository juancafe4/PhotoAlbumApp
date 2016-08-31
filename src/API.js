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
  },

  addPhoto(id, photo) {
    console.log(photo)
    axios.post('/api/photos', photo)
      .then(res => res.data)
      .then(photo => axios.put(`/api/albums/${id}/addPhoto/${photo._id}`))
      .then(res => res.data)
      .then(album => axios.get(`/api/albums/${id}`))
      .then(res => res.data)
      .then(album => ServerActions.getAlbum(album))
      .catch(console.error)
  },

  getAlbum(id) {
    axios.get(`/api/albums/${id}`)
      .then(res => res.data)
      .then(album => ServerActions.getAlbum(album))
      .catch(console.error)
  },

  getPhoto(id) {
    axios.get(`/api/photos/${id}`)
      .then(res => res.data)
      .then(photo => ServerActions.getPhoto(photo))
      .catch(console.error)
  },
  removePhoto(id, albumId) {
    axios.delete(`/api/photos/${id}`)
      .then(() => axios.get(`/api/albums/${albumId}`))
      .then(res => res.data)
      .then(album => ServerActions.getAlbum(album))
      .catch(console.error)
  }
}
export default API;