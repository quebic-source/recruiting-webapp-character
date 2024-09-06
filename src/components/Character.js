import React, { useState } from 'react';
import { ATTRIBUTE_LIST, SKILL_LIST } from '../consts';
import CharacterAttribute from './CharacterAttribute';
import CharacterClassDisplay from './CharacterClassDisplay';
import SkillRow from './SkillRow';
import SkillCheck from './SkillCheck';

const MAX_TOTAL_ATTRIBUTES = 70; // maximum allowed total all attributes

const Character = ({ character, onCharacterChange }) => {
    const [attributes, setAttributes] = useState(character.attributes);
    const [skills, setSkills] = useState(character.skills);

    const handleAttributeChange = (attribute, newValue) => {
        const newAttributes = { ...attributes, [attribute]: newValue };

        // Calculate the new total attribute
        const newTotal = Object.values(newAttributes).reduce((acc, val) => acc + val, 0);

        if (newTotal <= MAX_TOTAL_ATTRIBUTES) {
            setAttributes(newAttributes);
            onCharacterChange({ ...character, attributes: newAttributes });
        } else {
            alert(`A Character can have upto ${MAX_TOTAL_ATTRIBUTES} Delegated attribute points`)
        }
    };

    const calculateModifier = (value) => Math.floor((value - 10) / 2);

    // total available skill points based on Intelligence modifier
    const calculateTotalSkillPoints = () => {
        const intelligenceModifier = calculateModifier(attributes.Intelligence);
        return 10 + (4 * intelligenceModifier);
    };

    // total skill points already spent
    const totalSpentSkillPoints = Object.values(skills).reduce((acc, val) => acc + val, 0);

    // remaining skill points
    const remainingSkillPoints = calculateTotalSkillPoints() - totalSpentSkillPoints;

    const handleSkillChange = (skillName, value) => {
        if (value >= 0 && totalSpentSkillPoints + value <= calculateTotalSkillPoints()) {
            setSkills({ ...skills, [skillName]: value });
            onCharacterChange({ ...character, skills: { ...skills, [skillName]: value } });
        }
    };

    return (
        <div className="flex flex-col gap-2 border-gray-200 border-2">
            <p className="text-lg font-medium underline">Character: {character.id}</p>

            <SkillCheck skills={skills} calculateModifier={calculateModifier} />

            <div className="w-full flex flex-row gap-4 justify-between items-center w-full">
                <div className="flex flex-col">
                    <p className="text-lg font-medium underline">Attributes</p>
                    {ATTRIBUTE_LIST.map((attr) => (
                        <CharacterAttribute
                            key={attr}
                            attribute={attr}
                            value={attributes[attr]}
                            onChange={(newValue) => handleAttributeChange(attr, newValue)}
                            modifier={calculateModifier(attributes[attr])}
                        />
                    ))}
                </div>

                <CharacterClassDisplay attributes={attributes} />

                <div className="flex flex-col">
                    <p className="text-lg font-medium underline">Skills</p>
                    <div className="flex flex-row justify-center">
                        <p className="text-lg font-medium">Total Skill Points Available: {remainingSkillPoints >= 0 ? remainingSkillPoints : 0}</p>
                    </div>
                    {SKILL_LIST.map((skill) => (
                        <SkillRow
                            key={skill.name}
                            skill={skill}
                            attributeModifier={calculateModifier(attributes[skill.attributeModifier])}
                            value={skills[skill.name]}
                            onChange={(newValue) => handleSkillChange(skill.name, newValue)}
                        />
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Character;
