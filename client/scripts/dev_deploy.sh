#!/usr/bin/env bash
scripts/build_container.sh
docker push <url>
kubectl rollout restart <url>
