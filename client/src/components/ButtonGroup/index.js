import React, {Component} from 'react';
import styles from './ButtonGroup.module.sass';
import CONSTANTS from '../../constants.js';


class ButtonGroup extends Component {

    AnyItemsRender = (item) => {
            return (
                <div className={styles.border}>
                    <a href="http://google.com" className={styles.reference}>{item.title}</a>
                    <div className={styles.divElem}>{item.items}</div>
                </div>
            )

    };

    ButtonGroupItemsRender() {
        return CONSTANTS.ButtonGroupItems.map(item => this.AnyItemsRender(item))
    };





    render() {
        return (
            <div className={styles.flex}>
                {this.ButtonGroupItemsRender()}
            </div>
        )


    }
}

export default ButtonGroup;
