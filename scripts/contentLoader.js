function loadVehicles () {
  let list = document.getElementById('artyType')
  list.options.length = 0
  let option = document.createElement("option")
  option.value = "-1"
  option.text = "--------------------"
  list.add(option)

  for (let vehicleId in vehicles) {
    option = document.createElement("option")
    option.value = vehicleId
    option.text = `[${vehicles[vehicleId].mod}] ${vehicles[vehicleId].name}`
    list.add(option)
  }
  list[1].selected = true //TODO: remove
  loadCharges()
}

loadVehicles()

function loadCharges () {
  let artyType = document.getElementById("artyType").value
  let list = document.getElementById('charges')
  list.options.length = 0
  if (artyType === "-1") {
    let option = document.createElement("option")
    option.value = "-1"
    option.text = "--------------------"
    list.add(option)
  } else {
    let vehicleData = vehicles[parseInt(artyType)]

    for (let chargeId in vehicleData.charges) {
      let option = document.createElement("option")
      option.value = chargeId.toString()
      option.text = `Charge: ${chargeId}`
      list.add(option)
    }
    updateFromPreset()
  }
}

async function fillTable (muzzleVelocity, airFriction, minElev, maxElev, highArc = true) {
  console.log("----- START -----")
  let tableData = calculate(muzzleVelocity, airFriction, minElev, maxElev, highArc)
  console.log(tableData)
  let resultTableBody = document.getElementById("ResultTableData")
  resultTableBody.innerHTML = ""

  for (let line of tableData) {
    let tr = document.createElement("tr")
    const tableHeaders = ['range', 'elevation', 'heightElevation',
      'heightTimeDelta', 'timeOfFlight', 'crosswindDeg', 'headwindMeters',
      'tailWindMeters', 'tempDec', 'tempInc', 'airDensDec', 'airDensInc']
    for (let i = 0; i < tableHeaders.length; i++) {
      let td = document.createElement("td")
      let textNode = document.createTextNode(line[i])
      td.appendChild(textNode)
      tr.appendChild(td)
    }
    resultTableBody.appendChild(tr)
  }
  console.log("----- DONE -----")
}

function updateFromPreset () {
  let artyType = document.getElementById("artyType").value
  let chargeId = document.getElementById("charges").value
  let airResistanceEnabled = document.getElementById("airResistanceEnabled").checked

  let vehicleData = vehicles[parseInt(artyType)]
  let muzzleVelocity = vehicleData.initSpeed * vehicleData.charges[parseInt(chargeId)]
  let airFriction = airResistanceEnabled ? vehicleData.airFrictionIfUsed : 0.0

  fillTable(muzzleVelocity, airFriction, vehicleData.elevMin, vehicleData.elevMax, true)
}

function updateManual () {

}

