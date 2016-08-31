import React from 'react';
import {Image, Button, Modal, FormGroup, FormControl} from 'react-bootstrap';
import AlbumActions from '../actions/AlbumActions'

class AddPhoto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          showModal: false, 
          name: '',
          url: '',
          file: '',
          imagePreviewUrl: ''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.addPhoto = this.addPhoto.bind(this);

        this.changeName = this.changeName.bind(this);
        this.changeURL = this.changeURL.bind(this);

        this.onChnageFile = this.onChnageFile.bind(this)
    }

    changeName(e){
      this.setState({name: e.target.value})
    }

    changeURL(e){
      this.setState({url: e.target.value})
    }

    onChnageFile(e) {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({file: file, imagePreviewUrl: reader.result});

      }
      reader.readAsDataURL(file);
    }
    close() {
    this.setState({ showModal: false, name: '',
          url: '',
          file: '',
          imagePreviewUrl: ''
        });
    }

    open() {
      this.setState({ showModal: true });
    }
    addPhoto() {
      let {name, url, file} = this.state
      if (name) {
        if (url)
          AlbumActions.addPhoto(this.props.id, {name ,url})
        if (file) {
            let data = new FormData();
            data.append('image', file);
            data.append('name', name)
          AlbumActions.addPhoto(this.props.id, data)
        }
        this.setState({
          name: '',
          url: '',
          file: ''
        });
        this.close();
      }
    }

    render() {
        let btnStyle = {
          float: 'right'
        };

        let {imagePreviewUrl, url} = this.state
        let ImageURL = imagePreviewUrl && <Image responsive={true} src={imagePreviewUrl} />  || url && <Image responsive={true} src={url} />
        return (
          <div>
            <Button bsStyle="primary" style={btnStyle} onClick={this.open}>+</Button>

            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Photo Information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <FormControl onChange={this.changeName} value={this.state.name} type="text" placeholder="Name" />
                </FormGroup>
                <FormGroup>
                  <FormControl onChange={this.changeURL} value={this.state.url} type="text" placeholder="url" />
                  <div><h4>Or</h4></div>
                  <FormControl onChange={this.onChnageFile} type="file" placeholder="Upload Image" />
                </FormGroup>
                <Button onClick={this.addPhoto}type="submit">Submit</Button>

                {ImageURL}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>


            </Modal>
          </div>
        )
    }
}

export default AddPhoto;