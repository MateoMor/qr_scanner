import { useContext } from "react";

import AlertFrame from "./AlertFrame";
import AlertOption from "./AlertOption";
import { AppStateContext } from "../../context/AppStateProvider";
import { storeDataAsync } from "../../utils/AsyncStorageFunctions";

function OptionEngineAlert({ selectedTheme, setSelectedTheme }) {
  const {
    globalItemsColor,
    setIsEngineAlertShown,
    setIsHeaderBlurred,
    searchEngine,
    setSearchEngine,
  } = useContext(AppStateContext);

  const closeAlert = () => {
    setIsEngineAlertShown(false);
    setIsHeaderBlurred(false);
  };

  return (
    <AlertFrame
      itemsColor={globalItemsColor}
      closeAlert={() => {
        closeAlert();
      }}
    >
      <AlertOption
        selected={searchEngine === "google"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          closeAlert();
          setSearchEngine("google");
          await storeDataAsync("searchEngine", "google");   // Function to change the search engine preference
        }}
      >
        Google
      </AlertOption>
      <AlertOption
        selected={searchEngine === "bing"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          closeAlert();
          setSearchEngine("bing");
          await storeDataAsync("searchEngine", "bing");
        }}
      >
        Bing
      </AlertOption>
      <AlertOption
        selected={searchEngine === "yahoo"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          closeAlert();
          setSearchEngine("yahoo");
          await storeDataAsync("searchEngine", "yahoo");
        }}
      >
        Yahoo
      </AlertOption>
      <AlertOption
        selected={searchEngine === "ecosia"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          closeAlert();
          setSearchEngine("ecosia");
          await storeDataAsync("searchEngine", "ecosia");
        }}
      >
        Ecosia
      </AlertOption>
      {/* Engines to implement: duckduckgo, brave */}
    </AlertFrame>
  );
}

export default OptionEngineAlert;
