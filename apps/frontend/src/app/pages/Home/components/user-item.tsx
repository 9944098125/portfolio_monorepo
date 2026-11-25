import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "app/components/ui/button";
import { selectUser } from "app/slice/selectors";
import { EyeIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { IUser } from "types/modules";

type Props = {
  user: IUser;
};
export const UserItem = (props: Props) => {
  const { user } = props;
  const storedUser = useSelector(selectUser);

  return (
    <React.Fragment>
      <div className="relative border rounded-2xl p-4 flex flex-col sm:flex-row items-center bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={user.image ? user.image : "/images/user.png"}
            alt={user.full_name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="sm:ml-4 mt-4 sm:mt-0 text-center sm:text-left font-poppins">
          <h2 className="text-2xl font-bold text-gray-800">{user.full_name}</h2>
          <p className="text-lg text-gray-600 mt-1">{user.designation}</p>
          <p className="text-lg text-gray-600 mt-1">{user.email}</p>
          <a
          style={{ textDecoration: "none", color: "inherit" }}
          target="_blank"
          rel="noopener noreferrer"
          href={`/${user._id}/portfolio`}
        >
          <Button
            variant="primary"
            className="text-white rounded-default p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
          >
            <EyeIcon className="h-5 w-5" />
            <span>View Portfolio</span>
          </Button>
        </a>
        </div>
      </div>
    </React.Fragment>
  );
};
