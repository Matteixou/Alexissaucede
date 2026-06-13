import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function Section({ title, children }) {
  return (
    <div className="border-t border-steel/30 pt-8">
      <h2 className="font-heading font-bold text-lg text-bone uppercase tracking-[0.15em] mb-4">
        {title}
      </h2>
      <div className="text-sm text-ash leading-[1.85] space-y-2">
        {children}
      </div>
    </div>
  )
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-void font-sans antialiased">
      {/* Header */}
      <div className="border-b border-steel/30 bg-abyss">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-6 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-ash hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            Retour au site
          </Link>
        </div>
      </div>

      {/* Contenu */}
      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-24 flex flex-col gap-10">

        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: '#E8FF00' }}>
            Informations légales
          </p>
          <h1 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase">
            Mentions Légales
          </h1>
        </div>

        <Section title="Éditeur du site">
          <p><span className="text-bone font-medium">Raison sociale :</span> Alexis Saucede Coaching</p>
          <p><span className="text-bone font-medium">Responsable de publication :</span> Alexis Saucede</p>
          <p><span className="text-bone font-medium">Adresse :</span> Saint-Mandé, 94160, France</p>
          <p><span className="text-bone font-medium">Téléphone :</span> 06 35 54 48 56</p>
          <p><span className="text-bone font-medium">Email :</span>{' '}
            <a href="mailto:alexis.saucede@gmail.com" className="text-bone hover:text-white transition-colors underline underline-offset-4 decoration-steel/50">
              alexis.saucede@gmail.com
            </a>
          </p>
        </Section>

        <Section title="Hébergement">
          <p><span className="text-bone font-medium">Hébergeur :</span> Vercel Inc.</p>
          <p><span className="text-bone font-medium">Adresse :</span> 340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis</p>
          <p><span className="text-bone font-medium">Site :</span>{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-bone hover:text-white transition-colors underline underline-offset-4 decoration-steel/50">
              vercel.com
            </a>
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, etc.) est la propriété exclusive d'Alexis Saucede Coaching, sauf mention contraire.
          </p>
          <p>
            Toute reproduction, distribution, modification ou utilisation de ces contenus, sous quelque forme que ce soit, sans autorisation écrite préalable, est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
          </p>
        </Section>

        <Section title="Données personnelles (RGPD)">
          <p>
            Les informations recueillies via le formulaire de contact sont destinées exclusivement à Alexis Saucede Coaching dans le cadre de la prise en charge de votre demande.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition à vos données personnelles.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à :{' '}
            <a href="mailto:alexis.saucede@gmail.com" className="text-bone hover:text-white transition-colors underline underline-offset-4 decoration-steel/50">
              alexis.saucede@gmail.com
            </a>
          </p>
          <p>
            Les données collectées ne sont jamais vendues, louées ou cédées à des tiers.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Ce site utilise Google Tag Manager à des fins d'analyse d'audience. Ces cookies sont déposés par un service tiers (Google) et sont soumis à leur propre politique de confidentialité.
          </p>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies ou être informé de leur dépôt.
          </p>
        </Section>

        <Section title="Liens hypertextes">
          <p>
            Ce site peut contenir des liens vers des sites externes. Alexis Saucede Coaching n'est pas responsable du contenu de ces sites et ne saurait être tenu responsable de tout dommage résultant de leur utilisation.
          </p>
        </Section>

        <Section title="Droit applicable">
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
          <p className="text-ash/50 text-xs">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </Section>

      </main>

      <footer className="border-t border-steel/40 py-8 text-center">
        <p className="text-xs text-ash/40">© {new Date().getFullYear()} Alexis Saucede. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
