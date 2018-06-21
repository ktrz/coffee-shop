// const rx = require('rxjs')


function ready(item) {
  console.log(item, 'ready')
}

//
// function heatWater(cb) {
//     setTimeout(() => cb('hot water'), 1000)
// }
// function addBeans(cb) {
//     setTimeout(() => cb('black coffee'), 1000)
// }
// function addMilk(cb) {
//     setTimeout(() => cb('white coffee'), 1000)
// }
//
// let coffee
// const makeCoffee = () => heatWater(hotWater => {
//     ready(hotWater)
//     addBeans(blackCoffee => {
//         ready(blackCoffee)
//         addMilk(whiteCoffee => {
//             ready(whiteCoffee)
//             coffee = whiteCoffee
//         })
//     })
// })

function heatWater() {
  return new Promise(resolve => setTimeout(() =>
    resolve('hot water'), 1000))
}

function addBeans() {
  return new Promise(resolve => setTimeout(() =>
    resolve('black coffee'), 1000))
}

function addMilk() {
  return new Promise(resolve => setTimeout(() =>
    resolve('white coffee'), 1000))
}

const makeCoffee = () => heatWater()
  .then(hotWater => {
    ready(hotWater);
    return addBeans();
  })
  .then(blackCoffee => {
    ready(blackCoffee);
    return addMilk();
  })
  .then(whiteCoffee => {
    ready(whiteCoffee);
    return whiteCoffee;
  });
// const rx = require('rxjs')
// const {delay, switchMap, tap} = rx.operators
// const createDelayedObservable = v => of(v).pipe(delay(1000))
// const heatWater = () => createDelayedObservable('hot water')
// const addBeans = () => createDelayedObservable('black coffee')
// const addMilk = () => createDelayedObservable('white coffee')
//
// const makeCoffee = () => heatWater()
//     .pipe(
//         tap(ready),
//         switchMap(() => addBeans()),
//         tap(ready),
//         switchMap(() => addMilk()),
//         tap(ready)
//     )

makeCoffee()
  .then(ready);
