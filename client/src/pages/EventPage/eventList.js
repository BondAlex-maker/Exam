import styles from "./EventPage.module.sass";
import React from "react";

function GetEventListHtml(eventListArg) {
    console.log(eventListArg.length);
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

        console.log(diffInMilliseconds); //86400000

        function timeDiffCalc(dateFuture, dateNow) {
            let diffInSeconds = Math.abs(endTime - currentTime) / 1000;

            // calculate days
            const days = Math.floor(diffInSeconds / 86400);
            diffInSeconds -= days * 86400;
            console.log('calculated days', days);

            // calculate hours
            const hours = Math.floor(diffInSeconds / 3600) % 24;
            diffInSeconds -= hours * 3600;
            console.log('calculated hours', hours);

            // calculate minutes
            const minutes = Math.floor(diffInSeconds / 60) % 60;
            diffInSeconds  -= minutes * 60;
            console.log('minutes', minutes);

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

        console.log(timeDiffCalc(new Date('2019/10/1 04:10:00'), new Date('2019/10/2 18:20:00')));
        events.push(
            <div>{timeDiffCalc(endTime, currentTime)}
                <div className={styles.myProgress}>
                    <div style={{width: percents + '%'}} className={styles.myBar}/>
                </div>
            </div>
        )
    }
    console.log(events);
    return events;

}