// x-api-key '4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd'

const api = axios.create({
	baseURL: 'https://api.thedogapi.com/v1/' 
});
api.defaults.headers.common['X-API-KEY'] = '4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd'

const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=2&order=DESC'
const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&order=DESC'
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=26&api_key=4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd'
const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?limit=26&api_key=4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd`
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'


const spanError = document.getElementById('DogError');

async function randomPerros(){
	const res = await fetch(API_URL_RANDOM)
	const data = await res.json()

	console.log(data)

	if (res.status !== 200) {
		spanError.innerText = "Hubo un error: " + res.status
	} else {

	const img1 = document.getElementById('img1')
	const img2 = document.getElementById('img2')
	const btn1 = document.getElementById('btn1')
	const btn2 = document.getElementById('btn2')

	img1.src = data[0].url;
	img2.src = data[1].url;

	btn1.onclick = () => saveFavorites(data[0].id);
	btn2.onclick = () => saveFavorites(data[1].id);
	}
}

// favorites

async function favPerros() {
	const res = await fetch(API_URL_FAVORITES, {
		method: 'GET',
		headers: {
		 'X-API-KEY': '4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd',
		},
	});
	const data = await res.json();
	console.log('Favorito')
	console.log(data)

	if (res.status !== 200) {
		spanError.innerText = "Hubo un error: " + res.status + data.message;
	} else {
		const section = document.getElementById('fvritesdoggos');
		section.innerHTML = "";
		const h2 = document.createElement('h2');
		const h2Text = document.createTextNode("Fav Doggos");
		h2.appendChild(h2Text);
		section.appendChild(h2);

		data.forEach(doggo => {
			const article = document.createElement('article');
			const img = document.createElement('img');
			const btn = document.createElement('button');
			const btnText = document.createTextNode('Sacar de favoritos');

			img.src = doggo.image.url;
			btn.appendChild(btnText);
			btn.onclick = () => deleteFavorite(doggo.id);
			article.appendChild(img);
			article.appendChild(btn);
			section.appendChild(article);

			
		})
	}

}

async function saveFavorites(id) {
	const {data, status} = await api.post('/favourites', {
		image_id: id,
	})

	// const res = await fetch(API_URL_FAVORITES, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'X-API-KEY': '4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd',
	// 	},
	// 	body: JSON.stringify( {
	// 		image_id: id
	// 	}),
	// });
	// const data = await res.json();

	if (status !== 200) {
		spanError.innerText = "Hubo un error: " + status + data.message;
	} else {
		favPerros()
	}
}

async function deleteFavorite(id) {
	const res = await fetch(API_URL_FAVORITES_DELETE(id), {
		method: 'DELETE',
		headers: {
			'X-API-KEY': '4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd',
		},
	});
	const data = await res.json();

	if (res.status !== 200) {
		spanError.innerText = "Hubo un error: " + res.status + data.message;
	} else {
		deleteFavorite()
		favPerros()
		console.log('borrado')
	}
}

async function subirFoto() {
	const form = document.getElementById('uploadForm')
	const formData = new FormData(form);
	console.log(formData.get('file'))

	const res = await fetch(API_URL_UPLOAD, {
		method: 'POST',
		headers: {
			'X-API-KEY': '4a44f948-bc43-4bd7-bf58-d2d8ce1d8bfd',
		},
		body: formData,
	})
	const data = await res.json();

	if (res.status !== 200) {
		console.log('Hubo un error:' + " " + res.status + " " + data.message); 
	} else {
		console.log('Foto subida')
		console.log({data})
		console.log(data.url)
	}

}

randomPerros();
favPerros();
