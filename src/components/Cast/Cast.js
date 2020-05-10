import React,{useEffect,useState} from 'react';
import {getFilmCast} from '../../utils/API';
import styles from './Cast.module.css'
import Loader from '../Loader/Loader'

const Cast = (props) => {
    const [casts,setCasts] = useState([]);
    const [loaded,setLoaded] = useState(true)
    
    useEffect(() =>{
        setLoaded(false)
        getFilmCast(props.id)
        .then(x => setCasts(x.data.cast))
        .then(x => setLoaded(true))
    },[])
    

    return (
        <>
        {loaded ? <div className={styles.list}>
            {casts.length > 0 ? casts.map((el) => <div className={styles.item} key={el.id}>
                {el.profile_path!== null ?  <img alt="img" className={styles.img} src={`https://image.tmdb.org/t/p/w500/${el.profile_path}`}/>
                :<img alt="img" className={styles.img} src={`https://i.gifer.com/origin/5d/5d2e75ebcbd9d6c2ff3b53ea7b93fda1_w200.webp`}/> 
                 } <span className={styles.name}>{el.name}</span>
                 <p className={styles.character}>Character:
                 {el.character ? el.character : 'Dora'  } 
                 </p>
                </div>)
                :<p>Sorry, but they`re nonames...</p>
                }
        </div>
        :
        <Loader/>
        }
        </>
    )
}
export default Cast;
