FROM golang:1.22.5-alpine3.20@sha256:8c9183f715b0b4eca05b8b3dbf59766aaedb41ec07477b132ee2891ac0110a07

RUN apk add --no-cache ca-certificates

RUN mkdir /src
WORKDIR /src

COPY go.mod .
COPY main.go .

RUN go build -o /bin/frontend-assignment .

RUN adduser -D "frontend-assignment"
USER "frontend-assignment"

EXPOSE 8080
CMD ["/bin/frontend-assignment"]
