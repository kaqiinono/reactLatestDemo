const loaderUtils = require('loader-utils');
const path = require('path');

function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
    const fileNameOrFolder = context.resourcePath.match(/index\.(css|scss|sass)$/) ? '[folder]' : '[name]';
    const hash = loaderUtils.getHashDigest(path.posix.relative(context.rootContext, context.resourcePath) + localName, 'md5', 'base64', 5);
    const className = loaderUtils.interpolateName(context, `${fileNameOrFolder}_${localName}__${hash}`, options);
    return className;
}

module.exports = { getCSSModuleLocalIdent };
