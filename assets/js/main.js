/**
 * ============================================================================
 * PORTFOLIO PERSONNEL — KAMARA MOHAMED MOUSSA
 * Développeur Web & Concepteur d'Applications (BTS IDA)
 * Scripts JavaScript interactifs, optimisés et modulaires
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 01. GESTION DU MENU MOBILE (HAMBURGER)
  // --------------------------------------------------------------------------
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link, .nav-contact-btn");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Fermer le menu lors d'un clic en dehors
    document.addEventListener("click", (e) => {
      if (!navigation.contains(e.target) && !menuToggle.contains(e.target) && navigation.classList.contains("open")) {
        navigation.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 02. HEADER SCROLL & OMBRE DYNAMIQUE
  // --------------------------------------------------------------------------
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 03. SCROLLSPY (MISE EN AVANT DU LIEN ACTIF DANS LA NAVIGATION)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const spyLinks = document.querySelectorAll(".nav-link");

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        spyLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.25, rootMargin: "-70px 0px -40% 0px" });

  sections.forEach((sec) => scrollSpyObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 04. ANIMATION AU DÉFILEMENT (REVEAL)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
    revealObserver.observe(el);
  });

  // --------------------------------------------------------------------------
  // 05. GESTION DU FORMULAIRE DE CONTACT & ENVOI WHATSAPP
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const btnWhatsapp = document.getElementById("btn-send-whatsapp");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const subject = document.getElementById("form-subject").value;
      const message = document.getElementById("form-message").value.trim();

      if (!name || !email || !message) {
        showToast("Veuillez remplir tous les champs obligatoires (*).");
        return;
      }

      // Préparation du lien mailto encodé
      const body = `Bonjour Mohamed,\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:kamaramhdpirate@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      showToast("Ouverture de votre messagerie...");
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
    });
  }

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", () => {
      const name = document.getElementById("form-name").value.trim() || "Un recruteur / visiteur";
      const subject = document.getElementById("form-subject").value;
      const message = document.getElementById("form-message").value.trim();

      const text = `Bonjour Mohamed,\nJe m'appelle ${name}.\nObjet: ${subject}\n\n${message || "Je souhaite échanger avec vous au sujet d'une opportunité."}`;
      const whatsappUrl = `https://wa.me/2250749228891?text=${encodeURIComponent(text)}`;
      
      showToast("Redirection vers WhatsApp...");
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 300);
    });
  }

  // --------------------------------------------------------------------------
  // 06. ANNÉE COURANTE DYNAMIQUE DANS LE FOOTER
  // --------------------------------------------------------------------------
  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});

// ----------------------------------------------------------------------------
// 07. BASE DE DONNÉES DES PROJETS & MODAL DÉTAILLÉ
// ----------------------------------------------------------------------------
const projectsData = {
  hotel: {
    badge: "Application Web Dynamique",
    title: "Système de Gestion Hôtelière & Réservation en Ligne",
    lead: "Une application web conçue pour automatiser et optimiser la chaîne opérationnelle d'un établissement hôtelier : du catalogue en ligne jusqu'au suivi journalier des séjours.",
    features: [
      "Espace Client avec inscription, connexion chiffrée et historique personnel des réservations.",
      "Catalogue dynamique des chambres avec filtrage par catégorie (Simple, Double, Suite), tarifs et photos.",
      "Moteur de vérification de disponibilité en temps réel selon les dates d'arrivée et de départ choisies.",
      "Module d'administration (Back-Office) pour le gestionnaire : ajout/modification de chambres, gestion des prix par saison.",
      "Suivi opérationnel des Check-in et Check-out avec attribution de statut et alertes pour le personnel d'accueil.",
      "Génération automatique d'un récapitulatif de facture pour chaque séjour validé."
    ],
    technicalHighlights: [
      "Architecture PHP MVC modulaire séparant contrôleurs, modèles de données et vues.",
      "Base de données relationnelle MySQL normalisée (Tables Clients, Chambres, Catégories, Réservations, Paiements).",
      "Sécurisation backend : requêtes préparées PDO contre les injections SQL, hashage d'empreintes de mots de passe, sessions sécurisées.",
      "Interactivité JavaScript pour la validation instantanée des formulaires côté client sans rechargement intempestif."
    ],
    stack: ["PHP 8", "MySQL", "JavaScript ES6", "HTML5", "CSS3", "Architecture MVC", "PDO"]
  },
  personnel: {
    badge: "Système RH & Gestion de Données",
    title: "Système de Gestion du Personnel & des Ressources Humaines",
    lead: "Application de gestion d'entreprise permettant aux services RH de centraliser, sécuriser et exploiter l'ensemble des données administratives des collaborateurs.",
    features: [
      "Gestion centralisée des fiches collaborateurs : état civil, coordonnées, date d'embauche, poste occupé.",
      "Organisation par départements et services (Comptabilité, Informatique, Commercial, etc.) avec hiérarchie claire.",
      "Suivi des contrats de travail (CDI, CDD, Stage) avec alertes sur les dates d'échéance des contrats temporaires.",
      "Gestion des demandes de congés, absences justifiées et archivage des historiques administratifs.",
      "Moteur de recherche multicritère et filtres rapides par employé, service ou statut professionnel.",
      "Génération d'états récapitulatifs prêts pour l'impression ou l'exportation pour la direction générale."
    ],
    technicalHighlights: [
      "Conception du Modèle Conceptuel de Données (MCD) selon la méthode Merise pour garantir l'intégrité relationnelle.",
      "Gestion des clés étrangères et contraintes d'intégrité référentielle sous MySQL et Microsoft Access.",
      "Interface utilisateur claire, rapide et pensée pour une saisie bureautique fluide et sans erreur.",
      "Séparation des droits d'accès selon les profils utilisateurs (Administrateur RH vs Consultation simple)."
    ],
    stack: ["PHP", "MySQL", "Microsoft Access", "Méthode Merise", "HTML5", "CSS3"]
  },
  communaute: {
    badge: "Vision Entrepreneuriale & Innovation",
    title: "Hub & Espace Collaboratif pour Développeurs Informatiques",
    lead: "Un projet ambitieux né d'une vision forte : créer en Côte d'Ivoire un véritable tiers-lieu numérique et physique où les informaticiens et étudiants peuvent se rassembler, collaborer et transformer leurs idées en succès.",
    features: [
      "Espace communautaire d'entraide technique : résolution collaborative de bugs, partages de documentations et retours d'expérience.",
      "Sessions de revue de code (Code Reviews) et mentorat mutuel entre développeurs juniors et profils expérimentés.",
      "Co-working et émulation collective : un environnement stimulant pour rompre l'isolement du développeur.",
      "Incubateur de projets locaux : mise en relation d'idées avec les compétences techniques nécessaires pour les réaliser.",
      "Ateliers pratiques réguliers sur les technologies émergentes, le développement web et l'insertion professionnelle."
    ],
    technicalHighlights: [
      "Plateforme web communautaire prévue avec espaces projets, forums thématiques et profils de compétences.",
      "Vision stratégique axée sur l'essor de l'écosystème numérique ivoirien et ouest-africain.",
      "Approche collaborative valorisant l'open-source, l'apprentissage continu et l'esprit entrepreneurial."
    ],
    stack: ["Projet en incubation", "Web Communautaire", "Mentorat Tech", "Innovation Numérique"]
  }
};

/**
 * Ouvre la boîte de dialogue modale avec les détails du projet
 * @param {string} projectId 
 */
function openProjectModal(projectId) {
  const project = projectsData[projectId];
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-dynamic-content");

  if (!project || !modal || !modalContent) return;

  const featuresHtml = project.features.map(f => `
    <li>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${f}</span>
    </li>
  `).join("");

  const technicalHtml = project.technicalHighlights.map(t => `
    <li>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${t}</span>
    </li>
  `).join("");

  const stackHtml = project.stack.map(s => `<span>${s}</span>`).join("");

  modalContent.innerHTML = `
    <span class="modal-project-badge">${project.badge}</span>
    <h2 class="modal-title">${project.title}</h2>
    <p class="modal-lead">${project.lead}</p>

    <h3 class="modal-section-title">Fonctionnalités Clés</h3>
    <ul class="modal-features-list">
      ${featuresHtml}
    </ul>

    <h3 class="modal-section-title">Points Forts & Architecture Technique</h3>
    <ul class="modal-features-list">
      ${technicalHtml}
    </ul>

    <h3 class="modal-section-title">Technologies & Outils Mobilisés</h3>
    <div class="modal-stack-tags">
      ${stackHtml}
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/**
 * Ferme la boîte de dialogue modale
 */
function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Fermeture de la modale par clic sur le fond sombre ou via la touche Échap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

const modalOverlay = document.getElementById("project-modal");
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeProjectModal();
    }
  });
}

// ----------------------------------------------------------------------------
// 08. COPIE DANS LE PRESSE-PAPIER & NOTIFICATION TOAST
// ----------------------------------------------------------------------------
let toastTimeout = null;

/**
 * Copie un texte dans le presse-papier et affiche une notification
 * @param {string} text - Le texte à copier
 * @param {string} feedbackMessage - Le message de confirmation
 */
function copyToClipboard(text, feedbackMessage = "Copié dans le presse-papier !") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(feedbackMessage);
    }).catch(() => {
      fallbackCopy(text, feedbackMessage);
    });
  } else {
    fallbackCopy(text, feedbackMessage);
  }
}

function fallbackCopy(text, feedbackMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(feedbackMessage);
  } catch (err) {
    showToast("Impossible de copier automatiquement.");
  }
  document.body.removeChild(textArea);
}

/**
 * Affiche une bulle de notification temporaire
 * @param {string} message 
 */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
