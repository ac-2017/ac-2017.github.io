import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// import Modal from 'react-modal';
import InfoModal from './components/InfoModal.jsx'
import PortfolioContent from './components/PortfolioContent.jsx'
// import AnyComponent from './components/filename.jsx'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bulletTime: false,
      startClickPos: {},
      endClickPos: {},
      showModal: false,
      box: '',
      raining: false,
      alpha: 0,
      beta: 0,
      gamma: 0,
      rotationSupported: false
    }
    this.createWorld = this.createWorld.bind(this)
    this.Engine = Matter.Engine
    this.Render = Matter.Render
    this.World = Matter.World
    this.Body = Matter.Body
    this.Bodies = Matter.Bodies
    this.Bounds = Matter.Bounds
    this.Composite = Matter.Composite
    this.Common = Matter.Common
    this.Mouse = Matter.Mouse
    this.Events = Matter.Events
    this.MouseConstraint = Matter.MouseConstraint
    this.engine = this.Engine.create();
    this.handleClick = this.handleClick.bind(this)
    this.bulletTime = this.bulletTime.bind(this)
    this.handleBulletTime = this.handleBulletTime.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.addBlocks = this.addBlocks.bind(this)
    this.handleReload = this.handleReload.bind(this)
    this.heavyRain = this.heavyRain.bind(this)
    this.toggleRain = this.toggleRain.bind(this)
    this.rotation = this.rotation.bind(this)
    this.renderr = null;
    this.mouse = null;
    this.mouseConstraint = null;
    this.windowWidth = null;
  }
  componentDidMount() {
    this.createWorld()
    this.windowWidth = $(window).width();
      $(window).resize(() => {
        if ($(window).width() !== this.windowWidth) {
          this.windowWidth = $(window).width()
          this.handleReload()
        }
      })     
    $(window).bind('mousewheel', (e)=>{
      if (e.originalEvent.wheelDelta > 0 && $(window).scrollTop() === 0) {
        this.handleBulletTime()
      } else {
        // this.handleBulletTime()
      }
    })
    var swipe, start
    $('body').on('touchstart', (e) => {
      swipe = e.originalEvent.touches
      start = swipe[0].pageY
    })
    .on('touchmove', (e) =>{
      var contact = e.originalEvent.touches
      var end = contact[0].pageY
      var distance = end-start
      if ($(window).scrollTop() === 0 && distance >5) {
        this.handleBulletTime()
      }
    })
    if(window.DeviceOrientationEvent){
      window.addEventListener("deviceorientation", this.rotation, false);
      this.setState({rotationSupported: true})
    } else {
      console.log("DeviceOrientationEvent is not supported");
    }
  }
  rotation(event) {
    this.setState(prevState => ({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    }))
    this.engine.world.gravity.y = event.beta * .14
    this.engine.world.gravity.x = event.gamma * .14
  }
  handleClick(box) {
    // console.log(box)
    if (this.state.startClickPos.x === this.state.endClickPos.x && this.state.startClickPos.y === this.state.endClickPos.y) {
      if (box.label !== 'Rectangle Body' && box.label !== 'Circle Body') {
        if (box.label === 'Email') {
          this.handleModal(box)
        } else if (box.label === 'Github') {
          window.open("https://github.com/ac-2017", "_blank")
        } else if (!box.label.includes('shattered')) {
          let width = $('body').width();
          let height = $('body').height();
          let boxWidth = Math.min(width,height)*.175
          let newBox = this.Bodies.rectangle(box.position.x+boxWidth/2, box.position.y+boxWidth/2, boxWidth/2, boxWidth/2, {
            label: box.label + 'shattered',
            angle: 1,
            render: {
              sprite: {
                texture: box.render.sprite.texture,
                xScale: box.render.sprite.xScale/1.5,
                yScale: box.render.sprite.yScale/1.5
              }
            }
          })
          let newBox2 = this.Bodies.rectangle(box.position.x+boxWidth/2, box.position.y-boxWidth/2, boxWidth/2, boxWidth/2, {
            label: box.label + 'shattered',
            angle: 1,
            render: {
              sprite: {
                texture: box.render.sprite.texture,
                xScale: box.render.sprite.xScale/1.5,
                yScale: box.render.sprite.yScale/1.5
              }
            }
          })
          let newBox3 = this.Bodies.rectangle(box.position.x-boxWidth/2, box.position.y+boxWidth/2, boxWidth/2, boxWidth/2, {
            label: box.label + 'shattered',
            angle: 1,
            render: {
              sprite: {
                texture: box.render.sprite.texture,
                xScale: box.render.sprite.xScale/1.5,
                yScale: box.render.sprite.yScale/1.5
              }
            }
          })
          let newBox4 = this.Bodies.rectangle(box.position.x-boxWidth/2, box.position.y-boxWidth/2, boxWidth/2, boxWidth/2, {
            label: box.label + 'shattered',
            angle: 1,
            render: {
              sprite: {
                texture: box.render.sprite.texture,
                xScale: box.render.sprite.xScale/1.5,
                yScale: box.render.sprite.yScale/1.5
              }
            }
          })
          this.Composite.remove(this.engine.world, box)
          this.World.add(this.engine.world, [newBox, newBox2, newBox3, newBox4])
        }
      } 
    }
  }
  handleModal(box) {
    this.setState({
      box: box,
      showModal: !this.state.showModal
    })
  }
  handleBulletTime() {
    if (!this.state.bulletTime) {
      this.setState({
        bulletTime: true
      })
      this.bulletTime(this.engine)
    }
  }
  handleReload() {
    this.World.clear(this.engine.world, false)
    this.addBlocks()
  }
  
  toggleRain() {
    // console.log('toggle')
    this.setState({
      raining: !this.state.raining
    })
    setTimeout(() => {
      this.heavyRain()
    },200)
  }
  bulletTime(engine) {
    var bodies = this.Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      if (!body.isStatic) {
        var forceMagnitude = 0.11 * body.mass;
        this.Body.applyForce(body, body.position, { 
          x: 0, 
          y: -forceMagnitude + this.Common.random() * -forceMagnitude
        });
      }
    }
    setTimeout(() => {
      this.engine.timing.timeScale = .3
    },200)
    setTimeout(() => {
      this.engine.timing.timeScale = 1
    },1500)
    setTimeout(() => {
      this.setState({
        bulletTime: false
      })
    },2500)
  }
  heavyRain() {
    let width = $(window).width()
    let rainDrop = this.Bodies.circle( (Math.floor(Math.random() * Math.floor(width)) ), -1, 10, {
      render: {
        sprite: {
          texture: 'https://www.shareicon.net/data/512x512/2015/10/07/113639_drop_512x512.png',
          xScale: 10/512,
          yScale: 10/512
        }
      }
    })
    this.World.add(this.engine.world, [rainDrop])
    if (this.state.raining) {
      setTimeout(() => {
        this.heavyRain()
      },100)
    }
  }
  createWorld() {
    // $("canvas").remove();
    let canvas = $('#MatterJs')
    this.engine.events = {};
    this.World.clear(this.engine.world);
    this.Engine.clear(this.engine);
    this.engine = this.Engine.create()
    this.engine.world.gravity.scale *=7
    let width = $('body').width();
    let height = $('body').height();
    let nameWidth = $('.name').width();
    let nameHeight = $('.name').height();
    // console.log(height)
    let vmin = Math.min(width, height)
    let boxWidth = vmin*.175
    this.renderr = this.Render.create({
        element: document.querySelector('#MatterJS'),
        options: {
          wireframes: false,
          background: 'transparent',
          height: height,
          width: width
        },
        engine: this.engine
    });
    this.mouse = this.Mouse.create(this.renderr.canvas)
    this.mouse.element.removeEventListener("mousewheel", this.mouse.mousewheel);
    this.mouse.element.removeEventListener("DOMMouseScroll", this.mouse.mousewheel);
    this.mouse.element.removeEventListener("touchmove", this.mouse.mousemove);
    this.mouse.element.removeEventListener('touchstart', this.mouse.mousedown);
    this.mouse.element.removeEventListener('touchend', this.mouse.mouseup);
    this.mouseConstraint = this.MouseConstraint.create(this.engine, {
        mouse: this.mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
      });
    this.Events.on(this.mouseConstraint, "startdrag", (e) => {
      this.setState({
        startClickPos: {x: e.mouse.absolute.x, y: e.mouse.absolute.y}
      })
    })
    this.Events.on(this.mouseConstraint, "enddrag", (e) => {
      this.setState({
        endClickPos: {x: e.mouse.absolute.x, y: e.mouse.absolute.y}
      })
      this.handleClick(e.body)
    })
    this.Engine.run(this.engine);
    this.Render.run(this.renderr);
    this.addBlocks()
  }
  addBlocks() {
    let width = $('#MatterJS').width();
    let height = $('#MatterJS').height();
    let nameWidth = $('.name').width();
    let nameHeight = $('.name').height();
    let vmin = Math.min(width, height)
    let boxWidth = vmin*.175
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // is mobile..
      boxWidth *=1.25;
      var isMobile = true
    }
    this.renderr.options.width = width
    this.renderr.options.height= height
    this.renderr.canvas.width=width
    this.renderr.canvas.height = height
    let ground = this.Bodies.rectangle(width/2, height+125, width, 250, {
      isStatic: true
    })
    let leftWall = this.Bodies.rectangle(-125, height/2, 250, height*10, {
      isStatic: true
    })
    let rightWall = this.Bodies.rectangle(width+125, height/2, 250, height*10, {
      isStatic: true
    })
    let ceiling = this.Bodies.rectangle(width/2, -400, width*2, 250, {
      isStatic: true
    })
    let boxName = this.Bodies.rectangle(width/2, height*.4, nameWidth*1.3, nameHeight*.35, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })
    let circleName = this.Bodies.circle(width/2, height*.45, nameWidth/1.75, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })
    let boxJS = this.Bodies.rectangle(width/2, -120, boxWidth, boxWidth, {
      label: 'JavaScript',
      angle: 1,
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/javascript720.png',
          xScale: boxWidth/720,
          yScale: boxWidth/720
        }
      }
    });
    let boxHTML = this.Bodies.rectangle(width/2.5, -120, boxWidth, boxWidth, {
      label: 'HTML',
      angle: 2,
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/html300.png',
          xScale: boxWidth/300,
          yScale: boxWidth/300
        }
      }
    });
    let circleGit = this.Bodies.circle(150, -120, boxWidth*.75, {
      label: 'Github',
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/github.svg',
          xScale: boxWidth/438.549/.70,
          yScale: boxWidth/438.549/.70
        }
      }
    })
    let circleEmail = this.Bodies.circle(150, -400, boxWidth*.75, {
      label: 'Email',
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/email.png',
          xScale: boxWidth/2400/.70,
          yScale: boxWidth/2400/.70
        }
      }
    })
    let boxSQL = this.Bodies.rectangle(width/2, -120, boxWidth, boxWidth, {
      label: 'mySQL',
      angle: 7,
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/mysql.jpg',
          xScale: boxWidth/400,
          yScale: boxWidth/400
        }
      }
    });
    let boxReact = this.Bodies.rectangle(width*.6, -120, boxWidth, boxWidth, {
      angle: 3,
      label: 'React',
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/react.svg',
          xScale: boxWidth/3618.59,
          yScale: boxWidth/3618.59
        }
      }
    });
    let boxAngular = this.Bodies.rectangle(width*.3, -200, boxWidth, boxWidth, {
      label: 'Angular',
      isStatic: true,
      angle:2,
      render: {
        sprite: {
          texture: 'icons/angular.jpg',
          xScale: boxWidth/225,
          yScale: boxWidth/225
        }
      }
    }) 
    let boxMongo = this.Bodies.rectangle(width/1.3, -120, boxWidth, boxWidth, {
      label: 'MongoDB',
      angle: 1.5,
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/MongoDB.png',
          xScale: boxWidth/245,
          yScale: boxWidth/245
        }
      }
    });
    let boxJQuery = this.Bodies.rectangle(width/3, -120, boxWidth, boxWidth, {
      label: 'jQuery',
      angle: 5,
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/jquery.jpg',
          xScale: boxWidth/512,
          yScale: boxWidth/512
        }
      }
    });
    let boxSublime = this.Bodies.rectangle(width/1.2, -120, boxWidth, boxWidth, {
      label: 'Sublime Text',
      angle: 5,
      isStatic: true,
      render: {
        sprite: {
          texture: 'icons/sublime.png',
          xScale: boxWidth/256,
          yScale: boxWidth/256
        }
      }
    });
    this.World.add(this.engine.world, [this.mouseConstraint, boxName, circleName, circleEmail, boxJS, boxHTML, circleGit, boxReact, boxAngular, boxSQL, boxMongo, boxJQuery, boxSublime, ground, leftWall, rightWall, ceiling])
    setTimeout(() => {
      this.Body.setStatic(boxJS, false)
    },1000)
    setTimeout(() => {
      this.Body.setStatic(boxHTML, false)
    },2000)
    setTimeout(() => {
      if (!isMobile) this.Body.setStatic(circleGit, false)
    },2000)
    setTimeout(() => {
      this.Body.setStatic(boxReact, false)
      this.Body.setStatic(boxAngular, false)
    },3000)
    setTimeout(() => {
      this.Body.setStatic(boxJQuery, false)
      this.Body.setStatic(boxMongo, false)
      this.Body.setStatic(boxSQL, false)
      this.Body.setStatic(boxSublime, false)
      if (!isMobile) this.Body.setStatic(circleEmail, false)
    },3400)
  }
  render () {
    return (<div style={{height: '100%'}}><div style={{animation: 'fadein 1s'}}>
      <InfoModal showModal={this.state.showModal} handleModal={this.handleModal}/>
      <h1 className="name">Aaron<span></span><p className="webdev2">WEB DEV</p><p className="webdev">WEB DEV</p></h1>
      </div>
      <p style={{color: '#fff'}}>{this.state.rotationSupported + ' alpha ' + this.state.alpha + ' beta ' +  this.state.beta + ' gamma ' + this.state.gamma}</p>
      <div id="MatterJS"></div>
      <PortfolioContent/>
      </div>
      )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
//<button className="bullet" onClick={() => {this.handleBulletTime()}}>🌪️</button><button className="reload" onClick={() => {this.handleReload()}}>🔄</button><button className="rain" onClick={() => {this.toggleRain()}}>☔</button>
//<h1 className="tutorial">Click or drag an icon!</h1>