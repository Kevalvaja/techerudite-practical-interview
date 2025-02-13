import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as yup from "yup"
import api from "../utils/api"
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
    const [msg, setMsg] = useState("")
    const formik = useFormik({
        initialValues: {
            emailId: "",
            password: "",
        },
        validationSchema: yup.object({
            emailId: yup.string().required("Email Id is required").email("Must be a enter valid email"),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: async () => {
            try {
                const { emailId, password } = formik?.values
                const res = await api.post(`/public/api/users/userLogin`, {
                    emailId, password: btoa(password)
                });
                if (res?.status === 200) {
                    setMsg("")
                    sessionStorage.setItem("auth", res?.data?.data)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500);
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    setMsg(error?.response?.data?.message)
                } else {
                    toast.error("Internal server error")
                }
            }
        }
    })
    return (
        <>
            <ToastContainer autoClose={2000} />
            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Admin Login</h5>
                                            </div>

                                            <form className="row g-3 needs-validation" novalidate>

                                                <div className="col-12">
                                                    <label for="emailId" className="form-label">Email</label>
                                                    <div className="input-group has-validation">
                                                        <input type="email" name="emailId" className="form-control" id="emailId" value={formik?.values?.emailId} onChange={formik?.handleChange} />
                                                    </div>
                                                    {formik?.errors?.emailId && formik?.touched?.emailId &&
                                                        <div className="text-sm text-danger">{formik?.errors?.emailId}</div>
                                                    }
                                                </div>

                                                <div className="col-12">
                                                    <label for="password" className="form-label">Password</label>
                                                    <input type="password" name="password" className="form-control" id="password" value={formik?.values?.password} onChange={formik?.handleChange} />
                                                    {formik?.errors?.password && formik?.touched?.password &&
                                                        <div className="text-sm text-danger">{formik?.errors?.password}</div>
                                                    }
                                                </div>

                                                {msg && <b className='text-sm text-danger text-center'>{msg}</b>}
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="button"
                                                        onClick={() => formik?.handleSubmit()}
                                                    >Login</button>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <Link to="/admin-registration">Admin Registration</Link>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <Link to="/customer-registration">Customer Registration</Link>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </main>
        </>
    )
}

export default Login
