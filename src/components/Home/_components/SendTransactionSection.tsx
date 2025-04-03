"use client";

import { FC, FormEventHandler, useState } from "react";

import { parseEther } from "viem";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
/*@ts-ignore*/
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import OtpComponent from "./OTPComponent";
import Link from "next/link";
import toast from "react-hot-toast";
import { isValidEvmAddress } from "@/components/utils/regex";

export const SendTransactionSection: FC = () => {
  const { primaryWallet }: any = useDynamicContext();
  const [verified, setVerified] = useState(false);

  const [txnHash, setTxnHash] = useState("");

  if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const address = formData.get("address") as string;
      const amount = formData.get("amount") as string;

      if(!isValidEvmAddress(address)){
        toast('Invalid EVM Address')
        return
      }

      const publicClient = await primaryWallet.getPublicClient();
      const walletClient = await primaryWallet.getWalletClient();

      const transaction: any = {
        to: address,
        value: amount ? parseEther(amount) : undefined,
      };

      const hash: any = await walletClient.sendTransaction(transaction);
      toast.success("Transaction Sent Successfully");
      const receipt = await publicClient.getTransactionReceipt({
        hash,
      });
      setTxnHash(receipt?.transactionHash);
    } catch (err) {
      console.log("Err");
      toast("Transaction Failed");
    }

    //console.log(receipt);
  };

  return (
    <div className="flex flex-col items-center h-[100%] pt-[20px] justify-start w-[100%]">
      <DynamicWidget buttonClassName="w-[90%]" />
      <div className="w-[90%] flex flex-row  mt-[20%] items-center justify-start ">
        <p className="text-[20px] text-bold text-[black] self-start my-[20px]">
          Send Gasless Transaction
        </p>
      </div>
      <form
        className="flex flex-col items-center  justify-start w-[90%]"
        onSubmit={onSubmit}
      >
        <p>Send to ETH address</p>
        <input
          className="min-h-[44px] rounded-[12px] border-[1px] -mt-[14px] mb-[12px] p-[12px] w-[100%] border-[rgba(0,0,0,0.2)] text-[black]"
          name="address"
          type="text"
          required
          placeholder="Address"
        />
        <input
          className="min-h-[44px] rounded-[12px] border-[1px] p-[12px] mt-[12px] w-[100%] border-[rgba(0,0,0,0.2)] text-[black]"
          name="amount"
          type="text"
          required
          placeholder="0.05"
        />
        {verified ? (
          <button
            className="bg-[blue] h-[44px] my-[12px] w-[100%] mt-[40px] rounded-[12px]"
            type="submit"
          >
            Send
          </button>
        ) : (
          <></>
        )}

        {/* <span data-testid="transaction-section-result-hash">{txnHash}</span> */}
      </form>
      <div className="w-[90%] flex flex-col items-center justify-center">
        {!verified && <OtpComponent setVerified={setVerified} />}
      </div>
      <div className="w-[90%] my-[20px] flex flex-col items-center justify-center">
        {txnHash && (
          <Link
            className="text-[black] underline"
            href={`https://amoy.polygonscan.com/tx/${txnHash}`}
          >
            Check Transaction
          </Link>
        )}
      </div>
    </div>
  );
};
