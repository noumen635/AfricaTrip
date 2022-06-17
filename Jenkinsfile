pipeline {
  
  agent any
  
  stages {
    
    stage("build") {
      
      steps {
        echo 'building the application...'
        sh "docker build -t noumendarryl/africatrip:${BUILD_NUMBER} ."
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
    }
      
    stage("deploy on Docker") {
      
     steps {
        sh "docker compose up -d"
      }
      
    }
    
  }
  
}
