import VISA_ICON from '../cc-assets/visa.png'
import AMEX_ICON from '../cc-assets/amex.png'
import MASTER_ICON from '../cc-assets/masterCard.png'
import DISCOVER_ICON from '../cc-assets/discover.png'

export const OTHERCARDS = [
    /{1-9}/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
]

export const AMEX_EXP = [
    /{1-9}/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
]

export const CARD = [
    'VISA',
    'MASTERCARD',
    'AMEX',
    'DISCOVER',
];

export const CARDICON = {
    VISA: VISA_ICON,
    MASTERCARD: MASTER_ICON,
    AMEX_ICON: AMEX_ICON,
    DISCOVER: DISCOVER_ICON,
}