"use client";

import GateCentered from "./GateCentered";
import GateSplit from "./GateSplit";

type Settings = {
  pageTitle: string;
  pageSubtitle: string;
  buttonText: string;
  buttonImage?: string;
  theme?: string;
  backgroundImageUrl?: string;
  textColor?: string;
  fontFamily?: string;
  particleEffect?: string;
  customAccentColor?: string;
  customCursor?: string;
  logoUrl?: string;
  discordUrl?: string;
  facebookUrl?: string;
  entryAnimation?: string;
  buttonShape?: string;
  partnersEnabled?: boolean;
  partners?: { name: string; url: string }[];
  gateLayout?: string;
};

export default function GateClient({ settings }: { settings: Settings }) {
  if (settings.gateLayout === "centered") {
    return <GateCentered settings={settings as any} />;
  }
  return <GateSplit settings={settings as any} />;
}
