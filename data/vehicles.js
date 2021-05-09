const vehicles = [
  {
    "mod": "ACE",
    "name": "Mk6 Mortar",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 200,
    "elevMin": 45,
    "elevMax": 88,
    "charges": [0.35, 0.7, 1]
  },
  {
    "mod": "BAF",
    "name": "L16",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 200,
    "elevMin": 45,
    "elevMax": 88,
    "charges": [0.35, 0.7, 1]
  },
  {
    "mod": "BAF",
    "name": "M6",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 153,
    "elevMin": 20.4,
    "elevMax": 120.4,
    "charges": [0.58, 0.72, 0.85, 1]
  },
  {
    "mod": "RHS",
    "name": "M252",
    "airFrictionIfUsed": 0,
    "initSpeed": 200,
    "elevMin": 45.03,
    "elevMax": 85.23,
    "charges": [0.2, 0.4, 0.6, 0.8, 1]
  },
  {
    "mod": "RHS",
    "name": "2B14-1 'Podnos'",
    "airFrictionIfUsed": 0,
    "initSpeed": 211,
    "elevMin": 40,
    "elevMax": 85,
    "charges": [0.35, 0.7, 1]
  },
  {
    "mod": "REDD",
    "name": "Mortar 120mm",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 200,
    "elevMin": 45,
    "elevMax": 88,
    "charges": [0.35, 0.7, 1, 1.2512]
  },

  {
    "mod": "BW",
    "name": "Mortar 120mm (HE)",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 317,
    "elevMin": 45,
    "elevMax": 88,
    "charges": [0.35, 0.55, 0.7, 0.89]
  },
  {
    "mod": "BW",
    "name": "Mortar 120mm (HE approx)",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 322,
    "elevMin": 45,
    "elevMax": 88,
    "charges": [0.35, 0.55, 0.7, 0.89]
  },
  {
    "mod": "BW",
    "name": "Mortar 120mm (Flare)",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 320,
    "elevMin": 45,
    "elevMax": 88,
    "charges": [0.35, 0.55, 0.7, 0.89]
  },
  {
    "mod": "BW",
    "name": "Mortar 120mm (Smoke)",
    "airFrictionIfUsed": -0.0001,
    "initSpeed": 315,
    "elevMin": 45,
    "elevMax": 88,
    "charges": [0.35, 0.55, 0.7, 0.89]
  },

  {
    "mod": "ACE",
    "name": "Sholef",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 810,
    "elevMin": -5,
    "elevMax": 80,
    "charges": [0.19, 0.3, 0.48, 0.8, 1]
  },
  {
    "mod": "ACE",
    "name": "Seara",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 850,
    "elevMin": 5,
    "elevMax": 66,
    "charges": [0.135, 0.153, 0.175, 0.2, 0.228, 0.261, 0.3, 0.341, 0.388, 0.44, 0.495, 0.56, 0.639, 0.74, 0.842, 0.96]
  },
  {
    "mod": "ACE",
    "name": "Hilux (Artillery)",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 690,
    "elevMin": -2,
    "elevMax": 85,
    "charges": [0.365, 0.415, 0.47, 0.518, 0.58, 0.65]
  },
  {
    "mod": "ACE",
    "name": "KamAZ MRL",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 850,
    "elevMin": 0,
    "elevMax": 66,
    "charges": [0.135, 0.153, 0.175, 0.2, 0.228, 0.261, 0.3, 0.341, 0.388, 0.44, 0.495, 0.56, 0.639, 0.74, 0.842, 0.96]
  },
  {
    "mod": "RHS",
    "name": "M109A6",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 810,
    "elevMin": -5,
    "elevMax": 80,
    "charges": [0.19, 0.3, 0.48, 0.8, 1]
  },
  {
    "mod": "RHS",
    "name": "M119A2",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 810,
    "elevMin": -9,
    "elevMax": 80,
    "charges": [0.19, 0.3, 0.48]
  },
  {
    "mod": "RHS",
    "name": "2A18M (D-30A)",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 810,
    "elevMin": -9,
    "elevMax": 80,
    "charges": [0.19, 0.3, 0.48]
  },
  {
    "mod": "RHS",
    "name": "2S1",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 810,
    "elevMin": -5,
    "elevMax": 77,
    "charges": [0.19, 0.3, 0.48]
  },
  {
    "mod": "RHS",
    "name": "2S3",
    "airFrictionIfUsed": -0.00006,
    "initSpeed": 810,
    "elevMin": -4.6,
    "elevMax": 77.4,
    "charges": [0.19, 0.3, 0.48]
  }
]

/*
["Mk6 Mortar","B_Mortar_01_F","mortar_82mm",45,88,1,true,[[0.35,"Single1"],[0.7,"Single2"],[1,"Single3"]],[["","All Magazines",200,-0.0001]]]
["Sholef","B_MBT_01_arty_F","mortar_155mm_AMOS",-5,80,1,true,[[0.19,"Single1"],[0.3,"Single2"],[0.48,"Single3"],[0.8,"Single4"],[1,"Single5"]],[["","All Magazines",810,-6e-005]]]
["Seara","B_MBT_01_mlrs_F","rockets_230mm_GAT",5,66,1,true,[[0.135,"Mode_1"],[0.153,"Mode_2"],[0.175,"Mode_3"],[0.2,"Mode_4"],[0.228,"Mode_5"],[0.261,"Mode_6"],[0.3,"Mode_7"],[0.341,"Mode_8"],[0.388,"Mode_9"],[0.44,"Mode_10"],[0.495,"Mode_11"],[0.56,"Mode_12"],[0.639,"Mode_13"],[0.74,"Mode_14"],[0.842,"Mode_15"],[0.96,"Mode_16"]],[["","All Magazines",850,-6e-005]]]

["M252","RHS_M252_D","rhs_mortar_81mm",45.03,85.23,1,true,[[0.2,"Single0"],[0.4,"Single1"],[0.6,"Single2"],[0.8,"Single3"],[1,"Single4"]],[["","All Magazines",200,-0.0001]]]
["2B14-1 'Podnos'","rhsgref_ins_2b14","rhs_weap_2b14",40,85,1,true,[[0.35,"Single1"],[0.7,"Single2"],[1,"Single3"]],[["","All Magazines",211,-6e-005]]]
["Hilux (Artillery)","UK3CB_O_G_Hilux_Rocket_Arty","UK3CB_Hilux_Artillery_Launcher",-2,85,1,true,[[0.365,"Mode_1"],[0.415,"Mode_2"],[0.47,"Mode_3"],[0.518,"Mode_4"],[0.58,"Mode_5"],[0.65,"Mode_6"]],[["","All Magazines",690,-6e-005]]]
["KamAZ MRL","I_Truck_02_MRL_F","rockets_230mm_GAT",0,66,1,true,[[0.135,"Mode_1"],[0.153,"Mode_2"],[0.175,"Mode_3"],[0.2,"Mode_4"],[0.228,"Mode_5"],[0.261,"Mode_6"],[0.3,"Mode_7"],[0.341,"Mode_8"],[0.388,"Mode_9"],[0.44,"Mode_10"],[0.495,"Mode_11"],[0.56,"Mode_12"],[0.639,"Mode_13"],[0.74,"Mode_14"],[0.842,"Mode_15"],[0.96,"Mode_16"]],[["","All Magazines",850,-6e-005]]]

["L16","UK3CB_BAF_Static_L16_Deployed","UK3CB_BAF_L16_veh",45,88,1,true,[[0.35,"Single1"],[0.7,"Single2"],[1,"Single3"]],[["","All Magazines",200,-0.0001]]]
["M6","UK3CB_BAF_Static_M6_Deployed","UK3CB_BAF_M6_veh",20.4,120.4,0,true,[[0.58,"Single1"],[0.72,"Single2"],[0.85,"Single3"],[1,"Single4"]],[["","All Magazines",153,-0.0001]]]

["M109A6","rhsusf_m109d_usarmy","rhs_weap_m284",-5,80,1,true,[[0.19,"Single1"],[0.3,"Single2"],[0.48,"Single3"],[0.8,"Single4"],[1,"Single5"]],[["","All Magazines",810,-6e-005]]]
["M119A2","RHS_M119_D","RHS_weap_M119",-9,80,1,true,[[0.19,"Single1"],[0.3,"Single2"],[0.48,"Single3"]],[["","All Magazines",810,-6e-005]]]
["2A18M (D-30A)","rhsgref_ins_d30","rhs_weap_d30",-9,80,1,true,[[0.19,"Single1"],[0.3,"Single2"],[0.48,"Single3"]],[["53-OF-462","53-OF-462",810,-6e-005],["53-OF-462","53-OF-462",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK13","3BK13",726,-6e-005],["3BK13","3BK13",726,-6e-005],["3BK13","3BK13",726,-6e-005],["53-D-462","53-D-462",810,-6e-005],["53-D-462","53-D-462",810,-6e-005],["53-S-463","53-S-463",810,-6e-005],["53-S-463","53-S-463",810,-6e-005]]]

["2S1","LOP_IA_2S1","rhs_weap_2a31",-5,77,1,true,[[0.19,"Single1"],[0.3,"Single2"],[0.48,"Single3"]],[["53-OF-462","53-OF-462",810,-6e-005],["53-OF-462","53-OF-462",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK13","3BK13",726,-6e-005],["3BK13","3BK13",726,-6e-005],["3BK13","3BK13",726,-6e-005],["53-D-462","53-D-462",810,-6e-005],["53-D-462","53-D-462",810,-6e-005],["53-S-463","53-S-463",810,-6e-005],["53-S-463","53-S-463",810,-6e-005]]]
["2S3 SPG","UK3CB_CW_SOV_O_LATE_2S3","rhs_weap_2a33",-4.6,77.4,1,true,[[0.19,"Single1"],[0.3,"Single2"],[0.48,"Single3"]],[["","All Magazines",810,-6e-005]]]
["2S1 SPG","UK3CB_CW_SOV_O_LATE_2S1","rhs_weap_2a31",-5,77,1,true,[[0.19,"Single1"],[0.3,"Single2"],[0.48,"Single3"]],[["53-OF-462","53-OF-462",810,-6e-005],["53-OF-462","53-OF-462",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3OF56","3OF56",810,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK6M","3BK6M",740,-6e-005],["3BK13","3BK13",726,-6e-005],["3BK13","3BK13",726,-6e-005],["3BK13","3BK13",726,-6e-005],["53-D-462","53-D-462",810,-6e-005],["53-D-462","53-D-462",810,-6e-005],["53-S-463","53-S-463",810,-6e-005],["53-S-463","53-S-463",810,-6e-005]]]

NO ["M142 HIMARS","rhsusf_M142_usarmy_D","rhs_weap_mlrs",0,65,1,true,[[0.135,"Mode_1"],[0.153,"Mode_2"],[0.175,"Mode_3"],[0.2,"Mode_4"],[0.228,"Mode_5"],[0.261,"Mode_6"],[0.3,"Mode_7"],[0.341,"Mode_8"],[0.388,"Mode_9"],[0.44,"Mode_10"],[0.495,"Mode_11"],[0.56,"Mode_12"],[0.639,"Mode_13"],[0.74,"Mode_14"],[0.842,"Mode_15"],[0.96,"Mode_16"]],[["Cluster","M26",650,-6e-005],["Cluster","M26A1",850,-6e-005]]]
NO ["BM-21","LOP_IA_BM21","rhs_weap_bm21",0,65,1,true,[[0.365,"Mode_1"],[0.415,"Mode_2"],[0.47,"Mode_3"],[0.518,"Mode_4"],[0.58,"Mode_5"],[0.65,"Mode_6"]],[["","All Magazines",690,-6e-005]]]


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
_weaponName = _weapon;



private _mags = [_weaponName] call CBA_fnc_compatibleMagazines;
private _magCfg = configFile >> "CfgMagazines";
private _magParamsArray = [];
_mags = _mags apply {
    private _initSpeed = getNumber (_magCfg >> _x >> "initSpeed");
    _magParamsArray pushBackUnique _initSpeed;
    private _airFriction = 0;
    if (_advCorrection) then {
        _airFriction = if (isNumber (_magCfg >> _x >> "ACE_ARTILLERYTABLES_airFriction")) then { getNumber (_magCfg >> _x >> "ACE_ARTILLERYTABLES_airFriction") } else { -0.00006 };
    };
    _magParamsArray pushBackUnique _airFriction;
    [getText (_magCfg >> _x >> "displayNameShort"), getText (_magCfg >> _x >> "displayName"), _initSpeed, _airFriction]
};
if ((count _magParamsArray) == 2) then {
    _mags = [["", "All Magazines", (_mags select 0) select 2, (_mags select 0) select 3]];
};


private _fireModes = getArray (configFile >> "CfgWeapons" >> _weaponName >> "modes");
_fireModes = (_fireModes apply {configFile >> "CfgWeapons" >> _weaponName >> _x}) select {1 == getNumber (_x >> "showToPlayer")};
_fireModes = _fireModes apply {[getNumber (_x >> "artilleryCharge"), configName _x]};
_fireModes sort true;
private _allSameCharge = ((count _fireModes) == 1) && {((_fireModes select 0) select 0) == 1};




[getText (configFile >> "CfgVehicles" >> typeOf (vehicle ace_player) >> "displayName"), typeOf _vehicle, _weaponName, _minElev, _maxElev, _applyCorrections, _advCorrection, _fireModes, _mags]
*/
