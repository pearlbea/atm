import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TransactionCard } from './TransactionCard';

describe('TransactionCard', () => {

    const handleTransaction = jest.fn();
    const setAmount = jest.fn();

    it('should display a labeled input', () => {
        render(
          <TransactionCard
            label="Deposit"
            handleTransaction={handleTransaction}
            setAmount={setAmount}
            transactionError={{valid: true, message: ''}}
          />
        );
        expect(screen.getByLabelText('Deposit Amount')).toBeTruthy();
    });

    it('should call setAmount on change', async () => {
        const user = userEvent.setup();
        render(
          <TransactionCard
            label="Deposit"
            handleTransaction={handleTransaction}
            setAmount={setAmount}
            transactionError={{ valid: true, message: "" }}
          />
        );
        await user.type(screen.getByLabelText("Deposit Amount"), '200');
        expect(setAmount).toHaveBeenCalled();
        await user.click(screen.getByText("Submit"));
        expect(handleTransaction).toHaveBeenCalled();
    })

    it("should call handleTransaction on submit", async () => {
        const user = userEvent.setup();
        render(
          <TransactionCard
            label="Deposit"
            handleTransaction={handleTransaction}
            setAmount={setAmount}
            transactionError={{ valid: true, message: "" }}
          />
        );
        await user.click(screen.getByText("Submit"));
        expect(handleTransaction).toHaveBeenCalled();
    });
    it("should display an error message on error", async () => {
        render(
        <TransactionCard
            label="Deposit"
            handleTransaction={handleTransaction}
            setAmount={setAmount}
            transactionError={{ valid: false, message: "This is an error" }}
        />
        );
        expect(screen.getByText('This is an error')).toBeTruthy();
    });
})