import React from 'react';
import {Button, Modal} from 'react-bootstrap';
class DeleteAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DeleteAlbum';
        
        this.state = {
          showModal: false  
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    close() {
    this.setState({ showModal: false });
    }

    open() {
      this.setState({ showModal: true });
    }
    render() {
      console.log('here')
      return (
       <div>
          <Button bsStyle="danger" onClick={this.open}>Delete Album</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Album</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>All your photos will be deleted. Are you sure?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="danger">Delete Album</Button>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
        </div>
      )

    }
}

export default DeleteAlbum;
