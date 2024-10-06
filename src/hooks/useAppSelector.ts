import { RootState } from "@store";
import { useSelector } from "react-redux";

export default useSelector.withTypes<RootState>();
