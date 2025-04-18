#!/bin/bash

# 📦 Project name
PROJECT_NAME="js-component-project"
mkdir -p "$PROJECT_NAME"/{public,server,src/components,src/utils}

# 📄 HTML Entry Point
cat > "$PROJECT_NAME/public/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS Component Demo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Component Test Page</h1>
  <button id="test-btn">Open Modal</button>
  <script src="/main.js" type="module"></script>
</body>
</html>
EOF

# 🎨 Basic CSS
cat > "$PROJECT_NAME/public/style.css" << 'EOF'
body {
  font-family: sans-serif;
  padding: 2em;
}
EOF

# 🌐 Basic Express Server
cat > "$PROJECT_NAME/server/server.js" << 'EOF'
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));

app.listen(PORT, () => {
  console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
});
EOF

# 📦 NPM package.json
cat > "$PROJECT_NAME/package.json" << 'EOF'
{
  "name": "js-component-project",
  "version": "1.0.0",
  "description": "Simple JS component project",
  "main": "server/server.js",
  "scripts": {
    "start": "node server/server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# 🔘 Button component
cat > "$PROJECT_NAME/src/components/Button.js" << 'EOF'
export function createButton(label) {
  const btn = document.createElement('button');
  btn.textContent = label;
  return btn;
}
EOF

# 💬 Modal component
cat > "$PROJECT_NAME/src/components/Modal.js" << 'EOF'
export function showModal(message) {
  alert(message);
}
EOF

# 🪧 Tooltip component
cat > "$PROJECT_NAME/src/components/Tooltip.js" << 'EOF'
export function attachTooltip(el, text) {
  el.title = text;
}
EOF

# 🧱 DOM Utilities
cat > "$PROJECT_NAME/src/utils/domUtils.js" << 'EOF'
export function getById(id) {
  return document.getElementById(id);
}
EOF

# 📡 Simple Event Bus
cat > "$PROJECT_NAME/src/utils/eventBus.js" << 'EOF'
const listeners = {};

export const eventBus = {
  on(event, callback) {
    (listeners[event] ||= []).push(callback);
  },
  emit(event, data) {
    (listeners[event] || []).forEach(cb => cb(data));
  }
};
EOF

# 🧩 Main entry point
cat > "$PROJECT_NAME/src/main.js" << 'EOF'
import { getById } from './utils/domUtils.js';
import { showModal } from './components/Modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = getById('test-btn');
  btn.addEventListener('click', () => {
    showModal('Modal opened by Button!');
  });
});
EOF

# 🚀 Start script
cat > "$PROJECT_NAME/start.sh" << 'EOF'
#!/bin/bash
echo "📦 Installing dependencies..."
npm install
echo "🚀 Starting server..."
npm start
EOF

chmod +x "$PROJECT_NAME/start.sh"

echo "✅ Project setup complete in: $PROJECT_NAME"