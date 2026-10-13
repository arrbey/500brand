import React from 'react';
import { usePage } from '@inertiajs/react';

export interface SiteLogoConfig {
  logo_image?: string;
  logo_image_dark?: string;
  badge_number?: string;
  badge_circle?: string;
  brand_name?: string;
  brand_name_highlight?: string;
  tagline?: string;
  show_text_with_image?: boolean;
  height_px?: number | string;
}

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  overrideLogo?: SiteLogoConfig;
  className?: string;
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  overrideLogo,
  className = '',
  compact = false,
}) => {
  const { props } = usePage<any>();
  const logoConfig: SiteLogoConfig = overrideLogo || props?.globalLogo || {};

  const activeImage =
    variant === 'dark'
      ? logoConfig.logo_image_dark || logoConfig.logo_image
      : logoConfig.logo_image;

  const badgeNumber = logoConfig.badge_number || '5';
  const badgeCircle = logoConfig.badge_circle || '0';
  const brandName = logoConfig.brand_name || '500 BRAND';
  const brandHighlight = logoConfig.brand_name_highlight || 'GLOBAL';
  const tagline = logoConfig.tagline || 'NATIONAL BRAND TRANSFORMATION PORTAL';
  const showTextWithImage = Boolean(logoConfig.show_text_with_image);
  const height = logoConfig.height_px ? `${logoConfig.height_px}px` : '38px';

  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [activeImage]);

  // If a custom logo image is provided and hasn't errored:
  if (activeImage && !imgError) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={activeImage}
          alt={`${brandName} ${brandHighlight}`}
          style={{ height, maxHeight: '60px' }}
          className="w-auto object-contain transition-transform group-hover:scale-105"
          onError={() => setImgError(true)}
        />

        {showTextWithImage && !compact && (
          <div className="leading-tight">
            {variant === 'light' ? (
              <>
                <span className="font-extrabold text-[17px] tracking-tight text-[#0b2443]">
                  {brandName} <strong className="text-[#d48c19]">{brandHighlight}</strong>
                </span>
                <small className="block text-[9px] font-bold tracking-[0.13em] text-[#5f7a94] mt-0.5">
                  {tagline}
                </small>
              </>
            ) : (
              <>
                <span className="font-extrabold text-[17px] text-white tracking-tight">
                  {brandName} <strong className="text-[#f3b641]">{brandHighlight}</strong>
                </span>
                <small className="block text-[9px] font-bold tracking-[0.14em] text-[#a2bed7] mt-0.5">
                  {tagline}
                </small>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render the classic SVG/CSS stylized Monogram Badge:
  if (variant === 'light') {
    return (
      <div className={`flex items-center gap-2.5 whitespace-nowrap ${className}`}>
        <div className="w-[38px] h-[38px] rounded-[10px] bg-[#092b53] text-white font-extrabold text-[21px] grid place-items-center tracking-tighter shadow-[3px_3px_0_#f3b641] transition-transform group-hover:scale-105">
          {badgeNumber}
          <span className="text-[#f3b641]">{badgeCircle}</span>
        </div>
        {!compact && (
          <div className="leading-tight">
            <span className="font-extrabold text-[17px] tracking-tight text-[#0b2443]">
              {brandName} <strong className="text-[#d48c19]">{brandHighlight}</strong>
            </span>
            <small className="block text-[9px] font-bold tracking-[0.13em] text-[#5f7a94] mt-0.5">
              {tagline}
            </small>
          </div>
        )}
      </div>
    );
  }

  // Dark variant (Footer / Sidebar)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-[38px] h-[38px] rounded-[10px] bg-[#092b53] text-white font-black text-[20px] grid place-items-center shadow-[3px_3px_0_#f3b641] transition-transform group-hover:scale-105">
        {badgeNumber}
        <span className="text-[#f3b641]">{badgeCircle}</span>
      </div>
      {!compact && (
        <div className="leading-tight">
          <span className="font-extrabold text-[17px] text-white tracking-tight">
            {brandName} <strong className="text-[#f3b641]">{brandHighlight}</strong>
          </span>
          <small className="block text-[9px] font-bold tracking-[0.14em] text-[#a2bed7] mt-0.5">
            {tagline}
          </small>
        </div>
      )}
    </div>
  );
};
