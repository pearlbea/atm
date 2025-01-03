import { useState } from "react"
import {account} from "../Types/Account"
import Paper from "@mui/material/Paper/Paper";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { TransactionCard } from "./TransactionCard";
import { isValidDeposit, isValidWithdrawl } from "../utils";
import { deposit, withdraw } from "../requests";

type AccountDashboardProps = {
  account: account;
  signOut: () => Promise<void>;
}

export const AccountDashboard = (props: AccountDashboardProps) => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [account, setAccount] = useState(props.account); 
  const [withdrawError, setWithdrawError] = useState({ valid: true, message: ""});
  const [depositError, setDepositError] = useState({ valid: true, message: "" });
  const [status, setStatus] = useState('idle'); // idle, loading, success, or error

  const {signOut} = props;

  const depositFunds = async () => {
    setDepositError({ valid: true, message: '' })
    const isValid = isValidDeposit({
      accountInfo: account,
      depositAmount,
    });
    if (!isValid.valid) {
      return setDepositError(isValid);
    }
    const response = await deposit({ accountNumber: account.accountNumber, depositAmount });
    if (response.account_number) {
      setStatus("success");
      setAccount({
        accountNumber: response.account_number,
        name: response.name,
        amount: response.amount,
        type: response.type,
        creditLimit: response.credit_limit
      });
      setDepositAmount(0);
    } else {
      setStatus("error");
    }
  }

  const withdrawFunds = async () => {
    setWithdrawError({ valid: true, message: "" });
    const isValid = isValidWithdrawl({ accountInfo: account, withdrawAmount});
    if (!isValid.valid) {
      return setWithdrawError(isValid)
    }
    const response = await withdraw({ accountNumber: account.accountNumber, withdrawAmount});
    if (response.account_number) {
      setStatus("success")
      setAccount({
        accountNumber: response.account_number,
        name: response.name,
        amount: response.amount,
        type: response.type,
        creditLimit: response.credit_limit
      });

    } else {
      setStatus('error')
    }
  };
  
  return (
    <Paper className="account-dashboard">
      <div className="dashboard-header">
        <h1>Hello, {account.name}!</h1>
        <Button variant="contained" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <h2>Balance: ${account.amount}</h2>
      {status === 'error' ? <Alert severity="error" onClose={() => setStatus('idle')}>Something went wrong. Please try again later.</Alert> : null}
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <TransactionCard
            label="Deposit"
            handleTransaction={depositFunds}
            setAmount={setDepositAmount}
            transactionError={depositError}
          />
        </Grid>
        <Grid item xs={6}>
          <TransactionCard
            label="Withdraw"
            handleTransaction={withdrawFunds}
            setAmount={setWithdrawAmount}
            transactionError={withdrawError}
          />
        </Grid>
      </Grid>
      <Snackbar
        onClose={() => setStatus("idle")}
        open={status === "success"}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setStatus("idle")} severity="success">
          Your transaction was successful!
        </Alert>
      </Snackbar>
    </Paper>
  );
}