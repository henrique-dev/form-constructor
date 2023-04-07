FROM node:18

ARG USER_ID
ARG GROUP_ID
ARG PORT

RUN npm install -g npm@9.5.0

ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH
COPY . .
RUN rm -rf node_modules .next

COPY entrypoint.app.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.app.sh
ENTRYPOINT ["entrypoint.app.sh"]
EXPOSE $PORT

USER $USER_ID

CMD ["npm", "start"]
