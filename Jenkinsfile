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

         def existing = sh (returnStdout: true, script: "docker container ls -a -f name=africatrip")

         if (existing) {
           sh "docker rm africatrip"
         }

         sh "docker run 'africatrip'"
       }
       
     }
      
    }
    
  }
  
}
