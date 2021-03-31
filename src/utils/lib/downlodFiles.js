/**
 * 下载二进制流数据
 *
 * @format
 * @param fileStream
 * @param filename
 */

export const downloadFile = (fileStream, filename) => {
    const blob = new Blob([fileStream]);
    if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a');
        elink.download = decodeURIComponent(filename);
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, decodeURIComponent(filename));
    }
};
