import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";

export default function Crud() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState("");

  const [updateTitle, setUpdateTitle] = useState("");

  const [movies, setMovies] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    async function getMovieList() {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((d) => {
          return {
            ...d.data(),
            id: d.id,
          };
        });
        console.log(filteredData);
        setMovies(filteredData);
      } catch (err) {
        console.log(err);
      }
    }
    getMovieList();
  }, [moviesCollectionRef]);

  async function handleOnSubmitMovie(e) {
    try {
      e.preventDefault();

      await addDoc(moviesCollectionRef, {
        name,
        rating,
        date,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMovie(movieId) {
    try {
      const movieDoc = doc(db, "movies", movieId);
      await deleteDoc(movieDoc);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateTitle(movieId) {
    const movieDoc = doc(db, "movies", movieId);
    await updateDoc(movieDoc, {
      name: updateTitle,
    });
  }

  return (
    <div>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <p>Movie id: {movie.id}</p>
            <p>{movie.name}</p>
            <p>{movie.date}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>

            <br />

            <div>
              <input
                type="text"
                placeholder="Update title..."
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
              <button onClick={() => handleUpdateTitle(movie.id)}>
                Update!
              </button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleOnSubmitMovie}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Create movie</button>
      </form>
    </div>
  );
}
