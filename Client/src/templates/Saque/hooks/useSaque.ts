import { useState, useEffect, useRef } from "react";
import useUser from "../../../hooks/useUser";
import useEthers from "../../../services/ethers";
import { getLimitValue } from "../functions/getLimitValue";
import useMutateWithdraw from "./useMutateWithdraw";

const useSaque = () => {
  const [value, setValue] = useState(0);
  const [isAproved, setIsAproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useUser();
  const {
    aproveWithdraw,
    checkIfIsAproved,
    provider,
    signer,
    getMinMaxAmountToWithdraw,
  } = useEthers();
  const { mutation, feedback } = useMutateWithdraw(data!);
  const percent95 = value * 0.95;
  const minMaxRef = useRef({ min: 1000, max: 10000 });

  useEffect(() => {
    const check = async () => {
      if (!provider && !signer) return;
      try {
        const isAproved = await checkIfIsAproved();
        setIsAproved(isAproved);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    const getMinMax = async () => {
      if (!provider && !signer) return;
      try {
        const minMax = await getMinMaxAmountToWithdraw();
        if (minMax) minMaxRef.current = minMax;
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    getMinMax();
    check();
  }, [provider, signer]);

  const handleAproveWithdraw = async () => {
    try {
      setIsLoading(true);
      await aproveWithdraw();
      setIsAproved(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    await mutation.mutateAsync({
      wallet: data?.wallet!,
      value,
    });
    setValue(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const limit = getLimitValue(Number(data?.saldo), value);

    if (isNaN(limit)) return;

    if (limit > minMaxRef.current.max) return setValue(minMaxRef.current.max);

    setValue(limit);
  };

  return {
    handleWithdraw,
    handleChange,
    handleAproveWithdraw,
    setValue,
    value,
    data,
    feedback,
    mutation,
    percent95,
    isAproved,
    isLoading,
    minMax: minMaxRef.current,
  };
};

export default useSaque;
