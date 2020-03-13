
const M_PI_4 = Math.PI / 4
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
    changeInVelocity = gravityAccl + apparentWind * (kCoefficient * apparentWind.magnitude())
    currentVelocity += changeInVelocity * timeStep
    currentPosition += currentVelocity * timeStep
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
    return {bestAngle: M_PI_4, bestDistance: muzzleVelocity * muzzleVelocity / gravityABS}
  }
  // With air resitsnce, max distance angle won't be 45 degrees
  let bestAngle = M_PI_4
  let bestDistance = -1
  for (let testAngle = M_PI_4; testAngle > 0; testAngle -= (M_PI_4 / 100.0)) {
    let {_ignore1, testResultDist, _ignore3} = simulateShot(testAngle, muzzleVelocity, 0, 0, 0, 15, 1, airFriction)
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
    let {_ignore1, resultDistance, resultTime} = simulateShot(currentElevation, muzzleVelocity, heightToHit, 0, 0, 15, 1, airFriction)
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
 * @param num
 * @param widthInt
 * @param widthDec
 * @returns {string}
 */
function writeNumber (num, widthInt, widthDec) {
  if ((num < 0) && (num > -0.05)) { // hard coded fix -0.0 rounding errors
    num = 0
  }
  return Number(num).toFixed(widthDec).padStart(widthInt, "0")
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
  return ""
}
