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

export default function CGV() {
  return (
    <div className="min-h-screen bg-void font-sans antialiased">
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

      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-24 flex flex-col gap-10">

        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: '#E8FF00' }}>
            Conditions contractuelles
          </p>
          <h1 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase">
            CGV
          </h1>
        </div>

        <Section title="Article 1 — Objet">
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre{' '}
            <span className="text-bone font-medium">Alexis Saucede Coaching</span> (ci-après « le Prestataire »),
            auto-entrepreneur, et tout client souhaitant bénéficier de ses services de coaching sportif personnalisé.
          </p>
        </Section>

        <Section title="Article 2 — Prestations proposées">
          <p>
            <span className="text-bone font-medium">Coaching en ligne :</span> Suivi à distance incluant programme
            d'entraînement personnalisé, directives nutritionnelles, suivi hebdomadaire et échanges réguliers.
            Tarif à partir de <span className="text-bone">100 €/mois</span>.
          </p>
          <p>
            <span className="text-bone font-medium">Coaching en présentiel :</span> Séances individuelles en salle ou
            en extérieur à Saint-Mandé (94). Tarif à partir de <span className="text-bone">70 €/séance</span>.
          </p>
          <p>
            Un bilan personnalisé gratuit est proposé avant tout engagement afin de définir les objectifs,
            le programme et le tarif adaptés.
          </p>
        </Section>

        <Section title="Article 3 — Modalités de commande">
          <p>
            La souscription débute par la prise de contact via le formulaire disponible sur le site ou
            par WhatsApp au <span className="text-bone">06 35 54 48 56</span>.
          </p>
          <p>
            Le contrat est conclu à la validation du programme personnalisé et au règlement de la première échéance.
          </p>
        </Section>

        <Section title="Article 4 — Tarifs et paiement">
          <p>Les tarifs définitifs sont communiqués lors du bilan personnalisé, en fonction du programme et de la durée d'engagement.</p>
          <p>Le paiement s'effectue par virement bancaire ou via les solutions de paiement proposées lors de la souscription.</p>
          <p>Tous les prix sont exprimés en euros, toutes taxes comprises (TVA non applicable, article 293 B du CGI).</p>
        </Section>

        <Section title="Article 5 — Durée et résiliation">
          <p>
            Le coaching en ligne est proposé avec un engagement minimum d'un (1) mois, renouvelable tacitement
            mois par mois.
          </p>
          <p>
            La résiliation doit être notifiée au moins{' '}
            <span className="text-bone">15 jours avant</span> la prochaine date d'échéance, par email à{' '}
            <a href="mailto:alexis.saucede@gmail.com" className="text-bone hover:text-white transition-colors underline underline-offset-4 decoration-steel/50">
              alexis.saucede@gmail.com
            </a>{' '}
            ou par WhatsApp.
          </p>
          <p>
            Les séances en présentiel sont payables à l'unité ou en forfait. Les forfaits sont non remboursables
            mais reportables en cas d'empêchement notifié au moins 24 h à l'avance.
          </p>
        </Section>

        <Section title="Article 6 — Droit de rétractation">
          <p>
            Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne s'applique
            pas aux prestations de service pleinement exécutées avant la fin du délai de rétractation avec
            l'accord exprès du consommateur.
          </p>
          <p>
            Si la prestation n'a pas débuté, le client dispose d'un délai de 14 jours calendaires à compter
            de la date de souscription pour exercer son droit de rétractation en contactant le Prestataire par email.
          </p>
        </Section>

        <Section title="Article 7 — Obligations du client">
          <p>
            Le client s'engage à fournir des informations exactes sur son état de santé et à signaler
            tout problème médical susceptible d'affecter sa pratique sportive.
          </p>
          <p>
            Le Prestataire décline toute responsabilité en cas de non-respect de ces obligations ou
            de pratique contraire aux recommandations transmises.
          </p>
        </Section>

        <Section title="Article 8 — Responsabilité">
          <p>
            Le Prestataire s'engage à mettre en œuvre tous les moyens nécessaires pour fournir un service de qualité.
            Les résultats dépendent de l'investissement, de la régularité et du respect du programme par le client.
          </p>
          <p>Aucun résultat spécifique ne saurait être garanti.</p>
        </Section>

        <Section title="Article 9 — Données personnelles">
          <p>
            Les données collectées dans le cadre de la relation commerciale sont traitées conformément au RGPD.
            Pour plus d'informations, consultez nos{' '}
            <Link to="/mentions-legales" className="text-bone hover:text-white transition-colors underline underline-offset-4 decoration-steel/50">
              Mentions légales
            </Link>.
          </p>
        </Section>

        <Section title="Article 10 — Droit applicable et litiges">
          <p>
            Les présentes CGV sont régies par le droit français. En cas de litige, les parties s'efforceront
            de trouver une solution amiable avant tout recours judiciaire. À défaut, les tribunaux de Paris
            seront seuls compétents.
          </p>
          <p className="text-ash text-xs">
            Dernière mise à jour : 18 septembre 2026
          </p>
        </Section>

      </main>

      <footer className="border-t border-steel/40 py-8 text-center">
        <p className="text-xs text-ash" suppressHydrationWarning>{`© ${new Date().getFullYear()} Alexis Saucede. Tous droits réservés.`}</p>
      </footer>
    </div>
  )
}
