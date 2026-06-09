<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>PIN PRO - Volcano Forge | Image Editor</title>
  
  <!-- Favicon - Pin Logo -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 15 L60 40 L85 45 L65 65 L70 85 L50 75 L30 85 L35 65 L15 45 L40 40 Z' fill='%23e74c3c' stroke='%23c0392b' stroke-width='2'/><circle cx='50' cy='50' r='8' fill='%23ffffff'/></svg>">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', 'Poppins', 'Roboto', sans-serif;
      overflow-x: hidden;
    }

    /* ========= LOGIN SCREEN - VOLCANO ERUPTION THEME ========= */
    #loginScreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 10%, #1a0b05 0%, #2c1104 40%, #4a1a05 100%);
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(2px);
      transition: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1);
      overflow: hidden;
    }

    /* Lava lamp / particle canvas overlay */
    #volcanoCanvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* Glowing smoke & fire overlay */
    .volcano-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 45%;
      background: linear-gradient(0deg, rgba(255, 60, 0, 0.4), rgba(255, 40, 0, 0) 80%);
      pointer-events: none;
      z-index: 2;
      animation: lavaGlow 1.8s infinite alternate;
    }

    @keyframes lavaGlow {
      0% { opacity: 0.5; background: linear-gradient(0deg, rgba(255, 80, 0, 0.3), rgba(255, 40, 0, 0) 80%);}
      100% { opacity: 1; background: linear-gradient(0deg, rgba(255, 100, 20, 0.7), rgba(255, 60, 0, 0) 80%);}
    }

    /* Login Card */
    .login-card {
      position: relative;
      z-index: 10;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(14px);
      border-radius: 48px;
      padding: 2.5rem 2rem;
      width: 90%;
      max-width: 460px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 2px rgba(255, 80, 0, 0.3) inset, 0 0 0 4px rgba(255, 140, 0, 0.2) inset;
      text-align: center;
      border: 1px solid rgba(255, 100, 30, 0.6);
      animation: cardFloat 2s ease-in-out infinite alternate;
      transition: transform 0.2s;
    }

    @keyframes cardFloat {
      0% { transform: translateY(0px);}
      100% { transform: translateY(-10px);}
    }

    .volcano-icon {
      font-size: 5.2rem;
      filter: drop-shadow(0 0 12px #ff6600);
      margin-bottom: 0.5rem;
      animation: iconShake 3s infinite;
    }

    @keyframes iconShake {
      0%,100% { transform: rotate(0deg) scale(1);}
      25% { transform: rotate(4deg) scale(1.05);}
      75% { transform: rotate(-3deg) scale(1.02);}
    }

    .login-title {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #FF9933, #FF4500, #FFCC33);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0 0 12px rgba(255,60,0,0.5);
      letter-spacing: -0.5px;
      margin-bottom: 0.5rem;
    }

    .login-sub {
      color: #ffbc8c;
      font-weight: 500;
      border-top: 1px solid rgba(255,100,30,0.5);
      display: inline-block;
      padding-top: 6px;
      margin-bottom: 1.8rem;
      font-size: 0.9rem;
    }

    .input-group {
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .input-group label {
      display: block;
      color: #ffc49b;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }

    .input-group input {
      width: 100%;
      padding: 14px 18px;
      background: rgba(20, 10, 5, 0.8);
      border: 1.5px solid #ff7e3a;
      border-radius: 50px;
      font-size: 1rem;
      color: #fff5ea;
      transition: all 0.3s;
      outline: none;
      font-weight: 500;
    }

    .input-group input:focus {
      border-color: #ffaa44;
      box-shadow: 0 0 18px #ff7a2e;
      background: #2a1508;
    }

    .login-btn {
      width: 100%;
      background: linear-gradient(95deg, #ff4d0d, #ff9a2e);
      border: none;
      padding: 14px;
      border-radius: 60px;
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 12px;
      box-shadow: 0 6px 18px rgba(255, 60, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .login-btn:hover {
      transform: scale(1.02);
      background: linear-gradient(95deg, #ff6018, #ffb042);
      box-shadow: 0 0 22px #ff7e2e;
      letter-spacing: 1px;
    }

    .error-message {
      color: #ffaa77;
      font-size: 0.8rem;
      margin-top: 12px;
      background: rgba(0,0,0,0.6);
      padding: 6px 10px;
      border-radius: 60px;
      display: inline-block;
    }

    .demo-hint {
      font-size: 0.7rem;
      margin-top: 20px;
      color: #ffbb88;
      background: rgba(0,0,0,0.4);
      padding: 6px 12px;
      border-radius: 60px;
      backdrop-filter: blur(4px);
    }

    /* ========= MAIN APP (HIDDEN until login) ========= */
    #mainApp {
      display: none;
    }

    /* Floating particles */
    .floating-particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .particle {
      position: absolute;
      background: rgba(231,76,60,0.2);
      border-radius: 50%;
      animation: float 20s infinite linear;
    }

    @keyframes float {
      0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }

    /* rest of editor styles (same as original, compact) */
    .brand-header {
      background: linear-gradient(-45deg, #e74c3c, #c0392b, #d35400);
      background-size: 400% 400%;
      animation: headerAnimation 8s ease infinite;
      color: white;
      padding: 15px 20px;
      border-radius: 12px 12px 0 0;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin-bottom: 0;
      position: relative;
      overflow: hidden;
    }
    @keyframes headerAnimation { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .brand-name { font-size: 1.8rem; font-weight: 800; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); margin: 0; }
    .brand-tagline { font-size: 0.9rem; opacity: 0.9; }
    .copyright { font-size: 0.7rem; margin-top: 3px; opacity: 0.8; }
    .feature-badge { background: linear-gradient(45deg, #e67e22, #d35400); color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.6rem; margin-left: 5px; animation: badgePulse 1.5s infinite; }
    @keyframes badgePulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    
    .main-container { display: flex; gap: 15px; max-width: 900px; margin: 0 auto; padding: 0 15px; }
    .editor-panel { flex: 1; background: white; padding: 20px; border-radius: 0 0 12px 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.12); max-width: 350px; }
    .preview-panel { flex: 2; background: white; padding: 20px; border-radius: 0 0 12px 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; }
    .section-title { color: #e74c3c; font-size: 1.1rem; margin-bottom: 15px; font-weight: 600; border-bottom: 2px solid #e74c3c; display: inline-block; }
    .quick-actions { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin: 15px 0; }
    .action-btn { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; border: none; border-radius: 8px; padding: 12px 8px; cursor: pointer; font-weight: 600; display: flex; flex-direction: column; align-items: center; gap: 5px; transition: all 0.2s; }
    .action-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    .stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin: 10px 0; text-align: center; }
    .stat-item { background: #f8f9fa; padding: 8px; border-radius: 6px; }
    .stat-value { font-size: 1rem; font-weight: bold; color: #e74c3c; }
    .tab-controls { display: flex; gap: 8px; margin-bottom: 15px; flex-wrap: wrap; }
    .tab-btn { padding: 8px 12px; background: #f0f0f0; border: none; border-radius: 6px; cursor: pointer; transition: 0.2s; }
    .tab-btn.active { background: #e74c3c; color: white; }
    .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
    .image-slot { border: 2px dashed #ccc; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; background: #f9f9f9; transition: all 0.2s; }
    .image-slot.has-image { border: 2px solid #e74c3c; background: #fff; }
    .slot-number { font-weight: bold; color: #e74c3c; }
    .controls-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
    .control-group { display: flex; flex-direction: column; gap: 3px; }
    .btn { padding: 10px 15px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s; }
    .btn-primary { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; }
    .btn-success { background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; }
    #previewCanvas { width: 100%; max-width: 500px; border: 2px solid #e74c3c; border-radius: 8px; background: white; margin-top: 15px; cursor: crosshair; }
    .preview-info { text-align: center; margin-top: 10px; font-size: 0.75rem; }
    .layout-controls { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin: 12px 0; }
    .layout-btn { padding: 8px; border: 2px solid #ddd; border-radius: 6px; background: white; cursor: pointer; text-align: center; transition: 0.2s; }
    .layout-btn.active { border-color: #e74c3c; background: #ffeaea; }
    .border-control-group { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    input, select, textarea { padding: 8px 10px; border: 2px solid #ddd; border-radius: 6px; }
    .color-picker { width: 35px; height: 35px; border-radius: 5px; cursor: pointer; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .main-container { animation: slideUp 0.6s ease-out; }
  </style>
</head>
<body>

  <!-- 🔥 LOGIN SCREEN - VOLCANO ERUPTION ANIMATION 🔥 -->
  <div id="loginScreen">
    <canvas id="volcanoCanvas"></canvas>
    <div class="volcano-overlay"></div>
    <div class="login-card">
      <div class="volcano-icon">🌋🔥</div>
      <h1 class="login-title">PIN PRO</h1>
      <div class="login-sub">Volcano Forge • Pro Editor</div>
      
      <div class="input-group">
        <label>🌋 USERNAME</label>
        <input type="text" id="loginUsername" placeholder="Enter your name / PIN" autocomplete="off">
      </div>
      <div class="input-group">
        <label>🔥 ACCESS KEY</label>
        <input type="password" id="loginPassword" placeholder="••••••">
      </div>
      
      <button class="login-btn" id="doLoginBtn">
        <span>⚡ IGNITE EDITOR ⚡</span>
      </button>
      <div id="loginErrorMsg" class="error-message"></div>
      <div class="demo-hint">
        ✨ Demo: any username + any password (magic access) ✨
      </div>
    </div>
  </div>

  <!-- MAIN EDITOR APP (initially hidden) -->
  <div id="mainApp">
    <div class="floating-particles" id="particlesContainer"></div>
    <div class="brand-header">
      <h1 class="brand-name">PIN PRO <span class="feature-badge">PRO</span></h1>
      <p class="brand-tagline">Advanced Image Editor | Volcano Edition</p>
      <div class="copyright">© 2024 PIN SITE - All Rights Reserved</div>
    </div>
    <div class="main-container">
      <div class="editor-panel">
        <div class="quick-actions">
          <button class="action-btn" id="quickUpload"><span>📁</span><span>Upload</span></button>
          <button class="action-btn" id="quickText"><span>✏️</span><span>Add Text</span></button>
          <button class="action-btn" id="quickDownload"><span>⬇️</span><span>Download</span></button>
          <button class="action-btn" id="quickReset"><span>🔄</span><span>Reset</span></button>
        </div>
        <div class="stats-grid">
          <div class="stat-item"><div class="stat-value" id="statImages">0</div><div class="stat-label">Images</div></div>
          <div class="stat-item"><div class="stat-value" id="statTexts">0</div><div class="stat-label">Texts</div></div>
          <div class="stat-item"><div class="stat-value" id="statSize">1080</div><div class="stat-label">Size</div></div>
        </div>
        <div class="tab-controls">
          <button class="tab-btn active" id="tabImages">📷</button>
          <button class="tab-btn" id="tabText">✏️</button>
          <button class="tab-btn" id="tabLayout">🔄</button>
          <button class="tab-btn" id="tabBorders">🖼️</button>
        </div>
        <div id="imagesTab"><h3 class="section-title">📁 Upload Images</h3><input type="file" id="fileInput" accept="image/*" multiple><div id="drop-zone" style="border:2px dashed #e74c3c; border-radius:10px; padding:20px; text-align:center; margin:10px 0; cursor:pointer;">📁 Click to Upload (Max 4)</div><div class="image-grid" id="imageGridContainer"><div class="image-slot" data-slot="1"><div class="slot-number">1</div><div class="slot-placeholder">+ Add</div></div><div class="image-slot" data-slot="2"><div class="slot-number">2</div><div class="slot-placeholder">+ Add</div></div><div class="image-slot" data-slot="3"><div class="slot-number">3</div><div class="slot-placeholder">+ Add</div></div><div class="image-slot" data-slot="4"><div class="slot-number">4</div><div class="slot-placeholder">+ Add</div></div></div></div>
        <div id="textTab" style="display:none;"><h3 class="section-title">✏️ Text Controls</h3><textarea id="textInput" placeholder="Your text...">PIN PRO</textarea><div class="controls-grid"><div class="control-group"><label>Font:</label><select id="fontFamily"><option>Arial</option><option>Impact</option><option>Verdana</option></select></div><div class="control-group"><label>Font Size:</label><input type="number" id="fontSize" value="36"></div><div class="control-group"><label>Color:</label><input type="color" id="textColor" value="#e74c3c" class="color-picker"></div><div class="control-group"><label>BG Color:</label><input type="color" id="bgColor" value="#ffffff" class="color-picker"></div><div class="control-group"><label>X Pos:</label><input type="number" id="textX" value="50"></div><div class="control-group"><label>Y Pos:</label><input type="number" id="textY" value="50"></div></div><div class="checkbox-group"><input type="checkbox" id="showTextBackground"><label>Show BG</label></div><div class="button-group"><button class="btn btn-primary" id="applyTextBtn">Apply Text</button><button class="btn btn-danger" id="clearAllTextBtn" style="background:#c0392b;">Clear All</button></div></div>
        <div id="layoutTab" style="display:none;"><h3 class="section-title">🔄 Layout</h3><div class="layout-controls"><div class="layout-btn active" data-layout="1">Single</div><div class="layout-btn" data-layout="2">Two</div><div class="layout-btn" data-layout="3">Three</div><div class="layout-btn" data-layout="4">Four</div></div><div class="controls-grid"><div class="control-group"><label>Size:</label><select id="sizeSelect"><option value="1080">1080px</option><option value="800">800px</option></select></div><div class="control-group"><label>Format:</label><select id="formatSelect"><option value="png">PNG</option><option value="jpeg">JPEG</option></select></div></div><div class="control-group"><label>Filename:</label><input type="text" id="filenameInput" value="pin_pro_edit"></div><div class="button-group"><button class="btn btn-success" id="downloadBtn">Download</button><button class="btn btn-warning" id="resetBtn">Reset All</button></div></div>
        <div id="bordersTab" style="display:none;"><h3 class="section-title">🖼️ Borders</h3><div class="border-control-group"><label>Width:</label><input type="range" id="borderWidth" min="0" max="30" value="0"><span id="borderWidthValue">0px</span></div><div class="border-control-group"><label>Color:</label><input type="color" id="borderColor" value="#e74c3c" class="color-picker"></div><div class="border-control-group"><label>Spacing:</label><input type="range" id="imageSpacing" min="0" max="30" value="0"><span id="imageSpacingValue">0px</span></div><div class="checkbox-group"><input type="checkbox" id="roundCorners"><label>Rounded corners</label></div><div class="checkbox-group"><input type="checkbox" id="shadowEffect"><label>Drop shadow</label></div><button class="btn btn-primary" id="applyBordersBtn">Apply Borders</button></div>
      </div>
      <div class="preview-panel"><h3 class="section-title">👁️ Preview</h3><canvas id="previewCanvas" width="500" height="500"></canvas><div class="preview-info" id="previewInfo">Size: 500px | Images: 0 | Texts: 0</div><div class="preview-controls"><button class="btn btn-secondary" id="zoomInBtn">➕</button><button class="btn btn-secondary" id="zoomOutBtn">➖</button><button class="btn btn-secondary" id="rotateBtn">🔄</button><button class="btn btn-primary" id="refreshBtn">Refresh</button></div></div>
    </div>
  </div>

  <script>
    (function() {
      // ---------- VOLCANO CANVAS ANIMATION (lava particles) ----------
      const canvas = document.getElementById('volcanoCanvas');
      let ctxCanvas = canvas.getContext('2d');
      let particles = [];
      let animationId = null;
      
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', () => { resizeCanvas(); initLavaParticles(); });
      
      function initLavaParticles() {
        particles = [];
        const count = Math.min(120, Math.floor(window.innerWidth / 12));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.8 + canvas.height * 0.2,
            radius: Math.random() * 6 + 2,
            speedY: Math.random() * 2 + 0.8,
            speedX: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.6 + 0.3,
            color: `hsl(${Math.random() * 20 + 15}, 90%, 55%)`
          });
        }
      }
      
      function drawVolcano() {
        if (!ctxCanvas) return;
        ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
        // gradient background magma
        let grad = ctxCanvas.createLinearGradient(0, canvas.height*0.4, 0, canvas.height);
        grad.addColorStop(0, '#3e1a0c');
        grad.addColorStop(1, '#7a2b0a');
        ctxCanvas.fillStyle = grad;
        ctxCanvas.fillRect(0, 0, canvas.width, canvas.height);
        // volcano silhouette
        ctxCanvas.fillStyle = '#2e1508';
        ctxCanvas.beginPath();
        ctxCanvas.moveTo(canvas.width*0.2, canvas.height*0.9);
        ctxCanvas.lineTo(canvas.width*0.5, canvas.height*0.45);
        ctxCanvas.lineTo(canvas.width*0.8, canvas.height*0.9);
        ctxCanvas.fill();
        ctxCanvas.fillStyle = '#5a2a10';
        ctxCanvas.beginPath();
        ctxCanvas.moveTo(canvas.width*0.3, canvas.height*0.9);
        ctxCanvas.lineTo(canvas.width*0.5, canvas.height*0.55);
        ctxCanvas.lineTo(canvas.width*0.7, canvas.height*0.9);
        ctxCanvas.fill();
        // lava glow crater
        ctxCanvas.fillStyle = '#ff6a2e';
        ctxCanvas.shadowBlur = 20;
        ctxCanvas.shadowColor = '#ff4500';
        ctxCanvas.beginPath();
        ctxCanvas.ellipse(canvas.width*0.5, canvas.height*0.44, 30, 18, 0, 0, Math.PI*2);
        ctxCanvas.fill();
        ctxCanvas.shadowBlur = 0;
        
        for (let p of particles) {
          ctxCanvas.globalAlpha = p.alpha;
          ctxCanvas.fillStyle = p.color;
          ctxCanvas.beginPath();
          ctxCanvas.arc(p.x, p.y, p.radius, 0, Math.PI*2);
          ctxCanvas.fill();
          p.y -= p.speedY;
          p.x += p.speedX;
          if(p.y < canvas.height*0.2 || p.y > canvas.height) { p.y = canvas.height - 5; p.x = Math.random() * canvas.width; p.alpha = Math.random()*0.6+0.3; }
          if(p.x < 0) p.x = canvas.width;
          if(p.x > canvas.width) p.x = 0;
        }
        animationId = requestAnimationFrame(drawVolcano);
      }
      
      function startVolcanoAnimation() {
        resizeCanvas();
        initLavaParticles();
        drawVolcano();
      }
      
      // LOGIN LOGIC with elegance
      const loginScreen = document.getElementById('loginScreen');
      const mainAppDiv = document.getElementById('mainApp');
      const loginBtn = document.getElementById('doLoginBtn');
      const usernameInput = document.getElementById('loginUsername');
      const passwordInput = document.getElementById('loginPassword');
      const errorMsgDiv = document.getElementById('loginErrorMsg');
      
      function performLogin() {
        // any non-empty credentials allowed for demo, plus cool volcanic welcome
        const username = usernameInput.value.trim();
        const pwd = passwordInput.value.trim();
        if(username === "" || pwd === "") {
          errorMsgDiv.innerText = "🌋 Enter both fields to ignite the editor! 🌋";
          errorMsgDiv.style.animation = "shake 0.4s";
          setTimeout(()=> errorMsgDiv.style.animation = "", 400);
          return;
        }
        // success - volcano eruption effect and transition
        errorMsgDiv.innerText = "";
        // add eruption flash
        const flash = document.createElement('div');
        flash.style.position = 'fixed'; flash.style.top=0; flash.style.left=0; flash.style.width='100%'; flash.style.height='100%';
        flash.style.backgroundColor = '#ff7f2e'; flash.style.pointerEvents='none'; flash.style.zIndex='10001'; flash.style.opacity='0.7';
        flash.style.transition='opacity 0.6s';
        document.body.appendChild(flash);
        setTimeout(() => { flash.style.opacity = '0'; setTimeout(()=> flash.remove(), 600); }, 50);
        
        // hide login screen with fade
        loginScreen.style.opacity = '0';
        setTimeout(() => {
          loginScreen.style.display = 'none';
          if(animationId) cancelAnimationFrame(animationId);
          mainAppDiv.style.display = 'block';
          // init editor after login
          initEditorApp();
        }, 800);
      }
      
      loginBtn.addEventListener('click', performLogin);
      [usernameInput, passwordInput].forEach(inp => inp.addEventListener('keypress', (e) => { if(e.key === 'Enter') performLogin(); }));
      
      // start volcano background animation immediately
      startVolcanoAnimation();
      
      // ---------- PIN PRO EDITOR LOGIC (fully functional with enhancements) ----------
      function initEditorApp() {
        // DOM elements same as original, but cleaned state
        const fileInput = document.getElementById('fileInput');
        const dropZone = document.getElementById('drop-zone');
        const previewCanvas = document.getElementById('previewCanvas');
        let ctx = previewCanvas.getContext('2d');
        let images = [null, null, null, null];
        let textObjects = [];
        let currentLayout = 1;
        let borderSettings = { width:0, color:'#e74c3c', spacing:0, rounded:false, shadow:false };
        const imageSlots = document.querySelectorAll('.image-slot');
        const statImages = document.getElementById('statImages');
        const statTexts = document.getElementById('statTexts');
        const statSize = document.getElementById('statSize');
        const sizeSelect = document.getElementById('sizeSelect');
        const formatSelect = document.getElementById('formatSelect');
        const filenameInput = document.getElementById('filenameInput');
        const previewInfo = document.getElementById('previewInfo');
        const borderWidth = document.getElementById('borderWidth');
        const borderWidthValue = document.getElementById('borderWidthValue');
        const borderColor = document.getElementById('borderColor');
        const imageSpacing = document.getElementById('imageSpacing');
        const imageSpacingValue = document.getElementById('imageSpacingValue');
        const roundCorners = document.getElementById('roundCorners');
        const shadowEffect = document.getElementById('shadowEffect');
        const applyBordersBtn = document.getElementById('applyBordersBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const resetBtn = document.getElementById('resetBtn');
        const applyTextBtn = document.getElementById('applyTextBtn');
        const clearAllTextBtn = document.getElementById('clearAllTextBtn');
        const textInput = document.getElementById('textInput');
        const fontFamily = document.getElementById('fontFamily');
        const fontSize = document.getElementById('fontSize');
        const textColor = document.getElementById('textColor');
        const bgColor = document.getElementById('bgColor');
        const textX = document.getElementById('textX');
        const textY = document.getElementById('textY');
        const showTextBackground = document.getElementById('showTextBackground');
        const layoutBtns = document.querySelectorAll('.layout-btn');
        const quickUpload = document.getElementById('quickUpload');
        const quickText = document.getElementById('quickText');
        const quickDownload = document.getElementById('quickDownload');
        const quickReset = document.getElementById('quickReset');
        
        function updateStats() { statImages.innerText = images.filter(i=>i!==null).length; statTexts.innerText = textObjects.length; statSize.innerText = sizeSelect.value; }
        function updatePreviewInfo() { previewInfo.innerText = `Size: ${previewCanvas.width}px | Images: ${images.filter(i=>i!==null).length} | Texts: ${textObjects.length}`; }
        
        function drawRoundedImage(img,x,y,w,h,r){ ctx.save(); ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath(); ctx.clip(); ctx.drawImage(img,x,y,w,h); ctx.restore(); }
        function drawRoundedRect(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath(); ctx.stroke(); }
        
        function drawImagesLayout() {
          const size = previewCanvas.width; const spacing = borderSettings.spacing; const bw = borderSettings.width; const active = images.filter(i=>i!==null);
          if(active.length===0) return;
          if(borderSettings.shadow){ ctx.shadowColor='rgba(0,0,0,0.3)'; ctx.shadowBlur=12; ctx.shadowOffsetX=4; ctx.shadowOffsetY=4; }
          const layouts = {
            1: [[0,0,size,size]], 2: [[0,0,(size-spacing)/2,size], [(size+spacing)/2,0,(size-spacing)/2,size]],
            3: [[0,0,(size-spacing)/2,(size-spacing)/2],[(size+spacing)/2,0,(size-spacing)/2,(size-spacing)/2],[0,(size+spacing)/2,size,(size-spacing)/2]],
            4: [[0,0,(size-spacing)/2,(size-spacing)/2],[(size+spacing)/2,0,(size-spacing)/2,(size-spacing)/2],[0,(size+spacing)/2,(size-spacing)/2,(size-spacing)/2],[(size+spacing)/2,(size+spacing)/2,(size-spacing)/2,(size-spacing)/2]]
          };
          let regions = layouts[currentLayout] || layouts[1];
          for(let i=0;i<regions.length;i++){ if(active[i]){ let [x,y,w,h]=regions[i]; x+=bw; y+=bw; w-=bw*2; h-=bw*2; if(w>0 && h>0){ if(borderSettings.rounded) drawRoundedImage(active[i],x,y,w,h,12); else ctx.drawImage(active[i],x,y,w,h); if(bw>0){ ctx.strokeStyle=borderSettings.color; ctx.lineWidth=bw; if(borderSettings.rounded) drawRoundedRect(x,y,w,h,12); else ctx.strokeRect(x,y,w,h); } } } }
          ctx.shadowColor='transparent';
        }
        
        function drawTextObject(t){ ctx.font=`${t.size}px ${t.font}`; ctx.fillStyle=t.color; if(t.showBackground){ const m=ctx.measureText(t.content); const w=m.width+16; const h=t.size+16; ctx.fillStyle=t.bgColor; ctx.fillRect(t.x-8,t.y-8,w,h); } ctx.fillText(t.content,t.x,t.y); }
        
        function updatePreview() { const sz=parseInt(sizeSelect.value); previewCanvas.width=sz; previewCanvas.height=sz; ctx.clearRect(0,0,sz,sz); ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,sz,sz); drawImagesLayout(); textObjects.forEach(t=>drawTextObject(t)); updatePreviewInfo(); updateStats(); }
        
        function loadImageToSlot(file, targetIdx) { const reader=new FileReader(); reader.onload=e=>{ const img=new Image(); img.onload=()=>{ images[targetIdx]=img; const slot=imageSlots[targetIdx]; slot.classList.add('has-image'); slot.innerHTML=`<div class="slot-number">${targetIdx+1}</div><img src="${img.src}" class="slot-image" style="max-width:100%;max-height:70px;"><div style="font-size:0.6rem;">Change</div>`; updatePreview(); }; img.src=e.target.result; }; reader.readAsDataURL(file); }
        
        function handleFiles(files){ for(let i=0;i<Math.min(files.length,4);i++) loadImageToSlot(files[i],i); }
        fileInput.addEventListener('change',e=>handleFiles(Array.from(e.target.files)));
        dropZone.addEventListener('click',()=>fileInput.click());
        imageSlots.forEach((slot,idx)=>{ slot.addEventListener('click',()=>{ fileInput.dataset.targetSlot=idx; fileInput.click(); }); });
        fileInput.addEventListener('change',()=>{ if(fileInput.dataset.targetSlot!==undefined){ const slotIdx=parseInt(fileInput.dataset.targetSlot); if(fileInput.files[0]) loadImageToSlot(fileInput.files[0], slotIdx); delete fileInput.dataset.targetSlot; } });
        
        applyTextBtn.addEventListener('click',()=>{ textObjects.push({ content:textInput.value, font:fontFamily.value, size:parseInt(fontSize.value), color:textColor.value, bgColor:bgColor.value, showBackground:showTextBackground.checked, x:parseInt(textX.value), y:parseInt(textY.value), id:Date.now() }); updatePreview(); });
        clearAllTextBtn.addEventListener('click',()=>{ textObjects=[]; updatePreview(); });
        applyBordersBtn.addEventListener('click',()=>{ borderSettings={ width:parseInt(borderWidth.value), color:borderColor.value, spacing:parseInt(imageSpacing.value), rounded:roundCorners.checked, shadow:shadowEffect.checked }; updatePreview(); });
        layoutBtns.forEach(btn=>{ btn.addEventListener('click',()=>{ layoutBtns.forEach(b=>b.classList.remove('active')); btn.classList.add('active'); currentLayout=parseInt(btn.dataset.layout); updatePreview(); }); });
        sizeSelect.addEventListener('change',updatePreview);
        downloadBtn.addEventListener('click',()=>{ const lnk=document.createElement('a'); lnk.download=`${filenameInput.value||'pin_art'}.${formatSelect.value}`; lnk.href=previewCanvas.toDataURL(formatSelect.value==='png'?'image/png':'image/jpeg'); lnk.click(); });
        resetBtn.addEventListener('click',()=>{ images.fill(null); textObjects=[]; imageSlots.forEach((s,i)=>{ s.classList.remove('has-image'); s.innerHTML=`<div class="slot-number">${i+1}</div><div class="slot-placeholder">+ Add</div>`; }); borderWidth.value=0; borderColor.value='#e74c3c'; imageSpacing.value=0; roundCorners.checked=false; shadowEffect.checked=false; borderSettings={width:0,color:'#e74c3c',spacing:0,rounded:false,shadow:false}; updatePreview(); });
        borderWidth.addEventListener('input',()=>borderWidthValue.innerText=borderWidth.value+'px');
        imageSpacing.addEventListener('input',()=>imageSpacingValue.innerText=imageSpacing.value+'px');
        document.getElementById('zoomInBtn').addEventListener('click',()=>{ const canvasDiv=previewCanvas; canvasDiv.style.transform=`scale(${(parseFloat(canvasDiv.style.transform?.match(/\d+\.?\d*/)?.[0]||1)+0.1)})`; });
        document.getElementById('zoomOutBtn').addEventListener('click',()=>{ const cs=parseFloat(previewCanvas.style.transform?.match(/\d+\.?\d*/)?.[0]||1); if(cs>0.4) previewCanvas.style.transform=`scale(${cs-0.1})`; });
        document.getElementById('refreshBtn').addEventListener('click',()=>updatePreview());
        quickUpload.addEventListener('click',()=>fileInput.click()); quickText.addEventListener('click',()=>document.getElementById('tabText').click()); quickDownload.addEventListener('click',()=>downloadBtn.click()); quickReset.addEventListener('click',()=>resetBtn.click());
        const tabs = { tabImages:'imagesTab', tabText:'textTab', tabLayout:'layoutTab', tabBorders:'bordersTab' };
        Object.keys(tabs).forEach(tabId=>{ document.getElementById(tabId).addEventListener('click',()=>{ Object.values(tabs).forEach(t=>document.getElementById(t).style.display='none'); document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); document.getElementById(tabId).classList.add('active'); document.getElementById(tabs[tabId]).style.display='block'; }); });
        document.getElementById('imagesTab').style.display='block';
        updatePreview();
        // particles for main app
        const partCont = document.getElementById('particlesContainer');
        for(let i=0;i<25;i++){ let p=document.createElement('div'); p.className='particle'; let s=Math.random()*15+5; p.style.width=s+'px'; p.style.height=s+'px'; p.style.left=Math.random()*100+'%'; p.style.animationDelay=Math.random()*20+'s'; p.style.animationDuration=Math.random()*15+10+'s'; partCont.appendChild(p); }
      }
    })();
  </script>
</body>
</html>
