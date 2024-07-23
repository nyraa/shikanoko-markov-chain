"use client";
import { useEffect, useRef } from "react";
import MarkovChain, { FSMState, FSMEdge } from "./components/MarkovChain";
import YouTube from "react-youtube";

export default function Page()
{
    const states: FSMState[] = [
        new FSMState("shi", "し", 0.91, 1, 400, 300),
        new FSMState("ka", "か", 1, 1.16, 550, 200),
        new FSMState("no", "の", 1.16, 1.33, 700, 300),
        new FSMState("ko", "こ", 1.33, 1.5, 550, 400),
        new FSMState("ta", "た", 2.46, 2.66, 250, 400),
        new FSMState("n", "ん", 2.66, 2.87, 100, 300),
        new FSMState("empty", "", 3.08, 3.5, 250, 200)
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
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
            controls: 0
        },
    };

    const setCurrentTime = (time: number) => {
        if(!YTRef.current) return;
        YTRef.current.internalPlayer.seekTo(time);
    };

    return (
        <>
            <YouTube ref={YTRef} videoId="ZZvIVRQ4E7I" opts={options} />
            <MarkovChain states={states} links={links} setSeek={setCurrentTime} />
        </>
    );
}