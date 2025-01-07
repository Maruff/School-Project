import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [Message, setMessage] = useState(".....Loading....")

  useEffect(() => {
    fetchString()
  }, []);

  const fetchString = async () => {
    const response = await fetch("http://127.0.0.1:8000/lost", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    if (response.ok) {
      const data = await response.json();
       setMessage(data.msg)
       console.log(data)
    }
  }

  return (
    <>
      <div className='LoginDiv'>
        <div className='LoginElement'>
          <div style={{textAlign: 'center'}}>
              Login
          </div>
          <form>
            <input type="text" placeholder='Enter username' style={{marginTop: '1rem'}}/>
            <br />
            <input type="text" placeholder='Enter password' style={{marginTop: '1rem'}}/>
            <br />
            <button type='submit'>Sign In</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
