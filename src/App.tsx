import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Menu, X, MapPin, Phone, Sparkles, Layers3, Ruler, Hammer, MessageCircle, Instagram } from 'lucide-react'

const PHONE = '918923148865'
const waBase = 'https://wa.me/' + PHONE
const introMessage = 'Hello Lakshay Interior & Exterior, I am interested in your interior/exterior services. I would like to discuss my project.'
const photo = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`

const services = [
  { title: 'PVC False Ceilings', category: 'Interior', text: 'Clean lines, warm lighting and a considered finish overhead.', image: photo('photo-1600210492486-724fe5c67fb0') },
  { title: 'Gypsum & POP Ceilings', category: 'Interior', text: 'Sculpted ceiling details shaped around your space.', image: photo('photo-1600607687939-ce8a6c25118c') },
  { title: 'WPC & Wall Panels', category: 'Interior', text: 'Texture and depth that turn a plain wall into a feature.', image: photo('photo-1616486338812-3dadae4b4ace') },
  { title: 'Designer TV Walls', category: 'Interior', text: 'A balanced focal point for the heart of your home.', image: photo('photo-1600566753086-00f18fb6b3ea') },
  { title: 'Decorative Louvers', category: 'Interior', text: 'Architectural rhythm with contemporary wood-look detail.', image: photo('photo-1600607687920-4e2a09cf159d') },
  { title: 'Exterior Elevations', category: 'Exterior', text: 'A distinctive facade with a confident first impression.', image: photo('photo-1600585154340-be6161a56a0c') },
  { title: 'ACP / HPL Cladding', category: 'Exterior', text: 'Contemporary exterior surfaces and refined material contrast.', image: photo('photo-1600566753190-17f0baa2a6c3') },
  { title: 'Balcony & Porch Ceilings', category: 'Exterior', text: 'Bring the same attention to detail beyond your front door.', image: photo('photo-1600607687644-c7171b42498f') },
]
const projects = [
  { title: 'Quiet Luxury Living', category: 'Living Rooms', image: photo('photo-1600210492486-724fe5c67fb0', 1400), shape: 'wide' },
  { title: 'Warm Minimalism', category: 'Wall Panels', image: photo('photo-1616486338812-3dadae4b4ace'), shape: 'tall' },
  { title: 'Modern Facade Study', category: 'Exterior Elevations', image: photo('photo-1600585154340-be6161a56a0c'), shape: 'tall' },
  { title: 'Ceiling & Light', category: 'False Ceilings', image: photo('photo-1600607687939-ce8a6c25118c'), shape: 'wide' },
  { title: 'Contemporary Retreat', category: 'Living Rooms', image: photo('photo-1600566753086-00f18fb6b3ea'), shape: 'wide' },
  { title: 'Refined Workspaces', category: 'Commercial Spaces', image: photo('photo-1497366754035-f200968a6e72'), shape: 'tall' },
]
const filters = ['All Projects', 'False Ceilings', 'Wall Panels', 'Living Rooms', 'Exterior Elevations', 'Commercial Spaces']
const fade = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] as const } } }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All Projects')
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const reduced = useReducedMotion()
  const visibleProjects = projects.filter(p => filter === 'All Projects' || p.category === filter)
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); setMenuOpen(false) }
  const openWhatsApp = (message = introMessage) => window.open(`${waBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  const submitEnquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const message = `Hello Lakshay Interior & Exterior, I would like to discuss a project.\n\nName: ${form.get('name')}\nPhone: ${form.get('phone')}\nService: ${form.get('service')}\nProject location: ${form.get('location')}\nMessage: ${form.get('message') || 'Not provided'}`
    setSubmitted(true)
    openWhatsApp(message)
  }

  return <div className="site-shell">
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Main navigation">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Lakshay home"><span className="brand-mark">L<span>.</span></span><span className="brand-name">LAKSHAY<small>INTERIOR & EXTERIOR</small></span></button>
        <div className="nav-links"><button onClick={() => scrollTo('services')}>Services</button><button onClick={() => scrollTo('work')}>Design Inspiration</button><button onClick={() => scrollTo('about')}>Our Approach</button><button onClick={() => scrollTo('contact')}>Contact</button></div>
        <button className="nav-cta" onClick={() => scrollTo('contact')}>Let's Talk <ArrowUpRight size={15}/></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X/> : <Menu/>}</button>
      </nav>
      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>{[['Services','services'],['Design Inspiration','work'],['Our Approach','about'],['Contact','contact']].map(([label,id])=><button key={id} onClick={() => scrollTo(id)}>{label}<ArrowUpRight size={16}/></button>)}</motion.div>}</AnimatePresence>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content container">
          <motion.div initial="hidden" animate="visible" variants={{visible:{transition:{staggerChildren:.13}}}} className="hero-copy">
            <motion.p variants={fade} className="eyebrow"><span className="eyebrow-line"/> ARCHITECTURAL FINISHING · UTTARAKHAND</motion.p>
            <motion.h1 variants={fade}>We design<br/>the feeling<br/>of <em>home.</em></motion.h1>
            <motion.p variants={fade} className="hero-description">Thoughtfully designed interiors. Distinctive exteriors. Exceptional finishing.</motion.p>
            <motion.div variants={fade} className="hero-actions"><button className="button button-gold" onClick={() => scrollTo('work')}>Explore our work <ArrowRight size={16}/></button><button className="button button-outline" onClick={() => scrollTo('contact')}>Free consultation <ArrowUpRight size={16}/></button></motion.div>
          </motion.div>
          <motion.div className="hero-bottom" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}><span><MapPin size={13}/> DEHRADUN · RISHIKESH · UTTARAKHAND</span><button onClick={() => scrollTo('intro')}>SCROLL TO DISCOVER <ArrowDown size={13}/></button><span className="hero-index">01 — 04</span></motion.div>
        </div>
        <div className="hero-side-note">SPACES WITH CHARACTER <span/></div>
      </section>

      <section className="intro section-pad" id="intro">
        <div className="container intro-grid">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{once:true,amount:.25}} className="intro-kicker"><span className="section-number">01 / THE STUDIO</span><span className="vertical-rule"/></motion.div>
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{once:true,amount:.25}} className="intro-heading"><h2>Every space has a story.<br/><em>Let's make yours</em><br/>unforgettable.</h2><p>At Lakshay Interior & Exterior, we bring design and finishing together. From modern ceiling details and expressive wall panels to distinctive exterior elevations, we help shape spaces that feel considered, functional and unmistakably yours.</p><button className="text-link" onClick={() => scrollTo('about')}>GET TO KNOW OUR APPROACH <ArrowRight size={15}/></button></motion.div>
          <motion.div className="intro-photo" initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.8}}><img src={photo('photo-1600607687920-4e2a09cf159d')} alt="Warm contemporary living room design inspiration" loading="lazy"/><div className="photo-caption"><span>01 / 06</span><span>CALM, CONSIDERED LIVING</span></div><div className="intro-stamp"><Sparkles size={18}/><span>Made for<br/><em>your way of living</em></span></div></motion.div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="container">
          <motion.div className="section-head" variants={fade} initial="hidden" whileInView="visible" viewport={{once:true}}><div><span className="section-number">02 / WHAT WE DO</span><h2>Finishing touches.<br/><em>Lasting impressions.</em></h2></div><p>From the ceiling above to the facade outside, explore finishing solutions tailored to your space, taste and budget.</p></motion.div>
          <div className="service-grid">{services.map((s,i)=><motion.article className="service-card" key={s.title} variants={fade} initial="hidden" whileInView="visible" viewport={{once:true,amount:.12}} transition={{delay:(i%3)*.07}}><div className="service-image"><img src={s.image} alt={s.title+' design inspiration'} loading="lazy"/><span className="service-count">0{i+1}</span><span className="service-type">{s.category}</span></div><div className="service-info"><div><h3>{s.title}</h3><p>{s.text}</p></div><button aria-label={'Enquire about '+s.title} onClick={() => openWhatsApp(`Hello, I would like to enquire about ${s.title} from Lakshay Interior & Exterior.`)}><ArrowUpRight size={19}/></button></div></motion.article>)}</div>
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="container">
          <motion.div className="section-head work-head" variants={fade} initial="hidden" whileInView="visible" viewport={{once:true}}><div><span className="section-number">03 / A VISUAL JOURNEY</span><h2>Spaces that speak<br/><em>for themselves.</em></h2></div><div className="work-note"><span className="inspiration-label"><span/> DESIGN INSPIRATION</span><p>Reference imagery to help explore materials, moods and possibilities. These are not represented as completed Lakshay client projects.</p></div></motion.div>
          <div className="filter-row" role="group" aria-label="Filter design inspiration gallery">{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={() => setFilter(f)}>{f}</button>)}</div>
          <motion.div layout className="project-grid"><AnimatePresence mode="popLayout">{visibleProjects.map((p)=>{const idx=projects.indexOf(p);return <motion.button layout key={p.title} className={`project-card ${p.shape}`} onClick={() => setActiveImage(idx)} initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.97}} transition={{duration:.3}}><img src={p.image} alt={p.title+' — design inspiration'} loading="lazy"/><span className="project-overlay"/><span className="project-meta"><span><small>{p.category}</small><strong>{p.title}</strong></span><span className="project-arrow"><ArrowUpRight size={20}/></span></span></motion.button>})}</AnimatePresence></motion.div>
          <p className="gallery-disclaimer">Visual references sourced from Unsplash. Replace with approved project photography to showcase completed work.</p>
        </div>
      </section>

      <section className="manifesto section-pad" id="about"><div className="manifesto-image"/><div className="manifesto-overlay"/><div className="container manifesto-content"><span className="section-number">04 / THE LAKSHAY APPROACH</span><h2>Details matter.<br/><em>Craftsmanship</em><br/>matters more.</h2><div className="manifesto-bottom"><p>Good finishing isn't just what you see. It's how the whole space comes together — with thoughtful choices, clear conversations and care in the details.</p><div className="values-grid"><div><Layers3/><strong>Thoughtful design</strong><span>Choices shaped around your space.</span></div><div><Ruler/><strong>Clear quotations</strong><span>Discuss scope and materials upfront.</span></div><div><Hammer/><strong>Careful execution</strong><span>Focus on finish and details.</span></div><div><MessageCircle/><strong>Direct communication</strong><span>Stay in the loop as work progresses.</span></div></div></div></div></section>

      <section className="process section-pad"><div className="container"><div className="section-head"><div><span className="section-number">05 / HOW WE WORK</span><h2>From first idea<br/><em>to finished space.</em></h2></div><p>A straightforward process, built around your needs and the details that matter to you.</p></div><div className="process-grid">{[{n:'01',title:'Discover',desc:'Tell us about your space, requirements and vision.'},{n:'02',title:'Design',desc:'Explore suitable styles, materials and finishing options.'},{n:'03',title:'Execute',desc:'Move ahead with the agreed scope and details.'},{n:'04',title:'Transform',desc:'Review the finished work and the details together.'}].map((s,i)=><motion.div key={s.n} className="process-step" variants={fade} initial="hidden" whileInView="visible" viewport={{once:true}} transition={{delay:i*.1}}><span className="process-num">{s.n}</span><span className="process-line"/><h3>{s.title}</h3><p>{s.desc}</p></motion.div>)}</div></div></section>

      <section className="locations"><div className="location-photo"/><div className="location-shade"/><div className="container location-content"><span className="section-number">ROOTED IN THE HILLS</span><h2>Beautiful spaces,<br/><em>across Uttarakhand.</em></h2><div className="location-list"><span><MapPin size={15}/> Dehradun</span><span><MapPin size={15}/> Rishikesh</span><span><MapPin size={15}/> Across Uttarakhand</span></div><button className="button button-gold" onClick={() => scrollTo('contact')}>Discuss your project <ArrowRight size={16}/></button></div></section>

      <section className="contact section-pad" id="contact"><div className="container contact-grid"><div className="contact-copy"><span className="section-number">LET'S MAKE IT HAPPEN</span><h2>Your dream space<br/>starts with <em>one conversation.</em></h2><p>Have a home, shop, hotel or office project in mind? Tell us what you're planning. We'll take it from there.</p><div className="contact-detail"><span className="detail-icon"><Phone size={17}/></span><span><small>CALL US DIRECTLY</small><a href="tel:+918923148865">+91 89231 48865</a></span></div><div className="contact-detail"><span className="detail-icon"><MapPin size={17}/></span><span><small>SERVICE AREA</small><strong>Dehradun · Rishikesh · Uttarakhand</strong></span></div><button className="whatsapp-large" onClick={() => openWhatsApp()}><MessageCircle size={19}/> Chat on WhatsApp <ArrowUpRight size={18}/></button></div>
        <form className="enquiry-form" onSubmit={submitEnquiry}><div className="form-top"><span>PROJECT ENQUIRY</span><span>01 — LET'S BEGIN</span></div><label>Full name<input name="name" placeholder="Your name" autoComplete="name" required/></label><div className="form-row"><label>Phone number<input name="phone" type="tel" placeholder="+91" autoComplete="tel" pattern="[0-9+() -]{8,18}" required/></label><label>Service required<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Interior finishing</option><option>Exterior finishing</option><option>False ceiling</option><option>Wall panels / TV wall</option><option>Commercial space</option><option>Not sure yet</option></select></label></div><label>Project location<input name="location" placeholder="City / area" required/></label><label>Tell us a little about it<textarea name="message" placeholder="Your ideas, requirements or timeline…" rows={3}/></label><button type="submit" className="button button-gold submit-button">{submitted?'Open WhatsApp again':'Send enquiry on WhatsApp'} <ArrowUpRight size={17}/></button><p className="form-note"><Check size={13}/> Your details open in WhatsApp for you to send. This form does not store data on a website server.</p></form></div></section>
    </main>

    <footer className="footer"><div className="container footer-main"><button className="brand footer-brand" onClick={() => scrollTo('home')}><span className="brand-mark">L<span>.</span></span><span className="brand-name">LAKSHAY<small>INTERIOR & EXTERIOR</small></span></button><p>Beautiful spaces.<br/><em>Inside & out.</em></p><div className="footer-links"><button onClick={() => scrollTo('services')}>Services</button><button onClick={() => scrollTo('work')}>Inspiration</button><button onClick={() => scrollTo('about')}>Our approach</button><button onClick={() => scrollTo('contact')}>Contact</button></div><a className="footer-contact" href="tel:+918923148865">+91 89231 48865 <ArrowUpRight size={15}/></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} LAKSHAY INTERIOR & EXTERIOR</span><span>DEHRADUN · RISHIKESH · UTTARAKHAND</span><span>DESIGNED WITH INTENTION.</span></div></footer>

    <button className="whatsapp-float" onClick={() => openWhatsApp()} aria-label="Chat with Lakshay on WhatsApp"><MessageCircle size={22}/><span>Let's talk</span></button>
    <AnimatePresence>{activeImage!==null && <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setActiveImage(null)}><button className="lightbox-close" aria-label="Close image" onClick={() => setActiveImage(null)}><X/></button><button className="lightbox-nav prev" aria-label="Previous image" onClick={e=>{e.stopPropagation();setActiveImage((activeImage+projects.length-1)%projects.length)}}><ChevronLeft/></button><motion.div className="lightbox-content" initial={{scale:.96}} animate={{scale:1}} onClick={e=>e.stopPropagation()}><img src={projects[activeImage].image} alt={projects[activeImage].title+' design inspiration'}/><div><span>{projects[activeImage].category} · DESIGN INSPIRATION</span><h3>{projects[activeImage].title}</h3></div></motion.div><button className="lightbox-nav next" aria-label="Next image" onClick={e=>{e.stopPropagation();setActiveImage((activeImage+1)%projects.length)}}><ChevronRight/></button></motion.div>}</AnimatePresence>
  </div>
}
export default App
