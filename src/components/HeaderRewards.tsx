"use client";

import { useEffect, useState } from "react";
import { useRewardCounter } from "@/src/hooks/useStreamingNumber";
import { calculateBatchRewards, REWARDS_PER_SECOND } from "@/src/lib/rewards";

export function HeaderRewards() {
  const [initialTotal, setInitialTotal] = useState<number>(0);
  const { currentRewards } = useRewardCounter(initialTotal, REWARDS_PER_SECOND, 250);

  useEffect(() => {
    let mounted = true;

    async function fetchTotal() {
      try {
        const res = await fetch("/api/tokens?type=all");
        if (!res.ok) return;
        const json = await res.json();
        const tokens = json.data || [];

        // Build staking pool list for batch calculation
        const pools = tokens
          .map((t: any) => ({ stakingPool: t.staking_pool }))
          .filter((p: any) => p.stakingPool);

        if (pools.length === 0) {
          if (mounted) setInitialTotal(0);
          return;
        }

        const results = await calculateBatchRewards(pools);
        const total = results.reduce((acc: number, r: any) => acc + (r.totalStreamed || 0), 0);
        if (mounted) setInitialTotal(total);
      } catch (e) {
        console.warn("HeaderRewards: failed to fetch total rewards", e);
      }
    }

    fetchTotal();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-2 text-right">
      <div className="text-xs text-base-content/60">{currentRewards.toLocaleString(undefined, {maximumFractionDigits:0, minimumFractionDigits:0})}</div>
      <div className="text-[10px] text-base-content/50">rewards streamed</div>
    </div>
  );
}
