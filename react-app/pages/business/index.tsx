import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { object, string, number, mixed } from "yup";
import { useContractKit } from "@celo-tools/use-contractkit";
import { BusinessWalletRequest } from "@/constants";

type IFormInputs = {
  name: string;
  address: string;
  location: string;
  phone: string;
}

const validBusinessSchema = object({
  name: string().required("Required Full Name"),
  address: string().required("Wallet Address"),
  location: string().required("Register Business Location"),
  phone: string().required("Contact Phone Number")
}).required();

const Business: React.FC = (): JSX.Element => {
  const { kit, address } = useContractKit();
  return (
    <AppLayout>
      {!address ? <div className="text-center p-5">{BusinessWalletRequest}</div> :
        <main id="marketplace">
          <div className="card mb-4">
            <div className="card-header">
              Business Apply Form
            </div>
            <div className="card-body">
              Here is form fields
            </div>
          </div>
        </main>
      }
    </AppLayout>
  )
}

export default Business;