import React from 'react';

import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';


function getBase64(e) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isUploading: false }
  }

  async handleChange(file) {
    // getBase64(file).then(base64 => console.log(base64))
    const state = Object.assign({}, this.state, { isUploading: true })
    this.setState(state)
    setTimeout(() => {
      const state = Object.assign({}, this.state, { isUploading: false })
      this.setState(state)
    }, 2000)
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        { !this.state.isUploading &&
          <div>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              ref={(ref) => this.myInput = ref}
              onChange={this.handleChange.bind(this)}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={(e) => this.myInput.click()}
              >
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label>
          </div>
        }
        { this.state.isUploading && <CircularProgress className={classes.progress} /> }
      </div>
    );
  }
}

export default Upload;