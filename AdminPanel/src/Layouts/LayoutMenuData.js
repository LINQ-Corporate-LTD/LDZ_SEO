import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  const [toggleState, setToggleState] = useState({});
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
  }, [iscurrentState]);

  const navbarDataRaw = JSON.parse(localStorage.getItem("navbarData") || "[]");
  const detailedPermissions = JSON.parse(
    localStorage.getItem("detailed_permissions") || "{}",
  );
  console.log("LayoutdetailedPermissions: ", detailedPermissions);

  // const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");

  // const navData = navbarDataRaw.map(module => ({
  //   ...module,
  //   subItems: module.subItems ? module.subItems.filter(sub => {
  //     const subPerms = detailedPermissions[sub.id] || [];
  //     return subPerms.includes("view");
  //   }) : []
  // })).filter(module => module.subItems.length > 0 || module.id === 'dashboard');
  console.log(
    "Raw navbar modules:",
    navbarDataRaw.map((m) => ({
      id: m.id,
      name: m.name,
      subItems: m.subItems?.length,
    })),
  );

  const navData = navbarDataRaw
    .map((module) => ({
      ...module,
      subItems: module.subItems
        ? module.subItems.filter((sub) => {
            const subPerms = detailedPermissions[sub.id] || [];
            return subPerms.includes("view");
          })
        : [],
    }))
    .filter((module) => {
      const hasVisibleSubItems = module.subItems && module.subItems.length > 0;
      const permKey = module.id;
      const modulePerms = detailedPermissions[permKey] || [];
      return hasVisibleSubItems || modulePerms.includes("view");
    });

  const menuItems = [
    { label: "Menu", isHeader: true },
    ...navData.map((item) => ({
      ...item,
      stateVariables: toggleState[item.id] || false,
      click: function (e) {
        e.preventDefault();
        // Standalone module — navigate directly
        if (!item.subItems || item.subItems.length === 0) {
          if (item.link) {
            history(item.link);
          }
          return;
        }
        // Module with subItems — toggle open/close
        setToggleState((prev) => ({
          ...prev,
          [item.id]: !prev[item.id],
        }));
        setIscurrentState(item.id);
        updateIconSidebar(e);
      },
    })),
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
