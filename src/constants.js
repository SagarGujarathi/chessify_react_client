import blackpawn from './images/pieces/blackpawn.png'
import whitepawn from './images/pieces/whitepawn.png'
import blackrook from './images/pieces/blackrook.png'
import whiterook from './images/pieces/whiterook.png'
import blackknight from './images/pieces/blackknight.png'
import whiteknight from './images/pieces/whiteknight.png'
import blackbishop from './images/pieces/blackbishop.png'
import whitebishop from './images/pieces/whitebishop.png'
import blackqueen from './images/pieces/blackqueen.png'
import whitequeen from './images/pieces/whitequeen.png'
import blackking from './images/pieces/blackking.png'
import whiteking from './images/pieces/whiteking.png'
import circle from './images/circle.png'
export const NAMING = {
    PAWN: 'pawn',
    ROOK: 'rook',
    KNIGHT: 'knight',
    BISHOP: 'bishop',
    KING: 'king',
    QUEEN: 'queen',
    DEFAULT: 'default'
}
export const COLOR = {
    BLACK: 'black',
    WHITE: 'white',
    DEFAULT: 'default'
}
export const CONSTANTS = {
    SELECTCOLOR: 'rgb(205, 233, 144)',
    WHITE: 'rgb(245, 245, 245)',
    GREEN: 'rgb(63, 193, 201)',
    DANGERCOLOR: 'rgb(244, 132, 132)',
    PATHIMAGE: circle,
    OPPONENTPATH: 'opponentpath',
    DANGERPATH: 'dangerpath',
    DANGERPIECE: 'dangerpiece',
    DONTMOVE: 'dontmove',
    OPPONENTKING: 'opponentking',
    OPPONENTPIECE: 'opponentpiece',
    FRIENDPIECE: 'friendpiece'
}
export const PIECES = { blackpawn, whitepawn, blackrook, whiterook, blackknight, whiteknight, blackqueen, whitequeen, blackking, whiteking, blackbishop, whitebishop, default: '' }
export const POSITION =
    [
        [
            { piece: NAMING.ROOK, color: COLOR.BLACK, image: blackrook },
            { piece: NAMING.KNIGHT, color: COLOR.BLACK, image: blackknight },
            { piece: NAMING.BISHOP, color: COLOR.BLACK, image: blackbishop },
            { piece: NAMING.QUEEN, color: COLOR.BLACK, image: blackqueen },
            { piece: NAMING.KING, color: COLOR.BLACK, image: blackking },
            { piece: NAMING.BISHOP, color: COLOR.BLACK, image: blackbishop },
            { piece: NAMING.KNIGHT, color: COLOR.BLACK, image: blackknight },
            { piece: NAMING.ROOK, color: COLOR.BLACK, image: blackrook }
        ],
        [
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
            { piece: NAMING.PAWN, color: COLOR.BLACK, image: blackpawn },
        ],
        [
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
        ],
        [
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
        ],
        [
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
        ],
        [
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },
            { piece: NAMING.DEFAULT, color: COLOR.DEFAULT, image: '' },

        ],
        [
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn },
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn },
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn },
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn },
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn },
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn },
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn },
            { piece: NAMING.PAWN, color: COLOR.WHITE, image: whitepawn }
        ],
        [
            { piece: NAMING.ROOK, color: COLOR.WHITE, image: whiterook },
            { piece: NAMING.KNIGHT, color: COLOR.WHITE, image: whiteknight },
            { piece: NAMING.BISHOP, color: COLOR.WHITE, image: whitebishop },
            { piece: NAMING.QUEEN, color: COLOR.WHITE, image: whitequeen },
            { piece: NAMING.KING, color: COLOR.WHITE, image: whiteking },
            { piece: NAMING.BISHOP, color: COLOR.WHITE, image: whitebishop },
            { piece: NAMING.KNIGHT, color: COLOR.WHITE, image: whiteknight },
            { piece: NAMING.ROOK, color: COLOR.WHITE, image: whiterook }
        ]
    ]
export const STATETEMPLATE = {
    selectedPiece: {
        piece: '',
        index: {}
    },
    chance: '',
    chess: POSITION,
    rotation: true
}

export const TYPES = {
    SELECTPIECE: 'selectpiece',
    SELECTMOVE: 'selectmove',
    CHANGECHANCE: 'changechance',
    UPDATECHESSMOVE: 'updatechessmove',
    SETMYNAME: 'setmyname',
    SETMYPHOTO: 'setmyphoto',
    LOGIN: 'login',
    OPPONENTDETAILS: 'opponentdetails',
    SETGAMEROOMID: 'setgameroomid',
    SETSOCKETID: 'setsocketid',
    SETMYCOLOR: 'setmycolor',
    SETINGAME: 'setingame',
    UPDATEBOARD: 'updateboard',
    VERIFYPATHS: 'verifypaths'
}

export const MOVES = {
    TOP: { i: -1, j: 0 },
    BOTTOM: { i: 1, j: 0 },
    LEFT: { i: 0, j: -1 },
    RIGHT: { i: 0, j: 1 },
    TOPLEFT: { i: -1, j: -1 },
    TOPRIGHT: { i: -1, j: 1 },
    BOTTOMLEFT: { i: 1, j: -1 },
    BOTTOMRIGHT: { i: 1, j: 1 },
    DEFAULTMOVE: 'defaultmove'
}