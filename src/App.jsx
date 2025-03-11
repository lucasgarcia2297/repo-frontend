import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="w-full h-full flex">
      <SideBar/>
      <main className="w-full">
      <Header />
      <Register/>
      </main>
    </div>
  )
}