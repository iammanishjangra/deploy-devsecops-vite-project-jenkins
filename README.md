# 🚀 End-to-End DevSecOps CI/CD Pipeline with Automated Security Scanning

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![OWASP](https://img.shields.io/badge/OWASP-black?style=for-the-badge&logo=owasp&logoColor=white)

This repository features a robust and scalable **Vite + React.js** web application integrated with a comprehensive **DevSecOps** Continuous Integration and Continuous Deployment (CI/CD) pipeline. By embedding automated security checks and code quality gates at various stages, we ensure that securely validated code is continuously deployed.

---

## 🌟 Key Features

- **Blazing Fast Frontend**: Built with Vite and React for optimal performance.
- **Continuous Integration**: Automated build and testing with Jenkins.
- **Code Quality & SAST**: Continuous inspection of code health using **SonarQube**.
- **Container & Filesystem Scanning**: Identifying misconfigurations and vulnerabilities with **Trivy**.
- **Automated Deployment**: Seamless deployment utilizing `rsync` over SSH to production servers.
- **Dynamic Security Scanning (DAST)**: Automated baseline security checks powered by **OWASP ZAP** in Docker.
- **Intelligent Notifications**: Automated email reports encapsulating pipeline metrics and security logs.

---

## 🏗️ Pipeline Architecture

The Jenkins pipeline is structured into the following sequential stages:

1. **Checkout Code**: Pulls the latest source code from the `main` branch.
2. **Install & Build**: Installs NPM dependencies and compiles the Vite application.
3. **SonarQube Analysis**: Executes static code analysis to spot bugs, code smells, and security hotspots.
4. **Trivy Security Scan**: Scans the project filesystem for vulnerabilities in direct and transitive dependencies.
5. **Deploy to Server**: Securely transfers the built artifacts (`./dist` folder) to the target web server (`/var/www/html/`).
6. **OWASP ZAP Scan**: Runs a Dockerized OWASP ZAP baseline scan against the live deployed application.
7. **Post-Build Actions**: Archives the ZAP vulnerability report and sends an exhaustive email to the stakeholders with the pipeline status and attached scanner report.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Vite
- **CI/CD Orchestration**: Jenkins
- **Quality & SAST**: SonarQube Scanner
- **SCA Scan**: Aqua Security Trivy
- **DAST Scan**: OWASP ZAP (Zaproxy container)
- **Deployment**: `rsync`, `sshpass`

---

## ⚙️ Prerequisites for Jenkins Setup

To replicate or run this pipeline, ensure your Jenkins server has the following configured:

### 1. Jenkins Plugins
- **SonarQube Scanner Plugin**
- **Email Extension Plugin**
- **Credentials Binding Plugin**

### 2. Required Credentials in Jenkins
Create the following credentials in Jenkins before running the job:
- `deploy-server-cred` *(Username with Password)*: SSH credentials for the target deployment server.
- `deploy-server-ip` *(Secret text)*: The IP address or Hostname of the target deployment server.
- `SonarQube` *(Secret text/Token)*: Configured under Jenkins system configuration for SonarScanner.

### 3. Server Dependencies
The Jenkins worker/agent needs these CLI tools installed:
- `npm` and `node`
- `sonar-scanner`
- `trivy`
- `docker` (with permissions to run without `sudo`)
- `sshpass` and `rsync`

---

## 💻 Running the App Locally

If you wish to develop or run the application locally without the pipeline:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iammanishjangra/deploy-devsecops-vite-project-jenkins
   cd deploy-devsecops-vite-project-jenkins
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

*This project is built and maintained with a focus on delivering high build-quality alongside airtight application security out-of-the-box.*
