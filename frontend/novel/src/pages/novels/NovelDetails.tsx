import { useParams } from "react-router-dom";
import NovelDetail from "../../components/novels/NovelDetail";
import { useNovel } from "../../hooks/useNovel";
import BasicLayout from "../../layouts/BasicLayout";
import Error from "../../components/common/Error";
import Loading from "../../components/common/Loading";

const NovelDetails = () => {
  // ~~//novels/89 식에서 89를 가져오고 싶다면 useParams
  const { id } = useParams<{ id: string }>();
  const { serverData, loading, error } = useNovel(id!);
  if (loading) return <Loading />;
  if (error || !serverData) return <Error />;
  return (
    <BasicLayout>
      <h1 className="text-[32px]">Book Details</h1>
      {loading ? <Loading /> : <NovelDetail novel={serverData} />}
    </BasicLayout>
  );
};

export default NovelDetails;
