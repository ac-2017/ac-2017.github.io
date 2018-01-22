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
    $('canvas').bind('mousewheel', (e)=>{
      if (e.originalEvent.wheelDelta > 0) {
              
      } else {
        this.handleBulletTime()
      }
    })
    $('canvas').click(() => {
      console.log('asd')
    })
  }
  handleClick(box) {
    if (this.state.startClickPos.x === this.state.endClickPos.x && this.state.startClickPos.y === this.state.endClickPos.y) {
      if (box !== 'Rectangle Body' && box !== 'Circle Body') {
        if (box === 'Email') {
          this.handleModal(box)
        } 
        if (box === 'Github') {
          window.open("https://github.com/ac-2017", "_blank")
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
    let ground = this.Bodies.rectangle(width/2, height+250, width, 500, {
      isStatic: true
    })
    let leftWall = this.Bodies.rectangle(-250, height/2, 500, height*10, {
      isStatic: true
    })
    let rightWall = this.Bodies.rectangle(width+250, height/2, 500, height*10, {
      isStatic: true
    })
    let ceiling = this.Bodies.rectangle(width/2, -450, width*2, 500, {
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
      this.Body.setStatic(circleGit, false)
      this.Body.setStatic(circleEmail, false)
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
    },3400)
  }
  render () {
    return (<div>
      <Modal isOpen={this.state.showModal} ariaHideApp={false} style={{overlay: {animation: 'fadein .25s'}, content: {animation: 'fadein .4s', position:'absolute', textAlign: 'center'}}}>
      <div style={{backgroundColor: '#eee', height: '85%', fontSize: '7vmin', overflowY:'scroll'}}>
      <p><br/>{'Email me: aaron.111317@gmail.com'}</p><hr/>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies non arcu non dignissim. Aenean porta eu felis at tempus. Donec purus sapien, ullamcorper id libero quis, venenatis imperdiet lectus. Pellentesque erat nisi, semper eu fringilla eget, sollicitudin id ante. Ut efficitur vulputate ligula sit amet dapibus. In egestas augue enim. Sed a tellus est.

Duis sollicitudin neque nec dignissim eleifend. Ut non urna at erat blandit pharetra. Aliquam mi felis, elementum eu mi nec, cursus condimentum velit. Etiam sodales orci vel nisl tempus, vel pretium odio luctus. Vivamus consequat libero velit, ut consectetur velit convallis sit amet. Sed consectetur, erat a finibus tempor, dolor velit auctor nisl, eget rhoncus neque felis et lacus. Vivamus facilisis, nisl porta semper facilisis, mi metus imperdiet lorem, vitae molestie ante leo accumsan ligula. In hac habitasse platea dictumst. Nam justo leo, vehicula vitae iaculis id, porta sed diam.

Cras consectetur fermentum enim, nec lacinia nunc volutpat vel. Sed in massa vel leo dictum consequat. Sed interdum faucibus dapibus. Nullam pharetra justo non dapibus ultricies. Suspendisse luctus facilisis eros, ac fringilla magna pharetra eu. Aliquam maximus ligula mollis lorem blandit, id consequat lectus facilisis. Proin ac turpis enim. Nullam eget massa condimentum, venenatis diam at, molestie mauris.

In at malesuada neque, nec feugiat est. Morbi congue sed est rhoncus condimentum. Integer nec vehicula metus. Phasellus sed euismod nibh. Pellentesque in eleifend arcu. Sed rhoncus felis turpis, ut bibendum urna scelerisque vitae. Sed finibus mauris mauris, in molestie felis semper non. Mauris non ex nisi. Cras elementum sapien non pharetra mattis. Etiam convallis ultricies auctor. Etiam faucibus a arcu vitae pellentesque. Praesent fermentum, elit a egestas molestie, nisl purus viverra neque, eget egestas purus erat vel erat.

Aliquam ipsum tellus, euismod ut sodales ac, placerat eget dui. Praesent convallis odio ac neque dignissim, at finibus dolor suscipit. Sed venenatis odio nec rutrum malesuada. Suspendisse quis metus at lorem feugiat mattis in vel diam. Suspendisse viverra, nunc nec tempus tempor, tortor neque vulputate ante, at venenatis eros nulla ac nunc. Ut libero enim, tempor et ultrices sit amet, ultricies ut metus. Phasellus pretium lacus a lacus fermentum, eget aliquam nunc accumsan. In nec dignissim justo. Quisque congue massa nisl, a ultricies nibh luctus at. Donec a augue dolor. Curabitur sodales ante ut urna molestie dapibus. Proin dolor elit, lacinia quis magna at, egestas ullamcorper nibh. Cras semper, sem sit amet viverra fermentum, sem velit sagittis felis, sed dapibus ipsum ligula eu magna. Suspendisse in ipsum ac ante egestas eleifend. Pellentesque posuere nec elit nec elementum.
      </p>
      </div>
      <br/>
      <button className="closeModal" onClick={() => {this.handleModal()}}>Close</button>
      </Modal>
      <h1 className="name">Aaron<span></span><p className="webdev2">WEB DEV</p><p className="webdev">WEB DEV</p></h1></div>)
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
//<button className="bullet" onClick={() => {this.handleBulletTime()}}>🌪️</button><button className="reload" onClick={() => {this.handleReload()}}>🔄</button><button className="rain" onClick={() => {this.toggleRain()}}>☔</button>
//<h1 className="tutorial">Click or drag an icon!</h1>