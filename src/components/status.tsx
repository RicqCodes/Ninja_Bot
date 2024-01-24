import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const status = [
  {
    tokenName: "INJ/ETH",
    chain: "ETH",
    status: "Completed",
    slippage: "5%",
    quantity: "500",
    totalAmount: "$250.00",
  },
  {
    tokenName: "MUSE/ETH",
    chain: "ETH",
    status: "Pending",
    slippage: "4%",
    quantity: "450",
    totalAmount: "$150.00",
  },
  {
    tokenName: "BTC/ETH",
    chain: "OPTIMISM",
    status: "Failed",
    slippage: "6%",
    quantity: "6000",
    totalAmount: "$350.00",
  },
  {
    tokenName: "BNB/ETH",
    chain: "ARBITRUM",
    status: "Completed",
    slippage: "5%",
    quantity: "6.3M",
    totalAmount: "$450.00",
  },
  {
    tokenName: "BANK/BNB",
    chain: "BSC",
    status: "Pending",
    slippage: "3%",
    quantity: "3.4B",
    totalAmount: "$550.00",
  },
  {
    tokenName: "CHP/ETH",
    chain: "ETH",
    status: "Completed",
    slippage: "7%",
    quantity: "100k",
    totalAmount: "$200.00",
  },
  {
    tokenName: "PXY/BNB",
    chain: "BSC",
    status: "Completed",
    slippage: "3%",
    quantity: "502k",
    totalAmount: "$300.00",
  },
];

export function Status() {
  return (
    <div className="pt-6 font-sans">
      <Table className="">
        <TableCaption>A list of your recent bot instances.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Ticker</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Chain</TableHead>
            <TableHead>Slippage</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {status.map((stat) => (
            <TableRow key={stat.tokenName}>
              <TableCell className="font-medium">{stat.tokenName}</TableCell>
              <TableCell className="font-medium">{stat.status}</TableCell>
              <TableCell className="font-medium">{stat.chain}</TableCell>
              <TableCell className="font-medium">{stat.slippage}</TableCell>
              <TableCell className="font-medium text-right">
                {stat.quantity}
              </TableCell>
              <TableCell className="font-medium text-right">
                {stat.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
