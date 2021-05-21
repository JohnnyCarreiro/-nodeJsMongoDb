import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import { host, port, user, pass } from '../config/mail.json'


 const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });

  transport.use('compile', hbs({
      viewEngine: {
        extname: '.hbs', 
        layoutsDir: './src/resources/mail/', // location of handlebars templates
        defaultLayout: null, // name of main template
        partialsDir: './src/resources/mail/', // location of your subtemplates aka. header, footer etc
      },
      viewPath: path.resolve('./src/resources/mail/'),
      extName:'.hbs',
  }))

  export default transport