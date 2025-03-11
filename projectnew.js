var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function(){
    if(this.readyState === 4) {
        console.log(this.responseText);
        const resultsDiv = document.getElementById('results');
        
        var parsed = JSON.parse(this.responseText);

        parsed.items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item'); 
            resultItem.innerHTML = `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3> <hr>
            <p>${item.description}</p> 
        `;  
            resultsDiv.appendChild(resultItem);
        });

    }
});

function displayResponse(){
    var query = document.getElementById('searchQuery').value;
    var url = "http://localhost:3000/webapii?query=" + encodeURIComponent(query);

    xhr.open("GET", url);
    xhr.send();
}
