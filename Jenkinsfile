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

    stage ("Unit and Integration Tests") {

      parallel {

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

        stage ("Integration Testing") {

          steps {

            echo "Testing all my website features combined"  

          }
          
          post {
            
            failure {
              emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
                recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
                subject: '$PROJECT_NAME - Integration Testing # $BUILD_NUMBER - $BUILD_STATUS !', 
                to: 'darrylnoumen3@gmail.com'

              slackSend channel: '#devops-environment', 
              color: 'danger', 
              message: "my-multibranch-pipeline » master - Integration Testing # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
              notifyCommitters: true, 
              teamDomain: 'africatripworkspace', 
              tokenCredentialId: 'Slack', 
              username: 'jenkins'
            }
            
          }

        }

      }
      
    }

    stage ("Build") {
 
      steps {

        echo "Building my website"

        sh "docker build -t noumendarryl/africatrip:v1.${BUILD_NUMBER} ."
        sh "docker build -t noumendarryl/africatrip:latest ."

      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
            subject: '$PROJECT_NAME - Build Stage # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'

          slackSend channel: '#devops-environment', 
          color: 'danger', 
          message: "my-multibranch-pipeline » master - Build Stage # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        }
        
      }
      
    }
    
    stage ("Artifact Storage") {
      
      steps {

        echo "Packaging and storing the dependencies of my website"

        withCredentials([usernamePassword(credentialsId: 'JfrogID', passwordVariable: 'JfrogPWD', usernameVariable: 'JfrogID')]) {
          sh "docker login -u ${JfrogID} -p ${JfrogPWD} jabaspace.jfrog.io"
        }

        sh "docker tag noumendarryl/africatrip:v1.${BUILD_NUMBER} jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:v1.${BUILD_NUMBER}"
        sh "docker push jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:v1.${BUILD_NUMBER}"
        sh "docker tag noumendarryl/africatrip:latest jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:latest"
        sh "docker push jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:latest"
        
      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
            subject: '$PROJECT_NAME - Artifactory Storage # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'

          slackSend channel: '#devops-environment', 
          color: 'danger', 
          message: "my-multibranch-pipeline » master - Artifactory Storage # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        }
        
      }
      
    }
      
    stage ("Deploy on kubernetes") {
      
     steps {

      echo "Deploying my website on k8s"
      //  sh "docker-compose up -d"
      script {

        sh "kubectl apply -f deploymentserviceingress.yml" 
        sh "minikube kubectl get all"
        sh "minikube service --url africatrip-service"

      }

     }
      
     post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
            subject: '$PROJECT_NAME - Kubernetes Deployment # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'

          slackSend channel: '#devops-environment', 
          color: 'danger', 
          message: "my-multibranch-pipeline » master - Kubernetes Deployment # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        }
        
      }
      
    }

    stage ("Performance and UI Tests") {

      parallel {

        stage ("Performance Testing") {

          steps {

            echo "Testing the performance my website"
            sh "/usr/bin/jmeter/apache-jmeter-5.5/bin/jmeter -n -t AfricaTrip.jmx -l AfricaTripResults.jtl"
            perfReport "AfricaTripResults.jtl"  

          }
          
          post {
            
            failure {
              emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
                recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
                subject: '$PROJECT_NAME - Performance Testing # $BUILD_NUMBER - $BUILD_STATUS !', 
                to: 'darrylnoumen3@gmail.com'

              slackSend channel: '#devops-environment', 
              color: 'danger', 
              message: "my-multibranch-pipeline » master - Performance Testing # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
              notifyCommitters: true, 
              teamDomain: 'africatripworkspace', 
              tokenCredentialId: 'Slack', 
              username: 'jenkins'
            }
            
          }

        }

        stage ("End-to-End Testing") {

          steps {

            echo "Testing UI expectations"  

          }
          
          post {
            
            failure {
              emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
                recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
                subject: '$PROJECT_NAME - End-to-End Testing # $BUILD_NUMBER - $BUILD_STATUS !', 
                to: 'darrylnoumen3@gmail.com'

              slackSend channel: '#devops-environment', 
              color: 'danger', 
              message: "my-multibranch-pipeline » master - End-to-End Testing # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
              notifyCommitters: true, 
              teamDomain: 'africatripworkspace', 
              tokenCredentialId: 'Slack', 
              username: 'jenkins'
            }
            
          }

        }

      }
      
    }

    stage ("Canary Deployment") {
 
      steps {

        echo "Supplying my website releases using canary deployment method"

      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
            subject: '$PROJECT_NAME - Canary Deployment # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'

          slackSend channel: '#devops-environment', 
          color: 'danger', 
          message: "my-multibranch-pipeline » master - Canary Deployment # ${env.BUILD_NUMBER} - Failed : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        }
        
      }
      
    }
    
    stage ("Feedback") {
      
      steps {
        
        emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
          recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
          subject: '$PROJECT_NAME - Pipeline # $BUILD_NUMBER - $BUILD_STATUS !',
          to: 'darrylnoumen3@gmail.com'
        
        slackSend channel: '#devops-environment', 
          color: 'good', 
          message: "my-multibranch-pipeline » master - Pipeline # ${env.BUILD_NUMBER} - Successful : Check console output at ${env.BUILD_URL} to view the results. Please note that this is an automated email.", 
          notifyCommitters: true, 
          teamDomain: 'africatripworkspace', 
          tokenCredentialId: 'Slack', 
          username: 'jenkins'
        
      }
      
    }
    
  }
  
}