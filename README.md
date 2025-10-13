
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PIN PRO - Image Editor</title>
  
  <!-- Favicon for browser tab - Pin Logo -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 15 L60 40 L85 45 L65 65 L70 85 L50 75 L30 85 L35 65 L15 45 L40 40 Z' fill='%23e74c3c' stroke='%23c0392b' stroke-width='2'/><circle cx='50' cy='50' r='8' fill='%23ffffff'/></svg>">
  
  <style>
    /* Loading Screen Styles */
    #loadingScreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease-out;
    }

    .loading-logo {
      font-size: 80px;
      margin-bottom: 20px;
      animation: logoBounce 2s infinite;
    }

    @keyframes logoBounce {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    .loading-text {
      color: white;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
      animation: textGlow 2s ease-in-out infinite alternate;
    }

    @keyframes textGlow {
      from {
        text-shadow: 0 0 10px rgba(255,255,255,0.5);
      }
      to {
        text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6);
      }
    }

    .loading-subtext {
      color: rgba(255,255,255,0.8);
      font-size: 14px;
      animation: fadeInOut 3s ease-in-out infinite;
    }

    @keyframes fadeInOut {
      0%, 100% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255,255,255,0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      margin-top: 20px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    /* Main App Styles - Hidden during loading */
    #mainApp {
      display: none;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(-45deg, #e74c3c, #c0392b, #d35400, #e67e22);
      background-size: 400% 400%;
      animation: gradientAnimation 15s ease infinite;
      color: #333;
      min-height: 100vh;
      padding: 15px;
    }

    @keyframes gradientAnimation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

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

    @keyframes headerAnimation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .brand-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      animation: shine 3s infinite;
    }

    @keyframes shine {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }

    .brand-name {
      font-size: 1.8rem;
      font-weight: 800;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      margin: 0;
      animation: textGlow 2s ease-in-out infinite alternate;
    }

    .brand-tagline {
      font-size: 0.9rem;
      opacity: 0.9;
      margin-top: 5px;
      animation: fadeInOut 3s ease-in-out infinite;
    }

    .copyright {
      font-size: 0.7rem;
      margin-top: 3px;
      opacity: 0.8;
    }

    .main-container {
      display: flex;
      gap: 15px;
      max-width: 900px;
      margin: 0 auto;
      animation: slideUp 0.8s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .editor-panel {
      flex: 1;
      background: white;
      padding: 20px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.12);
      max-width: 350px;
      animation: panelSlide 0.6s ease-out 0.2s both;
    }

    .preview-panel {
      flex: 2;
      background: white;
      padding: 20px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      position: relative;
      animation: panelSlide 0.6s ease-out 0.4s both;
    }

    @keyframes panelSlide {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .section-title {
      color: #e74c3c;
      font-size: 1.1rem;
      margin-bottom: 15px;
      font-weight: 600;
      border-bottom: 2px solid #e74c3c;
      padding-bottom: 6px;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, #e74c3c, #c0392b);
      animation: titleUnderline 3s ease-in-out infinite;
    }

    @keyframes titleUnderline {
      0%, 100% {
        width: 50px;
      }
      50% {
        width: 100%;
      }
    }

    /* Quick Actions Grid */
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 15px 0;
    }

    .action-btn {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      font-size: 0.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      position: relative;
      overflow: hidden;
    }

    .action-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }

    .action-btn:hover::before {
      left: 100%;
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .action-icon {
      font-size: 1.2rem;
      animation: iconBounce 2s infinite;
    }

    @keyframes iconBounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    /* Upload Section */
    #drop-zone {
      border: 2px dashed #e74c3c;
      border-radius: 10px;
      padding: 25px 15px;
      text-align: center;
      margin: 10px 0;
      cursor: pointer;
      color: #666;
      font-size: 0.9rem;
      background: #fff5f5;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    #drop-zone::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid transparent;
      border-radius: 10px;
      background: linear-gradient(45deg, #e74c3c, #c0392b, #d35400) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: borderRotate 3s linear infinite;
    }

    @keyframes borderRotate {
      100% {
        transform: rotate(360deg);
      }
    }

    #drop-zone:hover {
      background: #ffeaea;
      border-color: #c0392b;
      transform: scale(1.02);
    }

    #fileInput {
      margin: 8px 0 15px;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 8px;
      width: 100%;
      cursor: pointer;
      transition: 0.3s;
      font-size: 0.8rem;
    }

    #fileInput:hover {
      border-color: #e74c3c;
      box-shadow: 0 0 10px rgba(231,76,60,0.3);
    }

    /* Image Grid */
    .image-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 15px 0;
    }

    .image-slot {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #f9f9f9;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    .image-slot::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(231,76,60,0.1);
      border-radius: 50%;
      transition: all 0.6s ease;
      transform: translate(-50%, -50%);
    }

    .image-slot:hover::before {
      width: 100%;
      height: 100%;
    }

    .image-slot:hover {
      border-color: #e74c3c;
      background: #ffeaea;
      transform: translateY(-3px);
    }

    .image-slot.has-image {
      border: 2px solid #e74c3c;
      background: #fff;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(231,76,60,0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(231,76,60,0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(231,76,60,0);
      }
    }

    .slot-number {
      font-size: 1rem;
      font-weight: bold;
      color: #e74c3c;
      margin-bottom: 5px;
      animation: numberGlow 2s ease-in-out infinite alternate;
    }

    @keyframes numberGlow {
      from {
        text-shadow: 0 0 5px rgba(231,76,60,0.5);
      }
      to {
        text-shadow: 0 0 15px rgba(231,76,60,0.8), 0 0 20px rgba(231,76,60,0.6);
      }
    }

    .slot-placeholder {
      font-size: 0.7rem;
      color: #666;
    }

    .slot-image {
      max-width: 100%;
      max-height: 70px;
      border-radius: 4px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .slot-image:hover {
      transform: scale(1.1);
    }

    /* Text Controls */
    .controls-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 15px 0;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .control-group label {
      font-weight: 600;
      color: #555;
      font-size: 0.75rem;
    }

    .control-group.full-width {
      grid-column: 1 / -1;
    }

    input, select, button, textarea {
      padding: 8px 10px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.8rem;
      transition: all 0.3s ease;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #e74c3c;
      box-shadow: 0 0 10px rgba(231,76,60,0.3);
      transform: scale(1.02);
    }

    /* Color Pickers */
    .color-picker-group {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .color-picker {
      width: 35px;
      height: 35px;
      border: 2px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      animation: colorCycle 4s ease-in-out infinite;
    }

    @keyframes colorCycle {
      0%, 100% {
        filter: hue-rotate(0deg);
      }
      50% {
        filter: hue-rotate(180deg);
      }
    }

    .color-picker:hover {
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
    }

    /* Buttons */
    .button-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin: 15px 0;
    }

    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.8rem;
      position: relative;
      overflow: hidden;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
    }

    .btn-secondary {
      background: linear-gradient(135deg, #d35400, #e67e22);
      color: white;
    }

    .btn-success {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
    }

    .btn-warning {
      background: linear-gradient(135deg, #f39c12, #e67e22);
      color: white;
    }

    .btn-danger {
      background: linear-gradient(135deg, #c0392b, #922b21);
      color: white;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    /* Canvas */
    #previewCanvas {
      width: 100%;
      max-width: 500px;
      border: 2px solid #e74c3c;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin: 0 auto;
      background: white;
      cursor: crosshair;
      transition: all 0.3s ease;
      animation: canvasGlow 3s ease-in-out infinite alternate;
    }

    @keyframes canvasGlow {
      from {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      to {
        box-shadow: 0 4px 20px rgba(231,76,60,0.3);
      }
    }

    .preview-controls {
      margin-top: 15px;
      display: flex;
      gap: 8px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .preview-info {
      text-align: center;
      margin-top: 10px;
      color: #666;
      font-size: 0.75rem;
      animation: infoPulse 2s ease-in-out infinite;
    }

    @keyframes infoPulse {
      0%, 100% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
    }

    /* Layout Controls */
    .layout-controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin: 12px 0;
    }

    .layout-btn {
      padding: 8px;
      border: 2px solid #ddd;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      text-align: center;
      transition: all 0.3s ease;
      font-size: 0.7rem;
      position: relative;
      overflow: hidden;
    }

    .layout-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(231,76,60,0.1) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform 0.6s;
    }

    .layout-btn:hover::before {
      transform: translateX(100%);
    }

    .layout-btn:hover {
      border-color: #e74c3c;
      transform: scale(1.05);
    }

    .layout-btn.active {
      border-color: #e74c3c;
      background: #ffeaea;
      animation: activeLayout 2s ease-in-out infinite;
    }

    @keyframes activeLayout {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(231,76,60,0.4);
      }
      50% {
        box-shadow: 0 0 0 5px rgba(231,76,60,0.2);
      }
    }

    .layout-preview {
      font-size: 1.2rem;
      margin-bottom: 3px;
    }

    /* Text Area */
    textarea {
      width: 100%;
      min-height: 60px;
      resize: vertical;
      font-size: 0.8rem;
      transition: all 0.3s ease;
    }

    textarea:focus {
      animation: textareaFocus 0.5s ease;
    }

    @keyframes textareaFocus {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.02);
      }
      100% {
        transform: scale(1);
      }
    }

    .feature-badge {
      background: linear-gradient(45deg, #e67e22, #d35400);
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 0.6rem;
      margin-left: 5px;
      vertical-align: super;
      animation: badgePulse 1.5s ease-in-out infinite;
    }

    @keyframes badgePulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    .tab-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 15px;
      border-bottom: 2px solid #eee;
      padding-bottom: 8px;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 8px 12px;
      border: none;
      background: #f0f0f0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.75rem;
      flex: 1;
      min-width: 60px;
      position: relative;
      overflow: hidden;
    }

    .tab-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      transition: left 0.5s;
    }

    .tab-btn:hover::before {
      left: 100%;
    }

    .tab-btn.active {
      background: #e74c3c;
      color: white;
      animation: tabActive 2s ease-in-out infinite;
    }

    @keyframes tabActive {
      0%, 100% {
        box-shadow: 0 2px 5px rgba(231,76,60,0.3);
      }
      50% {
        box-shadow: 0 2px 15px rgba(231,76,60,0.6);
      }
    }

    .border-controls {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #eee;
    }

    .border-control-group {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 8px;
    }

    .border-control-group label {
      min-width: 90px;
      font-size: 0.75rem;
    }

    .border-slider {
      flex: 1;
      transition: all 0.3s ease;
    }

    .border-slider:hover {
      transform: scale(1.02);
    }

    .border-color-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 8px 0;
      font-size: 0.75rem;
    }

    .checkbox-group input[type="checkbox"] {
      width: 16px;
      height: 16px;
      transition: all 0.3s ease;
    }

    .checkbox-group input[type="checkbox"]:hover {
      transform: scale(1.2);
    }

    .text-position-info {
      background: #fff5f5;
      padding: 8px;
      border-radius: 6px;
      margin: 8px 0;
      border-left: 3px solid #e74c3c;
      font-size: 0.75rem;
      animation: infoSlide 0.5s ease-out;
    }

    @keyframes infoSlide {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin: 10px 0;
      text-align: center;
    }

    .stat-item {
      background: #f8f9fa;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #e9ecef;
      transition: all 0.3s ease;
      animation: statAppear 0.6s ease-out;
    }

    @keyframes statAppear {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .stat-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .stat-value {
      font-size: 1rem;
      font-weight: bold;
      color: #e74c3c;
      animation: countUp 1s ease-out;
    }

    @keyframes countUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .stat-label {
      font-size: 0.6rem;
      color: #666;
      margin-top: 2px;
    }

    /* Floating particles animation */
    .floating-particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }

    .particle {
      position: absolute;
      background: rgba(231,76,60,0.1);
      border-radius: 50%;
      animation: float 20s infinite linear;
    }

    @keyframes float {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }

    /* Success animation */
    .success-animation {
      animation: successPop 0.6s ease-out;
    }

    @keyframes successPop {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Loading animation */
    .loading {
      position: relative;
      overflow: hidden;
    }

    .loading::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
  </style>
</head>
<body>
  <!-- Loading Screen -->
  <div id="loadingScreen">
    <div class="loading-logo">📍</div>
    <div class="loading-text">PIN PRO</div>
    <div class="loading-subtext">from PIN SITE</div>
    <div class="loading-spinner"></div>
  </div>

  <!-- Main App Content -->
  <div id="mainApp">
    <!-- Floating particles -->
    <div class="floating-particles" id="particlesContainer"></div>

    <!-- Brand Header -->
    <div class="brand-header">
      <h1 class="brand-name">PIN PRO <span class="feature-badge">PRO</span></h1>
      <p class="brand-tagline">Advanced Image Editor</p>
      <div class="copyright">© 2024 PIN SITE - All Rights Reserved</div>
    </div>

    <div class="main-container">
      <!-- Editor Panel -->
      <div class="editor-panel">
        <!-- Quick Actions -->
        <div class="quick-actions">
          <button class="action-btn" id="quickUpload">
            <span class="action-icon">📁</span>
            <span>Upload</span>
          </button>
          <button class="action-btn" id="quickText">
            <span class="action-icon">✏️</span>
            <span>Add Text</span>
          </button>
          <button class="action-btn" id="quickDownload">
            <span class="action-icon">⬇️</span>
            <span>Download</span>
          </button>
          <button class="action-btn" id="quickReset">
            <span class="action-icon">🔄</span>
            <span>Reset</span>
          </button>
        </div>

        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value" id="statImages">0</div>
            <div class="stat-label">Images</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" id="statTexts">0</div>
            <div class="stat-label">Texts</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" id="statSize">1080</div>
            <div class="stat-label">Size</div>
          </div>
        </div>

        <div class="tab-controls">
          <button class="tab-btn active" id="tabImages">📷</button>
          <button class="tab-btn" id="tabText">✏️</button>
          <button class="tab-btn" id="tabLayout">🔄</button>
          <button class="tab-btn" id="tabBorders">🖼️</button>
        </div>

        <!-- Images Tab -->
        <div id="imagesTab">
          <h3 class="section-title">📁 Upload Images</h3>
          <input type="file" id="fileInput" accept="image/*" multiple>
          <div id="drop-zone">
            <div>📁 Click to Upload</div>
            <div style="font-size: 0.7rem; margin-top: 5px; color: #888;">Max 4 images</div>
          </div>

          <div class="image-grid">
            <div class="image-slot" data-slot="1">
              <div class="slot-number">1</div>
              <div class="slot-placeholder">+ Add</div>
            </div>
            <div class="image-slot" data-slot="2">
              <div class="slot-number">2</div>
              <div class="slot-placeholder">+ Add</div>
            </div>
            <div class="image-slot" data-slot="3">
              <div class="slot-number">3</div>
              <div class="slot-placeholder">+ Add</div>
            </div>
            <div class="image-slot" data-slot="4">
              <div class="slot-number">4</div>
              <div class="slot-placeholder">+ Add</div>
            </div>
          </div>
        </div>

        <!-- Text Tab -->
        <div id="textTab" style="display: none;">
          <h3 class="section-title">✏️ Text Controls</h3>
          
          <div class="control-group full-width">
            <label for="textInput">Your Text:</label>
            <textarea id="textInput" placeholder="Enter text...">PIN PRO</textarea>
          </div>

          <div class="controls-grid">
            <div class="control-group">
              <label for="fontFamily">Font:</label>
              <select id="fontFamily">
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Impact">Impact</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>

            <div class="control-group">
              <label for="fontSize">Font Size:</label>
              <input type="number" id="fontSize" value="36" min="10" max="200">
            </div>

            <div class="control-group">
              <label>Text Color:</label>
              <div class="color-picker-group">
                <input type="color" id="textColor" class="color-picker" value="#e74c3c">
              </div>
            </div>

            <div class="control-group">
              <label>BG Color:</label>
              <div class="color-picker-group">
                <input type="color" id="bgColor" class="color-picker" value="#ffffff">
              </div>
            </div>

            <div class="control-group">
              <label for="textX">X Position:</label>
              <input type="number" id="textX" value="50" min="0" max="1000">
            </div>

            <div class="control-group">
              <label for="textY">Y Position:</label>
              <input type="number" id="textY" value="50" min="0" max="1000">
            </div>
          </div>

          <div class="checkbox-group">
            <input type="checkbox" id="showTextBackground">
            <label for="showTextBackground">Show Text Background</label>
          </div>

          <div class="button-group">
            <button class="btn btn-primary" id="applyTextBtn">
              Apply Text
            </button>
            <button class="btn btn-danger" id="clearAllTextBtn">
              Clear All
            </button>
          </div>
        </div>

        <!-- Layout Tab -->
        <div id="layoutTab" style="display: none;">
          <h3 class="section-title">🔄 Layout</h3>
          
          <div class="layout-controls">
            <div class="layout-btn active" data-layout="1">
              <div class="layout-preview">⬜</div>
              <div>Single</div>
            </div>
            <div class="layout-btn" data-layout="2">
              <div class="layout-preview">⬜⬜</div>
              <div>Two</div>
            </div>
            <div class="layout-btn" data-layout="3">
              <div class="layout-preview">⬜⬜<br>⬜</div>
              <div>Three</div>
            </div>
            <div class="layout-btn" data-layout="4">
              <div class="layout-preview">⬜⬜<br>⬜⬜</div>
              <div>Four</div>
            </div>
          </div>

          <div class="controls-grid">
            <div class="control-group">
              <label for="sizeSelect">Size:</label>
              <select id="sizeSelect">
                <option value="1080" selected>1080px</option>
                <option value="800">800px</option>
                <option value="600">600px</option>
              </select>
            </div>

            <div class="control-group">
              <label for="formatSelect">Format:</label>
              <select id="formatSelect">
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
            </div>
          </div>

          <div class="control-group full-width">
            <label for="filenameInput">File Name:</label>
            <input type="text" id="filenameInput" value="pin_pro_edit">
          </div>

          <div class="button-group">
            <button class="btn btn-success" id="downloadBtn">
              Download
            </button>
            <button class="btn btn-warning" id="resetBtn">
              Reset All
            </button>
          </div>
        </div>

        <!-- Borders Tab -->
        <div id="bordersTab" style="display: none;">
          <h3 class="section-title">🖼️ Borders</h3>
          
          <div class="border-controls">
            <div class="border-control-group">
              <label for="borderWidth">Width:</label>
              <input type="range" id="borderWidth" class="border-slider" min="0" max="30" value="0">
              <span style="font-size: 0.7rem;" id="borderWidthValue">0px</span>
            </div>
            
            <div class="border-control-group">
              <label for="borderColor">Color:</label>
              <div class="border-color-group">
                <input type="color" id="borderColor" class="color-picker" value="#e74c3c">
              </div>
            </div>
            
            <div class="border-control-group">
              <label for="imageSpacing">Spacing:</label>
              <input type="range" id="imageSpacing" class="border-slider" min="0" max="30" value="0">
              <span style="font-size: 0.7rem;" id="imageSpacingValue">0px</span>
            </div>
            
            <div class="checkbox-group">
              <input type="checkbox" id="roundCorners">
              <label for="roundCorners">Rounded</label>
            </div>
            
            <div class="checkbox-group">
              <input type="checkbox" id="shadowEffect">
              <label for="shadowEffect">Shadow</label>
            </div>
          </div>
          
          <button class="btn btn-primary" id="applyBordersBtn">
            Apply Borders
          </button>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="preview-panel">
        <h3 class="section-title">👁️ Preview</h3>
        <canvas id="previewCanvas" width="500" height="500"></canvas>
        <div class="preview-info" id="previewInfo">Size: 500px | Images: 0 | Texts: 0</div>
        
        <div class="preview-controls">
          <button class="btn btn-secondary" id="zoomInBtn">➕</button>
          <button class="btn btn-secondary" id="zoomOutBtn">➖</button>
          <button class="btn btn-secondary" id="rotateBtn">🔄</button>
          <button class="btn btn-primary" id="refreshBtn">🔄</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Show loading screen first
    window.addEventListener('load', function() {
      // Simulate loading time
      setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainApp = document.getElementById('mainApp');
        
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        
        // Show main app after fade out
        setTimeout(function() {
          loadingScreen.style.display = 'none';
          mainApp.style.display = 'block';
          initApp();
        }, 500);
      }, 2000); // 2 seconds loading time
    });

    // Initialize main app
    function initApp() {
      // DOM Elements
      const fileInput = document.getElementById('fileInput');
      const dropZone = document.getElementById('drop-zone');
      const previewCanvas = document.getElementById('previewCanvas');
      const ctx = previewCanvas.getContext('2d');
      const particlesContainer = document.getElementById('particlesContainer');
      
      // Quick Actions
      const quickUpload = document.getElementById('quickUpload');
      const quickText = document.getElementById('quickText');
      const quickDownload = document.getElementById('quickDownload');
      const quickReset = document.getElementById('quickReset');
      
      // Stats
      const statImages = document.getElementById('statImages');
      const statTexts = document.getElementById('statTexts');
      const statSize = document.getElementById('statSize');

      // Tabs
      const tabImages = document.getElementById('tabImages');
      const tabText = document.getElementById('tabText');
      const tabLayout = document.getElementById('tabLayout');
      const tabBorders = document.getElementById('tabBorders');
      const imagesTab = document.getElementById('imagesTab');
      const textTab = document.getElementById('textTab');
      const layoutTab = document.getElementById('layoutTab');
      const bordersTab = document.getElementById('bordersTab');

      // Text controls
      const textInput = document.getElementById('textInput');
      const fontFamily = document.getElementById('fontFamily');
      const fontSize = document.getElementById('fontSize');
      const textColor = document.getElementById('textColor');
      const bgColor = document.getElementById('bgColor');
      const textX = document.getElementById('textX');
      const textY = document.getElementById('textY');
      const showTextBackground = document.getElementById('showTextBackground');
      const applyTextBtn = document.getElementById('applyTextBtn');
      const clearAllTextBtn = document.getElementById('clearAllTextBtn');

      // Image controls
      const sizeSelect = document.getElementById('sizeSelect');
      const formatSelect = document.getElementById('formatSelect');
      const filenameInput = document.getElementById('filenameInput');
      const previewInfo = document.getElementById('previewInfo');

      // Border controls
      const borderWidth = document.getElementById('borderWidth');
      const borderWidthValue = document.getElementById('borderWidthValue');
      const borderColor = document.getElementById('borderColor');
      const imageSpacing = document.getElementById('imageSpacing');
      const imageSpacingValue = document.getElementById('imageSpacingValue');
      const roundCorners = document.getElementById('roundCorners');
      const shadowEffect = document.getElementById('shadowEffect');
      const applyBordersBtn = document.getElementById('applyBordersBtn');

      // Buttons
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');
      const zoomInBtn = document.getElementById('zoomInBtn');
      const zoomOutBtn = document.getElementById('zoomOutBtn');
      const rotateBtn = document.getElementById('rotateBtn');
      const refreshBtn = document.getElementById('refreshBtn');

      // Layout
      const layoutBtns = document.querySelectorAll('.layout-btn');
      const imageSlots = document.querySelectorAll('.image-slot');

      // State variables
      let images = [null, null, null, null];
      let currentLayout = 1;
      let textObjects = [];
      let currentTextSettings = {
        content: 'PIN PRO',
        font: 'Arial',
        size: 36,
        color: '#e74c3c',
        bgColor: '#ffffff',
        showBackground: false,
        x: 50,
        y: 50
      };
      let borderSettings = {
        width: 0,
        color: '#e74c3c',
        spacing: 0,
        rounded: false,
        shadow: false
      };
      let scale = 1;
      let currentRotation = 0;

      // Create floating particles
      function createParticles() {
        for (let i = 0; i < 15; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          const size = Math.random() * 20 + 5;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${Math.random() * 100}vw`;
          particle.style.animationDelay = `${Math.random() * 20}s`;
          particle.style.animationDuration = `${15 + Math.random() * 10}s`;
          particlesContainer.appendChild(particle);
        }
      }

      // Initialize
      function init() {
        createParticles();
        setupEventListeners();
        updateStats();
        updatePreview();
        switchTab('text'); // Start with text tab active
      }

      function setupEventListeners() {
        // Quick Actions
        quickUpload.addEventListener('click', () => {
          fileInput.click();
          animateButton(quickUpload);
        });
        quickText.addEventListener('click', () => {
          switchTab('text');
          animateButton(quickText);
        });
        quickDownload.addEventListener('click', () => {
          downloadImage();
          animateButton(quickDownload);
        });
        quickReset.addEventListener('click', () => {
          resetEditor();
          animateButton(quickReset);
        });

        // File handling
        fileInput.addEventListener('change', handleFileSelect);
        dropZone.addEventListener('click', () => fileInput.click());

        // Image slots
        imageSlots.forEach(slot => {
          slot.addEventListener('click', () => handleSlotClick(slot));
        });

        // Tabs
        tabImages.addEventListener('click', () => switchTab('images'));
        tabText.addEventListener('click', () => switchTab('text'));
        tabLayout.addEventListener('click', () => switchTab('layout'));
        tabBorders.addEventListener('click', () => switchTab('borders'));

        // Text controls
        applyTextBtn.addEventListener('click', () => {
          applyTextSettings();
          animateButton(applyTextBtn);
        });
        clearAllTextBtn.addEventListener('click', () => {
          clearAllText();
          animateButton(clearAllTextBtn);
        });

        // Border controls
        borderWidth.addEventListener('input', updateBorderValues);
        borderColor.addEventListener('input', updateBorderValues);
        imageSpacing.addEventListener('input', updateBorderValues);
        applyBordersBtn.addEventListener('click', () => {
          applyBorders();
          animateButton(applyBordersBtn);
        });

        // Layout
        layoutBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            layoutBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLayout = parseInt(btn.dataset.layout);
            updatePreview();
            animateButton(btn);
          });
        });

        // Image controls
        sizeSelect.addEventListener('change', updatePreview);
        downloadBtn.addEventListener('click', () => {
          downloadImage();
          animateButton(downloadBtn);
        });
        resetBtn.addEventListener('click', () => {
          resetEditor();
          animateButton(resetBtn);
        });

        // Preview controls
        zoomInBtn.addEventListener('click', () => {
          adjustZoom(0.1);
          animateButton(zoomInBtn);
        });
        zoomOutBtn.addEventListener('click', () => {
          adjustZoom(-0.1);
          animateButton(zoomOutBtn);
        });
        rotateBtn.addEventListener('click', () => {
          rotateCanvas();
          animateButton(rotateBtn);
        });
        refreshBtn.addEventListener('click', () => {
          updatePreview();
          animateButton(refreshBtn);
        });
      }

      // Button animation
      function animateButton(button) {
        button.classList.add('success-animation');
        setTimeout(() => {
          button.classList.remove('success-animation');
        }, 600);
      }

      function updateStats() {
        const imageCount = images.filter(img => img !== null).length;
        const textCount = textObjects.length;
        const size = parseInt(sizeSelect.value);
        
        statImages.textContent = imageCount;
        statTexts.textContent = textCount;
        statSize.textContent = size;
        
        // Animate stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
          item.classList.add('success-animation');
          setTimeout(() => item.classList.remove('success-animation'), 600);
        });
      }

      function switchTab(tabName) {
        // Hide all tabs
        imagesTab.style.display = 'none';
        textTab.style.display = 'none';
        layoutTab.style.display = 'none';
        bordersTab.style.display = 'none';
        
        // Remove active class from all tabs
        tabImages.classList.remove('active');
        tabText.classList.remove('active');
        tabLayout.classList.remove('active');
        tabBorders.classList.remove('active');
        
        // Show selected tab
        if (tabName === 'images') {
          imagesTab.style.display = 'block';
          tabImages.classList.add('active');
        } else if (tabName === 'text') {
          textTab.style.display = 'block';
          tabText.classList.add('active');
        } else if (tabName === 'layout') {
          layoutTab.style.display = 'block';
          tabLayout.classList.add('active');
        } else if (tabName === 'borders') {
          bordersTab.style.display = 'block';
          tabBorders.classList.add('active');
        }
      }

      function updateBorderValues() {
        borderWidthValue.textContent = `${borderWidth.value}px`;
        imageSpacingValue.textContent = `${imageSpacing.value}px`;
      }

      function handleFileSelect(event) {
        const files = Array.from(event.target.files).slice(0, 4);
        files.forEach((file, index) => {
          if (index < 4) loadImage(file, index);
        });
      }

      function handleSlotClick(slot) {
        const slotIndex = parseInt(slot.dataset.slot) - 1;
        fileInput.click();
        fileInput.dataset.targetSlot = slotIndex;
        animateButton(slot);
      }

      function loadImage(file, index) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            const targetIndex = fileInput.dataset.targetSlot !== undefined ? 
                              parseInt(fileInput.dataset.targetSlot) : index;
            images[targetIndex] = img;
            updateImageSlot(targetIndex, img);
            updatePreview();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      function updateImageSlot(index, img) {
        const slot = imageSlots[index];
        slot.classList.add('has-image');
        slot.innerHTML = `
          <div class="slot-number">${index + 1}</div>
          <img src="${img.src}" class="slot-image" alt="Image ${index + 1}">
          <div style="font-size: 0.6rem; color: #666; margin-top: 3px;">Change</div>
        `;
        
        slot.addEventListener('click', () => handleSlotClick(slot));
      }

      function updatePreview() {
        const size = parseInt(sizeSelect.value);
        previewCanvas.width = size;
        previewCanvas.height = size;
        
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        drawImagesLayout();
        
        textObjects.forEach(textObj => {
          drawTextObject(textObj);
        });
        
        updatePreviewInfo();
        updateStats();
      }

      function drawImagesLayout() {
        const size = previewCanvas.width;
        const activeImages = images.filter(img => img !== null);
        
        if (activeImages.length === 0) return;
        
        const spacing = borderSettings.spacing;
        const borderWidth = borderSettings.width;
        const hasBorder = borderWidth > 0;
        
        if (borderSettings.shadow) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = 15;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 5;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
        
        switch (currentLayout) {
          case 1:
            if (activeImages[0]) {
              const imgSize = size - (borderWidth * 2);
              const x = borderWidth;
              const y = borderWidth;
              
              if (borderSettings.rounded) {
                drawRoundedImage(activeImages[0], x, y, imgSize, imgSize, 10);
              } else {
                ctx.drawImage(activeImages[0], x, y, imgSize, imgSize);
              }
              
              if (hasBorder) {
                ctx.strokeStyle = borderSettings.color;
                ctx.lineWidth = borderWidth;
                if (borderSettings.rounded) {
                  drawRoundedRect(x, y, imgSize, imgSize, 10);
                } else {
                  ctx.strokeRect(x, y, imgSize, imgSize);
                }
              }
            }
            break;
            
          case 2:
            const halfWidth = (size - spacing - (borderWidth * 4)) / 2;
            const fullHeight = size - (borderWidth * 2);
            
            if (activeImages[0]) {
              const x1 = borderWidth;
              const y1 = borderWidth;
              
              if (borderSettings.rounded) {
                drawRoundedImage(activeImages[0], x1, y1, halfWidth, fullHeight, 10);
              } else {
                ctx.drawImage(activeImages[0], x1, y1, halfWidth, fullHeight);
              }
              
              if (hasBorder) {
                ctx.strokeStyle = borderSettings.color;
                ctx.lineWidth = borderWidth;
                if (borderSettings.rounded) {
                  drawRoundedRect(x1, y1, halfWidth, fullHeight, 10);
                } else {
                  ctx.strokeRect(x1, y1, halfWidth, fullHeight);
                }
              }
            }
            
            if (activeImages[1]) {
              const x2 = borderWidth + halfWidth + spacing;
              const y2 = borderWidth;
              
              if (borderSettings.rounded) {
                drawRoundedImage(activeImages[1], x2, y2, halfWidth, fullHeight, 10);
              } else {
                ctx.drawImage(activeImages[1], x2, y2, halfWidth, fullHeight);
              }
              
              if (hasBorder) {
                ctx.strokeStyle = borderSettings.color;
                ctx.lineWidth = borderWidth;
                if (borderSettings.rounded) {
                  drawRoundedRect(x2, y2, halfWidth, fullHeight, 10);
                } else {
                  ctx.strokeRect(x2, y2, halfWidth, fullHeight);
                }
              }
            }
            break;
            
          case 3:
            const topWidth = (size - spacing - (borderWidth * 4)) / 2;
            const topHeight = (size - spacing - (borderWidth * 4)) / 2;
            const bottomWidth = size - (borderWidth * 2);
            const bottomHeight = (size - spacing - (borderWidth * 4)) / 2;
            
            if (activeImages[0]) {
              const x1 = borderWidth;
              const y1 = borderWidth;
              
              if (borderSettings.rounded) {
                drawRoundedImage(activeImages[0], x1, y1, topWidth, topHeight, 10);
              } else {
                ctx.drawImage(activeImages[0], x1, y1, topWidth, topHeight);
              }
              
              if (hasBorder) {
                ctx.strokeStyle = borderSettings.color;
                ctx.lineWidth = borderWidth;
                if (borderSettings.rounded) {
                  drawRoundedRect(x1, y1, topWidth, topHeight, 10);
                } else {
                  ctx.strokeRect(x1, y1, topWidth, topHeight);
                }
              }
            }
            
            if (activeImages[1]) {
              const x2 = borderWidth + topWidth + spacing;
              const y2 = borderWidth;
              
              if (borderSettings.rounded) {
                drawRoundedImage(activeImages[1], x2, y2, topWidth, topHeight, 10);
              } else {
                ctx.drawImage(activeImages[1], x2, y2, topWidth, topHeight);
              }
              
              if (hasBorder) {
                ctx.strokeStyle = borderSettings.color;
                ctx.lineWidth = borderWidth;
                if (borderSettings.rounded) {
                  drawRoundedRect(x2, y2, topWidth, topHeight, 10);
                } else {
                  ctx.strokeRect(x2, y2, topWidth, topHeight);
                }
              }
            }
            
            if (activeImages[2]) {
              const x3 = borderWidth;
              const y3 = borderWidth + topHeight + spacing;
              
              if (borderSettings.rounded) {
                drawRoundedImage(activeImages[2], x3, y3, bottomWidth, bottomHeight, 10);
              } else {
                ctx.drawImage(activeImages[2], x3, y3, bottomWidth, bottomHeight);
              }
              
              if (hasBorder) {
                ctx.strokeStyle = borderSettings.color;
                ctx.lineWidth = borderWidth;
                if (borderSettings.rounded) {
                  drawRoundedRect(x3, y3, bottomWidth, bottomHeight, 10);
                } else {
                  ctx.strokeRect(x3, y3, bottomWidth, bottomHeight);
                }
              }
            }
            break;
            
          case 4:
            const cellSize = (size - spacing - (borderWidth * 4)) / 2;
            
            for (let i = 0; i < 4; i++) {
              if (activeImages[i]) {
                const row = Math.floor(i / 2);
                const col = i % 2;
                const x = borderWidth + (col * (cellSize + spacing));
                const y = borderWidth + (row * (cellSize + spacing));
                
                if (borderSettings.rounded) {
                  drawRoundedImage(activeImages[i], x, y, cellSize, cellSize, 10);
                } else {
                  ctx.drawImage(activeImages[i], x, y, cellSize, cellSize);
                }
                
                if (hasBorder) {
                  ctx.strokeStyle = borderSettings.color;
                  ctx.lineWidth = borderWidth;
                  if (borderSettings.rounded) {
                    drawRoundedRect(x, y, cellSize, cellSize, 10);
                  } else {
                    ctx.strokeRect(x, y, cellSize, cellSize);
                  }
                }
              }
            }
            break;
        }
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      function drawRoundedImage(img, x, y, width, height, radius) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
      }

      function drawRoundedRect(x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.stroke();
      }

      function drawTextObject(textObj) {
        ctx.font = `${textObj.size}px ${textObj.font}`;
        ctx.fillStyle = textObj.color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        if (textObj.showBackground) {
          const textMetrics = ctx.measureText(textObj.content);
          const padding = 8;
          const bgWidth = textMetrics.width + (padding * 2);
          const bgHeight = textObj.size + (padding * 2);
          
          ctx.fillStyle = textObj.bgColor;
          ctx.fillRect(textObj.x - padding, textObj.y - padding, bgWidth, bgHeight);
        }

        ctx.fillStyle = textObj.color;
        ctx.fillText(textObj.content, textObj.x, textObj.y);
      }

      function applyTextSettings() {
        currentTextSettings = {
          content: textInput.value,
          font: fontFamily.value,
          size: parseInt(fontSize.value),
          color: textColor.value,
          bgColor: bgColor.value,
          showBackground: showTextBackground.checked,
          x: parseInt(textX.value),
          y: parseInt(textY.value)
        };

        // Add new text object
        const newText = {
          ...currentTextSettings,
          id: Date.now()
        };

        textObjects.push(newText);
        updatePreview();
      }

      function clearAllText() {
        textObjects = [];
        updatePreview();
      }

      function applyBorders() {
        borderSettings = {
          width: parseInt(borderWidth.value),
          color: borderColor.value,
          spacing: parseInt(imageSpacing.value),
          rounded: roundCorners.checked,
          shadow: shadowEffect.checked
        };
        updatePreview();
      }

      function adjustZoom(delta) {
        scale = Math.max(0.1, Math.min(3, scale + delta));
        updatePreviewInfo();
      }

      function rotateCanvas() {
        currentRotation = (currentRotation + 90) % 360;
        updatePreviewInfo();
      }

      function resetEditor() {
        images = [null, null, null, null];
        textObjects = [];
        currentTextSettings = {
          content: 'PIN PRO',
          font: 'Arial',
          size: 36,
          color: '#e74c3c',
          bgColor: '#ffffff',
          showBackground: false,
          x: 50,
          y: 50
        };
        
        borderSettings = {
          width: 0,
          color: '#e74c3c',
          spacing: 0,
          rounded: false,
          shadow: false
        };
        
        imageSlots.forEach((slot, index) => {
          slot.classList.remove('has-image');
          slot.innerHTML = `
            <div class="slot-number">${index + 1}</div>
            <div class="slot-placeholder">+ Add</div>
          `;
        });
        
        textInput.value = 'PIN PRO';
        fontSize.value = '36';
        textColor.value = '#e74c3c';
        bgColor.value = '#ffffff';
        textX.value = '50';
        textY.value = '50';
        showTextBackground.checked = false;
        
        borderWidth.value = '0';
        borderColor.value = '#e74c3c';
        imageSpacing.value = '0';
        roundCorners.checked = false;
        shadowEffect.checked = false;
        
        updateBorderValues();
        updatePreview();
      }

      function updatePreviewInfo() {
        const imageCount = images.filter(img => img !== null).length;
        const textCount = textObjects.length;
        previewInfo.textContent = `Size: ${previewCanvas.width}px | Images: ${imageCount} | Texts: ${textCount}`;
      }

      function downloadImage() {
        const filename = filenameInput.value || 'pin_pro_edit';
        const format = formatSelect.value;
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';

        const link = document.createElement('a');
        link.download = `${filename}.${format}`;
        link.href = previewCanvas.toDataURL(mimeType);
        link.click();
      }

      // Initialize the application
      init();
    }
  </script>
</body>
</html>
