import { useState } from "react"
import {account} from "../Types/Account"
import Paper from "@mui/material/Paper/Paper";
import { Button, Grid } from "@mui/material";
import { TransactionCard } from "./TransactionCard";

type AccountDashboardProps = {
  account: account;
  signOut: () => Promise<void>;
}

export const AccountDashboard = (props: AccountDashboardProps) => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [account, setAccount] = useState(props.account); 

  const {signOut} = props;

  const depositFunds = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({amount: depositAmount})
    }
    const response = await fetch(`http://localhost:3000/transactions/${account.accountNumber}/deposit`, requestOptions);
    const data = await response.json();
    setAccount({
      accountNumber: data.account_number,
      name: data.name,
      amount: data.amount,
      type: data.type,
      creditLimit: data.credit_limit
    });
  }

  const withdrawFunds = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({amount: withdrawAmount})
    }
    const response = await fetch(`http://localhost:3000/transactions/${account.accountNumber}/withdraw`, requestOptions);
    const data = await response.json();
    setAccount({
      accountNumber: data.account_number,
      name: data.name,
      amount: data.amount,
      type: data.type,
      creditLimit: data.credit_limit
    });
  }

  return (
    <Paper className="account-dashboard">
      <div className="dashboard-header">
        <h1>Hello, {account.name}!</h1>
        <Button variant="contained" onClick={signOut}>Sign Out</Button>
      </div>
      <h2>Balance: ${account.amount}</h2>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <TransactionCard label="Deposit" handleTransaction={depositFunds} setAmount={setDepositAmount} />
        </Grid>
        <Grid item xs={6}>
          <TransactionCard label="Withdraw" handleTransaction={withdrawFunds} setAmount={setWithdrawAmount} />
        </Grid>
      </Grid>
    </Paper>
    
  )
}