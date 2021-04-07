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
