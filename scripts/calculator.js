const timeStep = 1.0 / 60
const rangeSearchErrorMax = 0.001 // ratio * distance
const rangeSearchAngleConvergance = 0.000025
const gravityABS = 9.8066
const gravityAccl = new Vector3(0, 0, -1 * gravityABS)

/**
 *
 * @param fireAngleRad
 * @param muzzleVelocity
 * @param heightOfTarget
 * @param crossWind
 * @param tailWind
 * @param temperature
 * @param airDensity
 * @param airFriction
 * @returns {{finalPosX: number, finalPosY: number, currentTime: number}}
 */
function simulateShot (fireAngleRad, muzzleVelocity, heightOfTarget, crossWind, tailWind, temperature, airDensity, airFriction) {
  // returns: dist traveled to the side (crosswind), dist traveled foward (headwind), time of flight
  // note: if shot never reaches height of target, then results are undefined (use negative)
  const kCoefficient = -1.0 * airDensity * airFriction
  const powderEffects = (airFriction) ? ((temperature + 273.13) / 288.13 - 1) / 40 + 1 : 1.0

  let currentTime = 0
  let currentPosition = new vector3(0, 0, 0)
  let lastPosition = new vector3(currentPosition.x, currentPosition.y, currentPosition.z)
  let currentVelocity = new vector3(0, powderEffects * muzzleVelocity * Math.cos(fireAngleRad), powderEffects * muzzleVelocity * Math.sin(fireAngleRad))
  const wind = new vector3(crossWind, tailWind, 0)

  while ((currentVelocity.z > 0) || (currentPosition.z >= heightOfTarget)) {
    lastPosition = currentPosition
    let apparentWind = Vector3.subtract(wind, currentVelocity)
    let changeInVelocity = Vector3.add(gravityAccl, Vector3.multiply(apparentWind, Vector3.multiply(kCoefficient, apparentWind.magnitude)))
    currentVelocity = Vector3.add(changeInVelocity, Vector3.multiply(changeInVelocity, timeStep))
    currentPosition = Vector3.add(currentVelocity, Vector3.multiply(currentVelocity, timeStep))
    currentTime += timeStep
  }

  const lastCurrentRatio = (heightOfTarget - currentPosition.z) / (lastPosition.z - currentPosition.z)
  let finalPos = Vector3.lerp(lastPosition, currentPosition, lastCurrentRatio)

  return {finalPosX: finalPos.x, finalPosY: finalPos.y, currentTime}
}

/**
 *
 * @param muzzleVelocity
 * @param airFriction
 * @returns {{bestAngle: number, bestDistance: number}}
 */
function findMaxAngle (muzzleVelocity, airFriction) {
  // retrns: angle that goes the furthest, max distance traveled
  if (airFriction === 0) {
    return {bestAngle: (Math.PI / 4), bestDistance: muzzleVelocity * muzzleVelocity / gravityABS}
  }
  // With air resitsnce, max distance angle won't be 45 degrees
  let bestAngle = Math.PI / 4
  let bestDistance = -1
  for (let testAngle = Math.PI / 4; testAngle > 0; testAngle -= ((Math.PI / 4) / 100.0)) {
    let testResultDist = simulateShot(testAngle, muzzleVelocity, 0, 0, 0, 15, 1, airFriction).finalPosY
    if (testResultDist > bestDistance) {
      bestAngle = testAngle
      bestDistance = testResultDist
    }
  }
  return {bestAngle, bestDistance}
}

/**
 *
 * @param rangeToHit
 * @param heightToHit
 * @param muzzleVelocity
 * @param airFriction
 * @param minElev
 * @param maxElev
 * @param highArc
 * @returns {{resultDistance: number, resultTime: number, currentElevation: number}}
 */
function simulateFindSolution (rangeToHit, heightToHit, muzzleVelocity, airFriction, minElev, maxElev, highArc) {
  // returns: actual distance traveled, elevation, time of flight
  let searchMin = minElev
  let searchMax = maxElev

  if (!airFriction) {
    // can do trivial ballistics physics to get angle, could compute tof as well, but run through sim once to ensure consistancy (uses positive value of g)
    let radicand = Math.pow(muzzleVelocity, 4) - gravityABS * (gravityABS * Math.pow(rangeToHit, 2) + 2 * heightToHit * Math.pow(muzzleVelocity, 2))
    if ((!rangeToHit) || (radicand < 0)) { // radican't
      return {resultDistance: -1, currentElevation: -1, resultTime: -1}
    }
    radicand = Math.sqrt(radicand)
    let angleRoot = Math.atan((Math.pow(muzzleVelocity, 2) + radicand) / (gravityABS * rangeToHit))
    if ((angleRoot > maxElev) || (angleRoot < minElev)) {
      angleRoot = Math.atan((Math.pow(muzzleVelocity, 2) - radicand) / (gravityABS * rangeToHit))
    }
    if ((angleRoot > maxElev) || (angleRoot < minElev)) {
      return {resultDistance: -1, currentElevation: -1, resultTime: -1}
    }
    const tof = rangeToHit / (muzzleVelocity * Math.cos(angleRoot))
    return {resultDistance: rangeToHit, currentElevation: angleRoot, resultTime: tof}
  }

  let numberOfAttempts = 0
  let resultDistance = -1
  let resultTime = -1
  let currentError = 9999
  let currentElevation = -1
  do {
    if (numberOfAttempts++ > 50) {
      break
    } // for safetey, min/max should converge long before
    currentElevation = (searchMin + searchMax) / 2.0
    let resultDistance = simulateShot(currentElevation, muzzleVelocity, heightToHit, 0, 0, 15, 1, airFriction).finalPosY
    currentError = rangeToHit - resultDistance
    // printf("elev %f [%f, %f]range%f\n goes %f [%f]\n", currentElevation, searchMin, searchMax, (searchMax - searchMin), resultDistance, currentError);
    if ((currentError > 0) ^ (!highArc)) {
      searchMax = currentElevation
    } else {
      searchMin = currentElevation
    }
  } while ((searchMax - searchMin) > rangeSearchAngleConvergance)

  // printf("[%f, %f] Actuall [%f] err [%f of %f]\n", _rangeToHit, _heightToHit, resultDistance, currentError, (_rangeToHit * rangeSearchErrorMax * (_highArc ? 1.0 : 2.0)));
  // On some low angle shots, it will really struggle to converge because of precision issues
  if ((Math.abs(currentError) > (rangeToHit * rangeSearchErrorMax * (highArc ? 1.0 : 2.0)))) {
    return {resultDistance: -1, currentElevation: -1, resultTime: -1}
  }
  return {resultDistance, currentElevation, resultTime}
}


/**
 *
 * @param stringBuilder
 * @param num
 * @param widthInt
 * @param widthDec
 * @returns {string}
 */
function writeNumber (stringBuilder, num, widthInt, widthDec) {
  if ((num < 0) && (num > -0.05)) { // hard coded fix -0.0 rounding errors
    num = 0
  }
  stringBuilder.push(Number(num).toFixed(widthDec).padStart(widthInt, "0"))
}

/**
 *
 * @param rangeToHit
 * @param muzzleVelocity
 * @param airFriction
 * @param minElev
 * @param maxElev
 * @param highArc
 * @returns {string}
 */
function simulateCalcRangeTableLine (rangeToHit, muzzleVelocity, airFriction, minElev, maxElev, highArc) {
  let {actualDistance, lineElevation, lineTimeOfFlight} = simulateFindSolution(rangeToHit, 0, muzzleVelocity, airFriction, minElev, maxElev, highArc)
  if (lineTimeOfFlight < 0) {
    return ""
  }
  let {actualDistanceHeight, lineHeightElevation, lineHeightTimeOfFlight} = simulateFindSolution(rangeToHit, -100, muzzleVelocity, airFriction, minElev, maxElev, highArc)


  let returnSS = []

  returnSS.push("[\"")
  writeNumber(returnSS, rangeToHit, 0, 0)
  returnSS.push("\",\"")
  writeNumber(returnSS, lineElevation * 3200.0 / Math.PI, 0, 0)
  returnSS.push("\",\"")

  if (lineHeightElevation > 0) {
    const drElevAdjust = lineHeightElevation - lineElevation
    const drTofAdjust = lineHeightTimeOfFlight - lineTimeOfFlight
    writeNumber(returnSS, drElevAdjust * 3200.0 / Math.PI, 0, 0)
    returnSS.push("\",\"")
    writeNumber(returnSS, drTofAdjust, 0, 1)
  } else {
    // low angle shots won't be able to adjust down further
    returnSS.push("-\",\"-")
  }
  returnSS.push("\",\"")
  writeNumber(returnSS, lineTimeOfFlight, 0, ((lineTimeOfFlight < 99.945) ? 1 : 0)) // round TOF when high
  returnSS.push("\",\"")

  if (airFriction) {
    // Calc corrections:
    let xOffset
    let yOffset
    // Crosswind
    xOffset = simulateShot(lineElevation, muzzleVelocity, 0, 10, 0, 15, 1, airFriction).finalPosX
    const crosswindOffsetRad = Math.atan2(xOffset, actualDistance) / 10
    // Headwind
    yOffset = simulateShot(lineElevation, muzzleVelocity, 0, 0, -10, 15, 1, airFriction).finalPosY
    const headwindOffset = (actualDistance - yOffset) / 10
    // Tailwind
    yOffset = simulateShot(lineElevation, muzzleVelocity, 0, 0, 10, 15, 1, airFriction).finalPosY
    const tailwindOffset = (actualDistance - yOffset) / 10
    // Air Temp Dec
    yOffset = simulateShot(lineElevation, muzzleVelocity, 0, 0, 0, 5, 1, airFriction).finalPosY
    const tempDecOffset = (actualDistance - yOffset) / 10
    // Air Temp Inc
    yOffset = simulateShot(lineElevation, muzzleVelocity, 0, 0, 0, 25, 1, airFriction).finalPosY
    const tempIncOffset = (actualDistance - yOffset) / 10
    // Air Density Dec
    yOffset = simulateShot(lineElevation, muzzleVelocity, 0, 0, 0, 15, 0.9, airFriction).finalPosY
    const airDensityDecOffset = (actualDistance - yOffset) / 10
    // Air Density Inc
    yOffset = simulateShot(lineElevation, muzzleVelocity, 0, 0, 0, 15, 1.1, airFriction).finalPosY
    const airDensityIncOffset = (actualDistance - yOffset) / 10

    writeNumber(returnSS, crosswindOffsetRad * 3200.0 / Math.PI, 1, 1)
    returnSS.push("\",\"")
    writeNumber(returnSS, headwindOffset, 1, (Math.abs(headwindOffset) > 9.949) ? 0 : 1)
    returnSS.push("\",\"")
    writeNumber(returnSS, tailwindOffset, 1, (Math.abs(tailwindOffset) > 9.949) ? 0 : 1)
    returnSS.push("\",\"")
    writeNumber(returnSS, tempDecOffset, 1, (Math.abs(tempDecOffset) > 9.949) ? 0 : 1)
    returnSS.push("\",\"")
    writeNumber(returnSS, tempIncOffset, 1, (Math.abs(tempIncOffset) > 9.949) ? 0 : 1)
    returnSS.push("\",\"")
    writeNumber(returnSS, airDensityDecOffset, 1, (Math.abs(airDensityDecOffset) > 9.949) ? 0 : 1)
    returnSS.push("\",\"")
    writeNumber(returnSS, airDensityIncOffset, 1, (Math.abs(airDensityIncOffset) > 9.949) ? 0 : 1)
    returnSS.push("\"]")
  } else {
    returnSS.push("-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\"]") // 7 dashes
  }
  return returnSS.join("")
}
