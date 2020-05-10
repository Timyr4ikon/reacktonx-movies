import React,{ useState,useEffect} from 'react';
import {getTrends} from '../../utils/API';
import {Trends} from '../Trends/Trends';
import Loader from '../Loader/Loader'

export const Home = () => {
    const [trends,setTrends] = useState([]);
    const [loader,setLoader] = useState(false);
    const [page,setPage] = useState(1);

    useEffect(() => {
       getTrends(page)
       .then(x => setTrends([...trends,...x]))
       .then(() => {
           setLoader(true);
            setPage(page+1)
       }
       )
    },[]);

    const nextPage = async () =>{
        getTrends(page)
        .then(x => setTrends([...trends,...x]))
        .then(() => {
            setLoader(true);
             setPage(page+1)
        }
        )
    }   
    
    return (
        <>  
            {!loader ? <Loader/> :<Trends list={trends} onClick={nextPage}/> }
        </>
    )
}
