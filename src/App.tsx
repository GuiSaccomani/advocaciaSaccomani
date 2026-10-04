import { useEffect, useRef, useState } from "react";

const areas = [
  {
    number: "01",
    title: "Direito Imobiliário",
    text: "Compra e venda de imóveis, contratos, regularização, problemas registrais, usucapião, posse e conflitos imobiliários.",
    id: "direito-imobiliario",
    heading: "Segurança Jurídica para seus Negócios Imobiliários",
    intro: "Negócios envolvendo imóveis tratam de valores altos e do patrimônio de uma vida. Não corra riscos com contratos amadores ou problemas de documentação.",
    detailHeading: "Como protegemos seu patrimônio",
    detailIntro: "",
    cta: "Falar com Especialista",
    details: [
      { title: "Contratos de Compra e Venda", text: "Elaboração e revisão de contratos, mitigando riscos de fraudes, dívidas anteriores e garantindo que o acordo reflita exatamente a vontade das partes." },
      { title: "Regularização de Imóveis", text: 'Tem apenas um "contrato de gaveta"? Ajudamos na regularização, usucapião, desmembramentos e retificação de área para que o imóvel seja realmente seu.' },
      { title: "Distratos e Conflitos", text: "Atraso na entrega de obra? Construtora cobrando taxas abusivas? Atuamos na devolução de valores, distratos e litígios imobiliários." },
    ],
  },
  {
    number: "02",
    title: "Leilão de Imóveis",
    text: "Assessoria jurídica especializada antes e depois da arrematação. Análise de edital, matrícula, riscos de ocupação e medidas para imissão na posse.",
    id: "leilao-imoveis",
    heading: "Maximize Seus Lucros e Minimize Riscos em Leilões de Imóveis",
    intro: "Assessoria jurídica completa para investidores: da análise criteriosa do edital à desocupação do imóvel arrematado.",
    detailHeading: "Comprar em leilão é excelente. Comprar às cegas é perigoso.",
    detailIntro: "Um imóvel arrematado pode envolver questões complexas que inviabilizam o seu lucro.",
    cta: "Solicitar Análise de Imóvel",
    details: [
      { title: "Análise de Edital (Due Diligence)", text: "Mapeamento de riscos ocultos, análise da matrícula, verificação de dívidas trabalhistas, fiscais e condominiais antes da sua oferta." },
      { title: "Imissão na Posse", text: "O imóvel está ocupado? Cuidamos de todo o trâmite extrajudicial e judicial para a desocupação rápida e segura." },
      { title: "Defesa do Arrematante", text: "Atuação incisiva caso o devedor tente anular o leilão, garantindo que o seu investimento não seja bloqueado na justiça." },
    ],
  },
  {
    number: "03",
    title: "Previdenciário (INSS)",
    text: "Planejamento para aposentadoria correta, benefícios negados, revisão de benefícios, aposentadoria por tempo e idade.",
    id: "direito-previdenciario",
    heading: "Não deixe o INSS negar o seu Direito ao Descanso",
    intro: "O planejamento correto ou a intervenção judicial no momento certo garantem a melhor aposentadoria possível após anos de contribuição.",
    detailHeading: "Como podemos garantir o seu benefício",
    detailIntro: "",
    cta: "Analisar meu Benefício",
    details: [
      { title: "Planejamento Previdenciário", text: "Qual é o melhor momento para se aposentar? Realizamos o cálculo exato para evitar que você perca dinheiro ou trabalhe anos a mais sem necessidade." },
      { title: "Benefícios Negados", text: "Auxílio-doença, BPC/LOAS ou aposentadoria negada pelo INSS? Atuamos na reversão da decisão administrativamente ou via processo judicial." },
      { title: "Revisão de Aposentadoria", text: "O INSS frequentemente erra nos cálculos. Analisamos sua carta de concessão para verificar se é possível aumentar o valor mensal que você recebe." },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.2 7.6c.2-.5.4-.5.8-.5h.4c.1 0 .3 0 .5.4l.8 2c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6a6.8 6.8 0 0 0 3.1 2.7c.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l2 .9c.3.1.5.2.5.4a3.7 3.7 0 0 1-.3 1.5c-.4.7-1.3 1.1-2 1.2-.5 0-1.2.1-3.8-1-3.2-1.4-5.2-4.7-5.4-5-.2-.3-1.3-1.8-.5-3.4.2-.4.4-.7.6-.9Z" />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSection, setHeaderSection] = useState("inicio");
  const headerRef = useRef<HTMLElement>(null);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  useEffect(() => {
    let frame: number | null = null;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, .site-footer"));
    const updateHeader = () => {
      frame = null;
      const samplePosition = (headerRef.current?.getBoundingClientRect().height ?? 80) / 2;
      const section = sections.find((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= samplePosition && bounds.bottom > samplePosition;
      });
      if (section) setHeaderSection(section.id || "footer");
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateHeader);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    sections.forEach((section) => observer.observe(section));
    if (headerRef.current) observer.observe(headerRef.current);
    updateHeader();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header ref={headerRef} className="site-header" data-section={headerSection} data-tone={headerSection === "areas" || headerSection === "contato" ? "light" : "dark"}>
        <div className="container header-inner">
          <a className="brand" href="#inicio" onClick={closeMenu}>
            <span className="header-logo-stack">
              <img className="header-logo logo-light" src="/logo-saccomani-enviada-clara.png" alt="Advocacia Saccomani" width="1205" height="632" />
              <img className="header-logo logo-dark" src="/logo-saccomani-enviada-escura.png" alt="" aria-hidden="true" width="1205" height="632" />
            </span>
          </a>
          <button
            className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
            <a href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#areas" onClick={closeMenu}>Áreas de Atuação</a>
            <a href="#sobre" onClick={closeMenu}>Sobre Nós</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-image" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>
                Advocacia especializada em{" "}
                <em><span className="hero-area-accent">Direito Imobiliário, Previdenciário</span> e Indenizações</em>
              </h1>
              <p className="hero-intro">
                Há mais de 27 anos ajudando pessoas e empresas a proteger seus direitos,
                seu patrimônio e garantir segurança jurídica absoluta.
              </p>
              <a className="button button-primary" href="https://wa.me/5511983541229" target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                Agende uma Análise do Seu Caso
              </a>
            </div>
          </div>
        </section>

        <section className="areas-section" id="areas">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">Áreas de Atuação</p>
                <h2>Como Podemos Ajudar Você</h2>
              </div>
              <p>
                Nossa atuação estratégica é voltada para resolver problemas complexos
                com eficiência e transparência.
              </p>
            </div>
            <div className="areas-list">
              {areas.map((area) => (
                <article
                  className="area-row"
                  key={area.number}
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest(".area-details, .area-toggle")) return;
                    setExpandedArea((current) => current === area.id ? null : area.id);
                  }}
                >
                  <span className="area-number">{area.number}</span>
                  <h3>{area.title}</h3>
                  <div className="area-content">
                    <p>{area.text}</p>
                  </div>
                  <button
                    className="area-toggle"
                    type="button"
                    aria-label={`${expandedArea === area.id ? "Fechar" : "Saiba Mais"} — ${area.title}`}
                    aria-expanded={expandedArea === area.id}
                    aria-controls={area.id}
                    onClick={() => setExpandedArea((current) => current === area.id ? null : area.id)}
                  >
                    <span>{expandedArea === area.id ? "Fechar" : "Saiba Mais"}</span>
                    <ArrowIcon />
                  </button>
                    <div className="area-details" id={area.id} hidden={expandedArea !== area.id}>
                      {expandedArea === area.id && <>
                      <h4>{area.heading}</h4>
                      <p>{area.intro}</p>
                      <h4>{area.detailHeading}</h4>
                      {area.detailIntro && <p>{area.detailIntro}</p>}
                      <dl>
                        {area.details.map((detail) => (
                          <div key={detail.title}>
                            <dt>{detail.title}</dt>
                            <dd>{detail.text}</dd>
                          </div>
                        ))}
                      </dl>
                      <a className="area-contact" href="https://wa.me/5511983541229" target="_blank" rel="noreferrer">{area.cta} <ArrowIcon /></a>
                      </>}
                    </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="sobre">
          <div className="container about-layout">
            <div className="about-portrait">
              <div className="portrait-frame">
                <img src="/foto-advogado.jpeg" alt="Advogado Paulo Saccomani" />
              </div>
              <div className="portrait-note">
                <strong>Paulo Edson Saccomani</strong>
                <span>OAB/SP nº 155.384</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">Sobre Nós</p>
              <h2>Tradição, Estratégia e Resultados</h2>
              <p>
                <strong>Paulo Edson Saccomani</strong> é advogado inscrito na{" "}
                <strong>OAB/SP nº 155.384</strong>, com 27 anos de experiência na
                advocacia e especialização em{" "}
                <strong>Direito Civil, Direito Processual Civil e Direito Previdenciário</strong>.
              </p>
              <p>
                Ao longo de sua trajetória profissional, consolidou sólida experiência na
                advocacia consultiva e contenciosa, atuando nas áreas de{" "}
                <strong>Direito Civil, Direito Empresarial e Direito Previdenciário</strong>.
                Presta assessoria jurídica estratégica a pessoas físicas e jurídicas,
                oferecendo soluções preventivas e eficazes para a proteção de direitos,
                a gestão de riscos e a resolução de conflitos.
              </p>
              <p>
                Sua atuação é pautada pela ética, excelência técnica, transparência e
                atendimento personalizado, buscando sempre proporcionar segurança
                jurídica e resultados consistentes para seus clientes.
              </p>
            </div>
          </div>

          <div className="container about-principles">
            <div className="principles-intro">
              <h3>Protegendo seu Patrimônio há mais de 27 Anos</h3>
              <p>
                A Advocacia Saccomani não é apenas um escritório generalista. Somos uma
                boutique jurídica com foco estratégico em proteger o que é mais valioso
                para você: seus imóveis, seus direitos previdenciários e sua segurança financeira.
              </p>
              <p>
                Nossa atuação é fundamentada em análise técnica profunda, ética
                irretocável e transparência em todas as etapas do processo.
              </p>
              <div className="existing-stats">
                <div>
                  <strong>27+</strong>
                  <span>Anos de Experiência</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Atendimento Personalizado</span>
                </div>
              </div>
            </div>
            <div className="values">
              <h3>Nossos Valores</h3>
              <dl>
                <div>
                  <dt>Transparência:</dt>
                  <dd>Você sabe exatamente o que está acontecendo no seu processo.</dd>
                </div>
                <div>
                  <dt>Agilidade:</dt>
                  <dd>Não esperamos. Nós agimos estrategicamente.</dd>
                </div>
                <div>
                  <dt>Especialização:</dt>
                  <dd>Foco profundo em Imobiliário, Leilões e Previdenciário.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="container contact-layout">
            <div className="contact-heading">
              <p className="eyebrow">Contato</p>
              <h2>Fale com um Especialista</h2>
              <p>
                O tempo é crucial para a defesa dos seus direitos. Escolha o canal de sua
                preferência e nossa equipe responderá prontamente.
              </p>
            </div>
            <div className="contact-primary">
              <span>Atendimento Rápido</span>
              <p>
                Agende uma reunião ou tire suas dúvidas iniciais diretamente pelo nosso WhatsApp.
              </p>
              <a
                className="button button-light"
                href="https://wa.me/5511983541229?text=Olá, gostaria de uma análise do meu caso."
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon />
                Enviar Mensagem Agora
              </a>
            </div>
            <div className="contact-details">
              <h3>Outros Canais</h3>
              <dl>
                <div>
                  <dt>Telefone:</dt>
                  <dd><a href="tel:+5511983541229">(11) 98354-1229</a></dd>
                </div>
                <div>
                  <dt>E-mail:</dt>
                  <dd><a href="mailto:advocaciasaccomani@gmail.com">advocaciasaccomani@gmail.com</a></dd>
                </div>
                <div>
                  <dt>Localização:</dt>
                  <dd>São Paulo, SP</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div>
            <a className="brand footer-brand" href="#inicio">
              <span>Advocacia</span>
              <strong>Saccomani</strong>
            </a>
            <p>Segurança jurídica para proteger seu patrimônio e seus direitos.</p>
          </div>
          <div className="footer-contact">
            <h3>Contato Direto</h3>
            <a href="tel:+5511983541229">(11) 98354-1229</a>
            <a href="https://wa.me/5511983541229" target="_blank" rel="noreferrer">WhatsApp Disponível</a>
            <a href="mailto:advocaciasaccomani@gmail.com">advocaciasaccomani@gmail.com</a>
            <span>São Paulo, SP</span>
          </div>
          <div className="footer-links">
            <h3>Links Rápidos</h3>
            <a href="#areas">Direito Imobiliário</a>
            <a href="#areas">Leilões de Imóveis</a>
            <a href="#areas">Direito Previdenciário</a>
            <a href="#sobre">Nossa História</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2024 Advocacia Saccomani. Todos os direitos reservados.</p>
          <span>OAB/SP</span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/5511983541229?text=Olá, gostaria de uma análise do meu caso."
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
