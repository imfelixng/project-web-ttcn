DOCKER_REGISTRY:=registry.gitlab.com/s-boilerplate/python-srv
TAG_BACKEND:=project-web-ttcn

BACKUP_ARCHIVE=backup/mongo_$(shell date +%Y%m%d-%s).tar.bz2
LATEST_BACKUP=$(shell ls backup/mongo_*.tar.bz2 | tail -n 1)


run:
	docker-compose up app_srv

build:
	cd appsrv && docker build -t $(TAG_BACKEND) .
