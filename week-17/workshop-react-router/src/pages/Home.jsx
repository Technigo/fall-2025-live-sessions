// TODO: Import necessary modules and data
import { Link } from "react-router";
import { songs } from "../data/songs.json";

const Home = () => {
  // TODO: Implement logic to display the list of songs
  //
  // song.title.replace(' ', '-')

  return (
    <main>
      <h1>Rolling Stones 500 Greatest Songs of all Time</h1>

      <ul>
        {songs.map((song, index) => (
          <li key={index} style={{ marginBottom: 20 }}>
            <h3>{song.title}</h3>

            <Link to={`/song/${song.title.replace(" ", "-")}`}>
              Link to song
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
