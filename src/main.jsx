import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
	Activity,
	AlertTriangle,
	ArrowRight,
	Bell,
	Bike,
	Building2,
	Car,
	CheckCircle2,
	ChevronRight,
	CloudRain,
	Droplets,
	Factory,
	Flame,
	Gauge,
	Globe2,
	HeartPulse,
	Leaf,
	Lightbulb,
	MapPin,
	Menu,
	MessageSquare,
	Phone,
	Radio,
	Search,
	Send,
	ShieldAlert,
	ShieldCheck,
	Siren,
	Sun,
	TrainFront,
	Trash2,
	Users,
	Waves,
	Wind,
	X,
	Zap,
} from "lucide-react";
import "./index.css";

const heroImage =
	"https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1600&q=80";

const stats = [
	{ icon: Activity, value: "4,812", label: "Active Sensors", detail: "Across the city" },
	{ icon: Gauge, value: "72%", label: "Traffic Flow", detail: "Average commute" },
	{ icon: CloudRain, value: "82%", label: "Reservoirs", detail: "Water storage" },
	{ icon: Zap, value: "98.7%", label: "Power Grid", detail: "Stable supply" },
	{ icon: Leaf, value: "24.3", label: "AQI Index", detail: "Moderate" },
	{ icon: Building2, value: "145", label: "Projects Live", detail: "Infra upgrades" },
];

const services = [
	{ name: "Emergency Response", icon: Siren, category: "Emergency", status: "Operational", text: "Police, fire and ambulance coordination", color: "red" },
	{ name: "Traffic Management", icon: Car, category: "Transport", status: "Live", text: "Congestion and signal monitoring", color: "cyan" },
	{ name: "Public Transport", icon: TrainFront, category: "Transport", status: "Operational", text: "Bus and metro network updates", color: "green" },
	{ name: "Water Supply", icon: Droplets, category: "Utilities", status: "Stable", text: "Reservoir and pipeline monitoring", color: "blue" },
	{ name: "Waste Management", icon: Trash2, category: "Civic", status: "Active", text: "Collection routes and service requests", color: "amber" },
	{ name: "Street Lighting", icon: Lightbulb, category: "Utilities", status: "98.2% Online", text: "Smart lighting network", color: "green" },
	{ name: "Air Quality", icon: Wind, category: "Civic", status: "Moderate", text: "Environmental sensor network", color: "amber" },
	{ name: "Public Safety", icon: ShieldCheck, category: "Emergency", status: "Monitoring", text: "CCTV and incident coordination", color: "cyan" },
	{ name: "Citizen Services", icon: Users, category: "Civic", status: "Available", text: "Complaints, requests and feedback", color: "green" },
];

const alerts = [
	{ level: "critical", title: "Waterlogging Alert", place: "Kurla West", time: "12 min ago", text: "Heavy rainfall may cause localized flooding. Municipal response team notified." },
	{ level: "warning", title: "Traffic Congestion", place: "Western Express Highway", time: "8 min ago", text: "Traffic speed is below normal between Bandra and Andheri." },
	{ level: "info", title: "Air Quality Advisory", place: "Powai", time: "24 min ago", text: "AQI is currently moderate. Sensitive groups should reduce prolonged outdoor activity." },
];

const dashboardViews = {
	Overview: [
		{ label: "Water pressure", value: "89%", trend: "+4% vs last week", width: "89%", icon: Waves },
		{ label: "Streetlight uptime", value: "98.2%", trend: "+1.3%", width: "98%", icon: Sun },
		{ label: "Transit reliability", value: "94.1%", trend: "+2.1%", width: "94%", icon: Bike },
	],
	Mobility: [
		{ label: "Signal efficiency", value: "83%", trend: "+6%", width: "83%", icon: Car },
		{ label: "Bus punctuality", value: "91%", trend: "+3%", width: "91%", icon: TrainFront },
		{ label: "EV charging", value: "73%", trend: "+8%", width: "73%", icon: Zap },
	],
	Safety: [
		{ label: "Incident response", value: "92%", trend: "+5%", width: "92%", icon: ShieldAlert },
		{ label: "Public CCTV uptime", value: "97%", trend: "+1%", width: "97%", icon: Radio },
		{ label: "Fire readiness", value: "88%", trend: "+2%", width: "88%", icon: Flame },
	],
};

const news = [
	{ title: "Metro corridor modernization unlocks safer commutes", tag: "Infrastructure", image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80" },
	{ title: "Climate-resilient drains completed along the eastern belt", tag: "Environment", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80" },
	{ title: "Civic response teams reduce average complaint resolution time", tag: "Governance", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" },
];

function Stat({ icon: Icon, value, label, detail }) {
	return (
		<div className="stat">
			<div className="stat-icon"><Icon size={18} /></div>
			<div>
				<strong>{value}</strong>
				<span>{label}</span>
				<small>{detail}</small>
			</div>
		</div>
	);
}

function App() {
	const [menu, setMenu] = useState(false);
	const [serviceFilter, setServiceFilter] = useState("All");
	const [dashboard, setDashboard] = useState("Overview");
	const [form, setForm] = useState({ name: "", contact: "", type: "Pothole", location: "", description: "" });
	const [submitted, setSubmitted] = useState(false);
	const [tracking, setTracking] = useState("");
	const [trackResult, setTrackResult] = useState(null);
	const [search, setSearch] = useState("");

	const filteredServices = useMemo(
		() =>
			services.filter(
				(service) =>
					(serviceFilter === "All" || service.category === serviceFilter) &&
					service.name.toLowerCase().includes(search.toLowerCase())
			),
		[serviceFilter, search]
	);

	const submitComplaint = (event) => {
		event.preventDefault();
		setSubmitted(true);
	};

	const trackComplaint = (event) => {
		event.preventDefault();
		if (tracking.trim()) setTrackResult("CMP-2026-1048");
	};

	return (
		<div className="app">
			<nav className="nav">
				<div className="container nav-inner">
					<a className="brand" href="#home" onClick={() => setMenu(false)}>
						<span className="brand-mark"><Globe2 size={21} /></span>
						<span>
							<b>SMART</b>
							<em>CITY</em>
							<small>MUMBAI PORTAL</small>
						</span>
					</a>
					<div className={`nav-links ${menu ? "open" : ""}`}>
						<a href="#services" onClick={() => setMenu(false)}>Services</a>
						<a href="#infrastructure" onClick={() => setMenu(false)}>Infrastructure</a>
						<a href="#alerts" onClick={() => setMenu(false)}>Alerts</a>
						<a href="#engage" onClick={() => setMenu(false)}>Citizen Portal</a>
					</div>
					<div className="nav-status"><i /> SYSTEMS ONLINE</div>
					<button className="menu-btn" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
				</div>
			</nav>

			<div className="ticker">
				<div className="ticker-track">
					<span><i /> MUMBAI LIVE</span>
					<b>•</b> AQI 86 MODERATE <b>•</b> TRAFFIC 72% FLOW <b>•</b> POWER GRID 98.7% STABLE <b>•</b> WATER RESERVOIRS 82% <b>•</b> 4,812 ACTIVE SENSORS <b>•</b>
					AQI 86 MODERATE <b>•</b> TRAFFIC 72% FLOW <b>•</b> POWER GRID 98.7% STABLE
				</div>
			</div>

			<header id="home" className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,18,20,.82), rgba(7,18,20,.55)), url(${heroImage})` }}>
				<div className="container hero-content">
					<div className="eyebrow"><Bell size={12} /> CITY OPERATIONS</div>
					<h1>Smarter living for a <span>safer, cleaner</span> Mumbai.</h1>
					<p>Monitor live infrastructure, respond to incidents faster, and keep citizens connected to essential municipal services in one digital command center.</p>
					<div className="hero-actions">
						<a className="btn primary" href="#engage">Report an issue <ArrowRight size={14} /></a>
						<a className="btn ghost" href="#services">Explore services</a>
					</div>
					<div className="hero-meta">
						<div><b>18 min</b><span>Average emergency response</span></div>
						<div><b>2.1M</b><span>Residents served daily</span></div>
						<div><b>99.8%</b><span>System uptime</span></div>
					</div>
				</div>
			</header>

			<div className="stats-bar">
				<div className="container stats-grid">
					{stats.map(({ icon, value, label, detail }) => (
						<Stat key={label} icon={icon} value={value} label={label} detail={detail} />
					))}
				</div>
			</div>

			<main>
				<section id="services" className="section">
					<div className="container">
						<div className="section-head">
							<div>
								<div className="kicker">CITY SYSTEMS</div>
								<h2>Connected services <span>for daily life</span></h2>
							</div>
							<p>Monitor utility, transport, and civic services from a single operational view designed for city teams and residents.</p>
						</div>
						<div className="service-toolbar">
							<div className="filters">
								{["All", "Emergency", "Transport", "Utilities", "Civic"].map((filter) => (
									<button key={filter} className={serviceFilter === filter ? "active" : ""} onClick={() => setServiceFilter(filter)}>{filter}</button>
								))}
							</div>
							<div className="search">
								<Search size={13} />
								<input placeholder="Search service" value={search} onChange={(event) => setSearch(event.target.value)} />
							</div>
						</div>
						<div className="service-grid">
							{filteredServices.map(({ name, icon: Icon, category, status, text, color }) => (
								<div key={name} className="service-card">
									<div className="service-top">
										<div className={`service-icon ${color}`}><Icon size={18} /></div>
										<span className={`badge ${color}`}>{status}</span>
									</div>
									<h3>{name}</h3>
									<p>{text}</p>
									<div className="card-foot"><span>{category}</span><ChevronRight size={14} /></div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="infrastructure" className="section infra-section">
					<div className="container">
						<div className="section-head compact">
							<div>
								<div className="kicker">INFRASTRUCTURE</div>
								<h2>Live city <span>performance</span></h2>
							</div>
							<div className="update-time"><Activity size={12} /> Updated 4 mins ago</div>
						</div>
						<div className="dashboard">
							<div className="dash-tabs">
								{Object.keys(dashboardViews).map((tab) => (
									<button key={tab} className={dashboard === tab ? "active" : ""} onClick={() => setDashboard(tab)}>{tab}</button>
								))}
							</div>
							<div className="dash-content">
								<div className="map-panel">
									<div className="map-grid">
										<svg className="map-svg" viewBox="0 0 800 420" preserveAspectRatio="none" aria-hidden="true">
											<g fill="none" stroke="#7ba7a4" strokeLinecap="round" strokeLinejoin="round">
												<path d="M30 140 L200 90 L320 120 L520 90 L760 140" strokeWidth="4" opacity="0.75" />
												<path d="M95 30 L150 180 L110 360" strokeWidth="3.5" opacity="0.68" />
												<path d="M230 35 L280 190 L240 390" strokeWidth="3.5" opacity="0.68" />
												<path d="M410 20 L440 170 L390 360" strokeWidth="3.5" opacity="0.68" />
												<path d="M610 40 L660 180 L620 390" strokeWidth="3.5" opacity="0.68" />
												<path d="M40 250 L180 220 L380 260 L620 230 L760 270" strokeWidth="4" opacity="0.72" />
												<path d="M180 350 L210 260 L330 210 L520 220 L670 310" strokeWidth="4" opacity="0.7" />
											</g>
											<g fill="#dfeceb" opacity="0.45">
												<rect x="84" y="84" width="54" height="28" rx="6" />
												<rect x="154" y="148" width="72" height="34" rx="7" />
												<rect x="298" y="98" width="74" height="30" rx="7" />
												<rect x="466" y="118" width="68" height="32" rx="7" />
												<rect x="520" y="200" width="86" height="34" rx="7" />
												<rect x="266" y="238" width="88" height="30" rx="7" />
												<rect x="370" y="282" width="92" height="32" rx="7" />
												<rect x="590" y="278" width="76" height="32" rx="7" />
											</g>
										</svg>
										<div className="map-lines" />
										<div className="map-pin p1" />
										<div className="map-pin p2" />
										<div className="map-pin p3" />
										<div className="map-pin p4" />
										<div className="map-label">CITY CORE / DISTRIBUTION ZONE</div>
									</div>
								</div>
								<div className="metric-list">
									{dashboardViews[dashboard].map(({ label, value, trend, width, icon: Icon }) => (
										<div key={label} className="metric">
											<span><Icon size={14} /> {label}</span>
											<b>{value} <i>{trend}</i></b>
											<div className="bar"><u style={{ width }} /></div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="alerts" className="section">
					<div className="container">
						<div className="section-head compact">
							<div><div className="kicker">LIVE ALERTS</div><h2>Priority events <span>in motion</span></h2></div>
						</div>
						<div className="alerts-grid">
							{alerts.map((alert) => (
								<div key={alert.title} className={`alert ${alert.level}`}>
									<div className="alert-icon">
										{alert.level === "critical" ? <ShieldAlert size={16} /> : alert.level === "warning" ? <AlertTriangle size={16} /> : <Bell size={16} />}
									</div>
									<div>
										<div className="alert-level">{alert.level.toUpperCase()}</div>
										<h3>{alert.title}</h3>
										<p>{alert.text}</p>
										<small><MapPin size={10} /> {alert.place} • {alert.time}</small>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="section news-section">
					<div className="container">
						<div className="section-head compact">
							<div><div className="kicker">NEWSROOM</div><h2>Latest civic <span>updates</span></h2></div>
						</div>
						<div className="news-grid">
							{news.map(({ title, tag, image }) => (
								<article key={title} className="news-card">
									<div className="news-image" style={{ backgroundImage: `url(${image})` }} />
									<div><span>{tag}</span><h3>{title}</h3><small>Updated today</small></div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section id="engage" className="section engage-section">
					<div className="container">
						<div className="engage-grid">
							<div className="form-card">
								{submitted ? (
									<div className="success">
										<CheckCircle2 size={32} />
										<h3>Complaint received</h3>
										<p>Your request has been logged with the city operations desk.</p>
										<strong>Ticket ID: CMP-2026-1048</strong>
										<button className="btn primary" onClick={() => setSubmitted(false)}>Submit another</button>
									</div>
								) : (
									<>
										<div className="card-title">
											<MessageSquare size={18} />
											<div><h3>Citizen service request</h3><p>Report issues to the civic response team.</p></div>
										</div>
										<form onSubmit={submitComplaint}>
											<div className="two">
												<div><label>Full name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Enter your name" /></label></div>
												<div><label>Contact<input value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} placeholder="Phone or email" /></label></div>
											</div>
											<div className="two">
												<div>
													<label>Issue type
														<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
															<option>Pothole</option><option>Water leakage</option><option>Streetlight outage</option><option>Garbage pickup</option><option>Traffic signal</option>
														</select>
													</label>
												</div>
												<div><label>Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Area / landmark" /></label></div>
											</div>
											<label>Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Tell us what’s happening" /></label>
											<button className="btn primary" type="submit">Submit request <Send size={14} /></button>
										</form>
									</>
								)}
							</div>
							<div className="side-stack">
								<div className="track-card">
									<div className="card-title"><Phone size={18} /><div><h3>Track complaint</h3><p>Check live status updates.</p></div></div>
									<form className="track-form" onSubmit={trackComplaint}>
										<input placeholder="Complaint ID" value={tracking} onChange={(event) => setTracking(event.target.value)} />
										<button className="btn primary" type="submit">Go</button>
									</form>
									{trackResult && <div className="track-result"><span className="dot" /><div><b>{trackResult}</b><small>Status: Assigned to Ward 12 • In progress</small></div></div>}
								</div>
								<div className="survey-card">
									<div className="card-title"><HeartPulse size={18} /><div><h3>Quick city pulse</h3><p>What matters most to you right now?</p></div></div>
									<h3>What should the next civic action prioritize?</h3>
									<div className="survey-options"><button>Water safety</button><button>Road repair</button><button>Waste pickup</button><button>Air quality</button></div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer>
				<div className="container footer-grid">
					<div className="footer-brand">
						<a className="brand" href="#home">
							<span className="brand-mark"><Globe2 size={21} /></span>
							<span><b>SMART</b><em>CITY</em><small>MUMBAI PORTAL</small></span>
						</a>
						<p>Connected intelligence for resilient urban services, responsive governance, and safer community living.</p>
					</div>
					<div><h4>Explore</h4><a href="#services">Services</a><a href="#infrastructure">Infrastructure</a><a href="#alerts">Alerts</a></div>
					<div><h4>Support</h4><a href="#engage">Citizen portal</a><a href="#">Privacy</a><a href="#">Terms</a></div>
					<div><h4>Contact desk</h4><p><Phone size={10} /> +91 22 5555 0101</p><p><MessageSquare size={10} /> helpdesk@smartcity.gov.in</p><p><MapPin size={10} /> Nariman Point, Mumbai</p></div>
				</div>
				<div className="container footer-bottom"><span>© 2026 Mumbai Smart City Mission</span><span>City operations dashboard</span></div>
			</footer>
		</div>
	);
}

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
