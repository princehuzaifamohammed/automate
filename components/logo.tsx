import { HOME_PAGE } from "@/constants/links";
import Link from "next/link";
import { RiNodeTree } from "react-icons/ri";

export const Logo = () => {
   return (
      <Link href={HOME_PAGE} className="flex items-center gap-2">
         <div className="bg-primary size-8 rounded-sm flex justify-center text-white items-center">
            <RiNodeTree />
         </div>
         <span className="text-lg font-semibold">Automate</span>
      </Link>
   );
};
