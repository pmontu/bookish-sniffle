import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


class Pictures extends React.Component {

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.gstatic.com/webp/gallery/4.jpg"
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
    );
  }
}

export default Pictures;