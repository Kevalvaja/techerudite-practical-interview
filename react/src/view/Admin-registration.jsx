import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminRegistration = () => {
    const navigate = useNavigate()
    return (
        <>
            <main>
                <div class="container">

                    <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div class="card mb-3">

                                        <div class="card-body">

                                            <div class="pt-4 pb-2">
                                                <h5 class="card-title text-center pb-0 fs-4">Admin Registration</h5>
                                            </div>

                                            <form class="row g-3 needs-validation" novalidate>
                                                <div class="col-12">
                                                    <label for="yourName" class="form-label">First Name</label>
                                                    <input type="text" name="name" class="form-control" id="yourName" required />
                                                    <div class="invalid-feedback">Please, enter your name!</div>
                                                </div>

                                                <div class="col-12">
                                                    <label for="yourUsername" class="form-label">Last Name</label>
                                                    <div class="input-group has-validation">
                                                        <input type="text" name="username" class="form-control" id="yourUsername" required />
                                                        <div class="invalid-feedback">Please choose a username.</div>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <label for="yourEmail" class="form-label">Your Email</label>
                                                    <input type="email" name="email" class="form-control" id="yourEmail" required />
                                                    <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                                                </div>


                                                <div class="col-12">
                                                    <label for="yourPassword" class="form-label">Password</label>
                                                    <input type="password" name="password" class="form-control" id="yourPassword" required />
                                                    <div class="invalid-feedback">Please enter your password!</div>
                                                </div>

                                                <div class="col-12">
                                                    <button class="btn btn-primary w-100" type="submit">Submit</button>
                                                </div>
                                                <div class="col-12">
                                                    <p class="small mb-0">Already have an account? <Link to="/">Log in</Link></p>
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
