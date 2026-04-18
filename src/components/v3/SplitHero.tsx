import { motion } from 'framer-motion';
import { ArrowRight, Car, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SplitHero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[#030712]">
      {/* Absolute Logo Top Center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <img 
          src="/assets/logo-novo.png" 
          alt="Bora Passageiro" 
          className="h-12 md:h-20 drop-shadow-2xl brightness-0 invert" 
        />
      </div>

      {/* Left Side - Passageiro */}
      <motion.div
        initial={{ flex: 1 }}
        whileHover={{ flex: 1.2 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        onClick={() => navigate('/passageiro')}
        className="relative group cursor-pointer flex-1 h-full flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 to-[#030712] opacity-80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979434-d4ba0ae10ce4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 p-8">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:-translate-y-2 transition-transform duration-500">
            <Smartphone className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
            Sou Passageiro
          </h2>
          <p className="text-cyan-100/60 max-w-sm mx-auto text-lg md:text-xl font-medium">
            Peça sua corrida em segundos. Segurança e preço justo.
          </p>
          <div className="pt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-flex items-center gap-2 text-cyan-400 font-bold bg-cyan-950/50 px-6 py-3 rounded-full border border-cyan-500/30">
              Viajar agora <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Motorista */}
      <motion.div
        initial={{ flex: 1 }}
        whileHover={{ flex: 1.2 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        onClick={() => navigate('/motorista')}
        className="relative group cursor-pointer flex-1 h-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-950 to-[#030712] opacity-80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 p-8">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:-translate-y-2 transition-transform duration-500">
            <Car className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
            Quero Dirigir
          </h2>
          <p className="text-emerald-100/60 max-w-sm mx-auto text-lg md:text-xl font-medium">
            Faça seu próprio horário. Taxa fixa de apenas 10%.
          </p>
          <div className="pt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/50 px-6 py-3 rounded-full border border-emerald-500/30">
              Ver ganhos <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
