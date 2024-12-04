import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignIn.css";
import { loginUser } from "../../Api";
import  { useState } from 'react';
import { useNavigate } from "react-router";

const SignIn = ({setToken}) => {
  const navigat=useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formil = useFormik({
    validateOnMount: false,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string("user name must be string")
        .required("Username is required")
        .min(2, "username must be at least 4 characters")
        .max(7, "username can not exceed 10 characters"),
      
      password: Yup.string()
        .required("Password is required ")
        .min(4, "password should have minimum length of 6"),
    }),


    onSubmit:async (values)=>{
      
      if (formil.isValid) {      
        setUsername(values.username); 
         setPassword(values.password); 
  
        console.log('Username set to:', values.username);
        console.log('Password set to:', values.password);
        try{
         const{data}= await loginUser({ username , password})
        setToken(data.access)
        localStorage.setItem('token',data.access)
          console.log("welcom credentials ");
          
          navigat("/upload")

        }catch(error){
          console.log('invalid credentials');
          
        }
       
      }
      
      formil.resetForm();
    },
  });


  return (
    <div className="container  my-2 text-center  p-2  justify-content-center ">
      <Form
        className=" w-25 mx-auto text-start  rounded-4 bg-white shadow "
        style={{ minWidth: "360px" }}
        onSubmit={formil.handleSubmit}
      >
        <div
          className="prim-pg text-center text-dark p-1"
          style={{ borderRadius: "11px 11px 0px 0px" }}
        >
          <span className="fw-light">Login</span>
        </div>
        <div className="mx-4 my-4">
          <Row className="mb-3  pt-4 text-start">
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                username<span className="text-danger"> *</span>
              </Form.Label>

              <Form.Control
             
                name="username"
                type="text"
                value={formil.values.username}
                placeholder="Enter Your Name"
                onChange={formil.handleChange }
                onBlur={formil.handleBlur}
              />
              {formil.errors.username && formil.touched.username ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                    marginTop: "3px",
                  }}
                >
                  {formil.errors.username}
                </p>
              ) : (
                ""
              )}
            </Form.Group>
          </Row >
          <Row className="mb-3 text-start">
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                Password<span className="text-danger"> *</span>
              </Form.Label>
              <div className="position-relative ">
                <Form.Control
                 type="password"
                  name="password"
                  placeholder="Password"
                  value={formil.values.password}
                  onChange={formil.handleChange}
                  onBlur={formil.handleBlur}
                />
                {formil.errors.password && formil.touched.password ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "3px",
                    }}
                  >
                    {formil.errors.password}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </Form.Group>
          </Row>
          <Row className="mx-1">
            
            <Button type="submit" className="btn  my-3 rounded-2 fw-bold ">
              LOGIN
            </Button>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
