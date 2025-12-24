import Header from "../../components/Header";
import { use } from "react";
import { useGetShareConversation } from "@/src/hooks/use-share";

const page = ({ params }: { params: Promise<{ shareToken: string }> }) => {
  const { shareToken } = use(params);

  const { data, isLoading } = useGetShareConversation(shareToken);

  console.log(data, isLoading);

  return (
    <>
      <Header />
    </>
  );
};

export default page;
