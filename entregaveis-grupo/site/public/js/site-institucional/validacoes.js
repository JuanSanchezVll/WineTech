function validarNome(input) {
    errNome.innerHTML = "";
    const tamanhoMinimo = 2;

    if (input.length < tamanhoMinimo) {
        errNome.innerHTML = `<b style="font-size: 9px; color: red;" ">NOME DEVE CONTER NO MÍNIMO 3 LETRAS</b> <br>`;
    }

    for (let i = 0; i < input.length; i++) {
        const codigo_ascii = input.charCodeAt(i);

        if (!((codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122) || (codigo_ascii === 32))) {
            errNome.innerHTML = `<b style="font-size: 9px; color: red;" ">NOME SÓ DEVE CONTER LETRAS</b> <br>`;
            return false;
        }
    }

    return true;
}

function validarSobrenome(input) {
    errSobrenome.innerHTML = "";
    const tamanhoMinimo = 2;

    if (input.length < tamanhoMinimo) {
        errSobrenome.innerHTML = `<b style="font-size: 9px; color: red;" ">SOBRENOME DEVE CONTER NO MÍNIMO 3 LETRAS</b> <br>`;
    }

    for (let i = 0; i < input.length; i++) {
        const codigo_ascii = input.charCodeAt(i);

        if (!((codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122) || (codigo_ascii === 32))) {
            errSobrenome.innerHTML = `<b style="font-size: 9px; color: red;" ">SOBRENOME SÓ DEVE CONTER LETRAS</b> <br>`;
            return false;
        }
    }

    return true;
}

function validarSenha(input) {
    let contemMinuscula = false;
    let contemMaiuscula = false;
    let contemNumero = false;
    let contemEspecial = false;
    let tamanhoMinimo = false;

    if (input.length >= 8) {
        tamanhoMinimo = true;
    }

    for (let i = 0; i < input.length; i++) {
        const codigo_ascii = input.charCodeAt(i);

        if (codigo_ascii >= 97 && codigo_ascii <= 122) {
            contemMinuscula = true;
        } else if (codigo_ascii >= 65 && codigo_ascii <= 90) {
            contemMaiuscula = true;
        } else if (codigo_ascii >= 48 && codigo_ascii <= 57) {
            contemNumero = true;
        } else if (
            (codigo_ascii >= 32 && codigo_ascii <= 47) || 
            (codigo_ascii >= 58 && codigo_ascii <= 64) || 
            (codigo_ascii >= 91 && codigo_ascii <= 96) || 
            (codigo_ascii >= 123 && codigo_ascii <= 126)) 
        {
            contemEspecial = true;
        }
    }

    let msg = "";

    msg += (!tamanhoMinimo) ? `<b style="font-size: 9px; color: red;" ">SENHA DEVE TER NO MÍNIMO 8 CARACTERES.</b> <br>` : "";
    msg += (!contemMinuscula) ? `<b style="font-size: 9px; color: red;" ">SENHA DEVE TER PELO MENOS UMA LETRA MINÚSCULA.</b> <br>` : "";
    msg += (!contemMaiuscula) ? `<b style="font-size: 9px; color: red;" ">SENHA DEVE TER PELO MENOS UMA LETRA MAIÚSCULA.</b> <br>` : "";
    msg += (!contemNumero) ? `<b style="font-size: 9px; color: red;" ">SENHA DEVE TER PELO MENOS UM NÚMERO.</b> <br>` : "";
    msg += (!contemEspecial) ? `<b style="font-size: 9px; color: red;" ">SENHA DEVE TER PELO MENOS UM CARACTERE ESPECIAL.</b>` : "";

    if (msg != "") {
        errSenha.innerHTML = msg;
        return false;
    } else {
        errSenha.innerHTML = "";
        return true;
    }
}

function validarCNPJ(input) {
    errCNPJ.innerHTML = "";
    const tamanhoMinimo = input.length == 14;

    if (!tamanhoMinimo) {
        errCNPJ.innerHTML = `<b style="font-size: 9px; color: red;" ">CNPJ DEVE CONTER 14 NUMEROS</b> <br>`;
        return false;
    }

    for (let i = 0; i < input.length; i++) {
        const codigo_ascii = input.charCodeAt(i);

        if (codigo_ascii < 48 || codigo_ascii > 57) {
            errCNPJ.innerHTML = `<b style="font-size: 9px; color: red;" ">CNPJ DEVE CONTER APENAS NÚMEROS</b> <br>`;
            return false;
        }
    }

    return true;
}

function validarRazaoSocial(input) {
    errRS.innerHTML = "";
    const tamanhoMinimo = 3;

    if (input.length < tamanhoMinimo) {
        errRS.innerHTML = `<b style="font-size: 9px; color: red;">A RAZÃO SOCIAL DEVE CONTER NO MÍNIMO 3 CARACTERES</b> <br>`;
        return false;
    }

    for (let i = 0; i < input.length; i++) {
        const codigo_ascii = input.charCodeAt(i);

        if (!((codigo_ascii >= 32 && codigo_ascii <= 57) || (codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122))) {
            errRS.innerHTML = `<b style="font-size: 9px; color: red;" ">RAZÃO SOCIAL NÃO PODE CONTER CERTOS CARACTERES ESPECIAIS COMO "${input[i].toUpperCase()}"!</b> <br>`
            return false;
        }
    }

    return true;
}

function validarNomeFantasia(input) {
    errNF.innerHTML = "";
    const tamanhoMinimo = 3;

    if (input.length < tamanhoMinimo) {
        errNF.innerHTML = `<b style="font-size: 9px; color: red;">O NOME FANTASIA DEVE TER NO MÍNIMO 3 CARACTERES</b> <br>`;
        return false;
    }

    for (let i = 0; i < input.length; i++) {
        const codigo_ascii = input.charCodeAt(i);

        if (
            !(
                (codigo_ascii >= 32 && codigo_ascii <= 57) || 
                (codigo_ascii >= 65 && codigo_ascii <= 90) || 
                (codigo_ascii >= 97 && codigo_ascii <= 122)
            )
        ) {
            errNF.innerHTML = `<b style="font-size: 9px; color: red;" ">RAZÃO SOCIAL NÃO PODE CONTER CERTOS CARACTERES ESPECIAIS COMO "${input[i].toUpperCase()}"!</b> <br>`
            return false;
        }
    }

    return true;
}

function validarEmail(input) {
    errEmail.innerHTML = "";

    let temArroba = false;
    let temPonto = false;
    let emailValido = false;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "@") {
            temArroba = true;

            for (let j = i; j < input.length; j++) {
                if (input[j] === ".") {
                    temPonto = true;
                    emailValido = true;
                    break;
                }
            }
        }
    }

    if (!emailValido) {
        errEmail.innerHTML = `<b style="font-size: 9px; color: red;" ">Insira um Email valido (que inclua "@" e "." após ele)</b> <br>`
    }

    return emailValido;
}