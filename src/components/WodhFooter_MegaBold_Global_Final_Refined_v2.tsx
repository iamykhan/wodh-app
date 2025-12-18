"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Cuboid,
  Gamepad2,
  FlaskConical,
  Building2,
  Briefcase,
  FileText,
  ShieldCheck,
} from "lucide-react";

const BG = "#0C0722";
const PANEL = "#0F0A26";
const PANEL_2 = "#0B0720";
const BORDER = "#2A1E55";
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";
const TEXT_DIM = "#A8A8C3";
const TEXT_SOFT = "#D1C6FF";

const GlowDivider = () => (
  <div
    className="h-px w-full"
    style={{
      background: `linear-gradient(90deg, transparent, ${NEON}88, ${VIOLET}88, transparent)`,
    }}
  />
);

const SectionTitle: React.FC<{
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon, children }) => (
  <h4
    className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase font-semibold"
    style={{ color: TEXT_DIM }}
  >
    {icon}
    {children}
  </h4>
);

const FooterLink: React.FC<{ label: string; href?: string }> = ({
  label,
  href = "#",
}) => (
  <a
    href={href}
    className="group inline-flex items-center gap-1 text-sm md:text-[15px] transition-colors"
    style={{ color: TEXT_SOFT }}
  >
    <span
      className="group-hover:underline decoration-2 underline-offset-4"
      style={{ textDecorationColor: NEON }}
    >
      {label}
    </span>
    <ArrowUpRight
      size={14}
      className="opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ color: NEON }}
    />
  </a>
);

const SocialBtn: React.FC<{
  Icon: any;
  label: string;
  href?: string;
}> = ({ Icon, label, href = "#" }) => (
  <motion.a
    href={href}
    aria-label={label}
    className="h-11 w-11 rounded-xl border flex items-center justify-center"
    style={{
      borderColor: BORDER,
      background: PANEL_2,
      color: TEXT_SOFT,
    }}
    whileHover={{
      y: -2,
      boxShadow: `0 0 18px ${NEON}66`,
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Icon size={18} />
  </motion.a>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs"
    style={{
      borderColor: BORDER,
      background: PANEL,
      color: TEXT_SOFT,
    }}
  >
    {children}
  </span>
);

const LocationCard: React.FC<{
  city: string;
  country: string;
  address: string;
  phone?: string;
  timezone?: string;
}> = ({ city, country, address, phone, timezone }) => (
  <div
    className="relative rounded-2xl border p-5 overflow-hidden"
    style={{
      borderColor: BORDER,
      background: PANEL,
    }}
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-80"
      style={{
        background: `radial-gradient(420px circle at -10% -30%, ${NEON}33, transparent 55%), radial-gradient(520px circle at 120% 120%, ${VIOLET}33, transparent 55%)`,
      }}
    />
    <div className="relative z-10 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold tracking-tight">{city}</div>
          <div
            className="text-xs tracking-widest uppercase"
            style={{ color: TEXT_DIM }}
          >
            {country}
          </div>
        </div>
        {timezone && (
          <div
            className="text-[11px] px-2.5 py-1 rounded-full border"
            style={{
              borderColor: BORDER,
              background: PANEL_2,
              color: TEXT_SOFT,
            }}
          >
            {timezone}
          </div>
        )}
      </div>
      <div
        className="flex items-start gap-2 text-sm leading-relaxed"
        style={{ color: TEXT_SOFT }}
      >
        <MapPin
          size={16}
          className="mt-0.5 shrink-0"
          style={{ color: NEON }}
        />
        <span>{address}</span>
      </div>
      {phone && (
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: TEXT_SOFT }}
        >
          <Phone size={15} style={{ color: NEON }} />
          <span>{phone}</span>
        </div>
      )}
    </div>
  </div>
);

const WodhFooter_MegaBold_Global_Final_Refined_v2: React.FC = () => {
  return (
    <footer className="w-full text-white" style={{ background: BG }}>
      <GlowDivider />

      {/* Upper CTA / Newsletter band */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 xl:px-16 py-10 lg:py-12">
        <div
          className="rounded-3xl border p-6 md:p-8 lg:p-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center"
          style={{
            borderColor: BORDER,
            background: PANEL,
          }}
        >
          <div className="space-y-3">
            <Pill>
              <Sparkles size={14} style={{ color: NEON }} />
              Studio Drops
            </Pill>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
              {" "}
              Get fresh XR & Game insights,{" "}
              <span className="ml-2" style={{ color: NEON }}>
                {" "}
                monthly.{" "}
              </span>
            </h3>
            <p
              className="text-sm md:text-base max-w-2xl"
              style={{ color: TEXT_DIM }}
            >
              {" "}
              Field notes from production, R&D experiments, pipeline playbooks,
              and launch lessons.{" "}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              placeholder="you@email.com"
              className="h-12 w-full rounded-xl border px-4 bg-transparent outline-none text-sm"
              style={{
                borderColor: BORDER,
                background: PANEL_2,
                color: "#FFFFFF",
              }}
            />
            <button
              className="h-12 px-5 rounded-xl border text-sm font-medium inline-flex items-center justify-center gap-2 shrink-0"
              style={{
                borderColor: BORDER,
                background: PANEL,
                color: "#FFFFFF",
              }}
            >
              {" "}
              Subscribe <Mail size={16} style={{ color: NEON }} />{" "}
            </button>
          </div>
        </div>
      </div>

      {/* Main mega footer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 xl:px-16 pb-12 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand / About + Contact (INLINE, no card) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight">
              W<span style={{ color: NEON }}>o</span>dh
            </div>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: TEXT_DIM }}
            >
              {" "}
              A dedicated XR & Game studio building high-fidelity interactive
              worlds for brands, enterprises, and players worldwide — from
              concept to launch.{" "}
            </p>
            <div className="flex flex-wrap gap-2">
              <Pill>Unity • Unreal • WebXR</Pill>
              <Pill>AR • VR • MR</Pill>
              <Pill>Mobile • PC • Kiosk</Pill>
            </div>

            {/* Clean contact rows */}
            <div
              className="space-y-2 text-sm md:text-[15px]"
              style={{ color: TEXT_SOFT }}
            >
              <a
                href="mailto:hello@wodh.io"
                className="flex items-center gap-2"
              >
                <Mail size={16} style={{ color: NEON }} />
                hello@wodh.io
              </a>
              <a href="tel:+92XXXXXXXXXX" className="flex items-center gap-2">
                <Phone size={16} style={{ color: NEON }} />
                +92 XXX XXX XXXX
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" style={{ color: NEON }} />
                Faisalabad • Pakistan (HQ) · Global delivery pods
              </div>
            </div>

            {/* Social */}
            <div className="pt-2">
              <SectionTitle>Follow</SectionTitle>
              <div className="mt-3 flex items-center gap-2">
                <SocialBtn Icon={Linkedin} label="LinkedIn" />
                <SocialBtn Icon={Instagram} label="Instagram" />
                <SocialBtn Icon={Youtube} label="YouTube" />
                <SocialBtn Icon={Twitter} label="Twitter" />
              </div>
            </div>
          </div>

          {/* XR Studio */}
          <div className="lg:col-span-2 space-y-3">
            <SectionTitle icon={<Cuboid size={14} style={{ color: NEON }} />}>
              {" "}
              XR Studio{" "}
            </SectionTitle>
            <div className="flex flex-col gap-2">
              <FooterLink label="AR Experiences" />
              <FooterLink label="VR Training" />
              <FooterLink label="Enterprise XR" />
              <FooterLink label="Metaverse Worlds" />
            </div>
          </div>

          {/* Games */}
          <div className="lg:col-span-2 space-y-3">
            <SectionTitle
              icon={<Gamepad2 size={14} style={{ color: NEON }} />}
            >
              {" "}
              Games{" "}
            </SectionTitle>
            <div className="flex flex-col gap-2">
              <FooterLink label="Mobile Games" />
              <FooterLink label="PC / Console" />
              <FooterLink label="Multiplayer / Live Ops" />
              <FooterLink label="Game Art & Animation" />
            </div>
          </div>

          {/* R&D */}
          <div className="lg:col-span-2 space-y-3">
            <SectionTitle
              icon={<FlaskConical size={14} style={{ color: NEON }} />}
            >
              {" "}
              R&D Lab{" "}
            </SectionTitle>
            <div className="flex flex-col gap-2">
              <FooterLink label="Hand / Body Tracking" />
              <FooterLink label="Spatial UX Research" />
              <FooterLink label="AI-Driven Interactions" />
              <FooterLink label="Experimental Prototypes" />
            </div>
          </div>

          {/* Company + Careers */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-3">
              <SectionTitle
                icon={<Building2 size={14} style={{ color: NEON }} />}
              >
                {" "}
                Company{" "}
              </SectionTitle>
              <div className="flex flex-col gap-2">
                <FooterLink label="About Wodh" />
                <FooterLink label="Featured Projects" />
                <FooterLink label="Process / How We Work" />
                <FooterLink label="Contact" />
              </div>
            </div>
            <div className="space-y-3">
              <SectionTitle
                icon={<Briefcase size={14} style={{ color: NEON }} />}
              >
                {" "}
                Careers{" "}
              </SectionTitle>
              <div className="flex flex-col gap-2">
                <FooterLink label="Open Roles" />
                <FooterLink label="Life at Wodh" />
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-12 space-y-4">
          <SectionTitle icon={<MapPin size={14} style={{ color: NEON }} />}>
            {" "}
            Global Locations{" "}
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            <LocationCard
              city="Faisalabad"
              country="Pakistan"
              address="Kohinoor City, Main Boulevard — Faisalabad, Punjab"
              phone="+92 XXX XXX XXXX"
              timezone="GMT+5"
            />
            <LocationCard
              city="London"
              country="United Kingdom"
              address="Studio Partner Office — Greater London"
              phone="+44 XX XXXX XXXX"
              timezone="GMT"
            />
            <LocationCard
              city="Dubai"
              country="UAE"
              address="Business Bay, Downtown — Dubai"
              phone="+971 XX XXX XXXX"
              timezone="GMT+4"
            />
          </div>
        </div>

        {/* Resources / Legal / Availability */}
        <div
          className="mt-10 grid md:grid-cols-3 gap-4 border-t pt-8"
          style={{ borderColor: BORDER }}
        >
          <div className="space-y-2">
            <SectionTitle icon={<FileText size={14} style={{ color: NEON }} />}>
              {" "}
              Resources{" "}
            </SectionTitle>
            <div className="flex flex-col gap-2">
              <FooterLink label="Company Profile (PDF)" />
              <FooterLink label="Capabilities Deck" />
              <FooterLink label="Brand Assets" />
            </div>
          </div>
          <div className="space-y-2">
            <SectionTitle
              icon={<ShieldCheck size={14} style={{ color: NEON }} />}
            >
              {" "}
              Legal{" "}
            </SectionTitle>
            <div className="flex flex-col gap-2">
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Terms of Service" />
              <FooterLink label="IP Ownership" />
              <FooterLink label="Security Practices" />
            </div>
          </div>
          <div className="space-y-2">
            <SectionTitle>Availability</SectionTitle>
            <p
              className="text-sm leading-relaxed"
              style={{ color: TEXT_DIM }}
            >
              {" "}
              Operating across time zones with dedicated production pods for XR,
              Games, and R&D.{" "}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Pill>PK · GMT+5</Pill>
              <Pill>UK · GMT</Pill>
              <Pill>UAE · GMT+4</Pill>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: BORDER }}>
        <div
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 xl:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: TEXT_DIM }}
        >
          <div>© {new Date().getFullYear()} Wodh Studio. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:underline"
              style={{ textDecorationColor: NEON }}
            >
              {" "}
              Privacy{" "}
            </a>
            <a
              href="#"
              className="hover:underline"
              style={{ textDecorationColor: NEON }}
            >
              {" "}
              Terms{" "}
            </a>
            <a
              href="#"
              className="hover:underline"
              style={{ textDecorationColor: NEON }}
            >
              {" "}
              Cookies{" "}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WodhFooter_MegaBold_Global_Final_Refined_v2;

