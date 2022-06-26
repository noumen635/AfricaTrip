pipeline {
  
  agent any
  
  tools {
    nodejs 'NodeJS-14.19.3'
  }
  
  stages {
    
    stage('SonarQube analysis') {
      
      steps {
        
        script {
          def scannerHome = tool 'SonarQubeScanner-4.7.0';
          echo "${scannerHome}"
          withSonarQubeEnv('sonarqube-9.5') { 
            // If you have configured more than one global server connection, you can specify its name
            sh "${scannerHome}/bin/sonar-scanner"
          }
          
        }
        
      }
      
    }
    
    stage("Quality Gate") {
      
      steps{
        
        script {
          timeout(time: 1, unit: 'HOURS') { // Just in case something goes wrong, pipeline will be killed after a timeout
            def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
            if (qg.status != 'OK') {
              error "Pipeline aborted due to quality gate failure: ${qg.status}"
            }    
            
          }
          
        }
        
      }
      
      post {
        failure {
          emailext body: '''$PROJECT_NAME - $JOB_NAME # $BUILD_NUMBER - $BUILD_STATUS : Check console output at $JOB_URL to view the results. Please note that this is an automated email.''', 
          subject: '$PROJECT_NAME - $JOB_NAME # $BUILD_NUMBER - $BUILD_STATUS!', 
          to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }

    stage("build") {
 
      steps {
        echo 'building the application...'
        sh "docker build -t noumendarryl/africatrip:${BUILD_NUMBER} ."
        sh "docker build -t noumendarryl/africatrip:latest ."
      }
      
    }
    
    stage("test") {
      
      steps {
        echo 'testing the application...'
      }
      
    }
    
    stage("artifact storage") {
      
      steps {
        echo 'packaging the application...'
        withCredentials([string(credentialsId: 'DockerID', variable: 'Docker_PWD')]) {
          sh "docker login -u noumendarryl -p ${Docker_PWD}"
        }
        sh "docker push noumendarryl/africatrip:${BUILD_NUMBER}"
        sh "docker push noumendarryl/africatrip:latest"
      }
      
    }
      
    stage("deploy on Docker") {
      
     steps {
       
       script {
         def container = sh(returnStdout: true, script: "docker ps -q -f name=africatrip")

         if (container) {
           sh "docker stop africatrip"        
         }
         
         def is_existing = sh (returnStdout: true, script: "docker container ls -a -q -f name=africatrip")

         if (is_existing) {
           sh "docker rm africatrip"
         }

         sh "docker run -d -p 80:80 --name=africatrip noumendarryl/africatrip:latest"
       }
       
     }
      
    }
    
    stage("Email Notification") {
      
      steps {
        emailext body: '''$PROJECT_NAME - Pipeline # $BUILD_NUMBER - $BUILD_STATUS : Check console output at $BUILD_URL to view the results. Please note that this is an automated email.''', 
        subject: '$PROJECT_NAME - Pipeline # $BUILD_NUMBER - $BUILD_STATUS!', 
        to: 'darrylnoumen3@gmail.com'
      }
      
    }
    
  }
  
}
