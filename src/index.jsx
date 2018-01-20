import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bulletTime: false
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
  }

  componentDidMount() {
    this.createWorld()
    $(window).resize(() => {
      this.createWorld()
    })
  }

  handleClick(box) {
    if (box.label !== 'Rectangle Body' && box.label !== 'Circle Body') {
      // this.bulletTime(this.engine)
    }
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
          texture: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Javascript-736400_960_720.png',
          xScale: boxWidth/720,
          yScale: boxWidth/720
        }
      }
    });
    let boxHTML = this.Bodies.rectangle(600, 200, boxWidth, boxWidth, {
      label: 'HTML',
      angle: 2,
      render: {
        fillStyle: 'black',
        sprite: {
          texture: 'http://www.syntaxxx.com/wp-content/uploads/2014/01/html5-logo-300.png',
          xScale: boxWidth/300,
          yScale: boxWidth/300
        }
      }
    });
    let circleGit = this.Bodies.circle(width/3, height/3, boxWidth/2, {
      label: 'Github',
      render: {
        sprite: {
          texture: 'https://image.flaticon.com/icons/svg/25/25231.svg',
          xScale: boxWidth/438.549,
          yScale: boxWidth/438.549
        }
      }
    })
    let boxSQL = this.Bodies.rectangle(650, 50, boxWidth, boxWidth, {
      label: 'mySQL',
      render: {
        sprite: {
          texture: 'http://fixstream.com/wp-content/uploads/2015/08/mysql-logo-square.jpg',
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
          texture: 'https://cdn.worldvectorlogo.com/logos/react-1.svg',
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
          texture: 'https://juststickers.in/wp-content/uploads/2013/06/AngularJS-Square1.jpg',
          xScale: boxWidth/528,
          yScale: boxWidth/528
        }
      }
    }) 
    let boxMongo = this.Bodies.rectangle(300, 30, boxWidth, boxWidth, {
      label: 'MongoDB',
      angle: 1.5,
      render: {
        sprite: {
          texture: 'http://www.knhopkins.com/assets/MongoDB.png',
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
          texture: 'https://www.seeklogo.net/wp-content/uploads/2014/10/jquery-logo-vector-download.jpg',
          xScale: boxWidth/512,
          yScale: boxWidth/512
        }
      }
    });
    let boxSublime = this.Bodies.rectangle(300, 30, boxWidth, boxWidth, {
      label: 'jQuery',
      angle: 5,
      render: {
        sprite: {
          texture: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Sublime_Text_3_logo.png',
          xScale: boxWidth/256,
          yScale: boxWidth/256
        }
      }
    });

    let mouse = this.Mouse.create(render.canvas)
    this.MouseConstraint.update = (mouseConstraint, bodies) => {
      let mouse = mouseConstraint.mouse
      if (mouse.button === 0) {
        for (var i = 0; i < bodies.length; i++) {
          let body = bodies[i]
          if (this.Bounds.contains(body.bounds, mouse.position)) {
            this.handleClick(body)
            mouse.button = -1
          }
        }
      }
    }
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
    // World.add(engine.world, mouse)
    // render.mouse = mouse
    // this.Events.on(mouseConstraint, "mousedown", (e) => {
    //   console.log('ouch', e)
    // })
    this.Engine.run(this.engine);
    this.Render.run(render);
  }




//
  render () {
    return (<div><h1 className="name">Aaron<span></span><p className="webdev">WEB DEV</p><p>WEB DEV</p></h1><button onClick={() => {this.handleBulletTime()}}>Bullet Time</button></div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));