const data = [
  70102,
  60688,
  105331,
  127196,
  141253,
  118164,
  67481,
  75634,
  60715,
  84116,
  51389,
  52440,
  84992,
  87519,
  85765,
  124479,
  97873,
  85437,
  94902,
  124969,
  70561,
  144601,
  128042,
  67596,
  136905,
  111849,
  100389,
  135608,
  91006,
  77385,
  52100,
  64728,
  127796,
  114893,
  82414,
  66565,
  73704,
  110396,
  142722,
  107813,
  149628,
  131729,
  118421,
  56566,
  84962,
  108120,
  108438,
  81536,
  55238,
  77072,
  132575,
  82716,
  50641,
  57320,
  89661,
  97094,
  134713,
  142451,
  128541,
  53527,
  116088,
  101909,
  124349,
  103812,
  108324,
  72981,
  114488,
  78738,
  78523,
  129146,
  103007,
  68506,
  102227,
  93507,
  94557,
  105867,
  125514,
  109130,
  146102,
  100876,
  143549,
  85753,
  97589,
  90892,
  104287,
  70930,
  53847,
  94687,
  135370,
  76024,
  76156,
  101006,
  128349,
  58134,
  110849,
  149176,
  136728,
  79054,
  136740,
  131081
];

// Part 1
const calculateReqFuel = mass => Math.max(Math.floor(mass / 3) - 2, 0);

const fuelReq = data
  .map(mass => calculateReqFuel(mass))
  .reduce((acc, cur) => acc + cur);

console.log("Fuel required:", fuelReq);

// Part 2
const calculateReqFuelRec = data =>
  data.map(mass => {
    let fuelReq = calculateReqFuel(mass);
    let totalFuelReq = fuelReq;
    while (fuelReq !== 0) {
      fuelReq = calculateReqFuel(fuelReq);
      totalFuelReq += fuelReq;
    }
    return totalFuelReq;
  });

console.log(
  "Fuel required w fuel weight:",
  calculateReqFuelRec(data).reduce((acc, cur) => acc + cur)
);
