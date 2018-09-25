'use strict';

var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');
var totalClicks = 0;

Item.allItems = [];

function Item(filepath, itemName) {
  this.imgSource = filepath;
  this.itemName = itemName;
  this.clickCount = 0;
  this.itemDisplay = 0;
  Item.allItems.push(this);
}

function randomItem() {
  var randomNumber = Math.floor(Math.random() * Item.allItems.length);
  imgOne.src = Item.allItems[randomNumber].imgSource;
  imgOne.alt = Item.allItems[randomNumber].itemName;
  randomNumber = Math.floor(Math.random() * Item.allItems.length);
  imgTwo.src = Item.allItems[randomNumber].imgSource;
  imgTwo.alt = Item.allItems[randomNumber].itemName;
  randomNumber = Math.floor(Math.random() * Item.allItems.length);
  imgThree.src = Item.allItems[randomNumber].imgSource;
  imgThree.alt = Item.allItems[randomNumber].itemName;
}

function newProducts(event) {
  event.preventDefault();

  this.clickCount++;
  totalClicks++;

  if (totalClicks < 25) {
    randomItem();
  } else {
    console.log(totalClicks);
    for (var i = 0; i < Item.allItems.length; i++) {
      console.log(Item.allItems[i].clickCount);
      console.log(Item.allItems[i].itemDisplay);
    }
  }
}

imgOne.addEventListener('click', newProducts);
imgTwo.addEventListener('click', newProducts);
imgThree.addEventListener('click', newProducts);

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
new Item('../img/sweep.jpg', 'sweep');
new Item('../img/tauntaun.jpg', 'tauntaun');
new Item('../img/unicorn.jpg', 'unicorn');
new Item('../img/usb.gif', 'usb');
new Item('../img/water-can.jpg', 'water-can');
new Item('../img/wine-glass.jpg', 'wine-glass');


randomItem();
