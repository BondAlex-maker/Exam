import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./HowItWorks.module.sass";
import classNames from "classnames";
import SimpleSteps from "../../components/SimpleSteps";
import SACBanner from "../../components/StartAContestBanner";
import CONSTANTS from "../../constants";
import QuestionList from "../../components/HowItWorksQuestionList";
import GetInTouch from "../../components/GetInTouch";
import ReactPlayer from "react-player";
import ButtonGroup from "../../components/ButtonGroup"

const HowItWorks = () => {

    return (

        <>
            <Header id="header"/>
            <div className={styles.container}>
                <div className={styles.howItWork}>
                    <div className={styles.headerVideo}>
                        <div className={styles.videoPosition}>
                            <div className={styles.responsiveWrapper}>
                                <div>
                                    <ReactPlayer
                                        url="https://vimeo.com/243556536"
                                        width="700px"
                                        height="450px"
                                        playing
                                        playIcon={<button>Play</button>}
                                        light="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.textWrap}><h1>How Does Squadhelp Work?</h1>How Does Squadhelp Work?
                        Squadhelp helps you come up with a great name for your business by combining the power of
                        crowdsourcing with sophisticated technology and Agency-level validation services.
                    </div>
                </div>
            </div>


            <SimpleSteps/>
            <SACBanner/>
            <QuestionList/>
            <GetInTouch/>
            <ButtonGroup/>
            <Footer/>
            <a onClick={window.scroll(0, 0)} href="#header" className={styles.scrollUp}>
                <i className="fas fa-arrow-circle-up"/>
            </a>

        </>
    );
}

export default HowItWorks;