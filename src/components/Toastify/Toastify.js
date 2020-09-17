import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.css";

toast.configure({
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
});

const notify = (msg, type) => {
  switch (type) {
    case "success":
      toast.success(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "warning":
      toast.warn(msg);
      break;
    default:
      console.log("error in notify");
  }
};

export default notify;
