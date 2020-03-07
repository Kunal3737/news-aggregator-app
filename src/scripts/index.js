const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=7d51d391c98e4070bf17bd0053cbe9a0';

var searchedNews = document.getElementById("search");
searchedNews.addEventListener("keypress",searchFunction);
function searchFunction(e){
     var searchedNews = document.getElementById("search").value;
     
    if(e.which==13){
        console.log(searchedNews); 
        if(searchedNews != ''){
            var searchUrl = `https://newsapi.org/v2/everything?q=${searchedNews}&apiKey=7d51d391c98e4070bf17bd0053cbe9a0`;
            beforeLoad();
            getNews(searchUrl);
        }   
        else{
            console.log(searchedNews);
            beforeLoad();
            getNews(url); 
        }
    }   
}




var forLoading;
function beforeLoad(){
    document.getElementById("loader-wrapper").style.display="flex";
    document.getElementById("news-section").style.display="none";
    forLoading = setTimeout(afterLoad, 1500);
}

function afterLoad(){
    document.getElementById("loader-wrapper").style.display="none";
    document.getElementById("news-section").style.display="block";
}


async function getNews(url){
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    if (data.totalResults > 0)    {
        var output = '';

        data.articles.forEach(element => {
            output += `<li class="article">
                <img class="article-img" src="${element.urlToImage}" alt="Image" style="width:100%;border-radius:5px;height:20em;padding:15px">
                <h2 class="article-title" style="padding:15px">${element.title}</h2>
                <p class="article-description" style="padding:15px">${element.description}</p>
                <span class="article-author" style="padding:15px">${element.author}</span>`
                output += `<br> <a href=${element.url} class="article-link" target='_blank'><em>Read More At: ${element.source.name}</em></a></li>`;
        });
        output += '';
        document.getElementById("news-articles").innerHTML=output;
    }
    else if(data.totalResults===0){
        var invalidKeyword = document.getElementById("news-section");
        invalidKeyword.innerHTML = "<h3>No article was found based on the search.</h3>";
        invalidKeyword.style.color = "red";
        invalidKeyword.classList.add("not-found");
     }   
}  

getNews(url);



