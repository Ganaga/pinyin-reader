/**
 * Bootstrap 5 utilities
 */
import { Tooltip } from 'bootstrap';

/**
 * Initialize Bootstrap tooltips
 * @param {string} selector - CSS selector for elements with tooltips
 * @returns {Array} Array of Tooltip instances
 */
export function initTooltips(selector = '[data-bs-toggle="tooltip"]') {
  const tooltipElements = document.querySelectorAll(selector);
  return [...tooltipElements].map(el => new Tooltip(el, {
    html: true,
    placement: 'top'
  }));
}

/**
 * Dispose all tooltips
 * @param {Array} tooltips - Array of Tooltip instances
 */
export function disposeTooltips(tooltips) {
  if (tooltips && Array.isArray(tooltips)) {
    tooltips.forEach(tooltip => tooltip.dispose());
  }
}

/**
 * Reinitialize tooltips (dispose old ones and create new ones)
 * @param {Array} oldTooltips - Array of old Tooltip instances to dispose
 * @param {string} selector - CSS selector for new tooltips
 * @returns {Array} Array of new Tooltip instances
 */
export function reinitTooltips(oldTooltips, selector = '[data-bs-toggle="tooltip"]') {
  disposeTooltips(oldTooltips);
  return initTooltips(selector);
}
