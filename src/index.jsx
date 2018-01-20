import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Modal from 'react-modal';
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
      raining: false
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

    this.renderr = null;
    this.mouse = null;
    this.mouseConstraint = null;
  }

  componentDidMount() {
    this.createWorld()
    $(window).resize(() => {
      this.handleReload()
    })
  }
  handleClick(box) {
    if (this.state.startClickPos.x === this.state.endClickPos.x && this.state.startClickPos.y === this.state.endClickPos.y) {
      if (box !== 'Rectangle Body' && box !== 'Circle Body') {
        this.handleModal(box)
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
    console.log('toggle')
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
    $("canvas").remove();
    this.engine.events = {};
    this.World.clear(this.engine.world);
    this.Engine.clear(this.engine);
    this.engine = this.Engine.create()
    this.engine.world.gravity.scale *=7
    let width = $(window).width();
    let height = $(window).height();
    let nameWidth = $('.name').width();
    let nameHeight = $('.name').height();
    let vmin = Math.min(width, height)
    let boxWidth = vmin*.175
    this.renderr = this.Render.create({
        element: document.body,
        engine: this.engine,
        options: {
          wireframes: false,
          background: 'transparent',
          height: height,
          width: width-1
        }
    });
    this.mouse = this.Mouse.create(this.renderr.canvas)
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
      this.handleClick(e.body.label)
    })
    this.Engine.run(this.engine);
    this.Render.run(this.renderr);
    this.addBlocks()
  }
  addBlocks() {

    let width = $(window).width();
    let height = $(window).height();
    let nameWidth = $('.name').width();
    let nameHeight = $('.name').height();
    let vmin = Math.min(width, height)
    let boxWidth = vmin*.175

    this.renderr.options.width = width
    this.renderr.options.height= height
    this.renderr.canvas.width=width
    this.renderr.canvas.height = height

    let ground = this.Bodies.rectangle(width/2, height+5, width, 5, {
      isStatic: true
    })
    let leftWall = this.Bodies.rectangle(-25, height/2, 50, height*10, {
      isStatic: true
    })
    let rightWall = this.Bodies.rectangle(width+25, height/2, 50, height*10, {
      isStatic: true
    })
    let ceiling = this.Bodies.rectangle(width/2, -height/2, width*2, 5, {
      isStatic: true
    })
    let boxName = this.Bodies.rectangle(width/2, height*.29, nameWidth*1.3, nameHeight*.35, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })
    let circleName = this.Bodies.circle(width/2, height*.35, nameWidth/2, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })
    let boxJS = this.Bodies.rectangle(width/2, -110, boxWidth, boxWidth, {
      label: 'JavaScript',
      angle: Math.floor(Math.random() * Math.floor(5)),
      isStatic: true,
      render: {
        sprite: {
          texture: 'javascript720.png',
          xScale: boxWidth/720,
          yScale: boxWidth/720
        }
      }
    });
    let boxHTML = this.Bodies.rectangle(width/2.5, -110, boxWidth, boxWidth, {
      label: 'HTML',
      angle: 2,
      isStatic: true,
      render: {
        sprite: {
          texture: 'html300.png',
          xScale: boxWidth/300,
          yScale: boxWidth/300
        }
      }
    });
    let circleGit = this.Bodies.circle(50, -110, boxWidth/2, {
      label: 'Github',
      isStatic: true,
      render: {
        sprite: {
          texture: 'github.svg',
          xScale: boxWidth/438.549,
          yScale: boxWidth/438.549
        }
      }
    })
    let boxSQL = this.Bodies.rectangle(width/2, -110, boxWidth, boxWidth, {
      label: 'mySQL',
      isStatic: true,
      render: {
        sprite: {
          texture: 'mysql.jpg',
          xScale: boxWidth/400,
          yScale: boxWidth/400
        }
      }
    });
    let boxReact = this.Bodies.rectangle(width*.6, -110, boxWidth, boxWidth, {
      angle: 3,
      label: 'React',
      isStatic: true,
      render: {
        sprite: {
          texture: 'react.svg',
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
          texture: 'angular.jpg',
          xScale: boxWidth/225,
          yScale: boxWidth/225
        }
      }
    }) 
    let boxMongo = this.Bodies.rectangle(width/1.3, -110, boxWidth, boxWidth, {
      label: 'MongoDB',
      angle: 1.5,
      isStatic: true,
      render: {
        sprite: {
          texture: 'MongoDB.png',
          xScale: boxWidth/245,
          yScale: boxWidth/245
        }
      }
    });
    let boxJQuery = this.Bodies.rectangle(width/3, -110, boxWidth, boxWidth, {
      label: 'jQuery',
      angle: 5,
      isStatic: true,
      render: {
        sprite: {
          texture: 'jquery.jpg',
          xScale: boxWidth/512,
          yScale: boxWidth/512
        }
      }
    });
    let boxSublime = this.Bodies.rectangle(width/1.2, -110, boxWidth, boxWidth, {
      label: 'Sublime Text',
      angle: 5,
      isStatic: true,
      render: {
        sprite: {
          texture: 'sublime.png',
          xScale: boxWidth/256,
          yScale: boxWidth/256
        }
      }
    });
    this.World.add(this.engine.world, [this.mouseConstraint, boxName, circleName, boxJS, boxHTML, circleGit, boxReact, boxAngular, boxSQL, boxMongo, boxJQuery, boxSublime, ground, leftWall, rightWall, ceiling])
    setTimeout(() => {
      this.Body.setStatic(boxJS, false)
    },1000)
    setTimeout(() => {
      this.Body.setStatic(boxHTML, false)
    },2000)
    setTimeout(() => {
      this.Body.setStatic(circleGit, false)
    },2500)
    setTimeout(() => {
      this.Body.setStatic(boxReact, false)
      this.Body.setStatic(boxAngular, false)
    },3000)
    setTimeout(() => {
      this.Body.setStatic(boxJQuery, false)
      this.Body.setStatic(boxMongo, false)
      this.Body.setStatic(boxSQL, false)
      this.Body.setStatic(boxSublime, false)
    },3400)
  }
  render () {
    return (<div>
      <Modal isOpen={this.state.showModal} ariaHideApp={false} style={{overlay: {animation: 'fadein .25s'}, content: {animation: 'fadein .4s', position:'absolute', textAlign: 'center'}}}>
      <div style={{backgroundColor: '#eee', height: '90%', fontSize: '7vmin', overflowY:'scroll'}}>
      <p>{'I know ' + this.state.box}</p>
      </div>
      <button className="closeModal" onClick={() => {this.handleModal()}}>Close</button>
      </Modal>
      <h1 className="name">Aaron<span></span><p className="webdev2">WEB DEV</p><p className="webdev">WEB DEV</p></h1><h1 className="tutorial">Click or drag an icon!</h1><button className="bullet" onClick={() => {this.handleBulletTime()}}>Activate Bullet Time</button><button className="reload" onClick={() => {this.handleReload()}}>Restart Sandbox</button><button className="rain" onClick={() => {this.toggleRain()}}>☔</button></div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));