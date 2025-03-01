import { FC, ReactNode } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

interface ITabsGroup {
  tabs: {
    label: string;
    content: ReactNode;
  }[];
  tabListClassName?: string;
  tabPanelsClassName?: string;
}
const TabsGroup: FC<ITabsGroup> = ({
  tabs,
  tabListClassName,
  tabPanelsClassName,
}) => {
  return (
    <div className="tabs__group relative w-full">
      <TabGroup>
        <TabList className={"mb-5 tabs-list " + tabListClassName}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={
                "py-2 px-3 border-[#111] data-[selected]:border-b-3 data-[selected]:font-bold mr-3 outline-none"
              }
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className={`tab-panels ${tabPanelsClassName}`}>
          {tabs.map((tab, index) => (
            <TabPanel key={index} className="pb-4">
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TabsGroup;
