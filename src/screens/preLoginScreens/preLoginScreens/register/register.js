import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInformation } from "../../../../navigationStack/navigation";



const CreateAccount=()=>{

    const backgroundImageStyle = {
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        // Add other styles if needed
      };
      
      const[username,setUsername]=useState("")
      const[email,changeEmail]=useState("")
      const emailInput=/@gmail\.com$/
  const [emailError,changeEmailError]=useState("")
  const navigate=useNavigate()
    const {loginTrue}=useContext(LoginInformation)

   //password
   const[password,changePassword]=useState("")
   const passwordInput=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
//    const passwordInput=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/
 
   const [passwordError,changePasswordError]=useState("")
 // let  a=password
   const[confirmPassword,confirmChangePassword]=useState("")
   const [error,changeError]=useState("")

   useEffect(()=>{
    
   },[])

  const userHandler=(event)=>{
      setUsername(event.target.value)
      console.log(event.target.value)
  }

      const emailHandler=(event)=>{
        // console.log(event.target.value)
        changeEmail(event.target.value)
        if(emailInput.test(event.target.value)){
          changeEmailError("")
        }
        else{
          changeEmailError("enter correct email")
        }
    
      }

      //password
  const passwordHandler=(event)=>{
    // console.log(event.target.value)
    changePassword(event.target.value)
    if(event.target.value.match(passwordInput)){
      changePasswordError("")
    }
    else{
      changePasswordError("password must be correct")
    }

  }
  //confirm password
  const confirmPasswordHandler=(event)=>{
    // console.log(event.target.value)
    confirmChangePassword(event.target.value)
    if(event.target.value === password){
      changeError("")
    }
    else{
      changeError("pass is doesnot match")
      // alert("password has to match")
    }
  }

  const skip=()=>{
    loginTrue()
    navigate("/home")
  }

  


  const handleSubmit=(event)=>{
     event.preventDefault()

     axios.post("http://localhost:3030/register",{
      username,
       email,
       password 
     }, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
    })
     .then((res)=>{
      if(res.data=="successfully register"){
        alert(res.data)
        navigate("/login")
      }
      else{
        alert(res.data)
      }
      console.log(username)
      console.log(password)
      console.log(confirmPassword)
     })
     
    //  fetch("http://localhost:3030/register", {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username,
    //     email,
    //     password                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    //   })
    // })
    // .then(res => res.json())
    // .then((response) => {
      
    //     console.log(response);
     
    // })
    // .catch((error) => {
    //   console.error("Error during registration:", error);
    // });
  }

    return(
        <>
        <section className="vh-100 bg-image"
  style={backgroundImageStyle}>
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius:"15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleSubmit}>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" placeholder="UserName" value={username} onChange={userHandler}/>
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" placeholder="Your Email" value={email} onChange={emailHandler}/>
                  {/* <label className="form-label" htmlFor="form3Example3cg">Your Email</label> */}
                  {
                    emailError?
                    <h4  style={{color:"red"}}>{emailError}</h4>:null
                   }
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" placeholder="Password" value={password} onChange={passwordHandler}/>
                  {/* <label className="form-label" htmlFor="form3Example4cg">Password</label> */}
                  {
                      passwordError?
                      <h4 style={{color:"red"}}>{passwordError}</h4>:null
                   }
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" placeholder="confirm your password" value={confirmPassword} onChange={confirmPasswordHandler} />
                  {/* <label className="form-label" htmlFor="form3Example4cdg">confirm your password</label> */}
                  {
              error?
              <h4 style={{color:"red"}}>{error}</h4>
              :
              null
            }
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label" htmlFor="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? 
                <Link to="/login"><a href="#!"className="fw-bold text-body"><u>Login here</u></a></Link>
                </p>
                <Link to="/home" onClick={skip}>
                <a href="#!"className="fw-bold text-body"><u>Skip Register & Login</u></a>
                </Link>
             {/* <a style={{color:"black",marginLeft:"170px"}}>Skip Register & Login</a> */}
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}
export default CreateAccount;