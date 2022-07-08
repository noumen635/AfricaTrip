pipeline {
  
  agent any
  
  tools {

    nodejs 'NodeJS-14.19.3'

  }
  
  stages {
    
    stage ('SonarQube analysis') {
      
      steps {

        echo "Analyzing my source code"

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
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
            subject: '$PROJECT_NAME - SonarQube Analysis # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'

          slackSend channel: '#devops-environment', 
          color: 'danger', 
          message: "my-multibranch-pipeline » master - SonarQube Analysis # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        }
        
      }
      
    }
    
    stage ("Quality Gate") {
      
      steps {

        echo "Applying quality gates to my project"

        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }

      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
            subject: '$PROJECT_NAME - Quality Gate # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'

          slackSend channel: '#devops-environment', 
          color: 'danger', 
          message: "my-multibranch-pipeline » master - Quality Gate # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        }
        
      }
      
    }

    stage ("Unit Testing") {

      steps {

        echo "Testing my website unit functions"

      }
          
      post {
            
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
            subject: '$PROJECT_NAME - Unit Testing # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'

          slackSend channel: '#devops-environment', 
          color: 'danger', 
          message: "my-multibranch-pipeline » master - Unit Testing # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        }
            
      }

    }
    
  }
  
}