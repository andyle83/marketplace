import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { useContractKit } from "@celo-tools/use-contractkit";
import { BusinessRegisterLabel, BusinessWalletRequest, BusinessWelcomeMessage } from "@/constants";
import {yupResolver} from "@hookform/resolvers/yup";

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
  const { address } = useContractKit();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(validBusinessSchema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = async data => {
    console.log(JSON.stringify(data));
  }

  return (
    <AppLayout>
      {/* Check if user is already a business by look up Prisma */}
      {!address ? <div className="text-center p-5">{BusinessWalletRequest}</div> :
        <main id="marketplace">
          <div className="alert alert-warning" role="alert">
            {BusinessWelcomeMessage}
          </div>
          <div className="card mb-4">
            <div className="card-header text-center">
              { BusinessRegisterLabel }
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} id="newBusiness">
                <div className="row mb-3 mt-3 justify-content-center">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Business Name</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="name" {...register("name", { required: true })}  />
                  </div>
                  <div role="alert" className="mt-2 text-danger">{errors.name?.message}</div>
                </div>
                <div className="row mb-4 justify-content-center">
                  <label htmlFor="address" className="col-sm-2 col-form-label">Wallet Address</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" disabled id="name" value={address} />
                  </div>
                </div>
                <div className="row mb-4 justify-content-center">
                  <label htmlFor="location" className="col-sm-2 col-form-label">Register Location</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="location" {...register("location", { required: true })}  />
                  </div>
                  <div role="alert" className="mt-2 text-danger">{errors.location?.message}</div>
                </div>
                <div className="row mb-4 justify-content-center">
                  <label htmlFor="phone" className="col-sm-2 col-form-label">Mobile Number</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="phone" placeholder="000-000-0000" {...register("phone", { required: true })}  />
                  </div>
                  <div className="col-sm-3" />
                  <div role="alert" className="mt-2 text-danger">{errors.phone?.message}</div>
                </div>
                <div className="row mb-4 justify-content-center">
                  <div className="col-sm-4">
                    <button type="submit" className="btn btn-outline-primary tw-mr-2" form="newBusiness">Submit</button>
                    <button type="reset" className="btn btn-outline-primary" form="newBusiness">Reset</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      }
    </AppLayout>
  )
}

export default Business;