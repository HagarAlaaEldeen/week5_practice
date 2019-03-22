const express = require('express');
const router = express.Router();

const genres= [
    { id: 1, name: 'Fantasy' },  
    { id: 2, name: 'Crime' },  
    { id: 3, name: 'Animation' }, 
    { id: 4, name: 'Documentary' }, 
    { id: 5, name: 'Biography' }, 
    { id: 6, name: 'History' }, 
    { id: 7, name: 'Action' }, 
    { id: 8, name: 'Romance' }, 
    { id: 9, name: 'comedy' }, 
];

//incoming Request
router.get('/', (req ,res) => {
    res.send('Hello in Vidly');
});

router.get('/genres', (req ,res) => {
    res.send(genres);
});

router.get('genres/:id', (req, res) =>{
    //res.send(req.query);
    const genre = genres.find(c => c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('the genre with the given id was not found');
    res.send(genre);
 });

 router.post('genres/', (req, res) => {
    const {error} =validateGenre(req.body); //error=result.error
    if (error) return res.status(400).send(error.details[0].message);

    //create new genre in genres
    const genre={id: genres.length+1, 
                 name:req.body.name};
    genres.push(genre);  
    res.send(genre)
});

router.put('genres/:id', (req, res) =>{
//look up the genre
 //if not existing, return 404
 const genre = genres.find(c => c.id===parseInt(req.params.id));
 if(!genre) return res.status(404).send('the genre with the given id was not found');
    //validate?
    //if not validate, return 400 -bad request
    const {error} =validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //update
    genre.name=req.body.name;
    //return the updated genre.
    res.send(genre);
});

function validateGenre(genre){
    const schema ={
        name:Joi.string().min(3).required()
     };
    return Joi.validate(genre, schema);
}

router.delete('genres/:id', (req, res) =>{
    //look up the genre
    //not existing, return 404
    const genre = genres.find(c => c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('the genre with the given id was not found');

    //delete
    const index = genres.indexOf(genre);
    courses.splice(index,4);
    res.send(genre);
});

module.exports = router;
