function log(message) {
    $('#log').append($('<p>').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function error(message) {
    $('#log').append($('<p>').addClass('dark-red').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    });
  }
function countVotes() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    election.countVotes(document.getElementById("candidateId").value, (err, result) => {
        if(err) return alert(err)
 let profileContent = ''
        let name = result[0]
        let candidateId = result[1]
        let symbol = result[2]
        let votes = result[3]

        profileContent += `
           <b> Name</b>: </br>
            <span id="my-name">${name}</span> <br/>
            <b>CandidateId</b>: <span id="my-occupation">${candidateId}</span> <br/>
            <b>Symbol</b>: </br>
            <span id="my-bio">${symbol}</span> <br/>
            <b>Votes</b>:</br> 
            <span id="my-bio">${votes}</span> <br/>`
        document.querySelector('#result').innerHTML = profileContent
    })
}
 const address = "0x250FfeC3fD6Eea15c281470F91f4E063839D5F8D";
  const abi = [{"constant":true,"inputs":[],"name":"getProductsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"sellerSignUp","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"}],"name":"buyProduct","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_purchaseId","type":"uint256"},{"name":"_shipmentDetails","type":"string"}],"name":"updateShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentProductId","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_productName","type":"string"},{"name":"_category","type":"string"},{"name":"_price","type":"uint256"},{"name":"_description","type":"string"}],"name":"addProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"sellers","outputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"},{"name":"bankGuaraantee","type":"uint256"},{"name":"bgPaid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyOrdersLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_purchaseId","type":"uint256"}],"name":"cancelOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getOrdersPlaced","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOrdersPlacedLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentOrderedBy","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_email","type":"string"},{"name":"_deliveryAddress","type":"string"}],"name":"createAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allProducts","outputs":[{"name":"productId","type":"string"},{"name":"productName","type":"string"},{"name":"Category","type":"string"},{"name":"price","type":"uint256"},{"name":"description","type":"string"},{"name":"seller","type":"address"},{"name":"isActive","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_purchaseId","type":"uint256"}],"name":"refund","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentStatus","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"myOrders","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  election = web3.eth.contract(abi).at(address);
  $(function () {
    var election;
    $('#addCandidate').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      election.addCandidate.sendTransaction(document.getElementById("name").value, document.getElementById("aadharNumber").value, document.getElementById("symbol").value, document.getElementById("standingFrom").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Candidate Registration Succesful.");
        });
      });
    });
    if (typeof(web3) === "undefined") {
      error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
      log("Found injected web3.");
      web3 = new Web3(web3.currentProvider);
      ethereum.enable();
      if (web3.version.network != 3) {
        error("Wrong network detected. Please switch to the Ropsten test network.");
      } else {
        log("Connected to the Ropsten test network.");
        election= web3.eth.contract(abi).at(address);
        }
    }
  });