import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {app} from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);

            toast.success("로그인 성겅!");
            navigate("/");
        } catch (error: any) {
            toast.error("error?.code");
            console.log(error);
        }

    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value},
        } = e ;

        if(name === 'email') {
            setEmail(value);

            const validRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

            if(!value?.match(validRegex)) {
                setError("이메일 형식이 올바르지 않습니다");
            }else {
                setError("");
            }

        }else if(name === 'password') {
            setPassword(value);

            if(value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해 주세요");
            }else {
                setError("");
            }
        }

    };
    
    return (
    <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form__title">로그인</h1>
        <div className="form__block">
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" onChange={onChange} value={email} required />
        </div>
        <div className="form__block">
            <label htmlFor="password">password</label>
            <input type="text" name="password" id="password" onChange={onChange} value={password} required />
        </div>
        {error && error?.length > 0 && (
            <div className="form__block">
                <div className="form__error">{error}</div>
            </div>
        )}
        <div className="form__block">
            계정이 없으신가요?
            <Link to="/signup" className="form__link">회원가입하기</Link>
        </div>
        <div className="form__block">
            <input type="submit" value="login" className="form__btn--submit" disabled={error?.length > 0}/>
        </div>
    </form>
    )
}
