import { Button } from "@/src/components/ui/button";
import { useSidebar } from "@/src/components/ui/sidebar";
import { Textarea } from "@/src/components/ui/textarea";
import { useCreateChat } from "@/src/hooks/use-chat";
import { FC, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToken } from "@/src/hooks/use-token";
import { useChat } from "@/src/contexts/chat-context";

interface FormQuestionProps {
  createChatMutation: ReturnType<typeof useCreateChat>;
  conversationId?: string;
  chatIds?: string[];
}

const FormQuestion: FC<FormQuestionProps> = ({
  conversationId,
  createChatMutation,
  chatIds,
}) => {
  const { open } = useSidebar();
  const { token } = useToken();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { sendMessage } = useChat();

  const [question, setQuestion] = useState<string>("");

  const handleChat = (e: any) => {
    e.preventDefault();
    sendMessage({
      input: question,
      conversationId: conversationId ? conversationId : null,
      chatIds: chatIds ? chatIds : [],
    });
  };

  return (
    <div
      className={`fixed bottom-0 right-0 ${
        !token ? "left-0" : open ? "left-64" : "left-12"
      } transition-all duration-200 ease-linear pb-8 bg-white`}
    >
      <div className="max-w-3xl w-full bg-gray-100 rounded-4xl mx-auto">
        <form id="form-question" onSubmit={handleChat}>
          <div className="flex justify-between items-end mx-auto space-x-4 px-3">
            <Textarea
              value={question}
              onChange={(e: any) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="border-none max-h-96 focus-visible:ring-0 "
            />
            <Button
              size={"icon-lg"}
              disabled={
                createChatMutation.status === "pending" || question === ""
              }
              type="submit"
              className={`mb-3 rounded-full ${
                createChatMutation.status === "pending" ? "animate-pulse" : ""
              }`}
            >
              {createChatMutation.status === "pending" ? (
                <ArrowDown />
              ) : (
                <ArrowUp />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormQuestion;
