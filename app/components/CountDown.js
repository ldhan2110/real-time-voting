'use client'

import {useState, useRef, useEffect} from 'react'

export const CountDown = () => {
     // The state for our timer
    const [timer, setTimer] = useState("00:00:00");

    const [timerServer, setTimerServer] = useState({
        duration: 0,
        started: false
    })

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
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
 
    const getDeadTime = (startTime, seconds) => {
        startTime.setSeconds(startTime.getSeconds() + seconds);
        return startTime;
    };

    const loadCountDownData = async () => {
        const res = await fetch('/api/countdown', {cache: "no-store"});

        const {data} = await res.json();

        window.duration = data.duration;
        window.startTime = data.startTime;
        window.started = data.started

        if (data.started) {
           clearTimer(getDeadTime(new Date(window.startTime), window.duration));
        }
    }

    const sendCountDownData = () => {
        fetch('/api/countdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({    
                duration: window.duration,
                started: window.started,
                startTime: window.startTime
            }),
        }, {cache: "no-store"})
    }

    const setDisplayTimer = (time)=>{
        setTimer(time);

        let minutes = time.substring(3,timer.length-3);
        let seconds = time.substring(6,timer.length);

        window.duration = parseInt(minutes) * 60 + parseInt(seconds);

        return "Set Timer successfully.";
    }

    const startCountDown = () => {
        console.log("Start the timer...");
        window.startTime = new Date();
        window.started = true;
        clearTimer(getDeadTime(new Date(), window.duration));

        sendCountDownData();
    }

    const stopCountDown = () => {
        //Get the duration left need to be run
        window.duration = window.duration - (new Date().getSeconds() - window.startTime.getSeconds());
        window.started = false;
        clearInterval(Ref.current);

        sendCountDownData()
    }

    //Expose Function for Browser console.
    useEffect(() => {
        window.duration = 0;
        window.startTime = null;
        window.started = false;
        window.setDuration = setDisplayTimer;
        window.startCountDown = startCountDown;
        window.stopCountDown = stopCountDown;

        loadCountDownData();
    },[])

    //Auto-refresh chart after 1000ms
    // useEffect(() => {
    //     if (timerServer.started) {
    //         console.log("Start the timer...");
    //         clearTimer(getDeadTime());
    //     }
    // }, [timerServer]);

    //Auto-refresh chart after 500ms
    // useEffect( () => {
    //     const timer = window.setInterval(() => {
    //         getSignalTimer();
    //     }, 1000);
    //     return () => {
    //         window.clearInterval(timer);
    //     };
    // }, []);
 
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

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
