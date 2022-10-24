var ethereumButton = $(".enableEthereumButton");
const sendEthButton = $(".sendEthButton");

var newchainId;
const showAccount = $(".showAccount");
var AccountBalance =$(".AccountBalance");

let accounts = [];

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rpc.ankr.com/polygon_mumbai"
      )
    );
}
//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  )
);


const chainId = web3.utils.toHex(80001);
//Sending Ethereum to an address



function checkMetaMask() {
  const metamaskIcon = $(".mmi");
  const messageLabel = $("#messageLabel");
  if (!window.ethereum) {

    $(metamaskIcon).attr("src", "img/metamaskd.png");
    if (messageLabel)
      $(messageLabel).html("MetaMAsk is not installed pleas install it and reload this page.");
    return false
  }
  else {
    $(metamaskIcon).attr("src", "img/metamask.png");

    if (messageLabel)
      $(messageLabel).html("MetaMAsk is installed.");
  }
}

function createAlert(type, message) {
  var str = '<div class="alert alert-' + type + '" role="alert">' + message + '</div>';
  $("#messageHolder").html(str);
}




ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  //window.location.reload();
  newchainId = _chainId;
}



async function getAccount() {
   newchainId = await ethereum.request({ method: 'eth_chainId' });
  if (newchainId != chainId) {
    createAlert("danger", "you are not connect to chain id network ,please change your metamask network to rinkbey");
    return;
  }

  try {
    accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    console.log(account);
    if (showAccount) {
      $(".showAccount").html(account);
      web3.eth
        .getBalance(account)
        .then(function (result) {
          console.log("Balance : ", web3.utils.fromWei(result, "ether"));
          $(".AccountBalance").html( web3.utils.fromWei(result, "ether"));
        })
        .catch((error) => {
          console.log(error);

          createAlert("warning", "Can't read balance of wallet.");
        });
    }
    else {
     // location.href = "../index.html";
    }
  }
  catch (error) {
    console.log(error);
    //location.href = "../login.html";
  }
}
