import React, { Component } from 'react'
import leftLoginIcon from "../../icon/leftLoginIcon.svg"
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Checkbox, FormControlLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import google from "../../icon/google.svg";
import facebook from "../../icon/facebook.svg";
import or from "../../icon/or.svg"
import ValidateEmail from "../../utils/ValidateEmail";
import ValidatePass from "../../utils/ValidatePass";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../components/LoginForm/loginform.module.css";
import { toast, ToastContainer } from 'react-toastify';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
            isTrue: true,
            isTruePass: true,
            isChecked: false,
            errorMessage: false,

            newUserInfo: []
        };
    }

    handleClickShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleEmailChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let isTrue = ValidateEmail(value)

        if (isTrue) {
            this.setState({ [name]: value, isTrue: true })
        } else {
            this.setState({ isTrue: false })
        }

    }

    handlePassChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let isTrue = ValidatePass(value)

        if (isTrue) {
            this.setState({ [name]: value, isTruePass: true });
        } else {
            this.setState({ isTruePass: false })
        }
    }

    handleChecked = () => {
        console.log("isledi");
        this.setState((prevState) => ({
            isChecked: !prevState.isChecked
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }


    handleSubmitData = () => {
        const { email, password, isChecked } = this.state;
        if (!email || !password) {
            this.setState({ errorMessage: true })
            toast.error('Oops! Please Enter Email and Password...', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            this.setState({ errorMessage: false })
            toast.success('Successful! Login process is successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        let newUserObj = { email, password, isChecked }
        let newUserArr = []
        newUserArr.push(newUserObj)
        let newObj = [...this.state.newUserInfo, ...newUserArr]
        this.setState({ newUserInfo: newObj })
    }

    render() {

        const { showPassword } = this.state;
        console.log(this.state);
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <div className={styles["login-container"]}>

                    <div className={styles["left-login-container"]}>
                        <img src={leftLoginIcon} alt="loginIcon" style={{ width: "500px" }} />
                    </div>

                    <div className={styles["right-login-container"]}>
                        <h2 className={styles["welcome"]}>Welcome to <br />
                            <span className={styles["eacamp"]}>Eacamp School</span>
                        </h2>

                        <div className={styles["socilmedia-container"]}>
                            <div className={styles["google-login"]}>
                                <button className={styles["google-login-btn"]}>
                                    <img src={google} alt="google-icon" style={{ marginRight: "15px", width: "25px" }} />
                                    Login with Google
                                </button>
                            </div>

                            <div className={styles["facebook-login"]}>
                                <button className={styles["facebook-login-btn"]}>
                                    <img src={facebook} alt="facebook-icon" style={{ marginRight: "15px", width: "15px" }} />
                                    Login with Facebook
                                </button>
                            </div>
                        </div>

                        <div className={styles["or-container"]}>
                            <img src={or} alt="or-icon" style={{ width: "500px" }} />
                        </div>

                        <form className={styles["form-container"]} onSubmit={this.handleSubmit}>

                            {this.state.isTrue ? <TextField
                                id="filled-multiline-flexible"
                                label="Email"
                                name="email"
                                value={this.state.value}
                                multiline
                                maxRows={4}
                                variant="filled"
                                onChange={this.handleEmailChange}
                                style={{ marginBottom: "20px" }}
                            /> : <TextField
                                error
                                id="filled-multiline-flexible"
                                label="Email"
                                name="email"
                                value={this.state.value}
                                multiline
                                maxRows={4}
                                variant="filled"
                                onChange={this.handleEmailChange}
                                style={{ marginBottom: "20px" }}
                            />}
                            <FormControl sx={{ m: 0, marginBottom: "10px", width: '61ch' }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                {this.state.isTruePass ? <FilledInput
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={this.state.value}
                                    onChange={this.handlePassChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                /> : <FilledInput
                                    error
                                    id="filled-error-helper-text"
                                    label="Error"
                                    variant="filled"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={this.state.value}
                                    onChange={this.handlePassChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />}

                            </FormControl>

                            <FormControlLabel sx={{ marginBottom: "20px" }} checked={this.state.isChecked} onChange={this.handleChecked} control={<Checkbox />} label="Remember me" />
                            {this.state.errorMessage ? <div>Ooppss xeta bas verdi!!</div> : null}
                            <button className={styles["login-btn"]} onClick={this.handleSubmitData} type="submit">Login</button>
                        </form>

                        <div className={styles["register-container"]}>
                            <span className={styles["have-account"]}>Don't Have an account?</span>
                            <a href="#" className={styles["register-btn"]} >Register</a>
                        </div>
                    </div>

                </div>


            </>
        )
    }
}
