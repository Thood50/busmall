'use strict';

var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');
var navProduct = document.getElementById('product');
var divOne = document.getElementById('divOne');
var productDiv = document.getElementById('productDiv');
var home = document.getElementById('home');
var navChart = document.getElementById('navChart');
var setItems = localStorage.getItem('items');
var totalClicks = 0;

Item.allItems = [];
var possibleImg = [imgOne, imgTwo, imgThree];
var lastImg = [];
var randomNumbers = [];

function Item(filepath, itemName) {
  this.imgSource = filepath;
  this.itemName = itemName;
  this.clickCount = 0;
  this.itemDisplay = 0;
  Item.allItems.push(this);
}

function addLocalStorage () {
  if(setItems){
    Item.allItems = JSON.parse(setItems);

  }else{

    addItems();
    localStorage.setItem('items', JSON.stringify(Item.allItems));

  }
}

function addItems () {
  new Item('../img/bag.jpg', 'bag');
  new Item('../img/banana.jpg', 'banana');
  new Item('../img/bathroom.jpg', 'bathroom');
  new Item('../img/boots.jpg', 'boots');
  new Item('../img/breakfast.jpg', 'breakfast');
  new Item('../img/bubblegum.jpg', 'bubblegum');
  new Item('../img/chair.jpg', 'chair');
  new Item('../img/cthulhu.jpg', 'cthulhu');
  new Item('../img/dog-duck.jpg', 'dog-duck');
  new Item('../img/dragon.jpg', 'dragon');
  new Item('../img/pen.jpg', 'pen');
  new Item('../img/pet-sweep.jpg', 'pet-sweep');
  new Item('../img/scissors.jpg', 'scissors');
  new Item('../img/shark.jpg', 'shark');
  new Item('../img/sweep.png', 'sweep');
  new Item('../img/tauntaun.jpg', 'tauntaun');
  new Item('../img/unicorn.jpg', 'unicorn');
  new Item('../img/usb.gif', 'usb');
  new Item('../img/water-can.jpg', 'water-can');
  new Item('../img/wine-glass.jpg', 'wine-glass');
}

function randomNumber() {
  for(var i = 0; i < possibleImg.length; i++) {
    var randomNumberGenerator = Math.floor(Math.random() * Item.allItems.length);
    randomNumbers.push(randomNumberGenerator);

    for(var k = 0; k < possibleImg.length; k++) {
      if ((randomNumbers.length === 2 && randomNumbers[i] === randomNumbers[0]) || (randomNumbers.length === 3 && (randomNumbers[2] === randomNumbers[0] || randomNumbers[2] === randomNumbers[1])) ||(randomNumbers[i] === lastImg[k])) {
        randomNumbers = [];
        randomNumber();
        return;
      }
    }
  }
  randomItems();
}

function randomItems() {
  for(var i = 0; i < possibleImg.length; i++) {
    possibleImg[i].src = Item.allItems[randomNumbers[i]].imgSource;
    possibleImg[i].alt = Item.allItems[randomNumbers[i]].itemName;
    Item.allItems[randomNumbers[i]].itemDisplay++;
  }
  lastImg = [];
  lastImg = randomNumbers;
  randomNumbers = [];
}

function eventListener() {
  for(var i = 0; i < possibleImg.length; i++) {
    possibleImg[i].addEventListener('click', newProducts);
    possibleImg[i].addEventListener('click', newProducts);
    possibleImg[i].addEventListener('click', newProducts);
  }
  navProduct.addEventListener('click', summarizeData);
  home.addEventListener('click', pageRefresh);
  navChart.addEventListener('click', showChart);
}

function newProducts(event) {

  var imageName = event.target.alt;
  for( var i=0; i<Item.allItems.length; i++) {
    if(Item.allItems[i].itemName === imageName ) {
      Item.allItems[i].clickCount++;
      break;
    }
  }

  totalClicks++;

  if (totalClicks < 25) {
    randomNumber();
  } else {
    removeListener();
    document.getElementById('divOne').style.display = 'none';
    showChart();
    localStorage.setItem('items', JSON.stringify(Item.allItems));
    consoleLog();
  }
}



function removeListener() {
  for(var i = 0; i < possibleImg.length; i++) {
    possibleImg[i].removeEventListener('click', newProducts);
    possibleImg[i].removeEventListener('click', newProducts);
    possibleImg[i].removeEventListener('click', newProducts);
  }
}

function summarizeData() {
  document.getElementById('divOne').style.display = 'none';
  
  var ul = document.createElement('ul');

  for(var i=0; i<Item.allItems.length; i++) {
    var li = document.createElement('li');
    li.textContent = `
       ${Item.allItems[i].itemName}
       Views: ${Item.allItems[i].itemDisplay}
       votes: ${Item.allItems[i].clickCount}
    `;
    ul.appendChild(li);
  }
  productDiv.appendChild(ul);
}

function pageRefresh() {
  location.reload();
}

function showChart() {
  document.getElementById('divOne').style.display = 'none';

  var labels = [];
  var voteData = [];
  var colors = [];

  for (var i = 0; i < Item.allItems.length; i++) {
    Item.allItems[i].pct = Math.round( (Item.allItems[i].clickCount / Item.allItems[i].itemDisplay) * 100);
  }

  Item.allItems.sort(function(a, b) {
    return b.pct - a.pct;
  });

  for (i = 0; i < Item.allItems.length; i++) {
    labels.push(Item.allItems[i].itemName);
    voteData.push(Item.allItems[i].pct);
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }

  var context = document.getElementById('chart').getContext('2d');
  var newChart = new Chart(context, { // eslint-disable-line
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Popularity (% of clicks)',
          data: voteData,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            ticks: {
              fontSize: 40,
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontSize: 40,
            },
          },
        ],
      },
    },
  });
}

function consoleLog () {
  for(var i = 0; i < Item.allItems.length; i++) {
    console.log('Item ' + Item.allItems[i].itemName);
    console.log('Click Count ' + Item.allItems[i].clickCount);
    console.log('Times Displayed ' + Item.allItems[i].itemDisplay);
  }
}

addLocalStorage();
randomNumber();
eventListener();
