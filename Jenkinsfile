pipeline {
  
  agent any
  
  stages {
    
    stage("build") {
      
      steps {
        echo 'building the application...'
        
        script {
          app = docker.build("my-multibranch-pipeline")
        }
   
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
        
        script {
          docker.withRegistry('', 'DockerID')
          app.push("${BUILD_NUMBER}")
          app.push("latest")
        }
        
      }
      
    }
    
  }
  
}
