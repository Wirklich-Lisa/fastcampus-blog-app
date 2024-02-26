import { collection, getDocs } from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { useContext } from "react";
import { db } from "firebaseApp";
import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";

interface PostListProps {
    hasNavigation?: boolean;
}

type TabType = "all" | "my";

export interface PostProps {
    id?: string;
    title: string;
    email: string;
    summary: string;
    content: string;
    createdAt: string;
}

export default function PostList({ hasNavigation = true}: PostListProps) {
    const [activeTab, setActionTab] = useState<TabType>("all");
    const [posts, setPosts] = useState<any[]>([]);
    const {user} = useContext(AuthContext);

    const getPosts = async () => {
        const datas = await getDocs(collection(db, "posts"));
        datas?.forEach((doc) => {
            const dataObject = { ...doc.data(), id: doc.id };
            setPosts((prev) => [...prev, dataObject as PostProps]);
        });
    };

    useEffect(() => {
        getPosts();
    }, [])
    
    return (
        <>
        {/* hasNavigation: list page에서는 보이고 profile페이지(나의글)에서는 보이면 안됨 */}
        {hasNavigation && (
            <div className = "post__navigation">
                <div role="presentation" onClick={() => setActionTab("all")}
                    className={activeTab === "all" ? "post__navigation--active" : ""}>전체</div>
                <div role="presentation" onClick={() => setActionTab("my")}
                    className={activeTab === "my" ? "post__navigation--active" : ""}>나의 글</div>
            </div>
        )}
        <div className="post__list">
            {posts?.length > 0 ? posts?.map((posts, index) => (
                <div key={posts?.id} className="post__box">
                    <Link to={`/posts/${posts?.id}`}>
                        <div className = "post__profile-box">
                            <div className="post__profile" />
                            <div className="post__author-name" >{posts?.email}번째 작가</div>
                            <div className="post__date" >{posts?.createdAt}</div>
                        </div>
                        <div className = "post__title">{posts?.title}</div>
                        <div className = "post__text">{posts?.summary}</div>
                    </Link>
                        {posts?.email === user?.email && (
                        <div className = "post__utils-box">
                            <div className = "post__delete">삭제</div>
                            <div className = "post__edit">
                                <Link to={`/post/edit/${posts?.id}`}>수정</Link>
                            </div>
                        </div>
                        )}
                </div>
            ))
        : (
            <div className="post__no-post">게시글이 없습니다.</div>
        )}
        </div>
        </>
    )
}

