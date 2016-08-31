import React, { Component } from 'react';
import FileUploader from './FileUploader';
import axios from 'axios';
export default class App extends Component {
  constructor() {
    super();
    this._submitFile = this._submitFile.bind(this);
  }
  _submitFile(file) {
    let data = new FormData();

    data.append('image', file);

    console.log('App data', data)
    // axios.post('/api/photos', data)
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(console.error)
  }
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>        
    )
  }
}
