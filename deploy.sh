#!/bin/bash

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 449094484520.dkr.ecr.us-west-2.amazonaws.com
docker tag insurance-portal/angular:latest 449094484520.dkr.ecr.us-west-2.amazonaws.com/insurance-portal/angular:latest
docker push 449094484520.dkr.ecr.us-west-2.amazonaws.com/insurance-portal/angular:latest
aws ecs update-service --cluster insurance-portal-ec2-cluster --service angular-srv --force-new-deployment