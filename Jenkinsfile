pipeline {
    agent any

    stages {
        stage('Jenkins') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            
            steps {
               sh '''
                 ls -la
                 node --version
                 npm --version
                 node run build
                 ls -la
               '''
            }
        }
        
    }
}
