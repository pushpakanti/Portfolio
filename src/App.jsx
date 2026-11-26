import { useEffect, useState } from 'react';

const EMAIL = 'pushpakanti05@gmail.com';
const links = {
  github: 'https://github.com/pushpakanti/',
  linkedin: 'https://www.linkedin.com/in/pushpakantiduari/',
  leetcode: 'https://leetcode.com/u/Pushpakanti/',
};

function Arrow({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return <span>{time || '--:--'} <span className="clock-zone">IST</span></span>;
}

const navItems = [['home', '#top', 'Home'], ['about', '#about', 'About'], ['work', '#work', 'Projects'], ['experience', '#experience', 'Experience'], ['contact', '#contact', 'Contact']];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = navItems.map(([key, selector]) => [key, document.querySelector(selector)]).filter(([, section]) => section);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(sections.find(([, section]) => section === visible.target)?.[0] ?? 'home');
    }, { rootMargin: '-18% 0px -60% 0px', threshold: [0, 0.1, 0.35, 0.65] });
    sections.forEach(([, section]) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const navigate = (key) => { setActive(key); setMenuOpen(false); };
  return <header className="topbar">
    <a className="wordmark" href="#top" aria-label="Pushpakanti Duari, home" onClick={() => navigate('home')}><img className="wordmark-mark" src="/pd-logo-mark.png" alt="" /><span className="wordmark-caption">PUSHPAKANTI DUARI</span></a>
    <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">{navItems.map(([key, href, label]) => <a className={active === key ? 'is-active' : ''} href={href} key={key} onClick={() => navigate(key)}>{label}</a>)}</nav>
    <div className="nav-actions"><a className="nav-icon-link" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><ContactIcon type="github" /></a><a className="nav-icon-link" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><ContactIcon type="linkedin" /></a><a className="nav-contact" href="#contact" onClick={() => navigate('contact')}>CONTACT <Arrow diagonal /></a></div>
    <button className="nav-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
  </header>;
}

const nodes = [
  [35, 67], [72, 132], [103, 42], [125, 95], [156, 154], [174, 61], [205, 111],
  [224, 38], [244, 171], [265, 82], [284, 128], [303, 54], [322, 106], [350, 148],
];
const edges = [[0,1],[0,2],[1,3],[2,3],[2,5],[3,4],[3,5],[3,6],[4,6],[4,8],[5,6],[5,7],[6,8],[6,9],[7,9],[7,11],[8,9],[8,10],[9,10],[9,11],[10,12],[10,13],[11,12],[12,13]];

function NeuralVisual() {
  const [active, setActive] = useState(6);
  const selectNearest = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * 380;
    const y = (event.clientY - bounds.top) / bounds.height * 210;
    let closest = 0;
    let distance = Infinity;
    nodes.forEach(([nx, ny], index) => {
      const next = Math.hypot(nx - x, ny - y);
      if (next < distance) { closest = index; distance = next; }
    });
    setActive(closest);
  };
  const advance = () => setActive((value) => (value + 1) % nodes.length);
  return <div className="neural-panel" onPointerMove={selectNearest} onKeyDown={(event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); advance(); }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); setActive((value) => (value - 1 + nodes.length) % nodes.length); }
  }} tabIndex={0} role="group" aria-label="Interactive neural network visualization. Move the pointer or use the arrow keys to inspect nodes.">
    <div className="neural-head"><span>FIG 01 / INFERENCE GRAPH</span><span className="neural-live"><i /> LIVE</span></div>
    <svg className="neural-svg" viewBox="0 0 380 210" aria-hidden="true">
      <g className="neural-edges">{edges.map(([from, to], index) => <line key={index} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} className={from === active || to === active ? 'edge edge-active' : 'edge'} />)}</g>
      <g className="neural-node-set">{nodes.map(([x, y], index) => <g key={index} className={index === active ? 'node active-node' : 'node'}><circle className="node-halo" cx={x} cy={y} r="13"/><circle className="node-core" cx={x} cy={y} r={index === active ? 5.5 : 3}/></g>)}</g>
      <circle className="neural-ring" cx={nodes[active][0]} cy={nodes[active][1]} r="17" />
    </svg>
    <div className="neural-foot"><span>LATENT SPACE / 14 NODES</span><button type="button" onClick={advance}>STEP SIGNAL <Arrow diagonal /></button></div>
    <span className="neural-coordinate">X {String(nodes[active][0]).padStart(3, '0')} / Y {String(nodes[active][1]).padStart(3, '0')}</span>
  </div>;
}

function Hero() {
  return <section className="hero indexed" id="top" data-index="01" aria-labelledby="hero-title">
    <div className="hero-grid-mark" aria-hidden="true">0101<br />1010<br />0011<br />0100</div>
    <div className="hero-kicker"><span>BASED IN WEST BENGAL, INDIA</span></div>
    <div className="hero-main">
      <div className="hero-copy">
        <p className="hero-role"><span className="role-line" /> DATA SCIENCE <b>/</b> AI/ML <b>/</b> SOFTWARE ENGINEERING</p>
        <h1 id="hero-title" className="hero-name"><span className="hero-name-line">Pushpakanti</span><span className="hero-name-line">Duari<span className="name-period">.</span></span></h1>
        <p className="hero-tagline">I build systems that turn complex ideas into useful intelligence.</p>
        <p className="hero-intro">Exploring machine learning, intelligent systems, and the software that makes them useful in the real world.</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">EXPLORE PROJECTS <Arrow /></a><a className="button button-secondary" href="#contact">CONTACT ME <Arrow diagonal /></a></div>
      </div>
      <div className="hero-lab" aria-label="Portrait and interactive machine learning visualization">
        <div className="portrait-stage"><img className="portrait-image" src="/pushpakanti-portrait.jpg" alt="Portrait of Pushpakanti Duari" fetchPriority="high" /></div>
        <NeuralVisual />
        <div className="lab-readout">
          <div className="focus-heading"><span className="readout-key">LOCAL TIME</span><b className="focus-time"><Clock /></b></div>
          <span className="readout-rule" />
          <span className="readout-key">CURRENT FOCUS</span>
          <ol className="focus-list">
            <li><span>01</span><span>AI / Machine Learning</span></li>
            <li><span>02</span><span>Software Development</span></li>
            <li><span>03</span><span>AI Agents &amp; Automation</span></li>
          </ol>
        </div>
      </div>
    </div>
    <div className="hero-bottom"><span>SCROLL TO EXPLORE <b>↓</b></span><span>01 <i>/ 06</i></span></div>
  </section>;
}

function SectionHeading({ number, label, title, id }) {
  return <div className="section-heading" id={id}>
    <div className="section-code"><span>{number}</span><i />{label}</div>
    {title && <h2>{title}</h2>}
  </div>;
}

function About() {
  return <section className="about section-pad reveal indexed" id="about" data-index="02" aria-labelledby="about-title">
    <SectionHeading number="02" label="ABOUT / THE BUILDER" />
    <div className="about-layout">
      <div className="about-lede"><h2 id="about-title">Curiosity starts<br />the <em>experiment.</em></h2><p>I'm Pushpakanti, a Computer Science student specializing in Data Science. I enjoy building practical applications, experimenting with machine learning, exploring intelligent systems, and solving real-world problems.</p><p className="about-philosophy">Curiosity starts the experiment. Engineering makes it useful.</p></div>
      <div className="about-profile education-panel">
        <div className="about-profile-label"><span>EDUCATION</span><i>ACADEMIC JOURNEY / 2021&#8212;2027</i></div>
        <div className="education-timeline">
          <article className="education-entry education-entry-primary"><div className="education-marker"><span>01</span><i /></div><div className="education-entry-body"><div className="education-entry-top"><span>UNDERGRADUATE</span><b>2023 &#8212; 2027</b></div><h3>The Neotia University</h3><p>B.Tech in Computer Science &amp; Engineering<br />Specialization: Data Science</p><strong className="education-score">8.80 <small>/ 10 CGPA</small></strong><span className="education-note">UPTO 6TH SEMESTER</span></div></article>
          <article className="education-entry"><div className="education-marker"><span>02</span><i /></div><div className="education-entry-body"><div className="education-entry-top"><span>HIGHER SECONDARY / CLASS 12</span><b>2023</b></div><h3>Dubda Deshapran Birendra Vidyapith</h3><p>Board: WBCHSE</p><strong className="education-score">76<small>%</small></strong></div></article>
          <article className="education-entry"><div className="education-marker"><span>03</span><i /></div><div className="education-entry-body"><div className="education-entry-top"><span>SECONDARY / CLASS 10</span><b>2021</b></div><h3>Dubda Deshapran Birendra Vidyapith</h3><p>Board: WBBSE</p><strong className="education-score">87<small>%</small></strong></div></article>
        </div>
        <a className="workspace-link" href="/pushpakanti-duari-resume.pdf" target="_blank" rel="noreferrer">OPEN FULL CV <Arrow diagonal /></a>
      </div>
    </div>
  </section>;
}

function FinanceGraphic() {
  return <div className="project-art finance-art" aria-hidden="true">
    <div className="art-caption"><span>FINMATE / 001</span><span>PERSONAL FINANCE SYSTEM</span></div>
    <div className="finance-modules"><span><i>01</i> INCOME</span><span><i>02</i> EXPENSES</span><span><i>03</i> SAVINGS GOALS</span><span><i>04</i> REPORTS</span></div>
    <div className="finance-main"><div className="finance-balance"><span>MONTHLY OVERVIEW</span><b>One clear<br />picture.</b><small>Income · Outflow · Intent</small></div><div className="finance-widget"><div className="widget-top"><span>SPENDING PATTERN</span><span>OVERVIEW</span></div><svg viewBox="0 0 500 150"><path className="graph-grid" d="M0 30H500M0 75H500M0 120H500"/><path className="graph-area" d="M0 119 C40 102 55 68 90 76 S140 116 180 93 S240 41 280 62 S340 98 375 55 S430 94 460 31 S485 27 500 15 V150 H0Z"/><path className="graph-line" d="M0 119 C40 102 55 68 90 76 S140 116 180 93 S240 41 280 62 S340 98 375 55 S430 94 460 31 S485 27 500 15"/><circle cx="375" cy="55" r="4" className="graph-dot"/></svg><div className="graph-axis"><span>PERIOD START</span><span>PERIOD END</span></div></div></div>
    <div className="finance-bottom"><span>AI COPILOT / ONLINE</span><span>GROQ + GEMINI / LANGGRAPH</span><span>01 — 04</span></div>
  </div>;
}

function VisionGraphic() {
  return <div className="project-art vision-art" aria-hidden="true">
    <div className="art-caption"><span>SMARTVISION / 002</span><span>OBJECT SEARCH SYSTEM</span></div>
    <div className="vision-screen"><div className="screen-top"><span>FRAME_0042.JPG</span><span>LIVE INFERENCE <i>●</i></span></div><div className="vision-frame"><div className="frame-grid"/><div className="vision-object"><i/><b>PERSON · 0.94</b><span/></div><div className="target-reticle">＋</div><div className="vision-axes">X 144 <b>/</b> Y 082</div></div><div className="screen-bottom"><span>DETECTION / YOLOV11</span><span>01 OBJECT FOUND</span></div></div>
    <div className="vision-bottom"><span>METADATA FILTER</span><b>PERSON <i>×</i></b><span>EXPORT JSON ↗</span></div>
  </div>;
}

const projects = [
  { no: '01', name: 'FinMate Copilot', kind: 'AI FINANCE AGENT', context: '', stack: ['FastAPI', 'MySQL', 'LangGraph', 'Groq API', 'Gemini API'], description: 'A personal finance platform for tracking income, expenses, budgets, savings goals, and generating reports. An AI agent turns the numbers into conversational guidance and useful insights.', href: 'https://github.com/pushpakanti/FinMate-Copilot-Your-AI-Financial-Assistant-Agent', live: 'https://ai-financial-assistant-qr33.vercel.app', art: FinanceGraphic },
  { no: '02', name: 'SmartVision', kind: 'COMPUTER VISION / IMAGE SEARCH', context: '', stack: ['Python', 'YOLOv11', 'OpenCV', 'Streamlit'], description: 'A real-time object detection and image-based search tool. Metadata filtering, bounding box visualization, and JSON/ZIP export make image analysis easier to manage.', href: 'https://github.com/pushpakanti/SmartVision-Object-Search-Application', art: VisionGraphic },
];

function Work() {
  return <section className="work section-pad reveal indexed" id="work" data-index="03" aria-labelledby="work-title">
    <div className="work-top"><SectionHeading number="03" label="MY PROOF OF WORKS" id="work-title" title={<>Ideas into <em>products.</em></>} /></div>
    <div className="project-list">{projects.map((project) => {
      const Art = project.art;
      return <article className={`project project-${project.no}`} key={project.no}>
        <div className="project-visual-wrap"><a className="project-visual" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source on GitHub`}><Art /><span className="art-open">OPEN REPOSITORY <Arrow diagonal /></span></a></div>
        <div className="project-details"><div className="project-overline"><span>{project.no} / {project.kind}</span>{project.context && <span>{project.context}</span>}</div><h3><a href={project.href} target="_blank" rel="noreferrer">{project.name}<Arrow diagonal /></a></h3><p>{project.description}</p><div className="tech-list" aria-label="Technologies">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="project-actions"><a className="project-repo" href={project.href} target="_blank" rel="noreferrer">VIEW PROJECT SOURCE <Arrow diagonal /></a>{project.live && <a className="project-demo" href={project.live} target="_blank" rel="noreferrer">LIVE DEMO &#8599;</a>}</div></div>
      </article>;
    })}</div>
    <div className="more-work"><span>MORE EXPERIMENTS TO COME</span><span>OPEN SOURCE <i>·</i> ITERATIVE <i>·</i> MADE TO BE USED</span></div>
  </section>;
}

function Research() {
  return <section className="research section-pad reveal indexed" id="experience" data-index="04" aria-labelledby="research-title">
    <SectionHeading number="04" label="RESEARCH / CLIMATE SYSTEMS" />
    <div className="research-layout">
      <div className="research-heading"><span className="micro-label">ARMY INSTITUTE OF MANAGEMENT KOLKATA / JUN&#8212;SEP 2025</span><h2 id="research-title">Finding Climate<br /><em>Uncertainty</em></h2><span className="research-role">RESEARCH INTERN <i>&#183;</i> KOLKATA, INDIA</span></div>
      <div className="research-copy"><p>I analyzed 50,000+ monthly temperature records across 3,400+ cities and 260+ years. Decision Tree, Random Forest, and XGBoost models were evaluated for climate uncertainty classification.</p><p>XGBoost performed best at capturing non-linear seasonal and geographic patterns. This work became a peer-reviewed research paper presented at the 19th ISDSI-G Conference at IMI Kolkata.</p><a className="research-paper-link" href="https://doi.org/10.64558/bllp/645976nnofrf" target="_blank" rel="noreferrer">VIEW PUBLISHED PAPER <Arrow diagonal /></a><div className="model-track"><span>MODEL EVALUATION</span><div><b>DT</b><b>RF</b><b className="model-best">XGB <i>BEST FIT</i></b></div></div></div>
    </div>
    <div className="research-stats"><div><b>50K<span>+</span></b><small>MONTHLY RECORDS</small></div><div><b>3,400<span>+</span></b><small>CITIES OBSERVED</small></div><div><b>260<span>+</span></b><small>YEARS OF DATA</small></div><a href="#contact">DISCUSS THE RESEARCH <Arrow diagonal /></a></div>
    <div className="conference-note"><span>19TH ISDSI-G CONFERENCE &#183; IMI KOLKATA</span></div>
  </section>;
}

function TechnologyLogo({ technology }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!technology.logo);
  const colors = {
    Python: ['#3776AB', '#FFD43B'], Java: ['#E76F00', '#5382A1'], TensorFlow: ['#FF6F00', '#FF6F00'], PyTorch: ['#EE4C2C', '#EE4C2C'],
    'Scikit-learn': ['#F7931E', '#3499CD'], Pandas: ['#150458', '#E70488'], NumPy: ['#4DABCF', '#4D77CF'], OpenCV: ['#5C3EE8', '#E54B4B'],
    YOLO: ['#00A2FF', '#00A2FF'], LangChain: ['#1C3C3C', '#72B8A4'], LangGraph: ['#B6F36A', '#B6F36A'], FastAPI: ['#009688', '#009688'],
    Docker: ['#2496ED', '#2496ED'], Streamlit: ['#FF4B4B', '#FF4B4B'], SQL: ['#D3A62A', '#D3A62A'], Git: ['#F05032', '#F05032'],
    GitHub: ['#F1F1E9', '#F1F1E9'], Linux: ['#FCC624', '#FCC624'], 'Jupyter Notebook': ['#F37626', '#9E4B99'], 'VS Code': ['#007ACC', '#007ACC'],
    'Google Colab': ['#F9AB00', '#4285F4'],
  }[technology.name] || ['#B6F36A', '#B6F36A'];
  const [primary, secondary] = colors;
  const mark = {
    Python: <><path fill={primary} d="M32 7c-13 0-14 6-14 12v6h16v3H11C4 28 1 34 1 41s5 12 12 12h7v-9c0-7 6-13 13-13h13V19c0-8-5-12-14-12Zm-8 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/><path fill={secondary} d="M32 57c13 0 14-6 14-12v-6H30v-3h23c7 0 10-6 10-13S58 11 51 11h-7v9c0 7-6 13-13 13H18v12c0 8 5 12 14 12Zm8-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/></>,
    Java: <><path fill="none" stroke={secondary} strokeWidth="3" strokeLinecap="round" d="M38 8c-10 7 8 8-3 17m-9-13c-8 6 7 7-2 13"/><path fill={primary} d="M13 35h38l-4 16c-1 4-5 7-10 7H27c-5 0-9-3-10-7l-4-16Zm-5-3h45v5H8zm46 4h5c1 0 2 1 2 3 0 8-6 12-14 12l1-5c5 0 8-3 8-7h-3v-3Z"/></>,
    TensorFlow: <><g fill={primary}><path d="m32 5 23 13-7 4-12-7v12l-7 4V15l-12 7-7-4L32 5Zm0 28 7-4v14l12-7v8L32 57 13 46v-8l12 7V31l7 4Z"/><path d="m40 22 8-5v9l-8 5v-9Zm-16 8-8-5v-8l8 5v8Z"/></g></>,
    PyTorch: <><path fill={primary} d="M42 7 29 20l7 7 13-13L42 7Zm-4 17c-10-2-19 4-21 13-3 9 3 18 12 20 9 3 18-3 20-12 2-7-1-14-7-18l-6 6c4 2 6 6 5 10-1 5-6 8-11 7-5-1-8-6-7-11 1-4 4-7 8-7l7-8Z"/><circle cx="52" cy="10" r="4" fill="#EE4C2C"/></>,
    'Scikit-learn': <><path fill={primary} d="M32 5 56 18 32 31 8 18 32 5Zm-24 18 20 11v24L8 47V23Z"/><path fill={secondary} d="m36 34 20-11v24L36 58V34Z"/><path fill="#F1F1E9" d="m32 33 4-2v27l-4 2V33Z" opacity=".9"/></>,
    Pandas: <><path fill={primary} d="M20 6h6v20h-6zm0 31h6v21h-6zM38 6h6v20h-6zm0 31h6v21h-6z"/><path fill={secondary} d="M29 25h6v14h-6z"/><circle cx="23" cy="31" r="4" fill="#F1F1E9"/><circle cx="41" cy="31" r="4" fill="#F1F1E9"/></>,
    NumPy: <><path fill={primary} d="M9 18 32 5l23 13-23 13L9 18Zm0 8 19 11v22L9 48V26Z"/><path fill={secondary} d="m36 37 19-11v22L36 59V37Z"/><path fill="#F1F1E9" d="m32 34 3-2v27l-3 2V34Z"/></>,
    OpenCV: <><circle cx="23" cy="32" r="14" fill="none" stroke={primary} strokeWidth="8"/><circle cx="43" cy="32" r="14" fill="none" stroke={secondary} strokeWidth="8" opacity=".95"/><path fill="#101310" d="M32 22a14 14 0 0 1 0 20 14 14 0 0 1 0-20Z"/></>,
    YOLO: <><path fill={primary} d="M18 14h28l12 18-12 18H18L6 32l12-18Zm4 8-7 10 7 10h20l7-10-7-10H22Z"/><circle cx="32" cy="32" r="6" fill={primary}/></>,
    LangChain: <><path d="m18 18 9-9a8 8 0 0 1 11 11l-8 8-4-4 8-8a2 2 0 0 0-3-3l-9 9-4-4Zm28 28-9 9a8 8 0 0 1-11-11l8-8 4 4-8 8a2 2 0 1 0 3 3l9-9 4 4ZM21 35a7 7 0 0 1 0-10l4-4 4 4-4 4a2 2 0 0 0 3 3l4-4 4 4-4 4a7 7 0 0 1-11 0Zm22-6a7 7 0 0 1 0 10l-4 4-4-4 4-4a2 2 0 0 0-3-3l-4 4-4-4 4-4a7 7 0 0 1 11 0Z" fill={primary}/></>,
    LangGraph: <><g fill="none" stroke={primary} strokeWidth="3"><path d="M16 18 32 32 49 16M32 32l-17 17m17-17 19 18"/></g><g fill={primary}><circle cx="16" cy="17" r="7"/><circle cx="49" cy="15" r="7"/><circle cx="32" cy="32" r="8"/><circle cx="15" cy="50" r="7"/><circle cx="51" cy="50" r="7"/></g></>,
    FastAPI: <><path fill={primary} d="M32 4 59 52H5L32 4Zm0 16L19 44h26L32 20Z"/><path fill="#101310" d="M34 27h7L29 43l2-11h-7l10-13-1 8Z"/></>,
    Docker: <><path fill={primary} d="M8 30h9v8H8zm11 0h9v8h-9zm11 0h9v8h-9zm-11-10h9v8h-9zm11 0h9v8h-9zm11 10h9v8h-9zM8 41h42c-2 11-10 17-22 17S9 52 8 41Zm42-11c4-4 8-4 12-2-1 4-4 7-10 7h-2v-5Z"/><path fill={primary} d="M30 9h9v8h-9z"/></>,
    Streamlit: <><path fill={primary} d="m9 13 23 13 23-13v11L32 38 9 24V13Zm0 21 23 13 23-13v11L32 59 9 45V34Z"/></>,
    SQL: <><text x="32" y="39" fill={primary} fontFamily="Arial, sans-serif" fontSize="21" fontWeight="700" letterSpacing="-1" textAnchor="middle">SQL</text><path d="M14 46h36" fill="none" stroke={primary} strokeWidth="3"/></>,
    Git: <><path fill={primary} d="M59 28 36 5a6 6 0 0 0-8 0l-5 5 10 10a7 7 0 0 1 8 9 7 7 0 0 1-9 4L23 23v22a7 7 0 1 1-6 0V22a7 7 0 0 1-2-11L8 16a6 6 0 0 0 0 8l24 24a6 6 0 0 0 8 0l19-19a6 6 0 0 0 0-1Z"/></>,
    GitHub: <><path fill={primary} d="M32 5a27 27 0 0 0-8.5 52.6c1.3.2 1.8-.6 1.8-1.3v-5c-7.3 1.6-8.8-3.1-8.8-3.1-1.2-3-3-3.8-3-3.8-2.4-1.7.2-1.7.2-1.7 2.7.2 4.1 2.8 4.1 2.8 2.4 4.1 6.2 2.9 7.7 2.2.2-1.7 1-2.9 1.8-3.6-5.8-.7-11.9-2.9-11.9-12.9 0-2.9 1-5.2 2.7-7.1-.3-.7-1.2-3.4.3-7 0 0 2.2-.7 7.3 2.7a25 25 0 0 1 13.2 0c5.1-3.4 7.3-2.7 7.3-2.7 1.5 3.6.6 6.3.3 7 1.7 1.9 2.7 4.2 2.7 7.1 0 10-6.1 12.2-12 12.8 1 .9 1.9 2.5 1.9 5v7.3c0 .7.5 1.5 1.8 1.3A27 27 0 0 0 32 5Z"/></>,
    Linux: <><path fill={primary} d="M32 5c-10 0-13 10-13 21-7 5-10 15-7 23 2 5 7 7 12 4l8-5 8 5c5 3 10 1 12-4 3-8 0-18-7-23C45 15 42 5 32 5Z"/><circle cx="26" cy="25" r="2" fill="#101310"/><circle cx="38" cy="25" r="2" fill="#101310"/><path d="m28 34 4 3 4-3" fill="none" stroke="#101310" strokeWidth="2"/></>,
    'Jupyter Notebook': <><ellipse cx="32" cy="32" rx="25" ry="11" fill="none" stroke={secondary} strokeWidth="4" transform="rotate(-28 32 32)"/><ellipse cx="32" cy="32" rx="25" ry="11" fill="none" stroke={primary} strokeWidth="4" transform="rotate(28 32 32)"/><circle cx="32" cy="32" r="5" fill="#F1F1E9"/><circle cx="14" cy="15" r="4" fill={primary}/><circle cx="51" cy="49" r="4" fill={secondary}/></>,
    'VS Code': <><path fill={primary} d="M48 7 25 28 13 19 6 23v18l7 4 12-9 23 21 10-5V12L48 7ZM15 32l6-5 6 5-6 5-6-5Z"/><path fill="#20A6F7" d="m32 32 20-16v32L32 32Z"/></>,
    'Google Colab': <><path fill="#F9AB00" d="M17 16a20 20 0 0 0 0 32l8-8a9 9 0 0 1 0-16l-8-8Z"/><path fill="#E8710A" d="m17 16 8 8 8 8-8 8-8 8 8 8 8-8 8-8-8-8-8-8-8-8Z"/><path fill="#4285F4" d="M47 16a20 20 0 0 1 0 32l-8-8a9 9 0 0 0 0-16l8-8Z"/></>,
  }[technology.name];
  return <span className="technology-logo" aria-hidden="true">
    <svg className={loaded ? 'technology-logo-fallback is-hidden' : 'technology-logo-fallback'} viewBox="0 0 64 64" focusable="false">{mark}</svg>
    {technology.logo && !failed && <img className={loaded ? 'is-loaded' : ''} src={`/tech-icons/${technology.logoFile || `${technology.logo}.svg`}`} alt="" loading="lazy" decoding="async" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
  </span>;
}

const concepts = [
  { name: 'Data Structures & Algorithms', short: 'DSA', icon: 'algorithm' },
  { name: 'OOP', short: 'OOP', icon: 'oop' },
  { name: 'DBMS', short: 'DBMS', icon: 'database' },
  { name: 'Operating Systems', short: 'OS', icon: 'system' },
  { name: 'Machine Learning', short: 'ML', icon: 'learning' },
];

function ConceptGlyph({ kind }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return <svg className="concept-glyph" viewBox="0 0 32 32" aria-hidden="true" {...shared}>
    {kind === 'algorithm' && <><path d="M7 8h6l4 8 8-6M17 16l8 8M7 24h6l4-8"/><circle cx="7" cy="8" r="2"/><circle cx="25" cy="10" r="2"/><circle cx="25" cy="24" r="2"/><circle cx="7" cy="24" r="2"/><circle cx="17" cy="16" r="2"/></>}
    {kind === 'oop' && <><rect x="7" y="7" width="18" height="18" rx="2"/><path d="M11 12h10M11 16h6M11 20h8M16 4v3M16 25v3"/></>}
    {kind === 'database' && <><ellipse cx="16" cy="8" rx="9" ry="4"/><path d="M7 8v16c0 2.2 4 4 9 4s9-1.8 9-4V8M7 16c0 2.2 4 4 9 4s9-1.8 9-4"/></>}
    {kind === 'system' && <><rect x="8" y="8" width="16" height="16" rx="2"/><path d="M12 13h8v6h-8zM12 4v4m8-4v4M12 24v4m8-4v4M4 12h4m-4 8h4m16-8h4m-4 8h4"/></>}
    {kind === 'learning' && <><path d="m6 11 10-6 10 6v10l-10 6-10-6V11Z"/><path d="m6 11 10 6 10-6M16 17v10M11 8l10 6M21 8l-10 6"/><circle cx="6" cy="11" r="1.5"/><circle cx="26" cy="11" r="1.5"/><circle cx="16" cy="5" r="1.5"/></>}
  </svg>;
}

function ConceptsOrbit() {
  const [active, setActive] = useState(null);
  const positions = ['orbit-top', 'orbit-right', 'orbit-bottom-right', 'orbit-bottom-left', 'orbit-left'];
  return <div className="concept-orbit" onMouseLeave={() => setActive(null)} aria-label="Interactive visualization of five core computer science concepts">
    <svg className="concept-connections" viewBox="0 0 600 440" preserveAspectRatio="none" aria-hidden="true">
      {[[300,220,300,45],[300,220,496,145],[300,220,421,365],[300,220,179,365],[300,220,104,145]].map(([x1,y1,x2,y2], i) => <line className={active === i ? 'concept-link is-active' : 'concept-link'} key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>) }
      <circle cx="300" cy="220" r="96" className="concept-orbit-ring"/>
      <circle cx="300" cy="220" r="154" className="concept-orbit-ring concept-orbit-ring-outer"/>
    </svg>
    <div className="concept-center"><span>FIELD NOTES / 05</span><strong>CORE <br/> CONCEPTS</strong><i>FOUNDATION LAYER</i></div>
    {concepts.map((concept, index) => <button key={concept.name} className={`concept-node ${positions[index]}${active === index ? ' is-active' : ''}`} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} aria-label={concept.name} aria-pressed={active === index}>
      <span className="concept-node-index">0{index + 1}</span><ConceptGlyph kind={concept.icon}/><span className="concept-node-name">{concept.name}</span>
    </button>)}
  </div>;
}

function Toolkit() {
  const [activeFilter, setActiveFilter] = useState('all');
  const groups = [
    { key: 'programming', filter: 'Programming', label: 'PROGRAMMING LANGUAGES', technologies: [
      { name: 'Python', logo: 'python', mark: 'Py', description: 'General-purpose language used for data work and automation.' },
      { name: 'Java', logo: 'java', mark: 'J', description: 'Object-oriented language for building reliable applications.' },
    ] },
    { key: 'ai', filter: 'AI & Machine Learning', label: 'AI & MACHINE LEARNING', technologies: [
      { name: 'TensorFlow', logo: 'tensorflow', mark: 'TF', description: 'Framework for training and deploying machine-learning models.' },
      { name: 'PyTorch', logo: 'pytorch', mark: 'PT', description: 'Deep-learning framework with tensor and model tools.' },
      { name: 'Scikit-learn', logo: 'scikitlearn', mark: 'sk', description: 'Python toolkit for classical machine-learning workflows.' },
      { name: 'Pandas', logo: 'pandas', mark: 'Pd', description: 'DataFrames for cleaning, transforming, and analyzing data.' },
      { name: 'NumPy', logo: 'numpy', mark: 'n', description: 'Array computing and numerical operations for Python.' },
      { name: 'OpenCV', logo: 'opencv', mark: 'CV', description: 'Computer-vision tools for image and video processing.' },
      { name: 'YOLO', logo: 'yolo', logoFile: 'yolo-official.png', mark: 'YOLO', description: 'Real-time object detection model family.' },
      { name: 'LangChain', logo: 'langchain', logoFile: 'langchain-supplied.svg', mark: 'LC', description: 'Framework for connecting language models with tools and data.' },
      { name: 'LangGraph', logo: 'langgraph', logoFile: 'langgraph.png', mark: 'LG', description: 'Graph-based orchestration for language-model workflows.' },
    ] },
    { key: 'backend', filter: 'Backend & Deployment', label: 'BACKEND & DEPLOYMENT', technologies: [
      { name: 'FastAPI', logo: 'fastapi', mark: 'API', description: 'Python framework for building web APIs.' },
      { name: 'Docker', logo: 'docker', mark: 'DK', description: 'Container platform for packaging applications.' },
      { name: 'Streamlit', logo: 'streamlit', mark: 'ST', description: 'Python framework for building interactive data apps.' },
    ] },
    { key: 'databases', filter: 'Databases', label: 'DATABASES', technologies: [
      { name: 'SQL', mark: 'SQL', description: 'Language for querying and managing relational data.' },
    ] },
    { key: 'tools', filter: 'Developer Tools', label: 'DEVELOPER TOOLS', technologies: [
      { name: 'Git', logo: 'git', mark: 'Git', description: 'Version control for tracking and collaborating on code.' },
      { name: 'GitHub', logo: 'github', mark: 'GH', description: 'Platform for hosting code and collaborating.' },
      { name: 'Linux', logo: 'linux', mark: 'LX', description: 'Open-source operating-system environment.' },
      { name: 'Jupyter Notebook', logo: 'jupyter', mark: 'JN', description: 'Interactive notebooks for code, notes, and data.' },
      { name: 'VS Code', logo: 'vscode', mark: 'VS', description: 'Code editor with extensions and debugging tools.' },
      { name: 'Google Colab', logo: 'googlecolab', mark: 'GC', description: 'Hosted notebooks for writing and running Python.' },
    ] },
    { key: 'concepts', filter: 'Core Concepts', label: 'CORE CONCEPTS', technologies: concepts },
  ];
  const filters = [{ key: 'all', label: 'All Stack' }, ...groups.map(({ key, filter }) => ({ key, label: filter }))];
  const visibleGroups = groups.map((group, index) => ({ ...group, number: index + 1, visible: activeFilter === 'all' || activeFilter === group.key ? group.technologies : [] })).filter((group) => group.visible.length);
  const visibleCount = visibleGroups.reduce((sum, group) => sum + group.visible.length, 0);
  return <section className="toolkit section-pad reveal indexed" id="toolkit" data-index="05" aria-labelledby="toolkit-title">
    <SectionHeading number="05" label="TECHNICAL SKILLS" />
    <div className="ecosystem-heading"><span className="micro-label">TOOLS / FRAMEWORKS / TECHNOLOGIES</span><h2 id="toolkit-title">TECHNICAL<span className="ecosystem-mobile-break"><br /></span>{' '}ECOSYSTEM &amp;<br /><em>CAPABILITIES.</em></h2></div>
    <div className="ecosystem-filterbar"><div className="ecosystem-filters" role="group" aria-label="Filter technologies by category">{filters.map((filter) => <button className={activeFilter === filter.key ? 'ecosystem-filter is-active' : 'ecosystem-filter'} key={filter.key} type="button" aria-pressed={activeFilter === filter.key} onClick={() => setActiveFilter(filter.key)}>{filter.label}</button>)}</div><span className="ecosystem-count" aria-live="polite">{String(visibleCount).padStart(2, '0')} TECHNOLOGIES</span></div>
    <div className="ecosystem-groups">{visibleGroups.map((group) => <section className={`${group.key === 'ai' ? 'ecosystem-category ecosystem-category-featured' : 'ecosystem-category'}${group.key === 'concepts' ? ' ecosystem-category-concepts' : ''}`} key={group.key} aria-labelledby={`ecosystem-${group.key}`}><div className="ecosystem-category-heading"><span>{String(group.number).padStart(2, '0')}</span><h3 id={`ecosystem-${group.key}`}>{group.label}</h3><i /></div>{group.key === 'concepts' ? <ConceptsOrbit /> : <div className="technology-grid">{group.visible.map((technology) => <article className="technology-card" key={technology.name}><TechnologyLogo technology={technology} /><h4>{technology.name}</h4><p>{technology.description}</p></article>)}</div>}</section>)}</div>
    <div className="beyond-code" aria-labelledby="beyond-title"><div className="beyond-heading"><div><span className="micro-label">MILESTONES / RECOGNITION / PRACTICE</span><h2 id="beyond-title">BEYOND THE <span>CODE</span></h2></div><p>Selected milestones, recognition &amp; problem-solving.</p></div><div className="achievement-grid">
      <article className="achievement achievement-leetcode"><span className="achievement-index">01 / PRACTICE</span><div className="achievement-lede"><strong>200<span>+</span></strong><div><h3>LeetCode Problems Solved</h3><p>Problem-solving practice.</p></div></div><a href={links.leetcode} target="_blank" rel="noreferrer">LEETCODE PROFILE <Arrow diagonal /></a></article>
      <article className="achievement achievement-recognition"><span className="achievement-index">02 / RECOGNITION</span><h3>Honourable Mention</h3><p>Award at the 19th ISDSI-G Conference, IMI Kolkata.</p></article>
      <article className="achievement achievement-hackathon"><span className="achievement-index">03 / PARTICIPATION</span><h3>Smart India<br />Hackathon</h3><div className="achievement-year">2025 <span>/ PARTICIPATION</span></div></article>
      <article className="achievement achievement-certification"><span className="achievement-index">04 / CERTIFICATION</span><h3>AWS Workshop<br />Certification</h3><p>DataSpace Academy certification.</p></article>
    </div></div>
  </section>;
}

function ContactIcon({ type }) {
  const paths = {
    linkedin: <><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M8 10v6M8 8v.01M11 16v-3.2a2.8 2.8 0 0 1 5.6 0V16M11 10v6"/></>,
    github: <><path d="M12 3a9 9 0 0 0-2.8 17.55c.42.08.57-.18.57-.4v-1.42c-2.32.5-2.81-1-2.81-1-.38-.97-.93-1.23-.93-1.23-.76-.52.06-.51.06-.51.84.06 1.29.86 1.29.86.75 1.29 1.96.92 2.44.7.08-.54.29-.92.53-1.13-1.85-.21-3.8-.93-3.8-4.13 0-.91.32-1.65.85-2.23-.09-.21-.37-1.06.08-2.2 0 0 .7-.22 2.3.85a7.9 7.9 0 0 1 4.18 0c1.6-1.07 2.3-.85 2.3-.85.45 1.14.17 1.99.08 2.2.53.58.85 1.32.85 2.23 0 3.21-1.95 3.91-3.81 4.12.3.26.56.77.56 1.56v1.75c0 .22.15.48.57.4A9 9 0 0 0 12 3Z"/></>,
    phone: <><path d="M6.7 4.8 9 4l1.4 3.5-1.7 1.1a10.3 10.3 0 0 0 4.7 4.7l1.1-1.7L18 13l-.8 2.3c-.3.9-1.2 1.5-2.2 1.4A11.7 11.7 0 0 1 7.3 9c-.1-1 .5-1.9 1.4-2.2Z"/></>,
  };
  return <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { window.location.href = `mailto:${EMAIL}`; }
  }
  return <section className="contact indexed" id="contact" data-index="06" aria-labelledby="contact-title">
    <div className="contact-top"><span>06 / OPEN CHANNEL</span><span>LET’S MAKE SOMETHING MATTER</span><span>KOLKATA <i>·</i> IST</span></div>
    <div className="contact-main"><div className="contact-copy"><span className="micro-label">GOOD PROBLEMS ARE BETTER SHARED</span><h2 id="contact-title">Have an interesting<br />problem? <em>Let’s build</em><br />something.</h2></div><div className="contact-action"><a className="contact-mail" href={`mailto:${EMAIL}?subject=An%20interesting%20problem`}><span>{EMAIL}</span><Arrow diagonal /></a><button className="copy-email" type="button" onClick={copyEmail}>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}<span>{copied ? '✓' : '+'}</span></button><div className="social-links"><a href={links.linkedin} target="_blank" rel="noreferrer"><ContactIcon type="linkedin" /><span>LINKEDIN</span><Arrow diagonal /></a><a href={links.github} target="_blank" rel="noreferrer"><ContactIcon type="github" /><span>GITHUB</span><Arrow diagonal /></a><a href="tel:+918116915547"><ContactIcon type="phone" /><span>+91 81169 15547</span><Arrow diagonal /></a></div></div></div>
    <div className="contact-bottom"><span>OPEN TO INTERESTING PROBLEMS & COLLABORATION</span><span>BUILD WITH INTENT <b>↗</b></span></div>
  </section>;
}

function Footer() {
  return <footer className="footer"><a className="footer-name" href="#top">PUSHPAKANTI DUARI<span> / PERSONAL LAB</span></a><span>© 2026 · BUILT WITH CURIOSITY</span><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>;
}

function ProgressIndex() {
  const [active, setActive] = useState('01');
  useEffect(() => {
    const sections = [...document.querySelectorAll('.indexed')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.dataset.index);
    }, { rootMargin: '-18% 0px -60% 0px', threshold: [0, 0.1, 0.35, 0.65] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="progress-index" aria-label={`Section ${active}`}><span>{active}</span><i/><span>06</span></div>;
}

export default function App() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><ProgressIndex/><main id="main"><Hero/><About/><Work/><Research/><Toolkit/><Contact/></main><Footer/></>;
}
