import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import TextInput from '../Inputs/TextInput';

import { registrar } from 'api/routes';

import { CustomForm, CustomButton } from './styles';

export default function FormRegistro(){
    const formRef = useRef(null);
    const router = useRouter();

    function validate(data) {
        const schema = Yup.object().shape({				
            name: Yup.string()
                .required('* Campo obrigatório'),
            email: Yup.string()
                .email('* Digite um e-mail válido')
                .required('* Campo obrigatório'),

            address: Yup.object().shape({
                city: Yup.string()
                    .min(2, '* No mínimo 2 caracteres')
                    .required('* Campo obrigatório'),
                state: Yup.string()
                    .min(2, '* No mínimo 2 caracteres')
                    .required('* Campo obrigatório'),
            }),

            password: Yup.string()
                .min(6, '* No mínimo 6 caracteres')
                .required('* Campo obrigatório'),
        });

        return schema.validate(data, {
            abortEarly: false,
        });
    }

    async function handleSubmit(data, { reset }){
		try{
			await validate(data);

			formRef.current.setErrors({});
			reset();

            const usuario = await registrar(data.name, data.email, data.password, data.address.state, data.address.city);

            localStorage.setItem("token", usuario.token);
            localStorage.setItem("user", JSON.stringify(usuario.user));

            router.push('/');
		} catch(err){
			if(err instanceof Yup.ValidationError){
				const errorMessages = {};
				
				err.inner.forEach(error => {
					errorMessages[error.path] = error.message;
				});

				formRef.current.setErrors(errorMessages);
			}
		}
	}

    return(   
        <CustomForm ref={formRef} onSubmit={handleSubmit}>
			<TextInput name="name" label="Nome" />
			<TextInput type="email" name="email" label="E-mail" />
				
			<Scope path="address">
				<TextInput name="city" label="Cidade"/>
				<TextInput name="state" label="Estado"/>
			</Scope>

			<TextInput type="password" name="password" label="Senha" />

			<CustomButton>Registrar</CustomButton>
		</CustomForm>
    );
}