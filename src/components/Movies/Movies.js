import React, { Component } from "react";
import styles from "./Movies.module.css";
import qs from "qs";
import { Link } from "react-router-dom";
import { getFilms } from "../../utils/API";
import  Loader  from "../Loader/Loader";

export default class Movies extends Component {
  state = {
    searchQuery: "",
    films: [],
    loaded: true,
    page : 1,
    total: 10000
  };

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  componentDidMount() {
    const locationSearchQuery = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).query;
    if (locationSearchQuery) {
      getFilms(locationSearchQuery,this.state.page).then((data) =>
        this.setState({
          searchQuery: "",
          films: data.data.results,
          page :2,
          total:data.data.total_results

        })
      );
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
   
    this.setState({
      loaded: false,
    });
    getFilms(this.state.searchQuery,1).then((data) =>{
      if(data.data.results.length > 0){
       
        this.props.history.push({
          ...this.props.location,
          search: `query=${this.state.searchQuery}`,
        });
        this.setState((state, props) => {
          return{
          films: [...data.data.results],
          page : state.page +1,
            total:data.data.total_results
          }
        })
         this.setState({
          loaded: true,
        });
    }
  });
  };
  handleClick = () =>{
    const locationSearchQuery = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).query;
    getFilms(locationSearchQuery,this.state.page)
    .then(data =>  this.setState((state, props) => {
      return{
      films: [...state.films,...data.data.results],
      loaded: true,
      page : state.page +1,
      }
    }) )
    
  }

  render() {
    const { searchQuery } = this.state;
    const locationSearchQuery = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).query;
    return (
      <section className={styles.section}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button className={styles.btn} type="submit"></button>
          <input
            type="search"
            className={styles.input}
            value={searchQuery}
            onChange={this.handleChange}
            name="query"
            placeholder="Enter film`s title"
            autoFocus
          />
        </form>
        { locationSearchQuery && (this.state.loaded ? (
          <>
          <div className={styles.list}>
            {this.state.films.map((el) => {
              return (
                <Link
                  to={`${this.props.match.url}/${el.id}`}
                  key={el.id}
                  className={styles.item}
                >
                  {
                    el.poster_path ? 
                    <img
                    alt="sdaf"
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  /> :
                    <img
                    alt="sdaf"
                    className={styles.poster}
                    src="https://i.gifer.com/origin/f5/f5baef4b6b6677020ab8d091ef78a3bc_w200.webp"
                  />
                  }
                  <p>{el.title}</p>
                </Link>
              );
            })}
          
          </div>
            {this.state.films.length !== this.state.total ?
              <button className={styles.btnx} onClick={this.handleClick}>Load more</button>
                  :
                  <span></span>
              }</>
        ) : (
          <Loader />
        ))}
      </section>
    );
  }
  //
}
