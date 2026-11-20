import React, { useState } from 'react';
import { Gauge, Search, Smartphone, ArrowRight } from 'lucide-react';

interface Props {
  labels: {
    kicker: string;
    title: string;
    desc: string;
    points: string[];
    placeholder: string;
    button: string;
    note: string;
    error: string;
    message: string; // texto do WhatsApp; {url} é trocado pelo link digitado
  };
  phone: string; // só números, com DDI
}

const ICONS = [Gauge, Search, Smartphone];

/** Diagnóstico gratuito: a pessoa cola o link e o WhatsApp abre com a mensagem pronta. */
const FreeAudit: React.FC<Props> = ({ labels, phone }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = url.trim();
    // aceita "meusite.com.br", "www.meusite.com" ou com http(s)
    if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(clean)) {
      setError(true);
      return;
    }
    setError(false);
    const text = labels.message.replace('{url}', clean);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <section id="diagnostico" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal bento-card spotlight relative overflow-hidden p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="cta-glow" aria-hidden="true" />
          <div className="relative lg:col-span-6">
            <p className="text-[11px] uppercase tracking-widest text-accent mb-3">{labels.kicker}</p>
            <h2 className="split-title text-3xl md:text-5xl font-medium tracking-tighter text-ink">{labels.title}</h2>
            <p className="text-muted leading-relaxed mt-5 max-w-lg">{labels.desc}</p>
            <ul className="mt-6 space-y-3">
              {labels.points.map((pt, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <li key={pt} className="flex items-center gap-3 text-sm text-ink">
                    <span className="w-8 h-8 rounded-lg border border-line bg-paper flex items-center justify-center text-accent shrink-0">
                      <Icon size={15} />
                    </span>
                    {pt}
                  </li>
                );
              })}
            </ul>
          </div>

          <form onSubmit={submit} className="relative lg:col-span-6" noValidate>
            <label htmlFor="audit-url" className="sr-only">{labels.placeholder}</label>
            <div className={`flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border bg-paper ${error ? 'border-[#f04438]' : 'border-line'}`}>
              <input
                id="audit-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); if (error) setError(false); }}
                placeholder={labels.placeholder}
                aria-invalid={error}
                aria-describedby="audit-note"
                className="flex-1 bg-transparent px-4 py-3 text-ink outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)]"
              />
              <button type="submit" className="btn-glow magnetic justify-center whitespace-nowrap">
                {labels.button} <ArrowRight size={16} />
              </button>
            </div>
            <p id="audit-note" className={`text-xs mt-3 ${error ? 'text-[#f04438]' : 'text-muted'}`} role={error ? 'alert' : undefined}>
              {error ? labels.error : labels.note}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FreeAudit;
