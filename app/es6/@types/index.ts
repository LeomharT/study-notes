export const Intent = {
    NONE: 'none' as 'none',
    PRIMARY: 'primary' as 'primary',
    SUCCESS: 'success' as 'success',
    WARNING: 'warning' as 'warning',
    DANGER: 'danger' as 'danger',
};

type Intent = typeof Intent['DANGER'];
export * as Classes from './classes';
