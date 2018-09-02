        const us = document.getElementById('us');
        const uk = document.getElementById('uk');
        const au = document.getElementById('au');
        const fr = document.getElementById('fr');
        const jp = document.getElementById('jp');
        const cn = document.getElementById('cn');



        function shownews() {
            document.getElementById("newscontent").style.display = "none";
            document.getElementById("loader").style.display = "block";


            //Activate current tab
            const getalllist = document.getElementsByClassName("nav-item");
            if(this != window) {
                for(i=0;i<getalllist.length; i++) {
                    getalllist[i].childNodes[1].className = getalllist[i].childNodes[1].className.replace("active","");
                }          
                this.childNodes[1].className = this.childNodes[1].className + ' ' + 'active';          
            }

            // Fetch news feed
            let url = "https://elanewsfeedserver.herokuapp.com/news/us";
            switch(this.id) {
                case "au":
                    url = "https://elanewsfeedserver.herokuapp.com/news/au";
                    break;
                case "uk":
                    url = "https://elanewsfeedserver.herokuapp.com/news/gb";
                    break;
                case "fr":
                    url = "https://elanewsfeedserver.herokuapp.com/news/fr";
                    break;
                case "jp":
                    url = "https://elanewsfeedserver.herokuapp.com/news/jp";
                    break;
                case "cn":
                    url = "https://elanewsfeedserver.herokuapp.com/news/cn";
                    break;
            }
            fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                const news = result[0].news;    
                const newscontent = document.getElementById('newscontent');
                while (newscontent.firstChild) {
                   newscontent.removeChild(newscontent.firstChild);
                }

                for(let i=0; i < news.length; i++) {
                    const title = news[i]["title"];
                    const description = news[i]["description"];
                    var date = new Date(news[i]["publishedAt"]);
                    let formatteddate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

                    if(title && description) {
                        let newsFeedTemplate = `
                        <div class="col-md-6 card">
                            <div class="row card-header mt-2 mr-1 mb-2 ml-1">
                                <div class="col-md-12">
                                  <div>
                                      <h5 id="title"><a href="${news[i]["url"]}">${title}</a></h5>
                                      <p class="pb-1" id="description">${description}</p>
                                      <span class="font-italic">${formatteddate}</span>                          
                                  </div>        
                                </div>
                            </div>            
                        </div>`;      
                        
                        var temp = document.createElement('div');
                        temp.innerHTML = newsFeedTemplate;
                        while (temp.firstChild) {
                          newscontent.appendChild(temp.firstChild);
                        }                    
                    }     
                }
                document.getElementById("loader").style.display = "none";
                document.getElementById("newscontent").style.display = "flex";
            })
            .catch((err) => {
                console.log("Error is");
                console.log(err);
           })
        }

        us.addEventListener("click", shownews, false);
        uk.addEventListener("click", shownews, false);
        jp.addEventListener("click", shownews, false);
        cn.addEventListener("click", shownews, false);
        fr.addEventListener("click", shownews, false);
        au.addEventListener("click", shownews, false);

