const url = "https://api.github.com/users/Bumpkin-Pi/repos"
async function main(){
	let info;
	let shown_repos = []
	await fetch(url)
	   .then( r => r.text() )
	   .then( t => {
	   	info = JSON.parse(t)
	   })
	// console.log(info)
	for (repo in info){
		if (!info[repo].archived && info[repo].name != "Bumpkin-Pi" && info[repo].name != "Bumpkin-Pi.github.io"){
			// console.log(info[repo].html_url)
			let html = await fetch(info[repo].html_url, {
				mode: "no-cors",
				method: "post",
				headers: {
					// "Access-Control-Allow-Origin": "https://holly.ddns.net/"
				}
			})
			   .then( r => r.text() )
			   .then( t => {
			   	return t;
			})
			let image = html.slice(html.lastIndexOf("<meta property=\"og:image\" content=\"")).split("\" />")[0].split("content=\"")[1]
			console.log(html + " ----")
			// <meta property="og:image" content="https://avatars.githubusercontent.com/u/74017165?s=400&amp;v=4">
			console.log(info[repo])
			let repo_div = document.createElement("div")
			repo_div.innerHTML = `
			<a href="${info[repo].html_url}">
							<div class="repo">
							  <div class="image-container">
							    <img src="${image}">
							  </div>
							  <h1>${info[repo].name}</h1>
							  <h2>${String(info[repo].description).replace("null", "")}</h2>
							</div></a>
							`
			document.body.appendChild(repo_div)
		}
	}
}

main()
