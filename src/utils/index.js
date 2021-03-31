/**
 * 下划线转驼峰
 *
 * @format
 * @param name
 * @returns {*}
 */

export function toHump(name) {
    return name && name.toLowerCase().replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
}

export const numberWithComma = num => (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

export function getRequestPrefix() {
    // eslint-disable-next-line no-undef
    if (isDev) {
        return 'local';
    }
    return 'datamill';
}
