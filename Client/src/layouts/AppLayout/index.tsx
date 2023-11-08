import NavBar from "../../components/NavBar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="App">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="outlet">{children}</div>
    </div>
  );
}

export default AppLayout;
