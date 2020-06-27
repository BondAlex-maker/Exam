import React, {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./EventPage.module.sass"
import classNames from "classnames";
import SimpleSteps from "../../components/SimpleSteps";
import SACBanner from "../../components/StartAContestBanner";
import CONSTANTS from "../../constants";
import QuestionList from "../../components/HowItWorksQuestionList";
import GetInTouch from "../../components/GetInTouch";
import ReactPlayer from "react-player";
import {now} from "moment";
import {forceReRender} from "@storybook/react";
// for (let prop of initialEventArray[0]) {
//
// }
let initialEventArray = [
    {
        name: 'EVENT 1 NAME',
        createdDatetime: new Date(2020, 3, 29, 14, 45),
        eventDatetime: new Date(2020, 6, 29, 14, 45),
        priorDays: 5,
        priorHours: 10,
        priorMinutes: 20
    },
    {
        name: 'EVENT 2 NAME',
        createdDatetime: new Date(2020, 3, 29, 14, 45),
        eventDatetime: new Date(2020, 8, 1, 14, 45),
        priorDays: 5,
        priorHours: 10,
        priorMinutes: 20
    },
    {
        name: 'EVENT 3 NAME',
        createdDatetime: new Date(2020, 4, 20, 14, 45),
        eventDatetime: new Date(2020, 9, 29, 14, 45),
        priorDays: 5,
        priorHours: 10,
        priorMinutes: 20
    }
];

/*function priorDate() {
    let result = initialEventArray.filter(obj => {
        const priorDate = ((obj.priorDays * 86400) + (obj.priorHours * 3600) + (obj.priorMinutes * 60)) * 1000
        return priorDate;
    })
    return result;

}*/




const EventPage = () => {

    const intervalId = setInterval(() => {

        let arrayForDelete = eventList.filter((el) => {
            let currentTime = new Date();

            let currMinutes = Math.floor(Math.floor(currentTime.getTime() / 1000));
            let eventMinutes = Math.floor(Math.floor(el.eventDatetime.getTime() / 1000 ));
            let priorTime = Math.floor(((el.priorDays * 86400000 + el.priorHours * 3600000 + el.priorMinutes * 60000)/1000));

            if (currMinutes === eventMinutes - priorTime){
                return alert(`До ${el.name} осталось ${priorTime}`)
            }
            if ( currMinutes === eventMinutes ){
                return true;
            }
            console.log(`lala${priorTime}`)
            console.log(el.priorDays)
        });


        for (let i in arrayForDelete) {
            alert(arrayForDelete[i].name);
            let indexToDelete = eventList.indexOf(arrayForDelete[i]);
            eventList.splice(indexToDelete, 1); // тут происходит удаление
            alert('В ИЗНАЧАЛЬНОМ МАССИВЕ ОСТАЛОСЬ ' + eventList.length + ' ЕЛЕМЕНТОВ');
        }

        let kekich = eventList.slice(0);
        setEventList(kekich);

    }, 1000);

    useEffect(()=> {
        return function cleanup() {
            clearInterval(intervalId);
        }
    });

    const [eventList, setEventList] = useState(initialEventArray);
    const [inputDate, setInputDate] = useState(new Date().toISOString().slice(0, 16));
    const [inputDays, setInputDays] = useState();
    const [inputHours, setInputHours] = useState();
    const [inputMinutes, setInputMinutes] = useState();
    const [inputEventName, setInputEventName] = useState();



    function addEvent() {
        let newEvent = {
            name: Object.assign({}, inputEventName),
            createdDatetime: new Date(),
            eventDatetime:  new Date(inputDate),
            priorDays: inputDays,
            priorHours: inputHours,
            priorMinutes: inputMinutes
        };
        console.log(inputDays)

        let kekich = eventList.slice(0);
        kekich.push(newEvent);
        setEventList(kekich);
        // setInputEventName('qwe');


    }

    function GetEventListHtml(eventListArg) {
        eventListArg.sort((a,b) => {
            const aTime = a.eventDatetime.getTime() - new Date().getTime();
            const bTime = b.eventDatetime.getTime() - new Date().getTime();
            return aTime - bTime;
        });

        const events = [];
        for (let i in eventListArg) { //i = index
            const event = eventListArg[i];
            let endTime = event.eventDatetime.getTime();
            let startTime = event.createdDatetime.getTime();
            let currentTime = new Date().getTime();
            let percents = ((currentTime - startTime) * 100)/ (endTime-startTime);
            const diffInMilliseconds = Math.abs(new Date('2019/10/1 00:00:00') - new Date('2019/10/2 00:00:00'));


            function timeDiffCalc(dateFuture, dateNow) {
                let diffInSeconds = Math.floor(Math.abs(endTime - currentTime) / 1000);

                // calculate days
                const days = Math.floor(diffInSeconds / 86400);
                diffInSeconds -= days * 86400;

                // calculate hours
                const hours = Math.floor(diffInSeconds / 3600) % 24;
                diffInSeconds -= hours * 3600;

                // calculate minutes
                const minutes = Math.floor(diffInSeconds / 60) % 60;
                diffInSeconds  -= minutes * 60;

                const seconds = diffInSeconds;

                let difference = '';
                if (days > 0) {
                    difference += (days === 1) ? `${days} day, ` : `${days} days, `;
                }

                difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

                difference += (minutes === 0 || hours === 1) ? `${minutes} minute` : `${minutes} minutes`;

                difference += (seconds === 0 || seconds === 1) ? `${seconds} second` : `${seconds} seconds`;

                return difference;
            }


            events.push(
                <div>{timeDiffCalc(endTime, currentTime)}
                <div className={styles.myProgress}>
                    <div style={{width: percents + '%'}} className={styles.myBar}/>
                </div>
                </div>
            )
        }
        return events;

    }

    return (

        <>
            <Header id="header"/>
            <div>Event Name: <input type="text" value={inputEventName} onInput={e=> setInputEventName(e.target.value)} /></div>
            <div>Date and time: <input id="datetime" value={inputDate} onInput={e=> setInputDate(e.target.value)} type="datetime-local"/></div>

            <div>Prior notification in
                <br/>
            Days: <input type="number" value={inputDays} onInput={e => setInputDays(e.target.value)} step="1" id="days" name="days"
    min="0" />
            Hours: <input type="number" value={inputHours} onInput={e => setInputHours(e.target.value)}  step="1" id="hours" name="hours"
                         min="0" max="23"/>
            Minutes: <input type="number"  step="1" id="minutes" name="minutes" value={inputMinutes}
                            onInput={e=> setInputMinutes(e.target.value)} min="0" max="59"/>
            </div>
            <div><input type="button" value="Submit" onClick={addEvent} /></div>


            <div>

            </div>
            {GetEventListHtml(eventList)}

            <Footer/>

        </>
    )
}

export default EventPage;


