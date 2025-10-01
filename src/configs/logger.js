import winston from 'winston';
const {combine, timestamp, json, errors} = winston.format

const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json(), errors({stack:true})),
    defaultMeta: { service: "acquisitions-api" },
    transports: [
        new winston.transports.File({
            filename: 'log/combined.log',
        }),
        new winston.transports.File({
            filename: 'log/error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), json()),
        }),
        new winston.transports.File({
            filename: 'log/info.log',
            level: 'info',
            format: combine(infoFilter(), timestamp(), json()),
        }),
    ],
});

export default logger;
