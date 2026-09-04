import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowUp, ArrowRight, Bell, Bag, ChatRound, Search as SearchIcon, Close,
  AltArrowDown, AltArrowLeft, AltArrowRight, Widget, UsersGroupRounded, CartLarge,
  Letter, MedalRibbonsStar, Moon, Sun, Plus,
} from './icons';

const avatarBase = 'https://ui8-core-2.vercel.app/_next/image?url=%2Fimages%2Favatars%2F';
const productBase = 'https://ui8-core-2.vercel.app/_next/image?url=%2Fimages%2Fproducts%2F';

const products = [
  { name: 'Crypter - NFT UI Kit', price: '$3,250.00', status: 'Active', image: `${productBase}1.png&w=128&q=75` },
  { name: 'Bento Pro 2.0 Illustrations', price: '$7,890.00', status: 'Active', image: `${productBase}2.png&w=128&q=75` },
  { name: 'Fleet - travel shopping kit', price: '$1,500.00', status: 'Offline', image: `${productBase}3.png&w=128&q=75` },
  { name: 'SimpleSocial UI Design Kit', price: '$9,999.00', status: 'Active', image: `${productBase}4.png&w=128&q=75` },
  { name: 'Fleet - travel shopping kit', price: '$4,750.00', status: 'Active', image: `${productBase}5.png&w=128&q=75` },
];

const comments = [
  { name: 'Joyce', product: 'Bento Pro 2.0', time: '09:00 AM', text: 'Great work! When HTML version will be available? ⚡', avatar: 4 },
  { name: 'Gladyce', product: 'Food Delivery App', time: '10:24 AM', text: 'Amazing. This says compatible with After Effects. Will After Effects files be added?', avatar: 1 },
  { name: 'Elbert', product: 'AstroClash', time: '11:33 AM', text: 'Hello, can we get the 3d source code of the characters?', avatar: 2 },
];

const carouselItems = [
  { title: 'Early access', read: '3 mins read', tag: 'new', tagClass: 'label-green', iconColor: 'violet', avatar: 5 },
  { title: 'Access use guidelines', read: '9 mins read', tag: 'hot', tagClass: 'label-red', iconColor: 'yellow', avatar: 6 },
  { title: 'Exclusive downloads', read: '16 mins read', tag: 'new', tagClass: 'label-green', iconColor: 'mint', avatar: 7 },
  { title: 'Life & work updates', read: '35 mins read', tag: 'hot', tagClass: 'label-red', iconColor: 'blue', avatar: 8 },
  { title: 'Product launch notes', read: '6 mins read', tag: 'new', tagClass: 'label-green', iconColor: 'violet', avatar: 1 },
  { title: 'Access use guidelines', read: '9 mins read', tag: 'hot', tagClass: 'label-red', iconColor: 'yellow', avatar: 6 },
];

const newCustomers = [
  { name: 'Gladyce', avatar: 1 },
  { name: 'Elbert', avatar: 2 },
  { name: 'Joyce', avatar: 3 },
  { name: 'John', avatar: 4 },
  { name: 'Elbert', avatar: 6 },
  { name: 'Joyce', avatar: 7 },
  { name: 'Anna', avatar: 8 },
];

type NavSubItem = { label: string; badge?: string; badgeGreen?: boolean };
type NavItem = { label: string; icon: typeof Widget; active?: boolean; subItems?: NavSubItem[]; open?: boolean };

const navStructure: NavItem[] = [
  { label: 'Dashboard', icon: Widget, active: true },
  {
    label: 'Products', icon: Bag, open: true, subItems: [
      { label: 'Overview' }, { label: 'Drafts', badge: '2' }, { label: 'Released' }, { label: 'Comments' }, { label: 'Scheduled', badge: '8', badgeGreen: true },
    ],
  },
  {
    label: 'Customers', icon: UsersGroupRounded, subItems: [
      { label: 'Overview' }, { label: 'Customer list' },
    ],
  },
  { label: 'Shop', icon: CartLarge },
  {
    label: 'Income', icon: Letter, subItems: [
      { label: 'Earning' }, { label: 'Refunds', badge: '3' }, { label: 'Payouts' }, { label: 'Statements' },
    ],
  },
  { label: 'Promote', icon: MedalRibbonsStar },
];

const selectOptions = ['Last 7 days', 'Last 28 days', 'Last 3 months'];

function Select({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
  return (
    <div className="select-wrap" ref={ref}>
      <button className="select-btn" data-open={open || undefined} onClick={() => setOpen(!open)}>
        <span className="truncate" style={{ paddingLeft: '0.25rem' }}>{value}</span>
        <AltArrowDown className="select-arrow" />
      </button>
      <div className="select-opts" data-open={open || undefined}>
        {selectOptions.map((opt) => (
          <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

function StatTile({
  label, value, trend, positive, active, icon: Icon, onClick,
}: {
  label: string; value: string; trend: string; positive: boolean; active: boolean;
  icon: typeof Widget; onClick: () => void;
}) {
  return (
    <div className="stat-tile group" data-active={active || undefined} onClick={onClick}>
      <div className="stat-tile-label">
        <Icon /> {label}
      </div>
      <div className="stat-tile-bottom">
        <div className="stat-tile-value">{value}</div>
        <div>
          <div className={`trend-pill ${positive ? 'label-green' : 'label-red'}`}>
            {positive ? <ArrowUp size={15} /> : <ArrowDown size={15} />}{trend}%
          </div>
          <div className="trend-label">vs last month</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navState, setNavState] = useState<NavItem[]>(navStructure);
  const [activeStat, setActiveStat] = useState<'customers' | 'balance'>('customers');
  const [range1, setRange1] = useState('Last 7 days');
  const [range2, setRange2] = useState('Last 7 days');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  function toggleNav(label: string) {
    setNavState((prev) => prev.map((item) =>
      item.label === label ? { ...item, open: !item.open } : item,
    ));
  }

  function carouselScroll(dir: number) {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 240, behavior: 'smooth' });
      setCarouselIndex((prev) => Math.max(0, prev + dir));
    }
  }

  const canScrollLeft = carouselIndex > 0;
  const canScrollRight = carouselIndex < carouselItems.length - 4;

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''} max-xl:sidebar`}>
        <a href="#" className="brand-link">
          <span className="brand-mark">C</span>
          <span className="brand-text">Core 2.0</span>
        </a>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
          <Close width={22} />
        </button>

        <nav className="main-nav" style={{ scrollbarWidth: 'thin' }}>
          {navState.map((item) => (
            <div key={item.label}>
              {item.active ? (
                <a href="#" className="nav-link nav-active">
                  <div className="nav-active-bg gradient-menu" />
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              ) : item.subItems ? (
                <>
                  <button className="acc-btn" data-open={item.open || undefined} onClick={() => toggleNav(item.label)}>
                    <item.icon />
                    {item.label}
                    <AltArrowDown className="acc-arrow" width={20} />
                  </button>
                  <div className="acc-panel" data-open={item.open || undefined}>
                    <div>
                      <div className="tree-wrap">
                        {item.subItems.map((sub) => (
                          <div className="tree-item" key={sub.label}>
                            <a href="#">
                              {sub.label}
                              {sub.badge && (
                                <span className={`tree-badge ${sub.badgeGreen ? 'tree-badge-green' : ''}`}>{sub.badge}</span>
                              )}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <a href="#" className="nav-link">
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="theme-toggle-wrap" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <button className={`theme-btn ${theme === 'dark' ? '' : 'icon-btn-lucide'}`} data-active={theme === 'dark' || undefined}>
              <Moon width={17} />
            </button>
            <button className={`theme-btn ${theme === 'light' ? '' : 'icon-btn-lucide'}`} data-active={theme === 'light' || undefined}>
              <Sun width={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div className={`mobile-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="header">
        <div className="header-inner" style={{ maxWidth: '100%' }}>
          <div className="mobile-brand">
            <a href="#" className="brand-link" style={{ marginBottom: 0, height: 'auto' }}>
              <span className="brand-mark">C</span>
            </a>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4.5px' }}>
                <span style={{ width: '18px', height: '1.5px', borderRadius: '9999px', background: 'var(--t-secondary)' }} />
                <span style={{ width: '18px', height: '1.5px', borderRadius: '9999px', background: 'var(--t-secondary)' }} />
                <span style={{ width: '18px', height: '1.5px', borderRadius: '9999px', background: 'var(--t-secondary)' }} />
              </span>
            </button>
          </div>
          <div className="header-title">Dashboard</div>

          {/* Search */}
          <div className="search-wrap">
            <SearchIcon className="search-icon" width={22} />
            <input
              className="search-input"
              type="text"
              placeholder="Search anything..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            />
            {searchFocused && (
              <div className="search-dropdown">
                <div className="search-section-label">Best match</div>
                <a href="#" className="search-item group">
                  <div className="box-hover" />
                  <img src={`${productBase}2.png&w=128&q=75`} alt="" />
                  <div className="si-name">Core Dashboard Builder 2.0</div>
                  <div className="si-right">
                    <span className="price">$2,453.80</span>
                    <span className="status-pill label-green">Active</span>
                  </div>
                </a>
                <a href="#" className="search-item group">
                  <div className="box-hover" />
                  <img src={`${productBase}4.png&w=128&q=75`} alt="" />
                  <div className="si-name">SimpleSocial UI Design Kit</div>
                  <div className="si-right">
                    <span className="price">$1,345.24</span>
                    <span className="status-pill label-red">Offline</span>
                  </div>
                </a>
                <div className="search-section-label">Suggestions</div>
                <div className="search-item group">
                  <div className="box-hover" />
                  <img className="si-avatar" src={`${avatarBase}2.png&w=128&q=75`} alt="" />
                  <div className="si-info">
                    <div className="name">Elbert</div>
                    <div className="role">UI/UX Designer</div>
                  </div>
                  <div className="si-arrow"><ArrowRight width={20} /></div>
                </div>
                <div className="search-item group">
                  <div className="box-hover" />
                  <img className="si-avatar" src={`${avatarBase}1.png&w=128&q=75`} alt="" />
                  <div className="si-info">
                    <div className="name">Joyce</div>
                    <div className="role">UI/UX Designer</div>
                  </div>
                  <div className="si-arrow"><ArrowRight width={20} /></div>
                </div>
              </div>
            )}
          </div>

          <a href="#" className="create-btn">Create</a>
          <button className="icon-circle"><Bell width={22} /></button>
          <button className="icon-circle"><ChatRound width={22} /></button>

          <div className="avatar-wrap" ref={avatarRef}>
            <button className="avatar-btn" onClick={(e) => { e.stopPropagation(); setAvatarOpen(!avatarOpen); }}>
              <img src={`${avatarBase}3.png&w=96&q=100`} alt="avatar" />
            </button>
            {avatarOpen && (
              <div className="avatar-menu">
                <a href="#"><Bag4 width={20} /> My shop</a>
                <a href="#"><Pen width={20} /> Edit profile</a>
                <a href="#"><ChartSquare width={20} /> Analytics</a>
                <a href="#"><LinkRound width={20} /> Affiliate center</a>
                <a href="#"><Compass width={20} /> Explore creators</a>
                <a href="#" className="upgrade"><Star width={20} /> Upgrade to Pro</a>
                <hr />
                <a href="#" className="logout"><Logout width={20} /> Log out</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="main-content">
        <div className="dashboard-layout">
          {/* Left column */}
          <div className="col-left">
            {/* Overview */}
            <section className="card">
              <div className="panel-head">
                <div className="title">Overview</div>
                <Select value={range1} onChange={setRange1} />
              </div>
              <div style={{ paddingTop: '0.75rem' }}>
                <div className="stat-container">
                  <StatTile
                    label="Customers" value="1,293" trend="36.8" positive={false}
                    active={activeStat === 'customers'} icon={UsersGroupRounded}
                    onClick={() => setActiveStat('customers')}
                  />
                  <StatTile
                    label="Balance" value="256k" trend="36.8" positive
                    active={activeStat === 'balance'} icon={CartLarge}
                    onClick={() => setActiveStat('balance')}
                  />
                </div>

                {activeStat === 'customers' ? (
                  <div className="customers-view">
                    <div className="cv-title">857 new customers today!</div>
                    <div className="cv-subtitle">Send a welcome message to all new customers.</div>
                    <div className="cv-avatar-row">
                      {newCustomers.map((c, i) => (
                        <div className="cv-person" key={`${c.name}-${i}`}>
                          <img src={`${avatarBase}${c.avatar}.png&w=128&q=75`} alt={c.name} />
                          <span>{c.name}</span>
                        </div>
                      ))}
                      <div className="cv-person">
                        <a href="#" className="cv-view-all">
                          <span><ArrowRight width={22} /></span>
                          <small>View all</small>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="balance-view">
                    <div className="balance-chart">
                      <div className="balance-labels">
                        <span>100k</span><span>75k</span><span>50k</span><span>25k</span><span>$0</span>
                      </div>
                      <div className="balance-chart-area">
                        <svg viewBox="0 0 660 190" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="earningFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00A656" stopOpacity="0.28" />
                              <stop offset="100%" stopColor="#00A656" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <g stroke="var(--s-stroke2)" strokeWidth="1">
                            <line x1="0" y1="190" x2="660" y2="190" />
                            <line x1="0" y1="147.5" x2="660" y2="147.5" opacity="0.6" />
                            <line x1="0" y1="105" x2="660" y2="105" opacity="0.6" />
                            <line x1="0" y1="62.5" x2="660" y2="62.5" opacity="0.6" />
                            <line x1="0" y1="20" x2="660" y2="20" opacity="0.6" />
                          </g>
                          <path d="M40,150 C99,150 99,80 158,80 C217,80 217,175 276,175 C335,175 335,150 394,150 C453,150 453,25 512,25 C571,25 571,115 630,115 L630,190 L40,190 Z" fill="url(#earningFill)" />
                          <path d="M40,150 C99,150 99,80 158,80 C217,80 217,175 276,175 C335,175 335,150 394,150 C453,150 453,25 512,25 C571,25 571,115 630,115" fill="none" stroke="var(--primary-02)" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="158" cy="80" r="9" fill="var(--primary-02)" fillOpacity="0.18" />
                          <circle cx="158" cy="80" r="4.5" fill="var(--primary-02)" stroke="var(--b-surface2)" strokeWidth="2" />
                        </svg>
                        <div className="balance-tooltip" style={{ left: '23.9%', top: '42%' }}>
                          <small>Earning</small>
                          <strong>$52,480.00</strong>
                        </div>
                      </div>
                    </div>
                    <div className="balance-months">
                      <span>Apr</span><span>May</span><span>Jun</span><span>July</span><span>Aug</span><span>Sep</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Product view */}
            <section className="card">
              <div className="panel-head">
                <div className="title">Product view</div>
                <Select value={range2} onChange={setRange2} />
              </div>
              <div className="bar-chart-area">
                <div className="bar-chart-top">
                  <div className="bar-big-number">
                    <div className="num">
                      <div className="dollar">$</div>
                      <div className="val">10.2m</div>
                    </div>
                    <div className="info">
                      <div className="trend-pill label-green">
                        <ArrowUp size={15} />36.8%
                      </div>
                      <small>vs last month</small>
                    </div>
                  </div>
                  <div style={{ flexGrow: 1, position: 'relative' }}>
                    <div className="bars">
                      {[
                        { day: '14', height: '47.7%', val: '1.1m', type: 'grey' },
                        { day: '15', height: '60.5%', val: '1.4m', type: 'grey' },
                        { day: '16', height: '33.7%', val: '0.8m', type: 'min' },
                        { day: '17', height: '91.9%', val: '2.2m', type: 'active' },
                        { day: '18', height: '76.9%', val: '1.8m', type: 'grey' },
                        { day: '19', height: '27.3%', val: '0.7m', type: 'min' },
                        { day: '20', height: '83.5%', val: '2.0m', type: 'grey' },
                      ].map((bar) => (
                        <button key={bar.day} className="bar">
                          <div className={`bar-fill ${bar.type}`} style={{ height: bar.height }} />
                          <span className="bar-label">{bar.day}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Carousel */}
            <section className="card" style={{ overflow: 'hidden' }}>
              <div className="panel-head">
                <div className="title">Overview</div>
                <div className="carousel-head">
                  <button className="carousel-btn" disabled={!canScrollLeft} onClick={() => carouselScroll(-1)}>
                    <AltArrowLeft width={22} />
                  </button>
                  <button className="carousel-btn" disabled={!canScrollRight} onClick={() => carouselScroll(1)}>
                    <AltArrowRight width={22} />
                  </button>
                </div>
              </div>
              <div className="carousel-track" ref={carouselRef}>
                {carouselItems.map((item, i) => (
                  <a href="#" className="carousel-card" key={`${item.title}-${i}`}>
                    <span className={`carousel-icon ${item.iconColor}`}>
                      {item.iconColor === 'mint' ? <DownloadMinimalistic width={24} /> :
                        item.iconColor === 'blue' ? <CheckSquare width={24} /> :
                          item.iconColor === 'yellow' ? <Gallery width={24} /> :
                            <Calendar width={24} />}
                    </span>
                    <div className="carousel-card-title">{item.title}</div>
                    <div className="carousel-card-meta">
                      <img src={`${avatarBase}${item.avatar}.png&w=48&q=75`} alt="" />
                      <span className="read">{item.read}</span>
                      <span className={`tag ${item.tagClass}`}>{item.tag}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Get more customers */}
            <section className="card">
              <div className="panel-head">
                <div className="title">Get more customers</div>
              </div>
              <div style={{ paddingTop: '0.75rem' }}>
                <div className="social-text">
                  Fifty percent of new customers explore products because the author shares their work on social media.<br />
                  Start earning now! 🔥
                </div>
                <div className="social-row">
                  <a href="#" className="social-btn"><XIcon width={19} /></a>
                  <a href="#" className="social-btn"><Facebook width={20} /></a>
                  <a href="#" className="social-btn"><Instagram width={20} /></a>
                  <a href="#" className="social-btn"><Threads width={20} /></a>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="col-right">
            {/* Popular products */}
            <section className="card">
              <div className="panel-head" style={{ paddingLeft: '0.75rem' }}>
                <div className="title">Popular products</div>
              </div>
              <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {products.map((p, i) => (
                  <a href="#" className="product-item group" key={`${p.name}-${i}`}>
                    <div className="box-hover" />
                    <img src={p.image} alt="" />
                    <div className="pi-name">{p.name}</div>
                    <div className="pi-right">
                      <span className="price">{p.price}</span>
                      <span className={`status-pill ${p.status === 'Active' ? 'label-green' : 'label-red'}`}>{p.status}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ paddingTop: '1.5rem', paddingBottom: '0.25rem', paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
                <a href="#" className="outline-btn">All products</a>
              </div>
            </section>

            {/* Comments */}
            <section className="card">
              <div className="panel-head" style={{ paddingLeft: '0.75rem' }}>
                <div className="title">Comments</div>
              </div>
              <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {comments.map((c, i) => (
                  <div className="comment-item group" key={`${c.name}-${i}`}>
                    <div className="box-hover" />
                    <img src={`${avatarBase}${c.avatar}.png&w=96&q=75`} alt={c.name} />
                    <div className="ci-body">
                      <div className="ci-head">
                        {c.name} <span>on</span> <a href="#">{c.product}</a>
                      </div>
                      <div className="ci-time">{c.time}</div>
                      <div className="ci-text">{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: '1.5rem', paddingBottom: '0.25rem', paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
                <a href="#" className="outline-btn">All comments</a>
              </div>
            </section>

            {/* Refund requests */}
            <section className="card">
              <div className="panel-head" style={{ paddingLeft: '0.75rem' }}>
                <div className="title">Refund requests</div>
              </div>
              <div className="refund-content">
                <div className="refund-row">
                  <span className="refund-icon">
                    <Bag3 width={24} />
                  </span>
                  <div className="refund-text">
                    You have <a href="#">52 open refund requests</a> to action. This includes <a href="#">8 new requests.</a> 👀
                  </div>
                </div>
                <a href="#" className="outline-btn">View all</a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
