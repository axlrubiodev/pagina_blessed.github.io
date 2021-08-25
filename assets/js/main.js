// DOM Scripting
// Constantes del documento
const contenedor_cabecera = document.querySelector("header");
const boton_menu_movil = document.querySelector(".contenedor_boton_menu");
const opciones_menu_movil = document.querySelector(".opciones_menu");
const boton_cerrar_movil = document.querySelector(".close");
const navegacion_hidde = document.querySelector(".nav_hidden");
const contenedor_edif = document.querySelector(".contenedor_edificios");
const botonera_servicios = document.querySelectorAll("#servicios .izq ul li");
const servicios_carrusel = document.querySelector(".der>ul");
const carrusel_marcas = document.querySelectorAll("#marcas .visor");
let contador_1 = 0;





// Variables extras
let alto_nav_oculto = document.body.children[0].clientHeight;
let textos_servicios = {}
let contador = 0;


botonera_servicios.forEach((valor, index) => {
    textos_servicios[index] = valor.textContent;
});




// Estilo por defecto
navegacion_hidde.style.height = `${alto_nav_oculto}px`;

servicios_carrusel.style.width = `${botonera_servicios.length * 100}%`;



// Funciones
const cerrar_menu_movil = () => {
    opciones_menu_movil.classList.remove("mostrar_opciones_menu");
};


const mostrar_menu_movil = () => {
    opciones_menu_movil.classList.add("mostrar_opciones_menu");
};


const cambiar_vista_servicio = (e) => {
    const elemento_seleccionado = e.target;
    
    eliminar_marcado();

    elemento_seleccionado.classList.add('active');
    let elemento = elemento_seleccionado.textContent.toLowerCase();
    let diapositiva_servicios;


    for(let i = 0; i < Object.keys(textos_servicios).length; i++){
        if(elemento === textos_servicios[i].toLowerCase()){
            diapositiva_servicios = i;
        }
    }

    servicios_carrusel.style.marginLeft = `-${diapositiva_servicios * 100}%`;

};


const eliminar_marcado = () => {
    for(let i = 0; i < botonera_servicios.length; i++){
        botonera_servicios[i].classList.remove('active');
    }
};



const cambiar_vista_servicio_automatico = (posicion) => {
    servicios_carrusel.style.marginLeft = `-${posicion * 100}%`
};


const mover_servicios = () => {
    if(botonera_servicios[0].className == 'active'){

        botonera_servicios[0].classList.remove('active');
        botonera_servicios[1].classList.add('active');
        botonera_servicios[2].classList.remove('active');
        cambiar_vista_servicio_automatico(1);

        
    }else if(botonera_servicios[1].className == 'active'){
        
        botonera_servicios[1].classList.remove('active');
        botonera_servicios[2].classList.add('active');
        botonera_servicios[0].classList.remove('active');
        cambiar_vista_servicio_automatico(2);
        
    }else if(botonera_servicios[2].className == 'active'){
        
        botonera_servicios[2].classList.remove('active');
        botonera_servicios[0].classList.add('active');
        botonera_servicios[1].classList.remove('active');
        cambiar_vista_servicio_automatico(0);

    }
};



const ejecutar_window = () => {
    
    let resolucion = screen.width;
    const carrusel = carrusel_marcas[0].children[0];
    

    if(contador_1 == 0){
        carrusel.style.marginLeft = "-100%";
        contador_1 += 1;

    }else if(contador_1 == 1){
        carrusel.style.marginLeft = "-200%";
        contador_1 += 2;

    }else if(contador_1 == 2){
        carrusel.style.marginLeft = "-300%";
        contador_1 += 3;

    }else if(contador_1 == 3){
        carrusel.style.marginLeft = "0%";
        contador_1 = 0;
    }
};





// Eventos
boton_menu_movil.addEventListener('click', mostrar_menu_movil);
boton_cerrar_movil.addEventListener('click', cerrar_menu_movil);

for(let i = 0; i < botonera_servicios.length; i++){
    botonera_servicios[i].addEventListener('click', cambiar_vista_servicio);
}




// escalar_cuadros();
setInterval(mover_servicios, 20000);
setInterval(ejecutar_window, 10000);

window.addEventListener('resize', ejecutar_window);