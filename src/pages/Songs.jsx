import { songsData } from "../utils/songsData";
import SongCard from "../components/SongCard";

const Songs = () => {
  let songs = songsData;

  return (
    <div>
      {songs.map((elem, i) => {
        return <SongCard elem={elem} key={i} />;
      })}
    </div>
  );
};

export default Songs;
