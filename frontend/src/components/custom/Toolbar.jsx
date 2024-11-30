import React from 'react';

const Toolbar = ({
    selectedComponentIndex,
    components,
    updateComponent,
    handleColorChange,
    handleTextSizeChange,
    handleTextChange,
    generateCode,
}) => {
    const selectedComponent = components[selectedComponentIndex];
    console.log(selectedComponent);

    return (
        <div className="w-64 p-4 bg-white border-l border-gray-300">
            {selectedComponent ? (
                <div>
                    <div className="mb-4">
                        <h3 className="font-semibold">Edit Component</h3>

                        {/* Editable Text */}
                        <div className="mb-2">
                            <label className="block text-sm">Text</label>
                            <input
                                type="text"
                                value={selectedComponent.properties.text}
                                onChange={(e) => handleTextChange(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Text Color */}
                        <div className="mb-2">
                            <label className="block text-sm">Text Color</label>
                            <input
                                type="color"
                                value={selectedComponent.properties.color}
                                onChange={(e) => handleColorChange(e.target.value, 'color')}
                                className="w-full h-10 border rounded p-0"
                                style={{ backgroundColor: selectedComponent.properties.color }}
                            />
                        </div>

                        {/* Text Size */}
                        <div className="mb-2">
                            <label className="block text-sm">Text Size</label>
                            <input
                                type="number"
                                value={selectedComponent.properties.textSize}
                                onChange={(e) => handleTextSizeChange(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Background Color */}
                        {selectedComponent.id === 'button' && (
                            <div className="mb-2">
                                <label className="block text-sm">Background Color</label>
                                <input
                                    type="color"
                                    value={selectedComponent.properties.backgroundColor || '#000000'}
                                    onChange={(e) => handleColorChange(e.target.value, 'backgroundColor')}
                                    className="w-full h-10 border rounded p-0"
                                    style={{
                                        backgroundColor: selectedComponent.properties.backgroundColor || '#000000',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <button
                        onClick={generateCode}
                        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Generate Code
                    </button>
                </div>
            ) : (
                <p>Select a component to edit</p>
            )}
        </div>
    );
};

export default Toolbar;
