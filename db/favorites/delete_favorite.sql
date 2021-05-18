DELETE FROM favorite_movies
WHERE favorite_movie_id = $1
AND user_id = $2;

SELECT * FROM favorite_movies
JOIN movies ON favorite_movies.movie_id = movies.movie_id
WHERE favorite_movies.user_id = $1;