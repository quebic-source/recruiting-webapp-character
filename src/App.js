import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Character from './components/Character';
import './App.css';
import Button from "./components/Button";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";
import PartySkillCheck from "./components/PartySkillCheck";

const github_username = 'quebic-source'

// initial state
const initialState = {
    characters: [],
};

const characterReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHARACTERS':
            return {...state, characters: action.payload};
        case 'UPDATE_CHARACTER':
            const updatedCharacters = [...state.characters];
            updatedCharacters[action.index] = action.payload;
            return {...state, characters: updatedCharacters};
        case 'ADD_CHARACTER':
            return {...state, characters: [...state.characters, action.payload]};
        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(characterReducer, initialState);

    const fetchCharacters = async () => {
        try {
            const response = await axios.get(`https://recruiting.verylongdomaintotestwith.ca/api/${github_username}/character`);
            if (response.data && response.data.body) {
                dispatch({type: 'SET_CHARACTERS', payload: response.data.body});
            }
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const saveCharacters = async () => {
        try {
            await axios.post(`https://recruiting.verylongdomaintotestwith.ca/api/${github_username}/character`, state.characters, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error saving characters:', error);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    const updateCharacter = (index, updatedCharacter) => {
        dispatch({type: 'UPDATE_CHARACTER', index, payload: updatedCharacter});
    };

    // Add a new character
    const addCharacter = () => {
        const newCharacter = {
            id: state.characters.length + 1,
            // initiate default attributes with max point 10
            attributes: ATTRIBUTE_LIST.reduce((acc, attr) => ({...acc, [attr]: 10}), {}),
            // initiate default skills
            skills: SKILL_LIST.reduce((acc, skill) => ({...acc, [skill.name]: 0}), {})
        };
        dispatch({type: 'ADD_CHARACTER', payload: newCharacter});
    };

    return (
        <div className="flex flex-col gap-2">

            <div className="flex flex-row justify-center">
                <Button variant="large" onClick={addCharacter}>Add Character</Button>
            </div>

            <div className="flex flex-row justify-center">
                <Button variant="large" onClick={saveCharacters}>Save All</Button>
            </div>

            <PartySkillCheck characters={state.characters}/>

            {state.characters.map((character, index) => (
                <Character
                    key={index}
                    character={character}
                    onCharacterChange={(updatedCharacter) => updateCharacter(index, updatedCharacter)}
                />
            ))}

        </div>
    );
};

export default App;
