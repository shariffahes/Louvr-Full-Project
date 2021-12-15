//track the number of loaded exhibitions to use it in the skip when getting from database.
var currentLoaded = 4;

//when load more button is pressed, perform the following
const onLoadMoreClick = () => {
    const xhttp = new XMLHttpRequest();
    //prepare the request.
    //we will send the current number of loaded exhibitions to the exhibition controller
    //through the url. 
    xhttp.open("GET", `http://localhost:8081/exhibition?loaded=${currentLoaded}`);

    //when you get response, execute this method
    xhttp.onload = () => {
        //parse the response as json.
        const exhibitions = JSON.parse(xhttp.response);
        //this will be used to append the html.
        let html = "";
        //if we are not getting more exhibitions then hide the load more button.
        if(exhibitions.length == 0 ) {
            document.getElementById("loadMore").style.display = "none";
        };
        //for each exhibition manipulate the book html page to add a new exhibition
        //division.
        exhibitions.forEach(exhibition => {
            //format the dates
            const start = new Date(exhibition.startDate).toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' });
            const end = new Date(exhibition.endDate).toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' });
            //the url that will be used as href for the book button
            const ref = `http://localhost:8081/booking/${exhibition._id}`;
            //create and append the html.
            html += htmlValue(exhibition, start, end,ref);
        });
        //insert the html that includes all new exhibtion divisions.
        document.getElementById("exhibitions-list").innerHTML += html;
    }
    //increase the number of loaded exhibitions.
    currentLoaded += 4;
    //send the request.
    xhttp.send();
};

const htmlValue = (data, startFormattedDate, endFormattedDate,ref) => `
<div class="grid-item" style="background-image: url(${data.largePreview}); ">
    <h5 class="title" >${data.title}</h5 >
          <input value="Book Now" type="button" class="button" onclick="location.href='${ref}';"/>
          <div class="details">
            <p class="subtitle">${startFormattedDate}  -
              ${endFormattedDate}
            </p>
          </div>
        </div >`;

