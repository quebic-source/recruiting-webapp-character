import React from 'react';
import Button from "./Button";

const CharacterAttribute = ({ attribute, value, onChange, modifier }) => {
    return (
        <div className="flex flex-row gap-2">
            <span>{attribute}: {value}</span>
            <Button onClick={() => onChange(value - 1)} disabled={value <= 0}>-</Button>
            <Button onClick={() => onChange(value + 1)}>+</Button>
            <span>Modifier: {modifier >= 0 ? `+${modifier}` : modifier}</span>
        </div>
    );
};

export default CharacterAttribute;
