import React, { useState, useEffect } from "react";

import { FaRegTrashAlt } from "react-icons/fa";
import { fFaPlusrom } from "react-icons/fa";

//create your first component
const Home = () => {
	//hooks
	const [inputtareas, settareas] = useState("");
	const [listatareas, setlistareas] = useState([]); // listatareas, arreglo debe inicializarse en un arreglo vacio

	function getDatos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/<tereelena>")
			.then(respuesta => respuesta.json())
			.then(respuesta => setlistareas(respuesta))
			.catch(error => console.log("Ocurre un error...", error)); // repuesta en formato json
	}
	//function actualizarListaApi() {
	//cabecera de la solicitud
	//myHeaders es una variable que instancia una nueva cabecera.

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json"); // a myheader le voy a agregar  informacion con formato json
	//json.stringify es una funcion json que convierte un objeto javascript a string
	//raw es una variable que nos ayudar a almacenar y mandar la informacion a  la api en formato string
	var raw = JSON.stringify(listatareas);

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/<tereelena>",
		requestOptions
	)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));
	//}

	function agregarTareas() {
		/* {
        "label": "Make the bed",
        "done": false
        },
        */ // debe tener este formato objeto
		setlistareas([...listatareas, { label: inputtareas, done: false }]);
		console.log(listatareas);
	}
	function borrarTareas(item) {
		const listaNueva = listatareas.filter(key => key !== item);
		setlistareas(listaNueva);
		console.log(listaNueva);
	}

	useEffect(() => {
		getDatos();
	}, []);

	// funcion que valida que el campo  tarea no este vacio y vaya llenanod el arreglo lista tareas
	const validatetareas = () => {
		// === COMPARACIÓN ESTRICTA
		if (inputtareas === "") {
			console.log("El campo tarea no debe estar vacio");
		} else {
			console.log("perfect!");
		}
	};

	let arreglo = [];

	return (
		<>
			<div className="text-center mt-5">
				<h2>to do (Tere)</h2>
				<input
					type="text"
					placeholder="Tipea la tarea por hacer"
					onChange={e => settareas(e.target.value)}
					value={inputtareas}
				/>
				<button
					className="btn btn-info"
					type="button"
					onClick={() => {
						validatetareas();
						agregarTareas();
						//actualizarListaApi();
					}}>
					<i className="fas fa-plus"></i>
				</button>
				<div className="container ">
					<ul className="list-group list-group-flush ">
						{listatareas.map((item, index) => {
							return (
								<li
									className="list-group-item  d-flex w-100 justify-content-between"
									key={index}>
									{item.label}
									<button
										className="btn btn-light"
										type="button"
										onClick={() => {
											borrarTareas(item);
											console.log("hola");
											//console.log(entrada)
										}}>
										<i className="fas fa-trash-alt"></i>
									</button>
								</li>
							);
						})}
					</ul>
					<p className="fw-light text-right">{listatareas.length}</p>
				</div>
			</div>
		</>
	);
};

export default Home;
