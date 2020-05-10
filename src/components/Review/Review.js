import React, { Component } from 'react';
import {getFilmReview} from '../../utils/API'
import styles from "./Review.module.css";
import Loader from '../Loader/Loader'

export  default class Review extends Component {
    state={
        reviews :[],
        loaded: true
    }
    componentDidMount(){
        this.setState({
            loaded: false
        })
        getFilmReview(this.props.id)
        .then((data) => this.setState({
            reviews : data.data.results,
            loaded: true
        }))
    }
    render() {
        const {reviews,loaded} = this.state;
        return (
           <>
           {loaded ?  <ul className={styles.list}>
              {reviews.length === 0  ? <li className={styles.p} key="452435">We don`t have any reviews for this movie.</li>
              :   reviews.map(el => {
                return  <li className={styles.item} key={el.id}>
                    <span className={styles.name}>Author: {el.author}</span>
                  <p className={styles.content}>{el.content}</p>
                    </li>
              })
                
              }
            </ul>
            : <Loader/>
            }
           </>
        )
    }
}

