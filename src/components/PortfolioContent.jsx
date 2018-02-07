import React from 'react';

const PortfolioContent = (props) => (
  <div className="content" style={{width: '100%',backgroundColor: '#fff', zIndex:'-2'}}>
    <div className="container">
      <div className="container_item">
        <h1>Fullstack Web Developer</h1>
        <p>Hi, my name is Aaron, and I build cool web applications. My primary tools include React, 
        Node, Express, and both noSQL and SQL databases. I've built several full-stack web 
        applications ranging from text analysis to social network real-time chatting. I've been programming in 
        JavaScript ES6 since 2017, and have a strong foundation in HTML and CSS. This portfolio and 
        list of projects is the culmination of hundreds of hours of hard work and discipline for my 
        craft. I won't bore you with buzzwords or show you a website created with free boilerplate. 
        There are no templates, no cookie cutter site generators, only raw coding ability and engineering 
        precision. Give me a project and I will consume it. 
        </p>
      </div>
    </div>
    <div className="container dark">
      <div className="container_item wide">
        <span className="vertical_helper"></span><img height="200px" src="https://cdn.dribbble.com/users/31731/screenshots/384224/attachments/20536/imac-template.png"/>
        <span className="container_item wide content"><h1>Friend.ly</h1><p>Public event oriented social network with real-time chat</p><p>Firebase, AWS, Google Maps</p></span>
      </div>
      <div className="container_item wide">
        <span className="vertical_helper"></span><img height="200px" src="https://placeit.net/uploads/stage/stage_image/11392/default_watermarked_17152base.png"/>
        <span className="container_item wide content"><h1>OkCoupon</h1><p>Online coupon aggregator designed for mobile</p><p>AWS, Bootstrap, Sqoot API</p></span>
      </div>
      <div className="container_item wide">
        <span className="vertical_helper"></span><img height="200px" src="https://cdn.dribbble.com/users/31731/screenshots/384224/attachments/20536/imac-template.png"/>
        <span className="container_item wide content"><h1>Flock</h1><p>Twitter sentiment analyzer with an amazing user interface</p><p>MongoDB, Twitter OAuth, SCSS</p></span>
      </div>
      <div className="container_item wide">
        <span className="vertical_helper"></span><img height="200px" src="https://placeit.net/uploads/stage/glare_image/5020/default_a11409glare.png"/>
        <span className="container_item wide content"><h1>Kaleidoscope Dashboard</h1><p>A dashboard designed for a browser homepage which combines useful info daily</p><p>Google OAuth2.0, Google User suite, News API</p></span>
      </div>
    </div>
    <div style={{textAlign: 'center', padding: '10px', backgroundColor: 'rgba(29, 31, 33, .5)', color: '#fff'}}>Copyright 2018 Aaron Chan</div>
  </div>
)

export default PortfolioContent