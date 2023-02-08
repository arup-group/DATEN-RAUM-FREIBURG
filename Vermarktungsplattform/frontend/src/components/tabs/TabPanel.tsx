import { Box, Container } from "@mui/material";

/**
 * @param { React.ReactNode} children - React child elements to nest in tab panel
 * @param {number} index - Tab index
 * @param {number} value - Tab value
 */

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//Tab panel constuctor to nest tab child elements
export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
};

//helper function to include aria controls
export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
