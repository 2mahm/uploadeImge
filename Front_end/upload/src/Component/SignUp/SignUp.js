import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import {rejesterUser } from "../../Api"
const SigUp = () => {
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
        .min(3, "username must be at least 4 characters")
        .max(7, "username can not exceed 10 characters"),
      password: Yup.string()
        .required("Password is required ")
        .min(3, "password should have minimum length of 6"),
    }),

   

    onSubmit:async (values)=>{
      

      if (formil.isValid) {
      
        setUsername(values.username); 
        setPassword(values.password); 
       console.log("usernaem is :" ,values.username);
  
        try{
         await rejesterUser({username ,password })
  alert('User registered successfully')
  navigat("/signin")
        }catch(error){

          console.log('Error registering user');
          navigat("/signup")
          
        }
       
      }
      
      formil.resetForm();
    
    },
  });
//    console.log(formil);

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
          <span className="fw-light">Register</span>
        </div>
        <div className="mx-4 my-4">
        
         
          
          <Row className="mb-3 text-start">
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                Username<span className="text-danger"> *</span>
              </Form.Label>
              <div className="position-relative ">
                <Form.Control
                 type="text"
                  name="username"
                  placeholder="username"
                  value={formil.values.username}
                  onChange={formil.handleChange}
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
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-3 text-start">
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                Create Password<span className="text-danger"> *</span>
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

                {formil.errors.username &&console.log(formil.isValid)
                }
              </div>
            </Form.Group>
          </Row>
          <Row className="mx-1">
            <Button type="submit" className="btn  my-3 rounded-2 fw-bold ">
            Register
            </Button>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default SigUp;