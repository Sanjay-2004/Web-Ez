import React from 'react';
import { useDrag } from 'react-dnd';
import components from '../components';

const DraggableComponent = ({ component, addComponent }) => {
    const [, drag] = useDrag(() => ({
        type: 'component',
        item: { id: component.id },
    }));

    return (
        <div
            ref={drag}
            className="m-2 p-3 border border-gray-300 rounded-md shadow-sm cursor-move hover:bg-gray-100"
            onClick={() =>
                addComponent({ id: component.id, position: { x: 100, y: 100 }, width: 150, height: 50 })
            }
        >
            {component.label}
        </div>
    );
};

const Sidebar = ({ addComponent }) => {
    return (
        <div className="w-52 p-4 border-r border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Components</h3>
            {components.map((component) => (
                <DraggableComponent
                    key={component.id}
                    component={component}
                    addComponent={addComponent}
                />
            ))}
        </div>
    );
};

export default Sidebar;
