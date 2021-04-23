import { useEffect, useRef } from 'react';

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

const Container = ['Row', 'Col'];

export function DraggableWrapper(Parser) {
    return props => {
        const containerRef = useRef();
        const { draggable, ...rest } = props;

        useEffect(() => {
            const { current } = containerRef;
            if (current) {
                if (Container.indexOf(rest.node.type) > -1) {
                    current.ondrop = drop;
                    current.ondragover = allowDrop;
                } else {
                    current.setAttribute('draggable', true);
                    current.setAttribute('border', `1px solid ${draggable ? 'green' : 'red'}`);
                    current.setAttribute('cursor', 'pointer');
                    current.ondragstart = drag;
                }
            }
        });
        return <Parser ref={containerRef} {...rest} />;
    };
}
