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
 const address = "0xb8fce693a1701f7c32afb14b1019470b3b15e1a8";
 const abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateListing","outputs":[{"name":"name","type":"string"},{"name":"candidateId","type":"uint256"},{"name":"adharnumber","type":"string"},{"name":"symbol","type":"string"},{"name":"standingFrom","type":"string"},{"name":"isRegistered","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_candidateId","type":"uint256"}],"name":"countVotes","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_adharNumber","type":"string"},{"name":"_symbol","type":"string"},{"name":"_standingFrom","type":"string"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"string"}],"name":"RegisteredCandidates","outputs":[{"name":"name","type":"string"},{"name":"candidateId","type":"uint256"},{"name":"adharnumber","type":"string"},{"name":"symbol","type":"string"},{"name":"standingFrom","type":"string"},{"name":"isRegistered","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"candidatesLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"string"}],"name":"voterIds","outputs":[{"name":"isVoted","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"isVoted","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_adharNumber","type":"string"},{"name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
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
