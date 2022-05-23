import * as React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {updateProfile} from "@/state/app/reducer";

const Wallet = ():JSX.Element => {
  const { address, network, kit, connect, destroy } = useContractKit();
  const [balance, setBalance] = useState<string>('');
  const dispatch = useDispatch();

  const { balance: rBalance } = useSelector(
    (state:RootStateOrAny) => state.app.profile
  );

  const fetchBalance = useCallback(async () => {
    const { cUSD } = await kit.getTotalBalance(address);
    const roundingBalance = parseFloat(kit.web3.utils.fromWei(cUSD.toString(), 'ether')).toFixed(2);

    // update balance in wallet
    setBalance(roundingBalance);

    // update redux
    dispatch(updateProfile({address, balance: roundingBalance}))

    // upsert user data
    await axios.post("/api/prisma/upsertUser", {
      address: address.toLowerCase(),
      balance: parseFloat(roundingBalance)
    })
  }, [address, kit]);

  useEffect(() => {
    if (address) {
      if (parseFloat(rBalance) == 0) {
        fetchBalance().catch(e => console.error(e));
      } else {
        // store as a single source of true
        setBalance(rBalance);
      }
    }
  }, [network, address, fetchBalance, rBalance])

  const onDisconnect = useCallback(async () => {
    await destroy();
    dispatch(updateProfile({ address: null, balance: 0 }))
  }, [destroy]);

  return !address ? (
      <button type="button"
              className="btn btn-outline-primary"
              style={{ alignItems: "center"}}
              onClick={() => connect().catch(e => console.log(e))}>
        <i className="bi bi-wallet" style={{marginRight: "0.3rem"}}></i> Connect
      </button>
    ) :
    (
      <button type="button"
              className="btn btn-outline-primary"
              style={{display: "flex", alignItems: "center"}}>
        <i className="bi bi-x-circle" onClick={onDisconnect} style={{marginRight: "0.5rem"}}></i>
        <span id="balance" >{balance}</span>cUSD
      </button>
    )
}

export default Wallet;