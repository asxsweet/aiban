import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, X, RefreshCw, Save, Heart, Upload, Image, FileText, Gift, HelpCircle, Award } from "lucide-react";
import { LoveConfig, DEFAULT_CONFIG } from "../types";
import { playPop, playChime } from "../utils/audio";

interface SettingsPanelProps {
  config: LoveConfig;
  onSave: (newConfig: LoveConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({
  config,
  onSave,
  isOpen,
  onClose,
}: SettingsPanelProps) {
  const [localConfig, setLocalConfig] = useState<LoveConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<"certificate" | "gifts" | "photos">("certificate");

  const handleChange = (key: keyof LoveConfig, value: any) => {
    setLocalConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePolaroidChange = (index: number, value: string) => {
    const updatedImages = [...localConfig.polaroidImages];
    updatedImages[index] = value;
    handleChange("polaroidImages", updatedImages);
  };

  const handlePolaroidCaptionChange = (index: number, value: string) => {
    const updatedCaptions = [...localConfig.polaroidCaptions];
    updatedCaptions[index] = value;
    handleChange("polaroidCaptions", updatedCaptions);
  };

  // Convert uploaded image file to Base64 so it can persist in LocalStorage!
  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    playChime();
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      handlePolaroidChange(index, base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    playChime();
    onSave(localConfig);
    onClose();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to restore defaults? All customizations will be reset.")) {
      playPop();
      setLocalConfig({ ...DEFAULT_CONFIG });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-md bg-white border-l border-rose-100 shadow-2xl flex flex-col font-sans select-none no-print">
      
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100 bg-rose-50/20">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#E11D48] animate-spin-slow" />
          <h2 className="text-sm font-bold text-[#E11D48] font-serif uppercase tracking-wider">Customize Love Card</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-rose-50 text-[#3A2428]/40 hover:text-[#3A2428] rounded-full cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="grid grid-cols-3 border-b border-rose-100 text-[10px] font-bold uppercase tracking-widest text-[#3A2428]/60">
        <button
          onClick={() => setActiveTab("certificate")}
          className={`py-3 text-center border-b-2 transition-all cursor-pointer ${
            activeTab === "certificate"
              ? "border-[#E11D48] text-[#E11D48] bg-rose-50/50"
              : "border-transparent hover:text-[#E11D48] hover:bg-rose-50/20"
          }`}
        >
          <Award className="w-4 h-4 mx-auto mb-1 text-inherit" />
          Certificate
        </button>
        <button
          onClick={() => setActiveTab("gifts")}
          className={`py-3 text-center border-b-2 transition-all cursor-pointer ${
            activeTab === "gifts"
              ? "border-[#E11D48] text-[#E11D48] bg-rose-50/50"
              : "border-transparent hover:text-[#E11D48] hover:bg-rose-50/20"
          }`}
        >
          <Gift className="w-4 h-4 mx-auto mb-1 text-inherit" />
          Messages
        </button>
        <button
          onClick={() => setActiveTab("photos")}
          className={`py-3 text-center border-b-2 transition-all cursor-pointer ${
            activeTab === "photos"
              ? "border-[#E11D48] text-[#E11D48] bg-rose-50/50"
              : "border-transparent hover:text-[#E11D48] hover:bg-rose-50/20"
          }`}
        >
          <Image className="w-4 h-4 mx-auto mb-1 text-inherit" />
          Photos Album
        </button>
      </div>

      {/* Main Settings scroll panel */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        
        {/* TAB 1: Certificate settings */}
        {activeTab === "certificate" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#E11D48] uppercase tracking-widest mb-2">Seal details & design</h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#3A2428]/70">Presented To (Participant Name)</label>
              <input
                type="text"
                value={localConfig.recipientName}
                onChange={(e) => handleChange("recipientName", e.target.value)}
                placeholder="Partner's full name"
                className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-3 py-2 text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#3A2428]/70">Award Title Heading</label>
              <input
                type="text"
                value={localConfig.awardTitle}
                onChange={(e) => handleChange("awardTitle", e.target.value)}
                placeholder="e.g. BEST BOYFRIEND AWARD"
                className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-3 py-2 text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#3A2428]/70">Award Description Text</label>
              <textarea
                value={localConfig.awardText}
                onChange={(e) => handleChange("awardText", e.target.value)}
                placeholder="Write a sweet presentation description note."
                rows={4}
                className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-3 py-2 text-sm font-medium transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#3A2428]/70">Your Signature</label>
                <input
                  type="text"
                  value={localConfig.signatureText}
                  onChange={(e) => handleChange("signatureText", e.target.value)}
                  placeholder="love you so much"
                  className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-3 py-2 text-sm font-medium transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#3A2428]/70">Signature Date</label>
                <input
                  type="text"
                  value={localConfig.awardDate}
                  onChange={(e) => handleChange("awardDate", e.target.value)}
                  placeholder="Date e.g. 18 Dec 2025"
                  className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-3 py-2 text-sm font-medium transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Gift box messages/texts */}
        {activeTab === "gifts" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#E11D48] uppercase tracking-widest mb-2">Gift levels config</h3>
            
            {/* Gift 1 */}
            <div className="p-4 bg-rose-50/10 rounded-sm border border-rose-100 flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-[#E11D48] uppercase tracking-widest flex items-center gap-1 leading-none">
                💌 Gift 1: Love Letter
              </h4>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#3A2428]/60 uppercase tracking-wide">Heading Title</label>
                <input
                  type="text"
                  value={localConfig.gift1Title}
                  onChange={(e) => handleChange("gift1Title", e.target.value)}
                  className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#3A2428]/60 uppercase tracking-wide">Sweet Text</label>
                <input
                  type="text"
                  value={localConfig.gift1Text}
                  onChange={(e) => handleChange("gift1Text", e.target.value)}
                  className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium transition-all"
                />
              </div>
            </div>

            {/* Gift 2 */}
            <div className="p-4 bg-rose-50/10 rounded-sm border border-rose-100 flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-[#E11D48] uppercase tracking-widest flex items-center gap-1 leading-none">
                🤗 Gift 2: Cozy Virtual Hug
              </h4>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#3A2428]/60 uppercase tracking-wide">Hug Description Text</label>
                <input
                  type="text"
                  value={localConfig.gift2Text}
                  onChange={(e) => handleChange("gift2Text", e.target.value)}
                  className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium transition-all"
                />
              </div>
            </div>

            {/* Gift 4 Game */}
            <div className="p-4 bg-rose-50/10 rounded-sm border border-rose-100 flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-[#E11D48] uppercase tracking-widest flex items-center gap-1 leading-none">
                🎮 Gift 4: Complete It Challenge
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#3A2428]/60 uppercase tracking-wide">Heading Title</label>
                  <input
                    type="text"
                    value={localConfig.gift4Title}
                    onChange={(e) => handleChange("gift4Title", e.target.value)}
                    className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#3A2428]/60 uppercase tracking-wide">Intro Hint</label>
                  <input
                    type="text"
                    value={localConfig.gift4Text}
                    onChange={(e) => handleChange("gift4Text", e.target.value)}
                    className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#3A2428]/60 uppercase tracking-wide">Winning Claim Text</label>
                <input
                  type="text"
                  value={localConfig.gift4WonText}
                  onChange={(e) => handleChange("gift4WonText", e.target.value)}
                  className="bg-rose-50/40 border border-rose-200 focus:border-[#E11D48] text-[#3A2428] outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Polaroid Album uploads & texts */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            <div className="text-center bg-rose-50/30 border border-dashed border-rose-200 rounded-sm p-4">
              <HelpCircle className="w-8 h-8 text-[#E11D48]/30 mx-auto mb-1 animate-bounce" />
              <p className="text-[11px] text-[#3A2428]/70 font-medium select-text">
                Upload your secret romantic photos, or change URLs and handwritten captions! Your creations save instantaneously.
              </p>
            </div>

            {[0, 1, 2].map((idx) => {
              const base64orUrl = localConfig.polaroidImages[idx];
              const isBase64 = base64orUrl?.startsWith("data:");

              return (
                <div key={idx} className="p-4 bg-rose-50/10 border border-rose-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-[#E11D48] uppercase tracking-widest flex items-center gap-1 leading-none">
                      📸 Photo Polaroid #{idx + 1}
                    </h4>
                    {isBase64 && (
                      <span className="text-[9px] font-bold text-[#E11D48] bg-rose-50 border border-[#E11D48]/20 px-2 py-0.5 rounded-sm select-none leading-none">
                        Uploaded File
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Tiny visual image preview thumb */}
                    <div className="w-14 h-14 rounded-sm border border-rose-200 overflow-hidden bg-rose-50/30 relative shadow-sm flex-shrink-0">
                      {base64orUrl ? (
                        <img
                          src={base64orUrl}
                          alt={`Polaroid placeholder thumb ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-rose-300 bg-rose-50/35">
                          <Image className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* File upload/URL picker details */}
                    <div className="flex-1 space-y-1.5 flex flex-col">
                      <label className="text-[10px] font-bold text-[#3A2428]/50 uppercase tracking-widest">Change Image</label>
                      <div className="flex gap-2">
                        <label className="cursor-pointer bg-[#E11D48] hover:bg-[#ff3b5f] text-white px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider leading-none select-none flex items-center gap-2 shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5 text-white" /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                        
                        <input
                          type="text"
                          value={isBase64 ? "" : base64orUrl}
                          onChange={(e) => handlePolaroidChange(idx, e.target.value)}
                          placeholder="Paste photo URL"
                          disabled={isBase64}
                          className="flex-1 bg-rose-50/40 border border-rose-250/20 text-[#3A2428] outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium placeholder:font-normal text-ellipsis overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Caption line */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-[10px] font-bold text-[#3A2428]/50 uppercase tracking-widest">Handwritten caption</label>
                    <input
                      type="text"
                      value={localConfig.polaroidCaptions[idx] || ""}
                      onChange={(e) => handlePolaroidCaptionChange(idx, e.target.value)}
                      placeholder="Write cute caption line..."
                      className="bg-rose-50/40 border border-rose-200 outline-none rounded-sm px-2.5 py-1.5 text-xs font-medium text-[#3A2428]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Drawer Action buttons bottom strip */}
      <div className="border-t border-rose-100 px-6 py-4 bg-rose-50/10 flex items-center justify-between gap-3">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-[#3A2428]/70 hover:text-[#E11D48] bg-white border border-rose-200 hover:bg-rose-50 rounded-sm cursor-pointer shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Defaults
        </button>

        <button
          onClick={handleSave}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-[#E11D48] hover:bg-[#ff3b5f] rounded-sm cursor-pointer shadow-md transition-all"
        >
          <Save className="w-4 h-4 fill-white text-white" /> Save Changes
        </button>
      </div>

    </div>
  );
}
