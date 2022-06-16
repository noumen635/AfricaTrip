pipeline {
  
  agent any
  
  stages {
    
    stage("build") {
      
      steps {
        echo 'building the application...'
        sh "docker build -t noumendarryl/my-multibranch-pipeline:${BUILD_NUMBER}"
      }
      
    }
    
    stage("test") {
      
      steps {
        echo 'testing the application...'
      }
      
    }
    
    stage("package") {
      
      steps {
        echo 'packaging the application...'
        withCredentials([string(credentialsId: 'DockerID', variable: 'dockerpwd')]) {
          sh "docker login -u noumendarryl -p ${dockerpwd}"
        }
        sh "docker push noumendarryl/my-multibranch-pipeline:${BUILD_NUMBER}"
      }
      
    }
    
  }
  
}
