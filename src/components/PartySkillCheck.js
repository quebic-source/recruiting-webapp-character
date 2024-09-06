import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';
import Button from "./Button";

const DEFAULT_DC = 10;
const MAX_ROLL_NUMBER = 20;

const PartySkillCheck = ({characters}) => {
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
    const [dc, setDC] = useState(DEFAULT_DC); // Default DC
    const [rollResult, setRollResult] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const getTotalSkillValue = (character, skill) => {
        const skillModifier = Math.floor((character.attributes[skill.attributeModifier] - 10) / 2);
        return skillModifier + (character.skills[skill.name] || 0); // Return 0 if the skill is not present
    };

    // character with the highest skill for the selected skill
    const findBestCharacterForSkill = () => {
        let bestCharacter = null;
        let highestSkillValue = -Infinity;

        characters.forEach(character => {
            const skill = SKILL_LIST.find(s => s.name === selectedSkill);
            const totalSkillValue = getTotalSkillValue(character, skill);

            if (totalSkillValue > highestSkillValue) {
                highestSkillValue = totalSkillValue;
                bestCharacter = character;
            }
        });

        return bestCharacter;
    };

    const performPartySkillCheck = () => {
        const bestCharacter = findBestCharacterForSkill();
        setSelectedCharacter(bestCharacter);

        if (!bestCharacter) return;

        const skill = SKILL_LIST.find(s => s.name === selectedSkill);
        const totalSkillValue = getTotalSkillValue(bestCharacter, skill);

        const roll = Math.floor(Math.random() * MAX_ROLL_NUMBER) + 1; // Roll a random number (1-20)
        const total = roll + totalSkillValue;

        setRollResult(roll);
        setIsSuccessful(total >= dc);  // Check if the total exceeds or meets the DC
    };

    return (
        <div className="flex flex-row justify-center">
            <div className="flex flex-col">

                <div className="flex flex-row justify-center">
                    <p className="text-lg font-medium underline">Party Skill Check</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                        {SKILL_LIST.map(skill => (
                            <option key={skill.name} value={skill.name}>{skill.name}</option>
                        ))}
                    </select>

                    <div className="flex flex-row gap-2">
                        <p>DC</p>
                        <input
                            className="w-1/2"
                            type="number"
                            value={dc}
                            onChange={(e) => setDC(Number(e.target.value))}
                            placeholder="Set Difficulty Class (DC)"
                        />
                    </div>


                    <Button variant="large" onClick={performPartySkillCheck}>Roll</Button>

                    {rollResult !== null && selectedCharacter && (
                        <div>
                            <p>Character Selected: {selectedCharacter.id}</p>
                            <p>Roll: {rollResult}</p>
                            <p>{isSuccessful ? 'Success' : 'Failure'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartySkillCheck;
