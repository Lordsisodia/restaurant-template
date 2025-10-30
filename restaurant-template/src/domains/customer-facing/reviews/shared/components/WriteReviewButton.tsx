"use client";

interface WriteReviewButtonProps {
  onClick?: () => void;
}

export function WriteReviewButton({ onClick }: WriteReviewButtonProps = {}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (typeof window !== 'undefined' && (window as any).__openReviewModal) {
      (window as any).__openReviewModal();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="shrink-0 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
    >
      Write a Review
    </button>
  );
}
