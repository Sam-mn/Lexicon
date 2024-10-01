import { useNavbar } from "../hooks/useNavbar";
import { FiActivity, FiSettings, FiHome } from "react-icons/fi";
import { BsJournalBookmark } from "react-icons/bs";
import { GoPencil } from "react-icons/go";

const  IconComponent: React.FC = () => {
  const { navBarName, isCourse } = useNavbar();

  if(navBarName.toLowerCase() === "hem") return <FiHome size={50} style={{ marginRight: "1rem" }} />
  if(navBarName.toLowerCase() === "kurser") return <BsJournalBookmark size={50} style={{ marginRight: "1rem" }} />
  if(navBarName.toLowerCase() === "inlämning / betyg") return <GoPencil size={50} style={{ marginRight: "1rem" }} />
  if(navBarName.toLowerCase() === "aktiviteter") return <FiActivity size={50} style={{ marginRight: "1rem" }} />
  if(navBarName.toLowerCase() === "inställningar") return <FiSettings size={50} style={{ marginRight: "1rem" }} />
  if(isCourse) return <BsJournalBookmark size={50} style={{ marginRight: "1rem" }} />
  return <FiHome size={50} style={{ marginRight: "1rem" }} />
}

export default IconComponent;
