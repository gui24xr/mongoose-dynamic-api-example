import logger from '../services/logger.js'
import mongoose from 'mongoose'

mongoose.plugin((schema) => {
    logger.info('Applying global timestamps plugin to all Mongoose schemas...');
    schema.set('timestamps', true);
  });


async function connectAndConfigDataBase(DB_URL){
    try{
        await mongoose.connect(DB_URL)
       logger.info('Database OK...')
    }catch(error){
        console.error(error)
    }
}

export default connectAndConfigDataBase