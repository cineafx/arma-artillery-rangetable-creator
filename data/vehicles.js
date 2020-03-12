const vehicles = [
  {
    "name": "[ACE] Mk6",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 200,
    "elevMin": 45,
    "elevMax": 88,
    "applyCorrections": true,
    "charges": [0.35, 0.7, 1]
  },
  {
    "name": "[BAF] L16",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 200,
    "elevMin": 0,
    "elevMax": 0,
    "charges": [0.35, 0.7, 1]
  },
  {
    "name": "[BAF] M6",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 153,
    "elevMin": 0,
    "elevMax": 0,
    "charges": [0.58, 0.72, 0.85, 1]
  },
  {
    "name": "[RHS] M252",
    "airFrictionIfUsed": 0,
    "initSpeed": 200,
    "elevMin": 0,
    "elevMax": 0,
    "charges": [0.2, 0.4, 0.6, 0.8, 1]
  },
  {
    "name": "[RHS] 2B14-1 'Podnos'",
    "airFrictionIfUsed": 0,
    "initSpeed": 211,
    "elevMin": 0,
    "elevMax": 0,
    "charges": [0.35,0.7,1]
  },
  {
    "name": "[REDD] Mortar 120mm",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 200,
    "elevMin": 0,
    "elevMax": 0,
    "charges": [0.35, 0.7, 1, 1.2512]
  }
]

/*
["B_Mortar_01_F",45,88,1,true]
["B_MBT_01_arty_F",-5,80,1,false]
["B_MBT_01_mlrs_F",5,66,1,false]
*/

/*
_x = (vehicle ace_player);

private _vehicleCfg = configFile >> "CfgVehicles" >> typeOf _x;
private _showRangetable = if (isNumber (_vehicleCfg >> "ACE_ARTILLERYTABLES_showRangetable")) then {
 getNumber (_vehicleCfg >> "ACE_ARTILLERYTABLES_showRangetable")
} else {
 getNumber (_vehicleCfg >> "artilleryScanner")
};

private _vehicle = _x;
private _turret = [];
private _turretCfg = configNull;
{
 private _xTurretCfg = [_vehicleCfg, _x] call CBA_fnc_getTurret;
 if ((getNumber (_xTurretCfg >> "primaryGunner")) == 1) exitWith {
  _turret = _x;
  _turretCfg = _xTurretCfg;
 };
} forEach allTurrets _vehicle;

private _weaponsTurret = _vehicle weaponsTurret _turret;
private _weapon = _weaponsTurret select 0;

private _turretAnimBody = getText (_turretCfg >> "animationSourceBody");
private _turretAnimGun = getText (_turretCfg >> "animationSourceGun");

private _currentElevRad = _vehicle animationSourcePhase _turretAnimGun;
if (isNil "_currentElevRad") then { _currentElevRad = _vehicle animationPhase _turretAnimGun; };
private _currentTraverseRad = _vehicle animationSourcePhase _turretAnimBody;
if (isNil "_currentTraverseRad") then { _currentTraverseRad = _vehicle animationPhase _turretAnimBody; };


private _weaponDir = _vehicle weaponDirection _weapon;
private _turretRot = [vectorDir _vehicle, vectorUp _vehicle, deg _currentTraverseRad] call CBA_fnc_vectRotate3D;
private _neutralX = (acos ((_turretRot vectorCos _weaponDir) min 1)) - (deg _currentElevRad);
_neutralX = (round (_neutralX * 10)) / 10;
private _minElev = _neutralX + getNumber (_turretCfg >> "minElev");
private _maxElev = _neutralX + getNumber (_turretCfg >> "maxElev");

private _applyCorrections = if (isNumber (_vehicleCfg >> "ACE_ARTILLERYTABLES_applyCorrections")) then {
 getNumber (_vehicleCfg >> "ACE_ARTILLERYTABLES_applyCorrections")
} else {
 getNumber (_vehicleCfg >> "artilleryScanner")
};

private _advCorrection = ACE_ARTILLERYTABLES_advancedCorrections && {_applyCorrections == 1};
if ((missionNamespace getVariable ["ACE_mk6Mortar_airResistanceEnabled", false]) && {_vehicle isKindOf "Mortar_01_base_F"}) then {
 _advCorrection = true;
};





private _mags = [_weaponName] call CBA_fnc_compatibleMagazines;
private _magCfg = configFile >> "CfgMagazines";
private _magParamsArray = [];
_mags = _mags apply {
    private _initSpeed = getNumber (_magCfg >> _x >> "initSpeed");
    _magParamsArray pushBackUnique _initSpeed;
    private _airFriction = 0;
    if (_advCorrection) then {
        _airFriction = if (isNumber (_magCfg >> _x >> "ACE_ARTILLERYTABLES_airFriction")) then { getNumber (_magCfg >> _x >> "ACE_ARTILLERYTABLES_airFriction) } else { DEFAULT_AIR_FRICTION };
    };
    _magParamsArray pushBackUnique _airFriction;
    [getText (_magCfg >> _x >> "displayNameShort"), getText (_magCfg >> _x >> "displayName"), _initSpeed, _airFriction]
};
if ((count _magParamsArray) == 2) then { // test if all magazines share the parameters
    _mags = [["", "All Magazines", (_mags select 0) select 2, (_mags select 0) select 3]]; // simplify
};

private _fireModes = getArray (configFile >> "CfgWeapons" >> _weaponName >> "modes");
_fireModes = (_fireModes apply {configFile >> "CfgWeapons" >> _weaponName >> _x}) select {1 == getNumber (_x >> "showToPlayer")};
_fireModes = _fireModes apply {[getNumber (_x >> "artilleryCharge"), configName _x]};
_fireModes sort true;
private _allSameCharge = ((count _fireModes) == 1) && {((_fireModes select 0) select 0) == 1};

ACE_ARTILLERYTABLES_magModeData = [];
{
    _x params ["_xDisplayNameShort", "_xDisplayName", "_xInitSpeed", "_xAirFriction"];
    if (_allSameCharge) then {
        ACE_ARTILLERYTABLES_magModeData pushBack [_xInitSpeed, _xAirFriction];
    } else {
        {
            _x params ["_xModeCharge"];
            ACE_ARTILLERYTABLES_magModeData pushBack [_xInitSpeed * _xModeCharge, _xAirFriction];
        } forEach _fireModes;
    };
} forEach _mags;






[typeOf _vehicle, _minElev, _maxElev, _applyCorrections, _advCorrection, ACE_ARTILLERYTABLES_magModeData]

*/
