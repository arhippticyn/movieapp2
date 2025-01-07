import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { getIdFromKey } from "../utils/common";
import styles from "../styles/Reviews.module.css";

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setPending(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/reviews?id=${getIdFromKey(id)}`
      );

      setReviews(data.reviews);
      setPending(false);
    };

    fetchReviews();
  }, [id])

  

  return (
    <div className={styles.list}>
      <h2>Reviews</h2>

      {isPending ? "Loading" :
     reviews?.length ? (
    <div className={styles.container}>
      <div className={styles.reviews}>
        {reviews.map(
          ({
            author: { displayName, userId },
            authorRating,
            reviewText,
            reviewTitle,
            submissionDate,
          }) => (
            <div className={styles.review} key={userId}>
              <div className={styles.user}>
                <div className={styles.header}>
                  <div className={styles.author}>{displayName}</div>
                  <div className={styles.date}>{submissionDate}</div>
                </div>

                {authorRating && (
                  <div className={styles.rating}>
                    <span>{authorRating}</span> / 10
                  </div>
                )}
              </div>

              <div className={styles.content}>
                <div className={styles.title}>{reviewTitle}</div>
                <Text text={reviewText} />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className={styles.results}>No reviews yet</div>
  )
      }
    </div>
  );
};

const Text = ({ text }) => {
  const isShort = text.length <= 300; // Проверяем длину текста
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className={styles.text}>
      {isExpanded || isShort ? text : `${text.slice(0, 300)}...`}

      {!isShort && (
        <div className={styles.more} onClick={toggleExpand}>
          {isExpanded ? "Show less" : "Read more..."}
        </div>
      )}
    </div>
  );
};

export default Reviews;
