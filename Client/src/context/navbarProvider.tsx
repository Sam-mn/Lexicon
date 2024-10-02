import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { INavbarContext } from "../utils";
import { IconType } from "react-icons";
import { BsJournalBookmark } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { FiActivity, FiSettings, FiHome } from "react-icons/fi";

export const NavbarContext = createContext<INavbarContext>(
  {} as INavbarContext
);

interface INavBarProviderProps {
  children: ReactNode;
}

export function NavbarProvider({
  children,
}: INavBarProviderProps): ReactElement {
  const [navBarName, setNavBarName] = useState<string>("Hem");
  const [isCourse, setIsCourse] = useState<boolean>(false);
  const [teacherName, setTeacherName] = useState<string>("");
  const [courseCode, setCourseCode] = useState<string>("");
  const [credits, setCredits] = useState<number>(0);
  const [NavbarIcon, setNavbarIcon] = useState<IconType>(BsJournalBookmark);
  // let NavbarIcon = BsJournalBookmark;
  const values: INavbarContext = {
    navBarName,
    teacherName,
    isCourse,
    courseCode,
    credits,
    NavbarIcon,
    setNavBarName,
    setIsCourse,
    setTeacherName,
    setCourseCode,
    setCredits,
  };

  useEffect(() => {
    if (navBarName === "Hem") {
      setNavbarIcon(FiHome);
    }
  }, [navBarName]);
  return (
    <NavbarContext.Provider value={values}>{children}</NavbarContext.Provider>
  );
}
