	//Send form data to Google 'autocosts' sheet
	const scriptURL = 'https://script.google.com/macros/s/AKfycbxZj0Uct5N-ZVsJBWipwO2XCuR-qkNKNhc1SN5yfooFxTyVTevHnXNIhRovAE1ZjM7f/exec'
	const form = document.forms['submit-to-google-sheet']

	form.addEventListener('submit', e => {
		e.preventDefault()
		fetch(scriptURL, { method: 'POST', body: new FormData(form)})
		.then(response => console.log('Success!', response))
		.catch(error => console.error('Error!', error.message))
	})
	//End 


	//Retrieve Live Google Sheet Data
	function fetchData() {
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText).feed.entry;
				var contents = document.getElementById('feed').innerHtml;

				//Ensure latest charges appear at top, rather than bottom.-
				data.reverse();
				//Clear feed for data refresh
				const myNode = document.getElementById("feed");
				myNode.innerHTML = '';

				//Place google sheet JSON data into feed element
				for (let i = 0; i < data.length; i++) {

					let date = data[i]["gsx$date"]["$t"];
					//If previous date matches, then this should be the date, and the previous entry's date should be set blank. Figure out l8r 

					let item = data[i]["gsx$item"]["$t"];
					let purchaser = data[i]["gsx$purchaser"]["$t"];
					let cost = data[i]["gsx$cost"]["$t"];
					let exclusions = data[i]["gsx$exclusions"]["$t"];

					document.getElementById("feed").innerHTML +=
					"<tr>" +
					"<td>" +
					date +
					"</td>" +
					"<td>" +
					item +
					"</td>" +
					"<td>" +
					purchaser +
					"</td>" +
					"<td>" +
					cost +
					"</td>" +
					"<td>" +
					exclusions +
					"</td>" +
					"</tr>";
				}
				if(contents != undefined){
					//document.getElementById("feed").innerHTML +=contents;
				}

			}
		};

		xmlhttp.open("GET","https://spreadsheets.google.com/feeds/list/1J3e1Ty8Iih2agrLGCU7dNhRsPrtqGeOS4jdJJXX6r5Y/od6/public/values?alt=json",true);
		xmlhttp.send();
	}

	//Set feed data refesh rate
	setInterval(fetchData, 300);