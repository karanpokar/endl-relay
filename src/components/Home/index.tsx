import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React from "react";
import { SendTransactionSection } from "./_components/SendTransactionSection";

export default function Auth() {
  const { user, primaryWallet, handleLogOut } = useDynamicContext();
  return (
    <>
      <div
        id="test"
        className="min-h-screen flex flex-col items-center w-[100%] justify-center bg-[white] w-full"
      >
        <div className="flex sm:w-[400px] w-[100%] sm:h-[600px] h-screen rounded-[32px] border border-[rgba(0,0,0,0.1)] border-[1.5px] flex-row items-center justify-center bg-white">
          {user ? <SendTransactionSection /> : <DynamicWidget />}
        </div>
      </div>
    </>
  );
}
