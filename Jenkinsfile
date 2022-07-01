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
          withSonarQubeEnv('sonarqube-9.5') { 
            // If you have configured more than one global server connection, you can specify its name
            sh "${scannerHome}/bin/sonar-scanner"
          }
          
        }
        
      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider']],
            subject: '$PROJECT_NAME - SonarQube analysis # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
//     stage("Quality Gate") {
      
//       steps{
        
//         script {
//           timeout(time: 1, unit: 'HOURS') { // Just in case something goes wrong, pipeline will be killed after a timeout
//             def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
//             if (qg.status != 'OK') {
//               error "Pipeline aborted due to quality gate failure: ${qg.status}"
//             }    
            
//           }
          
//         }
        
//       }
      
//       post {
        
//         failure {
//           emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
//             recipientProviders: [[$class: 'RequesterRecipientProvider']],
//             subject: '$PROJECT_NAME - Quality Gate # $BUILD_NUMBER - $BUILD_STATUS !', 
//             to: 'darrylnoumen3@gmail.com'
//         }
        
//       }
      
//     }

    stage("build") {
 
      steps {
        echo 'building the application...'
        sh "docker build -t noumendarryl/africatrip:v1.${BUILD_NUMBER} ."
        sh "docker build -t noumendarryl/africatrip:latest ."
      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider']], 
            subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
    stage("test") {
      
      steps {
        echo 'testing the application...'
      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider']], 
            subject: '$PROJECT_NAME - Test # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
    stage("artifact storage") {
      
      steps {
        echo 'packaging the application...'
        withCredentials([string(credentialsId: 'DockerID', variable: 'Docker_PWD')]) {
          sh "docker login -u noumendarryl -p ${Docker_PWD}"
        }
        sh "docker push noumendarryl/africatrip:v1.${BUILD_NUMBER}"
        sh "docker push noumendarryl/africatrip:latest"
      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider']],
            subject: '$PROJECT_NAME - Artifactory Storage # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
      
    stage("deploy on Docker") {
      
     steps {
       sh "docker-compose up -d"
     }
      
     post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider']],
            subject: '$PROJECT_NAME - Docker Deployment # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
    stage("Feedback") {
      
      steps {
        
        //wrap([$class: 'BuildUser']) {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider']],
            subject: '$PROJECT_NAME - Pipeline # $BUILD_NUMBER - $BUILD_STATUS !',
            to: 'darrylnoumen3@gmail.com'
        // }
        
        slackSend channel: '#devops-environment', 
          color: 'good', 
          message: "my-multibranch-pipeline » master - Pipeline # ${env.BUILD_NUMBER} - ${env.BUILD_STATUS} : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        
      }
      
    }
    
  }
  
}
