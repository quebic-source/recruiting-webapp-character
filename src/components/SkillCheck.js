import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';
import Button from "./Button";

const DEFAULT_DC = 10;
const MAX_ROLL_NUMBER = 20;

const SkillCheck = ({skills, calculateModifier}) => {
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
    const [dc, setDC] = useState(DEFAULT_DC);
    const [rollResult, setRollResult] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const performCheck = () => {
        const skillModifier = calculateModifier(skills[selectedSkill]);
        const roll = Math.floor(Math.random() * MAX_ROLL_NUMBER) + 1;  // Roll a random number (1-20)
        const total = roll + skillModifier;
        setRollResult(roll);
        setIsSuccessful(total >= dc);
    };

    return (
        <div className="flex flex-row justify-center">
            <div className="flex flex-col">
                <div className="flex flex-row justify-center">
                    <p className="text-lg font-medium underline">Skill Check</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                        {SKILL_LIST.map(skill => (
                            <option key={skill.name} value={skill.name}>{skill.name}</option>
                        ))}
                    </select>
                    <div className="flex flex-row gap-2">
                        <p>DC</p>
                        <input className="w-1/2" type="number" value={dc} onChange={(e) => setDC(Number(e.target.value))}/>
                    </div>
                    <Button variant="large" onClick={performCheck}>Roll</Button>
                    {rollResult !== null && (
                        <div>
                            <p>Roll: {rollResult}</p>
                            <p>Result: {isSuccessful ? 'Success' : 'Failure'}</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SkillCheck;
