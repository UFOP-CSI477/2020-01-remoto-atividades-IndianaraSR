import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { TextField } from '@material-ui/core';

export default function InputText({ name, ...rest }){
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return(
        <TextField
            error={Boolean(error)}
            helperText={error}
            fullWidth variant="outlined" inputRef={inputRef} defaultValue={defaultValue} {...rest} />  
    );
}