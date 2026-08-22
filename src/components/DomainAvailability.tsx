"use client";

import { ArrowRight, CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { FormEvent, useState } from "react";

type CheckState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "available"; subdomain: string }
  | { status: "taken"; subdomain: string }
  | { status: "error"; message: string };

export default function DomainAvailability() {
  const [subdomain, setSubdomain] = useState("");
  const [check, setCheck] = useState<CheckState>({ status: "idle" });

  async function checkAvailability(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = subdomain.trim().toLowerCase();
    setSubdomain(normalized);

    if (!normalized) {
      setCheck({ status: "error", message: "Enter a faction name to check." });
      return;
    }

    setCheck({ status: "loading" });

    try {
      const response = await fetch(`/api/domains/availability?subdomain=${encodeURIComponent(normalized)}`);
      const data = (await response.json()) as {
        available?: boolean;
        error?: string;
        subdomain?: string;
      };

      if (!response.ok) {
        setCheck({ status: "error", message: data.error ?? "Unable to check this name." });
        return;
      }

      setCheck(
        data.available
          ? { status: "available", subdomain: data.subdomain ?? normalized }
          : { status: "taken", subdomain: data.subdomain ?? normalized },
      );
    } catch {
      setCheck({ status: "error", message: "Unable to reach the availability service." });
    }
  }

  const message =
    check.status === "available"
      ? `${check.subdomain}.lastname.site is available.`
      : check.status === "taken"
        ? `${check.subdomain}.lastname.site is already claimed.`
        : check.status === "error"
          ? check.message
          : "";

  return (
    <div className="w-full max-w-[700px]">
      <form
        onSubmit={checkAvailability}
        className="w-full bg-[#0a0a0a] border border-[#222222] rounded-[18px] p-[12px] flex flex-col md:flex-row items-stretch gap-[12px] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group hover:border-[#333333] transition-colors"
      >
        <label className="sr-only" htmlFor="subdomain">
          Faction subdomain
        </label>
        <div className="flex-1 flex items-center bg-[#050505] rounded-[12px] px-[24px] py-[18px] border border-[#111111] group-hover:border-[#0084ff]/30 transition-colors min-w-0">
          <span className="text-[#555555] font-[700] text-[16px] md:text-[20px] select-none">https://</span>
          <input
            id="subdomain"
            type="text"
            value={subdomain}
            onChange={(event) => {
              setSubdomain(event.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase());
              if (check.status !== "idle") setCheck({ status: "idle" });
            }}
            placeholder="faction"
            maxLength={63}
            autoComplete="off"
            spellCheck={false}
            className="bg-transparent border-none text-white text-[16px] md:text-[20px] font-[900] uppercase tracking-[1px] w-full min-w-0 focus:outline-none placeholder:text-[#333333] text-right px-[4px]"
          />
          <span className="text-[#0084ff] font-[700] text-[16px] md:text-[20px] select-none tracking-[1px] whitespace-nowrap">.lastname.site</span>
        </div>

        <button
          type="submit"
          disabled={check.status === "loading"}
          className="bg-[#ededed] hover:bg-white disabled:cursor-wait disabled:opacity-60 text-[#050505] flex items-center justify-center gap-[12px] px-[36px] py-[18px] rounded-[12px] text-[12px] font-[900] tracking-[2px] uppercase transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {check.status === "loading" ? "Checking" : "Verify"}
          {check.status === "loading" ? <LoaderCircle className="w-[16px] h-[16px] animate-spin" /> : <ArrowRight className="w-[16px] h-[16px]" />}
        </button>
      </form>

      <div aria-live="polite" className="min-h-[28px] mt-[14px] flex items-center justify-center gap-[8px] text-[12px] tracking-[1px] uppercase">
        {check.status === "available" && <CheckCircle2 className="w-[16px] h-[16px] text-[#22c55e]" />}
        {(check.status === "taken" || check.status === "error") && <XCircle className="w-[16px] h-[16px] text-[#ef4444]" />}
        <span className={check.status === "available" ? "text-[#22c55e]" : check.status === "loading" ? "text-[#555555]" : "text-[#ef4444]"}>{message}</span>
      </div>
    </div>
  );
}
