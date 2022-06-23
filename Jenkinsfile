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

         def existing = sh (returnStdout: true, script: "docker container ls -a -q -f name=africatrip")

         if (existing) {
           sh "docker rm africatrip"
         }

         sh "docker run -d -p 80:80 --name=africatrip noumendarryl/africatrip:latest"
         sh "mkdir share"
         sh "touch share/status.template.html"
         sh 'echo "var vtsStatusURI = "http://localhost/status/format/json", vtsUpdateInterval = 1000;" > share/status.template.html'
         sh "cp share/status.template.html /usr/share/nginx/html/status.html"
         sh 'echo -e "server { server_name 35.219.189.235;\nroot /usr/share/nginx/html;\n# Redirect requests for / to /status.html\nlocation = / {return 301 /status.html;}\nlocation = /status.html {}\n# Everything beginning /status (except for /status.html) is\n# processed by the status handler\nlocation /status {\nvhost_traffic_status_display;\nvhost_traffic_status_display_format json;\n}}" > nginx.conf'
       }
       
     }
      
    }
    
  }
  
}
