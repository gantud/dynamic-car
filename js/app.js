//Genesis Perez Perez

//variables
const cart = document.querySelector('#cart');
const courseList = document.querySelector('#course-list');
const cartContainer = document.querySelector('#cart-list tbody');
const emptyCartbtn = document.querySelector('#empty-cart');
let cartArticles = [];

loadEventListener();
function loadEventListener(){
    //when you add a course
    courseList.addEventListener('click', addCourse);
    //when you erase a course
    cart.addEventListener('click', eraseCourse);
    //empty the cart
    emptyCartbtn.addEventListener('click', ()=>{
        cartArticles=[] //reset the array
        cleanHtml();
    })
};

//#####functions#####
function addCourse(e){
    e.preventDefault();
    if(e.target.classList.contains('add-cart')){
        const courseSelected = e.target.parentElement.parentElement;
        readDataCourse(courseSelected);
    }
}

function eraseCourse(e){
    if(e.target.classList.contains('delete-course')){
        const idCourse = e.target.getAttribute('data-id');
        //eliminate from the array
        cartArticles = cartArticles.filter(course => course.idCourse !== idCourse);
        console.log(cartArticles);
    }
    htmlCart()
}

//read the html content
function readDataCourse(course){
    // console.log(course)

    //create an object
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        idCourse: course.querySelector('.button').getAttribute('data-id'),
        quantity: 1
    }

    //check for duplicates courses
    const exists = cartArticles.some(course => course.idCourse === courseInfo.idCourse);
    if(exists){
        const courses = cartArticles.map( course =>{
            if(course.idCourse === courseInfo.idCourse){
                course.quantity++;
                return course;
            }else{
                return course;
            }
        } );
        cartArticles = [...courses];
    }else{
        //add element to the cart array
        cartArticles= [...cartArticles,courseInfo];
    }
        


    
    console.log(cartArticles)
    htmlCart();
}

//show cart in grid
function htmlCart(){
    //clean html
    cleanHtml();
    cartArticles.forEach( (course)=>{
            const row = document.createElement('tr');
            const {image,title,price,quantity,idCourse} = course;
            row.innerHTML=`
            <td>
                <img src="${image}" width="100">
            </td>
            <td>
                ${title}
            </td>
            <td>
                ${price}
            </td>
            <td>
                ${quantity}
            </td>
            <td>
                <a href="#" class="delete-course" data-id="${idCourse}">x</a>
            </td>
            `
            //add html cart inside of tbody
            cartContainer.appendChild(row)
    } )
}

//erase courses within tbody
function cleanHtml(){
    // cartContainer.innerHTML=''
    while(cartContainer.firstChild){
        cartContainer.removeChild(cartContainer.firstChild)
    }
}