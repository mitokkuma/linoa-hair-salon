(() => {
  "use strict";

  /* ---------- SPメニュー（ハンバーガー） ---------- */
  const menuButton = document.querySelector(".menu-button");
  const drawer = document.getElementById("drawer");

  const setDrawer = (open) => {
    drawer.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  };

  menuButton.addEventListener("click", () => {
    setDrawer(!drawer.classList.contains("is-open"));
  });
  drawer.addEventListener("click", (e) => {
    if (e.target.closest("a")) setDrawer(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      setDrawer(false);
      menuButton.focus();
    }
  });
  matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
    if (e.matches) setDrawer(false);
  });

  if (!("IntersectionObserver" in window)) return;

  /* ---------- スタイルの長さタブ：表示中の長さをハイライト ---------- */
  const tabs = [...document.querySelectorAll(".tabs a")];
  const rows = tabs
    .map((tab) => document.querySelector(tab.getAttribute("href")))
    .filter(Boolean);

  const activate = (id) => {
    tabs.forEach((tab) => {
      const active = tab.getAttribute("href") === `#${id}`;
      tab.classList.toggle("is-active", active);
      if (active) tab.setAttribute("aria-current", "true");
      else tab.removeAttribute("aria-current");
    });
  };

  const rowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activate(entry.target.id);
      });
    },
    // 画面の上から35〜45%の帯に入った行をアクティブにする
    { rootMargin: "-35% 0px -55% 0px" }
  );
  rows.forEach((row) => rowObserver.observe(row));

  /* ---------- SP予約バー：最終予約案内・フッターが見えている間は隠す ---------- */
  const spReserve = document.querySelector(".sp-reserve");
  const hideTargets = [document.getElementById("booking"), document.querySelector(".footer")];
  const visible = new Set();

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    spReserve.classList.toggle("is-hidden", visible.size > 0);
  });
  hideTargets.forEach((el) => el && barObserver.observe(el));
})();
