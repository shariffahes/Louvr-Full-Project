var currentLoaded = 2;

const onLoadMoreClick = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:8081/exhibition?loaded=${currentLoaded}`);
    xhttp.onload = () => {
        const exhibitions = JSON.parse(xhttp.response);
        let html = "";
        if(exhibitions.length == 0 ) {
            document.getElementById("loadMore").style.display = "none";
        };
        exhibitions.forEach(exhibition => {
            const start = new Date(exhibition.startDate).toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' });
            const end = new Date(exhibition.endDate).toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' });
            html += htmlValue(exhibition, start, end);
        });
        document.getElementById("exhibitions-list").innerHTML += html;
    }
    currentLoaded += 2;
    xhttp.send();
};

const htmlValue = (data, startFormattedDate, endFormattedDate) => `
<div class="grid-item" style="background-image: url(${data.largePreview}); ">
    <h5 class="title" >${data.title}</h5 >
          <input value="Book Now" type="button" class="button" onclick="location.href='/book';"/>
          <div class="details">
            <p class="subtitle">${startFormattedDate}  -
              ${endFormattedDate}
            </p>
          </div>
        </div >`;

