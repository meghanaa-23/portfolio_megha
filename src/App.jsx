import { useState, useEffect } from 'react';
const profileImg = "/profile.jpeg";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewResume, setViewResume] = useState(false);

  const fullText = "Meghana Manchala";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveSection(current);

      // Parallax effect
      const orbs = document.querySelectorAll('.glow-orb');
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${window.scrollY * speed}px)`;
      });

      // Reveal animations
      const cards = document.querySelectorAll('.glass-card, .timeline-item');
      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
          card.classList.add('reveal');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (viewResume) {
    return (
      <div className="resume-viewer-page">
        <div className="resume-nav">
          <button onClick={() => setViewResume(false)} className="back-btn">
            <i className="fa-solid fa-arrow-left"></i> Back to Portfolio
          </button>
          <a href="/resume.pdf" download className="download-resume-btn">
            <i className="fa-solid fa-file-pdf"></i> Download PDF
          </a>
        </div>
        <div className="resume-iframe-container">
          <iframe 
            src="/resume.pdf#toolbar=0" 
            title="Resume Viewer"
            className="resume-iframe"
          ></iframe>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        <div className="particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>
      
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo">
            <div className="logo-container">
              <div className="logo-circle">
                <span className="logo-text">M</span>
              </div>
              <span className="logo-name">Meghana</span>
            </div>
          </a>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#interests" className={activeSection === 'interests' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>How I Work</a></li>
            <li><a href="#achievements" className={activeSection === 'achievements' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Achievements</a></li>
            <li><a href="#resume" className={activeSection === 'resume' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Resume</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-container">
            <div className="hero-content">
              <span className="badge animate-badge">
                <i className="fa-solid fa-brain"></i> AI & ML Student
              </span>
              <h1 className="hero-title">
                Hi, I'm <br/>
                <span className="gradient-text typing-text">
                  {typedText}<span className="cursor-blink">|</span>
                </span>
              </h1>
              <p className="hero-subtitle fade-in-up">
                Aspiring AI & ML student eager to apply knowledge in developing intelligent solutions.
              </p>
              <div className="hero-buttons fade-in-up">
                <a href="#projects" className="btn-primary">
                  <span>View Projects</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
                <button onClick={() => setViewResume(true)} className="btn-secondary">
                  <span>View Resume</span>
                  <i className="fa-solid fa-eye"></i>
                </button>
                <a href="/resume.pdf" download className="btn-resume-download" title="Download Resume">
                  <i className="fa-solid fa-download"></i>
                </a>
              </div>
              <div className="social-links fade-in-up">
                <a href="https://github.com/meghanaa-23" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://linkedin.com/in/meghana-manchala" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="mailto:manchalameghana89@gmail.com" aria-label="Email">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="profile-container">
                <div className="profile-ring"></div>
                <div className="profile-ring-2"></div>
                <img src={profileImg} alt="Meghana Manchala" className="profile-image" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('profile-placeholder');
                }} />
                <div className="profile-placeholder-content">
                  <span>MM</span>
                </div>
              </div>
              <div className="floating-card card-1">
                <i className="fa-solid fa-code"></i>
              </div>
              <div className="floating-card card-2">
                <i className="fa-solid fa-brain"></i>
              </div>
              <div className="floating-card card-3">
                <i className="fa-solid fa-rocket"></i>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <div className="section-header">
              <h2>About <span className="gradient-text">Me</span></h2>
              <p className="section-subtitle">Get to know me better</p>
            </div>
            <div className="about-content">
              <div className="about-image-container glass-card">
                <img src={profileImg} alt="Meghana Manchala" className="about-image" />
              </div>
              <div className="about-text glass-card">
                <p>I am an aspiring AI & ML student currently in my third year of B.Tech at Kamala Institute of Technology & Science. My goal is to apply my knowledge in developing intelligent, scalable solutions and gain practical, hands-on experience in Artificial Intelligence.</p>
                <div className="about-stats">
                  <div className="stat-item">
                    <h3>8.1</h3>
                    <p>CGPA</p>
                  </div>
                  <div className="stat-item">
                    <h3>3rd</h3>
                    <p>Year</p>
                  </div>
                  <div className="stat-item">
                    <h3>2+</h3>
                    <p>Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <div className="section-header">
              <h2>Technical <span className="gradient-text">Skills</span></h2>
              <p className="section-subtitle">Technologies I work with</p>
            </div>
            <div className="skills-grid">
              <div className="glass-card skill-card">
                <div className="skill-icon">
                  <i className="fa-brands fa-python"></i>
                </div>
                <h3>Python</h3>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="glass-card skill-card">
                <div className="skill-icon">
                  <i className="fa-brands fa-java"></i>
                </div>
                <h3>Java</h3>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: '75%'}}></div>
                </div>
              </div>
              <div className="glass-card skill-card">
                <div className="skill-icon">
                  <i className="fa-solid fa-c"></i>
                </div>
                <h3>C</h3>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: '70%'}}></div>
                </div>
              </div>
              <div className="glass-card skill-card">
                <div className="skill-icon">
                  <i className="fa-brands fa-html5"></i>
                </div>
                <h3>HTML & CSS</h3>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-header">
              <h2>Featured <span className="gradient-text">Projects</span></h2>
              <p className="section-subtitle">Some of my recent work</p>
            </div>
            <div className="projects-grid">
              <div className="glass-card project-card">
                <div className="project-icon">
                  <i className="fa-solid fa-shirt"></i>
                </div>
                <h3>STITCH & STYLE – Fabric Ville</h3>
                <p>A web-based platform to connect fashion designers, customers, and manufacturers.</p>
                <div className="project-tags">
                  <span className="tag">Web Development</span>
                  <span className="tag">Platform</span>
                </div>
                <p className="project-meta">
                  <i className="fa-solid fa-users"></i> Team Size: 4
                </p>
                <a href="https://meghanaa-23.github.io/Fabricvilla/" target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>View Project</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
              <div className="glass-card project-card">
                <div className="project-icon">
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <h3>College Event Management</h3>
                <p>Developing a web-based platform aimed at streamlining event management for colleges efficiently.</p>
                <div className="project-tags">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                </div>
                <p className="project-meta">
                  <i className="fa-solid fa-code"></i> Frontend Development
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="interests" className="section">
          <div className="container">
            <div className="section-header">
              <h2>How I <span className="gradient-text">Work</span></h2>
              <p className="section-subtitle">What I love building</p>
            </div>
            <div className="interests-grid">
              <div className="glass-card interest-card">
                <div className="interest-icon">
                  <i className="fa-solid fa-globe"></i>
                </div>
                <h3>Website Development</h3>
                <p>Building responsive, accessible web apps with modern technologies</p>
              </div>
              <div className="glass-card interest-card">
                <div className="interest-icon">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h3>AI & Machine Learning</h3>
                <p>Experimenting with neural networks and building intelligent AI-powered apps</p>
              </div>
              <div className="glass-card interest-card">
                <div className="interest-icon">
                  <i className="fa-solid fa-palette"></i>
                </div>
                <h3>UI/UX Design</h3>
                <p>Crafting beautiful, intuitive interfaces with smooth animations</p>
              </div>
              <div className="glass-card interest-card">
                <div className="interest-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3>Cybersecurity</h3>
                <p>Learning ethical hacking and keeping systems secure</p>
              </div>
              <div className="glass-card interest-card">
                <div className="interest-icon">
                  <i className="fa-solid fa-cloud"></i>
                </div>
                <h3>Cloud Architecture</h3>
                <p>Designing scalable cloud-native solutions with modern tech</p>
              </div>
              <div className="glass-card interest-card">
                <div className="interest-icon">
                  <i className="fa-solid fa-code-branch"></i>
                </div>
                <h3>Open Source</h3>
                <p>Contributing to community projects and giving back to tech world</p>
              </div>
            </div>
          </div>
        </section>

        <section id="achievements" className="section">
          <div className="container">
            <div className="section-header">
              <h2>Certifications & <span className="gradient-text">Achievements</span></h2>
            </div>
            <div className="achievements-grid">
              <div className="glass-card achievement-card">
                <div className="achievement-badge">
                  <i className="fa-brands fa-aws"></i>
                </div>
                <h3>AWS Academy</h3>
                <p>Cloud Computing & Data Engineering</p>
              </div>
              <div className="glass-card achievement-card">
                <div className="achievement-badge">
                  <i className="fa-solid fa-microchip"></i>
                </div>
                <h3>AI for Beginners</h3>
                <p>Intel Corporation</p>
              </div>
              <div className="glass-card achievement-card">
                <div className="achievement-badge">
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <h3>AI Tools Workshop</h3>
                <p>Hands-on AI Development</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="section-header">
              <h2><span className="gradient-text">Contact</span></h2>
              <p className="section-subtitle">Let's connect and build something amazing</p>
            </div>
            <div className="contact-grid">
              <div className="contact-card glass-card">
                <h3><i className="fa-solid fa-envelope"></i> Email</h3>
                <a href="mailto:manchalameghana89@gmail.com">manchalameghana89@gmail.com</a>
              </div>
              <div className="contact-card glass-card">
                <h3><i className="fa-solid fa-phone"></i> Phone</h3>
                <a href="tel:9652871980">9652871980</a>
              </div>
              <div className="contact-card glass-card">
                <h3><i className="fa-brands fa-github"></i> GitHub</h3>
                <a href="https://github.com/meghanaa-23" target="_blank" rel="noopener noreferrer">@meghanaa-23</a>
              </div>
              <div className="contact-card glass-card">
                <h3><i className="fa-solid fa-location-dot"></i> Location</h3>
                <p>Karimnagar</p>
              </div>
            </div>
          </div>
        </section>

        <section id="resume" className="section">
          <div className="container">
            <div className="section-header">
              <h2>My <span className="gradient-text">Resume</span></h2>
              <p className="section-subtitle">View or download my complete resume</p>
            </div>
            <div className="resume-container glass-card">
              <div className="resume-actions">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <i className="fa-solid fa-eye"></i>
                  <span>View Resume</span>
                </a>
                <a href="/resume.pdf" download className="btn-secondary">
                  <i className="fa-solid fa-download"></i>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
