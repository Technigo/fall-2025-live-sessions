// TODO: Import necessary modules and data
import { Link, useParams } from "react-router";
import { songs } from "../data/songs.json";

// TODO: Destrcutrue props to receive information coming in from the parent comp
const SongInfo = () => {
  // TODO: Use the song title from the props to find the corresponding song data from the json file
  const { slug } = useParams();
  // song.title.replace('-', ' ')

  const song = songs.find((s) => s.title === decodeURI(slug));

  return (
    <div>
      {song ? (
        <div style={{ border: "1px dotted red", padding: 20 }}>
          <h2>Song Information</h2>
          <h3>Rank: {song.rank}</h3>
          <h1>
            {song.artist} - {song.title}
          </h1>
          <h3>From the album: {song.album}</h3>
        </div>
      ) : (
        <h2>Song not found!</h2>
      )}

      {/* TODO: Implement a button to take you back to the home page */}
      <br />
      <Link to="/">Go back to song list</Link>
    </div>
  );
};

export default SongInfo;
