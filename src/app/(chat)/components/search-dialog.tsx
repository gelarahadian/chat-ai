import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/src/components/ui/item";
import { useSearchConversation } from "@/src/hooks/use-conversation";
import { ChevronRightIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

const SearchDialog = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const { mutate: searchConversation, status, data } = useSearchConversation();

  const handleSearch = (e: any) => {
    searchConversation(e.target.value, {
      onSuccess: (res) => {
        setResults(res.data.results);
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-96 h-full flex flex-col">
        <DialogHeader className="border-b p-3 shrink-0">
          <DialogTitle className="hidden">Search chats</DialogTitle>
          <Input
            className="border-none focus-visible:ring-0 shadow-none"
            placeholder="Search chats..."
            onChange={handleSearch}
          />
        </DialogHeader>
        <div className="flex-1 overflow-y-scroll">
          {results.map((result) => (
            <Item key={result._id} size={"sm"} asChild>
              <a href="#">
                <ItemContent>
                  <ItemTitle>{result.title}</ItemTitle>
                  <ItemDescription>
                    {result.assistantMessage.content}
                  </ItemDescription>
                </ItemContent>
                {/* <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions> */}
              </a>
            </Item>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
