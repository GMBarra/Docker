FROM debian:jessie

LABEL Description=DaCHS\ is\ a\ publishing\ infrastructure\ for\ the\ Virtual\ Observatory. \
      Author=Markus\ Demleitner \
      URL=http://docs.g-vo.org/DaCHS \
      Reference=http://arxiv.org/abs/1408.5733

MAINTAINER "Carlos Brandt <carloshenriquebrandt at gmail>"

RUN DEBIAN_FRONTEND='noninteractive'               && \
    apt-get update                                 && \
    apt-get install -y sudo wget vim locales git   && \
    apt-get clean

# This is the brute-force solution for Debian;
# I am having problems in set locales non-interactively,
# and since I really need the "C/UTF8" for postgres, will just set it for all.
ENV LC_ALL C.UTF-8
RUN echo LC_ALL="$LC_ALL" > /etc/default/locale

RUN echo 'deb http://vo.ari.uni-heidelberg.de/debian stable main'      > /etc/apt/sources.list.d/gavo.list  && \
    echo 'deb-src http://vo.ari.uni-heidelberg.de/debian stable main' >> /etc/apt/sources.list.d/gavo.list  && \
    wget -qO - http://docs.g-vo.org/archive-key.asc | apt-key add -

RUN sed -i 's/exit 101/exit 0/' /usr/sbin/policy-rc.d

RUN DEBIAN_FRONTEND='noninteractive'            && \
    apt-get update                              && \
    apt-get install -y gavodachs-server         && \
    apt-get clean                               && \
    gavo serve stop && service postgresql stop	&& \
    apt-get install nano			

COPY etc/gavo.rc /etc/gavo.rc

ENV GAVO_ROOT=/var/gavo
ENV GAVO_INPUTS=$GAVO_ROOT/inputs

COPY src/help.sh /help.sh

COPY scripts/ var/scripts/
COPY python/ var/shareEdit/python
COPY templates/ var/shareEdit/templates	
COPY nv_static/ var/shareEdit/nv_static

RUN mkdir /var/gavo/web/templates

CMD ["/bin/bash", "--rcfile", "/var/scripts/scriptMounts.run"]


