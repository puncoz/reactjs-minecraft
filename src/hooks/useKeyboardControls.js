import { useEffect, useState } from "react"
import { useStore } from "./useStore"

const actionByKey = (key) => ({
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
}[key])

const textureByKey = (key) => ({
    Digit1: 'dirt',
    Digit2: 'glass',
    Digit3: 'grass',
    Digit4: 'log',
    Digit5: 'wood',
}[key])

export const useKeyboardControls = () => {
    const [movement, setMovement] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
    })
    const setTexture = useStore(state => state.setTexture)

    useEffect(() => {
        const handleKeyDown = e => {
            if (actionByKey(e.code)) {
                setMovement(state => ({ ...state, [actionByKey(e.code)]: true }))
            }

            if (textureByKey(e.code)) {
                setTexture(textureByKey(e.code))
            }
        }

        const handleKeyUp = e => {
            if (actionByKey(e.code)) {
                setMovement(state => ({ ...state, [actionByKey(e.code)]: false }))
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return movement
}
