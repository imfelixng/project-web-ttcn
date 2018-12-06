TAG_BACKEND:=project-web-ttcn

BACKUP_ARCHIVE=backup/mongo_$(shell date +%Y%m%d-%s).tar.bz2
LATEST_BACKUP=$(shell ls backup/mongo_*.tar.bz2 | tail -n 1)


run:
	docker-compose up app_srv

build:
	cd appsrv && docker build -t $(TAG_BACKEND) .

backup-db:
	docker-compose -f db.yml run --rm -T backup-db > $(BACKUP_ARCHIVE)

restore-db:
	cat $(LATEST_BACKUP) | docker-compose -f db.yml run --rm -T restore-db
