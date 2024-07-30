let main_div = document.createElement('div');
main_div.setAttribute('class', "main_div");
console.log(main_div);
document.body.appendChild(main_div);

fetch('https://jsonplaceholder.typicode.com/photos?_limit=15')
.then((response) => response.json())
.then((result) =>{
    // console.log(result[0].url);
    result.map((value) =>{
        let key = value.url;
        let imgTg = document.createElement('img');
        (imgTg.src = `https://picsum.photos/140/240?random=${key}`);
        main_div.appendChild(imgTg);
    } )
})