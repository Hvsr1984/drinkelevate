import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WaterBubbles } from "@/components/WaterBubbles";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplets, Shield, FlaskConical, Thermometer, Atom, CheckCircle2, FileText, Calendar } from "lucide-react";

const purityMetrics = [
  { label: "TDS (Total Dissolved Solids)", value: 22, max: 500, unit: "ppm", status: "Excellent", icon: Atom },
  { label: "pH Level", value: 7.4, max: 14, unit: "", status: "Optimal", icon: FlaskConical },
  { label: "Turbidity", value: 0.1, max: 5, unit: "NTU", status: "Crystal Clear", icon: Droplets },
  { label: "Chlorine Residual", value: 0, max: 4, unit: "mg/L", status: "Zero", icon: Shield },
  { label: "Temperature at Bottling", value: 4, max: 25, unit: "°C", status: "Optimal", icon: Thermometer },
];

const mineralContent = [
  { mineral: "Calcium (Ca²⁺)", amount: "8.2 mg/L", benefit: "Bone & dental health" },
  { mineral: "Magnesium (Mg²⁺)", amount: "3.1 mg/L", benefit: "Muscle & nerve function" },
  { mineral: "Potassium (K⁺)", amount: "1.4 mg/L", benefit: "Heart rhythm regulation" },
  { mineral: "Sodium (Na⁺)", amount: "4.8 mg/L", benefit: "Fluid balance" },
  { mineral: "Bicarbonate (HCO₃⁻)", amount: "12.6 mg/L", benefit: "Digestive comfort" },
  { mineral: "Silica (SiO₂)", amount: "6.3 mg/L", benefit: "Skin & hair vitality" },
];

const certifications = [
  "ISO 22000:2018 — Food Safety",
  "BIS IS 14543 — Packaged Drinking Water",
  "FSSAI Licensed — Reg. No. 12421003000456",
  "NSF International Certified",
  "HACCP Compliant",
];

const testHistory = [
  { date: "2026-03-01", batch: "ELV-2603A", result: "Pass", tds: 21, ph: 7.3 },
  { date: "2026-02-15", batch: "ELV-2602B", result: "Pass", tds: 23, ph: 7.4 },
  { date: "2026-02-01", batch: "ELV-2602A", result: "Pass", tds: 20, ph: 7.5 },
  { date: "2026-01-15", batch: "ELV-2601B", result: "Pass", tds: 22, ph: 7.4 },
  { date: "2026-01-01", batch: "ELV-2601A", result: "Pass", tds: 24, ph: 7.3 },
];

const PurityReport = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <WaterBubbles count={12} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-body text-primary tracking-wider uppercase">Verified & Certified</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-gold mb-4">
            Purity Report
          </h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Every drop is tested across 50+ parameters. Complete transparency — because you deserve to know what's in your water.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground font-body">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last tested: March 1, 2026</span>
            <span className="mx-2">·</span>
            <FileText className="w-3.5 h-3.5" />
            <span>Batch: ELV-2603A</span>
          </div>
        </div>
      </section>

      {/* Purity Metrics */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-2">Quality Metrics</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Key Purity Parameters</h2>
          </div>
          <div className="grid gap-4 sm:gap-5">
            {purityMetrics.map((metric) => {
              const Icon = metric.icon;
              const percentage = (metric.value / metric.max) * 100;
              return (
                <div key={metric.label} className="bg-card border border-border rounded-lg p-4 sm:p-5 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm sm:text-base text-foreground">{metric.label}</h3>
                        <p className="text-xs text-muted-foreground font-body">
                          {metric.value}{metric.unit} of {metric.max}{metric.unit} max
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-accent/40 text-accent text-xs flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {metric.status}
                    </Badge>
                  </div>
                  <Progress value={percentage} className="h-2 bg-secondary" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mineral Composition */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-2">Composition</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Mineral Profile</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mineralContent.map((m) => (
              <div key={m.mineral} className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-sm text-foreground group-hover:text-primary transition-colors">{m.mineral}</h3>
                  <span className="text-primary font-body font-semibold text-sm">{m.amount}</span>
                </div>
                <p className="text-xs text-muted-foreground font-body">{m.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test History */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-2">Consistency</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Recent Test History</h2>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Batch</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">TDS</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">pH</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {testHistory.map((t) => (
                    <tr key={t.batch} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="py-3 px-4 text-foreground">{t.date}</td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{t.batch}</td>
                      <td className="py-3 px-4 text-center text-foreground">{t.tds} ppm</td>
                      <td className="py-3 px-4 text-center text-foreground">{t.ph}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {t.result}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-2">Trust</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Certifications</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-body text-sm text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PurityReport;
