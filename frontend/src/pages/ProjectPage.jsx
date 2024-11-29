import Toolbar from '@/components/custom/Toolbar';
import Sidebar from '@/components/custom/Sidebar';
import React, { useState } from 'react';
import Canvas from '@/components/custom/Canvas';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ProjectPage = () => {
    const [components, setComponents] = useState([]);
    const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);

    const addComponentToCanvas = (component) => {
        setComponents((prev) => [
            ...prev,
            { ...component, properties: { text: 'Edit me!', color: '#000' } },
        ]);
    };

    const updateComponent = (index, newProperties) => {
        setComponents((prev) =>
            prev.map((comp, i) =>
                i === index
                    ? { ...comp, properties: { ...comp.properties, ...newProperties } }
                    : comp
            )
        );
    };

    const updateComponentPosition = (index, newPosition) => {
        setComponents((prev) =>
            prev.map((comp, i) =>
                i === index
                    ? { ...comp, position: { ...comp.position, ...newPosition } }
                    : comp
            )
        );
    };

    const generateCode = () => {
        const code = components
            .map((comp) => {
                const style = `style={{ color: '${comp.properties.color}', position: 'absolute', left: ${comp.position.x}px, top: ${comp.position.y}px, width: ${comp.width}px, height: ${comp.height}px }}`;
                switch (comp.id) {
                    case 'title':
                        return `<h1 ${style}>${comp.properties.text}</h1>`;
                    case 'heading':
                        return `<h2 ${style}>${comp.properties.text}</h2>`;
                    case 'paragraph':
                        return `<p ${style}>${comp.properties.text}</p>`;
                    case 'button':
                        return `<button ${style}>${comp.properties.text}</button>`;
                    case 'card':
                        return `<div ${style} className="card"><h3>${comp.properties.title}</h3><p>${comp.properties.content}</p></div>`;
                    default:
                        return '';
                }
            })
            .join('\n');
        alert(`Generated Code:\n\n${code}`);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex h-screen font-sans">
                <Sidebar addComponent={addComponentToCanvas} />
                <Canvas
                    components={components}
                    setSelectedComponentIndex={setSelectedComponentIndex}
                    addComponent={addComponentToCanvas}
                    updateComponentPosition={updateComponentPosition} // Pass update function
                />
                <Toolbar
                    selectedComponentIndex={selectedComponentIndex}
                    components={components}
                    updateComponent={updateComponent}
                    generateCode={generateCode}
                />
            </div>
        </DndProvider>
    );
};

export default ProjectPage;
