"use strict";
/** Minimal HTML escaping to avoid injection through values */
function escapeHtml(input) {
    if (!input)
        return "";
    return String(input)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
