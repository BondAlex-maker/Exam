import React from 'react';
import styles from './Header.module.sass';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CONSTANTS from '../../constants';
import {getUserAction, clearUserStore, headerRequest} from '../../actions/actionCreator';
import Toggle from "../Menu";
import Menu from "../Menu";


class Header extends React.Component{
  componentDidMount () {
    if ( !this.props.data) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.history.replace('/login');
  };

    startContests = () => {
        this.props.history.push('/startContest');
    };
    renderLoginButtons = () => {
        if (this.props.data) {
            return (
                <>
                    <div className={styles.userInfo}>
                        <img
                            src={this.props.data.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${this.props.data.avatar}`}
                            alt='user'/>
                        <span>{`Hi, ${this.props.data.displayName}`}</span>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt='menu'/>
                        <ul>
                            <li><Link to='/dashboard'
                                      style={{textDecoration: 'none'}}><span>View Dashboard</span></Link></li>
                            <li><Link to='/account' style={{textDecoration: 'none'}}><span>My Account</span></Link></li>
                            <li><Link to='http:/www.google.com'
                                      style={{textDecoration: 'none'}}><span>Messages</span></Link></li>
                            <li><Link to='http:/www.google.com' style={{textDecoration: 'none'}}><span>Affiliate Dashboard</span></Link>
                            </li>
                            <li><span onClick={this.logOut}>Logout</span></li>
                        </ul>
                    </div>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`} className={styles.emailIcon} alt='email'/>
                </>
            )
        } else {
            return (
                <>
                    <Link to='/login' style={{textDecoration: 'none'}}><span className={styles.btn}>LOGIN</span></Link>
                    <Link to='/registration' style={{textDecoration: 'none'}}><span
                        className={styles.btn}>SIGN UP</span></Link>
                </>
            )
        }
    };


    render() {

        if (this.props.isFetching) {
            return null;
        }
        return (
            <div className={styles.headerContainer} >
                <div className={styles.fixedHeader}>
                    <span className={styles.info}>Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.</span>
                    <a href="http://www.google.com">Read Announcement</a>
                </div>
                <div className={styles.loginSignnUpHeaders}>
                    <div className={styles.numberContainer}>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt='phone'/>
                        <span>(877)&nbsp;355-3585</span>
                    </div>
                    <div className={styles.userButtonsContainer}>
                        {this.renderLoginButtons()}
                    </div>
                </div>
                    <Menu></Menu>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
  return state.userStore;
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(headerRequest()),
    clearUserStore: () => dispatch(clearUserStore()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));