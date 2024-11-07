pipeline {
    agent any
    tools {
        nodejs 'nodejs_20_17_0' // Configura la versión de Node.js instalada en Jenkins
    }
    stages {
        stage('Install Dependencies') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/NicolasAMunozR/TingesoLab1-Frontend']])
                dir('frontend') { // Cambia al directorio 'frontend'
                    bat 'npm install' // Usa 'bat' para Windows o 'sh' para Linux/Mac
                }
            }
        }

        stage('Build Project') {
            steps {
                dir('frontend') { // Cambia al directorio 'frontend'//////
                    bat 'npm run build' // Genera la versión de producción del frontend
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dir('frontend') { // Cambia al directorio 'frontend'
                        bat 'docker build -t nickasch/prestabanco-frontend:latest .' // Construye la imagen Docker
                    }
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'tingeso', variable: 'dhpsw')]) {
                        bat 'docker login -u nickasch -p %dhpsw%'
                    }
                    bat 'docker push nickasch/prestabanco-frontend:latest'
                }
            }
        }
    }
}