import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

const Toolbar = ({
    selectedComponentIndex,
    components,
    updateComponent,
    handleColorChange,
    handleTextSizeChange,
    handleTextChange,
    generateCode,
    coding
}) => {
    const selectedComponent = components[selectedComponentIndex];

    // Function to copy the generated code to clipboard
    const copyToClipboard = () => {
        if (coding) {
            navigator.clipboard.writeText(coding).then(() => {
                alert("Code copied to clipboard!");
            }).catch((err) => {
                alert("Failed to copy code: " + err.message);
            });
        }
    };

    return (
        <div className="w-64 p-4 bg-white border-l border-gray-300">
            {selectedComponent ? (
                <div>
                    <div className="mb-4">
                        <h3 className="font-semibold">Edit Component</h3>

                        {/* Editable Text */}
                        {["title", "heading", "paragraph", "button", "list"].includes(
                            selectedComponent.id
                        ) && (
                            <div className="mb-2">
                                <label className="block text-sm">Text</label>
                                <input
                                    type="text"
                                    value={selectedComponent.properties.text}
                                    onChange={(e) => handleTextChange(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        )}

                        {/* Text Color */}
                        <div className="mb-2">
                            <label className="block text-sm">Text Color</label>
                            <input
                                type="color"
                                value={selectedComponent.properties.color}
                                onChange={(e) => handleColorChange(e.target.value, "color")}
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
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                onClick={generateCode}
                                className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
                            >
                                Generate Code
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                                {coding}
                            </pre>
                            {/* Copy to Clipboard Button */}
                            <button
                                onClick={copyToClipboard}
                                className="mt-4 bg-green-500 text-white p-2 rounded"
                            >
                                Copy to Clipboard
                            </button>
                        </DialogContent>
                    </Dialog>
                </div>
            ) : (
                <p>Select a component to edit</p>
            )}
        </div>
    );
};

export default Toolbar;
