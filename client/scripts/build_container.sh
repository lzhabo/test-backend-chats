#!/usr/bin/env bash
if [[ -z "${1}" ]]; then
  echo "Version is not set. Building with dev tag"
  VERSION="dev"
else
  echo "Building ${1}"
  VERSION="${1}"
fi
set -e
# Закомментил процес копирования и билда common модуля. Вооюще нужен более красивый способ подключать локальные пакеты к проекту
#mkdir calculator-common
#cp -r ../calculator-common/src ./calculator-common/src
#cp  ../calculator-common/package.json ./calculator-common/package.json
#cp  ../calculator-common/package-lock.json ./calculator-common/package-lock.json
#cp  ../calculator-common/tsconfig.json ./calculator-common/tsconfig.json

docker build -t registry.abetalife.com/react-spa-project:${VERSION} .
#rm -r calculator-common
