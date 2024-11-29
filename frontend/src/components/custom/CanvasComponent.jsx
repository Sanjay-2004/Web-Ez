import React from 'react';
import { Rnd } from 'react-rnd';

const CanvasComponent = ({ index, component, onClick, updateComponentPosition }) => {
    const renderComponent = () => {
        const textStyle = `w-full h-full ${component.properties.color ? `text-[${component.properties.color}]` : 'text-black'}`;

        switch (component.id) {
            case 'title':
                return <h1 className={textStyle}>{component.properties.text}</h1>;
            case 'heading':
                return <h2 className={textStyle}>{component.properties.text}</h2>;
            case 'paragraph':
                return <p className={textStyle}>{component.properties.text}</p>;
            case 'button':
                return (
                    <button className={`w-full h-full py-2 px-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600`}>
                        {component.properties.text}
                    </button>
                );
            case 'card':
                return (
                    <div className="w-full h-full border border-gray-300 rounded-md shadow-sm bg-white">
                        <div className="p-4">
                            <h5 className={`text-lg font-semibold ${component.properties.titleColor ? `text-[${component.properties.titleColor}]` : 'text-gray-800'}`}>
                                {component.properties.title}
                            </h5>
                            <p className="text-gray-600 mt-2">{component.properties.content}</p>
                            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                                {component.properties.buttonText || 'Button'}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Rnd
            size={{ width: component.width, height: component.height }}
            position={component.position}
            onClick={onClick}
            onDragStop={(e, d) => {
                updateComponentPosition(index, { x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateComponentPosition(index, { x: position.x, y: position.y, width: ref.offsetWidth, height: ref.offsetHeight });
            }}
            bounds="parent"
            className="border border-dashed border-gray-400 cursor-pointer"
        >
            <div className="w-full h-full">{renderComponent()}</div>
        </Rnd>
    );
}

export default CanvasComponent;
