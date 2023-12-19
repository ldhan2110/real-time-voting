'use client'

import {useState, useRef, useEffect} from 'react'

export const CountDown = () => {
     // The state for our timer
    const [timer, setTimer] = useState("00:00:00");

    const [startCountDown, setStartCountDown] = useState(false);

    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };
 
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                    ":" +
                    (minutes > 9
                        ? minutes
                        : "0" + minutes) +
                    ":" +
                    (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
 
    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        setTimer("00:01:00");
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
 
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    };

    const getSignalTimer = async () => {
        await fetch("https://"+ window.location.hostname + "/api/countdown", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            }
        },{cache: "no-store"}).then((response) => response.json())
            .then((data) => {
                if (data.data == 'YES' && !startCountDown) setStartCountDown(true);
                else if (data.data == 'NO') setStartCountDown(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //Auto-refresh chart after 1000ms
    useEffect( () => {
        if (startCountDown) {
            console.log("Start the timer...");
            clearTimer(getDeadTime());
        }
    }, [startCountDown]);

    //Auto-refresh chart after 500ms
    useEffect( () => {
        const timer = window.setInterval(() => {
            getSignalTimer();
        }, 1000);
        return () => {
            window.clearInterval(timer);
        };
    }, []);
 
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
 
    // We put empty array to act as componentDid
    // mount only
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);
 
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    };
 
    return (
        <>
        <div className='countdown-wrapper'>
          <div className='countdown-box'>
             {timer.substring(3,timer.length-3)}
            <span className='legend'>Minutes</span>
          </div>
          <div className='countdown-box'>
             {timer.substring(6,timer.length)}
            <span className='legend'>Seconds</span>
          </div>
        </div>  
        </>
    );
 
}
