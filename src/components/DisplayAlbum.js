import React from 'react';
import AddPhoto from './AddPhoto';
import AlbumStore from '../stores/AlbumStore';
import AlbumActions from '../actions/AlbumActions';
import {Row, Col, Thumbnail, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import PhotoActions from '../actions/PhotoActions';
class DisplayAlbum extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
          album : AlbumStore.getAlbum()
        }
        this.displayName = 'DisplayAlbum';
        this._onChange = this._onChange.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
    }

    componentDidMount() {
      AlbumActions.getAlbum(this.props.params.id);
      AlbumStore.startListening(this._onChange);
    }

    componentWillUnmount() {
      AlbumStore.stopListening(this._onChange)
    }

    _onChange() {
      let album = AlbumStore.getAlbum()
      this.setState({album: album})
    }

    deletePhoto(id) {
      PhotoActions.removePhoto(id);
    }
    render() {

        if (this.state.album) {
          console.log('photos ', this.state.album.photos)
          let {photos} = this.state.album
          let thumbnails = photos.map(photo => {
            return (
              <Col xs={6} md={4} key={photo._id}>
                <Thumbnail src={photo.url}>
                  <h3>Name: {photo.name}</h3>
                  <p>Date: {photo.date}</p>
                  <span>
                    <Link to={`photo/${photo._id}`}> <Button bsStyle="primary">See Picture </Button></Link> 
                    <Button bsStyle="success">Edit</Button> 
                    <Button onClick={this.deletePhoto.bind(null, photo._id)} bsStyle="danger">Delete</Button> 
                  </span>
                </Thumbnail>
              </Col>
            )
          })

          return (
            <div>
              <AddPhoto id={this.props.params.id}/> 
              <br/> <br/> <br/>
              {thumbnails}
            </div>
          )
        }
        return (
          <div> 
            <h1>Loading...</h1>
          </div>
      );
    }
}

export default DisplayAlbum;
