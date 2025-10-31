    senha = false
    email = false
    
    function validarSenha() {
        
        
        if(inputSenha.value == "123abc"){
            senha = true
            
        }else{
            senha = false

        }
        
        
    }


    function validarEmail() {

            if (inputEmail.value == "123@123.com") {
                email = true
                
            
        }else
        {
            email = false

        }

    }

    function login() {

        const btnCad = document.getElementById('btnLogin')

        if(email == true && senha == true)
        {
            btnCad.onclick = function () { location.href = './dashboard/index-dashboard.html' }
        
        }else{

            btnCad.onclick = function () {
                errLogin.innerHTML = `<b style="font-size: 9px; color: red;" "> Senha ou email incorretos!</b> <br>`
                console.log(email,senha, inputEmail.value, inputSenha.value);
                
            }
            
        }

    }