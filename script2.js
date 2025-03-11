document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const query = document.getElementById('searchQuery').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML=" ";

    try {
    const response = await fetch(`/hospitalapi?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if(data.items && data.items.length > 0){
            data.items.forEach(item=>{
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `<h3> <a href="${item.instit_nm}"
                target="_blank">${item.instit_kind}</a></h3>
                            <p>Type: ${item.instit_kind}</p>
                            <p>Address: ${item.street_nm_addr}</p>
                            <p>Phone: ${item.tel}</p>
                            <p>Operating Hours:</p>
                            <ul>
                                <li>Monday: ${item.Monday}</li>
                                <li>Tuesday: ${item.Tuesday}</li>
                                <li>Wednesday: ${item.Wednesday}</li>
                                <li>Thursday: ${item.Thursday}</li>
                                <li>Friday: ${item.Friday}</li>
                                <li>Saturday: ${item.Saturday}</li>
                                <li>Sunday: ${item.Sunday}</li>
                                <li>Holiday: ${item.holiday}</li>
                            </ul>
                        `;
                        resultsDiv.appendChild(resultItem);
                    });
                } else {
                    resultsDiv.innerHTML = 'No results found.';
                }
            } catch (error) {
                console.error('Fetch error:', error);
                resultsDiv.innerHTML = 'An error occurred while fetching the results.';
            }
        });

          