import React, { useState } from "react";

const COMMENTS = [
    {id:1, email:"test@test.com", content: "댓글1이지롱!", createdAt:"2024-02-12"},
    {id:2, email:"test@test.com", content: "댓글2이지롱!", createdAt:"2024-02-13"},
    {id:3, email:"test@test.com", content: "댓글3이지롱!", createdAt:"2024-02-14"},
    {id:4, email:"test@test.com", content: "댓글4이지롱!", createdAt:"2024-02-15"},
    {id:5, email:"test@test.com", content: "댓글5이지롱!", createdAt:"2024-02-16"},
]

export default function Comments() {
    const [comments, setComment] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: {name, value},
        } = e;

        if(name === "comments") {
            setComment(value);
        }
    };



    return (
        <div className="comments">
            <form className="comments__form">
                <div className="form__block">
                    <label htmlFor="comments">댓글 입력</label>
                    <textarea name="comments" id="comments" required value={comments} onChange={onChange}/>
                </div>
                <div className="form__block form__block-reverse">
                    <input type="submit" value="입력" className="form__btn-submit"/>
                </div>
            </form>
            <div className="comments__list">
                {COMMENTS.map((comments) => (
                    <div key={comments.id} className="comments__box">
                        <div className="comments__profile-box">
                            <div className="comments__email">{comments?.email}</div>
                            <div className="comments__date">{comments?.createdAt}</div>
                            <div className="comments__delete">삭제</div>
                        </div>
                        <div className="comments__text">{comments?.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}