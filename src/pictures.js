import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

class Pictures extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      pictures: [],
      message: null,
    }
  }

  async getPictures() {
    try {
      const response = await fetch("http://localhost:3000/picture")

      if(!response.ok) {
        this.setState(Object.assign({}, this.state, {isLoaded: true, message: "server error"}))
        return;
      }

      const json = await response.json()

      if(!json.length) {
        this.setState(Object.assign({}, this.state, {isLoaded: true, message: "no pictures"}))
        return;
      }

      const results = json.map(
        async picture => Object.assign(
          {},
          picture,
          {"picture": picture.picture.replace("dataimage/jpegbase64", "data:image/jpeg;base64,")}
        )
      )
      const pictures = await Promise.all(results)

      this.setState(Object.assign({}, this.state, {isLoaded: true, pictures: pictures}))

    } catch(exc) {
      this.setState(Object.assign({}, this.state, {isLoaded: true, message: "unexpected error"}))
    }
  }

  componentDidMount() {
    this.cancelablePromise = makeCancelable(
      new Promise(r => this.getPictures())
    );
    console.log(this.cancelablePromise)
    this.cancelablePromise
      .promise
      .then(() => console.log('resolved'))
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          { this.state.message &&
            <Typography variant="h5" component="h3">
              { this.state.message }
            </Typography>
          }
        </div>
        <div>
          { this.state.isLoaded &&
            <div className={classes.pictures}>
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {this.state.pictures.map((picture, index) =>
                  <GridListTile key={index} cols={1}>
                    <Card className={classes.card} key={index}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={picture.picture}
                          title="Contemplative Reptile"
                        />
                      </CardActionArea>
                    </Card>
                  </GridListTile>
                )}
              </GridList>
            </div>
          }
          { !this.state.isLoaded && <CircularProgress className={classes.progress} /> }
        </div>
      </div>
    )
  }
}

export default Pictures;