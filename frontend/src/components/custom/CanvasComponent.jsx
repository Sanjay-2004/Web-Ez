import React from 'react';
import { Rnd } from 'react-rnd';

const CanvasComponent = ({ index, component, onClick, updateComponentPosition, updateComponentProperties }) => {
    const renderComponent = () => {
        const textStyle = {
            color: component.properties.color || "black",
            fontSize: `${component.properties.textSize}px`,
        };

        switch (component.id) {
            case "title":
                return <h1 style={textStyle}>{component.properties.text}</h1>;
            case "heading":
                return <h2 style={textStyle}>{component.properties.text}</h2>;
            case "paragraph":
                return <p style={textStyle}>{component.properties.text}</p>;
            case "button":
                return (
                    <button
                        style={{
                            backgroundColor: component.properties.backgroundColor || "blue",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            fontSize: `${component.properties.textSize}px`,
                        }}
                    >
                        {component.properties.text}
                    </button>
                );
            case "card":
                return (
                    <div className="card" style={textStyle}>
                        <h5>{component.properties.title}</h5>
                        <p>{component.properties.content}</p>
                    </div>
                );
            case "list":
                return (
                    <ul style={textStyle}>
                        {component.properties.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                );
            case "image":
                return (
                    <img
                        src={component.properties.src || "https://via.placeholder.com/150"}
                        alt="Custom Component"
                        style={{ width: "100%", height: "auto" }}
                    />
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
};

export default CanvasComponent;
