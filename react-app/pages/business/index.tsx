import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, number } from "yup";
import {
  BusinessRegisterLabel,
  BusinessWalletRequest,
  BusinessWelcomeMessage, ValidBusinessLocation,
  ValidBusinessName, ValidPhoneNumber,
} from "@/constants";
import {yupResolver} from "@hookform/resolvers/yup";
import {GetServerSideProps} from "next";
import prisma from "@/lib/prisma";
import {RootStateOrAny, useSelector} from "react-redux";
import axios from "axios";
import {useContractKit} from "@celo-tools/use-contractkit";

type IFormInputs = {
  name: string;
  address: string;
  balance: number;
  location: string;
  phone: string;
}

const validBusinessSchema = object({
  name: string().required(ValidBusinessName),
  location: string().required(ValidBusinessLocation),
  phone: string().required(ValidPhoneNumber)
});

type BusinessProps = {
  address: string;
  phone: string;
}

type Props = {
  businesses: BusinessProps[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const businesses = await prisma.business.findMany({
    select: {
      id: true,
      address: true,
      balance: true,
      location: true,
      phone: true,
    }
  });

  return { props : { businesses }}
}

const Business: React.FC<Props> = ({ businesses}): JSX.Element => {

  // select address from contractkit rather than useSelector help to avoid render incorrect initial
  const { address } = useContractKit();

  const { balance } = useSelector(
    (state:RootStateOrAny) => state.app.profile
  );

  const isBusiness = businesses.length > 0 && businesses.find(business => business.address === address);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(validBusinessSchema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = async data => {
    console.log(JSON.stringify(data));
  }

  return (
    <AppLayout>
      {/* Only display welcome when customer is not register yet */}
      {!isBusiness && address && (<div className="alert alert-warning" role="alert">
        {BusinessWelcomeMessage}
      </div>)}
      {!address ? <div className="text-center p-5">{BusinessWalletRequest}</div> :
        <main id="marketplace">
          <div className="card mb-4">
            <div className="card-header text-center">
              {BusinessRegisterLabel}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} id="newBusiness">
                <div className="row mb-3 mt-3 justify-content-center">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Business Name</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="name" {...register("name", { required: true })}  />
                    <div role="alert" className="mt-2 text-danger">{errors.name?.message}</div>
                  </div>
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
                    <div role="alert" className="mt-2 text-danger">{errors.location?.message}</div>
                  </div>
                </div>
                <div className="row mb-4 justify-content-center">
                  <label htmlFor="balance" className="col-sm-2 col-form-label">Wallet balance</label>
                  <div className="col-sm-3">
                    <div className="input-group">
                      <input type="text" className="form-control" id="balance" disabled value={balance} />
                      <div className="input-group-append">
                        <span className="input-group-text">cUSD</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3" />
                </div>
                <div className="row mb-4 justify-content-center">
                  <label htmlFor="phone" className="col-sm-2 col-form-label">Mobile Number</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="phone" placeholder="000-000-0000" {...register("phone", { required: true })}  />
                    <div role="alert" className="mt-2 text-danger">{errors.phone?.message}</div>
                  </div>
                  <div className="col-sm-3" />
                </div>
                <div className="row mb-4 justify-content-center">
                  <div className="col-sm-4">
                    <button type="submit" className="btn btn-outline-primary tw-mr-2" form="newBusiness">{!isBusiness ? "Submit" : "Update"}</button>
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