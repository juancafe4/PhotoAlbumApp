import React from 'react';

import PhotoActions from '../actions/PhotoActions';
import PhotoStore from '../stores/PhotoStore';

class DisplayPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DisplayPhoto';

        this.state = {
          photo: PhotoStore.getPhoto()
        }

        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
      PhotoActions.getPhoto(this.props.params.id);
      PhotoStore.startListening(this._onChange);
    }

    componentWillUnmount() {
      PhotoStore.stopListening(this._onChange)
    }

    _onChange() {
      let photo = PhotoStore.getPhoto()
      this.setState({photo: photo})
    }
    render() {
        let {photo} = this.state
        console.log('photos ', photo)
        if (photo) {
          return (<div>
            <h1>{photo.name}</h1>
            <img src={photo.url} />

          </div>
          );
        }
        return <div><h1>Loading...</h1></div>;
    }
}

export default DisplayPhoto;
