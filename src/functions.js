// Constants imports

import { TYPES } from "./constants"

// Function to handle Player Assist
function handleMoveAssist(chance, { index, piece, color }) {
      
}

// Function to verify if player choosen correct piece
function verifySelectPiece(chance, { index, piece, color }) {
    console.log(chance, index, color, piece)
    if (chance === color) {
        handleMoveAssist(chance, { index, piece, color })
        return true
    }
    return false
}

// Reducer function
export function handleReducer(state, { type, payload }) {
    switch (type) {
        case TYPES.SELECTPIECE:
            if (verifySelectPiece(state.chance, payload)) {
                return { ...state, selectedPiece: payload }
            }
            return state
        case TYPES.SELECTMOVE:
            return { ...state, selectedMove: payload }
    }
}

