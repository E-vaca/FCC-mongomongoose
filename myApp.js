require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var janeDoe = new Person({name: "Jane Doe", age: 25, favoriteFoods: ["pizza", "pasta"]});
  janeDoe.save(function(err, data) {
    if (err) {
      return console.error(err);
    } else {
    done(null, data)
    }
  });};

const arrayOfPeople = [
  {
    name: 'Alice',
    age: 25,
    favoriteFoods: ['Pizza', 'Pasta']
  },
  {
    name: 'Bob',
    age: 30,
    favoriteFoods: ['Burger', 'Sushi']
  },
  {
    name: 'Charlie',
    age: 22,
    favoriteFoods: ['Tacos', 'Ice Cream']
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      return console.error(err);
    } else {
    done(null, people)
    }
  });};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
  if (err) {
    return console.error(err);
  } else {
  done(null, personFound);
};
  })}

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, personFound) => {
  if (err) {
    return consoloe.error(err);
  } else {
  done(null, personFound);
}
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      return console.error(err);   
      } else {
      done(null, personFound)
    }
  })}
      
      
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      return console.error(err);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) {
        return console.error(err);
      } else {
      done(null, updatedPerson);
}
    })
})}

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, (err, person) => {
    if (err) {
      return console.error(err);
    } else {
      done(null, person)
  }
})};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) {
      return console.error(err);
    } else {
  done(null, removedDoc);
}})};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if (err) {
      return console.error(err);
    } else {
  done(null, response);
    }})}
        
const queryChain = (done) => {
  const foodToSearch = "burrito";
  var findQuery = Person.find({favoriteFoods: foodToSearch});
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
    if (err) {
      return console.error(err);
    } else {
  done(null, data);
}})};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
