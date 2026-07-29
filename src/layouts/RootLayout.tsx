import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import DesktopSidebar from "@components/DesktopSidebar";
import MobileHeader from "@components/MobileHeader";
import MobileNav from "@components/MobileNav";

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDelayNavigate = () => {
    if (timeRef.current) return;

    timeRef.current = setTimeout(() => {
      setMobileMenuOpen(false);
      timeRef.current = null;
    }, 300);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white lg:bg-blue-50 h-screen">
      <div className="sticky top-0 z-50 lg:hidden">
        <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
      </div>
      <DesktopSidebar />
      <main className="flex-1 lg:pr-4 lg:py-3">
        <Outlet />
      </main>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 transition-opacity duration-300 data-closed:opacity-0"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="bg-white pt-12 px-2 w-56 h-full shadow-xl transition-transform duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <MobileNav onNavigate={handleDelayNavigate} />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
