import React, { lazy, Suspense, FC } from "react";
import { MdOutlineArrowRight } from "react-icons/md";
const Map = lazy(() => import("../map"));
import "./home.css";
import { IHOME } from "../../@types/home";

const Home: FC<IHOME> = ({ data, query, setQuery, handleQuery }) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleQuery(query);
  };
  return (
    <div className="parent">
      <h2 className="title">IP Address Tracker</h2>
      <form className="search_container" onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Search for any IP address or domain"
          autoFocus
          value={query}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setQuery(event.currentTarget.value)
          }
        />
        <button className="search_button" type="submit">
          <MdOutlineArrowRight />
        </button>
      </form>

      {!!data?.ip && (
        <div className="info_wrapper">
          <div className="info">
            <h2>IP Address</h2>
            <strong>{data?.ip}</strong>
          </div>
          <div className="info">
            <h2>Location</h2>
            <strong>
              {data?.region}, {data?.country}
            </strong>
          </div>
          <div className="info">
            <h2>Timezone</h2>
            <strong>UTC {data?.timezone}</strong>
          </div>
          <div className="info">
            <h2>ISP</h2>
            <strong>{data?.isp}</strong>
          </div>
        </div>
      )}

      <Suspense fallback={"LOADING"}>
        <Map data={data} />
      </Suspense>
    </div>
  );
};

export default Home;
