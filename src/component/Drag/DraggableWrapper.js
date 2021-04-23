import { useEffect, useRef } from 'react';

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, node) {
    debugger;
    ev.dataTransfer.setData('node', typeof node === 'string' ? node : JSON.stringify(node));
}

function DraggableWrapper(Container, onDrop) {
    return ({ node, ...rest }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const childRef = useRef();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const { current } = childRef;
            if (current) {
                current.setAttribute('draggable', true);
                current.style.cursor = 'pointer';
                current.style.backgroundColor = 'pink';
                current.ondragstart = e => drag(e, node);
                current.id = 'drag';
            }
        });
        const drop = (ev, node) => {
            ev.preventDefault();
            const dragFrom = ev.dataTransfer.getData('node');
            const dragTo = node;
            onDrop(dragFrom, dragTo);
        };
        return (
            <div id="dragBox" onDrop={e => drop(e, node)} onDragOver={allowDrop}>
                <div ref={childRef}>
                    <Container {...rest} node={node} />
                </div>
            </div>
        );
    };
}

// const Demo = () => {
//     const [data, setData] = useState(List(['i am one', 'i am two', 'iam three', 'i am four']));
//     const onDrop = (dragFrom, dragTo) => {
//         const from = JSON.parse(dragFrom);
//         let newData = data.set(from.index, data.get(dragTo.index));
//         newData = newData.set(dragTo.index, data.get(from.index));
//         setData(newData);
//     };
//     return (
//         <>
//             {data.map((item, index) => {
//                 console.log(index);
//                 const Comp = DraggableWrapper(Col, item, onDrop);
//                 console.log(item);
//                 return <Comp key={item} node={{ data, index }} setData={setData} />;
//             })}
//         </>
//     );
// };

export default DraggableWrapper;
