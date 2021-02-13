import { useBox } from "@react-three/cannon"
import React from "react"
import * as textures from "../textures"

const Cube = ({ position, type, ...props }) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position,
        ...props
    }))

    return (
        <mesh ref={ref} castShadow>
            {[...Array(6)].map((_, index) => (
                <meshStandardMaterial
                    attachArray="material"
                    map={textures[type]}
                    key={index} />
            ))}
            <boxBufferGeometry attach="geometry" />
        </mesh>
    )
}

export default Cube
