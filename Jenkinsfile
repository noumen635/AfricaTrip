pipeline {
  
  agent any
  
  tools {
    nodejs 'NodeJS-14.19.3'
  }
  
  stages {
    
    stage('SonarQube analysis') {
      
      steps {

        echo 'Analyzing my source code'

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
            subject: '$PROJECT_NAME - SonarQube analysis # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
    // stage("Quality Gate") {
      
    //   steps{
        
    //     script {
    //       // Just in case something goes wrong, pipeline will be killed after a timeout
    //       timeout(time: 1, unit: 'HOURS') { 
    //         // Reuse taskId previously collected by withSonarQubeEnv
    //         def qg = waitForQualityGate() 
    //         if (qg.status != 'OK') {
    //           error "Pipeline aborted due to quality gate failure: ${qg.status}"
    //         }    
            
    //       }
          
    //     }
        
    //   }
      
    //   post {
        
    //     failure {
    //       emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
    //         recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
    //         subject: '$PROJECT_NAME - Quality Gate # $BUILD_NUMBER - $BUILD_STATUS !', 
    //         to: 'darrylnoumen3@gmail.com'
    //     }
        
    //   }
      
    // }

    stage("Build") {
 
      steps {

        echo 'Building the application'
        sh "docker build -t noumendarryl/africatrip:v1.${BUILD_NUMBER} ."
        sh "docker build -t noumendarryl/africatrip:latest ."

      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
            subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
    stage("Tests") {
      
      steps {

        echo 'Testing the application'
        sh "/usr/bin/jmeter/apache-jmeter-5.5/bin/jmeter -n -t AfricaTrip.jmx -l AfricaTripResults.jtl"
        // sh "cat AfricaTripResults.jtl"
        perfReport "AfricaTripResults.jtl"  

      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.',
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], 
            subject: '$PROJECT_NAME - Test # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
    stage("Artifact Storage") {
      
      steps {

        echo 'Packaging and storing dependencies of the application'
        // withCredentials([string(credentialsId: 'DockerID', variable: 'Docker_PWD')]) {
        //   sh "docker login -u noumendarryl -p ${Docker_PWD}"
        // }
        // sh "docker push noumendarryl/africatrip:v1.${BUILD_NUMBER}"
        // sh "docker push noumendarryl/africatrip:latest"
        withCredentials([usernamePassword(credentialsId: 'JfrogID', passwordVariable: 'JfrogPWD', usernameVariable: 'JfrogID')]) {
            sh "docker login -u ${JfrogID} -p ${JfrogPWD} jabaspace.jfrog.io"
        }
        sh "docker tag noumendarryl/africatrip:v1.${BUILD_NUMBER} jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:v1.${BUILD_NUMBER}"
        sh "docker tag noumendarryl/africatrip:latest jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:latest"
        sh "docker push jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:v1.${BUILD_NUMBER}"
        sh "docker push jabaspace.jfrog.io/jabaspace/noumendarryl/africatrip:latest"
        
      }
      
      post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
            subject: '$PROJECT_NAME - Artifactory Storage # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
      
    stage("Deploy on kubernetes") {
      
     steps {

      echo 'Deploying my application on k8s'
      //  sh "docker-compose up -d"
      script {
        sh "kubectl apply -f deploymentserviceingress.yml" 
        sh "kubectl get pods"
        sh "kubectl get deployments"
        sh "kubectl get svc"
        sh "kubectl get ingress"
        // sh "minikube service africatrip-service"
      }

     }
      
     post {
        
        failure {
          emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
            recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
            subject: '$PROJECT_NAME - Kubernetes Deployment # $BUILD_NUMBER - $BUILD_STATUS !', 
            to: 'darrylnoumen3@gmail.com'
        }
        
      }
      
    }
    
    stage("Feedback") {
      
      steps {
        
        emailext body: 'Check console output at $JOB_URL/$BUILD_NUMBER/console to view the results. Please note that this is an automated email.', 
          recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
          subject: '$PROJECT_NAME - Pipeline # $BUILD_NUMBER - $BUILD_STATUS !',
          to: 'darrylnoumen3@gmail.com'
        
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