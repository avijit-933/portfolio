import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Award, ExternalLink, ShieldCheck } from 'lucide-react';

const CertificateModal = ({ isOpen, onClose, certificate }) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-2xl rounded-2xl glass-panel border overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            {/* Visual Preview Side */}
            <div className="md:w-1/2 p-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-opacity-10 border-slate-500">
              <div className="w-full aspect-[4/3] rounded-xl border border-white/10 bg-slate-950/80 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner group">
                {/* Visual Certificate Frame */}
                <div className="absolute inset-0 border border-primary/20 m-2 rounded-lg pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full filter blur-xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full filter blur-xl" />

                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[9px] font-orbitron tracking-widest text-primary">OFFICIAL CREDENTIAL</span>
                  <Award className="w-5 h-5 text-accent animate-pulse-slow" />
                </div>

                <div className="my-auto text-center space-y-2">
                  <h4 className="text-sm font-bold text-white leading-tight font-orbitron tracking-wide uppercase px-2">
                    {certificate.name}
                  </h4>
                  <p className="text-[10px] text-muted">Presented by</p>
                  <p className="text-xs font-semibold text-accent tracking-wider font-outfit uppercase">
                    {certificate.issuer}
                  </p>
                </div>

                <div className="flex items-end justify-between border-t border-white/5 pt-2 text-[8px] text-muted">
                  <div>
                    <p>CREDENTIAL ID</p>
                    <p className="font-mono text-white text-[9px] truncate max-w-[120px]">{certificate.credentialId || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p>VERIFIED</p>
                    <div className="flex items-center gap-0.5 text-accent font-semibold justify-end">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      <span>SECURE</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-muted mt-3 text-center italic">
                Secure digital verification provided by {certificate.issuer}.
              </p>
            </div>

            {/* Content Details Side */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-orbitron uppercase tracking-widest text-secondary font-bold">
                    Certification
                  </span>
                  <h3 className="text-xl font-bold text-white leading-snug mt-1 font-outfit">
                    {certificate.name}
                  </h3>
                </div>

                <div className="space-y-2.5 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      Issuer: <strong className="text-white">{certificate.issuer}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary shrink-0" />
                    <span>
                      Issued: <strong className="text-white">{certificate.date}</strong>
                    </span>
                  </div>
                  {certificate.credentialId && (
                    <div className="text-xs font-mono bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg inline-block">
                      ID: <span className="text-accent">{certificate.credentialId}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-orbitron uppercase tracking-wider text-white font-bold mb-2">
                    Skills Validated
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary/15 text-secondary border border-secondary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={certificate.credentialUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-xs hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 clickable"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify Credential</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
