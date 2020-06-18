const requireDevToolsLocal = require.context(
  './',
  false,
  /dev-tools\.local\.js/
);
const local = requireDevToolsLocal.keys()[0];
if (local) {
  requireDevToolsLocal(local);
}
