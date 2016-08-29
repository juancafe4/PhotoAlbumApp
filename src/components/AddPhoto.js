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
        this.addAlbum = this.addAlbum.bind(this);

        this.changeName = this.changeName.bind(this);
        this.changeUrl = this.changeUrl.bund(this);
    }

    changeName(e){
      this.setState({name: e.target.value})
    }

    changeName(e){
      this.setState({url: e.target.value})
    }
    close() {
    this.setState({ showModal: false });
    }

    open() {
      this.setState({ showModal: true });
    }
    addAlbum() {
      let {name, url} = this.state
      if (name, url) {
        //AlbumActions.createAlbum({name})
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
                <Button onClick={this.addAlbum}type="submit">Submit</Button>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        )
    }
}

export default AddAlbum;