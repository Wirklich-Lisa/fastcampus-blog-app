import { Link } from "react-router-dom"

export default function LoginForm() {
    return (
    <form action="/post" method="post" className="form form--lg">
        <h1 className="form__title">회원가입</h1>
        <div className="form__block">
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" required />
        </div>
        <div className="form__block">
            <label htmlFor="password">password</label>
            <input type="text" name="password" id="password" required />
        </div>
        <div className="form__block">
            <label htmlFor="password_confirm">password-confirm</label>
            <input type="text" name="password" id="password" required />
        </div>
        <div className="form__block">
            계정이 있으신가요?
            <Link to="/login" className="form__link">로그인하기</Link>
        </div>
        <div className="form__block">
            <input type="submit" value="signup" className="form__btn--submit" />
        </div>
    </form>
    )
}
