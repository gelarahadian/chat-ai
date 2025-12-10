'use client'

import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { useCreateChat } from '@/src/hooks/use-chat';
import { useQueryClient } from '@tanstack/react-query';
import { Loader, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const NewChatForm = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    const [question, setQuestion] = useState<string>("");

     const {mutate: createChat, status} = useCreateChat();

     const handleChat = (e: any) => {
       e.preventDefault();
       createChat(
         {
           input: question,
         },
         {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["conversations"] });
                router.push(`/chat/${res.data.conversation._id}`);
            }
         }
       );
     };
  return (
    <div className="max-w-3xl w-full bg-gray-100 rounded-4xl">
      <form id="form-question" onSubmit={handleChat}>
        <div className="flex justify-between items-end space-x-4 px-3">
          <Textarea
            onChange={(e: any) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className=" border-none max-h-96 focus-visible:ring-0"
          />
          <Button
            size={"icon-lg"}
            className="mb-3 rounded-full"
            disabled={status === "pending"}
            type="submit"
          >
            {status === "pending" ? <Loader /> : <Send />}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewChatForm