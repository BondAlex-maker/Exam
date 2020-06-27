import React, {Component} from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';


class Footer extends Component {
    AnyItemsRender = (item) => {
        if (item.title){
            return (
                <div>
                    <h4>{item.title}</h4>
                    {item.items.map(i => <a key={i} href="https://google.com">{i}</a>)}
                </div>
            )
        }else {
            return (
                <div>
                    {item.items.map(i => <a key={i} href="https://google.com">{i}</a>)}
                </div>
            );
        }

    };

    FooterItemsRender() {
        return CONSTANTS.FooterItems.map(item => this.AnyItemsRender(item))
    };

    FooterBottomItemsRender() {
        return CONSTANTS.FooterBottomItems.map(item => this.AnyItemsRender(item))
    };



    render() {
        return (
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div>
                        {this.FooterItemsRender()}
                    </div>
                    <h1>FEATURED CATEGORIES</h1>
                    <div>
                        {this.FooterBottomItemsRender()}
                    </div>

                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.container}>
                        <div className={styles.itemsRow}>
                            <div>
                                <a href="http://google.com" >
                                    <img src="https://howbrandsarebuilt.com/wp-content/themes/howbab/images/squadhelp.png" alt="SquadHelp" className={styles.size}/>
                                </a>
                                <a href="http://google.com">
                                    Squadhelp.com has a Shopper Approved rating of <br/>
                                    4.9/5 based on 2684 ratings and reviews
                                </a>
                            </div>
                            <div className={styles.flex}>
                                <p>Copyright © 2020 Squadhelp Inc</p>
                                <ul>
                                    <li><a href="http://google.com"><i className="fa fa-facebook" aria-hidden="true"/></a></li>
                                    <li><a href="http://google.com"><i className="fa fa-twitter" aria-hidden="true"/></a></li>
                                </ul>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Footer;
