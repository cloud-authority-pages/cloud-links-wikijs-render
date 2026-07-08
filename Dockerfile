FROM ghcr.io/requarks/wiki:2
ENV DB_TYPE=sqlite
ENV DB_FILEPATH=/wiki/data/wiki.db
EXPOSE 3000
