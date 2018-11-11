import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const LOADING = "LOADING"
const SERVER_ERROR = "SERVER_ERROR"
const ERROR = "ERROR"
const DOWNLOAD_COMPLETE = "DOWNLOAD_COMPLETE"
const NO_FILES = "NO_FILES"

class Pictures extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: LOADING,
      pictures: []
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3000/picture")

      if(!response.ok) {
        this.setState(Object.assign({}, this.state, {status: SERVER_ERROR}))
      }

      const json = await response.json()

      if(!json.length) {
        this.setState(Object.assign({}, this.state, {status: NO_FILES}))
      }

      const results = json.map(
        async picture => Object.assign(
          {},
          picture,
          {"picture": picture.picture.replace("dataimage/jpegbase64", "data:image/jpeg;base64,")}
        )
      )
      const pictures = await Promise.all(results)
      console.log(pictures)

      this.setState(Object.assign({}, this.state, {status: DOWNLOAD_COMPLETE, pictures: pictures}))

    } catch(exc) {
      this.setState(Object.assign({}, this.state, {status: ERROR}))
    }
  }

  render() {
    const { classes } = this.props;

    return this.state.pictures.map((picture, index) =>
      <Card className={classes.card} key={index}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={picture.picture}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
    );
  }
}

export default Pictures;