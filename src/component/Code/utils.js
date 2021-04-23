export const baseJsxCode = ({ output }) => {
    return `
const App=()=>{
    return (
${output}
    );
}

<!--ReactDOM.render(-->
<!--  <App />,-->
<!--  document.getElementById('root')-->
);
`;
};

function propsParser(props) {
    return props && Object.keys(props).map(pk => `${pk}=${typeof props[pk] === 'string' ? `'${props[pk]}'` : `{${props[pk]}}`}`);
}

export function getJsxCode(page) {
    const tabs = '                                                                              ';
    const libs = {};
    const classNames = {};
    const { type, lib, style, items, props, className, path } = page;
    if (!libs[lib]) {
        libs.lib = [type];
    }
    if (!classNames[`.${className}`]) {
        classNames[`.${className}`] = style;
    }
    const PropsStrArr = propsParser(props);

    const tabLen = path.split('-').length;

    if (items) {
        const child = items.map(item => getJsxCode(item));
        return `${tabs.substring(0, tabLen)}<${type}${PropsStrArr ? ` ${PropsStrArr.join(' ')}` : ''}>1
${tabs.substring(0, tabLen + 1)}${child.join(' ')}
${tabs.substring(0, tabLen)}</${type}>
`;
    }
    return `${tabs.substring(0, tabLen)}<${type} ${PropsStrArr?.join(' ')} />`;
}
