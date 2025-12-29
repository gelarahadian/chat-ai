import {
  Dialog,
  DialogClose,
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
import { Skeleton } from "@/src/components/ui/skeleton";
import { useSearchConversation } from "@/src/hooks/use-conversation";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const SearchDialog = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { mutate: searchConversation, status } = useSearchConversation();

  const handleSearch = (search: string) => {
    searchConversation(search, {
      onSuccess: (res) => {
        setResults(res.data.results);
      },
    });
  };

  useEffect(() => {
    if (open) {
      handleSearch(search);
    }
  }, [search, open]);

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

  const handleChooseConversation = (conversationId: string) => {
    setOpen(false);
    router.push(`/chat/${conversationId}`);
  };

  const formatDateEnUTC = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });

    return `${day} ${month}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-96 h-full sm:max-w-2xl w-full flex flex-col">
        <DialogHeader className="border-b p-3 shrink-0">
          <DialogTitle className="hidden">Search chats</DialogTitle>
          <Input
            className="border-none focus-visible:ring-0 shadow-none"
            placeholder="Search chats..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogHeader>
        <div className="flex-1 overflow-y-scroll">
          {status === "pending" && (
            <div className="space-y-3">
              <div className="py-3 px-4">
                <Skeleton className="w-1/2 h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="py-3 px-4">
                <Skeleton className="w-1/2 h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="py-3 px-4">
                <Skeleton className="w-1/2 h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="py-3 px-4">
                <Skeleton className="w-1/2 h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          )}
          {status === "success" &&
            results.map((result) => (
              <Item
                key={result._id}
                onClick={() => handleChooseConversation(result._id)}
                className="group cursor-pointer"
                size={"sm"}
                asChild
              >
                <a>
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
                  <ItemActions className=" hidden group-hover:inline-block">
                    <ItemDescription>
                      {formatDateEnUTC(result.created_at)}
                    </ItemDescription>
                  </ItemActions>
                </a>
              </Item>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
