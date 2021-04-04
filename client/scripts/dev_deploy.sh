#!/usr/bin/env bash
scripts/build_container.sh
docker push registry.abetalife.com/react-spa-project:dev
kubectl rollout restart deployment/react-spa-project-dev
