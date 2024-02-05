export default function PostDetail() {
    /* Post를 갖고오는 작업, Post 분류하는 작업 등 */
    return (
    <>
    <div className="post__detail">
        <div className="post__box">
            <div className="post__title">
                게시글 1
            </div>
            <div className = "post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name" ></div>
                <div className="post__date" ></div>
            </div>
            <div className = "post__utils-box">
                <div className = "post__delete">삭제</div>
                <div className = "post__edit">수정</div>
            </div>
            <div className = "post__text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</div>
        </div>
    </div>
    </>
    )
}