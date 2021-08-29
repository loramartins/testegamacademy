console.log('javascript carregado');

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;   
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    if (strCPF == "00000000000")
	return false;
    for (i=1; i<=9; i++)
	Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) )
	return false;
	Soma = 0;
    for (i = 1; i <= 10; i++)
       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false;
    return true;
}


function validacao(){

    console.log('inicio da validaçao CPF ');
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';

    var cpf= document.getElementById('cpf').value;

    var resultadoValidacao = TestaCPF(cpf);

    if (resultadoValidacao){
        document.getElementById('success').style.display = 'block';
       
        document.getElementById("form-cadastro").submit();
       
    }
    else{
        document.getElementById('error').style.display = 'block'; 
        alert("Validação CPF falhou!");
        return false;
    }


}

function buscaCep() {
    var cep = document.getElementById('CEP').value; console.log(cep);

    var request = new XMLHttpRequest(); 
    request.open('GET', 'https://viacep.com.br/ws/' + cep +'/json/'); 
    request.send();
    
    request.onload = async function () {
        var data = JSON.parse(this.response); 
        document.getElementById('endereco').value = data['logradouro']; 
        document.getElementById('bairro').value = data['bairro'];
        document.getElementById('cidade').value = data['localidade'];
        document.getElementById('estado').value = data['uf'].toLowerCase();
        document.getElementById('complemento').value = data['complemento'];
    }
}

window.onload = function() {
    document.getElementById("procuraCEP").addEventListener("click", buscaCep);

}

window.onload = function() {

    var evento =  function(event){
        event.preventDefault();
        validacao();
    }

    document.getElementById("enviar").addEventListener("click",evento);

}