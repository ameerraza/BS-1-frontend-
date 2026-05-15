import Header from "../../../components/common/Header";
import Sidebar from "../../../components/common/Sidebar";
import { SidebarProvider } from "../../../context/SidebarContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen w-full bg-gray-50">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
            <Header />
            <main className="flex-1">
              <div className="h-full p-3 overflow-y-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
