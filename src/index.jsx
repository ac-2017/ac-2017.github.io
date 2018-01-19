import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.createWorld = this.createWorld.bind(this)
    this.Engine = Matter.Engine
    this.Render = Matter.Render
    this.World = Matter.World
    this.Bodies = Matter.Bodies
    this.Bounds = Matter.Bounds
    this.Mouse = Matter.Mouse
    this.Events = Matter.Events
    this.MouseConstraint = Matter.MouseConstraint
    this.engine = this.Engine.create();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.createWorld()
    $(window).resize(() => {
      this.createWorld()
    })
  }

  handleClick(box) {
    if (box.label !== 'Rectangle Body' && box.label !== 'Circle Body') {
      alert('You clicked on ' + box.label)
    }
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
    let boxWidth = vmin*.2
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
    let boxHTML = this.Bodies.rectangle(600, 200, 100*2, 100*2, {
      label: 'HTML',
      angle: 2,
      render: {
        sprite: {
          texture: 'html.png',
          xScale: 0.138888889*2,
          yScale: 0.138888889*2
        }
      }
    });
    let circleGit = this.Bodies.circle(width/3, height/3, 100, {
      label: 'Github',
      render: {
        sprite: {
          texture: 'https://image.flaticon.com/icons/svg/25/25231.svg',
          xScale: 0.227790433*2,
          yScale: 0.227790433*2
        }
      }
    })
    let boxSQL = this.Bodies.rectangle(650, 50, 100*2, 100*2, {
      label: 'mySQL',
      render: {
        sprite: {
          texture: 'http://fixstream.com/wp-content/uploads/2015/08/mysql-logo-square.jpg',
          xScale: .25*2,
          yScale: .25*2
        }
      }
    });
    let boxReact = this.Bodies.rectangle(width*.7, 10, 100*2, 100*2, {
      angle: 3,
      label: 'React',
      render: {
        sprite: {
          texture: 'https://cdn.worldvectorlogo.com/logos/react-1.svg',
          xScale: 0.02763194252*2,
          yScale: 0.02763194252*2
        }
      }
    });
    let boxAngular = this.Bodies.rectangle(width*.8, 25, 100*2, 100*2, {
      label: 'Angular',
      angle:2,
      render: {
        sprite: {
          texture: 'https://juststickers.in/wp-content/uploads/2013/06/AngularJS-Square1.jpg',
          xScale: 0.189393939*2,
          yScale: 0.189393939*2
        }
      }
    }) 
    let boxMongo = this.Bodies.rectangle(300, 30, 100*2, 100*2, {
      label: 'MongoDB',
      angle: 1.5,
      render: {
        sprite: {
          texture: 'http://www.knhopkins.com/assets/MongoDB.png',
          xScale: 0.408163265*2,
          yScale: 0.408163265*2
        }
      }
    });
    let boxJQuery = this.Bodies.rectangle(300, 30, 100*2, 100*2, {
      label: 'jQuery',
      angle: 5,
      render: {
        sprite: {
          texture: 'https://www.seeklogo.net/wp-content/uploads/2014/10/jquery-logo-vector-download.jpg',
          xScale: 0.1953125*2,
          yScale: 0.1953125*2
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


    this.World.add(this.engine.world, [mouseConstraint, circleName, boxName, boxHTML, boxJS, circleGit, boxSQL, boxReact, boxAngular, boxMongo, boxJQuery, ground, leftWall, rightWall]);
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
    return (<div><h1 className="name">Aaron<span></span><p className="webdev">WEB DEV</p><p>WEB DEV</p></h1><button onClick={() => {alert('Dont work yet')}}>It's Raining</button></div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));