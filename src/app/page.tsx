"use client";
import { useEffect, useRef, useState } from "react";
import MarkovChain, { FSMState, FSMEdge } from "./components/MarkovChain";
import YouTube from "react-youtube";
import Footer from "./components/Footer";

export default function Page()
{
    const states: FSMState[] = [
        new FSMState("shi", "し", 0.91, 1, 400, 200),
        new FSMState("ka", "か", 1, 1.16, 550, 100),
        new FSMState("no", "の", 1.16, 1.33, 700, 200),
        new FSMState("ko", "こ", 1.33, 1.5, 550, 300),
        new FSMState("ta", "た", 2.46, 2.66, 250, 300),
        new FSMState("n", "ん", 2.66, 2.87, 100, 200),
        new FSMState("empty", "", 3.08, 3.5, 250, 100)
    ];

    const links: FSMEdge[] = [
        new FSMEdge("shi", "ka", 0.5),
        new FSMEdge("ka", "no", 1),
        new FSMEdge("no", "ko", 1),
        new FSMEdge("ko", "no", 0.5),
        new FSMEdge("ko", "ko", 0.25),
        new FSMEdge("ko", "shi", 0.25),
        new FSMEdge("shi", "ta", 0.5),
        new FSMEdge("ta", "n", 1),
        new FSMEdge("n", "ta", 0.5),
        new FSMEdge("n", "empty", 0.5),
        new FSMEdge("empty", "empty", 0.5),
        new FSMEdge("empty", "shi", 0.5)
    ];

    const YTRef = useRef<YouTube>(null);
    const options = {
        height: "360",
        width: "640",
        playerVars: {
            autoplay: 0,
            controls: 0
        },
    };

    const [playFlag, setPlayFlag] = useState<boolean>(false);
    const onPlay = () => {
        setPlayFlag(true);
    }
    const onPause = () => {
        setPlayFlag(false);
    }

    const setCurrentTime = (time: number) => {
        if(!YTRef.current) return;
        YTRef.current.internalPlayer.seekTo(time);
    };

    return (
        <>
            <h1>Shikanoko but it's a Markov chain</h1>
            <YouTube ref={YTRef} videoId="ZZvIVRQ4E7I" opts={options} onPlay={onPlay} onPause={onPause} className="player" />
            <MarkovChain states={states} links={links} setSeek={setCurrentTime} isRunning={playFlag} />
            <Footer />
        </>
    );
}