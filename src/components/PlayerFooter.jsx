import { Pause, Play, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSong,
  addToHistory,
  playAndPause,
  removeFromHistory,
  restoreShuffleState,
  toggleshuffle,
} from "../features/songSlice";
import moment from "moment";
import { songsData } from "../utils/songsData";

const PlayerFooter = () => {
  const songs = songsData;
  const audioRef = useRef();
  const dispatch = useDispatch();
  const { currentSong, isPlaying, shuffle, history } = useSelector(
    (state) => state.song
  );

  // load song when selected
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.src = currentSong.src; //when user clicks song → src sets
    audioRef.current.load(); //audio loads

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSong]);

  // play / pause toggle
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const formatTime = (time) => moment.utc((time || 0) * 1000).format("mm:ss");

  {
    /*Slider move hoga And Timer update hoga*/
  }
  const handleUpdateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  {
    /*<1>User → slider drag kare then <2>Audio → uss point par jump kare */
  }
  const handleSeekTime = (e) => {
    //  console.log(e.target.value);
    const slideTime = Number(e.target.value);
    audioRef.current.currentTime = slideTime;
    setCurrentTime(slideTime);
  };

  //random song picker
  const getRandomSongIndex = (currentIndex, songs) => {
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    return randomIndex;
  };
  //next song
  const handleForwardSong = useCallback(() => {
    if (!currentSong) return;

    const index = songs.findIndex((s) => s.id === currentSong.id);

    let nextIndex;

    if (shuffle) {
      // save safely through redux
      dispatch(addToHistory(currentSong.id));

      nextIndex = getRandomSongIndex(index, songs);
    } else {
      nextIndex = (index + 1) % songs.length;
    }

    dispatch(addSong(songs[nextIndex]));
  }, [currentSong, songs, shuffle, dispatch]);

  const handleBackwardSong = useCallback(() => {
    if (!currentSong) return;

    // SHUFFLE MODE — rewind history
    if (shuffle && history.length > 0) {
      const lastSongId = history[history.length - 1];

      const previousIndex = songs.findIndex((s) => s.id === lastSongId);

      dispatch(removeFromHistory());
      dispatch(addSong(songs[previousIndex]));

      return;
    }

    // NORMAL MODE
    const index = songs.findIndex((s) => s.id === currentSong.id);

    const previousIndex = (index - 1 + songs.length) % songs.length;

    dispatch(addSong(songs[previousIndex]));
  }, [currentSong, songs, shuffle, dispatch, history]);

  //autoplay next song
  const handleAutoPlay = () => {
    handleForwardSong();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement?.tagName;
      // console.log(active);
      // console.log(e.code);

      // avoid triggering inside inputs / textareas
      if (active === "INPUT" || active === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        dispatch(playAndPause());
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        handleForwardSong();
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleBackwardSong();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, handleForwardSong, handleBackwardSong]);

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const savedState = {
      song: currentSong,
      time: audioRef.current.currentTime,
      isPlaying,
      shuffle,
      history,
    };

    localStorage.setItem("player_state", JSON.stringify(savedState));
  }, [currentSong, isPlaying, shuffle, history, currentTime]);

useEffect(() => {
  const saved = localStorage.getItem("player_state");
  if (!saved) return;

  const data = JSON.parse(saved);

  // verify song still exists
  const exists = songs.find(s => s.id === data.song.id);
  if (!exists) return;

  // 1️⃣ restore song into redux
  dispatch(addSong(data.song));

  // 2️⃣ restore shuffle + history
  dispatch(restoreShuffleState({
    shuffle: data.shuffle,
    history: data.history
  }));

  // 3️⃣ wait for audio to load → restore time
  setTimeout(() => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = data.time || 0;

    // resume only if it was playing
    if (data.isPlaying) {
      audioRef.current.play().catch(() => {});
    }

  }, 300);

}, []);


  return (
    <div className="h-[12%] w-full bg-black flex">
      <div className="w-[20%] text-white">
        <h1>{currentSong?.name}</h1>
        <p>{currentSong?.artist}</p>
      </div>

      <div className="w-[60%] text-white flex flex-col gap-2">
        <div className="flex items-center justify-center gap-5 mt-2">
          <Shuffle
            onClick={() => dispatch(toggleshuffle())}
            className={shuffle ? "text-green-400" : "text-white"}
          />

          <SkipBack onClick={handleBackwardSong} />

          {isPlaying ? (
            <div
              onClick={() => dispatch(playAndPause())}
              className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer text-black"
            >
              <Pause />
            </div>
          ) : (
            <div
              onClick={() => dispatch(playAndPause())}
              className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer text-black"
            >
              <Play />
            </div>
          )}

          <SkipForward onClick={handleForwardSong} />
        </div>

        <div className="flex items-center justify-center gap-2">
          <span>{formatTime(currentTime)}</span>
          <div>
            <input
              className=" cursor-pointer"
              type="range"
              onChange={handleSeekTime}
              min={0}
              max={duration || 0}
              value={currentTime}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-[20%]">
        {/* 
        onTimeUpdate event: jab bhi song play hota hai browser har second values update karta hai
        So: currentTime continuously increase hota hai and duration same rehta hai
        */}
        <audio
          onTimeUpdate={handleUpdateTime}
          ref={audioRef}
          onEnded={handleAutoPlay}
        />
      </div>
    </div>
  );
};

export default PlayerFooter;
