const ethereumButton = document.querySelector(".enableEthereumButton");
const sendEthButton = document.querySelector(".sendEthButton");
const sumLabel = document.getElementById("sumLabel");

const showAccount = document.querySelector(".showAccount");
const AccountBalance = document.querySelector(".AccountBalance");

let accounts = [];

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/62221142f20f4b40a7a2055db10b845e"
    )
  );
}
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/62221142f20f4b40a7a2055db10b845e"
  )
);
//Sending Ethereum to an address

if (sendEthButton) {
  sendEthButton.addEventListener("click", () => {
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: "0xd8C50526A2C28DAB4ACAa3F662827b34B9577d6e",
            value: web3.utils.toHex(web3.utils.toWei(sumLabel.innerText)),
            gasPrice: web3.utils.toHex(21000),
            gas: web3.utils.toHex(21000),
           // chainId: 0x4
          },
        ],
      })
      .then((txHash) => {console.log(txHash)
    createAlert("success","buy is successfully ,  your transaction id :"+txHash);
    })
      .catch((error) => {
        console.log(error.code);
        createAlert("danger","transaction is get error ,  error code :"+error.code+",message : "+error.message);
      });
  });
}


function checkMetaMask()
{
    const metamaskIcon = document.querySelector(".mmi");
    const messageLabel = document.getElementById("messageLabel");
    if (!window.ethereum) {

        metamaskIcon.setAttribute("src" ,"img/metamaskd.png");
        if(messageLabel)
        messageLabel.innerHTML = "MetaMAsk is not installed pleas install it and reload this page.";
        return false
    }
    else
    {
        metamaskIcon.setAttribute("src" ,"img/metamask.png");
        if(messageLabel)
        messageLabel.innerHTML = "MetaMAsk is installed.";
    }
}

function createAlert(type,message)
{
    var str='<div class="alert alert-'+type+'" role="alert">'+message+'</div>';
    $("#messageHolder").html(str);
}

ethereumButton.addEventListener("click", () => {
  getAccount();
});


ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}



async function getAccount() {
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  
if(chainId!=0x4)
{
createAlert("danger","you are not connect to rinkbey network ,please change your metamask network to rinkbey");  
return;
}

    try
    {
  accounts = await ethereum.request({ method: "eth_requestAccounts" });
  

  const account = accounts[0];
  if (showAccount) {
    showAccount.innerHTML = account;
    web3.eth
      .getBalance(account)
      .then(function (result) {
        console.log("Balance : ", web3.utils.fromWei(result, "ether"));
        AccountBalance.innerHTML = web3.utils.fromWei(result, "ether");
      })
      .catch((error) => {
        console.log(error);
       
        createAlert("warning","Can't read balance of wallet.");
      });
  }
  else
  {
      location.href="../index.html";
  }
}
catch(error)
{
 console.log(error);
 location.href="../login.html";
}
}
