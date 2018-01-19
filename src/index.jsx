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
  }

  componentDidMount() {
    this.createWorld()
  }

  createWorld() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies;

// create an engine
    var engine = Engine.create();
    engine.world.gravity.scale *=5
// create a renderer

    let width = $(window).width();
    let height = $(window).height();
    // $("canvas").remove();
    let nameWidth = $('.name').width();
    let nameHeight = $('.name').height();
    // console.log(h1width)
    // engine.events = {};
    // World.clear(engine.world);
    // Engine.clear(engine);
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
          wireframes: false,
          background: 'transparent',
          height: height,
          width: width
        }
    });
    var ground = Bodies.rectangle(width/2, height, width, 5, {
      isStatic: true
    })
    var leftWall = Bodies.rectangle(0, height/2, 5, height, {
      isStatic: true
    })
    var rightWall = Bodies.rectangle(width, height/2, 5, height, {
      isStatic: true
    })

    var boxName = Bodies.rectangle(width/2, height/2, nameWidth, nameHeight*.35, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })

    var circleName = Bodies.circle(width/2, height/2, nameWidth/2, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    })


    var boxJS = Bodies.rectangle(600, 200, 100*2, 100*2, {
      angle: 2,
      render: {
        sprite: {
          texture: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Javascript-736400_960_720.png',
          xScale: 0.138888889*2,
          yScale: 0.138888889*2
        }
      }
    });
    var boxSQL = Bodies.rectangle(650, 50, 100*2, 100*2, {
      render: {
        sprite: {
          texture: 'http://fixstream.com/wp-content/uploads/2015/08/mysql-logo-square.jpg',
          xScale: .25*2,
          yScale: .25*2
        }
      }
    });

    var boxReact = Bodies.rectangle(400, 10, 100*2, 100*2, {
      angle: 3,
      render: {
        sprite: {
          texture: 'https://cdn.worldvectorlogo.com/logos/react-1.svg',
          xScale: 0.02763194252*2,
          yScale: 0.02763194252*2
        }
      }
    });

    var boxMongo = Bodies.rectangle(300, 30, 100*2, 100*2, {
      angle: 3,
      render: {
        sprite: {
          texture: 'http://www.knhopkins.com/assets/MongoDB.png',
          xScale: 0.408163265*2,
          yScale: 0.408163265*2
        }
      }
    });

    var boxJQuery = Bodies.rectangle(300, 30, 100*2, 100*2, {
      angle: 5,
      render: {
        sprite: {
          texture: 'https://www.seeklogo.net/wp-content/uploads/2014/10/jquery-logo-vector-download.jpg',
          xScale: 0.1953125*2,
          yScale: 0.1953125*2
        }
      }
    });

    World.add(engine.world, [circleName, boxName, boxJS, boxSQL, boxReact, boxMongo, boxJQuery, ground, leftWall, rightWall]);
    Engine.run(engine);
    Render.run(render);
  }





  render () {
    return (<h1 className="name">Aaron<span></span></h1>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));