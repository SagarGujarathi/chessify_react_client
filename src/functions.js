// Constants imports

import { TYPES, NAMING, MOVES, CONSTANTS, COLOR, PIECES, STATETEMPLATE } from "./constants"
import movingSound from './sounds/movingSound.mp3'
const chessSound = new Audio(movingSound)
chessSound.volume = 0.45
chessSound.playbackRate = 1.5
// Function to check if present block has enemy or not
function canMove(color1, color2) {
    if (color1 === color2) {
        return false
    }
    return true
}
// Function to check if present block has enemy or not for pawn
function canPawnMove(color) {
    if (color === COLOR.DEFAULT) {
        return true
    }
    return false
}
// Function to check if pawn can attack or not
function canPawnAttack(color1, color2) {
    if (color1 !== COLOR.DEFAULT && color1 !== color2) {
        return true
    }
    return false
}

// Function to verify if the iteration is not out of boundary
function verifyBoundary({ i, j }) {
    if (i >= 0 && i < 8 && j >= 0 && j < 8) {
        return true
    }
    return false
}

// Function to change itermation index
function changeIndex({ i, j }, move) {
    return { i: i + move.i, j: j + move.j }
}

// function to check if path to move is possible
function isPossiblePath(element, color, check) {
    if ((element.piece === NAMING.DEFAULT && !check && element.canMove !== false) || (check && element.isDangerPath === true)) {
        return { check: true, payload: { ...element, image: CONSTANTS.PATHIMAGE } }
    }
    if ((element.color !== color && element.color !== COLOR.DEFAULT && !check && element.canMove !== false) || (check && element.isDangerPath === CONSTANTS.DANGERPIECE)) {
        return { check: false, payload: { ...element, backgroundColor: CONSTANTS.DANGERCOLOR } }
    }
    return { check: true, payload: { ...element } }
}

// Rook Assist Logic
function handleRookAssist(chess, { i, j }, piece, color, check, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return chess
    }
    if (move === MOVES.DEFAULTMOVE) {
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOP), piece, color, check, MOVES.TOP)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOM), piece, color, check, MOVES.BOTTOM)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.LEFT), piece, color, check, MOVES.LEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.RIGHT), piece, color, check, MOVES.RIGHT)
        return chess
    }
    let data = isPossiblePath(chess[i][j], color, check)
    chess[i][j] = data.payload
    if (!data.check) {
        return
    }
    handleRookAssist(chess, changeIndex({ i, j }, move), piece, color, check, move)
}

// Pawn Assist Logic
function handlePawnAssist({ rotation, chess, check }, { i, j }, piece, color) {
    if (i === 1) {
        if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j }) && canPawnMove(chess[i + 1][j].color, color)) {
                let data = isPossiblePath(chess[i + 1][j], color)
                chess[i + 1][j] = data.payload
                if (data.check && verifyBoundary({ i: i + 2, j }) && canPawnMove(chess[i + 2][j].color, color)) {
                    chess[i + 2][j] = isPossiblePath(chess[i + 2][j], color, check).payload
                }
            }
            if (verifyBoundary({ i: i + 1, j: j + 1 }) && canPawnAttack(chess[i + 1][j + 1].color, color)) {
                chess[i + 1][j + 1] = isPossiblePath(chess[i + 1][j + 1], color, check).payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 }) && canPawnAttack(chess[i + 1][j - 1].color, color)) {
                chess[i + 1][j - 1] = isPossiblePath(chess[i + 1][j - 1], color, check).payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j }) && canPawnMove(chess[i - 1][j].color)) {
                chess[i - 1][j] = isPossiblePath(chess[i - 1][j], color, check).payload
            }
            if (verifyBoundary({ i: i - 1, j: j + 1 }) && canPawnAttack(chess[i - 1][j + 1].color, color)) {
                chess[i - 1][j + 1] = isPossiblePath(chess[i - 1][j + 1], color, check).payload
            }
            if (verifyBoundary({ i: i - 1, j: j - 1 }) && canPawnAttack(chess[i - 1][j - 1].color, color)) {
                chess[i - 1][j - 1] = isPossiblePath(chess[i - 1][j - 1], color, check).payload
            }
        }
    }
    else if (i === 6) {
        if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j }) && canPawnMove(chess[i + 1][j].color)) {
                chess[i + 1][j] = isPossiblePath(chess[i + 1][j], color, check).payload
            }
            if (verifyBoundary({ i: i + 1, j: j + 1 }) && canPawnAttack(chess[i + 1][j + 1].color, color)) {
                chess[i + 1][j + 1] = isPossiblePath(chess[i + 1][j + 1], color, check).payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 }) && canPawnAttack(chess[i + 1][j - 1].color, color)) {
                chess[i + 1][j - 1] = isPossiblePath(chess[i + 1][j - 1], color, check).payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j }) && canPawnMove(chess[i - 1][j].color)) {
                let data = isPossiblePath(chess[i - 1][j], color, check)
                chess[i - 1][j] = data.payload
                if (data.check && verifyBoundary({ i: i - 2, j }) && canPawnMove(chess[i - 2][j].color)) {
                    chess[i - 2][j] = isPossiblePath(chess[i - 2][j], color, check).payload
                }
                if (verifyBoundary({ i: i - 1, j: j + 1 }) && canPawnAttack(chess[i - 1][j + 1].color, color)) {
                    chess[i - 1][j + 1] = isPossiblePath(chess[i - 1][j + 1], color, check).payload
                }
                if (verifyBoundary({ i: i - 1, j: j - 1 }) && canPawnAttack(chess[i - 1][j - 1].color, color)) {
                    chess[i - 1][j - 1] = isPossiblePath(chess[i - 1][j - 1], color, check).payload
                }
            }
        }
    }
    else {
        if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j }) && canPawnMove(chess[i + 1][j].color)) {
                chess[i + 1][j] = isPossiblePath(chess[i + 1][j], color).payload
            }
            if (verifyBoundary({ i: i + 1, j: j + 1 }) && canPawnAttack(chess[i + 1][j + 1].color, color)) {
                chess[i + 1][j + 1] = isPossiblePath(chess[i + 1][j + 1], color).payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 }) && canPawnAttack(chess[i + 1][j - 1].color, color)) {
                chess[i + 1][j - 1] = isPossiblePath(chess[i + 1][j - 1], color).payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j }) && canPawnMove(chess[i - 1][j].color)) {
                chess[i - 1][j] = isPossiblePath(chess[i - 1][j], color).payload
            }
            if (verifyBoundary({ i: i - 1, j: j + 1 }) && canPawnAttack(chess[i - 1][j + 1].color, color)) {
                chess[i - 1][j + 1] = isPossiblePath(chess[i - 1][j + 1], color).payload
            }
            if (verifyBoundary({ i: i - 1, j: j - 1 }) && canPawnAttack(chess[i - 1][j - 1].color, color)) {
                chess[i - 1][j - 1] = isPossiblePath(chess[i - 1][j - 1], color).payload
            }
        }
        else if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j }) && canPawnMove(chess[i + 1][j].color)) {
                chess[i + 1][j] = isPossiblePath(chess[i + 1][j], color).payload
            }
            if (verifyBoundary({ i: i + 1, j: j + 1 }) && canPawnAttack(chess[i + 1][j + 1].color, color)) {
                chess[i + 1][j + 1] = isPossiblePath(chess[i + 1][j + 1], color).payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 }) && canPawnAttack(chess[i + 1][j - 1].color, color)) {
                chess[i + 1][j - 1] = isPossiblePath(chess[i + 1][j - 1], color).payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j }) && canPawnMove(chess[i - 1][j].color)) {
                chess[i - 1][j] = isPossiblePath(chess[i - 1][j], color).payload
            }
            if (verifyBoundary({ i: i - 1, j: j + 1 }) && canPawnAttack(chess[i - 1][j + 1].color, color)) {
                chess[i - 1][j + 1] = isPossiblePath(chess[i - 1][j + 1], color).payload
            }
            if (verifyBoundary({ i: i - 1, j: j - 1 }) && canPawnAttack(chess[i - 1][j - 1].color, color)) {
                chess[i - 1][j - 1] = isPossiblePath(chess[i - 1][j - 1], color).payload
            }
        }
    }
    return chess
}

// Knight Assist Logic
function handleKnightAssist(chess, { i, j }, piece, color, check) {
    if (verifyBoundary({ i: i - 2, j: j + 1 }) && canMove(chess[i - 2][j + 1].color, color)) {
        chess[i - 2][j + 1] = isPossiblePath(chess[i - 2][j + 1], color, check).payload
    }
    if (verifyBoundary({ i: i - 1, j: j + 2 }) && canMove(chess[i - 1][j + 2].color, color)) {
        chess[i - 1][j + 2] = isPossiblePath(chess[i - 1][j + 2], color, check).payload
    }
    if (verifyBoundary({ i: i - 2, j: j - 1 }) && canMove(chess[i - 2][j - 1].color, color)) {
        chess[i - 2][j - 1] = isPossiblePath(chess[i - 2][j - 1], color, check).payload
    }
    if (verifyBoundary({ i: i - 1, j: j - 2 }) && canMove(chess[i - 1][j - 2].color, color)) {
        chess[i - 1][j - 2] = isPossiblePath(chess[i - 1][j - 2], color, check).payload
    }
    if (verifyBoundary({ i: i + 2, j: j + 1 }) && canMove(chess[i + 2][j + 1].color, color)) {
        chess[i + 2][j + 1] = isPossiblePath(chess[i + 2][j + 1], color, check).payload
    }
    if (verifyBoundary({ i: i + 1, j: j + 2 }) && canMove(chess[i + 1][j + 2].color, color)) {
        chess[i + 1][j + 2] = isPossiblePath(chess[i + 1][j + 2], color, check).payload
    }
    if (verifyBoundary({ i: i + 2, j: j - 1 }) && canMove(chess[i + 2][j - 1].color, color)) {
        chess[i + 2][j - 1] = isPossiblePath(chess[i + 2][j - 1], color, check).payload
    }
    if (verifyBoundary({ i: i + 1, j: j - 2 }) && canMove(chess[i + 1][j - 2].color, color)) {
        chess[i + 1][j - 2] = isPossiblePath(chess[i + 1][j - 2], color, check).payload
    }
    return chess
}

// Bishop Assist Logic
function handleBishopAssist(chess, { i, j }, piece, color, check, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return chess
    }
    if (move === MOVES.DEFAULTMOVE) {
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPLEFT), piece, color, check, MOVES.TOPLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMLEFT), piece, color, check, MOVES.BOTTOMLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPRIGHT), piece, color, check, MOVES.TOPRIGHT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMRIGHT), piece, color, check, MOVES.BOTTOMRIGHT)
        return chess
    }
    let data = isPossiblePath(chess[i][j], color, check)
    chess[i][j] = data.payload
    if (!data.check) {
        return
    }
    handleRookAssist(chess, changeIndex({ i, j }, move), piece, color, check, move)
}

// Queen Assist Logic
function handleQueenAssist(chess, { i, j }, piece, color, check, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return chess
    }
    if (move === MOVES.DEFAULTMOVE) {
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOP), piece, color, check, MOVES.TOP)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOM), piece, color, check, MOVES.BOTTOM)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.LEFT), piece, color, check, MOVES.LEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.RIGHT), piece, color, check, MOVES.RIGHT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPLEFT), piece, color, check, MOVES.TOPLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMLEFT), piece, color, check, MOVES.BOTTOMLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPRIGHT), piece, color, check, MOVES.TOPRIGHT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMRIGHT), piece, color, check, MOVES.BOTTOMRIGHT)
        return chess
    }
    let data = isPossiblePath(chess[i][j], color, check)
    chess[i][j] = data.payload
    if (!data.check) {
        return
    }
    handleRookAssist(chess, changeIndex({ i, j }, move), piece, color, check, move)
}
// Function to check if king move is possible or not
function isKingPossiblePath(element, color) {
    if (element.isDangerPath === true || element.isCheckPath === true || element.isOpponentPath === true) {
        return element
    }
    if (element.piece === NAMING.DEFAULT) {
        return { ...element, image: CONSTANTS.PATHIMAGE }
    }
    if (element.color !== color && element.color !== COLOR.DEFAULT) {
        return { ...element, backgroundColor: CONSTANTS.DANGERCOLOR }
    }
    return element
}
// King  Assist Logic
function handleKingAssist(chess, { i, j }, piece, color) {
    if (verifyBoundary({ i: i - 1, j }) && canMove(chess[i - 1][j].color, color)) {
        chess[i - 1][j] = isKingPossiblePath(chess[i - 1][j], color)
    }
    if (verifyBoundary({ i: i + 1, j }) && canMove(chess[i + 1][j].color, color)) {
        chess[i + 1][j] = isKingPossiblePath(chess[i + 1][j], color)
    }
    if (verifyBoundary({ i, j: j + 1 }) && canMove(chess[i][j + 1].color, color)) {
        chess[i][j + 1] = isKingPossiblePath(chess[i][j + 1], color)
    }
    if (verifyBoundary({ i, j: j - 1 }) && canMove(chess[i][j - 1].color, color)) {
        chess[i][j - 1] = isKingPossiblePath(chess[i][j - 1], color)
    }
    if (verifyBoundary({ i: i - 1, j: j + 1 }) && canMove(chess[i - 1][j + 1].color, color)) {
        chess[i - 1][j + 1] = isKingPossiblePath(chess[i - 1][j + 1], color)
    }
    if (verifyBoundary({ i: i - 1, j: j - 1 }) && canMove(chess[i - 1][j - 1].color, color)) {
        chess[i - 1][j - 1] = isKingPossiblePath(chess[i - 1][j - 1], color)
    }
    if (verifyBoundary({ i: i + 1, j: j - 1 }) && canMove(chess[i + 1][j - 1].color, color)) {
        chess[i + 1][j - 1] = isKingPossiblePath(chess[i + 1][j - 1], color)
    }
    if (verifyBoundary({ i: i + 1, j: j + 1 }) && canMove(chess[i + 1][j + 1].color, color)) {
        chess[i + 1][j + 1] = isKingPossiblePath(chess[i + 1][j + 1], color)
    }
    return chess
}

// Function to handle Player Assist
function handleMoveAssist({ rotation, chess, check }, chance, { index, piece, color }) {
    switch (piece) {
        case NAMING.PAWN:
            return handlePawnAssist({ rotation, chess, check }, index, piece, color)
        case NAMING.ROOK:
            return handleRookAssist(chess, index, piece, color, check, MOVES.DEFAULTMOVE)
        case NAMING.KNIGHT:
            return handleKnightAssist(chess, index, piece, color, check)
        case NAMING.BISHOP:
            return handleBishopAssist(chess, index, piece, color, check, MOVES.DEFAULTMOVE)
        case NAMING.QUEEN:
            return handleQueenAssist(chess, index, piece, color, check, MOVES.DEFAULTMOVE)
        case NAMING.KING:
            return handleKingAssist(chess, index, piece, color)
        default:
            return chess
    }
}

// Function to verify if player choosen correct piece
function verifySelectPiece(chance, color, myColor) {
    return (chance === color && color === myColor && chance === myColor)
}

// Function to remove previous data
function cleanData(state) {

    state.chess = state.chess.map(row => {
        return row.map(piece => {
            return {
                ...piece,
                backgroundColor: null,
                image: PIECES[`${piece.color}${piece.piece}`],
            }
        })
    })
    state.selectedPiece = STATETEMPLATE.selectedPiece
    return state
}

// Function to remove danger signs too
function deepCleanData(state) {
    state.chess = state.chess.map(row => {
        return row.map(piece => {
            return {
                piece: piece.piece,
                color: piece.color,
                image: PIECES[`${piece.color}${piece.piece}`],
            }
        })
    })
    state.selectedPiece = STATETEMPLATE.selectedPiece
    return state
}


// Functions to check path for best moves

let check = false
let checkCount = 0
// Function to check if king is safe or not
function isKingSafe(data, color) {
    if (data.color !== color && data.piece === NAMING.KING) {
        check = true
        checkCount++;
        return { check: CONSTANTS.OPPONENTKING, payload: data }
    }
    if (data.color === color) {
        return { check: CONSTANTS.FRIENDPIECE, payload: { ...data, isOpponentPath: true } }
    }
    if (data.color !== color && data.color !== COLOR.DEFAULT && data.piece !== NAMING.KING) {
        return { check: CONSTANTS.OPPONENTPIECE, payload: { ...data, isOpponentPath: true } }
    }
    if (data.color === COLOR.DEFAULT) {
        return { check: CONSTANTS.OPPONENTPATH, payload: { ...data, isOpponentPath: true } }
    }

}
// Pawn Assist Logic
function verifyPawnPath({ rotation, chess }, { i, j }, piece, color) {
    let count = 0;
    if (i === 1) {
        if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j: j + 1 })) {
                let data = isKingSafe(chess[i + 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 })) {
                let data = isKingSafe(chess[i + 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j - 1] = data.payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j: j + 1 })) {
                let data = isKingSafe(chess[i - 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i - 1, j: j - 1 })) {
                let data = isKingSafe(chess[i - 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j - 1] = data.payload
            }
        }
    }
    else if (i === 6) {
        if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j: j + 1 })) {
                let data = isKingSafe(chess[i + 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 })) {
                let data = isKingSafe(chess[i + 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j - 1] = data.payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j }) && canPawnMove(chess[i - 1][j].color)) {
                if (verifyBoundary({ i: i - 1, j: j + 1 })) {
                    let data = isKingSafe(chess[i - 1][j + 1], color)
                    if (data.check === CONSTANTS.OPPONENTKING) {
                        count++;
                    }
                    chess[i - 1][j + 1] = data.payload
                }
                if (verifyBoundary({ i: i - 1, j: j - 1 })) {
                    let data = isKingSafe(chess[i - 1][j - 1], color)
                    if (data.check === CONSTANTS.OPPONENTKING) {
                        count++;
                    }
                    chess[i - 1][j - 1] = data.payload
                }
            }
        }
    }
    else {
        if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j: j + 1 })) {
                let data = isKingSafe(chess[i + 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 })) {
                let data = isKingSafe(chess[i + 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j - 1] = data.payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j: j + 1 })) {
                let data = isKingSafe(chess[i - 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i - 1, j: j - 1 })) {
                let data = isKingSafe(chess[i - 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j - 1] = data.payload
            }
        }
        else if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j: j + 1 })) {
                let data = isKingSafe(chess[i + 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i + 1, j: j - 1 })) {
                let data = isKingSafe(chess[i + 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i + 1][j - 1] = data.payload
            }
        }
        else if ((color === COLOR.BLACK && !rotation) || (color === COLOR.WHITE && rotation)) {
            if (verifyBoundary({ i: i - 1, j: j + 1 })) {
                let data = isKingSafe(chess[i - 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i - 1, j: j - 1 })) {
                let data = isKingSafe(chess[i - 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j - 1] = data.payload
            }
        }
    }
    if (count > 0) {
        chess[i][j] = { ...chess[i][j], isDangerPiece: true }
    }
    return chess
}

// Function to verify rook path
function verifyRookPath(chess, { i, j }, piece, color, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return true
    }
    if (move === MOVES.DEFAULTMOVE) {
        if (verifyRookPath(chess, changeIndex({ i, j }, MOVES.TOP), piece, color, MOVES.TOP) === CONSTANTS.DANGERPATH ||
            verifyRookPath(chess, changeIndex({ i, j }, MOVES.BOTTOM), piece, color, MOVES.BOTTOM) === CONSTANTS.DANGERPATH ||
            verifyRookPath(chess, changeIndex({ i, j }, MOVES.LEFT), piece, color, MOVES.LEFT) === CONSTANTS.DANGERPATH ||
            verifyRookPath(chess, changeIndex({ i, j }, MOVES.RIGHT), piece, color, MOVES.RIGHT) === CONSTANTS.DANGERPATH
        ) {
            chess[i][j] = { ...chess[i][j], isDangerPiece: CONSTANTS.DANGERPIECE }
        }
        return chess
    }
    let data = isKingSafe(chess[i][j], color)
    switch (data.check) {
        case CONSTANTS.OPPONENTKING:
            chess[i][j] = { ...data.payload }
            let index = changeIndex({ i, j }, move)
            chess[index.i][index.j] = { ...chess[index.i][index.j], isOpponentPath: true }
            return CONSTANTS.DANGERPATH
        case CONSTANTS.OPPONENTPIECE:
            if (verifyRookPath(chess, changeIndex({ i, j }, move), piece, color, move) === CONSTANTS.DANGERPATH) {
                chess[i][j] = { ...data.payload, canMove: false }
                return CONSTANTS.DANGERPATH
            }
        case CONSTANTS.FRIENDPIECE:
            chess[i][j] = data.payload
            return CONSTANTS.FRIENDPIECE
        case CONSTANTS.OPPONENTPATH:
            chess[i][j] = data.payload

    }
    switch (verifyRookPath(chess, changeIndex({ i, j }, move), piece, color, move)) {
        case CONSTANTS.DANGERPATH:
            chess[i][j] = { ...chess[i][j], isDangerPath: true }
            return CONSTANTS.DANGERPATH
        case CONSTANTS.FRIENDPIECE:
            return CONSTANTS.FRIENDPIECE
    }

}

// Function to verify queen path
function verifyQueenPath(chess, { i, j }, piece, color, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return true
    }
    if (move === MOVES.DEFAULTMOVE) {
        if (verifyQueenPath(chess, changeIndex({ i, j }, MOVES.TOP), piece, color, MOVES.TOP) === CONSTANTS.DANGERPATH ||
            verifyQueenPath(chess, changeIndex({ i, j }, MOVES.BOTTOM), piece, color, MOVES.BOTTOM) === CONSTANTS.DANGERPATH ||
            verifyQueenPath(chess, changeIndex({ i, j }, MOVES.LEFT), piece, color, MOVES.LEFT) === CONSTANTS.DANGERPATH ||
            verifyQueenPath(chess, changeIndex({ i, j }, MOVES.RIGHT), piece, color, MOVES.RIGHT) === CONSTANTS.DANGERPATH ||
            verifyQueenPath(chess, changeIndex({ i, j }, MOVES.TOPLEFT), piece, color, MOVES.TOPLEFT) === CONSTANTS.DANGERPATH ||
            verifyQueenPath(chess, changeIndex({ i, j }, MOVES.TOPRIGHT), piece, color, MOVES.TOPRIGHT) === CONSTANTS.DANGERPATH ||
            verifyQueenPath(chess, changeIndex({ i, j }, MOVES.BOTTOMLEFT), piece, color, MOVES.BOTTOMLEFT) === CONSTANTS.DANGERPATH ||
            verifyQueenPath(chess, changeIndex({ i, j }, MOVES.BOTTOMRIGHT), piece, color, MOVES.BOTTOMRIGHT) === CONSTANTS.DANGERPATH
        ) {
            chess[i][j] = { ...chess[i][j], isDangerPiece: CONSTANTS.DANGERPIECE }
        }
        return chess
    }
    let data = isKingSafe(chess[i][j], color)
    switch (data.check) {
        case CONSTANTS.OPPONENTKING:
            chess[i][j] = { ...data.payload }
            let index = changeIndex({ i, j }, move)
            chess[index.i][index.j] = { ...chess[index.i][index.j], isOpponentPath: true }
            return CONSTANTS.DANGERPATH
        case CONSTANTS.OPPONENTPIECE:
            if (verifyQueenPath(chess, changeIndex({ i, j }, move), piece, color, move) === CONSTANTS.DANGERPATH) {
                chess[i][j] = { ...data.payload, canMove: false }
                return CONSTANTS.DANGERPATH
            }
        case CONSTANTS.FRIENDPIECE:
            chess[i][j] = data.payload
            return CONSTANTS.FRIENDPIECE
        case CONSTANTS.OPPONENTPATH:
            chess[i][j] = data.payload

    }
    switch (verifyQueenPath(chess, changeIndex({ i, j }, move), piece, color, move)) {
        case CONSTANTS.DANGERPATH:
            chess[i][j] = { ...chess[i][j], isDangerPath: true }
            return CONSTANTS.DANGERPATH
        case CONSTANTS.FRIENDPIECE:
            return CONSTANTS.FRIENDPIECE
    }

}

// Function to verify bishop path
function verifyBishopPath(chess, { i, j }, piece, color, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return true
    }
    if (move === MOVES.DEFAULTMOVE) {
        if (
            verifyBishopPath(chess, changeIndex({ i, j }, MOVES.TOPLEFT), piece, color, MOVES.TOPLEFT) === CONSTANTS.DANGERPATH ||
            verifyBishopPath(chess, changeIndex({ i, j }, MOVES.TOPRIGHT), piece, color, MOVES.TOPRIGHT) === CONSTANTS.DANGERPATH ||
            verifyBishopPath(chess, changeIndex({ i, j }, MOVES.BOTTOMLEFT), piece, color, MOVES.BOTTOMLEFT) === CONSTANTS.DANGERPATH ||
            verifyBishopPath(chess, changeIndex({ i, j }, MOVES.BOTTOMRIGHT), piece, color, MOVES.BOTTOMRIGHT) === CONSTANTS.DANGERPATH
        ) {
            chess[i][j] = { ...chess[i][j], isDangerPiece: CONSTANTS.DANGERPIECE }
        }
        return chess
    }
    let data = isKingSafe(chess[i][j], color)
    switch (data.check) {
        case CONSTANTS.OPPONENTKING:
            chess[i][j] = { ...data.payload }
            let index = changeIndex({ i, j }, move)
            chess[index.i][index.j] = { ...chess[index.i][index.j], isOpponentPath: true }
            return CONSTANTS.DANGERPATH
        case CONSTANTS.OPPONENTPIECE:
            if (verifyBishopPath(chess, changeIndex({ i, j }, move), piece, color, move) === CONSTANTS.DANGERPATH) {
                chess[i][j] = { ...data.payload, canMove: false }
                return CONSTANTS.DANGERPATH
            }
        case CONSTANTS.FRIENDPIECE:
            chess[i][j] = data.payload
            return CONSTANTS.FRIENDPIECE
        case CONSTANTS.OPPONENTPATH:
            chess[i][j] = data.payload

    }
    switch (verifyBishopPath(chess, changeIndex({ i, j }, move), piece, color, move)) {
        case CONSTANTS.DANGERPATH:
            chess[i][j] = { ...chess[i][j], isDangerPath: true }
            return CONSTANTS.DANGERPATH
        case CONSTANTS.FRIENDPIECE:
            return CONSTANTS.FRIENDPIECE
    }

}

// Function to verify Knight path
function verifyKnightPath(chess, { i, j }, piece, color) {
    let count = 0
    if (verifyBoundary({ i: i - 2, j: j + 1 })) {
        let data = isKingSafe(chess[i - 2][j + 1], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i - 2][j + 1] = data.payload
    }
    if (verifyBoundary({ i: i - 1, j: j + 2 })) {
        let data = isKingSafe(chess[i - 1][j + 2], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i - 1][j + 2] = data.payload
    }
    if (verifyBoundary({ i: i - 2, j: j - 1 })) {
        let data = isKingSafe(chess[i - 2][j - 1], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i - 2][j - 1] = data.payload
    }
    if (verifyBoundary({ i: i - 1, j: j - 2 })) {
        let data = isKingSafe(chess[i - 1][j - 2], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i - 1][j - 2] = data.payload
    }
    if (verifyBoundary({ i: i + 2, j: j + 1 })) {
        let data = isKingSafe(chess[i + 2][j + 1], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i + 2][j + 1] = data.payload
    }
    if (verifyBoundary({ i: i + 1, j: j + 2 })) {
        let data = isKingSafe(chess[i + 1][j + 2], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i + 1][j + 2] = data.payload
    }
    if (verifyBoundary({ i: i + 2, j: j - 1 })) {
        let data = isKingSafe(chess[i + 2][j - 1], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i + 2][j - 1] = data.payload
    }
    if (verifyBoundary({ i: i + 1, j: j - 2 })) {
        let data = isKingSafe(chess[i + 1][j - 2], color)
        if (data.check === CONSTANTS.OPPONENTKING) {
            count++;
        }
        chess[i + 1][j - 2] = data.payload
    }
    if (count > 0) {
        chess[i][j] = { ...chess[i][j], isDangerPiece: true }
    }
    return chess
}

// Function to verify king move
function verifyKingPath(chess, { i, j }, piece, color) {
    if (verifyBoundary({ i: i - 1, j })) {
        chess[i - 1][j] = isKingSafe(chess[i - 1][j], color).payload
    }
    if (verifyBoundary({ i: i + 1, j })) {
        chess[i + 1][j] = isKingSafe(chess[i + 1][j], color).payload
    }
    if (verifyBoundary({ i, j: j + 1 })) {
        chess[i][j + 1] = isKingSafe(chess[i][j + 1], color).payload
    }
    if (verifyBoundary({ i, j: j - 1 })) {
        chess[i][j - 1] = isKingSafe(chess[i][j - 1], color).payload
    }
    if (verifyBoundary({ i: i - 1, j: j + 1 })) {
        chess[i - 1][j + 1] = isKingSafe(chess[i - 1][j + 1], color).payload
    }
    if (verifyBoundary({ i: i - 1, j: j - 1 })) {
        chess[i - 1][j - 1] = isKingSafe(chess[i - 1][j - 1], color).payload
    }
    if (verifyBoundary({ i: i + 1, j: j - 1 })) {
        chess[i + 1][j - 1] = isKingSafe(chess[i + 1][j - 1], color).payload
    }
    if (verifyBoundary({ i: i + 1, j: j + 1 })) {
        chess[i + 1][j + 1] = isKingSafe(chess[i + 1][j + 1], color).payload
    }
    return chess
}
function verifyPaths({ chess, rotation, selectedPiece, chance }) {
    console.log(chance)
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let color = (chance === COLOR.BLACK) ? COLOR.WHITE : COLOR.BLACK
            console.log(color)
            if (chess[i][j].color === color) {
                switch (chess[i][j].piece) {
                    case NAMING.PAWN:
                        chess = verifyPawnPath({ rotation, chess }, { i, j }, chess[i][j], color)
                        break
                    case NAMING.ROOK:
                        chess = verifyRookPath(chess, { i, j }, chess[i][j], color, MOVES.DEFAULTMOVE)
                        break
                    case NAMING.KNIGHT:
                        chess = verifyKnightPath(chess, { i, j }, chess[i][j], color)
                        break
                    case NAMING.BISHOP:
                        chess = verifyBishopPath(chess, { i, j }, chess[i][j], color, MOVES.DEFAULTMOVE)
                        break
                    case NAMING.QUEEN:
                        chess = verifyQueenPath(chess, { i, j }, chess[i][j], color, MOVES.DEFAULTMOVE)
                        break
                    case NAMING.KING:
                        chess = verifyKingPath(chess, { i, j }, chess[i][j], color)
                        break
                    default:
                        break
                }
            }
        }
    }
    return { chess, rotation, selectedPiece, chance }

}

// Function to handle select move
function handleSelectMove(state, payload) {
    if (state.selectedPiece.index.i !== undefined && state.selectedPiece.index.j !== undefined) {
        state.chess[payload.index.i][payload.index.j] = state.chess[state.selectedPiece.index.i][state.selectedPiece.index.j]
        state.chess[state.selectedPiece.index.i][state.selectedPiece.index.j] = { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' }
        state.chance = state.chance == COLOR.BLACK ? COLOR.WHITE : COLOR.BLACK
        const data = deepCleanData(state)
        return data
    }
    return state
}

// Reducer function
export function handleReducer(state, { type, payload }) {
    switch (type) {
        case TYPES.SELECTPIECE:
            state = cleanData(state)
            if (verifySelectPiece(state.chance, payload.color, payload.myColor)) {
                return { ...state, selectedPiece: payload, chess: handleMoveAssist(state, state.chance, payload) }
            }
            return { ...state }
        case TYPES.SELECTMOVE:
            chessSound.play()
            let data = { ...handleSelectMove(state, payload) }
            console.log(data.chess)
            payload.socket.emit('UserMove', { opponentDetails: payload.opponentDetails, chess: data.chess })
            return data
        case TYPES.VERIFYPATHS:
            check = false
            checkCount = 0
            return { ...verifyPaths(deepCleanData(state)), check, checkCount }
        case TYPES.CHANGECHANCE:
            return { ...state, chance: payload }
        case TYPES.UPDATEBOARD:
            return { ...state, chess: payload }

        default:
            return { ...state }
    }
}

export function handleResize(chessContainerRef) {
    chessContainerRef.current.style.gridTemplateColumns = `repeat(8, ${5}px)`
    chessContainerRef.current.style.gridTemplateRows = `repeat(8, ${5}px)`
    const height = Number(getComputedStyle(chessContainerRef.current).height.replace('px', ''))
    const rem = Number(getComputedStyle(document.documentElement).fontSize.replace('px', ''))
    if (window.outerWidth - 2 * rem <= 1200) {
        const minimum = Math.min(window.outerHeight - 3 * rem, window.outerWidth - 2 * rem)
        chessContainerRef.current.style.gridTemplateColumns = `repeat(8, ${minimum / 8}px)`
        chessContainerRef.current.style.gridTemplateRows = `repeat(8, ${minimum / 8}px)`
    }
    else {
        chessContainerRef.current.style.gridTemplateColumns = `repeat(8, ${height / 8}px)`
        chessContainerRef.current.style.gridTemplateRows = `repeat(8, ${height / 8}px)`
    }

}

export function getId() {
    const id = localStorage.getItem('roomId')
    if (id == null) {
        const newId = `${Math.ceil(Math.random() * 1e9)}`
        localStorage.setItem('id', newId)
        return newId
    }
    return id
}

export function handleGameState(state, { type, payload }) {
    switch (type) {
        case TYPES.SETMYNAME:
            return { ...state, myDetails: { ...state.myDetails, name: payload } }
        case TYPES.SETMYPHOTO:
            return { ...state, myDetails: { ...state.myDetails, profilePic: payload } }
        case TYPES.LOGIN:
            return { ...state, connect: payload }
        case TYPES.OPPONENTDETAILS:
            return { ...state, opponentDetails: payload }
        case TYPES.SETGAMEROOMID:
            return { ...state, gameRoomId: payload }
        case TYPES.SETSOCKETID:
            return { ...state, myDetails: { ...state.myDetails, socketId: payload } }
        case TYPES.SETMYCOLOR:
            return { ...state, myDetails: { ...state.myDetails, color: payload } }
        case TYPES.SETINGAME:
            return { ...state, inGame: payload }
        case TYPES.RESETSOCKET:
            return {
                inGame: false,
                connect: true,
                gameRoomId: '',
                myDetails: {
                    name: state.myDetails.name,
                    roomId: getId(),
                    color: '',
                    socketId: state.myDetails.name
                },
                opponentDetails: {
                    name: '',
                    profilePic: '',
                    color: '',
                    socketId: null
                }
            }
        default:
            return { ...state }
    }
}

export function handleColor(backgroundColor, selectedPieceIndex, currentBoxIndex) {
    if (backgroundColor !== undefined && backgroundColor !== null) {
        return backgroundColor
    }
    if ((selectedPieceIndex.index.i === currentBoxIndex.i && selectedPieceIndex.index.j === currentBoxIndex.j)) {
        return CONSTANTS.SELECTCOLOR
    }
    else if ((currentBoxIndex.i + currentBoxIndex.j) % 2 === 0) {
        return CONSTANTS.WHITE
    }
    else {
        return CONSTANTS.GREEN
    }
}