import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../utils/constants';
import { getIdFromKey } from "../utils/common";
import styles from '../styles/Cast.module.css'
import Link from "next/link";

const Cast = ({ id }) => {
    const [cast, setCast] = useState([])

    useEffect(() => {
        const fetchCast = async () => {
          const { data } = await axios.get(
          ` ${BASE_URL}/api/cast?id=${getIdFromKey(id)}`
          );
          
          setCast([...data.cast.slice(0, 7)]);
        };
    
        fetchCast();
      }, [id]);

    if(!cast.length)  {return "loading..."}

    return (
        <div className={styles.cast}>
            <h2 className={styles.heading}>Cast</h2>

            <div className={styles.list}>
  {cast.map(({ characters, id, image, name }) => (
   <Link href={`${BASE_URL}/actor/${getIdFromKey(id)}`} legacyBehavior key={id}>
   <a className={styles.item}>
     <div className={styles.image} style={{ backgroundImage: `url(${image?.url})` }}></div>
     <div className={styles.info}>
       <div className={styles.name}>{name}</div>
       {characters?.length > 0 && <div className={styles.character}>{characters[0]}</div>}
     </div>
   </a>
 </Link> 
  ))}
</div>
</div>
    )
}

export default Cast