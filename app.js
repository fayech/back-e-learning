const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


//Requiring user route
const adminRoutes = require('./routes/administrateur');
const utilisateurRoutes = require('./routes/utilisateur');
const etudiantRoutes = require('./routes/etudiant');
const enseignantRoutes = require('./routes/enseignant');
const GroupesRoutes = require('./routes/Groupes');
const DocumentRoutes = require('./routes/Document');
const CalendrireRoutes = require('./routes/Calendrier');
const ClasseRoutes = require('./routes/Classe');
const infoRoutes = require('./routes/info');
const chatRoutes = require('./routes/chat');
const chartRoutes = require('./routes/chart');
//Requiring user route
dotenv.config({path : './config.env'});

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
});
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(adminRoutes);
app.use(utilisateurRoutes);
app.use(etudiantRoutes);
app.use(enseignantRoutes);
app.use(GroupesRoutes);
app.use(DocumentRoutes);
app.use(CalendrireRoutes);
app.use(ClasseRoutes);
app.use(infoRoutes);
app.use(chatRoutes);
app.use(chartRoutes);






app.listen(process.env.PORT, ()=> {
    console.log('Server is started');
});