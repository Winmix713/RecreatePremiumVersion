import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const avatarBase =
  "https://ui8-core-2.vercel.app/_next/image?url=%2Fimages%2Favatars%2F";
const productBase =
  "https://ui8-core-2.vercel.app/_next/image?url=%2Fimages%2Fproducts%2F";

const products = [
  {
    name: "Crypter - NFT UI Kit",
    price: "$3,250.00",
    status: "Active",
    img: `${productBase}1.png&w=128&q=75`,
  },
  {
    name: "Bento Pro 2.0 Illustrations",
    price: "$7,890.00",
    status: "Active",
    img: `${productBase}2.png&w=128&q=75`,
  },
  {
    name: "Fleet - travel shopping kit",
    price: "$1,500.00",
    status: "Offline",
    img: `${productBase}3.png&w=128&q=75`,
  },
  {
    name: "SimpleSocial UI Design Kit",
    price: "$9,999.00",
    status: "Active",
    img: `${productBase}4.png&w=128&q=75`,
  },
  {
    name: "Fleet - travel shopping kit",
    price: "$4,750.00",
    status: "Active",
    img: `${productBase}5.png&w=128&q=75`,
  },
];

const comments = [
  {
    name: "Joyce",
    product: "Bento Pro 2.0",
    time: "09:00 AM",
    text: "Great work! When HTML version will be available? ⚡",
    avatar: 4,
  },
  {
    name: "Gladyce",
    product: "Food Delivery App",
    time: "10:24 AM",
    text: "Amazing. This says compatible with After Effects. Will After Effects files be added?",
    avatar: 1,
  },
  {
    name: "Elbert",
    product: "AstroClash",
    time: "11:33 AM",
    text: "Hello, can we get the 3d source code of the characters?",
    avatar: 2,
  },
];

const newCustomers = [
  { name: "Gladyce", avatar: 1 },
  { name: "Elbert", avatar: 2 },
  { name: "Joyce", avatar: 3 },
  { name: "John", avatar: 4 },
  { name: "Elbert", avatar: 6 },
  { name: "Joyce", avatar: 7 },
  { name: "Anna", avatar: 8 },
];

const carouselItems = [
  {
    title: "Early access",
    read: "3 mins read",
    tag: "new",
    tagClass: "label-green",
    iconColor: "violet",
    iconName: "solar:calendar-linear",
    avatar: 5,
  },
  {
    title: "Access use guidelines",
    read: "9 mins read",
    tag: "hot",
    tagClass: "label-red",
    iconColor: "yellow",
    iconName: "solar:gallery-linear",
    avatar: 6,
  },
  {
    title: "Exclusive downloads",
    read: "16 mins read",
    tag: "new",
    tagClass: "label-green",
    iconColor: "mint",
    iconName: "solar:download-minimalistic-linear",
    avatar: 7,
  },
  {
    title: "Life & work updates",
    read: "35 mins read",
    tag: "hot",
    tagClass: "label-red",
    iconColor: "blue",
    iconName: "solar:check-square-linear",
    avatar: 8,
  },
  {
    title: "Product launch notes",
    read: "6 mins read",
    tag: "new",
    tagClass: "label-green",
    iconColor: "violet",
    iconName: "solar:rocket-2-linear",
    avatar: 1,
  },
  {
    title: "Access use guidelines",
    read: "9 mins read",
    tag: "hot",
    tagClass: "label-red",
    iconColor: "yellow",
    iconName: "solar:gallery-linear",
    avatar: 6,
  },
  {
    title: "Exclusive downloads",
    read: "16 mins read",
    tag: "new",
    tagClass: "label-green",
    iconColor: "mint",
    iconName: "solar:download-minimalistic-linear",
    avatar: 7,
  },
];

const iconBg: Record<string, { bg: string; color: string }> = {
  violet: {
    bg: "linear-gradient(#DEB2FF,#D49EFC)",
    color: "#3a1f52",
  },
  yellow: { bg: "linear-gradient(#FFE4B1,#FFCF75)", color: "#4a3410" },
  mint: {
    bg: "linear-gradient(rgba(208,242,223,.7),#B5E4CA)",
    color: "#123a29",
  },
  blue: { bg: "linear-gradient(#D2F4FF,#A1E0F5)", color: "#123a45" },
};

const bars = [
  { day: "14", height: "47.7%", val: "1.1m", type: "grey" },
  { day: "15", height: "60.5%", val: "1.4m", type: "grey" },
  { day: "16", height: "33.7%", val: "0.8m", type: "min" },
  { day: "17", height: "91.9%", val: "2.2m", type: "active" },
  { day: "18", height: "76.9%", val: "1.8m", type: "grey" },
  { day: "19", height: "27.3%", val: "0.7m", type: "min" },
  { day: "20", height: "83.5%", val: "2.0m", type: "grey" },
];

interface NavSubItem {
  label: string;
  badge?: string;
  badgeColor?: "peach" | "green";
}
interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
  subItems?: NavSubItem[];
  open?: boolean;
}

const navBase: NavItem[] = [
  { label: "Dashboard", icon: "solar:widget-4-linear", active: true },
  {
    label: "Products",
    icon: "solar:bag-linear",
    open: true,
    subItems: [
      { label: "Overview" },
      { label: "Drafts", badge: "2", badgeColor: "peach" },
      { label: "Released" },
      { label: "Comments" },
      { label: "Scheduled", badge: "8", badgeColor: "green" },
    ],
  },
  {
    label: "Customers",
    icon: "solar:users-group-rounded-linear",
    subItems: [{ label: "Overview" }, { label: "Customer list" }],
  },
  { label: "Shop", icon: "solar:cart-large-2-linear" },
  {
    label: "Income",
    icon: "solar:letter-linear",
    subItems: [
      { label: "Earning" },
      { label: "Refunds", badge: "3", badgeColor: "peach" },
      { label: "Payouts" },
      { label: "Statements" },
    ],
  },
  { label: "Promote", icon: "solar:medal-ribbons-star-linear" },
];

const selectOptions = ["Last 7 days", "Last 28 days", "Last 3 months"];

function Select({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative min-w-40" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center w-full h-12 pl-5 pr-3 rounded-3xl border text-sm transition-colors duration-200 hover:border-[var(--s-highlight)] ${open ? "select-btn-open" : ""}`}
        style={{ borderColor: "var(--s-stroke2)", color: "var(--t-primary)" }}
      >
        <span className="truncate pl-1">{value}</span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          width={20}
          className={`ml-2 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--t-secondary)" }}
        />
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%-1px)] right-0 z-30 w-full p-2 rounded-b-2xl border border-t-0 shadow-dropdown"
          style={{
            background: "var(--b-surface2)",
            borderColor: "var(--s-subtle)",
          }}
        >
          {selectOptions.map((opt) => (
            <button
              key={opt}
              className="w-full h-10 px-3 rounded-xl text-left text-sm transition-colors duration-150"
              style={{ color: "var(--t-primary)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--b-pop)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "transparent")
              }
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nav, setNav] = useState<NavItem[]>(navBase);
  const [activeStat, setActiveStat] = useState<"customers" | "balance">(
    "customers"
  );
  const [range1, setRange1] = useState("Last 7 days");
  const [range2, setRange2] = useState("Last 7 days");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<string | null>("17");
  const [activeBar, setActiveBar] = useState<string>("17");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const avatarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node))
        setAvatarOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchFocused(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function toggleNav(label: string) {
    setNav((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, open: !item.open } : item
      )
    );
  }

  function updateCarousel() {
    const el = carouselRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  function carouselScroll(dir: number) {
    carouselRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  }

  function getBarBg(bar: (typeof bars)[0]) {
    const isHovered = hoveredBar === bar.day;
    const isActive = activeBar === bar.day;
    if (isActive)
      return isHovered
        ? "rgba(0,166,86,0.9)"
        : "linear-gradient(to top,#007a41,#00a656)";
    if (isHovered) return "rgba(123,123,123,0.65)";
    if (bar.type === "min") return "var(--chart-min)";
    return "rgba(123,123,123,0.4)";
  }

  return (
    <>
      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col w-[19rem] p-5 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}`}
        style={{ background: "var(--b-surface1)" }}
      >

        <a
          href="#"
          className="flex items-center gap-2.5 h-12 mb-5 px-1"
          style={{ marginBottom: "1.25rem" }}
        >
          <span
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-base font-semibold tracking-tighter shrink-0"
            style={{
              background: "var(--shade-09)",
              color: "var(--shade-02)",
            }}
          >
            C
          </span>
          <span className="text-sm font-semibold tracking-tight">Core 2.0</span>
        </a>

        <button
          className="xl:hidden absolute top-5 right-5 w-12 h-12 rounded-full btn-surface flex items-center justify-center"
          style={{ color: "var(--t-secondary)" }}
          onClick={() => setSidebarOpen(false)}
        >
          <Icon icon="solar:close-circle-linear" width={22} />
        </button>

        <nav
          className="flex flex-col gap-1 grow overflow-auto scrollbar-hide -mx-5 px-5"
          style={{ scrollbarWidth: "thin" }}
        >
          {nav.map((item) => (
            <div key={item.label}>
              {item.active ? (
                <a
                  href="#"
                  className="relative flex items-center gap-3 h-12 px-3 rounded-xl text-sm font-medium"
                  style={{ color: "var(--t-primary)" }}
                >
                  <div className="absolute inset-0 gradient-menu rounded-xl shadow-depth-toggle" />
                  <Icon
                    icon={item.icon}
                    width={22}
                    className="relative z-10"
                  />
                  <span className="relative z-10">{item.label}</span>
                </a>
              ) : item.subItems ? (
                <>
                  <button
                    onClick={() => toggleNav(item.label)}
                    className={`group flex items-center gap-3 h-12 px-3 w-full text-sm font-medium transition-colors duration-200 hover:text-[var(--t-primary)] ${item.open ? "acc-open text-[var(--t-primary)]" : ""}`}
                    style={{
                      color: item.open ? "var(--t-primary)" : "var(--t-secondary)",
                    }}
                  >
                    <Icon icon={item.icon} width={22} />
                    <span>{item.label}</span>
                    <Icon
                      icon="solar:alt-arrow-down-linear"
                      width={20}
                      className="acc-arrow ml-auto"
                    />
                  </button>
                  <div className="acc-panel" data-open={item.open || undefined}>
                    <div>
                      <div className="tree-wrap pl-9 flex flex-col pt-1">
                        {item.subItems.map((sub) => (
                          <div className="tree-item" key={sub.label}>
                            <a
                              href="#"
                              className="flex items-center h-11 px-3 text-sm transition-colors duration-200 hover:text-[var(--t-primary)]"
                              style={{ color: "var(--t-secondary)" }}
                            >
                              {sub.label}
                              {sub.badge && (
                                <span
                                  className="ml-auto flex items-center justify-center w-6 h-6 rounded-lg text-xs font-medium"
                                  style={{
                                    background:
                                      sub.badgeColor === "green"
                                        ? "var(--secondary-04)"
                                        : "var(--secondary-01)",
                                    color: "var(--shade-01)",
                                  }}
                                >
                                  {sub.badge}
                                </span>
                              )}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href="#"
                  className="flex items-center gap-3 h-12 px-3 text-sm font-medium transition-colors duration-200 hover:text-[var(--t-primary)]"
                  style={{ color: "var(--t-secondary)" }}
                >
                  <Icon icon={item.icon} width={22} />
                  <span>{item.label}</span>
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <div
            className="flex flex-col gap-1 w-12 p-1.5 rounded-full btn-surface cursor-pointer transition-shadow duration-300 hover:shadow-depth"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{
                background: theme === "dark" ? "#363636" : "transparent",
                color:
                  theme === "dark" ? "var(--t-primary)" : "var(--t-secondary)",
              }}
            >
              <Icon icon="solar:moon-linear" width={17} />
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{
                background: theme === "light" ? "#363636" : "transparent",
                color:
                  theme === "light"
                    ? "var(--t-primary)"
                    : "var(--t-secondary)",
              }}
            >
              <Icon icon="solar:sun-2-linear" width={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 xl:hidden transition-all duration-300 ${sidebarOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        style={{ background: "rgba(0,0,0,.7)" }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Content wrapper ── */}
      <div className="xl:pl-[19rem]">
        {/* Header */}
        <header
          className="sticky top-0 z-20"
          style={{ background: "var(--b-surface1)" }}
        >
          <div className="flex items-center gap-3 h-[5.5rem] px-5 max-md:px-3 max-md:h-[4.5rem]">
            {/* Mobile brand + menu */}
            <div className="flex xl:hidden items-center gap-3 mr-auto md:mr-3">
              <a
                href="#"
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-base font-semibold tracking-tighter"
                style={{
                  background: "var(--shade-09)",
                  color: "var(--shade-02)",
                }}
              >
                C
              </a>
              <button
                className="w-12 h-12 rounded-full btn-surface flex items-center justify-center"
                style={{ color: "var(--t-secondary)" }}
                onClick={() => setSidebarOpen(true)}
              >
                <Icon icon="solar:hamburger-menu-linear" width={22} />
              </button>
            </div>

            <div className="mr-auto text-h4 max-lg:text-h5 max-md:hidden">
              Dashboard
            </div>

            {/* Search */}
            <div
              ref={searchRef}
              className="relative w-[19rem] max-[1179px]:w-[17rem] max-md:hidden"
            >
              <Icon
                icon="solar:magnifer-linear"
                width={22}
                className="absolute top-3 left-3.5 pointer-events-none"
                style={{ color: "var(--t-secondary)" }}
              />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full h-12 pl-11 pr-3 rounded-3xl text-sm outline-none border border-transparent transition-colors duration-200 focus:border-[var(--s-stroke2)] placeholder:text-[var(--t-secondary)]"
                style={{
                  background: "var(--b-surface2)",
                  color: "var(--t-primary)",
                }}
              />
              {searchFocused && (
                <div
                  className="absolute top-[calc(100%+0.625rem)] left-0 z-30 w-[26rem] p-3 rounded-[2rem] border shadow-dropdown"
                  style={{
                    background: "var(--b-surface2)",
                    borderColor: "var(--s-subtle)",
                  }}
                >
                  <div className="mb-3">
                    <div
                      className="p-3 text-sm"
                      style={{ color: "var(--t-secondary)" }}
                    >
                      Best match
                    </div>
                    {[
                      {
                        img: `${productBase}2.png&w=64&q=75`,
                        name: "Core Dashboard Builder 2.0",
                        price: "$2,453.80",
                        status: "Active",
                        active: true,
                      },
                      {
                        img: `${productBase}4.png&w=64&q=75`,
                        name: "SimpleSocial UI Design Kit",
                        price: "$1,345.24",
                        status: "Offline",
                        active: false,
                      },
                    ].map((p) => (
                      <a
                        key={p.name}
                        href="#"
                        className="group relative flex items-center p-3 rounded-2xl cursor-pointer"
                      >
                        <div className="box-hover" />
                        <img
                          src={p.img}
                          alt=""
                          className="relative z-10 w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div
                          className="relative z-10 grow max-w-[14rem] px-5 text-sub1 line-clamp-2"
                          style={{ color: "var(--t-primary)" }}
                        >
                          {p.name}
                        </div>
                        <div className="relative z-10 flex flex-col items-end shrink-0 ml-auto text-right">
                          <span
                            className="mb-1 text-sub1"
                            style={{ color: "var(--t-primary)" }}
                          >
                            {p.price}
                          </span>
                          <span
                            className={`inline-flex items-center h-6 px-1.5 rounded-lg border text-xs ${p.active ? "label-green" : "label-red"}`}
                          >
                            {p.status}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div>
                    <div
                      className="p-3 text-sm"
                      style={{ color: "var(--t-secondary)" }}
                    >
                      Suggestions
                    </div>
                    {[
                      { name: "Elbert", role: "UI/UX Designer", avatar: 2 },
                      { name: "Joyce", role: "UI/UX Designer", avatar: 1 },
                    ].map((u) => (
                      <div
                        key={u.name}
                        className="group relative flex items-center p-3 rounded-2xl cursor-pointer"
                      >
                        <div className="box-hover" />
                        <img
                          src={`${avatarBase}${u.avatar}.png&w=64&q=75`}
                          alt=""
                          className="relative z-10 w-16 h-16 rounded-full object-cover shrink-0"
                        />
                        <div className="relative z-10 grow px-5">
                          <div
                            className="text-sub1"
                            style={{ color: "var(--t-primary)" }}
                          >
                            {u.name}
                          </div>
                          <div
                            className="mt-1 text-xs"
                            style={{ color: "var(--t-secondary)" }}
                          >
                            {u.role}
                          </div>
                        </div>
                        <div
                          className="relative z-10 shrink-0 flex items-center justify-center w-12 h-12 rounded-full border transition-colors duration-200 group-hover:border-[var(--s-highlight)]"
                          style={{
                            borderColor: "var(--s-stroke2)",
                            color: "var(--t-secondary)",
                          }}
                        >
                          <Icon
                            icon="solar:arrow-right-up-linear"
                            width={20}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#"
              className="btn-edge relative h-12 px-6 rounded-3xl btn-light text-sm font-semibold flex items-center transition-transform duration-300 hover:scale-[1.02] active:scale-95 max-md:hidden"
              style={{ color: "var(--shade-01)" }}
            >
              Create
            </a>

            {[
              { icon: "solar:bell-linear", label: "Notifications" },
              { icon: "solar:chat-round-line-linear", label: "Messages" },
            ].map((b) => (
              <button
                key={b.label}
                aria-label={b.label}
                className="w-12 h-12 rounded-full btn-surface flex items-center justify-center transition-shadow duration-300 hover:shadow-depth"
                style={{ color: "var(--t-secondary)" }}
              >
                <Icon icon={b.icon} width={22} />
              </button>
            ))}

            {/* Avatar */}
            <div className="relative" ref={avatarRef}>
              <button
                className="relative w-12 h-12 rounded-full transition-colors duration-200 hover:ring-2 hover:ring-[var(--primary-01)]"
                onClick={(e) => {
                  e.stopPropagation();
                  setAvatarOpen(!avatarOpen);
                }}
              >
                <span className="absolute inset-[0.1875rem] rounded-full overflow-hidden">
                  <img
                    src={`${avatarBase}3.png&w=96&q=100`}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </span>
              </button>
              {avatarOpen && (
                <div
                  className="absolute top-[calc(100%+0.625rem)] right-0 z-30 w-56 p-2 rounded-2xl border shadow-dropdown"
                  style={{
                    background: "var(--b-surface2)",
                    borderColor: "var(--s-subtle)",
                  }}
                >
                  {[
                    {
                      icon: "solar:bag-4-linear",
                      label: "My shop",
                      color: "var(--t-primary)",
                    },
                    {
                      icon: "solar:pen-2-linear",
                      label: "Edit profile",
                      color: "var(--t-primary)",
                    },
                    {
                      icon: "solar:chart-square-linear",
                      label: "Analytics",
                      color: "var(--t-primary)",
                    },
                    {
                      icon: "solar:link-round-linear",
                      label: "Affiliate center",
                      color: "var(--t-primary)",
                    },
                    {
                      icon: "solar:compass-linear",
                      label: "Explore creators",
                      color: "var(--t-primary)",
                    },
                    {
                      icon: "solar:star-linear",
                      label: "Upgrade to Pro",
                      color: "var(--primary-01)",
                    },
                  ].map((m) => (
                    <a
                      key={m.label}
                      href="#"
                      className="flex items-center gap-3 h-11 px-3 rounded-xl text-sm transition-colors duration-150 hover:bg-[var(--b-pop)]"
                      style={{ color: m.color }}
                    >
                      <Icon icon={m.icon} width={20} />
                      {m.label}
                    </a>
                  ))}
                  <div
                    className="my-1 h-px"
                    style={{ background: "var(--s-stroke2)" }}
                  />
                  <a
                    href="#"
                    className="flex items-center gap-3 h-11 px-3 rounded-xl text-sm transition-colors duration-150 hover:bg-[var(--b-pop)]"
                    style={{ color: "#FF6A55" }}
                  >
                    <Icon icon="solar:logout-3-linear" width={20} />
                    Log out
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="px-5 max-md:px-3 pb-5">
          <div className="flex gap-3 max-lg:block">
            {/* Left column */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              {/* Overview */}
              <section className="card">
                <div className="flex items-center h-12 pl-2">
                  <div className="mr-auto text-h6">Overview</div>
                  <Select value={range1} onChange={setRange1} />
                </div>

                <div className="pt-3">
                  {/* Stat tiles */}
                  <div
                    className="flex max-md:flex-col gap-1.5 mb-4 p-1.5 rounded-[2rem] border"
                    style={{
                      borderColor: "var(--s-subtle)",
                      background: "var(--b-depth2)",
                    }}
                  >
                    {(
                      [
                        {
                          key: "customers",
                          label: "Customers",
                          value: "1,293",
                          trend: "36.8",
                          positive: false,
                          icon: "solar:users-group-rounded-linear",
                        },
                        {
                          key: "balance",
                          label: "Balance",
                          value: "256k",
                          trend: "36.8",
                          positive: true,
                          icon: "solar:cart-large-2-linear",
                        },
                      ] as const
                    ).map((tile) => {
                      const isActive = activeStat === tile.key;
                      return (
                        <div
                          key={tile.key}
                          onClick={() => setActiveStat(tile.key)}
                          className="group flex-1 px-12 py-8 max-2xl:p-6 max-md:p-4 rounded-3xl cursor-pointer transition-all duration-300"
                          style={{
                            background: isActive
                              ? "var(--b-surface2)"
                              : "transparent",
                            boxShadow: isActive
                              ? "var(--shadow-depth-toggle)"
                              : "none",
                          }}
                        >
                          <div
                            className="flex items-center gap-3 mb-2 text-sub1 max-md:text-sub2 transition-colors duration-200"
                            style={{
                              color: isActive
                                ? "var(--t-primary)"
                                : "var(--t-secondary)",
                            }}
                          >
                            <Icon icon={tile.icon} width={22} />
                            {tile.label}
                          </div>
                          <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-1">
                            <div
                              className="text-h2 max-md:text-h3"
                              style={{ color: "var(--t-primary)" }}
                            >
                              {tile.value}
                            </div>
                            <div>
                              <div
                                className={`inline-flex items-center gap-1 h-7 px-1.5 rounded-lg text-xs font-semibold ${tile.positive ? "label-green" : "label-red"}`}
                              >
                                <Icon
                                  icon={
                                    tile.positive
                                      ? "solar:arrow-up-linear"
                                      : "solar:arrow-down-linear"
                                  }
                                  width={15}
                                />
                                {tile.trend}%
                              </div>
                              <div
                                className="mt-1 text-xs"
                                style={{ color: "var(--t-secondary)" }}
                              >
                                vs last month
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-5 max-lg:px-3 max-lg:py-4">
                    {activeStat === "customers" ? (
                      <div>
                        <div className="mb-6">
                          <div className="text-h5 max-md:text-base">
                            857 new customers today!
                          </div>
                          <div
                            className="text-body2"
                            style={{ color: "var(--t-secondary)" }}
                          >
                            Send a welcome message to all new customers.
                          </div>
                        </div>
                        <div className="flex max-md:overflow-auto scrollbar-hide max-md:-mx-3 max-md:px-3 fade-x">
                          {newCustomers.map((c, i) => (
                            <div
                              key={`${c.name}-${i}`}
                              className="flex-1 max-md:shrink-0 max-md:w-28 px-1 py-6 text-center"
                            >
                              <img
                                src={`${avatarBase}${c.avatar}.png&w=128&q=75`}
                                alt={c.name}
                                className="w-16 h-16 rounded-full object-cover mx-auto transition-transform duration-300 hover:scale-105"
                              />
                              <div
                                className="mt-4 text-btn truncate"
                                style={{ color: "var(--t-secondary)" }}
                              >
                                {c.name}
                              </div>
                            </div>
                          ))}
                          <div className="flex-1 max-md:shrink-0 max-md:w-28 px-2 py-6 text-center">
                            <a
                              href="#"
                              className="group inline-flex flex-col items-center"
                            >
                              <span
                                className="flex items-center justify-center w-16 h-16 rounded-full border transition-all duration-300 group-hover:border-[var(--s-highlight)] group-hover:shadow-depth"
                                style={{
                                  borderColor: "var(--s-stroke2)",
                                  color: "var(--t-secondary)",
                                }}
                              >
                                <Icon
                                  icon="solar:arrow-right-linear"
                                  width={22}
                                />
                              </span>
                              <span
                                className="mt-4 text-btn transition-colors duration-200 group-hover:text-[var(--t-primary)]"
                                style={{ color: "var(--t-secondary)" }}
                              >
                                View all
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2">
                        <div className="flex gap-3">
                          <div
                            className="flex flex-col justify-between text-xs shrink-0 py-1 max-md:hidden"
                            style={{ color: "var(--t-tertiary)" }}
                          >
                            <span>100k</span>
                            <span>75k</span>
                            <span>50k</span>
                            <span>25k</span>
                            <span>$0</span>
                          </div>
                          <div className="relative grow">
                            <svg
                              viewBox="0 0 660 190"
                              className="w-full h-48 max-md:h-36"
                              preserveAspectRatio="none"
                            >
                              <defs>
                                <linearGradient
                                  id="earningFill"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="0%"
                                    stopColor="#00A656"
                                    stopOpacity="0.28"
                                  />
                                  <stop
                                    offset="100%"
                                    stopColor="#00A656"
                                    stopOpacity="0"
                                  />
                                </linearGradient>
                              </defs>
                              <g
                                stroke="var(--s-stroke2)"
                                strokeWidth="1"
                              >
                                <line
                                  x1="0"
                                  y1="190"
                                  x2="660"
                                  y2="190"
                                />
                                <line
                                  x1="0"
                                  y1="147.5"
                                  x2="660"
                                  y2="147.5"
                                  opacity="0.6"
                                />
                                <line
                                  x1="0"
                                  y1="105"
                                  x2="660"
                                  y2="105"
                                  opacity="0.6"
                                />
                                <line
                                  x1="0"
                                  y1="62.5"
                                  x2="660"
                                  y2="62.5"
                                  opacity="0.6"
                                />
                                <line
                                  x1="0"
                                  y1="20"
                                  x2="660"
                                  y2="20"
                                  opacity="0.6"
                                />
                              </g>
                              <path
                                d="M40,150 C99,150 99,80 158,80 C217,80 217,175 276,175 C335,175 335,150 394,150 C453,150 453,25 512,25 C571,25 571,115 630,115 L630,190 L40,190 Z"
                                fill="url(#earningFill)"
                              />
                              <path
                                d="M40,150 C99,150 99,80 158,80 C217,80 217,175 276,175 C335,175 335,150 394,150 C453,150 453,25 512,25 C571,25 571,115 630,115"
                                fill="none"
                                stroke="var(--primary-02)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                              <circle
                                cx="158"
                                cy="80"
                                r="9"
                                fill="var(--primary-02)"
                                fillOpacity="0.18"
                              />
                              <circle
                                cx="158"
                                cy="80"
                                r="4.5"
                                fill="var(--primary-02)"
                                stroke="var(--b-surface2)"
                                strokeWidth="2"
                              />
                            </svg>
                            <div
                              className="absolute -translate-x-1/2 px-3 py-2 rounded-xl border whitespace-nowrap"
                              style={{
                                left: "23.9%",
                                top: "42%",
                                transform: "translateX(-50%) translateY(-135%)",
                                background: "var(--b-pop)",
                                borderColor: "var(--s-subtle)",
                                boxShadow: "var(--shadow-dropdown)",
                              }}
                            >
                              <div
                                className="text-xs"
                                style={{ color: "var(--t-tertiary)" }}
                              >
                                Earning
                              </div>
                              <div
                                className="text-sub2"
                                style={{ color: "var(--t-primary)" }}
                              >
                                $52,480.00
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="flex justify-between text-xs mt-2 pl-8 max-md:pl-0"
                          style={{ color: "var(--t-tertiary)" }}
                        >
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                          <span>July</span>
                          <span>Aug</span>
                          <span>Sep</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Product view */}
              <section className="card">
                <div className="flex items-center h-12 pl-2">
                  <div className="mr-auto text-h6">Product view</div>
                  <Select value={range2} onChange={setRange2} />
                </div>

                <div className="pt-6 px-5 pb-5 max-md:pt-5 max-lg:px-3 max-lg:pb-4">
                  <div className="flex items-end max-md:block">
                    <div className="shrink-0 w-52 mr-16 max-2xl:mr-8 max-md:flex max-md:items-center max-md:gap-4 max-md:w-auto max-md:mb-5">
                      <div className="flex mb-4 max-md:mb-0">
                        <div
                          className="text-h3"
                          style={{ color: "var(--t-tertiary)" }}
                        >
                          $
                        </div>
                        <div className="text-h2">10.2m</div>
                      </div>
                      <div className="flex items-center gap-2 max-md:flex-col max-md:items-start max-md:gap-1">
                        <div className="inline-flex items-center gap-1 h-7 px-1.5 rounded-lg text-xs font-semibold label-green">
                          <Icon icon="solar:arrow-up-linear" width={15} />
                          36.8%
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--t-tertiary)" }}
                        >
                          vs last month
                        </div>
                      </div>
                    </div>

                    <div className="grow">
                      <div className="relative">
                        {/* Tooltip */}
                        {hoveredBar && (
                          <div
                            className="pointer-events-none absolute -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border"
                            style={{
                              left: `${(bars.findIndex((b) => b.day === hoveredBar) / bars.length) * 100 + 100 / bars.length / 2}%`,
                              bottom: `calc(${bars.find((b) => b.day === hoveredBar)?.height ?? "0%"} + 3.5rem)`,
                              background: "var(--b-pop)",
                              borderColor: "var(--s-subtle)",
                              color: "var(--t-primary)",
                              boxShadow: "var(--shadow-dropdown)",
                              transform: "translateX(-50%)",
                            }}
                          >
                            {bars.find((b) => b.day === hoveredBar)?.val}
                          </div>
                        )}
                        <div className="flex items-end gap-2 sm:gap-3 h-56 max-md:h-44">
                          {bars.map((bar) => (
                            <button
                              key={bar.day}
                              type="button"
                              className="flex-1 flex flex-col items-center gap-3 h-full justify-end group appearance-none bg-transparent border-0 p-0"
                              onMouseEnter={() => setHoveredBar(bar.day)}
                              onMouseLeave={() =>
                                setHoveredBar(activeBar ?? null)
                              }
                              onClick={() => {
                                setActiveBar(bar.day);
                                setHoveredBar(bar.day);
                              }}
                            >
                              <div
                                className="w-full rounded-xl transition-all duration-300"
                                style={{
                                  height: bar.height,
                                  background: getBarBg(bar),
                                }}
                              />
                              <span
                                className="text-xs"
                                style={{ color: "var(--t-tertiary)" }}
                              >
                                {bar.day}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Carousel */}
              <section className="card overflow-hidden">
                <div className="flex items-center h-12 pl-2">
                  <div className="mr-auto text-h6">Overview</div>
                  <div className="flex items-center gap-1">
                    {(
                      [
                        {
                          dir: -1,
                          icon: "solar:arrow-left-linear",
                          label: "Previous",
                          disabled: !canPrev,
                        },
                        {
                          dir: 1,
                          icon: "solar:arrow-right-linear",
                          label: "Next",
                          disabled: !canNext,
                        },
                      ] as const
                    ).map((btn) => (
                      <button
                        key={btn.dir}
                        aria-label={btn.label}
                        disabled={btn.disabled}
                        onClick={() => carouselScroll(btn.dir)}
                        className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 hover:border-[var(--s-highlight)] hover:text-[var(--t-primary)] disabled:opacity-40 disabled:pointer-events-none"
                        style={{
                          borderColor: "var(--s-stroke2)",
                          color: "var(--t-secondary)",
                        }}
                      >
                        <Icon icon={btn.icon} width={22} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 px-2 pb-2 max-md:px-1 max-md:pt-5">
                  <div
                    ref={carouselRef}
                    onScroll={updateCarousel}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
                  >
                    {carouselItems.map((item, i) => {
                      const bg = iconBg[item.iconColor];
                      return (
                        <a
                          key={`${item.title}-${i}`}
                          href="#"
                          className="shrink-0 w-[13rem] h-[15rem] flex flex-col p-4 rounded-3xl border transition-all duration-300 hover:shadow-depth"
                          style={{
                            borderColor: "var(--s-stroke2)",
                            background: "var(--b-highlight)",
                          }}
                        >
                          <span
                            className="flex items-center justify-center w-16 h-16 mb-auto rounded-full"
                            style={{
                              background: bg.bg,
                              color: bg.color,
                            }}
                          >
                            <Icon icon={item.iconName} width={24} />
                          </span>
                          <div
                            className="mb-2 text-sub1"
                            style={{ color: "var(--t-primary)" }}
                          >
                            {item.title}
                          </div>
                          <div className="flex items-center gap-2">
                            <img
                              src={`${avatarBase}${item.avatar}.png&w=48&q=75`}
                              alt=""
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span
                              className="mr-auto text-xs"
                              style={{ color: "var(--t-tertiary)" }}
                            >
                              {item.read}
                            </span>
                            <span
                              className={`inline-flex items-center h-5 px-1.5 rounded text-xs ${item.tagClass}`}
                            >
                              {item.tag}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Get more customers */}
              <section className="card">
                <div className="flex items-center h-12 pl-2">
                  <div className="mr-auto text-h6">Get more customers</div>
                </div>
                <div className="pt-4">
                  <div
                    className="mb-6 px-2 text-body2"
                    style={{ color: "var(--t-secondary)" }}
                  >
                    Fifty percent of new customers explore products because the
                    author shares their work on social media.
                    <br />
                    Start earning now! 🔥
                  </div>
                  <div className="flex gap-3">
                    {[
                      { icon: "simple-icons:x", label: "X" },
                      { icon: "simple-icons:facebook", label: "Facebook" },
                      { icon: "simple-icons:instagram", label: "Instagram" },
                      { icon: "simple-icons:threads", label: "Threads" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href="#"
                        aria-label={s.label}
                        className="flex-1 h-12 rounded-3xl border flex items-center justify-center transition-all duration-200 hover:border-[var(--s-highlight)] hover:text-[var(--t-primary)]"
                        style={{
                          borderColor: "var(--s-stroke2)",
                          color: "var(--t-secondary)",
                        }}
                      >
                        <Icon icon={s.icon} width={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="w-[25rem] max-2xl:w-[22rem] max-lg:w-full shrink-0 flex flex-col gap-3 max-lg:mt-3">
              {/* Popular products */}
              <section className="card">
                <div className="flex items-center h-12 pl-3">
                  <div className="mr-auto text-h6">Popular products</div>
                </div>
                <div className="pt-3 flex flex-col gap-1">
                  {products.map((p, i) => (
                    <a
                      key={`${p.name}-${i}`}
                      href="#"
                      className="group relative flex items-center p-3 rounded-3xl cursor-pointer"
                    >
                      <div className="box-hover" />
                      <img
                        src={p.img}
                        alt=""
                        className="relative z-10 w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div
                        className="relative z-10 grow px-4 text-sub1 line-clamp-2"
                        style={{ color: "var(--t-primary)" }}
                      >
                        {p.name}
                      </div>
                      <div className="relative z-10 flex flex-col items-end shrink-0 text-right">
                        <span
                          className="mb-1 text-sub1"
                          style={{ color: "var(--t-primary)" }}
                        >
                          {p.price}
                        </span>
                        <span
                          className={`inline-flex items-center h-6 px-1.5 rounded-lg border text-xs ${p.status === "Active" ? "label-green" : "label-red"}`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="pt-6 pb-1 px-1">
                  <a
                    href="#"
                    className="w-full h-12 rounded-3xl border flex items-center justify-center text-btn transition-all duration-200 hover:border-[var(--s-highlight)] hover:text-[var(--t-primary)]"
                    style={{
                      borderColor: "var(--s-stroke2)",
                      color: "var(--t-secondary)",
                    }}
                  >
                    All products
                  </a>
                </div>
              </section>

              {/* Comments */}
              <section className="card">
                <div className="flex items-center h-12 pl-3">
                  <div className="mr-auto text-h6">Comments</div>
                </div>
                <div className="pt-3 flex flex-col gap-1">
                  {comments.map((c, i) => (
                    <div
                      key={`${c.name}-${i}`}
                      className="group relative flex items-start p-3 py-5 rounded-3xl"
                    >
                      <div className="box-hover" />
                      <img
                        src={`${avatarBase}${c.avatar}.png&w=96&q=75`}
                        alt={c.name}
                        className="relative z-10 w-11 h-11 rounded-full object-cover shrink-0"
                      />
                      <div className="relative z-10 grow pl-4">
                        <div
                          className="mb-1 text-sub1"
                          style={{ color: "var(--t-primary)" }}
                        >
                          {c.name}{" "}
                          <span style={{ color: "var(--t-secondary)" }}>
                            on
                          </span>{" "}
                          <a
                            href="#"
                            className="transition-colors duration-200 hover:text-[var(--shade-08)]"
                          >
                            {c.product}
                          </a>
                        </div>
                        <div
                          className="mb-3 text-xs"
                          style={{ color: "var(--t-tertiary)" }}
                        >
                          {c.time}
                        </div>
                        <div
                          className="text-body1"
                          style={{ color: "var(--t-primary)" }}
                        >
                          {c.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-6 pb-1 px-1">
                  <a
                    href="#"
                    className="w-full h-12 rounded-3xl border flex items-center justify-center text-btn transition-all duration-200 hover:border-[var(--s-highlight)] hover:text-[var(--t-primary)]"
                    style={{
                      borderColor: "var(--s-stroke2)",
                      color: "var(--t-secondary)",
                    }}
                  >
                    All comments
                  </a>
                </div>
              </section>

              {/* Refund requests */}
              <section className="card">
                <div className="flex items-center h-12 pl-3">
                  <div className="mr-auto text-h6">Refund requests</div>
                </div>
                <div className="pt-3 p-1">
                  <div className="flex items-center mb-8">
                    <span
                      className="flex items-center justify-center w-16 h-16 shrink-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(#FFD5BD,#FFC1B1)",
                        color: "#4a2a1c",
                      }}
                    >
                      <Icon icon="solar:bag-3-linear" width={24} />
                    </span>
                    <div
                      className="grow pl-5 max-2xl:pl-4 text-body2 font-medium leading-relaxed"
                      style={{ color: "var(--t-secondary)" }}
                    >
                      You have{" "}
                      <a
                        href="#"
                        className="font-semibold transition-colors duration-200 hover:text-[var(--shade-08)]"
                        style={{ color: "var(--t-primary)" }}
                      >
                        52 open refund requests
                      </a>{" "}
                      to action. This includes{" "}
                      <a
                        href="#"
                        className="font-semibold transition-colors duration-200 hover:text-[var(--shade-08)]"
                        style={{ color: "var(--t-primary)" }}
                      >
                        8 new requests.
                      </a>{" "}
                      👀
                    </div>
                  </div>
                  <a
                    href="#"
                    className="w-full h-12 rounded-3xl border flex items-center justify-center text-btn transition-all duration-200 hover:border-[var(--s-highlight)] hover:text-[var(--t-primary)]"
                    style={{
                      borderColor: "var(--s-stroke2)",
                      color: "var(--t-secondary)",
                    }}
                  >
                    View all
                  </a>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
