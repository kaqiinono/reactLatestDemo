import { Table } from '@jd/jmtd';
import DraggableWrapper from '../Drag/DraggableWrapper';
const Containers = ['Row', 'Col', 'Card'];
const columns = [
    {
        dataIndex: 'ShopName',
        title: '店铺名称'
    },

    {
        dataIndex: 'ShopDealNum',
        title: '成交单量',
        align: 'right',
        description: '描述'
    },

    {
        dataIndex: 'DealNum',
        title: '成交子单量',
        align: 'right'
    }
];

const dataSource = [
    {
        ShopName: '格力京东自营旗舰店',
        ShopDealNum: 164193,
        DealNum: 162957
    },

    {
        ShopName: '戴森京东自营官方旗舰店',
        ShopDealNum: 26883,
        DealNum: 26793
    },

    {
        ShopName: 'Apple产品京东自营旗舰店',
        ShopDealNum: 51199,
        DealNum: 50959
    },

    {
        ShopName: '美的京东自营官方旗舰店',
        ShopDealNum: 348637,
        DealNum: 345482
    },

    {
        ShopName: '飞利浦官方旗舰店',
        ShopDealNum: 127810,
        DealNum: 127123
    }
];
const ComponentParser = ({ node, path, onDrop }) => {
    const getComp = (compType, lib) => {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        const Comp = require('@jd/jmtd')[compType];
        // const arr = compType.split('.');
        // for (const c of arr) {
        //     Comp = Comp[c];
        // }
        const notContainer = Containers.indexOf(compType) === -1;
        // if (!notContainer) {
        //     node.style.positon = 'relative';
        // }
        console.log('Comp', Comp);
        // return notContainer && onDrop ? DraggableWrapper(Comp, onDrop) : Comp;
        return Comp;
    };

    const getItemComp = () => {
        if (node.lib) {
            return getComp(node.type, node.lib);
        }
        return <div>emty</div>;
    };

    const { items } = node;
    let ItemComp = getItemComp();
    console.log(node.type);
    if (node.type === 'Table') {
        return <Table id="table-1" columns={columns} dataSource={dataSource} />;
    }
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
    return <ItemComp node={path} {...node.props} style={{ ...node.style }} />;
};

export default ComponentParser;
