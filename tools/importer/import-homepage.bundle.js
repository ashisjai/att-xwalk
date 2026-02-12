var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/firstnet-hero.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".marquee-item > img") || element.querySelector(".marquee-item img:first-of-type");
    const overlay = element.querySelector(".marquee-overlay") || element.querySelector(".marquee-overlay-container");
    const contentFrag = document.createDocumentFragment();
    if (overlay) {
      const eyebrow = overlay.querySelector("h3");
      if (eyebrow) contentFrag.appendChild(eyebrow);
      const heading = overlay.querySelector("h2:not(:empty)");
      if (heading && heading.textContent.trim()) contentFrag.appendChild(heading);
      const desc = overlay.querySelector("p");
      if (desc) contentFrag.appendChild(desc);
      const cta = overlay.querySelector('a.att-button, a[class*="button"]');
      if (cta) {
        const p = document.createElement("p");
        const link = document.createElement("a");
        link.href = cta.href;
        link.textContent = cta.textContent.trim();
        p.appendChild(link);
        contentFrag.appendChild(p);
      }
    }
    const cells = [];
    if (bgImage) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(bgImage);
      cells.push([imgFrag]);
    } else {
      cells.push([""]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    textFrag.appendChild(contentFrag);
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "firstnet-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/firstnet-cards-offers.js
  function parse2(element, { document }) {
    const cardTiles = element.querySelectorAll(".card-tile");
    const cells = [];
    cardTiles.forEach((card) => {
      const img = card.querySelector(".img-section img") || card.querySelector("img.img-responsive") || card.querySelector("img");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (img) {
        imgFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const eyebrow = card.querySelector(".eyebrow");
      if (eyebrow && eyebrow.textContent.trim()) {
        const em = document.createElement("em");
        em.textContent = eyebrow.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(em);
        textFrag.appendChild(p);
      }
      const heading = card.querySelector(".heading");
      if (heading && heading.textContent.trim()) {
        const strong = document.createElement("strong");
        strong.textContent = heading.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(strong);
        textFrag.appendChild(p);
      }
      const bodyText = card.querySelector(".bodyText p") || card.querySelector(".bodyText");
      if (bodyText && bodyText.textContent.trim()) {
        if (bodyText.tagName === "P") {
          textFrag.appendChild(bodyText);
        } else {
          const p = document.createElement("p");
          p.textContent = bodyText.textContent.trim();
          textFrag.appendChild(p);
        }
      }
      const ctaLinks = card.querySelectorAll(".cta-section a");
      ctaLinks.forEach((cta) => {
        if (cta.textContent.trim()) {
          const p = document.createElement("p");
          const link = document.createElement("a");
          link.href = cta.href;
          link.textContent = cta.textContent.trim();
          p.appendChild(link);
          textFrag.appendChild(p);
        }
      });
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "firstnet-cards-offers", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/firstnet-columns.js
  function parse3(element, { document }) {
    const columnItems = element.querySelectorAll(".ig-block");
    const row = [];
    columnItems.forEach((item) => {
      const colFrag = document.createDocumentFragment();
      const icon = item.querySelector("img");
      if (icon) {
        colFrag.appendChild(icon);
      }
      const titleEl = item.querySelector(".icon-grid-icon-title p") || item.querySelector(".icon-grid-icon-title");
      if (titleEl && titleEl.textContent.trim()) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = titleEl.textContent.trim();
        p.appendChild(strong);
        colFrag.appendChild(p);
      }
      const descEl = item.querySelector(".icon-grid-icon-description p") || item.querySelector(".icon-grid-icon-description");
      if (descEl && descEl.textContent.trim()) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        colFrag.appendChild(p);
      }
      row.push(colFrag);
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "firstnet-columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/firstnet-cards-news.js
  function parse4(element, { document }) {
    const cardTiles = element.querySelectorAll(".card-tile");
    const cells = [];
    cardTiles.forEach((card) => {
      const img = card.querySelector(".img-section img") || card.querySelector("img.img-responsive") || card.querySelector("img");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (img) {
        imgFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const eyebrow = card.querySelector(".eyebrow");
      if (eyebrow && eyebrow.textContent.trim()) {
        const em = document.createElement("em");
        em.textContent = eyebrow.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(em);
        textFrag.appendChild(p);
      }
      const heading = card.querySelector(".heading");
      if (heading && heading.textContent.trim()) {
        const strong = document.createElement("strong");
        strong.textContent = heading.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(strong);
        textFrag.appendChild(p);
      }
      const bodyText = card.querySelector(".bodyText p") || card.querySelector(".bodyText");
      if (bodyText && bodyText.textContent.trim()) {
        if (bodyText.tagName === "P") {
          textFrag.appendChild(bodyText);
        } else {
          const p = document.createElement("p");
          p.textContent = bodyText.textContent.trim();
          textFrag.appendChild(p);
        }
      }
      const ctaLinks = card.querySelectorAll(".cta-section a");
      ctaLinks.forEach((cta) => {
        if (cta.textContent.trim()) {
          const p = document.createElement("p");
          const link = document.createElement("a");
          link.href = cta.href;
          link.textContent = cta.textContent.trim();
          p.appendChild(link);
          textFrag.appendChild(p);
        }
      });
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "firstnet-cards-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/firstnet-form.js
  function parse5(element, { document }) {
    const defaultContent = document.createDocumentFragment();
    const heading = element.querySelector(".col-text h2") || element.querySelector("h2");
    if (heading) {
      defaultContent.appendChild(heading);
    }
    const desc = element.querySelector(".description.email-txt") || element.querySelector("p.description");
    if (desc) {
      defaultContent.appendChild(desc);
    }
    const legalText = element.querySelector(".legal-text.email-txt") || element.querySelector("p.legal-text");
    if (legalText) {
      defaultContent.appendChild(legalText);
    }
    const refCell = document.createDocumentFragment();
    refCell.appendChild(document.createComment(" field:reference "));
    const refLink = document.createElement("a");
    refLink.href = "/forms/email-signup.json";
    refLink.textContent = "/forms/email-signup.json";
    refCell.appendChild(refLink);
    const actionCell = document.createDocumentFragment();
    actionCell.appendChild(document.createComment(" field:action "));
    const form = element.querySelector("form");
    const actionUrl = form && form.action ? form.action : "/email-signup";
    const actionText = document.createElement("p");
    actionText.textContent = actionUrl;
    actionCell.appendChild(actionText);
    const cells = [
      [refCell],
      // Row 1: reference field
      [actionCell]
      // Row 2: action field
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "firstnet-form", cells });
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(defaultContent);
    wrapper.appendChild(block);
    const parent = element.parentElement;
    element.replaceWith(wrapper);
    if (parent) {
      parent.querySelectorAll("form, input, select, textarea").forEach((el) => el.remove());
      parent.querySelectorAll("ul").forEach((ul) => {
        if (ul.textContent.trim() === "") ul.remove();
      });
      parent.querySelectorAll("p").forEach((p) => {
        const img = p.querySelector("img");
        const link = p.querySelector("a");
        const text = p.textContent.trim();
        if (img) {
          const src = img.getAttribute("src") || "";
          if (src.includes("bat.bing.com") || src.includes("rlcdn.com") || src.includes("verint") || src.includes(".gif")) {
            p.remove();
            return;
          }
        }
        if (link && (text === "\xD7" || text === "x") && (!link.href || link.href === "" || link.href.endsWith("#"))) {
          p.remove();
          return;
        }
        if (text === "Submit" || text === "Feedback" || text === "Please provide the following information to access your document:" || text.startsWith("By submitting this form")) {
          p.remove();
          return;
        }
        if (!img && !link && text.length < 30 && !p.querySelector("strong, em, h1, h2, h3, h4, h5, h6")) {
          const prevSibling = p.previousElementSibling;
          const nextSibling = p.nextElementSibling;
          if (prevSibling && prevSibling.tagName === "P" && prevSibling.textContent.trim().length < 30 || nextSibling && nextSibling.tagName === "UL" && nextSibling.textContent.trim() === "") {
            p.remove();
          }
        }
      });
    }
  }

  // tools/importer/transformers/firstnet-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".modal-anchor",
        ".modal",
        ".modal-backdrop",
        '[class*="cookie"]',
        '[id*="cookie"]',
        "noscript"
      ]);
      const placeholderImgs = element.querySelectorAll('img[src^="data:image/gif"]');
      placeholderImgs.forEach((img) => img.remove());
      const hiddenInputs = element.querySelectorAll('input[type="hidden"], input.input-hidden');
      hiddenInputs.forEach((input) => input.remove());
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "nav",
        "nav.main-navigation",
        "header",
        "footer",
        "footer.Att-Footer",
        ".Att-Footer",
        ".Att-Header",
        '[class*="breadcrumb"]',
        '[class*="globalNav"]',
        '[class*="global-nav"]',
        '[class*="site-header"]',
        '[class*="site-footer"]',
        '[id*="globalNav"]',
        '[id*="sitemap"]',
        '[role="navigation"]',
        '[role="banner"]',
        '[role="contentinfo"]',
        "iframe",
        "link",
        "script",
        ".skip-nav",
        ".sr-only",
        ".gated-content-form",
        '[class*="chat-widget"]',
        '[id*="chat"]'
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("data-sitecat-cta");
        el.removeAttribute("data-sitecat-position");
        el.removeAttribute("data-sitecat-datatype");
        el.removeAttribute("onclick");
      });
      WebImporter.DOMUtils.remove(element, [
        ".gated-form",
        '[class*="gated-content"]',
        '[class*="gatedContent"]',
        ".modal-form"
      ]);
      element.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (src.includes("bat.bing.com") || src.includes("rlcdn.com") || src.includes("d41.co") || src.includes("demdex.net") || src.includes("doubleclick.net") || src.includes("facebook.com/tr") || src.includes("verint") || src.endsWith(".gif") && img.width <= 1) {
          const parent = img.closest("p") || img.parentElement;
          if (parent && parent.children.length <= 1) {
            parent.remove();
          } else {
            img.remove();
          }
        }
      });
      WebImporter.DOMUtils.remove(element, [
        '[class*="verint"]',
        '[id*="verint"]',
        '[class*="foresee"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".featured-products-container",
        ".error-dropdown-msg",
        ".mobile-image"
      ]);
      const formFieldLabels = /* @__PURE__ */ new Set([
        "first name",
        "last name",
        "company",
        "company name",
        "title",
        "title name",
        "city",
        "state",
        "zip code",
        "email",
        "email address",
        "phone",
        "phone number",
        "submit",
        "feedback"
      ]);
      element.querySelectorAll("p").forEach((p) => {
        const text = p.textContent.trim();
        const lower = text.toLowerCase();
        const link = p.querySelector("a");
        if (link && (text === "\xD7" || text === "x")) {
          p.remove();
          return;
        }
        if (formFieldLabels.has(lower)) {
          p.remove();
          return;
        }
        if (text === "Please provide the following information to access your document:" || text.startsWith("By submitting this form")) {
          p.remove();
          return;
        }
      });
      element.querySelectorAll("ul").forEach((ul) => {
        if (ul.textContent.trim() === "") {
          ul.remove();
        }
      });
    }
  }

  // tools/importer/transformers/firstnet-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function findSectionElement(element, selector) {
    if (Array.isArray(selector)) {
      for (const sel of selector) {
        const found = element.querySelector(sel);
        if (found) return found;
      }
      return null;
    }
    return element.querySelector(selector);
  }
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.afterTransform) return;
    const { document } = payload;
    const template = payload.template;
    if (!template || !template.sections || template.sections.length <= 1) return;
    const sections = template.sections;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = findSectionElement(element, section.selector);
      if (!sectionEl) continue;
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        if (i < sections.length - 1) {
          const nextSection = sections[i + 1];
          const nextSectionEl = findSectionElement(element, nextSection.selector);
          if (nextSectionEl) {
            nextSectionEl.before(sectionMetadata);
          } else {
            element.append(sectionMetadata);
          }
        } else {
          element.append(sectionMetadata);
        }
      }
      if (i > 0) {
        const hr = document.createElement("hr");
        sectionEl.before(hr);
      }
    }
  }

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "FirstNet.com homepage - main landing page with hero, feature sections, and call-to-action areas for first responder network services",
    urls: [
      "https://www.firstnet.com/"
    ],
    blocks: [
      {
        name: "firstnet-hero",
        instances: [".marquee-heading"]
      },
      {
        name: "firstnet-cards-offers",
        instances: [".new-offers-card:first-of-type .offersCard"]
      },
      {
        name: "firstnet-columns",
        instances: [".icon-grid-description.icon-grid"]
      },
      {
        name: "firstnet-cards-news",
        instances: [".new-offers-card:last-of-type .offersCard"]
      },
      {
        name: "firstnet-form",
        instances: ["section.firstnet-email-sub"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".marquee-heading",
        style: null,
        blocks: ["firstnet-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Offers Discounts",
        selector: [".segment-heading:has(h3.no-title:not(.white-text)):first-of-type", ".new-offers-card:first-of-type"],
        style: null,
        blocks: ["firstnet-cards-offers"],
        defaultContent: ["section.segment-heading:has(h3:not(.white-text)):first-of-type"]
      },
      {
        id: "section-3",
        name: "Why FirstNet Features",
        selector: [".segment-heading:has(.white-text)", ".icon-grid-description.icon-grid", ".call-to-action:nth-of-type(2)", ".legal-text.text:has(.white-text)"],
        style: "dark-navy",
        blocks: ["firstnet-columns"],
        defaultContent: ["section.segment-heading:has(.white-text)", ".call-to-action:nth-of-type(2)", ".legal-text.text:has(.white-text)"]
      },
      {
        id: "section-4",
        name: "Latest News",
        selector: [".segment-heading:has(h3.black-text)", ".new-offers-card:last-of-type", ".call-to-action:has(.icon-long-arrow)"],
        style: null,
        blocks: ["firstnet-cards-news"],
        defaultContent: ["section.segment-heading:has(h3.black-text)", ".call-to-action:has(.icon-long-arrow)"]
      },
      {
        id: "section-5",
        name: "Contact CTA",
        selector: ".experiencefragment:has(h3 span)",
        style: "light-grey",
        blocks: [],
        defaultContent: [".experiencefragment:has(h3 span)"]
      },
      {
        id: "section-6",
        name: "Email Signup Banner",
        selector: ".experiencefragment:has(#firstnet-email-signup)",
        style: "dark-blue-accent",
        blocks: ["firstnet-form"],
        defaultContent: [".col-text h2", "p.description.email-txt", "p.legal-text.email-txt"]
      }
    ]
  };
  var parsers = {
    "firstnet-hero": parse,
    "firstnet-cards-offers": parse2,
    "firstnet-columns": parse3,
    "firstnet-cards-news": parse4,
    "firstnet-form": parse5
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      main.querySelectorAll("script").forEach((s) => s.remove());
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const formLabels = [
        "first name",
        "last name",
        "company",
        "company name",
        "title",
        "title name",
        "city",
        "state",
        "zip code",
        "email",
        "email address",
        "phone",
        "phone number",
        "submit",
        "feedback"
      ];
      const formLabelSet = new Set(formLabels);
      [...main.querySelectorAll("p, span, label, div, li, td")].forEach((el) => {
        const text = (el.textContent || "").replace(/\u00A0/g, " ").trim();
        const lower = text.toLowerCase();
        if (el.children.length > 0 && el.tagName !== "P") {
          const hasBlockChild = el.querySelector("div, table, ul, ol, h1, h2, h3, h4, h5, h6, section");
          if (hasBlockChild) return;
        }
        if (el.querySelector("a") && (text === "\xD7" || text === "\xD7" || lower === "x")) {
          el.remove();
          return;
        }
        const img = el.querySelector("img");
        if (img) {
          const src = img.getAttribute("src") || "";
          if (src.includes("verint") || src.includes("bat.bing.com") || src.includes("rlcdn.com") || src.includes("d41.co") || src.includes(".gif")) {
            el.remove();
            return;
          }
        }
        if (formLabelSet.has(lower)) {
          el.remove();
          return;
        }
        if (lower.startsWith("please provide the following information") || lower.startsWith("by submitting this form")) {
          el.remove();
          return;
        }
      });
      [...main.querySelectorAll("ul")].forEach((ul) => {
        if ((ul.textContent || "").trim() === "") ul.remove();
      });
      [...main.querySelectorAll("input, select, textarea")].forEach((el) => el.remove());
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      const frozen = main.cloneNode(true);
      return [{
        element: frozen,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
