import { Alert, Button, Card, CardContent, TextField } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

interface TransactionCardProps {
  label: string;
  handleTransaction: () => Promise<void>;
  setAmount: Dispatch<SetStateAction<number>>;
  transactionError: { valid: boolean, message: string };
}

export const TransactionCard = (props: TransactionCardProps) => {
  const { label, setAmount, handleTransaction, transactionError } = props;
  return (
    <Card className="transaction-card">
      <CardContent>
        <form>
          <h3>{label}</h3>
          <TextField
            label={`${label} Amount`}
            variant="outlined"
            type="number"
            sx={{
              display: "flex",
              margin: "auto",
            }}
            onChange={(e) => setAmount(+e.target.value)}
          />
          {!transactionError.valid ? (
            <Alert sx={{ my: 2 }} severity="error">
              {transactionError.message}
            </Alert>
          ) : null}
          <Button
            variant="contained"
            sx={{
              display: "flex",
              margin: "auto",
              marginTop: 2,
            }}
            onClick={handleTransaction}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
