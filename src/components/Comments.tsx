import React, { useContext, useState } from "react";
import { PostProps } from "./PostList";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

const COMMENTS = [
    {id:1, email:"test@test.com", content: "댓글1이지롱!", createdAt:"2024-02-12"},
    {id:2, email:"test@test.com", content: "댓글2이지롱!", createdAt:"2024-02-13"},
    {id:3, email:"test@test.com", content: "댓글3이지롱!", createdAt:"2024-02-14"},
    {id:4, email:"test@test.com", content: "댓글4이지롱!", createdAt:"2024-02-15"},
    {id:5, email:"test@test.com", content: "댓글5이지롱!", createdAt:"2024-02-16"},
]

interface CommentsProps {
    post: PostProps;
}

export default function Comments( { post }: CommentsProps ) {
    //console.log(post); //PostDetail에서 넘어온 post Props
    const [comments, setComment] = useState("");
    const { user } = useContext(AuthContext);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: {name, value},
        } = e;

        if(name === "comments") {
            setComment(value);
        }
    };

    const onSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if(post && post?.id) {
                const postRef = doc(db, "posts", post.id);
                
                if(user?.uid) {
                    const commentObj = {
                        content: comments,
                        uid: user.uid,
                        email: user.email,
                        createdAt: new Date()?.toLocaleDateString("ko", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit", 
                        }),
                    };

                    await updateDoc(postRef, {
                        comments: arrayUnion(commentObj),
                        updatedAt: new Date()?.toLocaleDateString("ko", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit", 
                        }),
                    })
                }
            }

            toast.success("댓글을 생성하였습니다.");
            setComment("");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.code);
        }
    }


    return (
        <div className="comments">
            <form className="comments__form" onSubmit={onSubmit}>
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