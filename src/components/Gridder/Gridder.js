import React from "react";
import { Image, Card, Grid } from "semantic-ui-react";
import "./Gridder.css";

const Gridder = (props) => (
  <Grid container divided="vertically" className="GridderStyle">
    <Grid.Row>
      {props.mainDatas &&
        props.mainDatas.map((mainData) => (
          <Grid.Column width={4}>
            <Card className="CardStylerTest">
              <a href={`${props.hrefMainUrl}${mainData.key}`}>
                <Image
                  src={
                    mainData.movieImage ||
                    mainData.image ||
                    mainData.tvShowImage
                  }
                />
              </a>
              <Card.Content>
                <Card.Header>
                  <a
                    className="CardHeader"
                    href={`${props.hrefMainUrl}${mainData.key}`}
                  >
                    {mainData.movieName || mainData.name || mainData.tvShowName}
                  </a>
                </Card.Header>
                <Card.Meta>
                  {mainData.movieReleaseDate ||
                    mainData.tvShowReleaseDate ||
                    (mainData.knownFors &&
                      mainData.knownFors.map((knownFor) => (
                        <>
                          <span key={knownFor.key}>
                            {knownFor.movieTitle
                              ? knownFor.movieTitle + "."
                              : knownFor.tvTitles + "."}
                          </span>
                        </>
                      )))}
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
    </Grid.Row>
  </Grid>
);
export default Gridder;
