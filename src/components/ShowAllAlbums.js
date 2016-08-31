import React from 'react';

import AlbumStore from '../stores/AlbumStore';
import AlbumActions from '../actions/AlbumActions';
import AddAlbum from './AddAlbum'
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import DeleteAlbum from './DeleteAlbum'
class ShowAllAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          albums: AlbumStore.getAlbums()
        }
        this.displayName = 'ShowAllAlbums';

        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
      AlbumActions.getAlbums();
      AlbumStore.startListening(this._onChange);
    }

    componentWillUnmount() {
      AlbumStore.stopListening(this._onChange)
    }

    _onChange() {
      let albums = AlbumStore.getAlbums()
      this.setState({albums: albums})
    }
    render() {
        let {albums} = this.state;

        if (albums) {
          let list = albums.map((album, index)=> {
            return (<div key={album._id}> <Link to={`album/${album._id}`}>{album.name}</Link> 
                  <DeleteAlbum id={album._id}/>
            <br/> </div>);

          })
          return (
            <div>
              <AddAlbum />
              {list}
            </div>
          )
        }
        return (
          <div>
            <h1> Loading ...</h1>
          </div>
        )
    }
}

export default ShowAllAlbums;
