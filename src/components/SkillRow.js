import React from 'react';
import Button from "./Button";

const SkillRow = ({ skill, attributeModifier, value, onChange }) => {
    const total = value + attributeModifier;

    return (
        <div className="flex flex-row gap-2">
            <span>{skill.name} - points: {value}</span>
            |
            <Button onClick={() => onChange(value - 1)} disabled={value <= 0}>-</Button>
            <Button onClick={() => onChange(value + 1)}>+</Button>
            |
            <span>modifier ({skill.attributeModifier}): {attributeModifier}</span>
            |
            <span>total: {total}</span>
        </div>
    );
};

export default SkillRow;
