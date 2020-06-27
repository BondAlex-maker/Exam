import React from "react";
import styles from "./GetInTouch.module.sass";

const GetInTouch = () => {
    return (
        <div className={styles.getInTouch}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.question}>
                        <div className={styles.left}>
                            <div className={styles.icon}>
                                <i className="fa fa-envelope"/>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <h1>questions?</h1>
                            <p>Check out our <a href="http://help.squadhelp.com"> FAQs</a> or send us a <a
                                href="http://google.com">message</a>. For assistance with launching a contest, you can also
                                call us at (877) 355-3585 or schedule a <a
                                    href="http://google.com">Branding Consultation</a></p>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <a href="http://google.com">GET IN TOUCH</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch;