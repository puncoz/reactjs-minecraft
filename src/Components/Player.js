import { useSphere } from "@react-three/cannon"
import React, { useRef, useEffect, Fragment } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { Vector3 } from "three"
import { useKeyboardControls } from "../hooks/useKeyboardControls"
import FPVControls from "./FPVControls"

const SPEED = 6

const Player = (props) => {
    const { moveForward, moveBackward, moveLeft, moveRight } = useKeyboardControls()
    const { camera } = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        ...props
    }))

    const velocityRef = useRef([0, 0, 0])

    useEffect(() => {
        api.velocity.subscribe(velocity => (velocityRef.current = velocity))
    }, [api.velocity])

    useFrame(() => {
        camera.position.copy(ref.current.position)

        const direction = new Vector3()
        const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0))
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)

        api.velocity.set(direction.x, velocityRef.current[1], direction.z)
    })

    return (
        <Fragment>
            {/* <FPVControls /> */}
            <mesh ref={ref} />
        </Fragment>
    )
}

export default Player
