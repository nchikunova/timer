import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators"


const Timer = () => {

    let [sec, setSec] = useState(0);
    const [btn, setBtn] = useState("stop");
    const [toggle, setToggle] = useState(false);

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
            setToggle(!toggle);
        }, [toggle]),

        stop: useCallback(() => {
            setBtn("stop");
            setSec(0);
            setToggle(!toggle);
        }, [toggle]),

        wait: useCallback(() => {
            setBtn("wait");
            setToggle(!toggle);
        }, [toggle]),

        reset: useCallback(() => {
            setSec(0);
        }, [])

    }

    return (
        <div>
            <div>
                <p> {new Date(sec * 1000).toISOString().substr(11, 8)}</p>
            </div>
            <div>
                {toggle === false
                    ? <button onClick={controllers.start}>Start</button>
                    : <button onClick={controllers.stop}>Stop</button>
             }
                <button onDoubleClick={controllers.wait}>Wait</button>
                <button onClick={controllers.reset}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;