var api_host = "http://localhost:5000"
var timer_start;
var timer_stop;
var endpoints = {
    general: {
        url: '/',
        method: 'GET',
        auth:false
    },
    graphic: {
        url: '/daily',
        method: 'GET',
        auth:false
    },
    country: {
        url: '/country',
        method: 'POST',
        auth:false
    },
    states: {
        url: '/states',
        method: 'GET',
        auth:false
    }

}

async function callAPI(service, parametros) {
    timer_start = new Date();
    let headers = {};
    if (endpoints[service] && endpoints[service].auth) {
        token = String(sessionStorage.getItem("token"));
        headers = { Authorization: `Bearer ${token}` };
    }
    let url = endpoints[service].url;
    if (endpoints[service].get_params) {
        url = url + parametros.get_params;
    }
    delete parametros.get_params;
    let response = await $.ajax({
        url: api_host + url,
        headers: headers,
        type: endpoints[service].method,
        async: true,
        timeout: 30000,
        data: JSON.stringify(parametros),
        contentType: 'application/json',
        success: function (response) {
            if (response.status === "fail") {
                console.log("erro: ", response);
                return {};
            } else {
                return response;
            }
        },
        error: function (error) {
            console.log("erro: ", error);
        }
    });
    print_elapsed_time(service);
    return response;
}


async function print_elapsed_time(req) {
    timer_stop = new Date();
    let elapsed = (timer_stop - timer_start) / 1000;

    console.log('Tempo do request: ' + req + ' -> ' + elapsed + 's');
}
