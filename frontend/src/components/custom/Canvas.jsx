
import { useDrop } from 'react-dnd';
import CanvasComponent from './CanvasComponent';

function Canvas({ components, setSelectedComponentIndex, addComponent, updateComponentPosition, updateComponentSize }) {
    const [, drop] = useDrop(() => ({
        accept: 'component',
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            addComponent({ id: item.id, position: { x: offset.x, y: offset.y }, width: 400, height: 50 });
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
                    updateComponentPosition={updateComponentPosition}
                    updateComponentSize={updateComponentSize} // Pass function to update position
                />
            ))}
        </div>
    );
}

export default Canvas;
