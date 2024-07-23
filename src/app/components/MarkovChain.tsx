"use client";

import React, { useEffect, useState, useRef, use } from "react";
import * as d3 from "d3";
import "./MarkovChain.css";

export class FSMState {
    id: string;
    label: string;
    duration: number;
    start: number;
    end: number;
    x: number;
    y: number;

    constructor(id: string, label: string, start: number, end: number, x: number, y: number) {
        this.id = id;
        this.label = label;
        this.duration = end - start;
        this.start = start;
        this.end = end;
        this.x = x;
        this.y = y;
    }
}

export class FSMEdge {
    source: string;
    target: string;
    probability: number;

    constructor(source: string, target: string, probability: number) {
        this.source = source;
        this.target = target;
        this.probability = probability;
    }
}

export default function MarkovChain({
    states,
    links,
    width = 800,
    height = 600,
    setSeek,
    isRunning
} : {
    states: FSMState[],
    links: FSMEdge[],
    width?: number,
    height?: number,
    setSeek: (time: number) => void,
    isRunning: boolean
})
{
    const svgRef = useRef<SVGSVGElement>(null);
    const currentStateRef = useRef<FSMState>(states[0]);


    const drawQuadraticCurve = (x1: number, y1: number, x2: number, y2: number) => {
        const theta = Math.atan2(y2 - y1, x2 - x1);
        const h = -50;
        const xf = (x1 + x2) / 2 + h * Math.cos(theta + Math.PI / 2);
        const yf = (y1 + y2) / 2 + h * Math.sin(theta + Math.PI / 2);
        return `M${x1} ${y1} Q${xf} ${yf}, ${x2} ${y2}`;
    };

    const drawBezierCurve = (x: number, y: number) => {
        const d = y > height / 2 ? 100 : -100;
        return `M${x} ${y} C${x + d} ${y + d}, ${x - d} ${y + d}, ${x} ${y}`;
    }

    const getNextState = (currentState: FSMState) => {
        const next = links.filter(link => link.source === currentState.id);
        const random = Math.random();
        let sum = 0;
        for (let i = 0; i < next.length; i++) {
            sum += next[i].probability;
            if (random < sum) {
                return states.find(state => state.id === next[i].target);
            }
        }
        return currentState;
    };

    const timeout = useRef<NodeJS.Timeout | null>(null);
    const transition = () => {
        const next = getNextState(currentStateRef.current) ?? states[3];
        // console.log(`curr: ${currentStateRef.current.id}, next: ${next.id}`);
        d3.select(`#node_${currentStateRef.current.id}`).classed("current-node", false);
        d3.select(`#node_${next.id}`).classed("current-node", true);
        currentStateRef.current = next;
        setSeek(currentStateRef.current.start);
        timeout.current = setTimeout(transition, currentStateRef.current.duration * 1000);
    }

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 13)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 13)
            .attr("markerHeight", 13)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 6,0 L 0,5")
            .attr("fill", "#999")
            .style("stroke", "none");
        
        const edge = svg.append("g")
            .attr("class", "edges")
            .selectAll("path")
            .data(links)
            .enter().append("path")
            .attr("class", "edge")
            .attr("marker-end", "url(#arrowhead)")
            .attr("d", (d) => {
                const source = states.find(state => state.id === d.source);
                const target = states.find(state => state.id === d.target);
                if(!source || !target) return "";
                if(source.x === target.x && source.y === target.y) {
                    return drawBezierCurve(source.x, source.y);
                }
                return drawQuadraticCurve(source.x, source.y, target.x, target.y);
            });
        
        const edgeLabel = svg.append("g")
            .attr("class", "edge-labels")
            .selectAll("text")
            .data(links)
            .enter().append("text")
            .attr("x", d => {
                const source = states.find(state => state.id === d.source);
                const target = states.find(state => state.id === d.target);
                if(!source || !target) return 0;
                return (source.x + target.x) / 2;
            })
            .attr("y", d => {
                const source = states.find(state => state.id === d.source);
                const target = states.find(state => state.id === d.target);
                if(!source || !target) return 0;
                return (source.y + target.y) / 2;
            })
            .text(d => d.probability)

        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(states)
            .enter().append("circle")
            .attr("id", d => `node_${d.id}`)
            .attr("class", "node")
            .attr("r", 20)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        
        const label = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(states)
            .enter().append("text")
            .attr("class", "label")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .text(d => d.label);
        
        d3.select(`#node_shi`).classed("current-node", true);

        timeout.current = setTimeout(transition, currentStateRef.current.duration * 1000);
    }, []);

    useEffect(() => {
        if(isRunning)
            {
            setTimeout(transition, currentStateRef.current.duration * 1000);
        }
        else
        {
            if(timeout.current)
                clearTimeout(timeout.current);
        }
    }
    , [isRunning]);

    return <svg ref={svgRef}></svg>;
}