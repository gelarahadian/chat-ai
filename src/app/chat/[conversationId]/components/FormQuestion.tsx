import { Button } from '@/src/components/ui/button';
import { useSidebar } from '@/src/components/ui/sidebar';
import { Textarea } from '@/src/components/ui/textarea';
import { useCreateChat } from '@/src/hooks/use-chat';
import { FC } from 'react'

interface FormQuestionProps {
    conversationId: string
    createChatMutation: ReturnType<typeof useCreateChat>
}

const FormQuestion: FC<FormQuestionProps> = ({conversationId, createChatMutation}) => {
  const {open} = useSidebar();
    const handleChat = (e: any) => {
        e.preventDefault()
        createChatMutation.mutate({conversationId, input: "Test Integration API Chat GPT"})
    }

    console.log(open)
  return (
    <div className={`fixed bottom-0 right-0 ${open ? "left-64" : "left-12" } transition-all duration-200 ease-linear pb-8 bg-white`}>
      <form id="form-question" onSubmit={handleChat}>
      <Textarea
        placeholder="Type your question here..."
        className="rounded-4xl max-w-2xl mx-auto"
      />
      <Button size={'lg'} disabled={createChatMutation.status === 'pending'} type='submit'>{createChatMutation.status === 'pending' ? "Loading..." : "Chat"}</Button>
      </form>
    </div>
  );
}

export default FormQuestion