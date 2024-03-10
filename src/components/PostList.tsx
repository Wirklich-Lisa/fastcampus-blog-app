import { db } from "firebaseApp";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";

interface PostListProps {
    hasNavigation?: boolean;
    defaultTab?: TabType | CategoryType;
}

export interface PostProps {
    id?: string;
    title: string;
    email: string;
    summary: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    uid: string;
    category?: CategoryType;
}

type TabType = "all" | "my";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = ["Frontend", "Backend", "Web", "Native"];

export default function PostList({ hasNavigation = true, defaultTab = 'all'}: PostListProps) {
    const [activeTab, setActionTab] = useState<TabType | CategoryType>(defaultTab);
    const [posts, setPosts] = useState<any[]>([]);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const getPosts = async () => {
        //const datas = await getDocs(collection(db, "posts"));
        setPosts([]); //초기화 후 
        let postsRef = collection(db, "posts"); //order by
        let postsQeury;

        if(activeTab === 'my' && user) {
            postsQeury = query(postsRef, where('uid', "==", user.uid ), orderBy("createdAt", "asc"));
        }else if(activeTab === 'all') {
            postsQeury = query(postsRef, orderBy("createdAt", "asc"));
        }else {
            //카테고리 글 보여주기
            postsQeury = query(postsRef, where('category', "==", activeTab ), orderBy("createdAt", "asc"));
        }

        const datas = await getDocs(postsQeury);
        datas?.forEach((doc) => { //데이터 추가
            const dataObject = { ...doc.data(), id: doc.id };
            setPosts((prev) => [...prev, dataObject as PostProps]);
        });
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("삭제하실라구요?");
        if (confirm && posts && id) {
            await deleteDoc(doc(db, "posts", id));
            toast.success('게시글 삭제되었습니다');
            navigate('/');
            getPosts(); //DELETE후에 한번 더 호출 필요
        }
    };

    useEffect(() => {
        getPosts();
    }, [activeTab])
    
    return (
        <>
        {/* hasNavigation: list page에서는 보이고 profile페이지(나의글)에서는 보이면 안됨 */}
        {hasNavigation && (
            <div className = "post__navigation">
                <div role="presentation" onClick={() => setActionTab("all")}
                    className={activeTab === "all" ? "post__navigation--active" : ""}>전체</div>
                <div role="presentation" onClick={() => setActionTab("my")}
                    className={activeTab === "my" ? "post__navigation--active" : ""}>나의 글</div>
            {CATEGORIES?.map((category) => (
                <div key={category} role="presentation" onClick={() => setActionTab(category)}
                    className={activeTab === category ? "post__navigation--active" : ""}>{category}</div>
            ))}
            </div>
        )}
        <div className="post__list">
            {posts?.length > 0 ? posts?.map((posts, index) => (
                <div key={posts?.id} className="post__box">
                    <Link to={`/posts/${posts?.id}`}>
                        <div className = "post__profile-box">
                            <div className="post__profile" />
                            <div className="post__author-name" >{posts?.email}</div>
                            <div className="post__date" >{posts?.createdAt}</div>
                        </div>
                        <div className = "post__title">{posts?.title}</div>
                        <div className = "post__text">{posts?.summary}</div>
                    </Link>
                        {posts?.email === user?.email && (
                        <div className = "post__utils-box">
                            <div className = "post__delete" role="presentation" onClick={() => handleDelete(posts.id as string)}>삭제</div>
                            <div className = "post__edit">
                                <Link to={`/posts/edit/${posts?.id}`}>수정</Link>
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

