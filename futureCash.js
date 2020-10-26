
const moment = require('moment')
const fetch = require("node-fetch")

class UnKnowCash {
  constructor(initDate, initCash, investments) {
    const splitDate = initDate.split('/')
    this.initDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
    this.today = moment().format('YYYY-MM-DD')
    // this.today = '2020-10-23'
    this.initCash = initCash
    this.investments = JSON.parse(investments)
    this.oldShares = {}
    this.newCash = {}
  }

  getUrl(id, date) {
    return `https://fintual.cl/api/real_assets/${id}/days?from_date=${date}`
  }

  getSharesFromCash(label, price){
    this.oldShares[label] = (this.initCash * this.investments[label])/price
  }

  getIdFromName(name){
    if (name === 'risky_norris'){
      return 186
    } else if (name === 'moderate_pitt') {
      return 187
    } else {
      return 188
    }
  }

  getFetchPrice(url){
    return fetch(
      url
    ).then(res => res.json()
    ).then(resData => resData.data[0].attributes.price)
  }

  getPrice(el, date){
    const id = this.getIdFromName(el)
    const url = this.getUrl(id, date)
    return this.getFetchPrice(url)
  }

  getCashFromShares(label, price) {
    this.newCash[label] = this.oldShares[label] * price
  }

  getFinalData() {
    console.log(`El monto actual por inversion seria:`)
    // El calculo de final se pudo hacer con reduce
    let final = 0 
    const results = Object.keys(this.newCash).map((el) => {
      console.log(`${el}: ${this.newCash[el]}`)
      final += this.newCash[el]
    })
    console.log(`Monto total: ${final}`)
  }
}

async function main() {
  const arguments = process.argv.slice(2)
  if (arguments.length < 3){
    console.log('Se debe ingresar al menos tres argumentos: fecha_inicial, monto_inicial, inversiones_json')
  } else {
    const maybeFutureCash = new UnKnowCash(arguments[0], arguments[1], arguments[2])
    const oldShares = Object.keys(maybeFutureCash.investments).map(async (el) => {
      const price = await maybeFutureCash.getPrice(el, maybeFutureCash.initDate)
      maybeFutureCash.getSharesFromCash(el, price)
      return price
    })
    Promise.all(oldShares).then(() => {
      const newCash = Object.keys(maybeFutureCash.investments).map(async (el) => {
        const price = await maybeFutureCash.getPrice(el, maybeFutureCash.today)
        maybeFutureCash.getCashFromShares(el, price)
        return price
      })
      Promise.all(newCash).then(() => {
        maybeFutureCash.getFinalData()
      })
    })
  }
}

main()