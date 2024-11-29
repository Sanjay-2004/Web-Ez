import { useState, useEffect } from 'react';

const Toolbar = ({ selectedComponentIndex, components, updateComponent, generateCode }) => {
    const [properties, setProperties] = useState({ text: '', color: '#000', title: '', content: '' });

    useEffect(() => {
        if (selectedComponentIndex !== null && components[selectedComponentIndex]) {
            setProperties(components[selectedComponentIndex].properties || {});
        }
    }, [selectedComponentIndex, components]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperties((prev) => ({ ...prev, [name]: value }));
        updateComponent(selectedComponentIndex, { [name]: value });
    };

    return (
        <div className="w-52 p-4 border-l border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Toolbar</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Text:</label>
                    <input
                        type="text"
                        name="text"
                        value={properties.text || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Color:</label>
                    <input
                        type="color"
                        name="color"
                        value={properties.color || '#000'}
                        onChange={handleChange}
                        className="mt-1 w-12 h-8 p-1 border border-gray-300 rounded-md"
                    />
                </div>
                {components[selectedComponentIndex]?.id === 'card' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Card Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={properties.title || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Card Content:</label>
                            <textarea
                                name="content"
                                value={properties.content || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </>
                )}
                <button
                    onClick={generateCode}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Generate Code
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
