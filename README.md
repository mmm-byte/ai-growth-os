<div align="center">

<img src="https://raw.githubusercontent.com/mmm-byte/mmm-byte/main/header-hero.svg" alt="Mahindra Guptha Kotha — AI Engineer" width="100%" />

# Mahindra Guptha Kotha

**AI/ML Engineer · Full-Stack & Cloud Architect · LLM Systems**

[LinkedIn](https://www.linkedin.com/in/mahindra-guptha-kotha/) · [Email](mailto:mahikotha22@gmail.com) · Dallas, TX · Open to AI/ML & platform roles

</div>

---

## 👋 About

I'm a full-stack engineer and applied ML researcher working across the entire path from model to production: research prototypes, LLM evaluation infrastructure, autonomous agent systems, and the cloud and database layers that keep them running.

Currently building AI agents and data platforms in Dallas, TX. Previously: HIPAA-compliant clinical AI at SMU (published, IEEE HealthCom), enterprise PLM integration at Hexagon (Star Team Award), and cloud architecture work across AWS and Azure.

**Education** — M.S. Computer Science (AI/ML), Southern Methodist University · B.Tech Mechanical Engineering, R.V.R. & J.C. College of Engineering (Full Academic Scholar)

**What I'm looking for** — AI/ML engineering roles touching autonomous agents, LLM safety, or production ML infrastructure. Also open to cloud architecture and full-stack platform work.

---

## 🎯 What I Work On

| Area | Detail |
|---|---|
| **LLM Systems** | Multi-model judge panels, consensus & agreement scoring, rubric-based evaluation, hallucination detection, prompt-injection guards, context compression |
| **Agent Architecture** | Multi-agent orchestration, MCP tool servers, autonomous self-correcting loops, RL-style feedback, RAG pipelines |
| **AI Safety & Compliance** | PHI-scrubbing pipelines, HIPAA data isolation, LLM-as-judge review, trust-boundary enforcement, audit logging |
| **ML & Vision** | PyTorch, CNNs, YOLO object detection, OpenCV, image/video classification, model compression (ternary 1.58-bit) |
| **Backend & Data** | Python, FastAPI, Node.js, PostgreSQL, MongoDB, Redis, BullMQ, ETL pipelines, vector databases |
| **Frontend** | TypeScript, React, Next.js, Angular, Electron, Tailwind |
| **Cloud & Infra** | AWS (EC2, S3, VPC, RDS), Azure (App Service, SQL, Networking), Docker, Kubernetes, Terraform, CI/CD |
| **Observability** | Arize Phoenix, OpenTelemetry, Dynatrace, LLM trace analysis |

---

## 🚀 Featured Work

<div align="center">

<img src="https://raw.githubusercontent.com/mmm-byte/mmm-byte/main/dashboard.svg" alt="Expertise dashboard — skills, timeline, and achievements" width="100%" />

</div>

### 🛡️ [SENTINEL](https://github.com/mmm-byte/SENTINEL) — Autonomous Database Immune System
*Google Cloud Rapid Agent Hackathon 2026 · Gemini 2.0 Flash · Google ADK · MongoDB Atlas*

An agent that detects schema drift in a live database and self-heals it. Built for a hackathon spanning **6 partner tracks** (MongoDB, Arize Phoenix, Dynatrace, Fivetran, GitLab, Elastic).

The core design decision is **zero data destruction** — corrupt documents are quarantined with full metadata, never deleted — combined with **minimum blast radius**, relaxing only the specific field causing a violation rather than disabling the validator.

What makes it non-trivial is the safety boundary. Every outbound JSON-RPC call passes through a trust-boundary proxy:

```python
class ArmorPolicy:
    max_param_bytes: int = 64 * 1024          # hard payload cap
    denylist_regex: List[Pattern] = field(default_factory=lambda: [
        re.compile(r"ignore\s+(all\s+)?previous\s+instructions", re.IGNORECASE),
        re.compile(r"disregard\s+(all\s+)?(prior|above)\s+(rules|instructions)", re.IGNORECASE),
        re.compile(r"<\s*script\s*>", re.IGNORECASE),   # XSS in text fields
    ])
    allow_actions: Iterable[str] = field(default_factory=lambda: (
        "query_topology", "search_logs", "collMod", "quarantine", "trigger_resync",
    ))
```

It also **self-improves**: every 10 incidents it pulls traces from Arize, scores them with Gemini-as-judge, and writes improvement hints back — measurably better the longer it runs.

### 🧪 [Multi-LLM Medical AI Judge](https://github.com/mmm-byte/Multi_LLM_Medical_AI_Judge) — LLM Evaluation Framework
*Python · Multi-model consensus · Rubric-based scoring*

A judge panel for clinical QA evaluation. Multiple independent models score the same answer against rubric criteria, and the panel's **inter-judge agreement is measured before any score is reported** — if the judges don't agree, no score is emitted.

```python
def compute_agr(judge_scores, kappa):
    """Eq.1 — pairwise agreement in [0,1].
    judge_scores: {judge_id: {criterion_id: raw_score}}
    kappa:        {criterion_id: max_possible_score}
    """
    total = agree = 0.0
    for ji, jj in combinations(judge_scores.keys(), 2):
        si, sj = judge_scores[ji], judge_scores[jj]
        for k, kap in kappa.items():
            if k not in si or k not in sj or si[k] is None or sj[k] is None:
                continue
            agree += 1.0 - abs(si[k] - sj[k]) / kap
            total += 1.0
    return 0.0 if total == 0.0 else agree / total
```

Four routing levels — `full_agree` (≥0.95), `majority_agree` (≥0.75), `split`, `disagree` — plus outlier judge detection that flags whichever model has drifted most from consensus. Used in HIPAA-compliant clinical AI where a hallucinated answer has real clinical consequence.

### ⚙️ [vibeforge](https://github.com/mmm-byte/vibeforge) — AI Development Pipeline
*Python · PyPI · Quality-gated orchestration*

A 7-stage pipeline (`clarify → architect → scaffold → build → harden → document → ship`) where **each stage is gated by a quality check** that can fail the run. State persists to disk so interrupted runs resume rather than restart.

```python
class Pipeline:
    STAGES: list[str] = [
        "clarify", "architect", "scaffold", "build", "harden", "document", "ship",
    ]

    def resume(self) -> None:
        """Resume an interrupted run from .vibeforge/state.json"""
```

### 🔍 [git-why](https://github.com/mmm-byte/git-why) — AI-Powered Code Reasoning
*Python · PyPI · Ollama · Local-first*

Understands the reasoning behind a change — not just the diff, but the why. Shells out to `git` directly, bounds diff output to prevent token overflow, and runs fully locally against Ollama.

```python
def analyze_range(self, revision_range="HEAD~1..HEAD", max_diff_lines=500, file_filter=None) -> AnalysisContext:
    """max_diff_lines caps output to prevent token overflow; file_filter accepts globs like '*.py'"""
```

### 📈 [kairon](https://github.com/mmm-byte/kairon) — Multi-Agent Financial Intelligence
*Python · Streamlit · LangChain · GDELT + Yahoo Finance · Zero required API keys*

8 specialized agents (Technical, Fundamental, News, Macro, Cross-Market, Bull, Bear, Trader) with full data fallback chains, so it runs immediately with no keys and degrades gracefully. Includes a 7-type cost engine (broker, spread, slippage, FX, gas, wire, tax), Half-Kelly position sizing, and a knowledge base that learns from past outcomes.

### 📚 [context-engineering-guide](https://github.com/mmm-byte/context-engineering-guide)
*The practical guide to context engineering — RAG, agents, MCP, compression — with working code.*

### 🔬 Other Projects

| Project | What it is |
|---|---|
| [bitnet-1.58-pattern-compression](https://github.com/mmm-byte/bitnet-1.58-pattern-compression) | Ternary compression research for 1.58-bit models — motif dictionaries, cross-layer attention tying, sparse pattern collapse |
| [Liquid_time_constant_network](https://github.com/mmm-byte/Liquid_time_constant_network) | LTC neural networks — continuous-time recurrent architectures |
| [ElephantVoice](https://github.com/mmm-byte/ElephantVoice) | Audio/voice AI processing pipeline |
| [Fake_News_detection_with_Python](https://github.com/mmm-byte/Fake_News_detection_with_Python) | NLP fake-news classifier |
| [Securing_data_using_CNN](https://github.com/mmm-byte/Securing_data_using_CNN) | CNN-based data security |
| [CNN_Video_Surveillance](https://github.com/mmm-byte/CNN_Video_Surveillance) | Real-time video surveillance with CNNs |
| [An_Intelligent_Garbage_Automation_System](https://github.com/mmm-byte/An_Intelligent_Garbage_Automation_System) | IoT autonomous waste collection — published in Springer's AEOTIT |
| [Streamlits_Projects](https://github.com/mmm-byte/Streamlits_Projects) | Interactive ML dashboards |
| [PythonProjects](https://github.com/mmm-byte/PythonProjects) | Collection of practical Python projects |

---

## ☁️ Cloud Architecture Work

**[AWS Cloud Computing Portfolio](https://github.com/mmm-byte/Cloud_Computing_AWS)** — 8 hands-on labs (IAM, EC2, storage, networking, databases, auto-scaling, security, high-performance architectures), Terraform modules with multi-region failover, containerized microservices on EC2 behind an ALB.

**[Azure Cloud Computing Portfolio](https://github.com/mmm-byte/Cloud_Computing_Azure)** — 6 labs (fundamentals, VMs, storage, networking, databases, App Service) with an enterprise Terraform project: `main.tf`, `variables.tf`, `outputs.tf`, remote state, plus `deploy.sh`, `verify.sh`, monitoring, and rollback scripts.

**Hexagon PLM** — Enterprise integration (2022–2024, Star Team Award). Python/Java/C++ pipelines ingesting 3D models and engineering documentation into Azure PLM; React + Node.js unified search indexing equipment IDs for 50+ engineering teams; PowerBI analytics; SQL ETL migrations validated with Postman and Selenium.

---

## 🏆 Highlights

- **Published** — Autonomous Campus Garbage Management System, Springer's *Advanced Engineering Optimization Through Intelligent Techniques*
- **Published** — IEEE HealthCom, clinical AI usability and patient outcomes
- **Star Team Award** — Hexagon PLM integration
- **HIPAA compliance** — Privacy-preserving medical AI with PHI scrubbing and zero PHI leaks
- **Self-improving AI** — SENTINEL refines its own detection strategy from production traces

---

## 🛠️ Tech Stack

<div align="center">

**AI / ML**
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)

**Full-Stack**
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**Cloud & Infra**
![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

</div>

---

## 📊 GitHub Stats

<div align="center">
  <img height="180" src="https://github-readme-stats.vercel.app/api?username=mmm-byte&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true&hide_border=true&bg_color=0d1117&title_color=58a6ff&icon_color=6e40c9&text_color=c9d1d9" alt="GitHub stats" />
  <img height="180" src="https://github-readme-stats.vercel.app/api/top-langs/?username=mmm-byte&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=c9d1d9&langs_count=8" alt="Top languages" />
</div>

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=mmm-byte&theme=tokyonight&hide_border=true&background=0d1117&stroke=58a6ff&ring=6e40c9&fire=ff7b72&currStreakLabel=58a6ff" alt="Contribution streak" />
</div>

---

## 📬 Get in Touch

Open to AI/ML engineering, LLM safety, and cloud architecture roles — remote or relocation to Dallas.

[LinkedIn](https://www.linkedin.com/in/mahindra-guptha-kotha/) · [GitHub](https://github.com/mmm-byte) · [Email](mailto:mahikotha22@gmail.com)

<div align="center">

**Code that thinks. Infrastructure that scales. Data that's safe.**

</div>