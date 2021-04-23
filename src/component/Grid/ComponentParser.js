const ComponentParser = ({ node, path }) => {
    const getComp = (compType, lib) => {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        let comp = require('@jd/jmtd');
        const arr = compType.split('.');
        for (const c of arr) {
            comp = comp[c];
        }
        return comp;
    };

    const getItemComp = () => {
        if (node.lib) {
            return getComp(node.type, node.lib);
        }
        return <div>emty</div>;
    };

    const { items } = node;
    const ItemComp = getItemComp();
    if (items && items.length > 0) {
        return (
            <ItemComp {...node.props} style={{ ...node.style }}>
                {items &&
                    items.length > 0 &&
                    items.map((item, index) => {
                        return <ComponentParser key={`${path}-${index}`} path={`${path}-${index}`} nodeIndex={index} node={item} />;
                    })}
            </ItemComp>
        );
    }
    return <ItemComp {...node.props} style={{ ...node.style }} />;
};

export default ComponentParser;
