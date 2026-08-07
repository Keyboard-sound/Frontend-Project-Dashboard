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
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <div className="sticky top-0 z-50 lg:hidden">
        <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
      </div>
      <DesktopSidebar />
      <main className="w-full">
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
        <div className="fixed inset-0 top-8  flex">
          <DialogPanel
            transition
            className="px-2 py-3 w-56 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <MobileNav onNavigate={handleDelayNavigate} />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
