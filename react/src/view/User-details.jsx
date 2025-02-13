import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { headersApplication } from '../utils/headers'
import { toast, ToastContainer } from 'react-toastify'

const UserDetails = () => {
    const [userData, setUserData] = useState({})
    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await api.get('/api/users/', { headers: await headersApplication() })
                if (res?.status === 200) {
                    setUserData(res?.data?.data)
                }
            } catch (error) {
                toast.error("Internal server error")
            }
        }
        getUserData();
    }, [])

    const logOut = async () => {
        sessionStorage?.removeItem("auth")
        window.location.reload();
    }
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
                                                <h5 className="card-title text-center pb-0 fs-4">Admin Profile</h5>
                                            </div>
                                            <form className="row g-3 needs-validation" novalidate>
                                                <div className="col-12">
                                                    <label for="user_first_name" className="form-label">First Name</label>
                                                    <input type="text" name="user_first_name" className="form-control" id="user_first_name" value={userData?.user_first_name} disabled />
                                                </div>

                                                <div className="col-12">
                                                    <label for="user_last_name" className="form-label">Last Name</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" name="user_last_name" className="form-control" id="user_last_name" value={userData?.user_last_name} disabled />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label for="user_email" className="form-label">Your Email</label>
                                                    <input type="user_email" name="user_email" className="form-control" id="user_email" value={userData?.user_email} disabled />
                                                </div>

                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="button"
                                                        onClick={() => logOut()}
                                                    >Logout</button>
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

export default UserDetails
