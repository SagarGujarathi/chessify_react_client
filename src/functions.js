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
function isPossiblePath(element, color) {
    if (element.piece === NAMING.DEFAULT) {
        return { check: true, payload: { ...element, image: CONSTANTS.PATHIMAGE } }
    }
    if (element.color !== color && element.color !== COLOR.DEFAULT) {
        return { check: false, payload: { ...element, backgroundColor: CONSTANTS.DANGERCOLOR } }
    }
    return element
}

// Rook Assist Logic
function handleRookAssist(chess, { i, j }, piece, color, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return chess
    }
    if (move === MOVES.DEFAULTMOVE) {
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOP), piece, color, MOVES.TOP)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOM), piece, color, MOVES.BOTTOM)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.LEFT), piece, color, MOVES.LEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.RIGHT), piece, color, MOVES.RIGHT)
        return chess
    }
    let data = isPossiblePath(chess[i][j], color)
    chess[i][j] = data.payload
    if (!data.check) {
        return
    }
    handleRookAssist(chess, changeIndex({ i, j }, move), piece, color, move)
}

// Pawn Assist Logic
function handlePawnAssist({ rotation, chess }, { i, j }, piece, color) {
    if (i === 1) {
        if ((color === COLOR.BLACK && rotation) || (color === COLOR.WHITE && !rotation)) {
            if (verifyBoundary({ i: i + 1, j }) && canPawnMove(chess[i + 1][j].color, color)) {
                let data = isPossiblePath(chess[i + 1][j], color)
                chess[i + 1][j] = data.payload
                if (data.check && verifyBoundary({ i: i + 2, j }) && canPawnMove(chess[i + 2][j].color, color)) {
                    chess[i + 2][j] = isPossiblePath(chess[i + 2][j], color).payload
                }
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
    else if (i === 6) {
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
                let data = isPossiblePath(chess[i - 1][j], color)
                chess[i - 1][j] = data.payload
                if (data.check && verifyBoundary({ i: i - 2, j }) && canPawnMove(chess[i - 2][j].color)) {
                    chess[i - 2][j] = isPossiblePath(chess[i - 2][j], color).payload
                }
                if (verifyBoundary({ i: i - 1, j: j + 1 }) && canPawnAttack(chess[i - 1][j + 1].color, color)) {
                    chess[i - 1][j + 1] = isPossiblePath(chess[i - 1][j + 1], color).payload
                }
                if (verifyBoundary({ i: i - 1, j: j - 1 }) && canPawnAttack(chess[i - 1][j - 1].color, color)) {
                    chess[i - 1][j - 1] = isPossiblePath(chess[i - 1][j - 1], color).payload
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
function handleKnightAssist(chess, { i, j }, piece, color) {
    if (verifyBoundary({ i: i - 2, j: j + 1 }) && canMove(chess[i - 2][j + 1].color, color)) {
        chess[i - 2][j + 1] = isPossiblePath(chess[i - 2][j + 1], color).payload
    }
    if (verifyBoundary({ i: i - 1, j: j + 2 }) && canMove(chess[i - 1][j + 2].color, color)) {
        chess[i - 1][j + 2] = isPossiblePath(chess[i - 1][j + 2], color).payload
    }
    if (verifyBoundary({ i: i - 2, j: j - 1 }) && canMove(chess[i - 2][j - 1].color, color)) {
        chess[i - 2][j - 1] = isPossiblePath(chess[i - 2][j - 1], color).payload
    }
    if (verifyBoundary({ i: i - 1, j: j - 2 }) && canMove(chess[i - 1][j - 2].color, color)) {
        chess[i - 1][j - 2] = isPossiblePath(chess[i - 1][j - 2], color).payload
    }
    if (verifyBoundary({ i: i + 2, j: j + 1 }) && canMove(chess[i + 2][j + 1].color, color)) {
        chess[i + 2][j + 1] = isPossiblePath(chess[i + 2][j + 1], color).payload
    }
    if (verifyBoundary({ i: i + 1, j: j + 2 }) && canMove(chess[i + 1][j + 2].color, color)) {
        chess[i + 1][j + 2] = isPossiblePath(chess[i + 1][j + 2], color).payload
    }
    if (verifyBoundary({ i: i + 2, j: j - 1 }) && canMove(chess[i + 2][j - 1].color, color)) {
        chess[i + 2][j - 1] = isPossiblePath(chess[i + 2][j - 1], color).payload
    }
    if (verifyBoundary({ i: i + 1, j: j - 2 }) && canMove(chess[i + 1][j - 2].color, color)) {
        chess[i + 1][j - 2] = isPossiblePath(chess[i + 1][j - 2], color).payload
    }
    return chess
}

// Bishop Assist Logic
function handleBishopAssist(chess, { i, j }, piece, color, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return chess
    }
    if (move === MOVES.DEFAULTMOVE) {
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPLEFT), piece, color, MOVES.TOPLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMLEFT), piece, color, MOVES.BOTTOMLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPRIGHT), piece, color, MOVES.TOPRIGHT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMRIGHT), piece, color, MOVES.BOTTOMRIGHT)
        return chess
    }
    let data = isPossiblePath(chess[i][j], color)
    chess[i][j] = data.payload
    if (!data.check) {
        return
    }
    handleRookAssist(chess, changeIndex({ i, j }, move), piece, color, move)
}

// Queen Assist Logic
function handleQueenAssist(chess, { i, j }, piece, color, move) {
    if (!verifyBoundary({ i, j }) || (move !== MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return chess
    }
    if (move === MOVES.DEFAULTMOVE) {
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOP), piece, color, MOVES.TOP)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOM), piece, color, MOVES.BOTTOM)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.LEFT), piece, color, MOVES.LEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.RIGHT), piece, color, MOVES.RIGHT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPLEFT), piece, color, MOVES.TOPLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMLEFT), piece, color, MOVES.BOTTOMLEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOPRIGHT), piece, color, MOVES.TOPRIGHT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOMRIGHT), piece, color, MOVES.BOTTOMRIGHT)
        return chess
    }
    let data = isPossiblePath(chess[i][j], color)
    chess[i][j] = data.payload
    if (!data.check) {
        return
    }
    handleRookAssist(chess, changeIndex({ i, j }, move), piece, color, move)
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
function handleMoveAssist({ rotation, chess }, chance, { index, piece, color }) {
    switch (piece) {
        case NAMING.PAWN:
            return handlePawnAssist({ rotation, chess }, index, piece, color)
        case NAMING.ROOK:
            return handleRookAssist(chess, index, piece, color, MOVES.DEFAULTMOVE)
        case NAMING.KNIGHT:
            return handleKnightAssist(chess, index, piece, color)
        case NAMING.BISHOP:
            return handleBishopAssist(chess, index, piece, color, MOVES.DEFAULTMOVE)
        case NAMING.QUEEN:
            return handleQueenAssist(chess, index, piece, color, MOVES.DEFAULTMOVE)
        case NAMING.KING:
            return handleKingAssist(chess, index, piece, color)
        default:
            return chess
    }
}

// Function to verify if player choosen correct piece
function verifySelectPiece(chance, color) {
    return (chance === color)
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

// Function to verify if it's opponent king or not
function isOpponentKing(data, color) {
    return (data.piece === NAMING.KING && data.color !== color)
}
// Function to check if king is safe or not
function isKingSafe(data, color) {
    if (data.color !== color && isOpponentKing(data, color)) {
        return { check: CONSTANTS.OPPONENTKING, payload: data }
    }
    if (data.color !== color && !isOpponentKing(data, color)) {
        return { check: false, payload: { ...data, isOpponentPath: CONSTANTS.OPPONENTPATH } }
    }
    return { check: true, payload: data }
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
                let data = isPossiblePath(chess[i - 1][j + 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j + 1] = data.payload
            }
            if (verifyBoundary({ i: i - 1, j: j - 1 })) {
                let data = isPossiblePath(chess[i - 1][j - 1], color)
                if (data.check === CONSTANTS.OPPONENTKING) {
                    count++;
                }
                chess[i - 1][j - 1] = data.payload
            }
        }
    }
    if (count > 0) {
        chess[i][j] = { ...chess[i][j], isDangerPiece: CONSTANTS.DANGERPIECE }
    }
    return chess
}

function verifyPaths({ chess, rotation, selectedPiece, chance }) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let color = (chance === COLOR.BLACK) ? COLOR.WHITE : COLOR.BLACK
            if (chess[i][j].color === color) {
                switch (chess[i][j].piece) {
                    case NAMING.PAWN:
                        chess = verifyPawnPath({ rotation, chess }, { i, j }, chess[i][j], color)
                        break
                    case NAMING.ROOK:
                        chess = handleRookAssist(chess, { i, j }, chess[i][j], color, MOVES.DEFAULTMOVE)
                        break
                    case NAMING.KNIGHT:
                        chess = handleKnightAssist(chess, { i, j }, chess[i][j], color)
                        break
                    case NAMING.BISHOP:
                        chess = handleBishopAssist(chess, { i, j }, chess[i][j], color, MOVES.DEFAULTMOVE)
                        break
                    case NAMING.QUEEN:
                        chess = handleQueenAssist(chess, { i, j }, chess[i][j], color, MOVES.DEFAULTMOVE)
                        break
                    case NAMING.KING:
                        chess = handleKingAssist(chess, { i, j }, chess[i][j], color)
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
        state.chance = (COLOR.WHITE === state.chance) ? COLOR.BLACK : COLOR.WHITE
        return verifyPaths(deepCleanData(state))
    }
    return state
}

// Reducer function
export function handleReducer(state, { type, payload }) {
    switch (type) {
        case TYPES.SELECTPIECE:
            state = cleanData(state)
            if (verifySelectPiece(state.chance, payload.color)) {
                return { ...state, selectedPiece: payload, chess: handleMoveAssist(state, state.chance, payload) }
            }
            return { ...state }
        case TYPES.SELECTMOVE:
            chessSound.play()
            return { ...handleSelectMove(state, payload) }

        default:
            return { ...state }
    }
}

