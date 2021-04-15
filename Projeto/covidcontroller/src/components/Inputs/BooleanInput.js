import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { HorizontalInputContainer } from './styles';

export default function BooleanInput({ name, type, label }){
	const { fieldName, registerField, defaultValue, error } = useField(name);
	const inputRef = useRef();

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'checked'
        })
    }, [fieldName, registerField]);

	return (
		<HorizontalInputContainer>
			<input ref={inputRef} id={name} name={name} type={type} />
			<label htmlFor={name}>{label}</label>
		</HorizontalInputContainer>
	);
};