import Toolbar from '@/components/custom/Toolbar';
import Sidebar from '@/components/custom/Sidebar';
import React, { useEffect, useState } from 'react';
import Canvas from '@/components/custom/Canvas';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {

    const { projectId, pageId } = useParams();
    const [components, setComponents] = useState([]);
    const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
    const [coding, setCoding] = useState();
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const getProjectPage = async () => {
            try {
                const URI = `${import.meta.env.VITE_BACKEND_URL}/api/project/page/${pageId}`;
                const res = await axios({
                    url: URI,
                    method: "get",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                })
                console.log(res.data)
                setComponents(res.data.code)
            } catch (error) {
                console.log(error);
            }
        }
        getProjectPage();
    }, [])


    const addComponentToCanvas = (component) => {
        setComponents((prev) => [
            ...prev,
            { ...component, properties: { text: 'Edit me!', color: '#000', textSize: 16, backgroundColor: '#000' } },
        ]);
    };

    const deleteComponentFromCanvas = (index) => {
        setComponents((prev) => prev.filter((_, i) => i !== index));
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

    const updateComponentSize = (index, newSize, position) => {
        setComponents((prev) =>
            prev.map((comp, i) =>
                i === index
                    ? { ...comp, width: newSize.width, height: newSize.height, ...position }
                    : comp
            )
        );
    }

    const handleColorChange = (color, property) => {
        if (selectedComponentIndex !== null) {
            const updatedProperties = { [property]: color };
            updateComponent(selectedComponentIndex, updatedProperties);
        }
    };

    const handleTextSizeChange = (textSize) => {
        if (selectedComponentIndex !== null) {
            updateComponent(selectedComponentIndex, { textSize: parseInt(textSize, 10) });
        }
    };

    const handleTextChange = (text) => {
        if (selectedComponentIndex !== null) {
            updateComponent(selectedComponentIndex, { text });
        }
    };

    const saveCode = async () => {
        try {
            const URI = `${import.meta.env.VITE_BACKEND_URL}/api/project/update-page/${pageId}`;
            const res = await axios({
                url: URI,
                method: "put",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    code: components
                }
            })
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }


    const generateCode = async () => {
        const code = components
            .map((comp) => {
                const style = `style=" color: ${comp.properties.color}; font-size: ${comp.properties.textSize}px; position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px; width: ${comp.width}px; height: ${comp.height}px "`;
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
                        return `<div ${style} class="card"><h3>${comp.properties.title}</h3><p>${comp.properties.content}</p></div>`;
                    default:
                        return '';
                }
            })
            .join('\n');
        let finals = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
${code}
    
</body>
</html>`
        setCoding(finals);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex h-screen font-sans">
                <Sidebar addComponent={addComponentToCanvas} />
                <Canvas
                    components={components}
                    setSelectedComponentIndex={setSelectedComponentIndex}
                    addComponent={addComponentToCanvas}
                    updateComponentPosition={updateComponentPosition}
                    updateComponent={updateComponent}
                    updateComponentSize={updateComponentSize}
                />
                <Toolbar
                    selectedComponentIndex={selectedComponentIndex}
                    components={components}
                    updateComponent={updateComponent}
                    handleColorChange={handleColorChange}
                    handleTextSizeChange={handleTextSizeChange}
                    handleTextChange={handleTextChange}
                    generateCode={generateCode}
                    coding={coding}
                    saveCode={saveCode}
                    saved={saved}
                    deleteComponentFromCanvas={deleteComponentFromCanvas}
                />
            </div>
        </DndProvider>
    );
};

export default ProjectPage;
