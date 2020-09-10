const shoppingCart = document.querySelector('#carrito');
const shoppingList = document.querySelector('#lista-carrito tbody');
const emptyCartButton = document.querySelector('#vaciar-carrito');
const courseList = document.querySelector('#lista-cursos');
let shoppingCartItems = [];

loadEventListener();

function loadEventListener() {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    courseList.addEventListener('click', addCourse);

    //Elimina cursos del carrito
    shoppingCart.addEventListener('click', deleteCourse);

    //Vaciar el carrito
    emptyCartButton.addEventListener('click', () =>{
        console.log("Vaciando carrito");
        shoppingCartItems = [];
        cleanCourseList();
    });

}

function deleteCourse(e) {

    if(e.target.classList.contains('borrar-curso')) {
        const courseId = e.target.getAttribute('data-id');
        shoppingCartItems = shoppingCartItems.filter(course => course.id !== courseId);
        showCartContent();

    }
}
function addCourse(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        console.log('Agregando al carrito...');

        const selectedCourse = e.target.parentElement.parentElement;
        readCourseData(selectedCourse);
        showCartContent();
    }
}
// Lee el contenido del HTML al que le damos click y extrae la informacion del curso
function readCourseData(course) {
    //Crear un objeto con el contenido del curso actual
    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        quantity: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const exist = shoppingCartItems.some( course => course.id === infoCourse.id);

    if (exist) {
        //Actualizamos la cantidad
        const courses = shoppingCartItems.map( course => {
            if (course.id === infoCourse.id) {
                course.quantity++;
                return course;
            } else {
                return course;
            }
        });
        shoppingCartItems = [...courses]
    } else {
        //Agrego elementos al Array del carrito
        shoppingCartItems = [...shoppingCartItems, infoCourse];
    }
}

//Muestra el contenido del carrito en el HTML
function showCartContent() {
    //Limpia el HTML
    cleanCourseList();

    //Recorre el carrito y genera el HTML
    shoppingCartItems.forEach(course => {
        const {image, title, price, quantity, id} = course;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${image}" width="100">
        </td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;

        //Agregamos el HTML del carrito al tbody
        shoppingList.appendChild(row);
    });

}
function cleanCourseList() {
    shoppingList.innerHTML = '';
    while (shoppingList.firstChild) {
        shoppingList.removeChild(shoppingList.firstChild);
    }
}
