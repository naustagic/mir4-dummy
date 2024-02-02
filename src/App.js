import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [latestSaleData, setLatestSaleData] = useState({ data: { lists: [] } });
  const [codexData, setCodexData] = useState({ data: [] });
  const [transportID, setTransfortID] = useState("");
  const [currentSeq, setCurrentSeq] = useState("");
  const [newSeq, setNewSeq] = useState("");

  const fetchLatestSale = async () => {
    try {
      const response = await fetch(
        "https://webapi.mir4global.com/nft/lists?listType=sale&class=0&levMin=0&levMax=0&powerMin=0&powerMax=0&priceMin=0&priceMax=0&sort=latest&page=1&languageCode=en"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (currentSeq !== data.data.lists[0].seq) {
        toast(data.data.lists[0].seq - currentSeq + " " + "New Character!");
      }

      setCurrentSeq(data.data.lists[0].seq);

      setLatestSaleData(data);
    } catch (error) {
      console.error("Error fetching latest sale:", error);
    }
  };

  const fetchCodexData = async (seq) => {
    try {
      const response = await fetch(
        `https://webapi.mir4global.com/nft/character/codex?transportID=${seq}&languageCode=en`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const codexData = await response.json();

      setCodexData(codexData);
    } catch (error) {
      console.error("Error fetching codex data:", error);
    }
  };

  const fetchCharacterDetails = async (seq) => {
    try {
      const response = await fetch(
        `https://webapi.mir4global.com/nft/character/codex?transportID=${seq}&languageCode=en`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const codexData = await response.json();

      setCodexData(codexData);
    } catch (error) {
      console.error("Error fetching codex data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchLatestSale();

    // Set up interval to fetch data every 5 minutes (adjust as needed)
    const intervalId = setInterval(fetchLatestSale, 1 * 1000);

    // Clear interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [currentSeq]);

  useEffect(() => {
    // Fetch codex data for each sale item
    if (latestSaleData.data.lists.length > 0) {
      const fetchCodexDataForAllItems = async () => {
        const promises = latestSaleData.data.lists.map((saleItem) => {
          return fetchCodexData(saleItem.transportID);
        });

        await Promise.all(promises);
      };

      fetchCodexDataForAllItems();
    }
  }, [latestSaleData]);

  // console.log(codexData, "codex");
  // console.log(latestSaleData);

  return (
    <div className="flex-1 bg-slate-950">
      <div className="p-10">
        <h1 className="font-bold text-2xl text-white mb-5">Lastest Sale</h1>
        <ToastContainer />

        {latestSaleData.data.lists.length > 0 ? (
          <div className="flex grid grid-cols-4 gap-4">
            {latestSaleData.data.lists.map((saleItem) => (
              <div key={saleItem.id}>
                <a
                  href={`https://www.xdraco.com/nft/trade/${saleItem.seq}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-slate-900 rounded-lg flex justify-center items-center">
                    <div>
                      {/* <p className="text-white">ID: {saleItem.seq}</p> */}
                      {/* <p>Current {currentSeq}</p>
                    <p>Data {latestSaleData.data.lists[0].seq}</p> */}
                      {saleItem.class === 1 && (
                        <>
                          {saleItem.powerScore > 205000 ? (
                            <img
                              src={require("./assets/images/thumbnails/warrior_legendary.png")}
                              alt="warrior"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 170000 ? (
                            <img
                              src={require("./assets/images/thumbnails/warrior_epic.png")}
                              alt="warrior"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 135000 ? (
                            <img
                              src={require("./assets/images/thumbnails/warrior_rare.png")}
                              alt="warrior"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : (
                            <img
                              src={require("./assets/images/thumbnails/warrior_uncommon.png")}
                              alt="warrior"
                              style={{ maxWidth: "100%" }}
                            />
                          )}
                        </>
                      )}

                      {saleItem.class === 2 && (
                        <>
                          {saleItem.powerScore > 205000 ? (
                            <img
                              src={require("./assets/images/thumbnails/sorcerer_legendary.png")}
                              alt="sorcerer"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 170000 ? (
                            <img
                              src={require("./assets/images/thumbnails/sorcerer_epic.png")}
                              alt="sorcerer"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 135000 ? (
                            <img
                              src={require("./assets/images/thumbnails/sorcerer_rare.png")}
                              alt="sorcerer"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : (
                            <img
                              src={require("./assets/images/thumbnails/sorcerer_uncommon.png")}
                              alt="sorcerer"
                              style={{ maxWidth: "100%" }}
                            />
                          )}
                        </>
                      )}

                      {saleItem.class === 3 && (
                        <>
                          {saleItem.powerScore > 205000 ? (
                            <img
                              src={require("./assets/images/thumbnails/taoist_legendary.png")}
                              alt="taoist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 170000 ? (
                            <img
                              src={require("./assets/images/thumbnails/taoist_epic.png")}
                              alt="taoist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 135000 ? (
                            <img
                              src={require("./assets/images/thumbnails/taoist_rare.png")}
                              alt="taoist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : (
                            <img
                              src={require("./assets/images/thumbnails/taoist_uncommon.png")}
                              alt="taoist"
                              style={{ maxWidth: "100%" }}
                            />
                          )}
                        </>
                      )}

                      {saleItem.class === 4 && (
                        <>
                          {saleItem.powerScore > 205000 ? (
                            <img
                              src={require("./assets/images/thumbnails/arbalist_legendary.png")}
                              alt="arbalist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 170000 ? (
                            <img
                              src={require("./assets/images/thumbnails/arbalist_epic.png")}
                              alt="arbalist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 135000 ? (
                            <img
                              src={require("./assets/images/thumbnails/arbalist_rare.png")}
                              alt="arbalist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : (
                            <img
                              src={require("./assets/images/thumbnails/arbalist_uncommon.png")}
                              alt="arbalist"
                              style={{ maxWidth: "100%" }}
                            />
                          )}
                        </>
                      )}

                      {saleItem.class === 5 && (
                        <>
                          {saleItem.powerScore > 205000 ? (
                            <img
                              src={require("./assets/images/thumbnails/lancer_legendary.png")}
                              alt="lancer"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 170000 ? (
                            <img
                              src={require("./assets/images/thumbnails/lancer_epic.png")}
                              alt="lancer"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 135000 ? (
                            <img
                              src={require("./assets/images/thumbnails/lancer_rare.png")}
                              alt="lancer"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : (
                            <img
                              src={require("./assets/images/thumbnails/lancer_uncommon.png")}
                              alt="lancer"
                              style={{ maxWidth: "100%" }}
                            />
                          )}
                        </>
                      )}

                      {saleItem.class === 6 && (
                        <>
                          {saleItem.powerScore > 205000 ? (
                            <img
                              src={require("./assets/images/thumbnails/darkist_legendary.png")}
                              alt="darkist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 170000 ? (
                            <img
                              src={require("./assets/images/thumbnails/darkist_epic.png")}
                              alt="darkist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : saleItem.powerScore > 135000 ? (
                            <img
                              src={require("./assets/images/thumbnails/darkist_rare.png")}
                              alt="darkist"
                              style={{ maxWidth: "100%" }}
                            />
                          ) : (
                            <img
                              src={require("./assets/images/thumbnails/darkist_uncommon.png")}
                              alt="darkist"
                              style={{ maxWidth: "100%" }}
                            />
                          )}
                        </>
                      )}

                      <div className="p-3">
                        <p className="text-white justify-center flex mb-3 font-bold">
                          {saleItem.characterName}
                        </p>
                        <p className="text-white">Level: {saleItem.lv}</p>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-white">POWER Score:</p>
                          </div>
                          <div>
                            <p className="text-white">
                              {saleItem.powerScore.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {/* 
                      <div className="flex justify-between">
                        <div>
                          <p className="text-white">[L] Spirit:</p>
                        </div>
                        <div>
                          <p className="text-white">2</p>
                        </div>
                      </div> */}

                        {/* <div>
                          <p className="text-white">Codex:</p>
                        </div> */}
                        {/* 
                      <div className="mt-5">
                        <p className="text-white">Codex:</p> */}

                        {/* {codexData.data. map((saleItem) => (
                          <div>

                          </div>
                        ))} */}
                        {/* {codexData.data &&
                          Object.values(codexData.data).map((codex) => (
                            <div
                              className="flex justify-between"
                              key={codex.codexName}
                            >
                              <ul className="list-disc px-5">
                                <li className="text-white">
                                  {codex.codexName}
                                </li>
                              </ul>

                              <p className="text-white">{codex.completed}</p>
                            </div>
                            // <p className="text-white">
                            //   {codex.codexName}
                            // </p>
                            //  <p className="text-white">
                            //       Total Count: {saleItem.totalCount}
                            //     </p> 
                            // <p className="text-white">{codex.completed}</p>
                            // <p className="text-white">
                            //       In Progress: {saleItem.inprogress}
                            //     </p>
                          ))} */}
                        {/* </div> */}

                        <div className=""></div>
                      </div>

                      <div className="p-3 bg-slate-800 rounded-b-lg">
                        <div className="flex justify-between">
                          <p className="text-white">Price:</p>

                          <div className="flex flex-row items-center justify-end gap-2">
                            <img
                              src="https://file.mir4global.com/xdraco/img/mobile/popup/ico-wemix-credit-logo.webp"
                              alt="arbalist"
                              style={{ maxWidth: "20%" }}
                            />
                            <p className="text-white font-bold">
                              {saleItem.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading latest sale data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
