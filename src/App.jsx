import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import RegisterDevice from "./pages/RegisterDevice";

export default function App() {
  return (
    <div className="w-full h-full flex">
      <SideBar/>
      <main className="w-full">
      <Header />
      <RegisterDevice/>
      </main>
    </div>
  )
}