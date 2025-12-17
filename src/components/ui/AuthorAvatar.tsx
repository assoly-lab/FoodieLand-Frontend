import { Avatar, AvatarFallback, AvatarImage } from "./avatar";



export default function AuthorAvatar({avatarUrl, authorName}:{avatarUrl?: string, authorName?: string}) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={avatarUrl ?? "/avatar.png"} alt={"Author picture"} />
      <AvatarFallback>{authorName?.charAt(0) ?? "JS"}</AvatarFallback>
    </Avatar>
  )
}