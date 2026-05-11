const { useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#c25b32",
  "type": "geist"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ["#c25b32", "#3a4a6b", "#3f7a55", "#2f63b5", "#c98a2b"];

const TYPES = {
  geist:    { sans: "'Geist', system-ui, sans-serif",        mono: "'Geist Mono', ui-monospace, monospace" },
  helvetica:{ sans: "'Helvetica Neue', Helvetica, Arial, sans-serif", mono: "'Geist Mono', ui-monospace, monospace" },
  serif:    { sans: "'Instrument Serif', 'Times New Roman', serif",   mono: "'Geist Mono', ui-monospace, monospace" }
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectApp(() => {
    const root = document.documentElement;
    root.dataset.theme = tweaks.theme;
    root.style.setProperty('--accent', tweaks.accent || ACCENT_OPTIONS[0]);
    const t = TYPES[tweaks.type] || TYPES.geist;
    root.style.setProperty('--sans', t.sans);
    root.style.setProperty('--mono', t.mono);
  }, [tweaks]);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Process />
        <Why />
        <Solutions />
        <BlogGuides />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark',  label: 'Dark'  }
            ]}
          />
        </TweakSection>

        <TweakSection title="Accent">
          <TweakColor
            label="Accent color"
            value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}
            options={ACCENT_OPTIONS}
          />
        </TweakSection>

        <TweakSection title="Type">
          <TweakRadio
            label="Family"
            value={tweaks.type}
            onChange={(v) => setTweak('type', v)}
            options={[
              { value: 'geist',     label: 'Geist'     },
              { value: 'helvetica', label: 'Helvetica' },
              { value: 'serif',     label: 'Editorial' }
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
