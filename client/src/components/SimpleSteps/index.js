import React, {Component} from "react";
import styles from "./SimpleSteps.module.sass";
import classNames from "classnames";
import CONSTANTS from "../../constants";

class SimpleSteps extends Component {
/*    StepsRender = (item) => {
        let step = 1;
        const stepCount = 5;
        for(step; step < stepCount; step++) {
            return(
                <div className={styles.colLg2}>
                    <div className={styles.typeStep}>
                        <div className={classNames(styles.stepBg, styles.blueColor)}>
                            <div className={styles.stepCircle}>{step}</div>
                        </div>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>

                    </div>
                </div>
            )

        }


    }*/

    StepsRender (items) {
        const steps = [];
        let step = 1;
        items.forEach( item => steps.push(

            <div className={styles.colLg2}>
                <div className={styles.typeStep}>

                    <div  className={classNames(styles.stepBg)}>

                        <div className={styles.stepCircle}>{step++}</div>
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>

                </div>
            </div>
        )
    )
        return steps;
    }

    StepsItemsRender() {
        return CONSTANTS.STEPS = this.StepsRender(CONSTANTS.STEPS);
    };

    /*    StepsItemsRender() {
        return CONSTANTS.STEPS.map(item => this.StepsRender(item))
    };*/

    render() {
        return (
            <>
                <section className={styles.howItWorks}>
                    <div className={styles.container}>
                        <div>
                            <h2 className={styles.howItWorksMainSystemSteps}>5 simple steps</h2>
                            <div className={styles.howItWorksContestTypeRow}>
                                    {this.StepsItemsRender()}


                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

};


export default SimpleSteps;