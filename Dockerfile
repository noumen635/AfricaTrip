FROM openjdk:8
EXPOSE 8080
ADD target/my-multibranch-pipeline.jar my-multibranch-pipeline.jar 
ENTRYPOINT ["java", "-jar", "my-multibranch-pipeline.jar"]
