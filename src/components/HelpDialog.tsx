import { useEffect, useRef } from "react";
import { ExternalLink, Mail, MessageCircle, X } from "lucide-react";

export function HelpDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null),
    firstLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) {
      dialog?.showModal();
      requestAnimationFrame(() => firstLink.current?.focus());
    }
    if (!open && dialog?.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="help-dialog"
      aria-labelledby="help-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="help-panel">
        <header>
          <div>
            <h2 id="help-title">Need help?</h2>
            <p>Contact us and we’ll point you in the right direction.</p>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close help"
          >
            <X size={18} />
          </button>
        </header>
        <div className="help-body">
          <a
            ref={firstLink}
            className="contact-link"
            href="https://wa.me/919427011442"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} />
            <span>
              <strong>WhatsApp</strong>
              <small>+91 94270 11442</small>
            </span>
            <ExternalLink size={15} />
          </a>
          <a className="contact-link" href="mailto:coderdeepa94@gmail.com">
            <Mail size={19} />
            <span>
              <strong>Email</strong>
              <small>coderdeepa94@gmail.com</small>
            </span>
            <ExternalLink size={15} />
          </a>
        </div>
        <footer>
          Powered by{" "}
          <a href="https://codenirmata.com" target="_blank" rel="noreferrer">
            codenirmata.com
          </a>
        </footer>
      </div>
    </dialog>
  );
}
