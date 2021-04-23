import { Map } from 'immutable';
import ComponentParser from './ComponentParser-withdrag';
import data from './template';
import '@jd/jmtd/dist/themes/datamill.css';
import { useState } from 'react';
import Code from '../Code';
import plugins from './constant';
import styles from './index.scss';

function drag(ev, node) {
    ev.dataTransfer.setData('node', typeof node === 'string' ? node : JSON.stringify(node));
}

const getPath = pathStr => {
    const pathArr = [];
    pathStr
        .split('-')
        .slice(1)
        .forEach(path => {
            pathArr.push('items');
            pathArr.push(path * 1);
        });
    return pathArr;
};

const Grid = () => {
    const [page, setPage] = useState(Map(data.page));
    const onDrop = (from, to) => {
        const toPath = getPath(to);
        if (plugins[from]) {
            setPage(page.setIn(toPath, plugins[from]));
        } else {
            const fromPath = getPath(from);
            const fromNode = page.getIn(fromPath);
            const toNode = page.getIn(toPath);
            const newData = page.setIn(fromPath, toNode);
            setPage(newData.setIn(toPath, fromNode));
        }
    };
    const pageObj = page.toObject();
    return (
        <div className={styles.main}>
            <h3>组件区域</h3>
            <div className={styles.plugins}>
                {Object.keys(plugins).map(plugin => {
                    const curNode = plugins[plugin];
                    return (
                        <div className={styles.wrapper} draggable={true} onDragStart={e => drag(e, plugin)}>
                            <ComponentParser node={curNode} />
                        </div>
                    );
                })}
            </div>
            <h3>拖拽区域</h3>
            <ComponentParser onDrop={onDrop} node={pageObj} path="0" />
            <h3>预览区域</h3>
            <ComponentParser node={page.toObject()} path="0" />
            <h3>属性面板</h3>

            <h3>代码区域</h3>
            <Code page={pageObj} />
        </div>
    );
};

export default Grid;
