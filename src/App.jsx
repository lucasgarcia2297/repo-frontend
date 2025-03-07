import Home from "./pages/Home";
import SideBar from "./components/SideBar";

export default function App() {
  return (
    <main className="bg-black w-screen h-screen">
      <SideBar/>
      <Home/>
    </main>
  )
}