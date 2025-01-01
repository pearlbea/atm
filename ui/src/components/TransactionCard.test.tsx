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
        />
        );
        await user.click(screen.getByText("Submit"));
        expect(handleTransaction).toHaveBeenCalled();
    });
})