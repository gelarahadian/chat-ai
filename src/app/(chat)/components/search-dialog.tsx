import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/src/components/ui/item';
import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react'

const SearchDialog = ({children}: {children: ReactNode}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-96 h-full flex flex-col">
        <DialogHeader className="border-b p-3 shrink-0">
          <Input className="border-none focus-visible:ring-0" />
        </DialogHeader>
        <div className="flex-1">
          <Item>
              <ItemContent>
                <ItemTitle>Dashboard</ItemTitle>
                <ItemDescription>
                  Overview of your account and activity.
                </ItemDescription>
              </ItemContent>
          </Item>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog