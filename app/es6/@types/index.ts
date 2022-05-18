
export const Intent = {
    NONE: 'none' as 'none',
    PRIMARY: 'primary' as 'primary',
    SUCCESS: 'success' as 'success',
    WARNING: 'warning' as 'warning',
    DANGER: 'danger' as 'danger',
};


type Intent = typeof Intent['DANGER'];
export * as Classes from './classes';

interface A
{
    cat: string;
    dog: string;
    rat: string;
}
interface B
{
    name: string;
    age: string;
}

let aa: Record<keyof A, B>;
aa = {
    cat: {
        name: '',
        age: ''
    },
    dog: {
        name: '',
        age: ''
    },
    rat: {
        name: '',
        age: ''
    },
};
