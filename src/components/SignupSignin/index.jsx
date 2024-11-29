import React from "react";
import "./styles.css";
import Input from "../Input/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider, db } from "../../firebase.js";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignUpSignInComponent (){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState();
    const [loginForm, setLoginForm] = useState(false);
    const navigate = useNavigate();
    
    function signupWithEmail(){
      setLoading(true)
        if(name!="" && email !="" && password !="" && confirmPassword !=""){
        if(password==confirmPassword){
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          // Signed up 
           const user = userCredential.user;
           console.log("User>>>", user);
           toast.success("User Created!");
           setLoading(false);
           setName("");
           setPassword("");
           setEmail("");
           setConfirmPassword("");
           createDoc(user);
           navigate("/dashboard"); 
          // ...
          })
          .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false)
          // ..
          });
         }
         else{
          toast.error("Passwords don't match")
          setLoading(false)
         }
        }

        else{
          toast.error("All fields are mandatory")
          setLoading(false)
        }
    }


    function LoginUsingEmail(){
      setLoading(true);
      if(email !="" && password !="" ){
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged In!");
    console.log("User logged in", user);
    setLoading(false);
    navigate("/dashboard"); 
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    toast.error(errorMessage);
  });
      }else{
        setLoading(false);
        toast.error("All fields are mandatory!"); 
      }
      
  
    }
    async function createDoc(user) {
      setLoading(true);
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);

      if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid), {  
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      }
      catch(e){
         toast.error(e.message);
         setLoading(false);
      }
    }else{
        //  toast.error("Doc already exists!");
         setLoading(false);
    }
      
    }

    function googleAuth(){
     setLoading(true);
     try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        createDoc(user);
        setLoading(false);
        navigate("/dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        toast.success("User Authenticated")
      }).catch((error) => {
        setLoading(false);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
     }catch(e){
      setLoading(false);
      toast.error(e.message);
     } 
      
    }


    return (
    <> 
    {loginForm?<div className="signup-wrapper">
        <h2 className="title">
          Login on <span style={{ color: "var(--theme)" }}>FinTra</span>  
        </h2>
        <form>
          
           <Input
           type="email"
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"JohnDoe@gmail.com"}
          />
          <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
          /> 
           
          <Button disabled={loading} text={loading ? "Loading...":"Login using email and password"}
          onClick={LoginUsingEmail}
          />
          <p style={{ textAlign:"center"}}>OR</p>
          <Button onClick={googleAuth} text={loading ? "Loading...":"Login using Google"}/>
          <p className="p-login" style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don&apos;t Have An Account? Click here</p>
        </form>
    </div>:<div className="signup-wrapper">
        <h2 className="title">
          Sign Up on <span style={{ color: "var(--theme)" }}>FinTra</span>  
        </h2>
        <form>
          <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
          />  
           <Input
           type="email"
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"JohnDoe@gmail.com"}
          />
          <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
          /> 
          <Input
          type="password"
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
          />   
          <Button disabled={loading} text={loading ? "Loading...":"Signup using email and password"}
          onClick={signupWithEmail}
          />
          <p style={{ textAlign:"center"}}>OR</p>
          <Button onClick={googleAuth} text={loading ? "Loading...":"Signup using Google"}/>
          <p className="p-login" style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already? Click here</p>
        </form>
    </div>}
    
    </>
)
}

export default SignUpSignInComponent ;