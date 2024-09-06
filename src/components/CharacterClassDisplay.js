import React from 'react';
import { CLASS_LIST } from '../consts';

const CharacterClassDisplay = ({ attributes }) => {
    const meetsRequirements = (className) => {
        const classRequirements = CLASS_LIST[className];
        return Object.keys(classRequirements).every(attr => attributes[attr] >= classRequirements[attr]);
    };

    return (
        <div className="flex flex-col ">
            <p className="text-lg font-medium underline">Classes</p>
            {Object.keys(CLASS_LIST).map((className) => (
                <div  key={className} className={` ${meetsRequirements(className) ? 'text-red-500' : ''}`}>
                    <span>{className}</span>
                    {meetsRequirements(className) && (
                        <div className="ml-9 flex flex-col border-2 border-gray-200">
                            <p>Minimum Requirements:</p>
                            {Object.entries(CLASS_LIST[className]).map(([attr, val]) => (
                                <p key={attr}>{attr}: {val}</p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CharacterClassDisplay;
