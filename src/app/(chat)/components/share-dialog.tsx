'use client'

import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { useShareConversation } from '@/src/hooks/use-conversation';
import { Copy, Loader } from 'lucide-react';
import  { ReactNode, useEffect, useState } from 'react'

const ShareDialog = ({children, conversationId}: {children: ReactNode; conversationId: string}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const {mutate: shareConversation, status} = useShareConversation();

  useEffect(() => {
    if(open){
        shareConversation(conversationId, {
            onSuccess: (res) => {
                setShareUrl(res.data.share_url);
            }
        })
    }
  }, [open]);

const handleCopy = () => {
  const input = document.getElementById("share-input") as HTMLInputElement;
  if (!input) return;

  input.focus();
  input.select();

  const success = document.execCommand("copy");

  if (success) {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
};

  return (

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="p-0 flex flex-col">
          <DialogHeader className="border-b p-3 shrink-0">
            <DialogTitle>Share chat</DialogTitle>
          </DialogHeader>
          {status === "pending" ? (
            <Loader className='mx-auto my-8 animate-spin'/>
          ) : (
            <div className="p-4 flex w-full items-center gap-2">
              <Input id="share-input" value={shareUrl} readOnly />

              <Button onClick={handleCopy} variant={'outline'}>
                <Copy /> {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
  );
}

export default ShareDialog