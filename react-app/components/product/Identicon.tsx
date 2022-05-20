import * as React from "react";
import blockies from 'ethereum-blockies';

type IdenticonProps = {
  address: string;
}

const Identicon = ({ address }: IdenticonProps): JSX.Element => {
  const icon = blockies
    .create({
      seed: address,
      size: 8,
      scale: 16,
    })
    .toDataURL()

  const transaction = `https://alfajores-blockscout.celo-testnet.org/address/${address}/transactions`;

  return (
    <div className="rounded-circle overflow-hidden d-inline-block border border-white border-2 shadow-sm m-0">
      <a href={transaction} target="_blank" rel="noreferrer">
        <img src={icon} width={48} height={48} alt={address} />
      </a>
    </div>
  )
}

export default Identicon;