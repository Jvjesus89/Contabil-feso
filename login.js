function verificarLogin() {
    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;

   //Verifica se o usuario está correto
   if (usuario == 'admin' && senha == '123') {
   localStorage.setItem('estaLogado', 'true');
   localStorage.setItem('nomeUsuario', usuario);
   window.location.href = 'Index.html';
   FazerLogin();  
   return  
        } 
   if (usuario == 'estudante' && senha == '123'){
      localStorage.setItem('estaLogado', 'true');
      localStorage.setItem('nomeUsuario', usuario);
      window.location.href = 'Index.html';
      FazerLogin();    
      return
   }
   if (usuario == 'professor' && senha == '123'){
      localStorage.setItem('estaLogado', 'true');
      localStorage.setItem('nomeUsuario', usuario);
      window.location.href = 'Index.html';
      FazerLogin();   
      return 
   }
   if (usuario == 'usuario' && senha == '123') {
    localStorage.setItem('estaLogado', 'true');
    localStorage.setItem('nomeUsuario', usuario);
    window.location.href = 'Index.html';
    FazerLogin();  
    return  
         } 
        alert('Login inválido');
}

   // Verificação inicial ao carregar a página
   
window.onload = function() {
   if (localStorage.getItem('estaLogado') === 'true') {
   FazerLogin();  
}  
} 
function FazerLogin() {
       let nomeUsuario = localStorage.getItem('nomeUsuario');    
    // Selecionando os elementos a serem alterados
   const formLogin = document.getElementById('loginForm');
   const mensagemBoasVindas = document.createElement('p');

   // cria a mensagem de boas-vindas
   mensagemBoasVindas.textContent = "Seja bem-vindo, " + nomeUsuario + " ! "; 
   mensagemBoasVindas.classList.add('menboasvindas');  
     
   //realiza a troca da tela de login pela tela de boas vindas
   formLogin.parentNode.replaceChild(mensagemBoasVindas, formLogin);
   
   // Cria um botão sair
   const botaoLogout = document.createElement('button');
   botaoLogout.textContent = 'Sair';
   botaoLogout.classList.add('loginButton');
   botaoLogout.onclick = logout;

   // botão de logout após a mensagem de boas-vindas
   mensagemBoasVindas.appendChild(botaoLogout);
}
function logout() {
   // Remove o nome do usuário do localStorage e recarrega a página
   localStorage.removeItem('nomeUsuario');
   localStorage.removeItem('estaLogado');
   localStorage.removeItem('caminhoCadastro');
   location.reload();
   window.location.href = 'Index.html';
   } 


//VALIDAÇÃO PERMISÃO USUARIOS
function verificaCaminhoCadastro() {
    let caminho = '';

    if (localStorage.getItem('estaLogado') === 'true') {
        const nomeUsuario = localStorage.getItem('nomeUsuario');

        switch (nomeUsuario) {
            case 'admin':
                caminho = "cadastroAdmin.html";
                break;
            case 'estudante':
                caminho = "cadastroestudante.html";
                break;
            case 'professor':
                caminho = "cadastroprofessor.html";
                break;
            default:
                caminho = 'cadastro.html';
        }
    } else {
        caminho = 'cadastro.html';
    }

localStorage.setItem('caminhoCadastro', caminho); 
window.location.href = caminho;
}  

function verificaCaminhoagendamento() {
    let caminho = '';

    if (localStorage.getItem('estaLogado') === 'true') {
        const nomeUsuario = localStorage.getItem('nomeUsuario');

        switch (nomeUsuario) {
            case 'admin':
                caminho = "agendamentosAdmin.html";
                break;
            case 'estudante':
                caminho = "Agendamentos.html";
                break;
            case 'professor':
                caminho = "AgendamentosProfessor.html";
                break;
            default:
                caminho = 'Agendamentos.html';
        }
    } else {
        caminho = 'Agendamentos.html';
    }

localStorage.setItem('caminhoCadastro', caminho); 
window.location.href = caminho;
}  
  function validarFormulario() {

    const senha = document.getElementById('senhaCampo').value;   

    const confirme = document.getElementById('confirme').value;

                        if (senha !== confirme) {

                            alert('As senhas não conferem.');

                            return false;

            }else{

                            alert('Seu Cadastro foi enviado com sucesso!');  

                return true;

                        }

                    }

function formatarCPF(cpfField) {

    // Remover caracteres que não sejam dígitos

    let cpf = cpfField.value.replace(/\D/g, '');

    // formatação CPF

    if (cpf.length > 11) {

        cpf = cpf.slice(0, 11);

    }

    if (cpf.length > 9) {

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');

    }

    if (cpf.length > 6) {

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    }

    if (cpf.length > 3) {
        
        cpf = cpf.replace(/(\d{3})(\d)/, '$1-$2');
    
    }

    cpfField.value = cpf;

}






