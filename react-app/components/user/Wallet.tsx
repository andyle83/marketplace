import * as React from "react";
import {useContractKit} from "@celo-tools/use-contractkit";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateProfile} from "@/state/app/reducer";

export default function Wallet() {
  const { address, network, kit, connect, destroy } = useContractKit();
  const [balance, setBalance] = useState<string>('');
  const dispatch = useDispatch();

  const  fetchBalance = async () => {
    const { cUSD } = await kit.getTotalBalance(address);
    const roundingBalance = parseFloat(kit.web3.utils.fromWei(cUSD.toString(), 'ether')).toFixed(2);
    setBalance(roundingBalance);
  }

  const disconnect = async () => {
    await destroy();
    dispatch(updateProfile( { address: null, balance: '' }));
  }

  useEffect(() => {
    if (address) {
      fetchBalance().catch(e => console.error(e));

      // update profile (address & balance)
      dispatch(updateProfile({ address, balance }));
    }
  }, [network, address])

  return !address ? (
      <button type="button" className="btn btn-outline-primary" style={{ alignItems: "center"}}
              onClick={() => connect().catch(e => console.log(e))}
      >
        <i className="bi bi-wallet" style={{marginRight: "0.3rem"}}></i> Connect
      </button>
    ) :
    (
      <button type="button" className="btn btn-outline-primary" style={{display: "flex", alignItems: "center"}}>
        <i className="bi bi-x-circle" onClick={disconnect} style={{marginRight: "0.5rem"}}></i>
        <span id="balance" >{balance}</span>cUSD
      </button>
    )
}