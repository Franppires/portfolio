import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ContactFormData } from '../services/firebase.ts';
import { TRANSLATIONS } from '../constants';

interface ContactFormProps {
  texts: typeof TRANSLATIONS.pt.form;
  buttons: typeof TRANSLATIONS.pt.buttons;
}

const ContactForm: React.FC<ContactFormProps> = ({ texts, buttons }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage(texts.validation);
      return;
    }

    setStatus('loading');

    try {
      // O Firebase só é baixado quando a pessoa envia (deixa a página mais leve).
      const { sendMessageToFirestore } = await import('../services/firebase.ts');
      await sendMessageToFirestore(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(texts.error);
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-surface rounded-[10px] border border-line text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-ink mb-2">{texts.successTitle}</h3>
        <p className="text-muted max-w-xs">
          {texts.successDesc}
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="btn-send mt-8 px-4 py-2 rounded-md text-sm"
        >
          {buttons.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-surface p-6 md:p-8 rounded-[10px] border border-line shadow-[0_1px_3px_rgba(0,0,0,.07)] relative">

      <div className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted">{texts.name}</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={texts.placeholders.name}
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-paper border border-line rounded-md px-3 py-2.5 text-ink text-sm placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-ink outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted">{texts.email}</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={texts.placeholders.email}
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-paper border border-line rounded-md px-3 py-2.5 text-ink text-sm placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-ink outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-medium uppercase tracking-wider text-muted">{texts.subject}</label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder={texts.placeholders.subject}
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-paper border border-line rounded-md px-3 py-2.5 text-ink text-sm placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-ink outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted">{texts.message}</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            placeholder={texts.placeholders.message}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-paper border border-line rounded-md px-3 py-2.5 text-ink text-sm placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-ink outline-none transition-colors resize-none"
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-send w-full rounded-md text-sm font-medium py-3 px-6 disabled:opacity-70"
        >
          <span className="relative flex items-center justify-center gap-2">
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin" size={20} /> {buttons.sending}
              </>
            ) : (
              <>
                {buttons.send} <Send size={18} />
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;