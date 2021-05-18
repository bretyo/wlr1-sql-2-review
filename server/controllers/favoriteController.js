module.exports = {
  getFavorites: (req, res) => {
    const db = req.app.get('db')
    const {user} = req.session
    if(!user){
      return res.status(500).send("User not found.")
    }
    db.favorites.get_favorites(user.user_id)
    .then((movies) => {
      res.status(200).send(movies)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },
  addFavorite: (req, res) => {
    const db = req.app.get('db');
    const {user} = req.session;
    const {movie_id} = req.params;
    if(!user){
      return res.status(401).send("User not found.")
    }
    if(Number.isNaN(Number(movie_id))){
      return res.status(500).send("Movie id not found")
    }
    db.favorites.add_favorite(user.user_id, movie_id).then(()=>{
      res.sendStatus(200);
    }).catch(err=>{
      console.log(err);
      return res.status(500).send(err);
    })
  },
  deleteFavorite: (req, res) => {
    const db = req.app.get('db')
    const {favorite_movie_id} = req.params;
    const {user} = req.session;
    if(!user){
      console.log(err);
      return res.status(500).send(err);
    }
    if(Number.isNaN(Number(favorite_movie_id))){
      return res.status(500).send("Movie id not found")
    }
    db.favorites.delete_favorite(favorite_movie_id, user.user_id).then((movies)=>{
      res.status(200).send(movies);
    }).catch(err=>{
      console.log(err)
      res.status(500).send(err);
    })
  },
  editFavorite: (req, res) => {}
}