import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo';
import styles from './LoginPage.module.sass';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';

const LoginPage = (props) => {
  const changeRoute = () => {
    props.history.replace('/');
  };
  return (
    <div className={ styles.mainContainer }>
      <div className={ styles.loginContainer }>
        <div className={ styles.headerSignUpPage }>
          <Logo src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` } alt="logo"/>
          <div className={ styles.linkLoginContainer }>
            <Link to='/registration'
                  style={ {textDecoration: 'none',height: '40px', display: 'flex', alignItems: 'center', padding: '5px 10px', border: '1px solid white', borderRadius: '3px'} }><span>Signup</span></Link>
            <a href="http://localhost:9632/forgotpassword"
               style={ {textDecoration: 'none', height: '40px', display: 'flex', alignItems: 'center', padding: '5px 20px', border: '1px solid white', borderRadius: '3px'} }><span>ForgotPassword</span></a>
          </div>
        </div>
        <div className={ styles.loginFormContainer }>
          <LoginForm changeRoute={ changeRoute }/>
        </div>
      </div>
    </div>
  );

};

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearErrorSignUpAndLogin()),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);