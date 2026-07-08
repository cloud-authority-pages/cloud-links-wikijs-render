FROM ghcr.io/requarks/wiki:2
ENV DB_TYPE=sqlite
ENV DB_FILEPATH=/wiki/data/wiki.db
ENV PORT=3000
EXPOSE 3000
