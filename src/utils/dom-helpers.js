/**
 * Lightweight jQuery-like helpers for DOM manipulation
 */

// Selectors
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

// DOM Manipulation utilities
export const dom = {
  // Class manipulation
  addClass: (el, className) => el?.classList.add(className),
  removeClass: (el, className) => el?.classList.remove(className),
  toggleClass: (el, className) => el?.classList.toggle(className),
  hasClass: (el, className) => el?.classList.contains(className),

  // Display
  show: (el) => {
    if (el) el.style.display = 'block';
  },
  hide: (el) => {
    if (el) el.style.display = 'none';
  },
  toggle: (el) => {
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  },

  // Content
  empty: (el) => {
    if (el) el.innerHTML = '';
  },
  html: (el, content) => {
    if (el) el.innerHTML = content;
  },
  append: (el, content) => {
    if (el) el.insertAdjacentHTML('beforeend', content);
  },

  // Attributes
  attr: (el, name, value) => {
    if (el) {
      if (value === undefined) {
        return el.getAttribute(name);
      }
      el.setAttribute(name, value);
    }
  },

  // Styles
  css: (el, property, value) => {
    if (el) {
      if (typeof property === 'object') {
        Object.assign(el.style, property);
      } else {
        el.style[property] = value;
      }
    }
  },

  // Values
  val: (el, value) => {
    if (el) {
      if (value === undefined) {
        return el.value;
      }
      el.value = value;
    }
  },

  // Scroll
  scrollTop: (el, value) => {
    if (el) {
      if (value === undefined) {
        return el.scrollTop;
      }
      el.scrollTop = value;
    }
  }
};

// Animation helpers
export const slideDown = (element, duration = 200) => {
  element.style.display = 'block';
  const height = element.scrollHeight;
  element.style.height = '0';
  element.style.overflow = 'hidden';
  element.style.transition = `height ${duration}ms ease`;

  requestAnimationFrame(() => {
    element.style.height = height + 'px';
  });

  setTimeout(() => {
    element.style.height = '';
    element.style.overflow = '';
    element.style.transition = '';
  }, duration);
};

export const slideUp = (element, duration = 200) => {
  const height = element.scrollHeight;
  element.style.height = height + 'px';
  element.style.overflow = 'hidden';
  element.style.transition = `height ${duration}ms ease`;

  requestAnimationFrame(() => {
    element.style.height = '0';
  });

  setTimeout(() => {
    element.style.display = 'none';
    element.style.height = '';
    element.style.overflow = '';
    element.style.transition = '';
  }, duration);
};

export const slideToggle = (element, duration = 200) => {
  if (element.style.display === 'none' || !element.style.display) {
    slideDown(element, duration);
  } else {
    slideUp(element, duration);
  }
};

// Event helpers
export const on = (el, event, handler) => {
  if (el) el.addEventListener(event, handler);
};

export const off = (el, event, handler) => {
  if (el) el.removeEventListener(event, handler);
};

// Iteration helper
export const each = (elements, callback) => {
  if (elements) {
    if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
      elements.forEach(callback);
    } else if (typeof elements === 'object') {
      Object.keys(elements).forEach(key => callback(elements[key], key));
    }
  }
};
