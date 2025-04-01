import winston from 'winston'

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'gray'
  });

const logger = winston.createLogger({
    level: 'debug', 
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      })
    ),
    transports: [
      
   
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(), 
          winston.format.simple()    
        )
      })
    ]
  });

export default logger