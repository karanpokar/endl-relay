"use client";

import React, { useState } from "react";
/*@ts-ignore*/
import OTPInput from "otp-input-react";

export default function OtpComponent({ setVerified }: any) {
  const [OTP, setOTP] = useState("");

  const submit = async () => {
    if (OTP == "4321") {
      setTimeout(() => {
        setVerified(true);
      }, 0);
    } else {
      setVerified(false);
      alert("Wrong MFA");
    }
  };

  return (
    <>
      <OTPInput
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={4}
        otpType="number"
        disabled={false}
        inputClassName={
          "text-[black] mt-[20px] rounded-[4px] min-h-[44px] min-w-[44px] border-[1px] border-[black]"
        }
      />
      <button
        onClick={() => {
          submit();
        }}
        className="bg-[blue] h-[44px] my-[12px] w-[100%] mt-[40px] rounded-[12px]"
      >
        Verify MFA
      </button>
    </>
  );
}
