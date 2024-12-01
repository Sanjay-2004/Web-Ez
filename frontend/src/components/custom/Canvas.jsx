import React from 'react';
import { useDrop } from 'react-dnd';
import CanvasComponent from './CanvasComponent';

function Canvas({ components, setSelectedComponentIndex, addComponent, updateComponentPosition }) {
    const [, drop] = useDrop(() => ({
        accept: 'component',
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            addComponent({ id: item.id, position: { x: offset.x, y: offset.y }, width: 700, height: 50 });
        }
    }));

    return (
        <div
            ref={drop}
            className="flex-1 h-screen p-2 bg-gray-100 relative"
        >
            {components.map((comp, index) => (
                <CanvasComponent
                    key={index}
                    index={index}
                    component={comp}
                    onClick={() => setSelectedComponentIndex(index)}
                    updateComponentPosition={updateComponentPosition} // Pass function to update position
                />
            ))}
        </div>
    );
}

export default Canvas;
