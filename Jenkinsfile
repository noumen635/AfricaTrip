pipeline {
  
  agent any
  
  stages {
    
    stage('SonarQube analysis') {
      
      steps {
        
        script {
          def scannerHome = tool 'SonarQubeScanner-4.7.0';
          echo "${scannerHome}"
        }
        
        echo "${scannerHome}"
        
        withSonarQubeEnv('sonarqube-9.5') { 
          // If you have configured more than one global server connection, you can specify its name
          sh "${scannerHome}/bin/sonar-scanner"
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
        sh "docker-compose up -d"
     }
      
    }
    
  }
  
}
