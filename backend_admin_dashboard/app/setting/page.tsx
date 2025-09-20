"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect } from "react";

export default function Setting() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if there's no active session and redirect to login page
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Loading</div>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <div className="settingpage">
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>
                Settings <span>Panel</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoSettingsOutline /> <span>/</span>
              <span>Settings</span>
            </div>
          </div>
          <div className="settingscontent">
            <h2>Settings Page</h2>
            <p>Settings functionality will be implemented here.</p>
          </div>
        </div>
      </>
    );
  }
}
