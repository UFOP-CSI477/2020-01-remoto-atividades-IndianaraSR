import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';

import { Slider } from '@material-ui/core';
import { InputContainer } from './styles';

export default function RangeInput({ name, label, min, max, step, marks = true }) {
    const { fieldName, registerField, defaultValue, error } = useField(name);
	const [value, setValue] = useState(0);
    const inputRef = useRef();

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    function handleChangeRange(event, newValue) {
        setValue(newValue);
    }

    return (
        <InputContainer>
            <label>{label}</label>
            <Slider
                value={value}
                onChange={handleChangeRange}
                defaultValue={defaultValue}
                step={step}
                marks={marks}
                min={min}
                max={max}
                valueLabelDisplay="auto" />

            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="number"
                value={value}
                setValue={setValue}
                disabled />
        </InputContainer>
    );
}