import React, { Component } from 'react';
import './App.css';

import FileBase64 from 'react-file-base64';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

/* Component used during file uploader and immediated injected into
 ListItems after successfull upload */
class Thumbnail extends Component {
  render() {
    return (
      <img
        width="100"
        height="100"
        src={ this.props.base64 }
        alt={ this.props.alt } />
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [(<li key="0">Loading...</li>)],
      pic: "data:image/png;base64,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",
      file_message: "",
    };
  }

  async getFiles(files) {
    console.log(files);

    // validate file type
    for( let i=0; i<files.length; i++ ){
      if ( files[i].type.toString() !== "image/jpeg" ) {
        this.setState(prevState => ({
          ...prevState,
          file_message: "Please choose image files only"
        }));
        return;
      }
    }

    // 1 - Prepare messages
    this.setState(prevState => ({
      ...prevState,
      images: files.map((file, index) => (
        <Thumbnail
          key={index}
          base64={file.base64}
          alt={file.fileName} />
      )),
      file_message: "Uploading File(s)...",
    }))

    // 2 - Upload one by one
    for (let i=0; i<files.length; i++) {
      // Upload one image
      // const response = await fetch("http://httpstat.us/500", {
      const response = await fetch('http://localhost:3000/picture', {
        method: 'POST',
        body: JSON.stringify({
          picture: files[i].base64,
        })
      })

      // Stop upload on error
      if (!response.ok) {
        this.setState(prevState => ({
          ...prevState,
          file_message: "Upload Interrupted.",
        }))
        return;
      }

      // Insert Uploaded Pick into The List
      let listItems = this.state.listItems;
      listItems.push(<li key={listItems.length}><Thumbnail base64={files[i].base64}/></li>)
      this.setState(prevState => ({
        ...prevState,
        listItems: listItems
      }))
    }

    // 3 - Finish up
    this.setState(prevState => ({
      ...prevState,
      file_message: "Uploaded.",
    }))

  }

  handleClick(pic) {
    this.setState(prevState => ({
      ...prevState,
      pic: pic
    }));
  }

  componentDidMount() {
    // Get All Images from Server
    fetch("http://localhost:3000/picture")
    // fetch("http://httpstat.us/500")
      .then(handleErrors)
      .then(response => response.json())
      .then(result => {
        this.setState({
          listItems: result.map((item, index) =>{
            // workaround
            var pic = item.picture.replace("dataimage/jpegbase64", "data:image/jpeg;base64,")

            // List Items
            return (
              <li
                key={index}
                onClick={(e) => this.handleClick(pic)} >
                <img
                  src={pic}
                  alt={item.filename}
                  width="100"
                  height="100" />
              </li>
            );

          })
        })
      })
      .catch(error => {
        console.log(error)
        this.setState(prevState => ({
          ...prevState,
          listItems: "Error Loading."
        }))
      });
  }
  render() {
    return (
      <div className="App">
        <img src={this.state.pic} alt="default pic"/>
        <br/>
        Click an image below...
        <ul>{ this.state.listItems }</ul>
        <br/>
        Upload File:&nbsp;
        <FileBase64
          multiple={ true }
          onDone={ this.getFiles.bind(this) }
        />
        { this.state.file_message }
        { this.state.images }
      </div>
    );
  }
}

export default App;
