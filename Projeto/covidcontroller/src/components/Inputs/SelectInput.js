import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { HorizontalInputContainer } from './styles';

export default function SelectInput({ name, label, children }) {
	const { fieldName, registerField, defaultValue, error } = useField(name);
	const inputRef = useRef();

	useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

	return (
		<>
			<HorizontalInputContainer>
				<label>{label}</label>
				<select ref={inputRef} name={name}>
					{children}
				</select>
			</HorizontalInputContainer>

			{error && <span style={{color: '#f00'}}>{error}</span>}
		</>
	);
}