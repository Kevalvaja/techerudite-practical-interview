import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import api from "../utils/api"
import { toast, ToastContainer } from 'react-toastify';

const AdminRegistration = () => {
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            user_first_name: "",
            user_last_name: "",
            user_email: "",
            user_password: "",
            user_role: 1, // 1 means admin role
        },
        validationSchema: yup.object({
            user_first_name: yup.string().required("First Name is required"),
            user_last_name: yup.string().required("Last Name is required"),
            user_email: yup.string().required("Email Id is required").email("Must be a enter valid email"),
            user_password: yup.string().required("Password is required"),
        }),
        onSubmit: async () => {
            try {
                const {
                    user_first_name,
                    user_last_name,
                    user_email,
                    user_password,
                    user_role,
                } = formik?.values
                const res = await api.post(`/public/api/users`, {
                    user_first_name,
                    user_last_name,
                    user_email,
                    user_password: btoa(user_password),
                    user_role,
                });
                if (res?.status === 201) {
                    setMsg("")
                    toast.success(res?.data?.message)
                    setTimeout(() => {
                        navigate("/")
                    }, 3000);
                }
            } catch (error) {
                if (error?.response?.status === 409) {
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
                                                <h5 className="card-title text-center pb-0 fs-4">Admin Registration</h5>
                                            </div>
                                            <form className="row g-3 needs-validation" novalidate>
                                                <div className="col-12">
                                                    <label for="user_first_name" className="form-label">First Name</label>
                                                    <input type="text" name="user_first_name" className="form-control" id="user_first_name" value={formik?.values?.user_first_name} onChange={formik?.handleChange} />
                                                    {formik?.errors?.user_first_name && formik?.touched?.user_first_name &&
                                                        <div className="text-sm text-danger">{formik?.errors?.user_first_name}</div>
                                                    }
                                                </div>

                                                <div className="col-12">
                                                    <label for="user_last_name" className="form-label">Last Name</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" name="user_last_name" className="form-control" id="user_last_name" value={formik?.values?.user_last_name} onChange={formik?.handleChange} />
                                                    </div>
                                                    {formik?.errors?.user_last_name && formik?.touched?.user_last_name &&
                                                        <div className="text-sm text-danger">{formik?.errors?.user_last_name}</div>
                                                    }
                                                </div>

                                                <div className="col-12">
                                                    <label for="user_email" className="form-label">Your Email</label>
                                                    <input type="user_email" name="user_email" className="form-control" id="user_email" value={formik?.values?.user_email} onChange={formik?.handleChange} />
                                                    {formik?.errors?.user_email && formik?.touched?.user_email &&
                                                        <div className="text-sm text-danger">{formik?.errors?.user_email}</div>
                                                    }
                                                </div>

                                                <div className="col-12">
                                                    <label for="user_password" className="form-label">Password</label>
                                                    <input type="password" name="user_password" className="form-control" id="user_password" value={formik?.values?.user_password} onChange={formik?.handleChange} />
                                                    {formik?.errors?.user_password && formik?.touched?.user_password &&
                                                        <div className="text-sm text-danger">{formik?.errors?.user_password}</div>
                                                    }
                                                </div>
                                                {msg && <b className='text-sm text-danger text-center'>{msg}</b>}
                                                <div className="col-12" onClick={() => formik?.handleSubmit()}>
                                                    <button className="btn btn-primary w-100" type="button">Submit</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0 text-center">Already have an account? <Link to="/">Log in</Link></p>
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

export default AdminRegistration
