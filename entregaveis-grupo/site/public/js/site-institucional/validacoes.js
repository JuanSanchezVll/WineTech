function mostrarErro(msg) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = msg;
    return false;
}

function validarNome(input) {
    const tamanhoMinimo = 3;

    if (input.length <= tamanhoMinimo) {
        return mostrarErro("Nome deve conter no mínimo 3 letras.");
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);
            if (!((codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122) || (codigo_ascii === 32))) {
                return mostrarErro(`Nome deve conter apenas letras.`);
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
        return mostrarErro(`Sobrenome deve conter no mínimo 3 letras.`);
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);

            if (!((codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122) || (codigo_ascii === 32))) {
                return mostrarErro('Sobrenome deve conter apenas letras.');
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

    msg += (!tamanhoMinimo) ? `Mínimo de 8 caracteres.<br>` : "";
    msg += (!contemMinuscula) ? `Letra minúscula.<br>` : "";
    msg += (!contemMaiuscula) ? `Letra maiúscula.<br>` : "";
    msg += (!contemNumero) ? `Número.<br>` : "";
    msg += (!contemEspecial) ? `Caractere especial.<br>` : "";

    if (msg != "") {
        return mostrarErro(`A senha deve ter: <br> ${msg}`);
    }
    return true;
}

function validarCNPJ(input) {
    const tamanhoMinimo = input.length == 14;

    if (!tamanhoMinimo) {
        return mostrarErro(`CNPJ deve conter 14 números.`);
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);

            if (codigo_ascii < 48 || codigo_ascii > 57) {
                return mostrarErro(`CNPJ deve conter apenas números`);
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
        return mostrarErro(`A razão social deve conter no mínimo 3 caracteres.`);
    } else {
        cardErro.style.display = "none";
        for (let i = 0; i < input.length; i++) {
            const codigo_ascii = input.charCodeAt(i);

            if (!((codigo_ascii >= 32 && codigo_ascii <= 57) || (codigo_ascii >= 65 && codigo_ascii <= 90) || (codigo_ascii >= 97 && codigo_ascii <= 122))) {
                return mostrarErro(`Razão social não pode conter certos caracteres como: ${input[i].toUpperCase()}!`)
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
        return mostrarErro(`O nome fantasia deve ter no mínimo 3 caracteres.`);
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
                return mostrarErro(`Nome fantasia não pode conter certos caracteres como: ${input[i].toUpperCase()}!`)
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