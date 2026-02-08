/**
 * Icon Component
 * Shared icon library with consistent SVG implementations
 * Extracted from duplicated code across legacy components
 */

export type IconName =
  | "play"
  | "close"
  | "arrowRight"
  | "arrowLeft"
  | "grid"
  | "stack"
  | "timeline"
  | "proof"
  | "external"
  | "email"
  | "spark";

export interface IconProps {
  name: IconName;
  className?: string;
}

/**
 * Icon - SVG icon component
 *
 * @example
 * <Icon name="play" className="h-6 w-6" />
 * <Icon name="arrowRight" />
 */
export function Icon({ name, className }: IconProps) {
  const c = className ?? "h-5 w-5";

  switch (name) {
    case "play":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M10 8.5v7l6-3.5-6-3.5Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      );

    case "close":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "arrowRight":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M10 7l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "arrowLeft":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 7l-5 5 5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "grid":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      );

    case "stack":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 3 8l9 5 9-5-9-5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.8"
          />
          <path
            d="M3 12l9 5 9-5"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.6"
          />
          <path
            d="M3 16l9 5 9-5"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.45"
          />
        </svg>
      );

    case "timeline":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 7h10M7 12h7M7 17h10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M5 7a1 1 0 1 0 0.001 0ZM5 12a1 1 0 1 0 0.001 0ZM5 17a1 1 0 1 0 0.001 0Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      );

    case "proof":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 12.5 11 14.5 15 10.5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      );

    case "external":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 5h5v5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14 19 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );

    case "email":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 8.5 12 13.5 20 8.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      );

    case "spark":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l1.2 4.3L17.5 8l-4.3 1.2L12 13.5l-1.2-4.3L6.5 8l4.3-1.7L12 2Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M5 14l.8 2.7L9 18l-3.2.9L5 22l-.8-3.1L1 18l3.2-1.3L5 14Z"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      );

    default:
      return null;
  }
}
