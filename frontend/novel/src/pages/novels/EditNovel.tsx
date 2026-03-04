import { useNavigate, useParams } from "react-router-dom";
import { putNovel } from "../../apis/novelApis";
import Loading from "../../components/common/Loading";
import NovelForm from "../../components/novels/NovelForm";
import useLogin from "../../hooks/useLogin";
import { useNovel } from "../../hooks/useNovel";
import BasicLayout from "../../layouts/BasicLayout";
import type { Novel } from "../../types/book";

const EditNovel = () => {
  const navigate = useNavigate();
  // id 가져오기
  const { id } = useParams<{ id: string }>();

  const { isLogin } = useLogin();

  // 서버로 novel 요청
  const { serverData, loading, error } = useNovel(id!);

  const handleCancel = (id: number) => {
    // 이전 페이지 이동
    navigate(`../${id}`);
  };

  const handleSubmit = async (formData: Novel) => {
    try {
      const result = await putNovel(formData);
      console.log("수정 후 ", result);
      navigate(`../${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 로그인 여부확인?
  if (!isLogin) navigate("/member/login");
  if (error) navigate("/");

  return (
    <BasicLayout>
      <h1 className="text-[32px]">Edit Book</h1>
      {loading ? (
        <Loading />
      ) : (
        <NovelForm novel={serverData} onCancel={handleCancel} onSubmit={handleSubmit} />
      )}
    </BasicLayout>
  );
};

export default EditNovel;
