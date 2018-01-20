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
      box: ''
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
  }

  componentDidMount() {
    this.createWorld()
    $(window).resize(() => {
      this.createWorld()
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
      this.engine.world.gravity.scale /= 10
    },300)
    setTimeout(() => {
      this.engine.world.gravity.scale *=10
    },1500)
    setTimeout(() => {
      this.setState({
        bulletTime: false
      })
    },2500)
  }
  createWorld() {
    $("canvas").remove();
    // let Engine = Matter.Engine,
    //     Render = Matter.Render,
    //     World = Matter.World,
    //     Bodies = Matter.Bodies,
    //     Mouse = Matter.Mouse,
    //     MouseConstraint = Matter.MouseConstraint;
    this.engine.events = {};
    this.World.clear(this.engine.world);
    this.Engine.clear(this.engine);
    this.engine = this.Engine.create()
    this.engine.world.gravity.scale *=5

    let width = $(window).width();
    let height = $(window).height();
    let nameWidth = $('.name').width();
    let nameHeight = $('.name').height();
    let vmin = Math.min(width, height)
    let boxWidth = vmin*.175
    let render = this.Render.create({
        element: document.body,
        engine: this.engine,
        options: {
          wireframes: false,
          background: 'transparent',
          height: height,
          width: width-1
        }
    });
    let ground = this.Bodies.rectangle(width/2, height+5, width, 5, {
      isStatic: true
    })
    let leftWall = this.Bodies.rectangle(-2, height/2, 2, height*10, {
      isStatic: true
    })
    let rightWall = this.Bodies.rectangle(width, height/2, 2, height*10, {
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
    let boxJS = this.Bodies.rectangle(600, 200, boxWidth, boxWidth, {
      label: 'JavaScript',
      angle: 2,
      render: {
        sprite: {
          texture: 'javascript720.png',
          xScale: boxWidth/720,
          yScale: boxWidth/720
        }
      }
    });
    let boxHTML = this.Bodies.rectangle(600, 200, boxWidth, boxWidth, {
      label: 'HTML',
      angle: 2,
      render: {
        sprite: {
          texture: 'html300.png',
          xScale: boxWidth/300,
          yScale: boxWidth/300
        }
      }
    });
    let circleGit = this.Bodies.circle(width/2.7, height/3, boxWidth/2, {
      label: 'Github',
      render: {
        sprite: {
          texture: 'github.svg',
          xScale: boxWidth/438.549,
          yScale: boxWidth/438.549
        }
      }
    })
    let boxSQL = this.Bodies.rectangle(650, 50, boxWidth, boxWidth, {
      label: 'mySQL',
      render: {
        sprite: {
          texture: 'mysql.jpg',
          xScale: boxWidth/400,
          yScale: boxWidth/400
        }
      }
    });
    let boxReact = this.Bodies.rectangle(width*.7, 10, boxWidth, boxWidth, {
      angle: 3,
      label: 'React',
      render: {
        sprite: {
          texture: 'react.svg',
          xScale: boxWidth/3618.59,
          yScale: boxWidth/3618.59
        }
      }
    });
    let boxAngular = this.Bodies.rectangle(width*.8, 25, boxWidth, boxWidth, {
      label: 'Angular',
      angle:2,
      render: {
        sprite: {
          texture: 'angular.jpg',
          xScale: boxWidth/250,
          yScale: boxWidth/250
        }
      }
    }) 
    let boxMongo = this.Bodies.rectangle(300, 30, boxWidth, boxWidth, {
      label: 'MongoDB',
      angle: 1.5,
      render: {
        sprite: {
          texture: 'MongoDB.png',
          xScale: boxWidth/245,
          yScale: boxWidth/245
        }
      }
    });
    let boxJQuery = this.Bodies.rectangle(300, 30, boxWidth, boxWidth, {
      label: 'jQuery',
      angle: 5,
      render: {
        sprite: {
          texture: 'jquery.jpg',
          xScale: boxWidth/512,
          yScale: boxWidth/512
        }
      }
    });
    let boxSublime = this.Bodies.rectangle(300, 30, boxWidth, boxWidth, {
      label: 'Sublime Text',
      angle: 5,
      render: {
        sprite: {
          texture: 'sublime.png',
          xScale: boxWidth/256,
          yScale: boxWidth/256
        }
      }
    });

    let mouse = this.Mouse.create(render.canvas)
    let mouseConstraint = this.MouseConstraint.create(this.engine, {
        mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
      });
    this.World.add(this.engine.world, [mouseConstraint, circleName, boxName, boxHTML, boxJS, boxSublime, circleGit, boxSQL, boxReact, boxAngular, boxMongo, boxJQuery, ground, leftWall, rightWall, ceiling]);
    this.Events.on(mouseConstraint, "startdrag", (e) => {
      this.setState({
        startClickPos: {x: e.mouse.absolute.x, y: e.mouse.absolute.y}
      })
    })
    this.Events.on(mouseConstraint, "enddrag", (e) => {
      this.setState({
        endClickPos: {x: e.mouse.absolute.x, y: e.mouse.absolute.y}
      })
      this.handleClick(e.body.label)
    })
    this.Engine.run(this.engine);
    this.Render.run(render);
  }
  render () {
    return (<div>
      <Modal isOpen={this.state.showModal} style={{overlay: {animation: 'fadein .25s'}, content: {animation: 'fadein .4s', position:'absolute', textAlign: 'center'}}}>
      <div style={{backgroundColor: '#eee', height: '90%', fontSize: '7vmin', overflowY:'scroll'}}>
      <p>{'I know ' + this.state.box}</p>
      </div>
      <button className="closeModal" onClick={() => {this.handleModal()}}>Close</button>
      </Modal>
      <h1 className="name">Aaron<span></span><p className="webdev2">WEB DEV</p><p className="webdev">WEB DEV</p></h1><h1 className="tutorial">Click or drag an icon!</h1><button className="bullet" onClick={() => {this.handleBulletTime()}}>Activate Bullet Time</button></div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));