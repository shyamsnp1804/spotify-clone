import { Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, playAndPause } from "../features/songSlice";

const SongCard = ({ elem }) => {
  const dispatch = useDispatch();
  let { currentSong, isPlaying } = useSelector((state) => state.song);

  return (
    <div className="h-[14%] flex px-10 items-center justify-between rounded-xl w-full border border-gray-400 mb-5">
      <div className="flex gap-10 items-center">
        <div className="h-11 w-11 bg-red-600 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src="https://www.citypng.com/public/uploads/preview/hd-apple-itunes-music-app-logo-icon-png-701751694777115nww0wcplip.png"
          />
        </div>
        <div>
          <h1 className="font-semibold text-md">{elem.name}</h1>
          <p className="text-gray-400">{elem.artist}</p>
        </div>
      </div>
      {currentSong?.id === elem.id ? (
        isPlaying ? (
          <div
            onClick={() => dispatch(playAndPause())}
            className="h-11 w-11 rounded-full flex justify-center cursor-pointer items-center bg-black text-white"
          >
            <Pause />
          </div>
        ) : (
          <div
            onClick={() => dispatch(playAndPause())}
            className="h-11 w-11 rounded-full flex justify-center cursor-pointer items-center bg-black text-white"
          >
            <Play />
          </div>
        )
      ) : (
        <div
          onClick={() => dispatch(addSong(elem))}
          className="h-11 w-11 rounded-full flex justify-center cursor-pointer items-center bg-black text-white"
        >
          <Play />
        </div>
      )}
    </div>
  );
};

export default SongCard;
