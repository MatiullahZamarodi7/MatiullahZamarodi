
      /* ================================================
           DEFAULT CONFIGURATION
           This defines all the editable content for the portfolio
           ================================================ */
      const defaultConfig = {
        // Hero Section
        hero_name: "Matiullah Zamarodi",
        hero_title: "Full Stack Developer",
        hero_subtitle:
          "Crafting digital experiences with clean code, innovative solutions, and a passion for excellence.",

        // About Section
        about_text:
          "I'm a passionate Full Stack Developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless digital experiences that combine beautiful design with robust functionality.",

        // Contact Info
        contact_email: "matiullah@example.com",
        contact_location: "Kabul, Afghanistan",

        // Colors (for customization)
        primary_color: "#fbbf24",
        secondary_color: "#a855f7",
        text_color: "#e8e8f0",
        background_color: "#0a0a0f",
        surface_color: "#12121a",
      };

      // Current configuration (will be updated by SDK)
      let config = { ...defaultConfig };

      /* ================================================
           ELEMENT SDK INITIALIZATION
           This connects the portfolio to Canva's editing system
           ================================================ */
      if (window.elementSdk) {
        window.elementSdk.init({
          defaultConfig: defaultConfig,

          // This function updates the UI when config changes
          onConfigChange: async function (newConfig) {
            config = newConfig;

            // Update Hero Section
            const heroName = document.getElementById("heroName");
            if (heroName) {
              heroName.innerHTML = `<span class="gradient-text animate-gradient">${config.hero_name || defaultConfig.hero_name}</span>`;
            }

            const heroTitle = document.getElementById("heroTitle");
            if (heroTitle) {
              heroTitle.textContent =
                config.hero_title || defaultConfig.hero_title;
            }

            const heroSubtitle = document.getElementById("heroSubtitle");
            if (heroSubtitle) {
              heroSubtitle.textContent =
                config.hero_subtitle || defaultConfig.hero_subtitle;
            }

            // Update About Section
            const aboutText = document.getElementById("aboutText");
            if (aboutText) {
              aboutText.textContent =
                config.about_text || defaultConfig.about_text;
            }

            // Update Contact Section
            const contactEmail = document.getElementById("contactEmail");
            if (contactEmail) {
              contactEmail.textContent =
                config.contact_email || defaultConfig.contact_email;
            }

            const contactLocation = document.getElementById("contactLocation");
            if (contactLocation) {
              contactLocation.textContent =
                config.contact_location || defaultConfig.contact_location;
            }

            // Update Colors (CSS Variables)
            document.documentElement.style.setProperty(
              "--color-primary",
              config.primary_color || defaultConfig.primary_color,
            );
            document.documentElement.style.setProperty(
              "--color-secondary",
              config.secondary_color || defaultConfig.secondary_color,
            );
            document.documentElement.style.setProperty(
              "--color-text",
              config.text_color || defaultConfig.text_color,
            );
            document.documentElement.style.setProperty(
              "--color-background",
              config.background_color || defaultConfig.background_color,
            );
            document.documentElement.style.setProperty(
              "--color-surface",
              config.surface_color || defaultConfig.surface_color,
            );
          },

          // This defines what can be customized (colors)
          mapToCapabilities: function (config) {
            return {
              recolorables: [
                // Background color
                {
                  get: () =>
                    config.background_color || defaultConfig.background_color,
                  set: (value) => {
                    config.background_color = value;
                    window.elementSdk.setConfig({ background_color: value });
                  },
                },
                // Surface color
                {
                  get: () =>
                    config.surface_color || defaultConfig.surface_color,
                  set: (value) => {
                    config.surface_color = value;
                    window.elementSdk.setConfig({ surface_color: value });
                  },
                },
                // Text color
                {
                  get: () => config.text_color || defaultConfig.text_color,
                  set: (value) => {
                    config.text_color = value;
                    window.elementSdk.setConfig({ text_color: value });
                  },
                },
                // Primary color (gold/yellow)
                {
                  get: () =>
                    config.primary_color || defaultConfig.primary_color,
                  set: (value) => {
                    config.primary_color = value;
                    window.elementSdk.setConfig({ primary_color: value });
                  },
                },
                // Secondary color (purple)
                {
                  get: () =>
                    config.secondary_color || defaultConfig.secondary_color,
                  set: (value) => {
                    config.secondary_color = value;
                    window.elementSdk.setConfig({ secondary_color: value });
                  },
                },
              ],
              borderables: [],
              fontEditable: undefined,
              fontSizeable: undefined,
            };
          },

          // This maps config to edit panel values
          mapToEditPanelValues: function (config) {
            return new Map([
              ["hero_name", config.hero_name || defaultConfig.hero_name],
              ["hero_title", config.hero_title || defaultConfig.hero_title],
              [
                "hero_subtitle",
                config.hero_subtitle || defaultConfig.hero_subtitle,
              ],
              ["about_text", config.about_text || defaultConfig.about_text],
              [
                "contact_email",
                config.contact_email || defaultConfig.contact_email,
              ],
              [
                "contact_location",
                config.contact_location || defaultConfig.contact_location,
              ],
            ]);
          },
        });
      }

      /* ================================================
           NAVIGATION FUNCTIONALITY
           ================================================ */

      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const mobileMenu = document.getElementById("mobileMenu");

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function () {
          mobileMenu.classList.toggle("hidden");
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll("a").forEach(function (link) {
          link.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
          });
        });
      }

      // Navbar scroll effect
      const navbar = document.getElementById("navbar");

      window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      /* ================================================
           CONTACT FORM FUNCTIONALITY
           ================================================ */
      const contactForm = document.getElementById("contactForm");
      const successMessage = document.getElementById("successMessage");

      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();

          // Get form data
          const formData = new FormData(contactForm);
          const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
          };

          // Log the form data (in a real app, this would be sent to a server)
          console.log("Form submitted:", data);

          // Show success message
          successMessage.classList.remove("hidden");

          // Reset form
          contactForm.reset();

          // Hide success message after 5 seconds
          setTimeout(function () {
            successMessage.classList.add("hidden");
          }, 5000);
        });
      }

      /* ================================================
           SCROLL ANIMATIONS
           Adds animation classes when elements come into view
           ================================================ */
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.style.opacity = "1";
          }
        });
      }, observerOptions);

      // Observe all glass panels and project cards
      document
        .querySelectorAll(".glass-panel, .project-card")
        .forEach(function (element) {
          element.style.opacity = "0";
          observer.observe(element);
        });

      /* ================================================
           SKILL BAR ANIMATION
           Animates skill bars when they come into view
           ================================================ */
      const skillObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const skillBars = entry.target.querySelectorAll(".skill-bar");
              skillBars.forEach(function (bar) {
                bar.style.animation = "fill-bar 1.5s ease-out forwards";
              });
            }
          });
        },
        { threshold: 0.5 },
      );

      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        skillObserver.observe(skillsSection);
      }






    //   -------------------------------part tow




      (function () {
        function c() {
          var b = a.contentDocument || a.contentWindow.document;
          if (b) {
            var d = b.createElement("script");
            d.innerHTML =
              "window.__CF$cv$params={r:'9cd482cbf43bdbff',t:'MTc3MDk4NzY1MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName("head")[0].appendChild(d);
          }
        }
        if (document.body) {
          var a = document.createElement("iframe");
          a.height = 1;
          a.width = 1;
          a.style.position = "absolute";
          a.style.top = 0;
          a.style.left = 0;
          a.style.border = "none";
          a.style.visibility = "hidden";
          document.body.appendChild(a);
          if ("loading" !== document.readyState) c();
          else if (window.addEventListener)
            document.addEventListener("DOMContentLoaded", c);
          else {
            var e = document.onreadystatechange || function () {};
            document.onreadystatechange = function (b) {
              e(b);
              "loading" !== document.readyState &&
                ((document.onreadystatechange = e), c());
            };
          }
        }
      })();




      // -----------------------------type one----------------------------------
      const messages = [
'<Active/>',
'<Z9-GPS/>',
'<Coding.../>',
'< hellow world />'
];

let messageIndex = 0;
let charIndex = 0;
let currentText = "";
let phase = "typing";

const typedText = document.getElementById("typed-text");

function typeEffect(){

let currentMessage = messages[messageIndex];
let speed = 100;

if(phase === "typing"){

if(charIndex < currentMessage.length){

currentText = currentMessage.substring(0,charIndex+1);
charIndex++;

}else{

phase="pause";
speed=1200;

}

}

else if(phase==="pause"){

phase="deleting";
speed=400;

}

else if(phase==="deleting"){

if(charIndex>0){

charIndex--;
currentText=currentMessage.substring(0,charIndex);
speed=70;

}else{

messageIndex++;

if(messageIndex===messages.length){

messageIndex=messages.length-1;
phase="final";

}else{

phase="typing";

}

}

}

else if(phase==="final"){

let finalText=messages[messages.length-1];

if(charIndex<finalText.length){

currentText=finalText.substring(0,charIndex+1);
charIndex++;
speed=200;

}else{

return;

}

}

typedText.textContent=currentText;

setTimeout(typeEffect,speed);

}

typeEffect();
    