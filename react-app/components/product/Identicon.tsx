import * as React from "react";
import blockies from 'ethereum-blockies';
import Image from "next/image";

interface IdenticonProps {
  address: string;
}

export default function Identicon({ address }: IdenticonProps) {
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
        <Image src={icon} width={48} height={48} alt={address} />
      </a>
    </div>
  )
}
