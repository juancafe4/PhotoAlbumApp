import API from '../API'

let AlbumActions = {
  getAlbums : API.getAlbums,
  createAlbum: API.createAlbum,
  addPhoto: API.addPhoto,
  getAlbum: API.getAlbum,
  deleteAlbum: API.deleteAlbum
}

export default AlbumActions;