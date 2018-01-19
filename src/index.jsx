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
    this.Mouse = Matter.Mouse
    this.MouseConstraint = Matter.MouseConstraint
    this.engine = this.Engine.create();
  }

  componentDidMount() {
    this.createWorld()
    $(window).resize(() => {
      this.createWorld()
    })
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
    let leftWall = this.Bodies.rectangle(-2, height/2, 2, height, {
      isStatic: true
    })
    let rightWall = this.Bodies.rectangle(width, height/2, 2, height, {
      isStatic: true
    })
    let boxName = this.Bodies.rectangle(width/2, height/2, nameWidth, nameHeight*.35, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })
    let circleName = this.Bodies.circle(width/2, height/2, nameWidth/2+50, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })
    let circlePointer = this.Bodies.circle(width/2+nameWidth/2, height/2+nameHeight/2-10, 20, {
      isStatic: true,
      render: {
        sprite: {
          texture: 'https://d30y9cdsu7xlg0.cloudfront.net/png/19119-200.png',
          xScale: .1,
          yScale: .1
        }
      }
    })
    let boxJS = this.Bodies.rectangle(600, 200, 100*2, 100*2, {
      angle: 2,
      render: {
        sprite: {
          texture: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Javascript-736400_960_720.png',
          xScale: 0.138888889*2,
          yScale: 0.138888889*2
        }
      }
    });
    let boxHTML = this.Bodies.rectangle(600, 200, 100*2, 100*2, {
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
      render: {
        sprite: {
          texture: 'https://image.flaticon.com/icons/svg/25/25231.svg',
          xScale: 0.227790433*2,
          yScale: 0.227790433*2
        }
      }
    })
    let boxSQL = this.Bodies.rectangle(650, 50, 100*2, 100*2, {
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
      render: {
        sprite: {
          texture: 'https://cdn.worldvectorlogo.com/logos/react-1.svg',
          xScale: 0.02763194252*2,
          yScale: 0.02763194252*2
        }
      }
    });
    let boxAngular = this.Bodies.rectangle(width*.8, 25, 100*2, 100*2, {
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
      angle: 5,
      render: {
        sprite: {
          texture: 'https://www.seeklogo.net/wp-content/uploads/2014/10/jquery-logo-vector-download.jpg',
          xScale: 0.1953125*2,
          yScale: 0.1953125*2
        }
      }
    });
    let mouse = this.Mouse.create(render.canvas),
        mouseConstraint = this.MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
    this.World.add(this.engine.world, [circleName, boxName, boxHTML, circlePointer, boxJS, circleGit, boxSQL, boxReact, boxAngular, boxMongo, boxJQuery, ground, leftWall, rightWall]);
    // World.add(engine.world, mouse)
    // render.mouse = mouse
    this.Engine.run(this.engine);
    this.Render.run(render);
  }





  render () {
    return (<h1 className="name">Aaron<span></span><p className="webdev">WEB DEV</p></h1>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));