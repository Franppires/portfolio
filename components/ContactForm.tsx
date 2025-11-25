import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendMessageToFirestore, ContactFormData } from '../services/firebase.ts';
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
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-green-500/20 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{texts.successTitle}</h3>
        <p className="text-slate-400 max-w-xs">
          {texts.successDesc}
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors text-sm"
        >
          {buttons.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/20 transition-colors duration-500"></div>

      <div className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{texts.name}</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={texts.placeholders.name}
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{texts.email}</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={texts.placeholders.email}
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{texts.subject}</label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder={texts.placeholders.subject}
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{texts.message}</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            placeholder={texts.placeholders.message}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
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
          className="w-full relative group overflow-hidden rounded-xl bg-white text-dark font-bold py-4 px-6 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:hover:scale-100"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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