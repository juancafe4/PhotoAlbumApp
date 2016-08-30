import React from 'react';

import axios from 'axios';
class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'FileUploader';

        this.state = {
          files: '',
          imagePreviewUrl: '',
        }

        this._onInputChange = this._onInputChange.bind(this);
        this.submit = this.submit.bind(this);
        
    }

    submit(e) {
      e.preventDefault();
      this.props.submitFile(this.state.files)
    }

    _onInputChange(e) {
      let reader = new FileReader();
      let files = e.target.files[0];

      reader.onloadend = () => {
        this.setState({files: files, imagePreviewUrl: reader.result});

      }

      reader.readAsDataURL(files);
      
    }
    render() {
        let {imagePreviewUrl} = this.state

        let ImagePreview = imagePreviewUrl && <img src={imagePreviewUrl} />
        return (<div>
           <form onSubmit={this.submit}>
              <input type="file" name='' onChange={this._onInputChange} />
              <button>Upload</button>
          </form>
          {ImagePreview}
          </div>);
    }
}

export default FileUploader;
