pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/iammanishjangra/deploy-devsecops-vite-project-jenkins.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'SonarScanner',
                        type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh 'trivy fs .'
            }
        }

        stage('Deploy to Server') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'deploy-server-cred',
                        usernameVariable: 'DEPLOY_USER',
                        passwordVariable: 'DEPLOY_PASS'
                    ),
                    string(
                        credentialsId: 'deploy-server-ip',
                        variable: 'DEPLOY_IP'
                    )
                ]) {
                    sh """
                        sshpass -p '${DEPLOY_PASS}' rsync -avz \
                          -e "ssh -o StrictHostKeyChecking=no" \
                          -r ./dist/* ${DEPLOY_USER}@${DEPLOY_IP}:/var/www/html/
                    """
                }
            }
        }

        stage('OWASP ZAP Scan') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'deploy-server-ip',
                        variable: 'DEPLOY_IP'
                    )
                ]) {
                    sh """
                        docker run --rm --network="host" \
                          -v \$(pwd):/zap/wrk/:rw \
                          -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \
                          -t http://${DEPLOY_IP}:80 \
                          -r report.html || true
                    """
                }
            }
        }

    }

    post {
        always {
            archiveArtifacts artifacts: 'report.html',
                             allowEmptyArchive: true,
                             fingerprint: true

            emailext (
                to: 'manishjangra97@gmail.com',
                subject: "Jenkins Build #${BUILD_NUMBER} — ${currentBuild.currentResult}",
                body: """
                    <html>
                    <body>
                        <h2 style="color: #333;">Jenkins Pipeline Report</h2>
                        <table style="border-collapse: collapse; width: 60%;">
                            <tr style="background:#f2f2f2;">
                                <td style="padding:8px; border:1px solid #ddd;"><b>Project</b></td>
                                <td style="padding:8px; border:1px solid #ddd;">${JOB_NAME}</td>
                            </tr>
                            <tr>
                                <td style="padding:8px; border:1px solid #ddd;"><b>Build Number</b></td>
                                <td style="padding:8px; border:1px solid #ddd;">#${BUILD_NUMBER}</td>
                            </tr>
                            <tr style="background:#f2f2f2;">
                                <td style="padding:8px; border:1px solid #ddd;"><b>Status</b></td>
                                <td style="padding:8px; border:1px solid #ddd; color: ${currentBuild.currentResult == 'SUCCESS' ? 'green' : 'red'};">
                                    <b>${currentBuild.currentResult}</b>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:8px; border:1px solid #ddd;"><b>Duration</b></td>
                                <td style="padding:8px; border:1px solid #ddd;">${currentBuild.durationString}</td>
                            </tr>
                            <tr style="background:#f2f2f2;">
                                <td style="padding:8px; border:1px solid #ddd;"><b>Console Log</b></td>
                                <td style="padding:8px; border:1px solid #ddd;">
                                    <a href="${BUILD_URL}console">${BUILD_URL}console</a>
                                </td>
                            </tr>
                        </table>
                        <br>
                        <p>OWASP ZAP security scan report attachment mein hai.</p>
                        <p style="color: gray; font-size: 12px;">— Jenkins Automation</p>
                    </body>
                    </html>
                """,
                mimeType: 'text/html',
                attachmentsPattern: 'report.html',
                attachLog: true
            )

            cleanWs()
        }

        success {
            echo '✅ Pipeline successful!'
        }

        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
