const students = [
  {
    id: 1,
    name: "Andre Benjamin",
    house: "Gryffindor"
  }
];

const volStudent = [];

const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

const sortBtn = document.querySelector("#sort");
sortBtn.addEventListener('click', () => {
  
  const form = document.querySelector("#form");
  form.innerHTML += `<form id="studentForm">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="studentName" required>
    </div>
    </div>
    <button type="submit" class="btn btn-primary" id="sortMe">Sort</button>
  </form>`;
}); 

//const filterButtons = () => {
  const domString = "";
  domString = `
  <button class="btn btn-secondary btn buttonRow" id="allStudentsBtn">All Students</button>
  <button class="btn btn-secondary btn buttonRow" id="gryffndorBtn">Gryffindor</button>
  <button class="btn btn-secondary btn buttonRow" id="slytherinBtn">Slytherin</button>
  <button class="btn btn-secondary btn buttonRow" id="hufflepuffBtn">Hufflepuff</button>
  <button class="btn btn-secondary btn buttonRow" id="ravenclawBtn">Ravenclaw</button>
  `;
  renderToDom('#filterBtn', domString);
//}






 const cardsOnDom = (array) => {
  let domString = ""; 
  for (const student of array) {
    domString += `<div class="card ${student.house}" style="width: 18rem;" id="studentCard">
    <div class="card-body">
      <h5 class="card-title">${student.name}</h5>
      <p class="card-text">${student.house}</p>
      <button class="btn btn-danger" id="expel--${student.id}">Expel</button>
    </div>
  </div>`;
  }
  renderToDom("#hogwartsCard", domString);
};

const createStudent = (e) => {
  e.preventDefault();
  
  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  
  const newStudentObj = {
    id: students.length + 1,
    name: document.querySelector("#studentName").value,
    house: houses[Math.floor(Math.random() * houses.length)]
  }

  students.push(newStudentObj);
  students.sort((a, b) => a.name.localeCompare(b.name));
  cardsOnDom(students);
  studentForm.reset();  
};


form.addEventListener('submit', createStudent);

const cardsOnVol = (array) => {
  let domString = "";
  for (const removed of array) {
    domString += `<div class="card" style="width: 18rem;" id="voldemortCard">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${removed.name}</h5>
    </div>
  </div>`;
  }
  renderToDom("#volCard", domString);
};

const expelBtn = document.querySelector("#hogwartsCard");

expelBtn.addEventListener('click', (e) => {
  


  if (e.target.id.includes("expel")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex(e => e.id === Number(id));
    const removed = students.splice(index, 1); 
    volStudent.push(removed[0]);
    cardsOnDom(students);
    cardsOnVol(volStudent);
  }
});

const filter = (array, houseType) => {
  const houseArray = [];
  for (const house of array) {
    if (house.house === houseType) {
      houseArray.push(house);
    }
  }
  return houseArray;
}

const showAllBtn = document.querySelector("#allStudentsBtn");
const showGryffindorBtn = document.querySelector("#gryffindorBtn");
const showSlytherinBtn = document.querySelector("#slytherinBtn");
const showHufflepuffBtn = document.querySelector("#hufflepuffBtn");
const showRavenclawBtn = document.querySelector("#ravenclawBtn");









showAllBtn.addEventListener('click', () => {
 
  cardsOnDom(students);
}); 

showGryffindorBtn.addEventListener('click', () => {

  const houseType = filter(students, 'Gryffindor');
  cardsOnDom(houseType);
});

showSlytherinBtn.addEventListener('click', () => {

  const houseType = filter(students, 'Slytherin');
  cardsOnDom(houseType);
});

showHufflepuffBtn.addEventListener('click', () => {
  
  const houseType = filter(students, 'Hufflepuff');
  cardsOnDom(houseType);
});

showRavenclawBtn.addEventListener('click', () => {
  
  const houseType = filter(students, 'Ravenclaw');
  cardsOnDom(houseType);
});

const startApp = () => {
  cardsOnDom(students);
  filterButtons();
}

startApp();
