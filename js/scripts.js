/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/

//
// Scripts
//


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const zksyncButton = document.querySelector('.connect-zksync');
const metamaskButton = document.getElementById('metamask-button');
let web3;
let zksync
let accounts;


let accountElem = document.querySelector('#account-address');

metamaskButton.addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    await connectMetamask();
  } else {
    console.log('MetaMask not found');
  }
});

zksyncButton.addEventListener('click', async () => {
  try {
    if (typeof window.zksync !== 'undefined') {
      console.log('zkSync SDK is installed!');
      await connectZksync();
    } else {
      console.log('zkSync SDK not found');
    }
  } catch (error) {
    console.error(error);
  }
});

async function connectMetamask() {
  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  console.log('Your address:', account);
  accountElem.innerHTML = account;
  metamaskButton.textContent = 'Is logged';
}

async function connectZksync() {
  // Use o SDK JavaScript do zkSync para conectar-se à carteira do usuário.
  const provider = await zksync.getDefaultProvider('0xb50388c68cef4fadc150674dfb5746d8');
  const syncWallet = await zksync.Wallet.fromEthSigner(window.ethereum, provider);
  console.log('zkSync is connected');
  accounts = await syncWallet.getEthereumAccounts();
  account = accounts[0].address;
  console.log('Your address:', account);
  accountElem.innerHTML = account;
  zksyncButton.textContent = 'Is logged';
}

