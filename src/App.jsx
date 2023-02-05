import { useState } from 'react'
import { login } from './utils'
import './App.css'

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.


function App() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(null);
  const [isRequesting,setIsRequesting] = useState(false);

  const handleEmail = (e) => {
    const value = e.target.value;

    setEmail(value);
  }

  const handlePassword = (e) => {
    const value = e.target.value;

    setPassword(value);
  }

  const handleSubmit = () => {
    console.log('submitted');

    setError(null);
    setIsRequesting(true);

    let values = { email:email, password:password };
    login(values)
    .then(() => {
      alert('Logged!')
    })
    .catch((error) => {
      console.log(error);
      setError(error);
    })
    .finally(() => setIsRequesting(false));
  }

  return (
    <div className='wrapper'>

      <div className='login-form'>

        <h1>Login Form</h1>

        {error && <div className='errorMessage'>{error.message}</div>}

        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input 
          id={'email'} 
          type={'email'} 
          autoComplete='off' 
          value={email} 
          onChange={handleEmail}/>
        </div>

        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input 
          id={'password'} 
          type={'password'} 
          autoComplete='off' 
          value={password} 
          onChange={handlePassword} />
        </div>

        <div className='button'>
          <button 
          onClick={handleSubmit} 
          disabled={email === '' || password.length < 6 || isRequesting} >Login</button>
        </div>
        
      </div>

    </div>
  )
}

export default App
