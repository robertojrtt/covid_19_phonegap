async function loadCards(id, endpoints, parametros = false, graphic = false) {
    const container = document.getElementById(id)

    const response = await callAPI(endpoints, parametros)

    if (response && response.status == "success") {

        if (response.data != '') {
            Object.keys(response.data).forEach((key, value) => {
                const el = document.createElement("div");
                el.className = "card";
                el.innerHTML = `<span>${key}</span><p>${response.data[key]}</p>`
                container.append(el);
            });
            if (graphic) {
                loadGraphic(response.data);
            }
        } else {
            container.innerHTML = `<p>Os dados não estão disponíveis no momento</p>`
        }

    } else {
        container.innerHTML = `<p>Os dados não estão disponíveis no momento</p>`

    }
}

async function loadGraphic(data) {

    let ctx = document.getElementById('homeChart');

    let myLineChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['confirmed', 'deaths', 'recovered'],
            datasets: [{
                    label: 'covid-19',
                    backgroundColor: ['#FFB259', '#FF5959', '#4CD97B'],
                    data: [data.confirmed, data.deaths, data.recovered]
                },

            ]
        },
        options: {
            cutoutPercentage: 50,
            animation: {
                animateScale: true
            }
        }

    });

}

async function loadTable(id, endpoints, parametros = false) {
    const container = document.getElementById(id)

    const response = await callAPI(endpoints, parametros)


    if (response && response.status == "success" && response.data != '') {


        let tbody = document.createElement("tbody");


        response.data.forEach(function (estado) {
            let tr = document.createElement('tr');
            for (let fild in estado) {
                let td = document.createElement('td');
                td.innerHTML = estado[fild];
                tr.appendChild(td);
            };
            tbody.appendChild(tr);
        });

        container.appendChild(tbody)


    } else {
        container.innerHTML = `<p>Os dados não estão disponíveis no momento</p>`

    }
}

function openTabs(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}