import React, { useState } from "react";
import "./Loader.scss";
import { arc } from "d3";
import { useEffect, useRef } from "react";
const Loader = ({ size }) => {
    const radius = size / 2 - 5;
    const spacing = radius / 2;
    const [offset, setOffset] = useState(0);
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = (time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;

            // Pass on a function to the setter of the state
            // to make sure we always have the latest state
            setOffset((prevCount) => (prevCount + deltaTime * 0.005) % 100);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }); // Make sure the effect runs only once

    const loaderArc = arc()
        .innerRadius(radius - spacing)
        .outerRadius(radius)
        .startAngle(offset)
        .endAngle(offset + Math.PI / 2);

    const loaderArcStatic = arc()
        .innerRadius(radius - spacing)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(Math.PI * 2);

    return (
        <svg className="loader" width={size} height={size}>
            <g transform={`translate(${size / 2},${size / 2})`}>
                <path d={loaderArcStatic()} className="static"></path>
                <path d={loaderArc()} className="animated"></path>
            </g>
        </svg>
    );
};

export default Loader;
