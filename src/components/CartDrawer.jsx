import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Dumbbell, Lock, Zap } from 'lucide-react'

const SPRING = { type: 'spring', stiffness: 50, damping: 22 }

export default function CartDrawer({ isOpen, onClose, product, quantity, onQuantityChange }) {
  const total = product.price * quantity

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-void/70 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SPRING}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-obsidian z-50 flex flex-col shadow-2xl border-l border-steel/40"
            role="dialog"
            aria-label="Votre sélection"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-steel/40">
              <div className="flex items-center gap-3">
                <Dumbbell size={17} strokeWidth={1.5} className="text-white" />
                <span className="text-[11px] tracking-[0.22em] uppercase text-bone font-medium font-heading">
                  Votre Sélection
                </span>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-shadow border border-transparent hover:border-steel/60 transition-all"
                aria-label="Fermer"
              >
                <X size={18} strokeWidth={1.5} className="text-chrome" />
              </motion.button>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto px-8 py-8">

              <div className="flex gap-5">
                <div className="w-24 h-28 rounded-xl overflow-hidden bg-shadow flex-shrink-0 border border-steel/40">
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80"
                    alt="Programme de coaching"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <p className="font-heading font-bold text-lg text-bone leading-snug tracking-wide uppercase">
                      {product.label}
                    </p>
                    <p className="text-xs text-ash mt-1.5 tracking-wide">
                      {product.volume}
                    </p>
                  </div>
                  <p className="font-stats text-2xl text-white tracking-wider">{product.priceLabel}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-shadow border border-steel/40">
                <Zap size={13} strokeWidth={1.5} className="text-white flex-shrink-0" />
                <p className="text-[11px] text-chrome tracking-wide">
                  Accès immédiat · Suivi coach inclus · Mise à jour à vie
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase text-ash font-heading">
                  Quantité
                </span>
                <div className="flex items-center gap-4 border border-steel/60 rounded-xl px-5 py-2.5 bg-shadow">
                  <button
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    className="text-chrome hover:text-white transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                    aria-label="Diminuer"
                  >
                    <Minus size={13} strokeWidth={1.5} />
                  </button>
                  <span className="text-sm font-medium w-5 text-center tabular-nums text-bone">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="text-chrome hover:text-white transition-colors"
                    aria-label="Augmenter"
                  >
                    <Plus size={13} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-steel/40">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-ash font-heading">
                    Total
                  </span>
                  <span className="font-stats text-4xl text-bone tracking-wider">{total} €</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Zap size={13} strokeWidth={1.5} className="text-white flex-shrink-0" />
                  <p className="text-xs text-ash">Accès instantané après paiement</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 py-6 border-t border-steel/40 bg-abyss">
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: '0 0 24px rgba(255, 255, 255, 0.10)' }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-full bg-white text-void py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-bone transition-colors duration-300 font-heading font-bold"
              >
                <Lock size={13} strokeWidth={1.5} />
                <span className="text-[11px] tracking-[0.22em] uppercase">
                  Commencer maintenant
                </span>
              </motion.button>
              <p className="text-center text-[10px] text-ash/60 mt-3 tracking-wide">
                Paiement sécurisé SSL · Satisfait ou remboursé 30 jours
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
