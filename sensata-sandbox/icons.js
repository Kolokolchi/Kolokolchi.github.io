/* Artwork for the five concept marks and the four destinations in each icon family. */
const artwork = (() => {
  const marks = {
    forma: '<path fill="currentColor" fill-rule="evenodd" d="M2 42V20a12 12 0 0 1 24 0v22h-6V20a6 6 0 0 0-12 0v22zm22-28a12 12 0 0 1 22 6v22h-6V20a6 6 0 0 0-11-3.4l-.8 1.3a16 16 0 0 0-4.2-3.9ZM11 42V21a3 3 0 0 1 6 0v21zm18 0V21a3.5 3.5 0 0 1 7 0v21z"/>',
    orbita: '<g fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="24" cy="24" r="12"/><ellipse cx="24" cy="24" rx="23" ry="6.5" transform="rotate(-32 24 24)"/></g><circle fill="currentColor" cx="40" cy="7" r="3"/>',
    atlas: '<g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"><path d="m3 36 10-19 7 5L29 6l16 30-12 5-13-6-9 6z"/><path d="m11 35 4-9 7 5 8-14 9 17-6 3-12-6m2-6 7-12"/><path d="m27 29 3-5 5 9"/></g>',
    signal: '<path fill="currentColor" d="M2 9h13l13 15-13 15H2l13-15zm19 0h12l13 15-13 15H21l13-15z"/>',
    terra: '<g stroke="currentColor" stroke-width="2" fill="none"><path d="M6 36c0-12 6-24 18-29 12 5 18 17 18 29-10 6-26 6-36 0z"/><path d="M10 36C10 25 16 15 24 7c8 8 14 18 14 29M15 37c0-10 4-20 9-30 5 10 9 20 9 30M20 38c0-11 2-21 4-31 2 10 4 20 4 31"/><path d="M5 41h38"/></g>'
  };
  const families = {
    line: [
      '<g><circle cx="5.7" cy="5.7" r="3.4"/><circle cx="18.3" cy="5.7" r="3.4"/><circle cx="5.7" cy="18.3" r="3.4"/><circle cx="18.3" cy="18.3" r="3.4"/><path d="m6 6 12 12M18 6 6 18"/><rect x="9.3" y="9.3" width="5.4" height="5.4" rx="1.3" fill="var(--glyph-bg,none)"/></g>',
      '<path d="M7.8 3 2.5 10H5l-3.3 5.8h12.2L10.6 10H13zM7.8 16v5M15 7l2.6-3.3 4.6 6.8h-2l2.7 4.8h-6.2M18 15.5V21M4 21h16"/>',
      '<path d="M3 21h18M5 20V3h13v17M8 20V6l7 2v12"/><path d="M12.5 13.2v1"/>',
      '<path d="M4 12V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4M2 12a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM5 19v2m14-2v2"/>'
    ],
    duo: [
      '<g opacity=".42" fill="currentColor" stroke="none"><circle cx="6" cy="6" r="4.2"/><circle cx="18" cy="6" r="4.2"/><circle cx="6" cy="18" r="4.2"/><circle cx="18" cy="18" r="4.2"/></g><path d="m6 6 12 12M18 6 6 18" stroke-width="2.4"/><rect fill="currentColor" x="9" y="8.5" width="6" height="7" rx="2"/>',
      '<circle cx="16.2" cy="9" r="6" fill="currentColor" opacity=".42" stroke="none"/><path d="M16.2 10v11M7 11v10"/><path d="M7 3C4.3 5 1.5 8.3 1.5 11a5.5 5.5 0 0 0 11 0C12.5 8.5 9.8 5 7 3Z" fill="currentColor" stroke="none"/>',
      '<path d="M3 21V3h15v18z" fill="currentColor" opacity=".38" stroke="none"/><path d="m8 7 11-3v17L8 18z" fill="currentColor" stroke="none"/><circle cx="11" cy="12" r="1" fill="var(--glyph-cut,white)" stroke="none"/>',
      '<rect x="4" y="5" width="16" height="11" rx="4" fill="currentColor" opacity=".4" stroke="none"/><path d="M2 12a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" fill="currentColor" stroke="none"/><path d="M5 19v2m14-2v2"/>'
    ],
    iso: [
      '<g stroke-width="1.5"><ellipse cx="5" cy="8" rx="3.7" ry="2"/><ellipse cx="13" cy="3.8" rx="3.7" ry="2"/><ellipse cx="11" cy="18" rx="3.7" ry="2"/><ellipse cx="19" cy="13.5" rx="3.7" ry="2"/><path d="m5 8 14 5.5M13 4l-2 14m-2-7.5 3-1.7 3 1.7v3l-3 1.6-3-1.6z"/></g>',
      '<path d="m2 11 5-8 5 8-5 2.7zM7 3v10.7m0 0V20m4-5 5-10 6 10-6 3zM16 5v13m0 0v4M2 20l5 2 5-2"/>',
      '<path d="m3 6 11-4 7 3-11 4zM3 6v13l7 3 11-4V5M10 9v13m3-2V11l5-1.8v9.5"/>',
      '<path d="m2 12 6-2V6l8-3 6 3v9l-11 6-9-4zM8 6l7 4 7-4M15 10v4m-13-2 9 4.5L21 12M11 16.5V21"/>'
    ],
    solid: [
      '<path fill="currentColor" stroke="none" d="M3 2h5l2 5-2.5 2.5L2 7V3zm13 0h5l1 1v4l-5.5 2.5L14 7zM2 17l5.5-2.5L10 17l-2 5H3l-1-1zm14.5-2.5L22 17v4l-1 1h-5l-2-5zM12 6l6 6-6 6-6-6z"/>',
      '<path fill="currentColor" stroke="none" d="M8 1 2 10h3l-5 7h6v5h4v-5h6l-5-7h3zM17 4l-3.3 5.1 4.4 6.4 1.7 2.5H16v4h3v-5h5l-4.2-6h2.5z"/>',
      '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M3 2h16v18h3v2H2v-2h2V2zm4 3v15h2V7l7 2V5zm5 8v2h2v-2z"/>',
      '<path fill="currentColor" stroke="none" d="M5 5h14l1 1v4h-3v3H7v-3H4V6zm-3 6h4v4h12v-4h4v8h-2v3h-3v-3H7v3H4v-3H2z"/>'
    ],
    soft: [
      '<path d="M11 10C4 12 1 8 3 4c3-4 8-1 8 6zm2 0c0-7 5-10 8-6 2 4-1 8-8 6zm0 4c7-2 10 2 8 6-3 4-8 1-8-6zm-2 0c0 7-5 10-8 6-2-4 1-8 8-6z"/><circle cx="12" cy="12" r="2.5"/>',
      '<path d="M8.5 21V10m0 5C.5 16 1 9 4.8 7.7 4 2 11.7 1.5 12.8 7c4.4 2.8 1.8 8.8-4.3 8zm8.2 6v-8m-1.2-5c4-3.7 8.4 1 6.1 4.7 2.2 3.8-1.3 6-4.9 4.8"/>',
      '<path d="M3 21h18M5 21V10a7 7 0 0 1 14 0v11M8.5 21V10a3.5 3.5 0 0 1 7 0v11"/><circle cx="13" cy="14.5" r=".7" fill="currentColor"/>',
      '<path d="M4 11c-.5-6 4-8.5 8-5.7 4-2.8 8.5-.3 8 5.7M2.5 12c0-3.1 4.6-3 4.5.3l-.1 2.2c2.6-1.2 7.6-1.2 10.2 0l-.1-2.2c-.1-3.3 4.5-3.4 4.5-.3v3.5A3.5 3.5 0 0 1 18 19H6a3.5 3.5 0 0 1-3.5-3.5zM5.5 19 5 21m13.5-2 .5 2"/>'
    ]
  };
  const utilities = {
    external:'<path d="M6 18 18 6M7 6h11v11"/>',
    link:'<path d="m9 15 6-6m-5 8-1.8 1.8a4 4 0 0 1-5.7-5.6l3.3-3.3a4 4 0 0 1 5.6 0m1.2-2.9 1.8-1.8a4 4 0 0 1 5.7 5.6l-3.3 3.3a4 4 0 0 1-5.6 0"/>',
    pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/>',
    expand:'<path d="M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5"/>',
    shrink:'<path d="M9 3v6H3m18 0h-6V3m0 18v-6h6M3 15h6v6"/>',
    orbit:'<ellipse cx="12" cy="13" rx="10" ry="4.8"/><path d="M9 6.5 12 3l3 3.5M12 3v9"/>',
    compass:'<path d="m17.8 6.2-3.9 7.7-7.7 3.9 3.9-7.7z"/><circle cx="12" cy="12" r="9.5"/>',
    minus:'<path d="M5 12h14"/>', plus:'<path d="M5 12h14m-7-7v14"/>',
    check:'<path d="m5 12 4.5 4.5L19 7"/>', arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>'
  };
  const svg = (body, view = 24) => '<svg aria-hidden="true" focusable="false" viewBox="0 0 '+view+' '+view+'" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">'+body+'</svg>';
  return {
    mark: key => '<svg aria-hidden="true" focusable="false" viewBox="0 0 48 48">'+marks[key]+'</svg>',
    icon: (family, index) => svg(families[family][index]),
    ui: name => svg(utilities[name])
  };
})();
