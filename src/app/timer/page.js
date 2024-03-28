"use client";
import { useEffect, useState } from "react";

export default function TimerPage() {
    const [hourValue, setHourValue] = useState('');
    const [minuteValue, setMinuteValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [runTimer, setRunTimer] = useState(false);
    
    let timer;

    useEffect(() => {
        if(!(Number(hourValue) === 0 && Number(minuteValue) === 0 && Number(secondValue) === 0) && runTimer){
            timing();
        } else {
            stopTimer();
        }

        return () => clearInterval(timer);

    }, [hourValue, minuteValue, secondValue, runTimer]);

    //타이머 시작
    function startTimer() {
        if(!hourValue && !minuteValue && !secondValue) {
            alert("시간을 먼저 입력해주세요");
            return false;
        } else {
            setRunTimer(true);
            if(Number(hourValue) === 0) { setHourValue('00')}
            if(Number(minuteValue) === 0) { setMinuteValue('00')}
            if(Number(secondValue) === 0) { setSecondValue('00')}
        }
    }

    function timing() {
        timer = !timer && setInterval(() => {
            if(Number(secondValue) === 0) {
                if(Number(minuteValue) === 0) {
                    if(Number(hourValue) === 0) {
                        setRunTimer(false);
                    } else {
                        const nextHour = (Number(hourValue)-1).toString();
                        if (nextHour.length === 1) {
                            setHourValue('0' + nextHour);
                        } else {
                            setHourValue(nextHour);
                        }

                        setMinuteValue('59');
                    }
                } else {
                    const nextMinute = (Number(minuteValue)-1).toString();
                    if (nextMinute.length === 1) {
                        setMinuteValue('0' + nextMinute);
                    } else {
                        setMinuteValue(nextMinute);
                    }
                }
                setSecondValue('59');
            } else {
                const nextSecond = (Number(secondValue)-1).toString();
                if (nextSecond.length === 1) {
                    setSecondValue('0' + nextSecond);
                } else {
                    setSecondValue(nextSecond);
                }
            }
        }, 1000);
    }
    

    //타이머 정지
    function stopTimer() {
        setRunTimer(false);
        clearInterval(timer);
    }

    //타이머 리셋
    function resetTimer() {
        setRunTimer(false);
        setHourValue('');
        setMinuteValue('');
        setSecondValue('');
    }

    function validateNumber(value, callback) {
            if(value.length > 2) {
                value = value.slice(1);
            }
            const isNumeric = /^(?:[0-5]?[0-9])$/;
            if (isNumeric.test(value)) {
                if (value.length === 1) {
                    callback('0' + value);
                } else {
                    callback(value);
                }
            } else {
                callback('');
            }
    }

    return (
        <>
            <div className="vertical-align-lg padT0 center-align">
                <hr className="hr-align-center"/>
                <div className="inline-elements font-bold f200">
                    <input type="number" name="hh" className="input-no-border" placeholder="00" style={{width:"400px"}} value={hourValue} onChange={(e) => validateNumber(e.target.value, setHourValue)}/>
                    <p className="f100">:</p>
                    <input type="number" name="mi" className="input-no-border" placeholder="00" style={{width:"400px"}} value={minuteValue} onChange={(e) => validateNumber(e.target.value, setMinuteValue)}/>
                    <p className="f100">:</p>
                    <input type="number" name="ss" className="input-no-border" placeholder="00" style={{width:"400px"}} value={secondValue} onChange={(e) => validateNumber(e.target.value, setSecondValue)}/>
                </div>
                <hr className="hr-align-center"/>
                <div className="inline-elements">
                    <button className="btn btn-dark marL5 marR5" onClick={startTimer}>시작</button>
                    <button className="btn btn-danger marL5 marR5" onClick={stopTimer}>정지</button>
                    <button className="btn btn-primary marL5 marR5" onClick={resetTimer}>초기화</button>
                </div>
            </div>
        </>
    );
}
