import React from "react";
import styles from '../styles/Movie.module.css'
import Image from "next/image";
import movieImg from '../images/default-movie.jpg'
import { convertDuration }  from "..//utils/common"

const MovieItem = ({ title: { title, image, year, runningTimeInMinutes: duration }, ratings: { rating }}) => {
    return <div className={styles.movie}>
      <div className={styles.item}>
        <div className={styles.title}>
            <h1 className={styles.h1}>{title}</h1>
            {rating && (
                <div className={styles.rating}>
                    <span>IMDb</span> {rating}
                </div>
            )}
        </div>

        <div className={styles.content}>
        <div className={styles.image}>
        <Image
            src={image ? image.url : movieImg}
            alt={title}
            width={image ? image.width : "300"}
            height={image ? image.height : "300"}
            quality="0.5"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.about}>
            {year &&  <div className={styles.year}>{year}</div>}
            {duration &&  <div className={styles.duration}>{convertDuration(duration)}</div>}
          </div>
        </div>
        </div>
       </div>
    </div>
}

export default MovieItem