<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 350" width="100%" height="350">
  <defs>
    <!-- Deep Space Gradients -->
    <radialGradient id="coreGlow" cx="50%" cy="100%" r="70%">
      <stop offset="0%" stop-color="#7000FF" stop-opacity="0.4" />
      <stop offset="50%" stop-color="#00E5FF" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    
    <!-- Premium Titanium Text Gradient -->
    <linearGradient id="titanium" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>

    <!-- Morphing Neural Paths (The LLM Vector Streams) -->
    <path id="wave1" fill="none" stroke="#00E5FF" stroke-width="1.5" opacity="0.6">
      <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
          M -100 200 C 200 150, 300 50, 500 150 C 700 250, 800 100, 1100 150;
          M -100 200 C 200 250, 300 300, 500 150 C 700 50, 800 200, 1100 150;
          M -100 200 C 200 150, 300 50, 500 150 C 700 250, 800 100, 1100 150
        " />
    </path>
    <path id="wave2" fill="none" stroke="#7000FF" stroke-width="2" opacity="0.8">
      <animate attributeName="d" dur="18s" repeatCount="indefinite" values="
          M -100 250 C 200 300, 400 100, 600 200 C 800 300, 900 150, 1100 200;
          M -100 250 C 200 100, 400 300, 600 200 C 800 100, 900 250, 1100 200;
          M -100 250 C 200 300, 400 100, 600 200 C 800 300, 900 150, 1100 200
        " />
    </path>
    <path id="wave3" fill="none" stroke="#ffffff" stroke-width="0.5" stroke-dasharray="4 8" opacity="0.5">
      <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
          M -100 180 C 150 100, 350 250, 550 150 C 750 50, 950 200, 1100 150;
          M -100 180 C 150 250, 350 50, 550 150 C 750 250, 950 100, 1100 150;
          M -100 180 C 150 100, 350 250, 550 150 C 750 50, 950 200, 1100 150
        " />
    </path>

    <!-- Floor Grid Pattern -->
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="none" stroke="#1e293b" stroke-width="1" />
    </pattern>

    <!-- Fading Mask for the 3D Floor -->
    <radialGradient id="floorMask" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="white" stop-opacity="1" />
      <stop offset="80%" stop-color="white" stop-opacity="0" />
    </radialGradient>
    <mask id="gridFade"><rect width="100%" height="100%" fill="url(#floorMask)" /></mask>

    <style>
      .name-bold {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
        font-size: 82px;
        font-weight: 900;
        letter-spacing: -3px;
      }
      .name-light {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
        font-size: 82px;
        font-weight: 200;
        letter-spacing: -5px;
      }
      .math {
        font-family: "Fira Code", "Courier New", monospace;
        font-size: 11px;
        fill: #475569;
        letter-spacing: 1px;
      }
      .text-stream {
        font-family: "Fira Code", "Courier New", monospace;
        font-size: 10px;
        font-weight: 600;
        fill: #00E5FF;
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      @keyframes floatData {
        0% { transform: translateY(0px); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
      }
      .particle { animation: floatData 4s infinite linear; }
    </style>
  </defs>

  <!-- Pitch Black Void -->
  <rect width="100%" height="100%" fill="#020617" />
  
  <!-- 3D Isometric Floor Engine -->
  <g transform="translate(500, 200) scale(1, 0.35) rotate(45)" mask="url(#gridFade)">
    <rect x="-800" y="-800" width="1600" height="1600" fill="url(#gridPattern)" />
  </g>

  <!-- Core Ambient Glow -->
  <rect width="100%" height="100%" fill="url(#coreGlow)" />

  <!-- The Mathematics of LLMs (Transformer Attention Equation) -->
  <text x="30" y="40" class="math">Architecture: Multi-LLM Judge Consensus</text>
  <text x="30" y="60" class="math">Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V</text>
  <text x="820" y="320" class="math">Context_Window_Compressed = TRUE</text>
  <text x="820" y="335" class="math">Runtime_Environment: PRODUCTION</text>

  <!-- === THE MORPHING VECTOR SPLINES === -->
  <use href="#wave1" />
  <use href="#wave2" />
  <use href="#wave3" />

  <!-- THE MAGIC TRICK: Text Flowing ALONG the morphing waves -->
  <text class="text-stream">
    <textPath href="#wave1" startOffset="-10%">
      <animate attributeName="startOffset" from="-50%" to="100%" dur="20s" repeatCount="indefinite" />
      MEDICAL AI >>> MULTI-MODEL CONSENSUS >>> LLM EVALUATION >>> RAG PIPELINES >>> SENTINEL SECURITY
    </textPath>
  </text>
  
  <text class="text-stream" fill="#7000FF">
    <textPath href="#wave2" startOffset="100%">
      <animate attributeName="startOffset" from="150%" to="-50%" dur="25s" repeatCount="indefinite" />
      01010110 01001001 01000010 01000101 01000110 01001111 01010010 01000111 01000101
    </textPath>
  </text>

  <!-- Data Particles / Floating Tokens -->
  <circle cx="250" cy="200" r="2" fill="#00E5FF" class="particle" style="animation-delay: 0s;" />
  <circle cx="750" cy="180" r="3" fill="#7000FF" class="particle" style="animation-delay: 1.5s;" />
  <circle cx="500" cy="150" r="1.5" fill="#ffffff" class="particle" style="animation-delay: 2.5s;" />

  <!-- === THE MASTER TYPOGRAPHY === -->
  <!-- Combining Ultra-Light and Ultra-Bold weights for high-end aesthetic -->
  <g transform="translate(500, 160)" text-anchor="middle">
    <text y="0">
      <tspan class="name-bold" fill="url(#titanium)">MAHINDRA</tspan>
      <tspan class="name-light" fill="#94a3b8">KOTHA</tspan>
    </text>
    
    <!-- A surgical, minimalist divider line -->
    <rect x="-150" y="25" width="300" height="1" fill="#334155" />
    
    <text y="50" class="math" fill="#00E5FF" font-size="12px" letter-spacing="4px">
      < AI ENGINEER /> 
      <tspan fill="#475569">|</tspan> 
      < FRONTEND ARCHITECT />
    </text>
  </g>

  <!-- UI Bracket Framing (Tech HUD aesthetic) -->
  <path d="M 40 100 L 40 80 L 60 80" fill="none" stroke="#475569" stroke-width="2" />
  <path d="M 960 100 L 960 80 L 940 80" fill="none" stroke="#475569" stroke-width="2" />
  <path d="M 40 250 L 40 270 L 60 270" fill="none" stroke="#475569" stroke-width="2" />
  <path d="M 960 250 L 960 270 L 940 270" fill="none" stroke="#475569" stroke-width="2" />

</svg>
