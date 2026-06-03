

Key things the comments explain:

**EJS-specific logic** — Every `<%= %>` and `<% %>` tag is annotated to explain what the server injects, why `locals.*` is used as a guard, and what the rendered output actually looks like in the browser (e.g., `"France"`).

**`wasCorrect === "false"` string comparison** — This is the trickiest line in the file. The comment explains *why* it's a string comparison (EJS renders booleans as strings into JS), and why `=== false` (boolean) would never work here.

**`locals.wasCorrect === false` vs `locals.wasCorrect`** — The EJS strict check (`=== false`) is explained: it prevents the cross icon from appearing on first page load when `wasCorrect` is `undefined` (falsy but not `false`).

**`id="app"` on `<body>`** — Flagged early in the body tag comment so its role in the game-over DOM replacement is clear before you reach the script.

**Form attributes** — Every attribute on `<form>` and `<input>` is individually explained, including the security/UX reasoning behind `autocomplete="off"`.






```css

```

Highlights of what the comments explain:

**Layout decisions** — Why `display: flex` + `flex-direction: column` + `justify-content: space-evenly` work together to space the card contents, and why `display: block` is needed on the button for `width: 100%` to work.

**Shorthand values** — Every multi-value property like `margin: 15% auto`, `padding: 15px 30px`, and `box-shadow: 0 0 10px rgba(...)` is broken down value by value.

**Animation system** — The `color: transparent` starting state and why both `.checkmark`/`.cross` and their `@keyframes` blocks are needed together to produce the fade-in effect.

**`#result` flag** — Noted as unused in the current HTML, likely a leftover from an earlier version, so you know it's safe to remove or keep for future use.

**`.restart-button`** — Explained why `display: inline-block` is necessary on an `<a>` tag, and why `transition` is declared even though no `:hover` rule exists yet.