import GateTemplateTest from "../../GateTemplateTest";

export default function TestGatePage() {
  const mockSettings = {
    pageTitle: "WINTERFELL VEGA",
    pageSubtitle: "WELCOME TO THE ALLIANCE",
    buttonText: "ENTER WEBSITE",
    theme: "cyberpunk",
    customAccentColor: "#00ff88",
    particleEffect: "particles",
    backgroundImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    fontFamily: "sans",
    buttonShape: "trapezoid"
  };

  return <GateTemplateTest settings={mockSettings} />;
}
