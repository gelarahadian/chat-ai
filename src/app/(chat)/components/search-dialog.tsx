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

  const { mutate: searchConversation, status } = useSearchConversation();

  const handleSearch = (search: string) => {
    searchConversation(search, {
      onSuccess: (res) => {
        setResults(res.data.results);
      },
    });
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const matchSearchContent = (content?: string, query?: string): ReactNode => {
    const trimmedQuery = query?.trim();
    if (!content) return "Tidak ada konten";
    if (!trimmedQuery) return content;

    const regex = new RegExp(`(${escapeRegex(trimmedQuery)})`, "gi");
    return content.split(regex).map((part, idx) => {
      console.log(part, idx);
      const isMatch = part.toLowerCase() === trimmedQuery.toLowerCase();
      return isMatch ? (
        <mark key={idx} className="bg-transparent font-semibold">
          {part}
        </mark>
      ) : (
        <span key={idx}>{part}</span>
      );
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogHeader>
        <div className="flex-1 overflow-y-scroll">
          {results.map((result) => (
            <Item key={result._id} size={"sm"} asChild>
              <a href="#">
                <ItemContent>
                  <ItemTitle>{result.title}</ItemTitle>
                  <ItemDescription>
                    {matchSearchContent(
                      result.assistantMessage.content,
                      search
                    )}
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
