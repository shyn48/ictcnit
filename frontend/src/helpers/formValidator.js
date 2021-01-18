let errors = [];


function check(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            if (input.name === 'password2') {
                errors.push({ for: 'password2', error: 'فیلد بالا نمیتواند خالی بماند' })
                
            } else {
                errors.push({ for: `${getFieldName(input)}`, error: 'فیلد بالا نمیتواند خالی بماند' })
                
            }
        } 
    });
}

function getFieldName(input) {
    return input.name
}

function checkEmail(input) {
    //eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value.trim())) {
        errors.push({ for: 'email', error: 'ایمیل نامعتبر است' })
    }
}

function checkPassword(input) {
    let re = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/;
    if (re.test(input.value.trim())) {

    } else {
        errors.push({ for: 'password', error: 'پسورد باید حداقل شش کاراکتر شامل حداقل یک عدد و یک حرف باشد' })
        
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        errors.push({ for: `${getFieldName(input)}`, error: `این فیلد باید حداقل ${min} کاراکتر باشد` })
        
    } else if (input.value.length > max) {
        errors.push({ for: `${getFieldName(input)}`, error: `این فیلد باید حداکثر ${max} کاراکتر باشد` })
        
    }
}

function checkPassMatch(input1, input2) {
    if (input1.value !== input2.value) {
        errors.push({ for: 'password', error: 'دو فیلد پسورد مقدار یکسانی ندارند' })
        
    }
}

function validateForm(inputArr, password = undefined, password2 = undefined, email = undefined) {
    check(inputArr)
    password && checkPassword(password) && checkLength(password)
    password2 && checkPassMatch(password, password2)
    email && checkEmail(email)


    if (errors.length > 0) {
        const result = { pass: false, errors }
        errors = []
        return result
    }

    return { pass: true }
}

export default validateForm