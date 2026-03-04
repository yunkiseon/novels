import { useNavigate } from 'react-router-dom';
import { deleteOne } from '../../apis/novelApis';
import type { Novel } from '../../types/book';
import { getBookEmoji, renderStars } from '../../utils/novelUtil';

const NovelDetail = ({ novel }: { novel: Novel }) => {
  const navigate = useNavigate();

  const deleteRow = async (id: number) => {
    try {
      const result = await deleteOne(id);
      console.log('삭제 후 ', result);
      // 삭제 후 페이지 이동
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Delete this book?');
    if (!confirmed) return;
    deleteRow(id);
  };

  return (
    <>
      <section className="mt-6 flex border-t border-neutral-200 p-5">
        <div className="first:grow">
          <h2 className="mb-2.5 text-2xl">{novel.title}</h2>
          <p className="my-1.25">
            <strong>Author : {novel.author}</strong>
          </p>
          <p className="my-1.25">
            <strong>Genre : {novel.genreName}</strong>
          </p>
          <p className="my-1.25">
            <strong>Published Date : {novel.publishedDate}</strong>
          </p>
          <p className="my-1.25">
            <strong>Rating : {renderStars(novel.rating)}</strong>
            <span className="ml-1 text-[1.1em] tracking-widest text-sky-500"></span>
          </p>
          <p className="my-1.25">
            <strong>
              Available : {novel.available ? 'Available' : 'Not Available'}
            </strong>
          </p>
        </div>
        <div className="text-[8.6em]">{getBookEmoji(novel.id)}</div>
      </section>
      <section className="text-center">
        <button
          //  http://localhost:5173/novels/119
          onClick={() => navigate(`../edit/${novel.id}`)}
          className="mx-1 my-6 rounded-[5px] bg-sky-600 px-4 py-3 text-[1.2em] text-white hover:bg-sky-900"
        >
          Edit Book
        </button>
        <button
          onClick={() => handleDelete(novel.id)}
          className="mx-1 my-6 rounded-[5px] bg-red-600 px-4 py-3 text-[1.2em] text-white hover:bg-red-900"
        >
          Delete Book
        </button>
      </section>
    </>
  );
};

export default NovelDetail;
