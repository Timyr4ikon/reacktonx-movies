import React from "react";
import styles from "./Trends.module.css";
import { Link } from "react-router-dom";

export const Trends = ({ list,onClick }) => {
    
  return (
    <>
      <h2 className={styles.title}>Now in trends:</h2>
      <div className={styles.list}>
        {list.length > 0 &&
          list.map((el) => {
            if (el.original_title !== undefined) {
              return (
                <Link
                  to={`/movies/${el.id}`}
                  className={styles.item}
                  key={el.id}
                >
                     {
                      el.poster_path ?
                        <img
                        alt="title"
                        className={styles.poster}
                        src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                      />
                      : 
                      <img
                        alt="title"
                        className={styles.poster}
                        src={`https://i.gifer.com/origin/f5/f5baef4b6b6677020ab8d091ef78a3bc_w200.webp`}
                        />
                      }

                  <p>{el.original_title}</p>
                </Link>
              );
            }
          })}
          <button className={styles.btn} onClick={onClick}>Load more</button>
      </div>
    </>
  );
};
