import Link from "next/link";
import { Button } from "./ui/button";

export default function BackToList() {
  return (
    <div>
      <Link href={"/list-pokemon"}>
        <Button className="bg-blue-700 hover:bg-blue-800">Back to List</Button>
      </Link>
    </div>
  );
}
