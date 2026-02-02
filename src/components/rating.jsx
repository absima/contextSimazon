// import React from 'react';

function StarIcon({ variant }) {
  const cls =
    variant === 'full'
      ? 'fa fa-star'
      : variant === 'half'
      ? 'fa fa-star-half-o'
      : 'fa fa-star-o';

  return <i className={cls} aria-hidden="true" />;
}

export default function Rating({ rating = 0, numReviews = 0 }) {
  const stars = [1, 2, 3, 4, 5].map((n) => {
    if (rating >= n) return 'full';
    if (rating >= n - 0.5) return 'half';
    return 'empty';
  });

  return (
    <div className="ratingRow" aria-label={`Rating ${rating} out of 5`}>
      <div className="ratingStars">
        {stars.map((v, idx) => (
          <span className={`star ${v}`} key={idx}>
            <StarIcon variant={v} />
          </span>
        ))}
      </div>

      <span className="ratingMeta">
        {numReviews} <span className="ratingMetaText">reviews</span>
      </span>
    </div>
  );
}
