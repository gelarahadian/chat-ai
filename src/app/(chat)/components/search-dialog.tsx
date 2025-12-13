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

  type HighlightOptions = {
    useEllipsis?: boolean;
    beforeContextLength?: number;
    afterContextLength?: number;
  };

  const highlightText = (
    content?: string,
    query?: string,
    options: HighlightOptions = {}
  ): React.ReactNode => {
    const {
      useEllipsis = false,
      beforeContextLength = 20,
      afterContextLength = 20,
    } = options;

    const trimmedQuery = query?.trim();
    if (!content) return "Tidak ada konten";
    if (!trimmedQuery) return content;

    const safeQuery = escapeRegex(trimmedQuery);
    const regex = new RegExp(`(${safeQuery})`, "i");

    // 🔹 MODE TITLE (tanpa ellipsis)
    if (!useEllipsis) {
      return content.split(regex).map((part, idx) => {
        const isMatch = part.toLowerCase() === trimmedQuery.toLowerCase();

        return isMatch ? (
          <span key={idx} className="bg-transparent font-semibold">
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        );
      });
    }

    // 🔹 MODE DESCRIPTION (pakai ellipsis)
    const match = content.match(regex);
    if (!match) return content;

    const index = match.index!;
    const matchText = match[0];

    const before = content.slice(
      Math.max(0, index - beforeContextLength),
      index
    );

    const after = content.slice(
      index + matchText.length,
      index + matchText.length + afterContextLength
    );

    const showBeforeDots = index > beforeContextLength;
    const showAfterDots =
      index + matchText.length + afterContextLength < content.length;

    return (
      <>
        {showBeforeDots && "..."}
        {before}
        <span className="text-gray-700 font-semibold">{matchText}</span>
        {after}
        {showAfterDots && "..."}
      </>
    );
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
                  <ItemTitle className="font-normal gap-0 inline-block">
                    {highlightText(result.title, search)}
                  </ItemTitle>
                  <ItemDescription className="line-clamp-1">
                    {highlightText(result.assistantMessage?.content, search, {
                      useEllipsis: true,
                      beforeContextLength: 10,
                      afterContextLength: 90,
                    })}
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
