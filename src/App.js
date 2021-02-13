import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import React from "react"
import { Canvas } from "react-three-fiber";

import Ground from "./Components/Ground"
import Player from "./Components/Player"
import Cube from "./Components/Cube";

const App = () => (
  <Canvas shadowMap>
    <Sky sunPosition={[100, 20, 100]} />
    <ambientLight intensity={0.25} />
    <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
    <Physics gravity={[0, -30, 0]}>
      <Ground position={[0, 0.5, 0]} />
      <Player position={[0, 3, 10]} />
      <Cube position={[0, 1, 0]} type="wood" />
    </Physics>
  </Canvas>
)

export default App;
