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
                 ls -la
               '''
            }
        }
        stage('Test'){
            steps{
                sh '''
                  test -f build/index.pug
                  npm test
                '''
            }
        }
        
    }
}
