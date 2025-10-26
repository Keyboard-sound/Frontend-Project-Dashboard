import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import DesktopSidebar from "@components/DesktopSidebar";
import MobileHeader from "@components/MobileHeader";
import MobileNav from "@components/MobileNav";

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row bg-white lg:bg-blue-50 h-screen">
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
      <DesktopSidebar />
      <main className="flex-1 lg:pr-4 lg:py-3">
        <Outlet />
      </main>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="relative z-40 lg:hidden"
      >
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <div className="fixed inset-0 flex pt-10">
            <DialogPanel
              transition
              className="bg-white pt-4 px-2 w-56 shadow-xl transition-transform duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <MobileNav onNavigate={() => setMobileMenuOpen(false)} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
