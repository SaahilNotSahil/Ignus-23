$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
    // console.log("hye");
		$(this).toggleClass('open');
    $(".res-nav").toggleClass("opened");
	});
});

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let slug = params.ref;

function getEventDetails(){
	fetch('https://api.ignus.co.in/api/events/' + slug + '/', {
		method: 'GET',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		}
	})
	.then(function(response){
		return response.json()
	})
	.then(function(data){
		console.log(data);
		createEventDetails(data);
	})
	.catch(error => console.error('Error:', error));
}

function createEventDetails(data){
	desDiv = document.getElementById("desDiv");
	desDivMob = document.getElementById("desDivMob");
	evCount = data.events.length;
	desDivHtml = "";
	desDivMobHtml = "";
	for(i=0; i<evCount; i++){
		if(i%2 == 0){
			desDivHtml += `
			<section class="details">
				<div class="content">
					<h1>${data.events[i].name}</h1>
			`;
			if(data.events[i].team_event){
				desDivHtml += `
					<span> Team Size: ${data.events[i].min_team_size}-${data.events[i].max_team_size} </span>
				`;
			}
			desDivHtml += `
					${data.events[i].about}
				</div>
				<img src="./../static/event-details/dance.svg" alt="dance">
			</section>
			`;
		}
		else{
			desDivHtml += `
			<section class="details">
				<img src="./../static/event-details/dance.svg" alt="dance">
				<div class="content">
					<h1>${data.events[i].name}</h1>
			`;
			if(data.events[i].team_event){
				desDivHtml += `
					<span> Team Size: ${data.events[i].min_team_size}-${data.events[i].max_team_size} </span>
				`;
			}
			desDivHtml += `
					${data.events[i].about}
				</div>
			</section>
			`;
		}
		desDivMobHtml += `
		<section class="details">
			<img src="./../static/event-details/dance.svg" alt="dance">
			<div class="content">
				<h1>${data.events[i].name}</h1>
		`;
		if(data.events[i].team_event){
			desDivMobHtml += `
				<span> Team Size: ${data.events[i].min_team_size}-${data.events[i].max_team_size} </span>
			`;
		}
		desDivMobHtml += `
				${data.events[i].about}
			</div>
		</section>
		`;
	}
	desDiv.innerHTML = desDivHtml;
	desDivMob.innerHTML = desDivMobHtml;

	pdfEmbed = document.getElementById("pdfEmbed");
	pdfEmbed.setAttribute("src", data.pdf);

	evOrg = document.getElementById("evOrg");
	orgCount = data.get_organizers.length;
	evOrgHtml = "<h1>Event Organisers</h1> <br>";
	for(i=0; i<orgCount; i++){
		evOrgHtml += `
        <h3>${data.get_organizers[i].name}</h3> 
        <span class="contact">${data.get_organizers[i].phone}</span> <br>
        <span class="contact"><a href="mailto:${data.get_organizers[i].email}" style="text-decoration: none; color: black;">${data.get_organizers[i].email}</a></span> <br><br>
		`;
	}
	evOrg.innerHTML = evOrgHtml;
}