import {
  Box,
  Grid,
  Heading,
  Stat,
  Tabs,
} from '@chakra-ui/react';
import ProductManagement from './Product/ProductManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

const Dashboard:React.FC = () => {
  return (
    <Box p={8}>
      <Heading mb={6}>Admin Dashboard</Heading>
      
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
        <Stat.Root>
          <Stat.Label>Total Orders</Stat.Label>
          <Stat.ValueText >345</Stat.ValueText >
          <Stat.HelpText>This month</Stat.HelpText>
        </Stat.Root>
        <Stat.Root>
          <Stat.Label>Total Revenue</Stat.Label>
          <Stat.ValueText >ksh12,345</Stat.ValueText >
          <Stat.HelpText>This month</Stat.HelpText>
        </Stat.Root>
        <Stat.Root>
          <Stat.Label>Active Users</Stat.Label>
          <Stat.ValueText >234</Stat.ValueText >
          <Stat.HelpText>Last 30 days</Stat.HelpText>
        </Stat.Root>
        <Stat.Root>
          <Stat.Label>Low Stock Items</Stat.Label>
          <Stat.ValueText >5</Stat.ValueText >
          <Stat.HelpText>Needs attention</Stat.HelpText>
        </Stat.Root>
      </Grid>

      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value='products'>Products</Tabs.Trigger>
          <Tabs.Trigger value='orders'>Orders</Tabs.Trigger>
          <Tabs.Trigger value='users'>Users</Tabs.Trigger>
        </Tabs.List>

        <Tabs.List>
          <Tabs.Content value='products'>
            <ProductManagement />
          </Tabs.Content>
          <Tabs.Content value='orders'>
            <OrderManagement />
          </Tabs.Content>
          <Tabs.Content value='users'>
            <UserManagement />
          </Tabs.Content>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};
export default Dashboard;