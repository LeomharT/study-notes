import { np2 } from './namespace';

export const Intent = {
    NONE: 'none' as 'none',
    PRIMARY: 'primary' as 'primary',
    SUCCESS: 'success' as 'success',
    WARNING: 'warning' as 'warning',
    DANGER: 'danger' as 'danger',
};

type Intent = typeof Intent['DANGER'];
export * as Classes from './classes';



let a: np2.giao = { age: '1' };

console.log(a);
