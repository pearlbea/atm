const ROOT_URL = "http://localhost:3000";

export async function deposit({ accountNumber, depositAmount} : { accountNumber: number, depositAmount: number }) {
    const requestOptions = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: depositAmount }),
    };
    const response = await fetch(
      `${ROOT_URL}/transactions/${accountNumber}/deposit`,
      requestOptions
    );
    const data = await response.json();
    return data;
}

export async function withdraw({ accountNumber, withdrawAmount}: { accountNumber: number, withdrawAmount: number }) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({amount: withdrawAmount})
    }
    const response = await fetch(
      `${ROOT_URL}/transactions/${accountNumber}/withdraw`, 
    requestOptions
    );
    const data = await response.json();
    return data
}

export async function logTransaction({accountNumber, amount, type } :{accountNumber: number, amount: number, type: string})  {
  const requestOptions = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, type }),
  };
  const response = await fetch(
    `${ROOT_URL}/transactions/${accountNumber}/log`,
    requestOptions
  );
  const data = await response.json();
  return data;
}