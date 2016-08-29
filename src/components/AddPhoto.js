import React from 'react';
import {Button, Modal, FormGroup, FormControl} from 'react-bootstrap';
import AlbumActions from '../actions/AlbumActions'

class AddPhoto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          showModal: false, 
          name: '',
          url: ''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.addPhoto = this.addPhoto.bind(this);

        this.changeName = this.changeName.bind(this);
        this.changeURL = this.changeURL.bind(this);
    }

    changeName(e){
      this.setState({name: e.target.value})
    }

    changeURL(e){
      this.setState({url: e.target.value})
    }
    close() {
    this.setState({ showModal: false });
    }

    open() {
      this.setState({ showModal: true });
    }
    addPhoto() {
      let {name, url} = this.state
      if (name, url) {
        AlbumActions.addPhoto(this.props.id, {name ,url})
        this.setState({
          name: '',
          url: ''
        });
        this.close();
      }
    }
    render() {
        let btnStyle = {
          float: 'right'
        };
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
                </FormGroup>
                <Button onClick={this.addPhoto}type="submit">Submit</Button>
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