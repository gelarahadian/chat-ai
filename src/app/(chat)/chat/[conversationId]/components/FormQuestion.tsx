import { Button } from '@/src/components/ui/button';
import { Field } from "@/src/components/ui/field";
import { useSidebar } from "@/src/components/ui/sidebar";
import { Textarea } from "@/src/components/ui/textarea";
import { useCreateChat } from "@/src/hooks/use-chat";
import { IoMdSend } from "react-icons/io";
import { FC, useState } from "react";
import { useGetConversationById } from "@/src/hooks/use-conversation";
import { set } from "zod";

interface FormQuestionProps {
  conversationId: string;
  createChatMutation: ReturnType<typeof useCreateChat>;
  getConversationByIdMutation: ReturnType<typeof useGetConversationById>;
}

const FormQuestion: FC<FormQuestionProps> = ({
  conversationId,
  createChatMutation,
  getConversationByIdMutation,
}) => {
  const { open } = useSidebar();

  const [question, setQuestion] = useState<string>("");

  const handleChat = (e: any) => {
    e.preventDefault();
    createChatMutation.mutate(
      {
        conversationId,
        input: question,
      },
      {
        onSuccess: (res) => {
          getConversationByIdMutation.mutate();
        },
      }
    );
  };

  return (
    <div
      className={`fixed bottom-0 right-0 ${
        open ? "left-64" : "left-12"
      } transition-all duration-200 ease-linear pb-8 bg-white`}
    >
      <form id="form-question" onSubmit={handleChat}>
        <div className="flex justify-between items-end max-w-2xl mx-auto space-x-4">
          <Textarea
            onChange={(e: any) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="rounded-4xl "
          />
          <Button
            size={"icon-lg"}
            disabled={createChatMutation.status === "pending"}
            type="submit"
          >
            {createChatMutation.status === "pending" ? (
              "Loading..."
            ) : (
              <IoMdSend />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormQuestion