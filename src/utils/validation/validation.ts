const requiredField = 'Обязательно поле';

export const validationFirstName = {
    required: requiredField,
    minLength: 2
};

export const validationLastName = {
    required: requiredField,
    minLength: {
        value: 3,
        message: "Минимальная длина этого поля 3 символа"
    }
};

export const validationEmailName = {
    required: requiredField,
    minLength: {
        value: 3,
        message: "Минимальная длина этого поля 3 символа"
    },
    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const validationPassword = {
    required: requiredField,
    minLength: {
        value: 7,
        message: "Минимальная длина этого поля 7 символа"
    }
};
