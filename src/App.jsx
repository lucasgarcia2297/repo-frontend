import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

export default function App() {
  return (
    <main className="bg-cyan-800 w-full h-full flex">
      <SideBar/>
      <Header/>
      <Home/>
    </main>
  )
}