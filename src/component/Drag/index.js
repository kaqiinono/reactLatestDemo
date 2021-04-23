import './index.scss';
import { Row } from '@jd/jmtd';
import { useEffect, useRef } from 'react';
import Demo from './DraggableWrapper';

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
}

const Drag = () => {
    const emptyRef = useRef();
    useEffect(() => {
        const { current } = emptyRef;
        if (current) {
            current.setAttribute('draggable', true);
            current.setAttribute('style', 'background-color: red;');
            current.setAttribute('style', 'border:1px solid green;');
            current.ondragstart = drag;
        }
    });
    return (
        <>
            <h1>拖拽效果演示</h1>
            <Row>
                <Demo />
            </Row>
            <h1>预览模式</h1>
        </>
    );
};

export default Drag;
