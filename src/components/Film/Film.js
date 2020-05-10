import { getFilmInfo } from "../../utils/API";
import React, { Component } from "react";
import styles from "./Films.module.css";
import { Link, Route } from "react-router-dom";
import Loader  from "../Loader/Loader";

const Review = React.lazy(() => import('../Review/Review'));
const Cast = React.lazy(() => import('../Cast/Cast'));

export default class Film extends Component {
  state = {
    singleUser: {},
    loaded: false,
  };
  componentDidMount() {
    getFilmInfo(this.props.match.params.id).then((data) =>
      this.setState({
        singleUser: data.data,
        loaded: true,
      })
    );
  }
  returnToHome = () => {
    this.props.history.replace("/");
  };
  goBack = () => {
    this.props.history.push("/");
  };
  render() {
    const {
      genres,
      original_title,
      release_date,
      runtime,
      vote_average,
      overview,
      poster_path,
    } = this.state.singleUser;
    const { match } = this.props;
    return (
      <>
        {this.state.loaded ? (
          <>
            <button className={styles.btn} onClick={this.goBack}>
              Go home
            </button>
            <div className={styles.first}>
              <div className={styles.contentBlock}>
                {poster_path !== null ? (
                  <img
                    className={styles.img}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt="xx"
                  />
                ) : (
                  <img
                    className={styles.img}
                    src={`https://i.gifer.com/origin/e0/e03b4556ffb3a385583981a92ae97f29_w200.webp`}
                    alt="xx"
                    title="Що ты дзырыщь?"
                  />
                )}
                <div className={styles.content}>
                  <h2 className={styles.title}>{original_title}</h2>
                  {vote_average !== 0 ? (
                    <p className={styles.score}>
                      User Score: {vote_average * 10}%
                    </p>
                  ) : (
                    <p className={styles.score}>
                      Adequate creature doesn`t watch it...Think about it...
                    </p>
                  )}
                  {release_date ? 
                  <p className={styles.releaze}>Releaze date: {release_date}</p>
                    :
                  <p className={styles.releaze}>Releaze date: tomorrow</p>

                  }

                  {runtime !== null && runtime !== 0 ? (
                    <p className={styles.runtime}>Runtime: {runtime} min</p>
                  ) : (
                    <p className={styles.runtime}>
                      We don`t know how long does this shlack continue...
                    </p>
                  )}

                  <ul className={styles.genres}>
                    {genres !== undefined &&
                      genres.map((el) => {
                        return <li key={el.id}>{el.name}</li>;
                      })}
                  </ul>

                  <p className={styles.overview}>Overview: </p>
                  {overview ? (
                    <p className={styles.overviewCont}>{overview}</p>
                  ) : (
                    <p className={styles.overviewCont}>
                      No overview for this shlack...
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.second}>
              <h3 className={styles.addInfo}>Additional info :</h3>
              <Link
                className={styles.link}
                to={{
                  pathname: `${match.url}/casts`,
                  state: {
                    id: match.params.id,
                  },
                }}
              >
                Casts
              </Link>
              <Link
                className={styles.link}
                to={{
                  pathname: `${match.url}/reviews`,
                  state: {
                    id: match.params.id,
                  },
                }}
              >
                Reviews
              </Link>
            </div>
            <div className={styles.third}>
              <Route path={`${match.url}/casts`} render={(props) => <Cast {...props} id={this.props.match.params.id}/>} />
              <Route path={`${match.url}/reviews`}render={(props) => <Review {...props} id={this.props.match.params.id}/>} />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
