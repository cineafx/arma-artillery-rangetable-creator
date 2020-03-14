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
  //list[1].selected = true //TODO: remove
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
  let tableData = calculate(muzzleVelocity, airFriction, minElev, maxElev, highArc)
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
}

function updateFromPreset () {
  let artyType = document.getElementById("artyType").value
  let chargeId = document.getElementById("charges").value
  let airResistanceEnabled = document.getElementById("airResistanceEnabled").checked

  let vehicleData = vehicles[parseInt(artyType)]
  let muzzleVelocity = vehicleData.initSpeed * vehicleData.charges[parseInt(chargeId)]
  let airFriction = airResistanceEnabled ? vehicleData.airFrictionIfUsed : 0.0

  document.getElementById("muzzleVelocity").value = muzzleVelocity
  document.getElementById("airFriction").value = airFriction
  document.getElementById("elevMin").value = vehicleData.elevMin
  document.getElementById("elevMax").value = vehicleData.elevMax
  document.getElementById("highArc").checked = true

  updateManual()
}

function updateManual () {
  let muzzleVelocity = document.getElementById("muzzleVelocity").value
  let airFriction = document.getElementById("airFriction").value
  let elevMin = document.getElementById("elevMin").value
  let elevMax = document.getElementById("elevMax").value
  let highArc = document.getElementById("highArc").checked

  fillTable(muzzleVelocity, airFriction, elevMin, elevMax, highArc)
}

