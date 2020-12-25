let errors = 0;


function check(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            if (input.name === 'password2') {
                //errors = [...{ for: 'password2', error: 'فیلد بالا نمیتواند خالی بماند' }]
                errors++
            } else {
                //errors = [...{ for: `${getFieldName(input)}`, error: 'فیلد بالا نمیتواند خالی بماند' }]
                errors++
            }
        } 
    });
}

function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

function checkEmail(input) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value.trim())) {
        
        //errors = [...{ for: 'email', error: 'ایمیل نامعتبر است' }]
        errors++

    }
}

function checkPassword(input) {
    let re = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/;
    if (re.test(input.value.trim())) {
        input.classList.add('success')

    } else {
        //errors = [...{ for: 'password', error: 'پسورد باید حداقل شش کاراکتر شامل حداقل یک عدد و یک حرف باشد' }]
        errors++
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        //errors = [...{ for: `${getFieldName(input)}`, error: `این فیلد باید حداقل ${min} کاراکتر باشد` }]
        errors++
    } else if (input.value.length > max) {
        //errors = [...{ for: `${getFieldName(input)}`, error: `این فیلد باید حداکثر ${max} کاراکتر باشد` }]
        errors++
    }
}

function checkPassMatch(input1, input2) {
    if (input1.value !== input2.value) {
        //errors = [...{ for: 'password', error: 'دو فیلد پسورد مقدار یکسانی ندارند' }]
        errors++
    }
}

function validateForm(inputArr, password = undefined, password2 = undefined, email = undefined) {
    check(inputArr)
    password && checkPassword(password) && checkLength(password)
    password2 && checkPassMatch(password, password2)
    email && checkEmail(email)


    if (errors > 0) {
        errors = 0
        return { pass: false }
    }

    return { pass: true }
}

export default validateForm