import React from 'react';

import 'typeface-roboto'
import FileBase64 from 'react-file-base64';
import { SketchField, Tools } from 'react-sketch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import BrushIcon from '@material-ui/icons/Brush';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Upload extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          ref={(ref) => this.myInput = ref}
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
    );
  }
}

function Canvas(props) {
  return (
    <SketchField
      width='100%'
      height='100%'
      tool={Tools.Pencil}
      lineColor='black'
      lineWidth={3}
      style={{"border-style": 'solid'}}
    />
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class App extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Upload Image" icon={<AddToPhotosIcon />} />
            <Tab label="Photo Library" icon={<PhotoLibraryIcon />} />
            <Tab label="Image Canvas" icon={<BrushIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Upload classes={this.props.classes}/></TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer><Canvas/></TabContainer>}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
