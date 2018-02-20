import React from 'react';

const PortfolioContent = (props) => (
  <div className="content" style={{width: '100%',backgroundColor: '#fff', zIndex:'-2'}}>
    <div className="container">
      <div className="container_item">
        <h1>Fullstack Web Developer</h1>
        <p>Hi, my name is Aaron, and I build cool web applications. Skilled at JavaScript based solutions 
        for both front-end and back-end applications, with both noSQL and SQL database experience. Built 
          several full-stack web applications ranging from Twitter analysis to social network real-time chatting. 
        Great leadership skills with a knack for analyzing the strengths and weaknesses of my team and 
        giving them the opportunity to utilize their skills at maximum efficiency. Super fast learning and debugging capabilities. 
        Lectured students on fullstack fundamentals and offered code review sessions regularly.  
        This portfolio is the culmination of hundreds of hours of dedication to my craft.
        <br/>
        Currently @ <a href="https://www.hackreactor.com/" target="_blank" style={{textDecoration:'none'}}>Hack Reactor</a>, NYC
        </p>
      </div>
    </div>
    <div className="container dark">
      <div className="container_item wide loading one">
        <span className="vertical_helper"></span><img height="200px" src="https://cdn.dribbble.com/users/31731/screenshots/384224/attachments/20536/imac-template.png"/>
        <span className="container_item wide content"><h1>Friend.ly</h1><p>Event oriented social network with real-time chatting</p><p>Firebase, AWS, Google Maps</p></span>
      </div>
      <div className="container_item wide loading two">
        <span className="vertical_helper"></span><img height="200px" src="https://placeit.net/uploads/stage/stage_image/11392/default_watermarked_17152base.png"/>
        <span className="container_item wide content"><h1>OkCoupon</h1><p>Online coupon aggregator designed for a mobile experience</p><p>AWS, Bootstrap, Sqoot API</p></span>
      </div>
      <div className="container_item wide loading three">
        <span className="vertical_helper"></span><img height="200px" src="/icons/flockapp.png"/>
        <span className="container_item wide content"><h1>Flock</h1><p>Twitter sentiment analyzer with an amazing user interface</p><p>MongoDB, Twitter OAuth, SCSS</p></span>
      </div>
      <div className="container_item wide loading four">
        <span className="vertical_helper"></span><img height="200px" src="/icons/dashboardapp.png"/>
        <span className="container_item wide content"><h1>Kaleidoscope Dashboard</h1><p>A dashboard overview of your day designed for Chrome Extensions</p><p>Google OAuth2.0, Google User suite, News API</p></span>
      </div>

      <div className="container_item wide mobile">
        <span className="vertical_helper"></span><img onClick={() => {props.handleModal()}}height="200px" src="/icons/email.png"/>
      </div>
    </div>
    <div style={{textAlign: 'center', padding: '10px', backgroundColor: 'rgba(29, 31, 33, .5)', color: '#fff'}}>Copyright 2018 Aaron Chan
    <div className="footer_info">
    <a href="https://www.linkedin.com/in/aaron-chan/" target="_blank" style={{marginRight:'10px', textDecoration:'none'}}>LinkedIn</a>
    <a href="https://github.com/ac-2017" target="_blank" style={{marginRight:'10px', textDecoration:'none'}}>Github</a>
    <a href="mailto:aaron.111317@gmail.com?subject=Job Offer&body=Hey, Aaron!" style={{textDecoration:'none'}}>Email</a>
    </div></div>
  </div>
)

export default PortfolioContent