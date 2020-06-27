import React from "react";
import styles from "./StartAContestBanner.module.sass";

const SACBanner = () => {
    return (

        <div className={styles.container}>
            <div className={styles.howItWorkContestBtn}>
                <a href="/startContest" target="blank">
                    <span>Start a Contest</span>
                </a>
            </div>
        </div>
    )
}

export default SACBanner;