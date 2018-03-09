import React from 'react';
import Link, { navigateTo } from 'gatsby-link';
import { Button, Logo } from 'offcourse-ui-components';

import './style.less';

const Footer = () => {
  const renderMenu = () => {
    return (
      <div>
        <strong>Menu</strong>
        <div className="ui list">
          <div className="item">
            <Link to="join">Join</Link>
          </div>
          <div className="item">
            <Link to="collaborate">Collaborate</Link>
          </div>
          <div className="item">
            <Link to="donate">Donate</Link>
          </div>
          <div className="item">
            <Link to="sign-in">Sign in</Link>
          </div>
          <div className="item">
            <Button
              positive
              onClick={() => { navigateTo('sign-up'); }}
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderSocial = () => {
    return (
      <div>
        <strong>Social</strong>
        <div className="ui list">
          <div className="item">
            <a href="https://medium.com/@offcourse_io">Medium</a>
          </div>
          <div className="item">
            <a href="https://www.meetup.com/Serverless-Meetup">Meetup</a>
          </div>
          <div className="item">
            <a href="https://twitter.com/offcourse_">Twitter</a>
          </div>
          <div className="item">
            <a href="https://www.linkedin.com/company/7962249/">LinkedIn</a>
          </div>
          <div className="item">
            <a href="mailto:contact@offcourse.io">Email</a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Footer">
      <div className="Footer__logo center aligned">
        <Logo />
      </div>

      <div className="ui grid container">
        <div className="three column row">
          <div className="left floated column">
            <p>
              Offcourse<br />
              Schiedamsevest 154<br />
              3011 BH Rotterdam
            </p>
          </div>
          <div className="right floated column">
            {renderMenu()}
          </div>
          <div className="right floated column">
            {renderSocial()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;