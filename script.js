var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function(){
            if(this.readyState === 4) {
                console.log("Response received:", this.responseText);
                const resultsDiv = document.getElementById('results');

                if (this.status === 200) {
                    try {
                        var parsed = JSON.parse(this.responseText);

                        if (parsed.items && parsed.items.length > 0) {
                            resultsDiv.innerHTML = ''; // Clear previous results
                            parsed.items.forEach(item => {
                                const resultItem = document.createElement('div');
                                resultItem.classList.add('result-item');
                                resultItem.innerHTML = `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3><hr><p>${item.description}</p>`;
                                resultsDiv.appendChild(resultItem);
                            });
                        } else {
                            resultsDiv.innerHTML = 'No results found.';
                        }
                    } catch (error) {
                        console.error("Error parsing response:", error);
                        resultsDiv.innerHTML = 'An error occurred while processing the response.';
                    }
                } else {
                    console.error("Request failed with status:", this.status);
                    resultsDiv.innerHTML = 'An error occurred while fetching the results.';
                }
            }
        });

        function displayResponse() {
            var query = document.getElementById('searchQuery').value;
            var url = "http://localhost:3000/webapii?query=" + encodeURIComponent(query);

            xhr.open("GET", url);
            xhr.send();
        }