import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
  Annotation,
} from "react-simple-maps";
import { Link } from "react-router-dom";

const geoUrl = "https://ismailarilik.com/react-covid-maps/geo.json";
const Main = () => {
  const [geo, setGeo] = useState();
  return (
    <div
      className="h-[calc(100vh-74px)]  flex-1 text-white flex flex-col justify-center items-center
    md:pt-20 overflow-hidden bg-zinc-800 wrapper"
    >
      <h6>Details Of Country:{geo?.properties?.name}</h6>
      <ComposableMap
        height={500}
        projectionConfig={{ rotate: [-10, 0, 0], scale: 150 }}
      >
        <ZoomableGroup>
          <Sphere stroke="gray" strokeWidth={0.3} />
          <Graticule stroke="gray" strokeWidth={0.3} />

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Link to={`/detail?code=${geo.id}`} key={geo.rsmKey}>
                  <Geography
                    onMouseEnter={() => setGeo(geo)}
                    onMouseLeave={() => setGeo(null)}
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#EEE",
                      },
                      hover: {
                        fill: "rgb(54 197 94)",
                      },
                      pressed: {
                        fill: "rgb(14 147 105)",
                      },
                    }}
                  />
                </Link>
              ))
            }
          </Geographies>
          {geo && (
            <Annotation
              subject={geo.geometry.coordinates[0][0]}
              dx={-90}
              dy={-30}
              style={{ zIndex: 99999 }}
              connectorProps={{
                stroke: "#FF5533",
                strokeWidth: 3,
                strokeLinecap: "round",
              }}
            >
              <text
                x="-8"
                textAnchor="end"
                alignmentBaseline="middle"
                fill="#F53"
              >
                {geo?.properties.name}
              </text>
            </Annotation>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Main;
