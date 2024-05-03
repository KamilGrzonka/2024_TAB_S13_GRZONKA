import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";


export default function Budynki() {
  return (
    <>
      <div className="w-10 h-10 bg-green-600"></div>
      <Button variant="link" asChild>
        <Link to="/">Home</Link>
      </Button>
    </>
  );
}
