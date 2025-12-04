function mostrarErro(msg) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = msg;
    return false;
}

function validarNome(input) {
    const tamanhoMinimo = 3;

    if (input.length <= tamanhoMinimo) {
        return mostrarErro("NOME DEVE CONTER NO MÍNIMO 3 LETRAS");
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);
            if (!((codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122) || (codigo_ascii === 32))) {
                return mostrarErro(`NOME SÓ DEVE CONTER LETRAS`);
            } else {
                cardErro.style.display = "none";
            }
        }
    }

    return true;
}

function validarSobrenome(input) {
    const tamanhoMinimo = 2;

    if (input.length < tamanhoMinimo) {
        return mostrarErro(`SOBRENOME DEVE CONTER NO MÍNIMO 3 LETRAS`);
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);

            if (!((codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122) || (codigo_ascii === 32))) {
                return mostrarErro('SOBRENOME SÓ DEVE CONTER LETRAS');
            } else {
                cardErro.style.display = "none";
            }
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
            (codigo_ascii >= 123 && codigo_ascii <= 126)) {
            contemEspecial = true;
        }
    }

    let msg = "";

    msg += (!tamanhoMinimo) ? `MÍNIMO 8 CARACTERES.<br>` : "";
    msg += (!contemMinuscula) ? `LETRA MINÚSCULA.<br>` : "";
    msg += (!contemMaiuscula) ? `LETRA MAIÚSCULA.<br>` : "";
    msg += (!contemNumero) ? `NÚMERO.<br>` : "";
    msg += (!contemEspecial) ? `CARACTERE ESPECIAL.<br>` : "";

    if (msg != "") {
        return mostrarErro(`A senha deve ter: <br> ${msg}`);
    }
    return true;
}

function validarCNPJ(input) {
    const tamanhoMinimo = input.length == 14;

    if (!tamanhoMinimo) {
        return mostrarErro(`CNPJ DEVE CONTER 14 NUMEROS`);
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);

            if (codigo_ascii < 48 || codigo_ascii > 57) {
                return mostrarErro(`CNPJ DEVE CONTER APENAS NÚMEROS`);
            } else {
                cardErro.style.display = "none";
            }
        }
    }
    return true;
}

function validarRazaoSocial(input) {
    const tamanhoMinimo = 3;

    if (input.length < tamanhoMinimo) {
        return mostrarErro(`A RAZÃO SOCIAL DEVE CONTER NO MÍNIMO 3 CARACTERES.`);
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);

            if (!((codigo_ascii >= 32 && codigo_ascii <= 57) || (codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122))) {
                return mostrarErro(`RAZÃO SOCIAL NÃO PODE CONTER CERTOS CARACTERES ESPECIAIS COMO ${input[i].toUpperCase()}!`)
            } else {
                cardErro.style.display = "none";
            }
        }
    }
    return true;
}

function validarNomeFantasia(input) {
    const tamanhoMinimo = 3;

    if (input.length < tamanhoMinimo) {
        return mostrarErro(`O NOME FANTASIA DEVE TER NO MÍNIMO 3 CARACTERES`);
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);
            if (
                !(
                    (codigo_ascii >= 32 && codigo_ascii <= 57) ||
                    (codigo_ascii >= 65 && codigo_ascii <= 90) ||
                    (codigo_ascii >= 97 && codigo_ascii <= 122)
                )
            ) {
                return mostrarErro(`RAZÃO SOCIAL NÃO PODE CONTER CERTOS CARACTERES ESPECIAIS COMO ${input[i].toUpperCase()}!`)
            } else {
                cardErro.style.display = "none";
            }
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
        return mostrarErro(`Insira um Email valido (que inclua "@" e "." após ele)`)
    } else {
        cardErro.style.display = "none";
    }
    return emailValido;
}