import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators"


const Timer = () => {

    let [sec, setSec] = useState(0);
    const [btn, setBtn] = useState("stop");
    const [trig, setTrig] = useState(false);

    useEffect(() => {
        const unsubscribe = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe))
            .subscribe(() => {
                if (btn === "start") {
                    setSec(++sec);
                }
            });
        return () => unsubscribe.next();
    }, [btn,sec]);

    const controllers = {

        start: useCallback(() => {
            setBtn("start");
            setTrig(!trig);
        }, [trig]),

        stop: useCallback(() => {
            setBtn("stop");
            setSec(0);
            setTrig(!trig);
        }, [trig]),

        wait: useCallback(() => {
            setBtn("wait");
            setTrig(!trig);
        }, [trig]),

        reset: useCallback(() => {
            setSec(0);
        }, [])

    }

    return (
        <div>
            <h1>Timer</h1>
            <div>
                <p> {new Date(sec * 1000).toISOString().substr(11, 8)}</p>
            </div>
            <div>
                {trig === false
                    ? <button onClick={controllers.start}>Start</button>
                    : <button onClick={controllers.stop}>Stop</button>
                }
                <button onClick={controllers.reset}>Reset</button>
                <button onDoubleClick={controllers.wait}>Wait</button>
            </div>
        </div>
    );
}

export default Timer;