const btnSearch=document.getElementById("btnSearch");
const btnClear=document.getElementById("btnClear");

let json = {};

function searchDestination() {
            const input = document.getElementById('destination').value.toLowerCase();
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML="";
            console.log(input);

            fetch('travel_recommendation_api.json')
                .then(response => response.json())
                .then(data =>{
                    json=data;
                    console.log(data);
                            if (Object.keys(json).length === 0) {
                                resultDiv.innerHTML = "Data is not loaded yet. Please try again.";
                                return;
                            }
                            if (!input) {
                                alert('Please enter a keyword to search.');
                                return;
                            }
                
                        if(input in json){
                            if(input === "countries") {
                                if (Array.isArray(json["countries"])) {
                                                const countriesArray = json["countries"];
                                                countriesArray.forEach(country => {
                                                            country.cities.forEach(city => {
                                                                    resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
                                                                    resultDiv.innerHTML += `<p><strong>${city.name}</strong></p>`;
                                                                    resultDiv.innerHTML += `<p>${city.description || 'No description available.'}</p>`;
                                                            });
                                                });
                                } else {
                                                resultDiv.innerHTML = 'No countries data available.';
                                }
                            }else if (Array.isArray(json[input])) {
                                const dataArray = json[input];
                                            dataArray.forEach(item =>{
                                                        resultDiv.innerHTML += `<img src="${item.imageUrl}" alt="hjh">`;
                                                        resultDiv.innerHTML += `<p><strong>${item.name}</strong></p>`;
                                                        resultDiv.innerHTML += `<p> ${item.description}</p>`;
                                            });
                            }else {
                                alert('Please enter a keyword to search.');
                            }
                        }else{
                                resultDiv.innerHTML ='Destination not found.';
                        }
                })
                .catch(error =>{
                    console.error('Error:',error);
                    resultDiv.innerHTML ="An Error occurred while fetching data.";
                });

                     
}
btnSearch.addEventListener('click',searchDestination);

btnClear.addEventListener('click', () => {
            document.getElementById('destination').innerHTML='';
    document.getElementById('result').innerHTML = '';
});
