let billboard;
let data;

const ASIAN_COUNTRIES = [
  "country_name",
  "Cambodia",
  "Hong Kong SAR",
  "Iran",
  "Iraq",
  "Japan",
  "Korea",
  "Singapore"
];
const EUROPEAN_COUNTRIES = [
  "country_name",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Greenland",
  "Iceland",
  "Norway",
  "Sweden",
  "United Kingdom"
];
const NA_COUNTRIES = ["United States"];

const legendItem = (title, color, data) => {
  const container = document.createElement("li");
  const dot = document.createElement("span");
  const text = document.createElement("span");
  text.textContent = title;
  dot.style.background = color;
  container.appendChild(dot);
  container.appendChild(text);
  container.classList.add("legend");
  return container.outerHTML;
};

const getColors = () => {
  return {
    "Food/Organic waste": "lightGreen",
    Glass: "MediumAquamarine",
    Metal: "dimGray",
    Other: "pink",
    "Paper/Cardboard": "tan",
    Plastic: "blue",
    "Rubber/Leather": "orange",
    Wood: "brown",
    "Yard/Garden/Green waste": "green"
  };
};

const drawBillboard = data => {
  const categories = data.columns.slice(1, data.columns.length);
  const columns = data.map(country => Object.values(country));
  const groups = columns.map(c => c[0]);
  billboard = bb.generate({
    data: {
      columns: columns,
      type: "bar",
      colors: getColors()
    },
    bar: {
      width: {
        ratio: 0.5
      }
    },
    axis: {
      rotated: true,
      x: {
        type: "category",
        categories,
        tick: {
          show: false
        }
      },
      y: {
        max: 100,
        padding: 0
      }
    },
    groups: [groups],
    legend: {
      contents: {
        bindto: "#data1_legends",
        template: (title, color, data) => legendItem(title, color, data)
      }
    },
    size: {
      height: 700
    },
    bindto: "#data1_chart"
  });

  billboard.groups([groups]);
};

const getWasteData = async () => {
  return await d3.csv("./csv_data/country_waste_revised_final.csv");
};

const init = async () => {
  data = await getWasteData();
  drawBillboard(data);
  drawMarriageBillboard();
};

window.onload = init;

onCountriesFilter = countries => {
  return data.map(item =>
    Object.keys(item)
      .filter(key => countries.includes(key))
      .reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {})
  );
};

const drawMarriageBillboard = () => {
  const billboard = bb.generate({
    data: {
      columns: [
        [
          "Marrige rate in Alabama",
          10.1,
          9.4,
          9.9,
          9.6,
          9.4,
          9.2,
          9.2,
          8.9,
          8.6,
          8.3
        ],
        [
          "Per capita consumption of whole milk (US)",
          7.7,
          7.4,
          7.3,
          7.2,
          7,
          6.6,
          6.5,
          6.1,
          5.9,
          5.7
        ]
      ],

      axes: {
        "Marrige rate in Alabama": "y",
        "Per capita consumption of whole milk (US)": "y2"
      },

      types: {
        "Marrige rate in Alabama": "step",
        "Per capita consumption of whole milk (US)": "step"
      }
    },

    axis: {
      y2: {
        show: true,
        label: {
          text: "Gallons",
          position: "outer-middle"
        }
      },
      y: {
        label: {
          text: "Marrige per 1000 people",
          position: "outer-middle"
        }
      },

      x: {
        type: "category",
        categories: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009]
      }
    },

    bindto: "#data2_chart"
  });
};
