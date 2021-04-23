import DraggableWrapper from '../Drag/DraggableWrapper';
const Containers = ['Row', 'Col', 'Card'];
const ComponentParser = ({ node, path, onDrop }) => {
    const getComp = (compType, lib) => {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        const Comp = require('@jd/jmtd')[compType];
        // const arr = compType.split('.');
        // for (const c of arr) {
        //     Comp = Comp[c];
        // }
        console.log(Containers.indexOf(compType));
        const notContainer = Containers.indexOf(compType) === -1;
        // if (!notContainer) {
        //     node.style.positon = 'relative';
        // }
        return notContainer && onDrop ? DraggableWrapper(Comp, onDrop) : Comp;
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
            <ItemComp node={path} {...node.props} style={{ ...node.style }}>
                {items &&
                    items.length > 0 &&
                    items.map((item, index) => {
                        // const Comp = onDrop ? DraggableWrapper(ComponentParser, onDrop) : ComponentParser;
                        // return <Comp onDrop={onDrop} key={`${path}-${index}`} path={`${path}-${index}`} nodeIndex={index} node={item} />;
                        return (
                            <ComponentParser
                                onDrop={onDrop}
                                key={`${path}-${index}`}
                                path={`${path}-${index}`}
                                nodeIndex={index}
                                node={item}
                            />
                        );
                    })}
            </ItemComp>
        );
    }
    return (
        <ItemComp node={path} {...node.props} style={{ ...node.style }}>
            {node.children}
        </ItemComp>
    );
};

export default ComponentParser;
