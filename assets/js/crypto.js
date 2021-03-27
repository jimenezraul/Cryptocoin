// Get the ids to display the crypto
var master_head = document.getElementsByClassName('master-head')[0];
var crypto_price = document.getElementById('btc-price');
var crypto_img = document.getElementById('crypto_img');
var crypto_name = document.getElementById('crypto-name');

function sock(s) {
    return s
}
var soc
function start(c, n = 0) {
    // Create the socket
    var socket = new WebSocket("wss://stream.binance.com:9443/ws/" + c + "usdt@aggTrade");
    soc = sock(socket);

    // When socket receive a message this function will execute
    socket.onmessage = function(event){
        var list_of_cryptos = crypto_list
        
        var messageObject = JSON.parse(event.data);
        
        if (messageObject.p > 1){
            n = parseFloat(messageObject.p).toFixed(2)
                crypto_price.innerHTML = "$" + n
            
        }else{
            crypto_price.innerHTML = '$ ' + messageObject.p.substring(0, messageObject.p.length - 2);
        }
        
        for (var i = 0; i < list_of_cryptos.length; i++){
            if (messageObject.s.substring(0, messageObject.s.length - 4).includes(list_of_cryptos[i])){
                crypto_img.src = 'assets/img/' + list_of_cryptos[i].toLowerCase() + '.svg'
                break;
            }
        }
        
        for (var i = 0; i < data.length; i++){
            if (data[i].symbol.includes(messageObject.s.substring(0, messageObject.s.length - 4))) {
                if (messageObject.s.substring(0, messageObject.s.length - 4).length == data[i].symbol.length) {
                    crypto_name.innerHTML = data[i].name
                    master_head.style.background = "linear-gradient(0deg,#ee0979," + data[i].color + ")";
                    break; 
                }
                
            }
        }
        
    }
}

function create_divs(id, name) {
    var coin = document.getElementById('coin');
    var section = document.createElement('section');
    section.id = id;
    var container = document.createElement('div');
    container.className = "container"
    var row = document.createElement('div');
    row.classList.add('row', 'justify-content-center', 'align-items-center')
    var col_12 = document.createElement('div');
    col_12.classList.add("col-12", "border-bottom", "pt-2", "pb-2", "d-flex", 'align-items-center');
    var col_img = document.createElement('div');
    col_img.className = "col-3"
    var col_name = document.createElement('div');
    col_name.classList.add('col-5', 'name', 'd-flex', 'align-items-center')
    var h5 = document.createElement('h5');
    h5.innerHTML = name
    var col_search = document.createElement('div');
    col_search.classList.add("col-4");
    var button = document.createElement('button');
    button.innerHTML = "Get Info";
    button.classList.add("button", 'btn', 'btn-primary')
    button.value = id;
    col_search.appendChild(button);
    // col_search.onclick = get_crypto_info("btc");
    col_name.appendChild(h5);
    var img = document.createElement('img');
    img.src = 'assets/img/' + id.toLowerCase() + '.svg';
    img.className = "parent-element"
    col_img.appendChild(img);
    col_12.appendChild(col_img);
    col_12.appendChild(col_name);
    col_12.appendChild(col_search);
    row.appendChild(col_12);
    container.appendChild(row);
    section.appendChild(container);
    coin.appendChild(section);
}


for (var i = 0; i < crypto_list.length; i++){
    if (document.getElementById(crypto_list[i]) == null) {
        for (var x = 0; x < data.length; x++){
            if (crypto_list[i] == data[x].symbol) {
                cryptoName = data[x].name
                create_divs(crypto_list[i], cryptoName)
                break;
            }
        }
        
    } else {
        section = document.getElementById(crypto_list[i]);
        cryp_name = section.getElementsByClassName('name')[0];
    }
}


button = document.getElementsByClassName('button')
for (var i = 0; i < button.length; i++){
    button[i].addEventListener('click', function (event) {
        if (soc) {
            soc.close();
        }
        start(event.target.value.toLowerCase());
    });
}

function search() {
    let input, filter, textValue, i
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    let section = document.getElementsByTagName('section');
    for (i = 0; i < section.length; i++){
        let name = section[i].getElementsByClassName('name')[0].getElementsByTagName('h5')[0].innerHTML;
        console.log(name.toUpperCase().indexOf(filter))
        if (name.toUpperCase().indexOf(filter) > -1) {
            section[i].style.display = "";
        } else {
            section[i].style.display = "none";
        }
    }
}

start("btc");