import axios from "axios"
import { createContext, useContext, useState } from "react"
import { json, useNavigate } from "react-router-dom"
import { LoginInformation, userIn } from "../../../../navigationStack/navigation"



const LoginDetails=()=>{

  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const {loginTrue}=useContext(LoginInformation)
  const navigate=useNavigate()

  // const {setUser}=userIn()

  const usernameHandler=(event)=>{
  
    setUsername(event.target.value)
  }

 const passwordHandler=(event)=>{
     setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Username and password are required");
      return; 
    }
  
    const userInfo = {
      username,
      password
    };
  
    userDetails(userInfo);
  };
  
  const userDetails = (userInfo) => {
    axios.post("http://localhost:3030/login", userInfo, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
          console.log(res)
          if (res.data === "Invalid credentials") {
            console.log(res.data);
            alert(res.data);
        } else {
            console.log(res.data.message);
            alert(res.data.message);
            
            const user_id = res.data.user_id;

            sessionStorage.setItem("user_id",user_id)
            // setUser(user_id)
            // navigate(`/createtask/${user_id}`);
            
            console.log(user_id)
                loginTrue();
                navigate("/home");
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

    return(
        <>
        <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign in</h3>

                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input type="text" id="typeEmailX-2" className="form-control form-control-lg" value={username} onChange={usernameHandler}/>
                  <label className="form-label" htmlFor="typeEmailX-2">Username</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={passwordHandler}/>
                  <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                </div>

                {/* Checkbox */}
                <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                  <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                </form>

                {/* <hr className="my-4" /> */}

                {/* <button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' }}
                  type="submit"><i className="fab fa-google me-2"></i> Sign in with Google</button>
                <button className="btn btn-lg btn-block btn-primary mb-2" style={{ backgroundColor: '#3b5998' }}
                  type="submit"><i className="fab fa-facebook-f me-2"></i> Sign in with Facebook</button> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
        </>
    )
}
export default LoginDetails