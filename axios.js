let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 
axios.get('http://www.euronews.com/')
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html); 
            var arr = [];
            $('.c-justin__ps.js-justin__ps a').each(function(i, elem) {
                arr.push({
                    link:$(this).attr('href'),
                    title:$("p",this).text(),
                    category:$("span", this).text().trim(),
                    time:$(".time.small-2", this).text()
                });  
            });
            console.log(arr);
            var getAdd = function(){
                const table = document.getElementById('table');
                for(var i=0; i<arr.length; i++){
                const {title, category, time, link} = arr[i];
                console.log(arr[i]);
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${i+1}</td><td>${title}</td><td>${category}</td><td>${time}</td><td>${link}</td>`;
                table.appendChild(tr);
                }}
                getAdd();
    }
}, (error) => console.log(err) );

