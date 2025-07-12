import Navbar from "../components/Navbar";
import CheckInForm from "../components/CheckInForm";

export default function CheckIn() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <div className="flex justify-center p-4">
        <CheckInForm />
      </div>
    </div>
  );
}
